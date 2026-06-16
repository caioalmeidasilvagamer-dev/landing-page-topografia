'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLink = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent',
      )}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          aria-label="GeoTech Topografia"
        >
          <div className="relative size-8 flex items-center justify-center">
            <div className="absolute inset-0 border border-primary/60 rounded-sm rotate-45 group-hover:rotate-[30deg] transition-transform duration-300" />
            <MapPin className="size-4 text-primary relative z-10" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-700 text-[15px] text-foreground tracking-tight">
              GeoTech
            </span>
            <span className="font-mono text-[9px] text-muted-foreground tracking-[0.2em] uppercase">
              Topografia
            </span>
          </div>
        </a>

        {/* Nav desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleLink('#contato')}
            className="font-sans text-sm px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 rounded-[6px] transition-all duration-200"
          >
            Solicitar Orçamento
          </button>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-[6px] transition-all duration-200"
          >
            WhatsApp
          </a>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  className="text-left font-sans text-sm text-muted-foreground hover:text-foreground py-2.5 border-b border-border/30 last:border-0 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => handleLink('#contato')}
                  className="font-sans text-sm px-4 py-2.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-[6px] transition-all"
                >
                  Solicitar Orçamento
                </button>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm px-4 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-[6px] text-center transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
