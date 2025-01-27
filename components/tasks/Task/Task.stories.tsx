import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Task } from "./Task";

const meta = {
  title: "Tasks/Task",
  component: Task,
  args: {
    taskName: "Test task",
    id: 1,
    completed: false,
    disabled: false,
    onTaskClick: fn(),
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof Task>;

export const Default: Story = {};
