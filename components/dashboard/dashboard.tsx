import Tasks from "@/components/dashboard/tasks-checklist/tasks";
import Progress from "@/components/dashboard/progress-overview/progress";
import {
  createUserTasks,
  fetchUserChallengeStartDate,
  fetchUserStreak,
  fetchUserTasks,
} from "@/lib/data";
import { UserTasksSchema } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const tasks = await fetchUserTasks();

  // if there are no tasks, create tasks and fetch them
  if (tasks?.length === 0) {
    const { userId } = await auth();
    await createUserTasks(userId!);
    await fetchUserTasks();
  }

  const streak = await fetchUserStreak();
  const challengeStartDate = await fetchUserChallengeStartDate();

  const currentDayIndex = () => {
    if (challengeStartDate) {
      const today = new Date();
      const dayDifference =
        Math.floor(
          (today.getTime() - new Date(challengeStartDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      return dayDifference;
    } else {
      return 1;
    }
  };

  const parseResult = UserTasksSchema.safeParse(tasks);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return;
  }

  const parsedTasks = parseResult.data;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container mx-auto">
      <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_min-content]">
        <Tasks tasks={parsedTasks} currentDayIndex={currentDayIndex()} />

        <Progress
          currentStreak={streak || 0}
          currentDayIndex={currentDayIndex()}
        />
      </div>
    </div>
  );
}
