// In-memory database store with persistence helpers
interface Location {
  id: number
  name: string
  building: string
  floor?: number
  qr_code?: string
}

interface Complaint {
  id: number
  title: string
  description: string
  category: string
  priority: string
  status: "open" | "in_progress" | "resolved"
  location_id?: number
  created_at: string
  updated_at: string
  feedback?: string
}

interface Notification {
  id: number
  complaint_id: number
  message: string
  type: "update" | "resolved"
  created_at: string
}

// In-memory store
let complaintId = 1
let notificationId = 1
let locationId = 1

export const db = {
  complaints: [] as Complaint[],
  locations: [
    { id: locationId++, name: "Library Main Entrance", building: "Library", floor: 1 },
    { id: locationId++, name: "Cafeteria", building: "Student Center", floor: 0 },
    { id: locationId++, name: "Gym Entrance", building: "Sports Complex", floor: 1 },
    { id: locationId++, name: "Parking Lot A", building: "Parking", floor: 0 },
    { id: locationId++, name: "Science Building Lobby", building: "Science", floor: 1 },
  ] as Location[],
  notifications: [] as Notification[],

  // Complaint operations
  createComplaint(data: Omit<Complaint, "id" | "created_at" | "updated_at">) {
    const complaint: Complaint = {
      id: complaintId++,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    this.complaints.push(complaint)
    return complaint
  },

  getComplaints() {
    return this.complaints
  },

  getComplaintById(id: number) {
    return this.complaints.find((c) => c.id === id)
  },

  updateComplaint(id: number, updates: Partial<Complaint>) {
    const complaint = this.complaints.find((c) => c.id === id)
    if (complaint) {
      Object.assign(complaint, updates, { updated_at: new Date().toISOString() })
      return complaint
    }
    return null
  },

  deleteComplaint(id: number) {
    const index = this.complaints.findIndex((c) => c.id === id)
    if (index > -1) {
      return this.complaints.splice(index, 1)[0]
    }
    return null
  },

  // Location operations
  getLocations() {
    return this.locations
  },

  getLocationById(id: number) {
    return this.locations.find((l) => l.id === id)
  },

  // Notification operations
  createNotification(complaintId: number, message: string, type: "update" | "resolved") {
    const notification: Notification = {
      id: notificationId++,
      complaint_id: complaintId,
      message,
      type,
      created_at: new Date().toISOString(),
    }
    this.notifications.push(notification)
    return notification
  },

  getNotificationsByComplaintId(complaintId: number) {
    return this.notifications.filter((n) => n.complaint_id === complaintId)
  },
}
