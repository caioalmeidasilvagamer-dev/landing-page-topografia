import config from '../site.config'
import type { SiteConfig, Sections } from './config-types'

export function getConfig(): SiteConfig {
  return config
}

export function getSection<K extends keyof SiteConfig>(name: K): SiteConfig[K] {
  return config[name]
}

export function isSectionEnabled(section: keyof Sections): boolean {
  return config.sections[section]
}

export function getWhatsappUrl(): string {
  const { number, message } = config.whatsapp
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}

export function getPhoneDigits(): string {
  return config.contact.phone.replace(/\D/g, '')
}
