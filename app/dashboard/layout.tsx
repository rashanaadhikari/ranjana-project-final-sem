import { getLoggedInUserStatus } from "@/services/admin.service";
import { redirect } from "next/navigation";
import Link from "next/link";
import SidebarNav from "./components/SidebarNav";

export default async function DashboardLayout({
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 p-6 sticky top-0 h-screen">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-[#0D9488] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">SS</span>
          </div>
          <span className="font-bold text-xl text-[#222222]">RoomHunt</span>
        </Link>
        
        <SidebarNav />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 pb-32">
        {/* Mobile Header (since sidebar is hidden on mobile) */}
        <div className="md:hidden flex items-center justify-between mb-8">
           <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0D9488] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">SS</span>
            </div>
            <span className="font-bold text-xl text-[#222222]">RoomHunt</span>
          </Link>
        </div>
        
        {children}
      </main>
    </div>
  );
}
