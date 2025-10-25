import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const complaint = db.getComplaintById(id)

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    return NextResponse.json(complaint)
  } catch (error) {
    console.error("[v0] Error fetching complaint:", error)
    return NextResponse.json({ error: "Failed to fetch complaint" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const complaint = db.updateComplaint(id, body)

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    if (body.status) {
      const statusMessages: Record<string, string> = {
        in_progress: "Your complaint is now being worked on.",
        resolved: "Your complaint has been resolved. Thank you for reporting this issue.",
      }
      if (statusMessages[body.status]) {
        db.createNotification(id, statusMessages[body.status], body.status === "resolved" ? "resolved" : "update")
      }
    }

    return NextResponse.json(complaint)
  } catch (error) {
    console.error("[v0] Error updating complaint:", error)
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const complaint = db.deleteComplaint(id)

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Complaint deleted" })
  } catch (error) {
    console.error("[v0] Error deleting complaint:", error)
    return NextResponse.json({ error: "Failed to delete complaint" }, { status: 500 })
  }
}
