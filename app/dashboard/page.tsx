"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import DailyTasksChecklist from "@/components/DailyTasksChecklist";
import ProgressOverview from "@/components/ProgressOverview";

export default function Page() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const currentDayIndex = 1;

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_33%]">
            <DailyTasksChecklist
              incrementStreak={() => setCurrentStreak((a) => a + 1)}
              decrementStreak={() => setCurrentStreak((a) => a - 1)}
              currentDayIndex={currentDayIndex}
            />

            <ProgressOverview
              currentStreak={currentStreak}
              currentDayIndex={currentDayIndex}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
