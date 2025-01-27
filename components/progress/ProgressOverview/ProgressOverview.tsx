import { fetchCurrentStreak } from "@/lib/data";
import { StreakCalendar } from "@/components/progress/StreakCalendar/StreakCalendar";
import { CurrentStreak } from "@/components/progress/CurrentStreak/CurrentStreak";
import { getCurrentDayIndex } from "@/lib/utils";
import { fetchUserChallengeStartDate } from "@/lib/data";

export const ProgressOverview = async () => {
  const [challengeStartDate, streak] = await Promise.all([
    fetchUserChallengeStartDate(),
    fetchCurrentStreak(),
  ]);
  const currentDayIndex = getCurrentDayIndex(challengeStartDate);

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

      <CurrentStreak streak={streak} />

      <hr />

      <StreakCalendar />
    </div>
  );
};
