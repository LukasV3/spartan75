import type { Meta, StoryObj } from "@storybook/react";
import { ModeToggle } from "./ModeToggle";
import { ThemeProvider } from "next-themes";

const meta = {
  title: "Dashboard/Mode Toggle",
  component: ModeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj<typeof ModeToggle>;

export const Default: Story = {};
