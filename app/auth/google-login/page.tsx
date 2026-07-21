"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cred } from "@/lib/cred";

function GoogleLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Next.js components that useSearchParams must be wrapped in Suspense boundary
  const supabaseUrl = cred.NEXT_PUBLIC_SUPABASE_URL|| "";
  const supabaseKey =cred.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createBrowserClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    let isMounted = true;

    const phone = sessionStorage.getItem("register_phone");
    const address = sessionStorage.getItem("register_address");
    
    if (!phone || !address) {
        router.push("/auth/register");
        return;
    }

    const errParams = searchParams.get("error_description") || searchParams.get("error");
    if (errParams) {
      router.push("/");
      return;
    }
    
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user && isMounted) {
        setSaving(true);
        const phone = sessionStorage.getItem("register_phone") || "";
        const address = sessionStorage.getItem("register_address") || "";
        
        const user = session.user;
        const metadata = user.user_metadata || {};
        
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", user.id)
          .single();

        if (existingUser && isMounted) {
          // If user exists, they are already registered
          sessionStorage.removeItem("register_phone");
          sessionStorage.removeItem("register_address");
          router.push("/auth/register?error=This account is already registered");
          return;
        }

        // Insert into users table
        const { data: userData, error } = await supabase
          .from("users")
          .upsert({
            id: user.id,
            google_id: user.id, // using auth.users id
            name: metadata.full_name || "",
            email: user.email || "",
            phone_number: phone,
            address: address,
            avatar_url: metadata.avatar_url || "",
            updated_at: new Date().toISOString(),
          })
          .select('role, is_blocked, blocked_reason')
          .single();
          
        if (!error && isMounted) {
          // Clear temp data
          sessionStorage.removeItem("register_phone");
          sessionStorage.removeItem("register_address");

          if (userData?.is_blocked) {
            // If user is blocked, sign them out and redirect to blocked page
            await supabase.auth.signOut();
            router.push(`/auth/blocked?reason=${encodeURIComponent(userData.blocked_reason || "No reason provided")}`);
            return;
          }

          if (userData?.role === 'admin') {
            router.push("/admin/dashboard/overview");
          } else {
            router.push("/");
          }
        } else if (error) {
          // console.error("Error saving user data:", error);
          if (isMounted) {
            router.push("/");
          }
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
            <Link href="/auth/register" className="inline-flex items-center text-[#6A6A6A] hover:text-[#0D9488] transition-colors">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Step 1
            </Link>
         </div>
         
         <h1 className="text-3xl sm:text-4xl font-bold text-[#222222] mb-3 tracking-tight">Almost there!</h1>
         <p className="text-[#6A6A6A] mb-8 text-base">Step 2 of 2: Click below to authenticate with your Google account.</p>
         
         {authError ? (
           <div className="text-center py-6">
             <div className="w-12 h-12 bg-red-100 text-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </div>
             <p className="text-[#222222] font-semibold mb-2">Authentication Failed</p>
             <p className="text-[#6A6A6A] text-sm mb-6">{authError}</p>
             <button
               onClick={() => setAuthError(null)}
               className="inline-flex items-center justify-center w-full mb-3 bg-white border border-gray-200 text-[#222222] font-semibold py-3.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
             >
               Try Again
             </button>
             <Link 
               href="/auth/register" 
               className="inline-flex items-center justify-center w-full text-sm text-[#6A6A6A] hover:text-[#0D9488] transition-colors"
             >
               Return to Step 1
             </Link>
           </div>
         ) : saving ? (
           <div className="text-center py-6">
             <div className="w-8 h-8 border-4 border-[#F0FDFA] border-t-[#0D9488] rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-[#6A6A6A]">Setting up your account...</p>
           </div>
         ) : (
           <GoogleLoginButton />
         )}
      </div>
    </div>
  );
}

export default function GoogleLoginPage() {
  return (
    <div className="min-h-screen flex bg-white relative">
      <div className="absolute top-8 left-8 lg:hidden z-20">
        <Link href="/auth/register" className="inline-flex items-center text-[#6A6A6A] hover:text-[#0D9488] transition-colors bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
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
          
          <h2 className="text-3xl font-bold text-[#222222] mb-4">Complete your registration</h2>
          <p className="text-[#6A6A6A] text-lg">Sign in with Google to finish setting up your account securely.</p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 relative">
        <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-[#F0FDFA] border-t-[#0D9488] rounded-full animate-spin"></div></div>}>
          <GoogleLoginContent />
        </Suspense>
      </div>
    </div>
  );
}
