import { NavUser } from "@/components/sidebar/NavUser/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/sidebar/AppLogo/AppLogo";
import { type User } from "@/lib/definitions";

export async function AppSidebar({ user }: { user: User }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>

      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <AppLogo />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
