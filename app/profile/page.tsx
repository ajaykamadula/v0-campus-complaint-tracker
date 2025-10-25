"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ComplaintHistory } from "@/components/complaint-history"
import { GamificationCard } from "@/components/gamification-card"
import Link from "next/link"
import { ArrowLeft, User, Mail, Calendar, Award } from "lucide-react"

export const dynamic = "force-dynamic"

export default function ProfilePage() {
  const [userProfile] = useState({
    id: "user-123",
    name: "Anonymous Reporter",
    email: "reporter@campus.edu",
    joinedDate: new Date("2024-01-15"),
    points: 245,
    level: 3,
    badges: [
      { id: "first_report", name: "First Voice", icon: "🎯" },
      { id: "five_reports", name: "Active Reporter", icon: "📢" },
      { id: "resolved", name: "Problem Solver", icon: "✅" },
    ],
    streak: 7,
    totalComplaints: 12,
    resolvedComplaints: 8,
  })

  const [complaints] = useState([
    {
      id: "1",
      title: "Broken Water Fountain",
      category: "Maintenance",
      location: "Building A - Ground Floor",
      status: "resolved" as const,
      createdAt: new Date("2024-06-15"),
      resolvedAt: new Date("2024-06-18"),
      description: "Water fountain near the cafeteria is not working properly",
    },
    {
      id: "2",
      title: "Dirty Bathroom",
      category: "Cleanliness",
      location: "Library - 3rd Floor",
      status: "in-progress" as const,
      createdAt: new Date("2024-06-20"),
      description: "Bathroom needs urgent cleaning",
    },
    {
      id: "3",
      title: "Broken Light",
      category: "Maintenance",
      location: "Parking Lot B",
      status: "pending" as const,
      createdAt: new Date("2024-06-22"),
      description: "Street light is not functioning",
    },
  ])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="mb-6 hover:bg-white/50 transition-all duration-300 ease-in-out">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{userProfile.name}</h1>
              <p className="text-gray-600">Campus Reporter</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-white/80 backdrop-blur border-0">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{userProfile.email}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/80 backdrop-blur border-0">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-600">Joined</p>
                  <p className="font-semibold text-gray-900">
                    {userProfile.joinedDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/80 backdrop-blur border-0">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-xs text-gray-600">Reports</p>
                  <p className="font-semibold text-gray-900">{userProfile.totalComplaints}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/80 backdrop-blur border-0">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-600">Resolved</p>
                  <p className="font-semibold text-gray-900">{userProfile.resolvedComplaints}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Achievements</h2>
          <GamificationCard points={userProfile.points} badges={userProfile.badges} streak={userProfile.streak} />
        </div>

        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Badges Earned</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {userProfile.badges.map((badge) => (
              <Card key={badge.id} className="p-6 text-center bg-white/80 backdrop-blur border-0 hover-lift">
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-gray-900">{badge.name}</h3>
              </Card>
            ))}
          </div>
        </div>

        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Complaint History</h2>
          <ComplaintHistory complaints={complaints} />
        </div>
      </div>
    </main>
  )
}
