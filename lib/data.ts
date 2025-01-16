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
  const today = new Date().toLocaleDateString();

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
    const today = new Date().toLocaleDateString();

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
