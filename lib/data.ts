"use server";

import { sql } from "@vercel/postgres";
import {
  type DatabaseUser,
  type UserTask,
  type User,
  UserSchema,
  UserTasksSchema,
} from "@/lib/definitions";
import { auth, currentUser } from "@clerk/nextjs/server";
import { startOfToday, lightFormat, isBefore, addDays } from "date-fns";
import { z } from "zod";

export const fetchUserTasks = async (userId: string, date?: string) => {
  const tasksDate = date ?? lightFormat(startOfToday(), "yyyy-MM-dd");

  try {
    const data = await sql<UserTask>`
      SELECT t.id, t.name, ut.date, ut.completed
      FROM user_tasks ut
      JOIN tasks t ON ut.task_id = t.id
      WHERE ut.user_id = ${userId} AND ut.date = ${tasksDate}
      ORDER BY t.id ASC;
    `;

    const parseResult = UserTasksSchema.safeParse(data.rows);
    if (!parseResult.success) {
      console.error(parseResult.error);
      throw new Error("Failed to parse tasks data.");
    }

    return parseResult.data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks data.");
  }
};

/**
 * Create user tasks for a given user id and days
 * @param id - The user id
 * @param days - The days to create user tasks for
 * @returns
 */
export const createUserTasks = async (id: string, days?: string[]) => {
  try {
    const today = lightFormat(startOfToday(), "yyyy-MM-dd");
    const taskDays = days ?? [today]; // Default to today if no days are provided

    // Insert tasks for all days
    for (const day of taskDays) {
      await sql`
        INSERT INTO user_tasks (user_id, task_id, date, completed)
        SELECT ${id}, t.id, ${day}::date, false
        FROM tasks t
        ON CONFLICT (user_id, task_id, date) DO NOTHING;
      `;
    }

    // Update user last_progress_date to today
    await sql`
      UPDATE Users
      SET last_progress_date = ${today}
      WHERE user_id = ${id};
    `;
  } catch (error) {
    console.error("Error: Could not create user tasks in db:", error);
    return new Response("Error: Database error creating user tasks", {
      status: 400,
    });
  }
};

export const createDatabaseUser = async ({
  user_id,
  username,
  email,
}: DatabaseUser) => {
  try {
    await sql`
      INSERT INTO users (user_id, username, email)
      VALUES (${user_id}, ${username}, ${email})
    `;
  } catch (error) {
    console.error("Error: Could not create user in db:", error);
    return new Response("Error: Database error creating user", {
      status: 400,
    });
  }
};

export const fetchCurrentStreak = async (userId: string) => {
  type StreakData = {
    streak_length: string;
  };

  try {
    const data = await sql<StreakData>`
      WITH completed_days AS (
        SELECT
          date
        FROM
          user_tasks
        WHERE
          user_id = ${userId} AND completed = true
        GROUP BY
          date
        HAVING
          COUNT(*) = 5
      ),
      consecutive_days AS (
        SELECT
          date,
          ROW_NUMBER() OVER (ORDER BY date) - CAST(EXTRACT(EPOCH FROM date)::INT / (24 * 60 * 60) AS INTEGER) AS streak_group
        FROM
          completed_days
      ),
      current_streak_group AS (
        SELECT
          streak_group
        FROM
          consecutive_days
        WHERE
          date IN (
            SELECT date
            FROM completed_days
            WHERE date = CURRENT_DATE OR date = CURRENT_DATE - INTERVAL '1 day'
          )
        LIMIT 1
      )
      SELECT
        COUNT(*) AS streak_length
      FROM
        consecutive_days
      WHERE
        streak_group = (SELECT streak_group FROM current_streak_group);
    `;

    const parsedResult = z
      .object({
        streak_length: z.coerce.number(),
      })
      .safeParse(data.rows[0]);
    if (!parsedResult.success) {
      console.error(parsedResult.error);
      throw new Error("Failed to parse streak data.");
    }

    return parsedResult.data.streak_length ?? 0;
  } catch (error) {
    console.error("Error: Could not fetch user streak:", error);
    throw new Error("Failed to fetch streak data.");
  }
};

