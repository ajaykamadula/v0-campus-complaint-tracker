import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { complaintId: string } }) {
  try {
    const complaintId = Number.parseInt(params.complaintId)
    const notifications = db.getNotificationsByComplaintId(complaintId)
    return NextResponse.json(notifications)
  } catch (error) {
    console.error("[v0] Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}
