import type { Meta, StoryObj } from "@storybook/react";
import { NavMain } from "./NavMain";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
  title: "Sidebar/Nav Main",
  component: NavMain,
  args: {
    items: [
      {
        title: "Main",
        url: "/",
      },
      {
        title: "Projects",
        url: "/projects",
      },
    ],
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavMain>;

export default meta;
type Story = StoryObj<typeof NavMain>;

export const Default: Story = {};
