"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { fetchProperties, SAMPLE_PROPERTIES, type Property } from "@/lib/supabase/properties";

interface PropertyGridProps {
  /** Category id from the parent (e.g. "single-room", "2bhk", "for-you").
   *  When changed, the grid resets to page 0 and re-fetches real data from Supabase. */
  activeCategory?: string;
}

export default function PropertyGrid({ activeCategory = "for-you" }: PropertyGridProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 8;

  // Re-fetch whenever activeCategory or page changes.
  // roomType === "for-you" means "no filter" — show all active listings.
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchProperties({
          roomType: activeCategory,   // "for-you" is safe — fetchProperties handles it
          limit: PAGE_SIZE,
          offset: page * PAGE_SIZE,
        });
        setProperties(data);
      } catch {
        setProperties(SAMPLE_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeCategory, page]);

  // Reset to first page whenever the category chip changes
  useEffect(() => {
    setPage(0);
  }, [activeCategory]);


  const totalPages = Math.ceil(
    properties.length > 0 ? properties.length / PAGE_SIZE : SAMPLE_PROPERTIES.length / PAGE_SIZE
  );

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#222222]">Available Properties</h2>
            <p className="text-sm text-[#6A6A6A] mt-0.5">
              {properties.length} listings found
            </p>
          </div>
          <Link 
            href="/search"
            className="text-sm text-[#0D9488] font-medium flex items-center gap-1 hover:underline cursor-pointer"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="w-full h-44 bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="flex justify-between pt-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-2 rounded-full border border-gray-200 hover:border-[#0D9488] hover:text-[#0D9488] disabled:opacity-30 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  page === i ? "w-6 bg-[#0D9488]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className="p-2 rounded-full border border-gray-200 hover:border-[#0D9488] hover:text-[#0D9488] disabled:opacity-30 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
