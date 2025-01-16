import TaskList from "@/components/dashboard/tasks-checklist/task-list";
import ProgressBar from "@/components/dashboard/tasks-checklist/progress-bar";
import DateHeading from "@/components/dashboard/tasks-checklist/date-heading";
import { createUserTasks, fetchUserTasks } from "@/lib/data";
import { UserTasksSchema } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";

type TasksProps = {
  currentDayIndex: number;
};

const Tasks = async ({ currentDayIndex }: TasksProps) => {
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
  const numCompletedTasks = parsedTasks.filter((task) => task.completed).length;
  const percentageComplete = (numCompletedTasks / 5) * 100;

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

        <ProgressBar percentage={percentageComplete} />

        <TaskList
          tasks={parsedTasks}
          currentDayIndex={currentDayIndex}
          numCompletedTasks={numCompletedTasks}
        />
      </div>
    </div>
  );
};

export default Tasks;
