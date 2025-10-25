// Authentication system with user management
import crypto from "crypto"

interface User {
  id: string
  email: string
  password: string // In production, this should be hashed
  name: string
  role: "user" | "admin"
  created_at: string
  points: number
  streak: number
}

interface Session {
  userId: string
  token: string
  createdAt: string
  expiresAt: string
}

let userId = 1
const sessionId = 1

export const authDb = {
  users: [] as User[],
  sessions: [] as Session[],

  // User operations
  createUser(email: string, password: string, name: string) {
    // Check if user already exists
    if (this.users.find((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    const user: User = {
      id: `user_${userId++}`,
      email,
      password, // In production, hash this with bcrypt
      name,
      role: "user",
      created_at: new Date().toISOString(),
      points: 0,
      streak: 0,
    }
    this.users.push(user)
    return user
  },

  getUserByEmail(email: string) {
    return this.users.find((u) => u.email === email)
  },

  getUserById(id: string) {
    return this.users.find((u) => u.id === id)
  },

  updateUser(id: string, updates: Partial<User>) {
    const user = this.users.find((u) => u.id === id)
    if (user) {
      Object.assign(user, updates)
      return user
    }
    return null
  },

  // Session operations
  createSession(userId: string) {
    const token = crypto.randomBytes(32).toString("hex")
    const session: Session = {
      userId,
      token,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    }
    this.sessions.push(session)
    return session
  },

  getSessionByToken(token: string) {
    const session = this.sessions.find((s) => s.token === token)
    if (session && new Date(session.expiresAt) > new Date()) {
      return session
    }
    return null
  },

  deleteSession(token: string) {
    const index = this.sessions.findIndex((s) => s.token === token)
    if (index > -1) {
      this.sessions.splice(index, 1)
      return true
    }
    return false
  },

  // Authentication helpers
  validatePassword(password: string, hashedPassword: string) {
    // In production, use bcrypt.compare()
    return password === hashedPassword
  },
}
