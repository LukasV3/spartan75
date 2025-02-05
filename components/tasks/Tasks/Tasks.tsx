"use client";

import { DateHeading } from "@/components/tasks/DateHeading/DateHeading";
import { fetchUserTasks } from "@/lib/data";
import { UserTask } from "@/lib/definitions";
import { TaskListContainer } from "@/components/tasks/TaskListContainer/TaskListContainer";
import { startOfToday, lightFormat } from "date-fns";
import { useEffect, useState } from "react";

export const Tasks = ({ userId }: { userId: string }) => {
  const defaultDate = lightFormat(startOfToday(), "yyyy-MM-dd");
  const [date, setDate] = useState<string>(defaultDate);
  const [tasks, setTasks] = useState<UserTask[]>([]);

  // fetch tasks for the given user id and date
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const newTasks = await fetchUserTasks(userId, date);
        setTasks(newTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [userId, date]);

  return (
    <div className="h-min rounded-xl p-6 space-y-6">
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
        <DateHeading date={date} setDate={setDate} />

        <TaskListContainer
          tasks={tasks}
          userId={userId}
          date={date}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
};
