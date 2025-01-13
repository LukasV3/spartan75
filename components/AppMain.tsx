"use client";

import { useState } from "react";
import DailyTasksChecklist from "@/components/DailyTasksChecklist";
import ProgressOverview from "@/components/ProgressOverview";

export default function AppMain() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const currentDayIndex = 1;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container mx-auto">
      <div className="grid auto-rows-min gap-4 md:grid-cols-[1fr,_min-content]">
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
  );
}
