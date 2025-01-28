import { Header } from "@/components/dashboard/Header/Header";
import { Tasks } from "@/components/tasks/Tasks/Tasks";
import { ProgressOverview } from "@/components/progress/ProgressOverview/ProgressOverview";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import {
  TasksSkeleton,
  ProgressOverviewSkeleton,
} from "@/components/ui/skeletons";
import { handleTaskCreation } from "@/lib/data";

type DashboardProps = {
  userId: string;
};

export async function Dashboard({ userId }: DashboardProps) {
  await handleTaskCreation(userId);

  return (
    <SidebarInset>
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-2 container mx-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_min-content]">
          <Suspense fallback={<TasksSkeleton />}>
            <Tasks userId={userId} />
          </Suspense>

          <Suspense fallback={<ProgressOverviewSkeleton />}>
            <ProgressOverview />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  );
}
