"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"

interface Notification {
  id: number
  complaint_id: number
  message: string
  type: "update" | "resolved"
  created_at: string
}

interface ComplaintStatusProps {
  complaintId: number
}

export function ComplaintStatus({ complaintId }: ComplaintStatusProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5000) // Poll every 5 seconds
    return () => clearInterval(interval)
  }, [complaintId])

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications/${complaintId}`)
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error("[v0] Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-gray-500">Loading status...</div>
  }

  return (
    <div className="space-y-3">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No updates yet</p>
      ) : (
        notifications.map((notification) => (
          <Card key={notification.id} className="p-4 flex gap-3">
            <div className="flex-shrink-0 mt-1">
              {notification.type === "resolved" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(notification.created_at).toLocaleString()}</p>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
