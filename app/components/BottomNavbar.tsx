"use strict";
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Info, Newspaper, Phone } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Browse",
    href: "/search",
    icon: Search,
  },
  {
    label: "Post",
    href: "/user/dashboard/properties/add",
    icon: PlusCircle,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: Newspaper,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Phone,
  },
];

const BottomNavbar = () => {
  const pathname = usePathname();

  // Hide the navbar on dashboard and admin pages
  if (pathname?.includes("/dashboard") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:pb-6 pointer-events-none">
      <div className="mx-auto max-w-lg w-full pointer-events-auto">
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl md:rounded-full px-2 py-2 flex items-center justify-around transition-all duration-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return ( 
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-[64px] rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "text-brand"
                    : "text-subtitle hover:text-brand hover:bg-brand-light/50"
                }`}
              >
                <div className={`relative transition-transform duration-200 group-hover:scale-110 ${isActive ? "scale-110" : ""}`}>
                  <Icon
                    size={22}
                    className={`stroke-[1.5] ${isActive ? "text-brand" : "text-subtitle group-hover:text-brand"}`}
                  />
                  {/* {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                    </span>
                  )} */}
                </div>
                <span className={`text-[10px] md:text-xs font-medium mt-1 transition-all duration-200 ${isActive ? "text-brand" : "text-subtitle group-hover:text-brand"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="h-1 w-4 bg-brand rounded-full mt-0.5 animate-in fade-in zoom-in duration-300" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
