"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [adminPhone, setAdminPhone] = useState<string>("+977 980-000-0000");

  useEffect(() => {
    const supabase = createClient();
    
    const updateAuthState = async (session: { user: { id: string; user_metadata: any; email?: string } } | null) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        const metadata = session.user.user_metadata;
        const name = metadata?.full_name || metadata?.name || session.user.email?.split('@')[0] || "User";
        setUserName(name);

        // Fetch role if not in metadata or to be sure
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();
        
        if (userData?.role === "admin") {
          setUserRole("admin");
        } else {
          setUserRole("user");
        }
      } else {
        setUserName(null);
        setUserRole(null);
      }
    };

    // Check current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      updateAuthState(session);
      setIsLoading(false);
    };

    // Fetch Admin Phone
    const fetchAdminPhone = async () => {
      // Just a direct minimal query to get the admin phone to avoid heavy imports
      const { data } = await supabase
        .from("users")
        .select("phone_number")
        .eq("role", "admin")
        .limit(1)
        .single();
      
      if (data?.phone_number) {
        setAdminPhone(data.phone_number);
      }
    };

    checkSession();
    fetchAdminPhone();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        updateAuthState(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.svg"
            alt="RoomHunt Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Phone */}
          <a
            href={`tel:${adminPhone}`}
            className="flex items-center gap-2 text-sm text-[#6A6A6A] hover:text-[#0D9488] transition-colors"
          >
            <svg
              className="w-4 h-4 text-[#0D9488]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="font-medium">
              {adminPhone}/+977 9812397226
              </span>
          </a>

          {/* Auth Button / Profile Icon */}
          {!isLoading && (
            isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* Add Property Button */}
                <Link
                  href="/user/dashboard/properties/add"
                  className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#0D9488]/10 text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-all duration-200 shadow-sm border border-[#0D9488]/20"
                  aria-label="Add Property"
                  title="Add Property"
                >
                  <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </Link>

                <div className="flex flex-col items-end">
                   <span className="text-sm font-semibold text-[#222222]">Hi, {userName}</span>
                   <button
                     onClick={handleLogout}
                     className="text-xs font-medium text-[#6A6A6A] hover:text-[#0D9488] transition-colors duration-200"
                   >
                     Logout
                   </button>
                </div>
                
                {userRole === "admin" && (
                  <Link
                    href="/admin/dashboard/overview"
                    className="flex items-center justify-center px-4 h-10 rounded-full bg-[#222222] text-white hover:bg-[#333333] transition-all duration-200 shadow-sm text-xs font-bold uppercase tracking-widest"
                    title="Admin Dashboard"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  href="/user/dashboard"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F0FDFA] text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-all duration-200 shadow-sm shrink-0"
                  aria-label="Dashboard"
                  title="Customer Dashboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-[#6A6A6A] hover:text-[#0D9488] transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-5 py-2 rounded-full border-2 border-[#0D9488] text-[#0D9488] text-sm font-semibold hover:bg-[#0D9488] hover:text-white transition-all duration-200"
                >
                  Join Us
                </Link>
              </div>
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-[#6A6A6A] hover:text-[#0D9488]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <a
            href={`tel:${adminPhone}`}
            className="flex items-center gap-2 text-sm text-[#6A6A6A]"
          >
            <svg className="w-4 h-4 text-[#0D9488]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            {adminPhone}
          </a>
          {!isLoading && (
            isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <div className="px-5 py-2 border-b border-gray-100 mb-2">
                  <span className="text-sm text-[#6A6A6A]">Signed in as</span>
                  <p className="font-semibold text-[#222222] truncate">{userName}</p>
                </div>
                <Link
                  href="/dashboard"
                  className="w-fit px-5 py-2 rounded-full border-2 border-[#0D9488] bg-[#F0FDFA] text-[#0D9488] text-sm font-semibold flex items-center gap-2 shadow-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-fit px-5 py-2 text-[#6A6A6A] text-sm font-semibold hover:text-[#0D9488] text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  className="w-fit px-5 py-2 text-[#6A6A6A] text-sm font-semibold hover:text-[#0D9488]"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="w-fit px-5 py-2 rounded-full border-2 border-[#0D9488] text-[#0D9488] text-sm font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Join Us
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </header>
  );
}
