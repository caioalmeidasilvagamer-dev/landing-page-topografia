'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import config from '@/site.config'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navLinks = config.navLinks
  const brandName = config.brand.name.split(' ')[0]
  const brandSlogan = config.brand.slogan
  const whatsappUrl = `https://wa.me/${config.contact.whatsapp}`

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
          ? 'bg-white border-b border-border shadow-sm'
          : 'bg-primary',
      )}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label={config.brand.name}
        >
          <div className="relative size-8 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 32 32" className="size-8" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="13" stroke={scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.7)'} strokeWidth="1.2" />
              <circle cx="16" cy="16" r="4" stroke={scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.9)'} strokeWidth="1.5" />
              <line x1="3" y1="16" x2="10" y2="16" stroke={scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.7)'} strokeWidth="1.2" />
              <line x1="22" y1="16" x2="29" y2="16" stroke={scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.7)'} strokeWidth="1.2" />
              <line x1="16" y1="3" x2="16" y2="10" stroke={scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.7)'} strokeWidth="1.2" />
              <line x1="16" y1="22" x2="16" y2="29" stroke={scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.7)'} strokeWidth="1.2" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={cn(
                'font-heading font-semibold text-[15px] tracking-tight',
                scrolled ? 'text-foreground' : 'text-white',
              )}
            >
              {brandName}
            </span>
            <span
              className={cn(
                'font-mono text-[9px] tracking-[0.22em] uppercase',
                scrolled ? 'text-muted-foreground' : 'text-white/60',
              )}
            >
              {brandSlogan?.split('&')[1]?.trim() || brandSlogan}
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              className={cn(
                'font-sans text-sm transition-colors duration-200 relative group',
                scrolled
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-white/75 hover:text-white',
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300',
                  scrolled ? 'bg-primary' : 'bg-white/60',
                )}
              />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleLink('#contato')}
            className={cn(
              'font-sans text-sm px-4 py-2 border rounded-[6px] transition-all duration-200',
              scrolled
                ? 'border-primary/50 text-primary hover:bg-primary/5'
                : 'border-white/40 text-white hover:bg-white/10',
            )}
          >
            Solicitar Orçamento
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'font-sans text-sm px-4 py-2 rounded-[6px] transition-all duration-200',
              scrolled
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-white text-primary font-medium hover:bg-white/90',
            )}
          >
            WhatsApp
          </a>
        </div>

        <button
          className={cn(
            'md:hidden p-2',
            scrolled ? 'text-foreground' : 'text-white',
          )}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  className="text-left font-sans text-sm text-muted-foreground hover:text-foreground py-2.5 border-b border-border/50 last:border-0 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => handleLink('#contato')}
                  className="font-sans text-sm px-4 py-2.5 border border-primary/50 text-primary hover:bg-primary/5 rounded-[6px] transition-all"
                >
                  Solicitar Orçamento
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm px-4 py-2.5 bg-primary text-white hover:bg-primary/90 rounded-[6px] text-center transition-all"
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
