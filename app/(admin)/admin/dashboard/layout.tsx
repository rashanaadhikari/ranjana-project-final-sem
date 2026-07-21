import { redirect } from "next/navigation";
import { getLoggedInUserStatus } from "@/services/admin.service";
import { AdminSidebar } from "../components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userStatus = await getLoggedInUserStatus();

  // If user is blocked, redirect to home with reason
  if (userStatus?.is_blocked) {
    const reason = encodeURIComponent(userStatus.blocked_reason || "No reason provided");
    redirect(`/?error=blocked&reason=${reason}`);
  }

  // If user is not an admin, redirect to home
  if (userStatus?.role !== 'admin') {
    redirect("/?error=unauthorized");
  }
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] selection:bg-[#0D9488]/10 selection:text-[#0D9488]">
      <AdminSidebar />
      <main className="flex-1 w-full p-4 md:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
