"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { 
  CheckCircle, 
  Banknote, 
  Home, 
  BedDouble, 
  ChefHat, 
  Armchair, 
  Layers, 
  PhoneCall, 
  Info,
  MapPin,
  Star
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import PropertyCard from "@/app/components/PropertyCard"
import { FavouriteButton } from "@/app/components/HeartButton"
// import BookingModal from "./components/BookingModal"

import {
  fetchPropertyById,
  fetchRecommendedProperties,
  type Property,
} from "@/lib/supabase/properties"
import { createClient } from "@/lib/supabase/client"
import { isFavourited } from "@/services/favourites.service"

export default function PropertyDetailsPage() {
  const params = useParams()
  const id = params?.id as string
  const [property, setProperty] = useState<Property | null>(null)
  const [recommendedProperties, setRecommendedProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!id) return

    async function loadData() {
      setLoading(true)
      const selectedProperty = await fetchPropertyById(id)
      
      if (!selectedProperty) {
        setProperty(null)
        setRecommendedProperties([])
        setLoading(false)
        return
      }

      setProperty(selectedProperty)
      
      // Fetch recommendations
      const recommendations = await fetchRecommendedProperties(selectedProperty, 4)
      setRecommendedProperties(recommendations)

      // Check favourite status
      const saved = await isFavourited(id)
      setIsSaved(saved)

      // Check booking status
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('bookings')
          .select('status')
          .eq('property_id', id)
          .eq('user_id', user.id)
          .maybeSingle()
        if (data) {} // Booking status check
      }

      setLoading(false)
    }

    loadData()
  }, [id])

  // Removed auto-slider interval so user can manually select images through thumbnails.

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
          <div className="h-10 w-52 bg-gray-200 rounded-xl mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-[2.5rem]" />
            <div className="space-y-6">
              <div className="h-12 w-3/4 bg-gray-200 rounded-xl" />
              <div className="h-6 w-1/2 bg-gray-200 rounded-xl" />
              <div className="h-32 w-full bg-gray-200 rounded-[2rem]" />
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <Info className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-black text-heading">Listing Not Found</h1>
          <p className="text-subtitle mt-4 max-w-md mx-auto">This property may have been removed or the link is incorrect. Please explore our other verified listings.</p>
          <Link href="/" className="inline-flex mt-10 bg-brand text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:shadow-xl transition-all active:scale-95">
            Back to Home
          </Link>
        </section>
        <Footer />
      </main>
    )
  }

  const imageUrls = property.image_urls && property.image_urls.length > 0
    ? property.image_urls
    : [property.image_url || `https://picsum.photos/seed/${property.id}/1200/800`].filter(Boolean) as string[]

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand font-black tracking-widest uppercase hover:underline mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Back to listings
        </Link>

        {/* Main Image View */}
        <div className="relative w-full h-[30rem] sm:h-[35rem] rounded-[2.5rem] overflow-hidden bg-gray-900 shadow-2xl ring-1 ring-gray-100 group flex items-center justify-center">
          <Image
            src={imageUrls[currentSlide]}
            alt={`${property.title} - Main Image`}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Badge Overlays */}
          {property.badge && (
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-brand text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">
                {property.badge}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Selector (First Image Selection) */}
        {imageUrls.length > 1 && (
          <div className="flex gap-4 overflow-x-auto py-6 mb-4 snap-x hide-scrollbar">
            {imageUrls.map((url, index) => (
              <button
                key={`thumb-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 snap-start transition-all duration-300 ring-offset-2 ${
                  currentSlide === index ? "ring-4 ring-brand opacity-100 scale-105" : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <Image src={url} alt="thumbnail" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col gap-10 items-stretch">
          <div className="space-y-8">
             {/* Header Section */}
             <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-xs font-black text-subtitle mb-4 uppercase tracking-[0.2em]">
                   <MapPin className="w-4 h-4 text-brand" />
                   {property.location}{property.detailed_address ? `, ${property.detailed_address}` : ""}
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-heading leading-[1.1] mb-6">
                   {property.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4">
                   <span className="bg-brand-light text-brand px-6 py-2.5 rounded-2xl text-xs font-black border border-brand/10 tracking-widest uppercase shadow-sm">
                      {property.room_type}
                   </span>
                   {/* <div className="flex items-center gap-2 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100 shadow-inner">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <span className="text-sm font-black text-heading">{property.rating}</span>
                      <span className="text-xs text-subtitle font-bold">({property.review_count} reviews)</span>
                   </div> */}
                </div>
             </div>

             {/* Details Grid Section */}
             <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-8">
                   <div className="w-12 h-12 rounded-[1.25rem] bg-brand-light text-brand flex items-center justify-center shadow-inner">
                      <Info className="w-6 h-6" />
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-heading uppercase tracking-widest">Property Details</h2>
                      <p className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mt-1">Verified Specifications</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-16">
                   {/* Column 1 */}
                   <div className="space-y-3 group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 group-hover/item:text-brand transition-colors">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Rent Status
                      </p>
                      <p className="text-xl font-black text-heading">Available Now</p>
                   </div>
                   <div className="space-y-3 text-left sm:text-right group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 sm:justify-end group-hover/item:text-brand transition-colors">
                        <Banknote className="w-4 h-4 text-brand" /> Price / Month
                      </p>
                      <p className="text-xl font-black text-brand">Rs. {property.price_per_month.toLocaleString()}</p>
                   </div>

                   {/* Column 2 */}
                   <div className="space-y-3 group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 group-hover/item:text-brand transition-colors">
                        <Home className="w-4 h-4 text-blue-500" /> Architecture
                      </p>
                      <p className="text-xl font-black text-heading">{property.room_type}</p>
                   </div>
                   <div className="space-y-3 text-left sm:text-right group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 sm:justify-end group-hover/item:text-brand transition-colors">
                        <BedDouble className="w-4 h-4 text-indigo-500" /> Bedrooms
                      </p>
                      <p className="text-xl font-black text-heading">{property.bedrooms || '1'}</p>
                   </div>

                   {/* Column 3 */}
                   <div className="space-y-3 group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 group-hover/item:text-brand transition-colors">
                        <ChefHat className="w-4 h-4 text-orange-500" /> Kitchen Count
                      </p>
                      <p className="text-xl font-black text-heading">{property.kitchens || '1'}</p>
                   </div>
                   <div className="space-y-3 text-left sm:text-right group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 sm:justify-end group-hover/item:text-brand transition-colors">
                        <Armchair className="w-4 h-4 text-purple-500" /> Living Area
                      </p>
                      <p className="text-xl font-black text-heading">{(property.is_living_room_available === true || String(property.is_living_room_available).toLowerCase() === 'true') ? 'Premium Hall' : 'Not Included'}</p>
                   </div>

                   {/* Column 4 */}
                   <div className="space-y-3 group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 group-hover/item:text-brand transition-colors">
                        <Layers className="w-4 h-4 text-cyan-500" /> Floor Level
                      </p>
                      <p className="text-xl font-black text-heading">{property.floor_number || 'Ground Floor'}</p>
                   </div>
                   <div className="space-y-3 text-left sm:text-right group/item">
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.25em] flex items-center gap-2 sm:justify-end group-hover/item:text-brand transition-colors">
                        <PhoneCall className="w-4 h-4 text-brand" /> Owner Contact
                      </p>
                      <p className="text-xl font-black text-heading tracking-wider">9819030363</p>
                   </div>
                </div>
             </div>

             {/* Description Section */}
             <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-black text-heading mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Overview</h2>
                <div className="prose prose-lg max-w-none text-subtitle leading-[1.8] space-y-6">
                   {property.description ? (
                      property.description.split('\n').map((para, i) => (
                        para.trim() && <p key={i} className="text-subtitle font-medium">{para}</p>
                      ))
                   ) : (
                      <p className="text-subtitle font-medium  opacity-70">
                        This premium property in {property.location} offers an exceptional living experience with modern amenities and a prime location. Perfect for those seeking quality, comfort, and luxury.
                      </p>
                   )}
                </div>
             </div>
          </div>

          {/* Right Sidebar - Sticky Booking & Price */}
          <div className="lg:sticky lg:top-24 space-y-8">
             <div className="bg-white rounded-[3rem] p-8 sm:p-12 border border-gray-100 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
                <div className="p-10 rounded-[2.5rem] border border-brand/10 bg-gradient-to-br from-brand-light/40 to-brand-light mb-12 shadow-inner text-center">
                   <p className="text-[11px] uppercase font-black tracking-[0.3em] text-subtitle mb-4">Investment / Rate</p>
                   <p className="text-5xl sm:text-6xl font-black text-brand flex items-baseline justify-center gap-2">
                      <span className="text-2xl">Rs.</span>
                      {property.price_per_month.toLocaleString()}
                      <span className="text-lg font-bold text-subtitle">/mo</span>
                   </p>
                </div>

                <div className="space-y-5">
                   {/* <button 
                     onClick={() => setIsModalOpen(true)}
                     className="w-full bg-brand text-white py-6 rounded-2xl font-black text-xl shadow-[0_15px_45px_-12px_rgba(227,28,91,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(227,28,91,0.6)] hover:-translate-y-1.5 transition-all active:scale-[0.96] uppercase tracking-[0.15em] glow-effect"
                   >
                      Book This Property
                   </button> */}
                   <FavouriteButton propertyId={property.id} initialSaved={isSaved} />
                </div>

                {/* <div className="mt-12 pt-10 border-t border-gray-50 flex flex-col items-center gap-6">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[10px] font-black text-subtitle uppercase tracking-[0.3em] opacity-80">
                         Property Status: Active
                      </p>
                   </div>
                   <div className="flex items-center gap-8 opacity-40 grayscale contrast-150">
                      <div className="w-12 h-6 bg-gray-300 rounded-lg shadow-sm" />
                      <div className="w-12 h-6 bg-gray-300 rounded-lg shadow-sm" />
                      <div className="w-12 h-6 bg-gray-300 rounded-lg shadow-sm" />
                   </div>
                   <p className="text-[9px] font-bold text-subtitle uppercase tracking-widest text-center max-w-[200px] leading-relaxed">
                      All transactions are protected by RoomHunt verified guarantee.
                   </p>
                </div> */}
             </div>

             {/* Instant Support Card */}
             <div className="bg-brand rounded-[2.5rem] p-8 text-white shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-colors" />
                <h3 className="text-lg font-black uppercase tracking-widest mb-2">Need Support?</h3>
                <p className="text-xs sm:text-sm font-bold text-white uppercase opacity-70">Our experts are available 24/7 to help you find your dream home.</p>
                <Link href="/contact" className="inline-flex items-center gap-5 bg-white text-brand px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-light transition-colors">
                  Contact Us <PhoneCall className="w-4 h-4" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {/* {isModalOpen && (
        <BookingModal
          propertyId={property.id}
          propertyName={property.title}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false)
            setBookingStatus('pending')
          }}
        />
      )} */}

      {/* Recommendations Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
           <div className="space-y-1">
              <h2 className="text-2xl sm:text-4xl font-black text-heading tracking-tight">See other options</h2>
              <p className="text-xs sm:text-sm font-bold text-subtitle uppercase opacity-70">Exploring alternative living experiences</p>
           </div>
           <Link href="/search" className="bg-white hover:bg-gray-50 text-heading px-10 py-4 rounded-2xl text-xs font-black tracking-[0.2em] uppercase transition-all border border-gray-100 shadow-sm active:scale-95 text-center">
             Explore All
           </Link>
        </div>

        {recommendedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recommendedProperties.map((rec) => (
              <PropertyCard key={rec.id} property={rec} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 border-dashed shadow-inner">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Star className="w-10 h-10 text-gray-200" />
            </div>
            <p className="text-subtitle font-black  tracking-widest text-lg uppercase opacity-40">Seeking similar jewels for you...</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