export const fetchUserChallengeStartDate = async (userId: string) => {
  // get the earliest date when all tasks were completed for a user and treat this as the start date of the challenge.
  type StartDate = {
    start_date: Date;
  };

  const data = await sql<StartDate>`
    SELECT MIN(ut.date) AS start_date
    FROM user_tasks ut
    WHERE ut.user_id = ${userId}
      AND ut.date = (
        SELECT MIN(sub.date)
        FROM (
          SELECT ut.date
          FROM user_tasks ut
          WHERE ut.user_id = ${userId}
          GROUP BY ut.date
          HAVING COUNT(*) = 5 AND SUM(CASE WHEN ut.completed THEN 1 ELSE 0 END) = 5
        ) sub
      );
  `;

  const result = data.rows[0];

  const parseResult = z
    .object({
      start_date: z.coerce.date(),
    })
    .safeParse(result);
  if (!parseResult.success) {
    console.error(parseResult.error);
    throw new Error("Failed to parse start date data.");
  }

  const startDate = result.start_date
    ? lightFormat(new Date(result.start_date), "yyyy-MM-dd")
    : null;

  return startDate;
};

export const fetchUserLastProgress = async (userId: string) => {
  type LastProgressDate = {
    last_progress_date: Date | null;
  };

  const data = await sql<LastProgressDate>`
    SELECT last_progress_date
    FROM Users
    WHERE user_id = ${userId};
  `;

  return data.rows[0]?.last_progress_date;
};

export const fetchCompletedDates = async (userId: string) => {
  type TaskDate = {
    date: Date;
  };

  try {
    const data = await sql<TaskDate>`
      SELECT
        date
      FROM
        user_tasks
      WHERE
        user_id = ${userId}
        AND completed = true
      GROUP BY
        date
      HAVING
        COUNT(*) = 5
      ORDER BY
        date ASC;
    `;

    const result = data.rows.map((row) => row.date);

    const parseResult = z.array(z.date()).safeParse(result);
    if (!parseResult.success) {
      console.error(parseResult.error);
      throw new Error("Failed to parse tasks data.");
    }

    return parseResult.data;
  } catch (error) {
    console.error("Error fetching completed dates:", error);
    throw new Error("Failed to fetch completed dates.");
  }
};

export const fetchUserData = async (): Promise<{
  userId: string;
  user: User;
} | null> => {
  try {
    const [rawUser, authResult] = await Promise.all([currentUser(), auth()]);

    const { userId, redirectToSignIn } = authResult;

    if (!rawUser || !userId) {
      redirectToSignIn();
      return null;
    }

    const parseResult = UserSchema.safeParse(rawUser);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return null; // TODO: Handle error
    }

    const {
      username,
      emailAddresses: [{ emailAddress }],
      imageUrl,
    } = parseResult.data;

    const user = {
      username,
      email: emailAddress,
      avatar: imageUrl,
    };

    return { userId, user };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

export const handleTaskCreation = async (userId: string) => {
  try {
    const lastProgressDate = await fetchUserLastProgress(userId);
    const today = startOfToday();

    if (!lastProgressDate) {
      // Create today's tasks for a new user
      await createUserTasks(userId);
    } else if (isBefore(lastProgressDate, today)) {
      // Handle missing days
      let currentDay = addDays(lastProgressDate, 1);
      const missingDays = [];

      while (isBefore(currentDay, today)) {
        missingDays.push(currentDay);
        currentDay = addDays(currentDay, 1);
      }
      missingDays.push(today);

      const formattedDays = missingDays.map((day) =>
        lightFormat(day, "yyyy-MM-dd")
      );

      // Create tasks for missing days and today
      await createUserTasks(userId, formattedDays);
    }
  } catch (error) {
    console.error("Failed to create tasks:", error);
  }
};
