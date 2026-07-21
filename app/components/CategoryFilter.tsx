"use client"

import Image from "next/image"
import { useState } from "react"

const categories = [
  { id: "for-you", label: "For You", icon: "/icons/for-you.svg" },
  { id: "single-room", label: "Single Room", icon: "/icons/single-room.svg" },
  { id: "rooms-flat", label: "2/3 Rooms Flat", icon: "/icons/rooms-flat.svg" },
  { id: "1bhk", label: "1BHK", icon: "/icons/1bhk.svg" },
  { id: "2bhk", label: "2BHK", icon: "/icons/2bhk.svg" },
  { id: "3bhk", label: "3BHK", icon: "/icons/3bhk.svg" },
  { id: "office-space", label: "Office Space", icon: "/icons/office-space.svg" },
  { id: "business-shutter", label: "Business Shutter", icon: "/icons/Business-shutter.svg" },
]

interface CategoryFilterProps {
  /** Controlled: which category is currently selected (e.g. "single-room", "for-you") */
  activeCategory?: string;
  /** Called when user clicks a category chip; passes the category id */
  onCategoryChange?: (categoryId: string) => void
}

export default function CategoryFilter({ activeCategory = "for-you", onCategoryChange }: CategoryFilterProps) {
  // Use internal state as fallback if parent doesn't control activeCategory
  const [internalActive, setInternalActive] = useState(activeCategory)

  // Which chip to highlight: prefer the parent-controlled value
  const active = activeCategory ?? internalActive

  const handleSelect = (id: string) => {
    setInternalActive(id)
    onCategoryChange?.(id)
  }


  return (
    <section className="w-full bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-9 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => {
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all duration-200 shrink-0 min-w-[80px] group ${
                  isActive
                    ? "bg-[#F0FDFA] border-2 border-[#0D9488]"
                    : "border-2 border-transparent hover:bg-gray-50"
                }`}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 ${isActive ? "bg-white shadow-sm" : ""}`}>
                  <img
                    src={cat.icon}
                    alt={cat.label}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive ? "text-[#0D9488]" : "text-[#6A6A6A] group-hover:text-[#222222]"
                  }`}
                >
                  {cat.label}
                </span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-[#0D9488] rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
