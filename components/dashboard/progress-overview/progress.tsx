import { Calendar } from "@/components/ui/calendar";

export default function Progress({
  currentStreak,
  currentDayIndex,
}: {
  currentStreak: number;
  currentDayIndex: number;
}) {
  const selectedDates =
    currentStreak > 0
      ? {
          from: new Date(
            new Date().setDate(new Date().getDate() - (currentDayIndex - 1))
          ),
          to:
            currentStreak == currentDayIndex
              ? new Date()
              : new Date(new Date().setDate(new Date().getDate() - 1)),
        }
      : undefined;

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

      <div className="flex flex-col space-y-2">
        <h3 className="text-sm text-muted-foreground">Current streak:</h3>

        <p className="text-lg font-semibold leading-none tracking-tight">
          {currentStreak} {currentStreak === 1 ? "day" : "days"}
          {currentStreak > 0 && <span className="ml-1">🔥</span>}
        </p>
      </div>

      <hr />

      <div className="flex flex-col space-y-2">
        <h3 className="text-sm text-muted-foreground">Calendar view:</h3>

        <Calendar
          mode="range"
          selected={selectedDates}
          className="rounded-md border w-min"
        />
      </div>
    </div>
  );
}
