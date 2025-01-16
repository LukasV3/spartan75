import Tasks from "@/components/dashboard/tasks-checklist/tasks";
import ProgressOverview from "@/components/dashboard/progress-overview/progress-overview";
import { fetchUserChallengeStartDate } from "@/lib/data";

export default async function Dashboard() {
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

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container mx-auto">
      <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_min-content]">
        <Tasks currentDayIndex={currentDayIndex()} />

        <ProgressOverview currentDayIndex={currentDayIndex()} />
      </div>
    </div>
  );
}
