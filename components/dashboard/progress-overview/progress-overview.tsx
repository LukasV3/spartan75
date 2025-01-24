import { fetchUserStreak } from "@/lib/data";
import { z } from "zod";
import StreakCalendar from "@/components/dashboard/progress-overview/streak-calendar";
import CurrentStreak from "@/components/dashboard/progress-overview/current-streak";
import { getCurrentDayIndex } from "@/lib/utils";
import { fetchUserChallengeStartDate } from "@/lib/data";

const ProgressOverview = async () => {
  const [challengeStartDate, streak] = await Promise.all([
    fetchUserChallengeStartDate(),
    fetchUserStreak(),
  ]);
  const currentDayIndex = getCurrentDayIndex(challengeStartDate);

  const toNum = z.string().pipe(z.coerce.number());
  const parseResult = toNum.safeParse(streak);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return;
  }
  const parsedStreak = parseResult.data;

  return (
    <div className="h-min rounded-xl p-6 m-4 space-y-6 bg-muted/50">
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
