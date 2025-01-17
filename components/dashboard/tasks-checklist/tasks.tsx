import DateHeading from "@/components/dashboard/tasks-checklist/date-heading";
import { createUserTasks, fetchUserTasks } from "@/lib/data";
import { UserTasksSchema } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";
import TaskListContainer from "@/components/dashboard/tasks-checklist/task-list-container";

const Tasks = async () => {
  const { userId } = await auth();
  let tasks = await fetchUserTasks(userId!);

  // if there are no tasks, create tasks and fetch them
  if (tasks?.length === 0) {
    await createUserTasks(userId!);
    tasks = await fetchUserTasks(userId!);
  }

  const parseResult = UserTasksSchema.safeParse(tasks);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return;
  }

  const parsedTasks = parseResult.data;

  return (
    <div className="h-min rounded-xl p-6 space-y-6 bg-muted/50">
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
