import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="relative">
        {/* Animated outer ring */}
        <div className="w-16 h-16 border-4 border-[#0D9488]/10 border-t-[#0D9488] rounded-full animate-spin"></div>
        
        {/* Pulsing inner dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#0D9488] rounded-full animate-pulse"></div>
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-2">
        <h3 className="text-xl font-bold text-[#222222] tracking-tight">Checking...</h3>
        <p className="text-sm text-[#6A6A6A] animate-pulse">Securing your dashboard access</p>
      </div>
    </div>
  );
}
