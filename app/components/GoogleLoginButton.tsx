"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { cred } from "@/lib/cred";

export default function GoogleLoginButton({ 
  redirectPath = "/auth/google-login" 
}: { 
  redirectPath?: string 
} = {}) {
  const [loading, setLoading] = useState(false);

  const supabaseUrl = cred.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = cred.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createBrowserClient(supabaseUrl, supabaseKey);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${redirectPath}?callback=true`,
      },
    });
    
    if (error) {
      // console.error("Error with Google Login:", error.message);
      window.location.href = "/";
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full max-w-md flex items-center justify-center gap-3 bg-white border border-gray-200 text-[#222222] font-semibold py-3.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google Logo" 
        className="w-5 h-5"
      />
      {loading ? "Connecting..." : "Sign in with Google"}
    </button>
  );
}
