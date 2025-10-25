"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { COMPLAINT_CATEGORIES } from "@/lib/categories"
import { X } from "lucide-react"

interface CategoryFilterProps {
  onFilterChange: (selectedCategories: string[]) => void
}

export function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]

    setSelectedCategories(updated)
    onFilterChange(updated)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    onFilterChange([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Filter by Category</label>
        {selectedCategories.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            Clear All
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.values(COMPLAINT_CATEGORIES).map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategories.includes(category.id)

          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all duration-300 ease-in-out ${
                isSelected
                  ? `${category.bgColor} border-purple-500 shadow-md`
                  : `bg-white ${category.borderColor} border-2 hover:border-purple-300`
              }`}
            >
              <Icon className={`w-4 h-4 ${category.color}`} />
              <span className="text-sm font-medium text-gray-900">{category.name}</span>
              {isSelected && <X className="w-3 h-3 ml-1 text-purple-600" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
