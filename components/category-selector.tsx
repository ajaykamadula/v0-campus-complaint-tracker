"use client"
import { COMPLAINT_CATEGORIES } from "@/lib/categories"

interface CategorySelectorProps {
  onSelect: (categoryId: string) => void
  selected?: string
}

export function CategorySelector({ onSelect, selected }: CategorySelectorProps) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Select Category</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.values(COMPLAINT_CATEGORIES).map((category) => {
          const Icon = category.icon
          const isSelected = selected === category.id

          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ease-in-out text-left hover-lift ${
                isSelected
                  ? `${category.bgColor} border-2 border-purple-500 shadow-lg`
                  : `${category.bgColor} ${category.borderColor} border-2 hover:border-purple-300`
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${category.color}`} />
              <p className="font-semibold text-sm text-gray-900">{category.name}</p>
              <p className="text-xs text-gray-600 mt-1">{category.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
