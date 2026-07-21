"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import PropertyCard from "@/app/components/PropertyCard"
import { fetchProperties, type Property } from "@/lib/supabase/properties"
import { ITAHARI_WARDS } from "@/lib/constants"

// ─── Category chips (same as home page CategoryFilter) ───────────────────────
const ROOM_TYPES = [
  { id: "for-you",          label: "All Types" },
  { id: "single-room",      label: "Single Room" },
  { id: "rooms-flat",       label: "2/3 Rooms Flat" },
  { id: "1bhk",             label: "1 BHK" },
  { id: "2bhk",             label: "2 BHK" },
  { id: "3bhk",             label: "3 BHK" },
  { id: "office-space",     label: "Office Space" },
  { id: "business-shutter", label: "Business Shutter" },
]

// ─── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "newest",    label: "Newest First" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc",label: "Price: High → Low" },
]

function SearchContent() {
  const searchParams   = useSearchParams()
  const router         = useRouter()

  // ── Filter state (initialised from URL params so links/bookmarks work) ──────
  const [location,   setLocation]   = useState(searchParams.get("location") || "")
  const [street,     setStreet]     = useState(searchParams.get("street") || "")
  const [minBudget,  setMinBudget]  = useState(searchParams.get("min") || "")
  const [maxBudget,  setMaxBudget]  = useState(searchParams.get("budget") || "")
  const [roomType,   setRoomType]   = useState(searchParams.get("type") || "for-you")
  const [sortBy,     setSortBy]     = useState<string>("newest")

  // ── Results state ─────────────────────────────────────────────────────────
  const [properties, setProperties] = useState<Property[]>([])
  const [loading,    setLoading]    = useState(true)
  const [hasSearched, setHasSearched] = useState(false)

  // ── Core search function — queries Supabase with real data ────────────────
  const runSearch = useCallback(async (
    loc: string, str: string, min: string, max: string, type: string
  ) => {
    setLoading(true)
    try {
      // fetchProperties already handles roomType, location, maxBudget filters
      // We pass minBudget too (added to properties.ts below)
      const results = await fetchProperties({
        roomType:  type === "for-you" ? undefined : type,
        location:  loc  || undefined,
        street:    str  || undefined,
        minBudget: min  ? parseInt(min)  : undefined,
        maxBudget: max  ? parseInt(max)  : undefined,
        limit: 50,   // Load up to 50 results on search page
      })
      setProperties(results)
    } catch (err) {
      console.error("Search error:", err)
      setProperties([])
    } finally {
      setLoading(false)
      setHasSearched(true)
    }
  }, [])

  // ── On mount — run search immediately with URL params so direct links work ─
  useEffect(() => {
    runSearch(
      searchParams.get("location") || "",
      searchParams.get("street") || "",
      searchParams.get("min") || "",
      searchParams.get("budget") || "",
      searchParams.get("type") || "for-you"
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally run once on mount

  // ── Handle Search button click ────────────────────────────────────────────
  const handleSearch = () => {
    // Push new URL params so the search is bookmarkable / shareable
    const params = new URLSearchParams()
    if (location)  params.set("location", location)
    if (street)    params.set("street", street)
    if (minBudget) params.set("min", minBudget)
    if (maxBudget) params.set("budget", maxBudget)
    if (roomType && roomType !== "for-you") params.set("type", roomType)
    router.replace(`/search?${params.toString()}`, { scroll: false })

    runSearch(location, street, minBudget, maxBudget, roomType)
  }

  // ── Sort properties client-side ───────────────────────────────────────────
  const sorted = [...properties].sort((a, b) => {
    if (sortBy === "price-asc")  return a.price_per_month - b.price_per_month
    if (sortBy === "price-desc") return b.price_per_month - a.price_per_month
    return 0 // "newest" — already ordered by Supabase (created_at desc)
  })

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0FDFA] py-10 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#222222]">
            Find Your <span className="text-[#0D9488]">Perfect Room</span>
          </h1>
          <p className="text-[#6A6A6A] text-sm mt-1">
            Filter by location, budget, and room type to get exactly what you need.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT SIDEBAR — Filter panel ──────────────────────────────── */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-4">
              <h2 className="text-base font-bold text-[#222222] mb-5 flex items-center gap-2">
                {/* Filter icon */}
                <svg className="w-4 h-4 text-[#0D9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filters
              </h2>

              {/* Ward-area ─────────────────────────────────────────────────── */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide block mb-1.5">
                  📍 Ward-area
                </label>
                <select
                  id="search-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#222222] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 transition bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select Ward</option>
                  {ITAHARI_WARDS.map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              {/* Street landmark ────────────────────────────────────────────── */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide block mb-1.5">
                  🏪 Street Landmark
                </label>
                <input
                  id="search-street"
                  type="text"
                  placeholder="e.g. Sangit Chowk"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#222222] placeholder-gray-400 outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 transition"
                />
              </div>

              {/* Budget ────────────────────────────────────────────────────── */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide block mb-1.5">
                  💰 Budget (NPR / month)
                </label>
                <div className="flex gap-2">
                  <input
                    id="search-min-budget"
                    type="number"
                    placeholder="Min"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    className="w-1/2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#222222] placeholder-gray-400 outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 transition"
                  />
                  <input
                    id="search-max-budget"
                    type="number"
                    placeholder="Max"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="w-1/2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#222222] placeholder-gray-400 outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 transition"
                  />
                </div>
              </div>

              {/* Room type chips ────────────────────────────────────────────── */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-[#222222] uppercase tracking-wide block mb-2">
                  🏠 Room Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {ROOM_TYPES.map((rt) => (
                    <button
                      key={rt.id}
                      onClick={() => setRoomType(rt.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-150 ${
                        roomType === rt.id
                          ? "bg-[#0D9488] text-white border-[#0D9488]"
                          : "bg-white text-[#6A6A6A] border-gray-200 hover:border-[#0D9488] hover:text-[#0D9488]"
                      }`}
                    >
                      {rt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search button ────────────────────────────────────────────── */}
              <button
                id="search-submit-btn"
                onClick={handleSearch}
                className="w-full py-3 bg-[#0D9488] hover:bg-[#0D9488] text-white rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Properties
              </button>

              {/* Clear filters ────────────────────────────────────────────── */}
              {(location || street || minBudget || maxBudget || roomType !== "for-you") && (
                <button
                  onClick={() => {
                    setLocation(""); setStreet(""); setMinBudget(""); setMaxBudget(""); setRoomType("for-you")
                    router.replace("/search", { scroll: false })
                    runSearch("", "", "", "", "for-you")
                  }}
                  className="w-full mt-2 py-2 text-sm text-[#6A6A6A] hover:text-[#0D9488] transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* ── RIGHT PANEL — Results ─────────────────────────────────────── */}
          <section className="flex-1 min-w-0">
            {/* Results header row */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <p className="text-lg font-bold text-[#222222]">
                  {loading ? "Searching…" : `${sorted.length} ${sorted.length === 1 ? "property" : "properties"} found`}
                </p>
                {!loading && hasSearched && (location || street || minBudget || maxBudget || roomType !== "for-you") && (
                  <p className="text-xs text-[#6A6A6A] mt-0.5">
                    {/* Show active filter summary */}
                    {[
                      location && `in "${location}"`,
                      street && `at "${street}"`,
                      (minBudget || maxBudget) && `budget: Rs. ${minBudget || "0"} – ${maxBudget || "∞"}`,
                      roomType !== "for-you" && ROOM_TYPES.find(r => r.id === roomType)?.label,
                    ].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-[#222222] outline-none focus:border-[#0D9488] transition bg-white"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* ── Loading skeletons ─────────────────────────────────────── */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                    <div className="w-full h-44 bg-gray-200" />
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Property results grid ─────────────────────────────────── */}
            {/* Each PropertyCard links to /property/[id] for full details */}
            {!loading && sorted.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sorted.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* ── Empty state ───────────────────────────────────────────── */}
            {!loading && hasSearched && sorted.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-[#F0FDFA] flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-[#0D9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#222222] mb-1">No properties found</h3>
                <p className="text-sm text-[#6A6A6A] max-w-xs">
                  Try adjusting your filters — change the location, increase your budget, or select a different room type.
                </p>
                <button
                  onClick={() => {
                    setLocation(""); setStreet(""); setMinBudget(""); setMaxBudget(""); setRoomType("for-you")
                    router.replace("/search", { scroll: false })
                    runSearch("", "", "", "", "for-you")
                  }}
                  className="mt-4 px-5 py-2 bg-[#0D9488] text-white text-sm font-semibold rounded-full hover:bg-[#0D9488] transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0D9488]" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
