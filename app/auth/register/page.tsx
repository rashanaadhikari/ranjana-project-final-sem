"use client";

import RegisterForm from "../../components/RegisterForm";
import Link from "next/link";
import { ArrowLeft, AlertCircle, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";

function RegisterContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorMsg = searchParams.get("error");
    if (errorMsg) {
      setError(errorMsg);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F0FDFA] flex-col justify-center items-center p-12 text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#0D9488] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-20 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-8 left-1/2 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-md relative z-10">
          <Link href="/" className="inline-flex items-center text-[#6A6A6A] hover:text-[#0D9488] transition-colors mb-12 absolute -top-20 left-0">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <div className="w-16 h-16 bg-[#0D9488] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
             <span className="text-white font-bold text-2xl">SS</span>
          </div>
          <img src="/images/section-stay.png" alt="Illustration" className="w-[80%] h-auto mx-auto mb-10 mix-blend-multiply object-contain" />
          
          <h2 className="text-3xl font-bold text-[#222222] mb-4">Find your perfect space</h2>
          <p className="text-[#6A6A6A] text-lg">Join RoomHunt to browse thousands of verified properties tailored to your needs.</p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link href="/" className="inline-flex items-center text-[#6A6A6A] hover:text-[#0D9488] transition-colors">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] lg:shadow-none lg:p-0">
           {error && (
             <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 relative animate-in fade-in slide-in-from-top-4 duration-500">
               <AlertCircle className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
               <div className="flex-1">
                 <p className="text-sm font-semibold text-[#0D9488]">{error}</p>
               </div>
               <button 
                onClick={() => setError(null)}
                className="text-red-300 hover:text-red-500 transition-colors"
                aria-label="Dismiss"
               >
                 <X className="w-4 h-4" />
               </button>
             </div>
           )}

           <div className="lg:hidden w-12 h-12 bg-[#0D9488] rounded-xl flex items-center justify-center mb-6 shadow-md">
             <span className="text-white font-bold text-lg">SS</span>
           </div>
           
           <h1 className="text-3xl sm:text-4xl font-bold text-[#222222] mb-3 tracking-tight">Create Account</h1>
           <p className="text-[#6A6A6A] mb-8 text-base">Step 1 of 2: Let&apos;s get to know you better. Please provide your basic details.</p>
           
           <RegisterForm />
           
           <p className="mt-8 text-center text-sm text-[#6A6A6A]">
             Already have an account?{" "}
             <Link href="/auth/login" className="text-[#0D9488] font-medium hover:underline">
                Sign in
             </Link>
           </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
