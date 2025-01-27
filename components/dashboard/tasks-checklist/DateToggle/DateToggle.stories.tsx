import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DateToggle } from "./DateToggle";

const meta = {
  title: "DateToggle",
  component: DateToggle,
  args: {
    date: "2025-01-01",
    setDate: fn(),
  },
} satisfies Meta<typeof DateToggle>;

export default meta;
type Story = StoryObj<typeof DateToggle>;

export const Default: Story = {};
