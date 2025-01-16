"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { type UserTask } from "@/lib/definitions";
import { toggleTaskComplete } from "@/lib/actions";
import { useEffect } from "react";

type DailyTasksChecklistProps = {
  tasks: UserTask[];
  currentDayIndex: number;
};

export default function DailyTasksChecklist({
  tasks,
  currentDayIndex,
}: DailyTasksChecklistProps) {
  const { toast } = useToast();
  const numCompletedTasks = tasks.filter((task) => task.completed).length;
  const percentageComplete = (numCompletedTasks / 5) * 100;
  const formattedTodaysDate = new Date().toLocaleDateString("en-gb", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

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

      {/* Date heading */}
      <div className="flex flex-col space-y-4">
        <div className="text-lg font-semibold tracking-tight flex items-center gap-x-2">
          <p>{formattedTodaysDate.split(" ").slice(1).join(" ")}</p>

          <span className="text-xs">●</span>

          <p>Today</p>

          <span className="text-xs">●</span>

          <p>{formattedTodaysDate.split(" ")[0]}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-x-2 pb-1.5">
          <h3 className="text-sm text-muted-foreground shrink-0">
            Todays progress:
          </h3>

          <Progress value={percentageComplete} />

          <p
            className={cn("text-sm text-muted-foreground shrink-0", {
              "text-foreground": percentageComplete === 100,
            })}
          >{`${percentageComplete}%`}</p>
        </div>

        {/* Task List */}
        <ul className="flex flex-col">
          {tasks.map((task) => (
            <TaskItem
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

const TaskItem = ({
  taskName,
  completed,
  id,
}: {
  taskName: string;
  completed: boolean;
  id: number;
}) => {
  return (
    <li className="first:border-t border-b">
      <Label
        htmlFor={`checkbox-${id}`}
        className="flex items-center space-x-2.5 cursor-pointer py-4"
      >
        <Checkbox
          id={`checkbox-${id}`}
          onClick={() => toggleTaskComplete(id)}
          className="rounded-full w-5 h-5 transition-colors hover:bg-muted"
          checked={completed}
        />
        <p className="leading-none peer-data-[state=checked]:line-through">
          {taskName}
        </p>
      </Label>
    </li>
  );
};
