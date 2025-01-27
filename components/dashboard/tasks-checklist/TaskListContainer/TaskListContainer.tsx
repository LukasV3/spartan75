"use client";

import { TaskList } from "@/components/dashboard/tasks-checklist/TaskList/TaskList";
import { ProgressBar } from "@/components/dashboard/tasks-checklist/ProgressBar/ProgressBar";
import { type UserTask } from "@/lib/definitions";
import { useOptimistic, useTransition } from "react";
import { toggleTaskComplete } from "@/lib/actions";
import { fetchUserTasks } from "@/lib/data";
import { isToday } from "date-fns";

type TaskListContainerProps = {
  tasks: UserTask[];
  userId: string;
  date: string;
  setTasks: (tasks: UserTask[]) => void;
};

export const TaskListContainer = ({
  tasks,
  userId,
  date,
  setTasks,
}: TaskListContainerProps) => {
  const [, startTransition] = useTransition();
  const [optimisticTasks, toggleOptimisticTask] = useOptimistic<
    UserTask[],
    UserTask
  >(tasks, (tasks, toggledTask) => {
    return tasks.map((task) =>
      task.id === toggledTask.id
        ? { ...task, completed: toggledTask.completed }
        : task
    );
  });
  const optimisticPercentComplete =
    (optimisticTasks.filter((task) => task.completed).length / 5) * 100;

  const handleToggleTask = async (task: UserTask) => {
    try {
      // Optimistically update the task state
      toggleOptimisticTask({ ...task, completed: !task.completed });

      // Perform the API call
      await toggleTaskComplete(task.id);

      // Refetch the tasks after the API call succeeds
      const newTasks = await fetchUserTasks(userId, date);
      setTasks(newTasks);
    } catch (error) {
      console.error("Failed to update task:", error);
      // Rollback the optimistic update
      toggleOptimisticTask(task);
    }
  };

  const onTaskClick = (id: number) => {
    // Find the task being toggled
    const task = optimisticTasks.find((task) => task.id === id);
    if (!task) {
      console.error(`Task with id ${id} not found`);
      return;
    }

    startTransition(() => handleToggleTask(task));
  };

  return (
    <>
      <ProgressBar percentage={optimisticPercentComplete} />

      <TaskList
        tasks={optimisticTasks}
        onTaskClick={onTaskClick}
        disabled={!isToday(date)}
      />
    </>
  );
};
