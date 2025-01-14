import DailyTasksChecklist from "@/components/DailyTasksChecklist";
import ProgressOverview from "@/components/ProgressOverview";
import { fetchTasks } from "@/lib/data";
import { type Task, TasksSchema } from "@/lib/definitions";

export default async function AppMain() {
  // const [currentStreak, setCurrentStreak] = useState(0);
  const currentDayIndex = 1;

  const tasks = await fetchTasks();

  const parseResult = TasksSchema.safeParse(tasks);

  if (!parseResult.success) {
    console.error(parseResult.error);
    return;
  }

  const { data: parsedTasks } = parseResult;

  const formattedTasks: Task[] = parsedTasks.map((task) => ({
    taskId: task.task_id,
    name: task.name,
  }));

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container mx-auto">
      <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_min-content]">
        <DailyTasksChecklist
          tasks={formattedTasks}
          currentDayIndex={currentDayIndex}
        />

        <ProgressOverview currentStreak={0} currentDayIndex={currentDayIndex} />
      </div>
    </div>
  );
}
