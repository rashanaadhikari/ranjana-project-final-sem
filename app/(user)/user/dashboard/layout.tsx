import { redirect } from "next/navigation";
import { getLoggedInUserStatus } from "@/services/admin.service";
import { Sidebar } from "./components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userStatus = await getLoggedInUserStatus();

  // If user is not logged in, redirect to home
  if (!userStatus) {
    redirect(`/?error=unauthenticated_user`);
  }

  // If user is blocked, redirect to home with reason
  if (userStatus.is_blocked) {
    const reason = encodeURIComponent(userStatus.blocked_reason || "No reason provided");
    redirect(`/?error=blocked&reason=${reason}`);
  }
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
