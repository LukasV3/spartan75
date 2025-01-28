import type { Meta, StoryObj } from "@storybook/react";
import { NavProjects } from "./NavProjects";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Apple, Banana } from "lucide-react";

const meta = {
  title: "Sidebar/Nav Projects",
  component: NavProjects,
  args: {
    projects: [
      {
        name: "Project 1",
        url: "/project-1",
        icon: Apple,
      },
      {
        name: "Project 2",
        url: "/project-2",
        icon: Banana,
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
} satisfies Meta<typeof NavProjects>;

export default meta;
type Story = StoryObj<typeof NavProjects>;

export const Default: Story = {};
