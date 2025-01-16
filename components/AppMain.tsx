import DailyTasksChecklist from "@/components/DailyTasksChecklist";
import ProgressOverview from "@/components/ProgressOverview";
import { createUserTasks, fetchUserTasks } from "@/lib/data";
import { UserTasksSchema } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";

export default async function AppMain() {
  // const [currentStreak, setCurrentStreak] = useState(0);
  const currentDayIndex = 1;

  const tasks = await fetchUserTasks();

  // if there are no tasks, create daily tasks and fetch them
  if (tasks?.length === 0) {
    const { userId } = await auth();
    await createUserTasks(userId!);
    await fetchUserTasks();
  }

  const parseResult = UserTasksSchema.safeParse(tasks);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return;
  }

  const parsedTasks = parseResult.data;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container mx-auto">
      <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_min-content]">
        <DailyTasksChecklist
          tasks={parsedTasks}
          currentDayIndex={currentDayIndex}
        />

        <ProgressOverview currentStreak={0} currentDayIndex={currentDayIndex} />
      </div>
    </div>
  );
}
