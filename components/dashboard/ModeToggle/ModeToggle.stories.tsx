import type { Meta, StoryObj } from "@storybook/react";
import { ModeToggle } from "./ModeToggle";

const meta = {
  title: "Dashboard/Mode Toggle",
  component: ModeToggle,
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj<typeof ModeToggle>;

export const Default: Story = {};
