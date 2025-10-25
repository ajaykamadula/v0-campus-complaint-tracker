"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  points: number
  level: number
  badges: number
  streak: number
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
}

export function Leaderboard({ entries }: LeaderboardProps) {
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />
    return <span className="text-lg font-bold text-gray-400">#{rank}</span>
  }

  return (
    <Card className="p-4 sm:p-6 border-0 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          Top Contributors
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Campus leaders making a difference</p>
      </div>

      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out border border-gray-200"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                {getMedalIcon(entry.rank)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base text-gray-900">Contributor #{entry.rank}</p>
                <p className="text-xs text-gray-600">Level {entry.level}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              <div className="text-right">
                <p className="font-bold text-lg sm:text-lg text-purple-600">{entry.points}</p>
                <p className="text-xs text-gray-600">points</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0 text-xs">
                  {entry.badges} badges
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-0 text-xs">
                  {entry.streak} streak
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
