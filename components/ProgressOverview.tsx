"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { type DateRange } from "react-day-picker";

const streak = 0;

export default function ProgressOverview() {
  const selectedDates: DateRange = {
    from: new Date(new Date().setDate(new Date().getDate() - streak)),
    to: new Date(),
  };

  return (
    <div className="h-min rounded-xl bg-muted/50">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">
          Progress Overview
        </h3>

        <p className="text-sm text-muted-foreground">Day {streak} of 75</p>
      </div>

      <div className="flex items-center gap-2 p-6 pt-0">
        <div className="text-5xl">🔥</div>

        <div className="flex flex-col space-y-1">
          <h3 className="text-sm text-muted-foreground">Current Streak</h3>

          <p className="font-semibold leading-none tracking-tight">
            {streak} days
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Calendar
          mode="range"
          selected={selectedDates}
          className="rounded-md border w-min"
        />
      </div>
    </div>
  );
}
