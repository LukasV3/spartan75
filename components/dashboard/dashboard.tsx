import Header from "@/components/dashboard/header";
import Tasks from "@/components/dashboard/tasks-checklist/tasks";
import ProgressOverview from "@/components/dashboard/progress-overview/progress-overview";
import { fetchUserChallengeStartDate } from "@/lib/data";
import { SidebarInset } from "@/components/ui/sidebar";
import { getCurrentDayIndex } from "@/lib/utils";

export default async function Dashboard() {
  const challengeStartDate = await fetchUserChallengeStartDate();
  const currentDayIndex = getCurrentDayIndex(challengeStartDate);

  return (
    <SidebarInset>
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container mx-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_min-content]">
          <Tasks currentDayIndex={currentDayIndex} />

          <ProgressOverview currentDayIndex={currentDayIndex} />
        </div>
      </div>
    </SidebarInset>
  );
}
