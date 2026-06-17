'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 bg-white border border-border shadow-sm font-sans text-sm text-foreground"
            style={{ borderRadius: '6px' }}
          >
            Falar no WhatsApp
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white border-r border-b border-border rotate-[-45deg]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20de%20topografia."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        className="relative flex items-center justify-center size-14 rounded-full shadow-lg transition-shadow duration-200 hover:shadow-xl"
        style={{ backgroundColor: '#25D366' }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            animation: 'whatsapp-pulse 2s infinite',
          }}
        />
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28" className="relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.055 1.47 5.765L0 24l6.395-1.446A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.042-1.396l-.361-.215-3.797.858.875-3.701-.235-.381A9.789 9.789 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
        </svg>
      </motion.a>

      <style jsx global>{`
        @keyframes whatsapp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
    </div>
  )
}
