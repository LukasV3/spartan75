"use client";

import { BadgeCheck, ChevronsUpDown, CircleUserRound } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavCreateUser() {
  const { isMobile, open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="flex items-center justify-center h-8 w-8 rounded-lg">
                <CircleUserRound className="aspect-square h-6 w-6" />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Save my progress!
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-2.5 font-normal">
              <div className="flex items-center gap-2 text-left text-sm mb-3">
                <div className="grid flex-1 text-left text-sm leading-tight gap-y-1">
                  {!open && (
                    <span className="font-semibold">
                      Want to save your progress?
                    </span>
                  )}
                  <span className="text-xs">
                    Your progress won&apos;t be saved unless you create a free
                    account.
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href="sign-up">
                  <BadgeCheck />
                  Create account
                </Link>
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
