import type { Meta, StoryObj } from "@storybook/react";
import { AppLogo } from "./AppLogo";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
  title: "Sidebar/App Logo",
  component: AppLogo,
  args: {
    streak: 5,
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof AppLogo>;

export const Default: Story = {};
