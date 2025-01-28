import { Header } from "@/components/dashboard/Header/Header";
import { Tasks } from "@/components/tasks/Tasks/Tasks";
import { ProgressOverview } from "@/components/progress/ProgressOverview/ProgressOverview";
import { SidebarInset } from "@/components/ui/sidebar";
import { Suspense } from "react";
import {
  TasksSkeleton,
  ProgressOverviewSkeleton,
} from "@/components/ui/skeletons";
import { createUserTasks, fetchUserLastProgress } from "@/lib/data";
import { startOfToday, isBefore, addDays, lightFormat } from "date-fns";

export async function Dashboard({ userId }: { userId: string }) {
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
