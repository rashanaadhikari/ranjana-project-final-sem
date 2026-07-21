'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-10 right-6 z-[9999] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white/90 backdrop-blur-md border border-[#0D9488]/20 text-[#222222] px-6 py-4 rounded-3xl shadow-[0_10px_40px_rgba(227,28,91,0.15)] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0D9488] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <span className="font-bold text-sm">{message}</span>
      </div>
    </div>
  )
}
