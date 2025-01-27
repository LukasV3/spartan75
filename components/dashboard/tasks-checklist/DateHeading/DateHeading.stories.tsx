import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DateHeading } from "./DateHeading";

const meta = {
  title: "Date Heading",
  component: DateHeading,
  args: {
    date: "2025-01-01",
    setDate: fn(),
  },
} satisfies Meta<typeof DateHeading>;

export default meta;
type Story = StoryObj<typeof DateHeading>;

export const Default: Story = {};
