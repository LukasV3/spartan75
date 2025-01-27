import type { Meta, StoryObj } from "@storybook/react";
import { NavCreateUser } from "./NavCreateUser";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
  title: "Sidebar/Nav Create User",
  component: NavCreateUser,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavCreateUser>;

export default meta;
type Story = StoryObj<typeof NavCreateUser>;

export const Default: Story = {};
