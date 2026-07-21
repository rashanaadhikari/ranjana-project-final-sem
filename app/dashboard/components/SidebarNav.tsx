"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Heart, User } from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "My Property", href: "/dashboard/properties", icon: Building2 },
    { name: "My Favourites", href: "/dashboard/favourites", icon: Heart },
  ];

  return (
    <>
      <nav className="flex-1 flex flex-col gap-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-[#F0FDFA] text-[#0D9488]"
                  : "text-[#6A6A6A] hover:bg-gray-50 hover:text-[#0D9488]"
              }`}
            >
              <Icon className="w-5 h-5" /> {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-100 pt-6">
        <Link
          href="/dashboard/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
            pathname === "/dashboard/profile"
              ? "bg-[#F0FDFA] text-[#0D9488]"
              : "text-[#6A6A6A] hover:bg-gray-50 hover:text-[#0D9488]"
          }`}
        >
          <User className="w-5 h-5" /> Profile
        </Link>
      </div>
    </>
  );
}
