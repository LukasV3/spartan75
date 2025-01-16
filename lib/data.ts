import { sql } from "@vercel/postgres";
import { type Task, type UserTask } from "./definitions";
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

export const fetchUserTasks = async () => {
  const { userId } = await auth();

  try {
    const data = await sql<UserTask>`
      SELECT t.id, t.name, ut.date, ut.completed
      FROM user_tasks ut
      JOIN tasks t ON ut.task_id = t.id
      WHERE ut.user_id = ${userId}
      ORDER BY ut.date ASC;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
};
