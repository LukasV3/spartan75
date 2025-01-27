"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { startOfToday, lightFormat } from "date-fns";

export const toggleTaskComplete = async (taskId: number) => {
  const { userId } = await auth();
  const today = lightFormat(startOfToday(), "yyyy-MM-dd");

  try {
    await sql`
      UPDATE user_tasks
      SET completed = NOT completed
      WHERE user_id = ${userId} AND task_id = ${taskId} AND date = ${today}
    `;
  } catch (error) {
    console.error("Database Error:", error);
  }

  revalidatePath("/");
};
