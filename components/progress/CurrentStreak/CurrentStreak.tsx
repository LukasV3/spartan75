type CurrentStreakProps = {
  streak: number;
};

export const CurrentStreak = ({ streak }: CurrentStreakProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm text-muted-foreground">Current streak:</h3>

      <p className="text-lg font-semibold leading-none tracking-tight">
        {streak} {streak === 1 ? "day" : "days"}
        {streak > 0 && <span className="ml-1">🔥</span>}
      </p>
    </div>
  );
};
