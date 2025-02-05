"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";

export function AppLogo() {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        75
      </div>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Spartan75</span>

        <span className="truncate text-xs">By Lukas Volk</span>
      </div>
    </SidebarMenuButton>
  );
}
