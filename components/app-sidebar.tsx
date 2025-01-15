import * as React from "react";

// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { NavCreateUser } from "@/components/nav-create-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppLogo } from "./app-logo";
import { currentUser } from "@clerk/nextjs/server";
import { UserSchema } from "@/lib/definitions";

export async function AppSidebar() {
  const user = await currentUser();

  // TODO: Handle if user is not signed in
  if (!user) return <div>No user :(</div>;

  // Runtime type checks
  const parseResult = UserSchema.safeParse(user);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return;
  }

  const {
    username,
    emailAddresses: [{ emailAddress }],
    imageUrl,
  } = parseResult.data;

  const formattedUser = {
    username,
    email: emailAddress,
    avatar: imageUrl,
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {user ? <NavUser user={formattedUser} /> : <NavCreateUser />}
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
