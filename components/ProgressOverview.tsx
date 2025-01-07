import React from "react";

export default function ProgressOverview() {
  return (
    <div className="h-min rounded-xl bg-muted/50">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">
          Progress Overview
        </h3>

        <p className="text-sm text-muted-foreground">Day 23 of 75</p>
      </div>

      <div className="flex items-center gap-2 p-6 pt-0">
        <div className="text-5xl">🔥</div>

        <div className="flex flex-col space-y-1">
          <h3 className="text-sm text-muted-foreground">Current Streak</h3>

          <p className="font-semibold leading-none tracking-tight">23 days</p>
        </div>
      </div>
    </div>
  );
}
