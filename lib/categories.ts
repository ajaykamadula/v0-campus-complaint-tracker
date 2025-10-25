import {
  Wrench,
  AlertTriangle,
  Droplet,
  Lightbulb,
  Trash2,
  Users,
  Zap,
  Shield,
  Accessibility,
  Wifi,
  type LucideIcon,
} from "lucide-react"

export interface Category {
  id: string
  name: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
}

export const COMPLAINT_CATEGORIES: Record<string, Category> = {
  maintenance: {
    id: "maintenance",
    name: "Maintenance",
    description: "Broken equipment, repairs needed",
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  safety: {
    id: "safety",
    name: "Safety",
    description: "Safety hazards and concerns",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  cleanliness: {
    id: "cleanliness",
    name: "Cleanliness",
    description: "Dirty areas, hygiene issues",
    icon: Droplet,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  lighting: {
    id: "lighting",
    name: "Lighting",
    description: "Broken lights, dark areas",
    icon: Lightbulb,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  waste: {
    id: "waste",
    name: "Waste Management",
    description: "Overflowing bins, litter",
    icon: Trash2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  facilities: {
    id: "facilities",
    name: "Facilities",
    description: "Building facilities issues",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  electrical: {
    id: "electrical",
    name: "Electrical",
    description: "Power issues, electrical hazards",
    icon: Zap,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  security: {
    id: "security",
    name: "Security",
    description: "Security concerns and issues",
    icon: Shield,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
  },
  accessibility: {
    id: "accessibility",
    name: "Accessibility",
    description: "Accessibility and mobility issues",
    icon: Accessibility,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
  connectivity: {
    id: "connectivity",
    name: "Connectivity",
    description: "WiFi and network issues",
    icon: Wifi,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
}

export const CATEGORY_LIST = Object.values(COMPLAINT_CATEGORIES)
