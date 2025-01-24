import DateHeading from "@/components/dashboard/tasks-checklist/date-heading";
import {
  createUserTasks,
  fetchUserLastProgress,
  fetchUserTasks,
} from "@/lib/data";
import { UserTasksSchema } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";
import TaskListContainer from "@/components/dashboard/tasks-checklist/task-list-container";
import { startOfToday, isBefore, addDays, lightFormat } from "date-fns";

const handleTaskCreation = async (userId: string) => {
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
};

const Tasks = async () => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  await handleTaskCreation(userId);

  const tasks = await fetchUserTasks(userId);
  const parseResult = UserTasksSchema.safeParse(tasks);

  if (!parseResult.success) {
    console.error(parseResult.error);
    return null;
  }

  const parsedTasks = parseResult.data;

  return (
    <div className="h-min rounded-xl p-6 space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-2xl font-semibold tracking-tight">
          Daily Tasks Checklist
          <span className="ml-2">📋</span>
        </h3>

        <p className="text-sm text-muted-foreground">
          This is your tasks checklist
        </p>
      </div>

      <hr />

      <div className="flex flex-col space-y-4">
        <DateHeading />

        <TaskListContainer tasks={parsedTasks} />
      </div>
    </div>
  );
};

export default Tasks;
