'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, MoreVertical, Trash2, MapPin } from 'lucide-react'
import { toggleFavourite } from '@/services/favourites.service'
import { Toast } from '@/app/components/Toast'

export default function FavouritesTable({ initialFavourites }: { initialFavourites: any[] }) {
  const [favourites, setFavourites] = useState(initialFavourites)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const handleUnfavourite = async (propertyId: string) => {
    setLoadingId(propertyId)
    setOpenMenuId(null)
    try {
      const result = await toggleFavourite(propertyId)
      if (!result.saved) {
        setFavourites(prev => prev.filter(f => f.property_id !== propertyId))
        setToastMessage('Property removed from favourites')
        setShowToast(true)
      }
    } catch (error: any) {
      // console.error('Error unfavouriting:', error)
      const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to unfavourite";
      setToastMessage(errorMessage);
      setShowToast(true);
    } finally {
      setLoadingId(null)
    }
  }

  if (favourites.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] border border-gray-100 p-20 text-center shadow-sm">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Eye className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-[#222222] mb-2">No favourites yet</h3>
        <p className="text-[#6A6A6A] mb-8 max-w-sm mx-auto">Explore our properties and save the ones you love to see them here.</p>
        <Link href="/" className="bg-[#0D9488] text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity inline-block">
          Browse Properties
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-6 py-5 text-sm font-bold text-[#6A6A6A] uppercase tracking-wider">Property</th>
              <th className="px-6 py-5 text-sm font-bold text-[#6A6A6A] uppercase tracking-wider">Location</th>
              <th className="px-6 py-5 text-sm font-bold text-[#6A6A6A] uppercase tracking-wider">Price</th>
              <th className="px-6 py-5 text-sm font-bold text-[#6A6A6A] uppercase tracking-wider">Status</th>
              <th className="px-6 py-5 text-sm font-bold text-[#6A6A6A] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {favourites.map(({ properties: prop }: any) => (
              <tr key={prop.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                      <Image 
                        src={prop.image_urls?.[0] || `https://picsum.photos/seed/${prop.id}/200/150`} 
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#222222] truncate group-hover:text-[#0D9488] transition-colors">{prop.title}</h4>
                      <p className="text-xs text-[#6A6A6A] mt-0.5">{prop.room_type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-[#6A6A6A]">
                    <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span className="truncate max-w-[150px]">{prop.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <span className="font-bold text-[#222222]">₹ {prop.price_per_month.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400 block">per month</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-600 border border-green-100">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/property/${prop.id}`}
                      className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:text-[#0D9488] hover:border-[#0D9488]/20 hover:bg-[#F0FDFA] transition-all"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === prop.id ? null : prop.id)}
                        className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:text-[#222222] hover:bg-gray-100 transition-all"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {openMenuId === prop.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                          <button 
                            onClick={() => handleUnfavourite(prop.id)}
                            disabled={loadingId === prop.id}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            {loadingId === prop.id ? 'Removing...' : 'Unfavourite'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  )
}
