import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Progress Bar",
  component: ProgressBar,
  args: {
    percentage: 50,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};
