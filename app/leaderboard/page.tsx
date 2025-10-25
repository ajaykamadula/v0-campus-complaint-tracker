"use client"

import { useState } from "react"
import { Leaderboard } from "@/components/leaderboard"
import { GamificationCard } from "@/components/gamification-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default function LeaderboardPage() {
  const [userStats, setUserStats] = useState({
    points: 245,
    badges: 3,
    streak: 7,
  })

  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, points: 850, level: 9, badges: 8, streak: 15 },
    { rank: 2, points: 720, level: 8, badges: 6, streak: 12 },
    { rank: 3, points: 650, level: 7, badges: 5, streak: 10 },
    { rank: 4, points: 580, level: 6, badges: 4, streak: 8 },
    { rank: 5, points: 520, level: 5, badges: 3, streak: 6 },
    { rank: 6, points: 450, level: 5, badges: 3, streak: 5 },
    { rank: 7, points: 380, level: 4, badges: 2, streak: 4 },
    { rank: 8, points: 310, level: 3, badges: 2, streak: 3 },
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gamification Hub</h1>
          <p className="text-gray-600">Track your achievements and compete with other campus reporters</p>
        </div>

        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Stats</h2>
          <GamificationCard
            points={userStats.points}
            badges={Array(userStats.badges).fill(null)}
            streak={userStats.streak}
          />
        </div>

        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Leaderboard</h2>
          <Leaderboard entries={leaderboardData} />
        </div>
      </div>
    </main>
  )
}
