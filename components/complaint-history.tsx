"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, CheckCircle, AlertCircle, Eye } from "lucide-react"

interface Complaint {
  id: string
  title: string
  category: string
  location: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: Date
  resolvedAt?: Date
  description: string
}

interface ComplaintHistoryProps {
  complaints: Complaint[]
}

export function ComplaintHistory({ complaints }: ComplaintHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-700 border-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <Card key={complaint.id} className="p-6 border-0 hover-lift bg-white/80 backdrop-blur">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                <Badge className={`${getStatusColor(complaint.status)} border flex items-center gap-1`}>
                  {getStatusIcon(complaint.status)}
                  {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">{complaint.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  {complaint.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  {formatDate(complaint.createdAt)}
                </div>
                {complaint.resolvedAt && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Resolved {formatDate(complaint.resolvedAt)}
                  </div>
                )}
              </div>
            </div>

            <Button variant="ghost" size="sm" className="ml-4 hover:bg-purple-50">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {complaint.category}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  )
}
