// Gamification system for tracking user achievements and points

export interface UserStats {
  userId: string
  points: number
  badges: Badge[]
  level: number
  complaintsReported: number
  complaintsResolved: number
  streak: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: Date
}

export const BADGES = {
  FIRST_REPORT: {
    id: "first_report",
    name: "First Voice",
    description: "Report your first complaint",
    icon: "🎯",
    points: 10,
  },
  FIVE_REPORTS: {
    id: "five_reports",
    name: "Active Reporter",
    description: "Report 5 complaints",
    icon: "📢",
    points: 50,
  },
  TEN_REPORTS: {
    id: "ten_reports",
    name: "Campus Guardian",
    description: "Report 10 complaints",
    icon: "🛡️",
    points: 100,
  },
  RESOLVED: {
    id: "resolved",
    name: "Problem Solver",
    description: "Get a complaint resolved",
    icon: "✅",
    points: 25,
  },
  FIVE_RESOLVED: {
    id: "five_resolved",
    name: "Change Maker",
    description: "Get 5 complaints resolved",
    icon: "🌟",
    points: 150,
  },
  STREAK_WEEK: {
    id: "streak_week",
    name: "Consistent Voice",
    description: "Report complaints for 7 days straight",
    icon: "🔥",
    points: 75,
  },
  QUICK_REPORTER: {
    id: "quick_reporter",
    name: "Speed Demon",
    description: "Report a complaint within 1 minute of scanning QR",
    icon: "⚡",
    points: 15,
  },
}

export const POINT_SYSTEM = {
  REPORT_COMPLAINT: 10,
  COMPLAINT_RESOLVED: 50,
  DAILY_STREAK: 5,
  HELPFUL_FEEDBACK: 20,
}

export function calculateLevel(points: number): number {
  return Math.floor(points / 100) + 1
}

export function getNextLevelPoints(currentPoints: number): number {
  const currentLevel = calculateLevel(currentPoints)
  return currentLevel * 100
}

export function getPointsToNextLevel(currentPoints: number): number {
  return getNextLevelPoints(currentPoints) - currentPoints
}
