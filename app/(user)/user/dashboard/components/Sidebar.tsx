"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Building,
  User,
  Home,
  LogOut,
  Heart,
  Book,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "overview", href: "/user/dashboard/overview", icon: LayoutDashboard },
    { name: "properties", href: "/user/dashboard/properties", icon: Building2 },
    // { name: "bookings", href: "/user/dashboard/bookings", icon: CalendarCheck },
    { name: "favourites", href: "/user/dashboard/favourites", icon: Heart },
    { name: "blogs", href: "/user/dashboard/blogs", icon: Book },
  ];

  return (
    <aside className="w-64 bg-white text-[#222] shrink-0 min-h-screen hidden md:flex flex-col border-r border-gray-200 shadow-sm">
      <div className="p-6">
        <Link href="/user/dashboard/overview" className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-2 rounded-lg max-w-fit">
          <div className=" text-white font-bold px-2 py-1 rounded text-sm">
            <Image
              src="/images/logo.svg"
              alt="RoomHunt Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <span className="text-[#111111] font-bold text-lg tracking-tight">
            RoomHunt
          </span>
        </Link>
        <div className="flex items-center  text-[#111111] font-bold text-lg uppercase">
          <span>User Dashboard</span>
          {/* <ShieldCheck className="w-3 h-3 text-[#0D9488]" /> */}
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold group ${
                isActive
                  ? "bg-[#0D9488]/5 text-[#0D9488]"
                  : "text-gray-600 hover:text-[#0D9488] hover:bg-gray-50"
              }`}
            >
              <link.icon className={`w-5 h-5 transition-colors ${isActive ? "text-[#0D9488]" : "text-gray-400 group-hover:text-[#0D9488]"}`} />
              <span className="capitalize">{link.name.replace("-", " ")}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1 mb-24 md:mb-0">
        <Link
          href="/user/dashboard/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold group ${
            pathname === "/user/dashboard/profile"
              ? "bg-[#0D9488]/10 text-[#0D9488]"
              : "text-gray-600 hover:text-[#0D9488] hover:bg-gray-50"
          }`}
        >
          <User className={`w-5 h-5 transition-colors ${pathname === "/user/dashboard/profile" ? "text-[#0D9488]" : "text-gray-400 group-hover:text-[#0D9488]"}`} />
          <span>Profile</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-[#0D9488] hover:bg-gray-50 transition-all duration-300 font-semibold group"
        >
          <Home className="w-5 h-5 text-gray-400 group-hover:text-[#0D9488]" />
          <span>Go to home</span>
        </Link>
        <button
          onClick={async () => {
             const supabase = createClient();
             await supabase.auth.signOut();
             window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold group"
        >
          <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-600" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
