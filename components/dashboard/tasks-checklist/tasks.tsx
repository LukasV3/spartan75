"use client";

import Task from "@/components/dashboard/tasks-checklist/task";
import ProgressBar from "@/components/dashboard/tasks-checklist/progress-bar";
import DateHeading from "@/components/dashboard/tasks-checklist/date-heading";
import { useToast } from "@/hooks/use-toast";
import { type UserTask } from "@/lib/definitions";
import { useEffect } from "react";

type DailyTasksChecklistProps = {
  tasks: UserTask[];
  currentDayIndex: number;
};

export default function Tasks({
  tasks,
  currentDayIndex,
}: DailyTasksChecklistProps) {
  const { toast } = useToast();
  const numCompletedTasks = tasks.filter((task) => task.completed).length;
  const percentageComplete = (numCompletedTasks / 5) * 100;

  useEffect(() => {
    if (numCompletedTasks === 5) {
      toast({
        title: "Wooooooo! 🥳",
        description: `You completed day ${currentDayIndex}. ${75 - currentDayIndex} to go.`,
      });
    }
  }, [numCompletedTasks, currentDayIndex, toast]);

  return (
    <div className="h-min rounded-xl p-6 space-y-6 bg-muted/50">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-2xl font-semibold tracking-tight">
          Daily Tasks Checklist
          <span className="ml-2">📋</span>
        </h3>

        <p className="text-sm text-muted-foreground">
          This is your tasks checklist
        </p>
      </div>

      <hr />

      <div className="flex flex-col space-y-4">
        <DateHeading />

        <ProgressBar percentage={percentageComplete} />

        <ul className="flex flex-col">
          {tasks.map((task) => (
            <Task
              key={task.id}
              taskName={task.name}
              completed={task.completed}
              id={task.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
