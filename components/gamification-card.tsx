"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { calculateLevel, getPointsToNextLevel } from "@/lib/gamification"
import { Zap, Trophy, Award } from "lucide-react"

interface GamificationCardProps {
  points: number
  badges: any[]
  streak: number
}

export function GamificationCard({ points, badges, streak }: GamificationCardProps) {
  const level = calculateLevel(points)
  const pointsToNext = getPointsToNextLevel(points)
  const progressPercent = ((points % 100) / 100) * 100

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Level</p>
            <p className="text-4xl font-bold text-purple-900">{level}</p>
          </div>
          <Trophy className="w-12 h-12 text-purple-500 opacity-50" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-purple-700">
            <span>{points} points</span>
            <span>{pointsToNext} to next</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-0 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Streak</p>
            <p className="text-4xl font-bold text-orange-900">{streak}</p>
          </div>
          <Zap className="w-12 h-12 text-orange-500 opacity-50" />
        </div>
        <p className="text-sm text-orange-700">days in a row</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-0 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-pink-600 uppercase tracking-wide">Badges</p>
            <p className="text-4xl font-bold text-pink-900">{badges.length}</p>
          </div>
          <Award className="w-12 h-12 text-pink-500 opacity-50" />
        </div>
        <p className="text-sm text-pink-700">achievements unlocked</p>
      </Card>
    </div>
  )
}
