import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const complaint = db.createComplaint({
      title: body.title,
      description: body.description,
      category: body.category,
      priority: body.priority,
      status: "open",
      location_id: body.location_id,
    })

    db.createNotification(complaint.id, "Your complaint has been received and is being reviewed.", "update")

    return NextResponse.json(complaint, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating complaint:", error)
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const complaints = db.getComplaints()
    return NextResponse.json(complaints)
  } catch (error) {
    console.error("[v0] Error fetching complaints:", error)
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
  }
}
