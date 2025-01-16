import { fetchUserStreak } from "@/lib/data";
import { z } from "zod";
import StreakCalendar from "@/components/dashboard/progress-overview/streak-calendar";
import CurrentStreak from "@/components/dashboard/progress-overview/current-streak";

type ProgressOverviewProps = {
  currentDayIndex: number;
};

const ProgressOverview = async ({ currentDayIndex }: ProgressOverviewProps) => {
  const streak = await fetchUserStreak();

  const toNum = z.string().pipe(z.coerce.number());
  const parseResult = toNum.safeParse(streak);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return;
  }
  const parsedStreak = parseResult.data;

  return (
    <div className="h-min rounded-xl p-6 space-y-6 bg-muted/50">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-2xl font-semibold tracking-tight">
          Progress Overview
          <span className="ml-2">🎯</span>
        </h3>

        <p className="text-sm text-muted-foreground">
          Day {currentDayIndex} of 75
        </p>
      </div>

      <hr />

      <CurrentStreak streak={parsedStreak} />

      <hr />

      <StreakCalendar streak={parsedStreak} currentDayIndex={currentDayIndex} />
    </div>
  );
};

export default ProgressOverview;
