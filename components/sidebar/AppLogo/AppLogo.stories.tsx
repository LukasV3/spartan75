import type { Meta, StoryObj } from "@storybook/react";
import { AppLogo } from "./AppLogo";
import { SidebarProvider } from "@/components/ui/sidebar";

const meta = {
  title: "Sidebar/App Logo",
  component: AppLogo,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof AppLogo>;

export const Default: Story = {};
