import type { Meta, StoryObj } from "@storybook/react";
import { NavUser } from "./NavUser";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
  title: "Sidebar/Nav User",
  component: NavUser,
  args: {
    user: {
      username: "johndoe",
      email: "johndoe@email.com",
      avatar: "",
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavUser>;

export default meta;
type Story = StoryObj<typeof NavUser>;

export const Default: Story = {};
