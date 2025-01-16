import { sql } from "@vercel/postgres";
import { type DatabaseUser, type Task, type UserTask } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";

export async function fetchTasks() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log("Fetching tasks data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Task>`SELECT * FROM tasks`;

    console.log("Data fetch completed after 3 seconds.");

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks data.");
  }
}

export const fetchUserTasks = async (userId: string) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const data = await sql<UserTask>`
      SELECT t.id, t.name, ut.date, ut.completed
      FROM user_tasks ut
      JOIN tasks t ON ut.task_id = t.id
      WHERE ut.user_id = ${userId} AND ut.date = ${today}
      ORDER BY ut.date ASC;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
};

export const createUserTasks = async (id: string) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    await sql`
      INSERT INTO user_tasks (user_id, task_id, date, completed)
      SELECT ${id}, id, ${today}, false
      FROM tasks;
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

export const fetchUserStreak = async () => {
  const { userId } = await auth();

  try {
    const data = await sql<{ streak_length: number }[]>`
      WITH completed_tasks_per_day AS (
        SELECT
          ut.date,
          COUNT(*) AS completed_count
        FROM
          user_tasks ut
        WHERE
          ut.user_id = ${userId} AND ut.completed = true
        GROUP BY
          ut.date
        HAVING
          COUNT(*) = 5
      ),
      streaks AS (
        SELECT
          date,
          ROW_NUMBER() OVER (ORDER BY date ASC)
          - ROW_NUMBER() OVER (ORDER BY date::DATE) AS streak_group
        FROM
          completed_tasks_per_day
      )
      SELECT
        COUNT(*) AS streak_length
      FROM
        streaks
      WHERE
        streak_group = (
          SELECT
            ROW_NUMBER() OVER (ORDER BY date ASC)
            - ROW_NUMBER() OVER (ORDER BY date::DATE)
          FROM
            completed_tasks_per_day
          ORDER BY
            date DESC
          LIMIT 1
        )
      LIMIT 1;
    `;

    const streak =
      data.rows.length > 0
        ? (data.rows[0] as unknown as { streak_length: number }).streak_length
        : 0;
    return streak;
  } catch (error) {
    console.error("Error: Could not fetch user streak:", error);
    throw new Error("Failed to fetch streak data.");
  }
};

export const fetchUserChallengeStartDate = async () => {
  const { userId } = await auth();

  const startDateResult: { rows: { start_date: string }[] } = await sql`
  SELECT MIN(ut.date) AS start_date
  FROM user_tasks ut
  WHERE ut.user_id = ${userId}
    AND ut.date IN (
      SELECT ut.date
      FROM user_tasks
      WHERE user_id = ${userId}
      GROUP BY ut.date
      HAVING COUNT(*) = 5 AND SUM(CASE WHEN completed THEN 1 ELSE 0 END) = 5
    )
`;

  const startDate =
    startDateResult.rows.length > 0 && startDateResult.rows[0].start_date
      ? new Date(
          (
            startDateResult.rows[0] as unknown as { start_date: string }
          ).start_date
        )
      : null;

  return startDate?.toISOString().split("T")[0];
};
