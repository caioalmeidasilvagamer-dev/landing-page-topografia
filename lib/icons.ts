/**
 * Icon mapping layer for config-driven components.
 *
 * Icon names in site.config.ts MUST match these keys exactly.
 * The getIcon() helper provides graceful fallback to Compass.
 */
import {
  Compass,
  Satellite,
  Building2,
  FileCheck,
  Plane,
  Map,
  Target,
  Layers,
  FileText,
  Home,
  ScanLine,
  Waves,
  Crosshair,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  ClipboardList,
  MapPinned,
  Scan,
  Cpu,
  PackageCheck,
  Award,
  Lock,
  type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  Compass,
  Satellite,
  Building2,
  FileCheck,
  Plane,
  Map,
  Target,
  Layers,
  FileText,
  Home,
  ScanLine,
  Waves,
  Crosshair,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  ClipboardList,
  MapPinned,
  Scan,
  Cpu,
  PackageCheck,
  Award,
  Lock,
}

export const iconNames = Object.keys(iconMap)

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Compass
}
