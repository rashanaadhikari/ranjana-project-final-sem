"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import envData from "@/utils/env-data";
import { cred } from "@/lib/cred";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  
  const supabaseUrl = cred.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = cred.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createBrowserClient(supabaseUrl, supabaseKey);
  // console.log("env keys",envData.supabaseUrl,envData.supabaseKey);

  useEffect(() => {
    let isMounted = true;

    // Check for OAuth redirect errors
    const errParams = searchParams.get("error_description") || searchParams.get("error");
    if (errParams) {
      router.push("/");
      return;
    }
    
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user && isMounted) {
        setSaving(true);
        try {
          // Check if user exists in public.users table
          const { data: userData, error } = await supabase
            .from("users")
            .select("id, is_blocked, blocked_reason")
            .eq("id", session.user.id)
            .single();

          if (error || !userData) {
            // User authenticated with Google but hasn't completed registration loop
            await supabase.auth.signOut();
            router.push("/auth/register?error=" + encodeURIComponent("You are not registered in the platform. Please create an account first."));
            return;
          }

          if (userData.is_blocked) {
            await supabase.auth.signOut();
            router.push("/auth/blocked?reason=" + encodeURIComponent(userData.blocked_reason || "Your account has been suspended for security reasons."));
            return;
          }

          // Existing users just route to the dashboard. 
          // Supabase preserves their OAuth session securely.
          router.push("/");
        } catch (error) {
           await supabase.auth.signOut();
           router.push("/auth/register?error=" + encodeURIComponent("Authentication failed. Please try registering again."));
        }
      }
    };

    checkUser();
    
    // Auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        checkUser();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router, searchParams, supabase]);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 mt-16 lg:mt-0">
      <div className="w-full max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] lg:shadow-none lg:p-0 z-10 relative">
         <div className="lg:hidden w-12 h-12 bg-[#0D9488] rounded-xl flex flex-col justify-center items-center mb-6 shadow-md">
           <span className="text-white font-bold text-lg">SS</span>
         </div>
         
         <div className="hidden lg:block absolute -top-16 left-0">
            <Link href="/" className="inline-flex items-center text-[#6A6A6A] hover:text-[#0D9488] transition-colors">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
         </div>
         
         <h1 className="text-3xl sm:text-4xl font-bold text-[#222222] mb-3 tracking-tight">Welcome Back!</h1>
         <p className="text-[#6A6A6A] mb-8 text-base">Sign in to your RoomHunt account to view your dashboard.</p>
         
         {saving ? (
           <div className="text-center py-6">
             <div className="w-8 h-8 border-4 border-[#F0FDFA] border-t-[#0D9488] rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-[#6A6A6A]">Authenticating...</p>
           </div>
         ) : (
           <GoogleLoginButton redirectPath="/auth/login" />
         )}
         
         <p className="mt-8 text-center text-sm text-[#6A6A6A]">
           Don&apos;t have an account?{" "}
           <Link href="/auth/register" className="text-[#0D9488] font-medium hover:underline">
              Register here
           </Link>
         </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white relative">
      <div className="absolute top-8 left-8 lg:hidden z-20">
        <Link href="/" className="inline-flex items-center text-[#6A6A6A] hover:text-[#0D9488] transition-colors bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>
      </div>

      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F0FDFA] flex-col justify-center items-center p-12 text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#0D9488] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-20 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-8 left-1/2 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-md relative z-10">
          <div className="w-16 h-16 bg-[#0D9488] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
             <span className="text-white font-bold text-2xl">SS</span>
          </div>
          <img src="/images/section-stay.png" alt="Illustration" className="w-[80%] h-auto mx-auto mb-10 mix-blend-multiply object-contain" />
          
          <h2 className="text-3xl font-bold text-[#222222] mb-4">Sign in securely</h2>
          <p className="text-[#6A6A6A] text-lg">Use your Google account to log back into the RoomHunt portal.</p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 relative">
        <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-[#F0FDFA] border-t-[#0D9488] rounded-full animate-spin"></div></div>}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
