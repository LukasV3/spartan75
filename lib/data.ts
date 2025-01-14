import { sql } from "@vercel/postgres";
import { type Task } from "./definitions";

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
