"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface ComplaintFormProps {
  location?: any
}

const CATEGORIES = [
  { id: 1, name: "Maintenance", color: "#3B82F6" },
  { id: 2, name: "Cleanliness", color: "#10B981" },
  { id: 3, name: "Safety", color: "#EF4444" },
  { id: 4, name: "Facilities", color: "#F59E0B" },
  { id: 5, name: "Other", color: "#8B5CF6" },
]

export function ComplaintForm({ location }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location_id: location?.id || null,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ title: "", description: "", category: "", priority: "medium" })
        }, 3000)
      }
    } catch (error) {
      console.error("[v0] Error submitting complaint:", error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600">Your complaint has been submitted successfully.</p>
        <p className="text-sm text-gray-500 mt-2">You will receive updates on the resolution.</p>
      </Card>
    )
  }

  return (
    <Card className="p-4 sm:p-8 shadow-lg">
      <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-6">Report an Issue</h2>

      {location && (
        <div className="mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-semibold">Location:</span> {location.name}
            {location.building && ` - ${location.building}`}
            {location.floor && ` (Floor ${location.floor})`}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Brief description of the issue"
            className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat.name })}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-xs sm:text-sm ${
                  formData.category === cat.name
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-3 h-3 rounded-full mb-1 mx-auto" style={{ backgroundColor: cat.color }}></div>
                <span className="font-medium text-gray-700">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Please provide details about the issue"
            rows={5}
            className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-2 text-base sm:text-base"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </Button>
      </form>
    </Card>
  )
}
