"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Mail } from "lucide-react";

function BlockedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "Your account has been suspended for security reasons.";

  return (
    <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 text-center border border-red-50 relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-50 rounded-full opacity-50 blur-3xl -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gray-50 rounded-full opacity-50 blur-3xl -z-10"></div>

        <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner ring-4 ring-red-50 animate-bounce">
          <ShieldAlert className="w-12 h-12 text-red-600" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#222222] mb-4 tracking-tight uppercase">Access Denied</h1>
        <p className="text-[#6A6A6A] mb-8 leading-relaxed">
          We&apos;re sorry, but your account has been temporarily blocked from accessing RoomHunt.
        </p>

        <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-3xl p-6 mb-8 text-left relative group hover:bg-red-50 transition-all duration-300">
          <p className="text-[10px] uppercase tracking-widest font-extrabold text-red-400 mb-2">Reason for Suspension</p>
          <p className="text-[#222222] font-semibold italic text-lg leading-snug">
            &quot;{reason}&quot;
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/contact"
            className="w-full flex items-center justify-center gap-2 bg-[#222222] hover:bg-[#333333] text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <Mail className="w-5 h-5 text-red-500" />
            Contact Support
          </Link>
          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 text-[#0D9488] font-bold py-4 rounded-2xl hover:bg-[#F0FDFA] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>

      <p className="text-center mt-10 text-[#6A6A6A] text-sm flex items-center justify-center gap-2">
        <span className="w-1 h-1 rounded-full bg-red-500"></span>
        Security Case ID: #882941
      </p>
    </div>
  );
}

export default function BlockedPage() {
  return (
    <main className="min-h-screen bg-[#F0FDFA]/30 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-red-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#F0FDFA] border-t-[#0D9488] rounded-full animate-spin mb-4"></div>
            <p className="text-[#6A6A6A] font-medium animate-pulse">Loading security status...</p>
        </div>
      }>
        <BlockedContent />
      </Suspense>
    </main>
  );
}
