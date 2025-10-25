"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Complaint {
  id: number
  title: string
  description: string
  category: string
  priority: string
  status: string
  created_at: string
}

export const dynamic = "force-dynamic"

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaints")
      const data = await response.json()
      setComplaints(data)
    } catch (error) {
      console.error("[v0] Error fetching complaints:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateComplaintStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setComplaints(complaints.map((c) => (c.id === id ? { ...c, status } : c)))
      }
    } catch (error) {
      console.error("[v0] Error updating complaint:", error)
    }
  }

  const filteredComplaints = complaints.filter((c) => (filter === "all" ? true : c.status === filter))

  const stats = {
    total: complaints.length,
    open: complaints.filter((c) => c.status === "open").length,
    inProgress: complaints.filter((c) => c.status === "in_progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and track all campus complaints</p>
          </div>
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-gray-600 text-sm mb-2">Total Complaints</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm mb-2">Open</p>
            <p className="text-3xl font-bold text-red-600">{stats.open}</p>
          </Card>
          <Card className="p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm mb-2">In Progress</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
          </Card>
          <Card className="p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm mb-2">Resolved</p>
            <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {["all", "open", "in_progress", "resolved"].map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              variant={filter === status ? "default" : "outline"}
              className={filter === status ? "bg-blue-600" : ""}
            >
              {status.replace("_", " ").toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center text-gray-500">Loading complaints...</Card>
          ) : filteredComplaints.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">No complaints found</Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        complaint.priority === "urgent"
                          ? "bg-red-100 text-red-700"
                          : complaint.priority === "high"
                            ? "bg-orange-100 text-orange-700"
                            : complaint.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {complaint.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Category: {complaint.category}</span>
                    <span>Reported: {new Date(complaint.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    {complaint.status !== "resolved" && (
                      <>
                        {complaint.status === "open" && (
                          <Button
                            onClick={() => updateComplaintStatus(complaint.id, "in_progress")}
                            size="sm"
                            variant="outline"
                          >
                            Start Work
                          </Button>
                        )}
                        {complaint.status === "in_progress" && (
                          <Button
                            onClick={() => updateComplaintStatus(complaint.id, "resolved")}
                            size="sm"
                            variant="outline"
                          >
                            Mark Resolved
                          </Button>
                        )}
                      </>
                    )}
                    {complaint.status === "resolved" && <span className="text-green-600 font-medium">✓ Resolved</span>}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
