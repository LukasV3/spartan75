import type { Meta, StoryObj } from "@storybook/react";
import { NavCreateUser } from "./NavCreateUser";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
  title: "Sidebar/Nav Create User",
  component: NavCreateUser,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavCreateUser>;

export default meta;
type Story = StoryObj<typeof NavCreateUser>;

export const Default: Story = {};
