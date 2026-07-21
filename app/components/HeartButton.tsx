'use client'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toggleFavourite } from '../../services/favourites.service'
import { Toast } from './Toast'

export function FavouriteButton({ propertyId, initialSaved }: { propertyId: string, initialSaved: boolean }) {
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const router = useRouter()

  // Sync with initialSaved when it changes (e.g. after async fetch in parent)
  useEffect(() => {
    setSaved(initialSaved)
  }, [initialSaved])

  const handleToggle = async () => {
    setLoading(true)
    try {
      const result = await toggleFavourite(propertyId)
      setSaved(result.saved)
      setToastMessage(result.saved ? 'Property saved to favourites!' : 'Property removed from favourites')
      setShowToast(true)
    } catch (error: any) {
      if (error.message === "Login required") {
        setToastMessage("You're not logged in")
        setShowToast(true)
        return
      }
      console.error('Error toggling favourite:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          handleToggle()
        }}
        disabled={loading}
        className={`w-full cursor-pointer text-center flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl border transition-all font-bold text-sm shadow-sm
          ${saved 
            ? 'bg-brand/10 border-brand/20 text-brand' 
            : 'bg-white border-gray-100 text-heading hover:border-brand/30 hover:bg-gray-50'
          }`}
      >
        <Heart className={`w-4 h-4 transition-all ${saved ? 'fill-brand' : ''}`} />
        {saved ? 'Saved' : 'Add to Favourite'}
      </button>

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  )
}
