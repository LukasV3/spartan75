import { AppSidebar } from "@/components/sidebar/AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard/Dashboard";
import { fetchUserData } from "@/lib/data";

export default async function Page() {
  const userData = await fetchUserData();

  if (!userData) {
    return <div>Error: Failed to load user data</div>; // TODO: Improve error handling. Use notFound()?
  }

  const { userId, user } = userData;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <Dashboard userId={userId} />
    </SidebarProvider>
  );
}
