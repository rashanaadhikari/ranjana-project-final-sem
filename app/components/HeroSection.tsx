"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ITAHARI_WARDS } from "@/lib/constants";

export default function HeroSection() {
  const router = useRouter();
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (ward) params.set("location", ward);
    if (street) params.set("street", street);
    if (budget) params.set("budget", budget);
    if (roomType) params.set("type", roomType);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA] overflow-hidden py-16 md:py-24">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#0D9488] opacity-5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#0F766E] opacity-5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#222222] leading-tight mb-4">
          <span className="text-[#0D9488]">RoomHunt</span> –{" "}
          <span className="block sm:inline">Discover perfect room</span>{" "}
          <span className="block sm:inline">near you.</span>
        </h1>
        <p className="text-[#6A6A6A] text-base md:text-lg max-w-xl mx-auto mb-10">
          Browse hundreds of verified listings for rooms, flats, and office spaces in your area.
        </p>

        {/* Search bar */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row">
            {/* Ward-area */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
              <svg className="w-5 h-5 text-[#0D9488] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex flex-col w-full text-left">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide">Ward-area</label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="text-sm text-[#6A6A6A] bg-transparent outline-none w-full cursor-pointer appearance-none"
                >
                  <option value="">Select Ward</option>
                  {ITAHARI_WARDS.map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Street landmark */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
              <svg className="w-5 h-5 text-[#0D9488] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div className="flex flex-col w-full text-left">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide">Street Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Sangit Chowk"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="text-sm text-[#6A6A6A] bg-transparent outline-none w-full"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
              <svg className="w-5 h-5 text-[#0D9488] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex flex-col w-full text-left">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide">Budget</label>
                <input
                  type="text"
                  placeholder="Set your budget range"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="text-sm text-[#6A6A6A] bg-transparent outline-none w-full"
                />
              </div>
            </div>

            {/* Room Type */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4">
              <svg className="w-5 h-5 text-[#0D9488] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <div className="flex flex-col w-full text-left">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide">Room Type</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="text-sm text-[#6A6A6A] bg-transparent outline-none appearance-none w-full cursor-pointer"
                >
                  <option value="">Select type</option>
                  <option value="single">Single Room</option>
                  <option value="flat">2/3 Rooms Flat</option>
                  <option value="1bhk">1 BHK</option>
                  <option value="2bhk">2 BHK</option>
                  <option value="3bhk">3 BHK</option>
                  <option value="office">Office Space</option>
                  <option value="shutter">Business Shutter</option>
                </select>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="m-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0D9488] text-white rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 justify-center shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* Trust pills */}
        {/* <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-[#6A6A6A]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            500+ Verified Listings
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0D9488] inline-block" />
            Rooms, Flats & Offices
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            24/7 Support
          </span>
        </div> */}
      </div>
    </section>
  );
}
