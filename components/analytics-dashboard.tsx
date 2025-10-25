"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"

const complaintTrendData = [
  { month: "Jan", complaints: 45, resolved: 32 },
  { month: "Feb", complaints: 52, resolved: 38 },
  { month: "Mar", complaints: 48, resolved: 42 },
  { month: "Apr", complaints: 61, resolved: 55 },
  { month: "May", complaints: 55, resolved: 48 },
  { month: "Jun", complaints: 67, resolved: 62 },
]

const categoryData = [
  { name: "Maintenance", value: 35, color: "#8b5cf6" },
  { name: "Safety", value: 25, color: "#3b82f6" },
  { name: "Cleanliness", value: 20, color: "#ec4899" },
  { name: "Facilities", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
]

const resolutionTimeData = [
  { range: "0-24h", count: 28 },
  { range: "1-3d", count: 35 },
  { range: "3-7d", count: 22 },
  { range: "1-2w", count: 12 },
  { range: "2w+", count: 3 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0 hover-lift">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide">Total Reports</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-900 mt-2">328</p>
              <p className="text-xs text-blue-700 mt-1">+12% this month</p>
            </div>
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 opacity-50 flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 border-0 hover-lift">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">Resolved</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-900 mt-2">277</p>
              <p className="text-xs text-green-700 mt-1">84% resolution rate</p>
            </div>
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 opacity-50 flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-0 hover-lift">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-orange-600 uppercase tracking-wide">Pending</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-900 mt-2">51</p>
              <p className="text-xs text-orange-700 mt-1">Avg 2.3 days</p>
            </div>
            <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 opacity-50 flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0 hover-lift">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide">Avg Response</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-900 mt-2">1.8d</p>
              <p className="text-xs text-purple-700 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                Improving
              </p>
            </div>
            <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 opacity-50 flex-shrink-0" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6 border-0 shadow-lg">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Complaint Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={complaintTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="complaints" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 sm:p-6 border-0 shadow-lg">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Complaints by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-4 sm:p-6 border-0 shadow-lg">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Resolution Time Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={resolutionTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="range" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
