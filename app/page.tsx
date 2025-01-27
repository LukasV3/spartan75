import { AppSidebar } from "@/components/sidebar/AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard/Dashboard";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <SidebarProvider>
      <AppSidebar />

      <Dashboard />
    </SidebarProvider>
  );
}
