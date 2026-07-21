"use client";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#0D9488]/20 border-t-[#0D9488] rounded-full animate-spin"></div>
      <p className="text-[#6A6A6A] font-medium animate-pulse">Adding your property...</p>
    </div>
  );
}
