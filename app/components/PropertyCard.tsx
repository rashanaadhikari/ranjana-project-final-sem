"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import type { Property } from "@/lib/supabase/properties";
import { toggleFavourite, isFavourited } from "@/services/favourites.service";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    isFavourited(property.id).then(res => {
      if (mounted) setSaved(res);
    }).catch(() => {});
    return () => { mounted = false; };
  }, [property.id]);

  // ── Fix: use image_urls array, not image_url ──────────────────────────────
  const imgSrc =
    (property as any).image_urls?.[0] ||
    property.image_url ||
    `https://picsum.photos/seed/${property.id}/400/300`;

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await toggleFavourite(property.id);
      setSaved(result.saved);
      setToastMessage(result.saved ? "Saved to Favourites" : "Removed from Favourites");
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    } catch (error: any) {
      if (error.message === "Login required") {
        setToastMessage("You're not logged in");
        setToast(true);
        setTimeout(() => setToast(false), 2500);
        return;
      }
      const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to unfavourite";
      setToastMessage(errorMessage);
      setToast(true);
      setTimeout(() => setToast(false), 2500);
      
      // console.error("Error toggling favourite:", error);
    }
  };

  return (
    <>
      <Link
        href={`/property/${property.id}`}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-0.5 block relative"
      >
        {/* ... existing Link content ... */}
        {/* Image */}
        <div className="relative w-full h-44 overflow-hidden bg-gray-100">
          <Image
            src={imgSrc}
            alt={property.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
          {/* ID Badge & Optional Badge */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-black px-2.5 py-1 rounded shadow-sm border border-gray-100 uppercase tracking-widest">
              ID: {parseInt(property.id.replace(/-/g, '').slice(0, 8), 16) % 1000}
            </span>
            {property.badge && (
              <span className="bg-[#0D9488] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                {property.badge}
              </span>
            )}
          </div>

          {/* Heart button */}
          <button
            onClick={handleSave}
            aria-label="Save to favourites"
            className={`absolute top-2 right-2 w-8 h-8 rounded-full shadow flex items-center justify-center transition-all duration-200 active:scale-90 ${
              saved ? "bg-[#0D9488]" : "bg-white hover:bg-red-50"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${
                saved ? "fill-white text-white" : "text-[#0D9488]"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-[#222] text-sm leading-snug line-clamp-2 group-hover:text-[#0D9488] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 mt-1.5">
            <svg className="w-3 h-3 text-[#0D9488] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-xs text-[#6A6A6A] truncate">
              {property.location}{property.detailed_address ? ` - ${property.detailed_address}` : ""}
            </span>
          </div>

          <div className="mt-2">
            <span className="inline-block bg-[#F0FDFA] text-[#0D9488] text-xs font-medium px-2 py-0.5 rounded-full">
              {property.room_type}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
            <div>
              <span className="text-[#0D9488] font-bold text-sm">
                Rs. {property.price_per_month?.toLocaleString()}
              </span>
              <span className="text-[#6A6A6A] text-xs"> /mo</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-[#222]">{property.rating ?? 0}</span>
              <span className="text-xs text-[#6A6A6A]">({property.review_count ?? 0})</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Bottom-center saved toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold ${
          toastMessage === "You're not logged in" ? "bg-gray-800" : (saved ? "bg-[#0D9488]" : "bg-gray-800")
        }`}>
          <Heart className={`w-4 h-4 ${saved && toastMessage !== "You're not logged in" ? "fill-white" : ""}`} />
          {toastMessage}
        </div>
      </div>
    </>
  );
}
