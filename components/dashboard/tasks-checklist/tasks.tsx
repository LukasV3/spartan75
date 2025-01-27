"use client";

import DateHeading from "@/components/dashboard/tasks-checklist/date-heading";
import { fetchUserTasks } from "@/lib/data";
import { UserTask, UserTasksSchema } from "@/lib/definitions";
import TaskListContainer from "@/components/dashboard/tasks-checklist/task-list-container";
import { startOfToday, lightFormat } from "date-fns";
import { useEffect, useState } from "react";

const Tasks = ({ userId }: { userId: string }) => {
  const defaultDate = lightFormat(startOfToday(), "yyyy-MM-dd");
  const [date, setDate] = useState<string>(defaultDate);
  const [tasks, setTasks] = useState<UserTask[]>([]);

  // fetch tasks for the given user id and date
  useEffect(() => {
    fetchUserTasks(userId, date).then((newTasks) => {
      const parseResult = UserTasksSchema.safeParse(newTasks);

      if (!parseResult.success) {
        console.error(parseResult.error);
        return;
      }

      setTasks(parseResult.data);
    });
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

export default Tasks;
