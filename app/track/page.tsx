"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ComplaintStatus } from "@/components/complaint-status"
import { Search } from "lucide-react"

export const dynamic = "force-dynamic"

export default function TrackComplaintPage() {
  const [complaintId, setComplaintId] = useState<number | null>(null)
  const [searchInput, setSearchInput] = useState("")
  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setComplaint(null)

    if (!searchInput.trim()) {
      setError("Please enter a complaint ID")
      return
    }

    const id = Number.parseInt(searchInput)
    setLoading(true)

    try {
      const response = await fetch(`/api/complaints/${id}`)
      if (response.ok) {
        const data = await response.json()
        setComplaint(data)
        setComplaintId(id)
      } else {
        setError("Complaint not found")
      }
    } catch (err) {
      setError("Failed to fetch complaint")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Track Your Complaint</h1>
          <p className="text-sm sm:text-base text-gray-600">Enter your complaint ID to see the latest updates</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <Card className="p-4 sm:p-8 shadow-lg">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Complaint ID</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter complaint ID"
                    className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-3 sm:py-2"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {error && <p className="text-red-600 text-xs sm:text-sm">{error}</p>}
            </form>
          </Card>
        </div>

        {complaint && (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-words">{complaint.title}</h2>
              <div className="space-y-3 mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-gray-600 text-sm">Status:</span>
                  <span
                    className={`font-semibold text-sm sm:text-base ${
                      complaint.status === "resolved"
                        ? "text-green-600"
                        : complaint.status === "in_progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {complaint.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-gray-600 text-sm">Category:</span>
                  <span className="font-semibold text-sm">{complaint.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-gray-600 text-sm">Priority:</span>
                  <span className="font-semibold text-sm">{complaint.priority.toUpperCase()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-gray-600 text-sm">Reported:</span>
                  <span className="font-semibold text-sm">{new Date(complaint.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-600 text-xs sm:text-sm mb-2">Description:</p>
                <p className="text-gray-700 text-sm">{complaint.description}</p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Updates</h3>
              {complaintId && <ComplaintStatus complaintId={complaintId} />}
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
