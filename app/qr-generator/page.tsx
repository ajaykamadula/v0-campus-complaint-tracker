"use client"

import { useEffect, useState } from "react"
import { QRGenerator } from "@/components/qr-generator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Location {
  id: number
  name: string
  building: string
  floor?: number
}

export const dynamic = "force-dynamic"

export default function QRGeneratorPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/locations")
      const data = await response.json()
      setLocations(data)
    } catch (error) {
      console.error("[v0] Error fetching locations:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
          <p className="text-gray-600">Generate QR codes for campus locations</p>
        </div>

        <Link href="/">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back to Home
          </Button>
        </Link>

        {loading ? (
          <Card className="p-8 text-center text-gray-500">Loading locations...</Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <QRGenerator key={location.id} location={location} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
