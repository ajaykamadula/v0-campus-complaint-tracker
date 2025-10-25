"use client"

import { useState } from "react"
import { QRScanner } from "@/components/qr-scanner"
import { ComplaintForm } from "@/components/complaint-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function Home() {
  const [scannedLocation, setScannedLocation] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  const handleQRScanned = (locationData: any) => {
    setScannedLocation(locationData)
    setShowForm(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Campus Complaint Tracker</h1>
          <p className="text-gray-600">Report issues on campus and track their resolution</p>
        </div>

        {!showForm ? (
          <div className="max-w-md mx-auto">
            <Card className="p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Report an Issue</h2>
                  <p className="text-gray-600 mb-6">Scan the QR code at the location where you found the issue</p>
                </div>

                <QRScanner onScan={handleQRScanned} />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
                  Report Without QR Code
                </Button>

                <div className="border-t pt-4 space-y-2">
                  <Link href="/track" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      Track Complaint
                    </Button>
                  </Link>
                  <Link href="/qr-generator" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      Generate QR Codes
                    </Button>
                  </Link>
                  <Link href="/admin" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      Admin Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={() => {
                setShowForm(false)
                setScannedLocation(null)
              }}
              variant="ghost"
              className="mb-4"
            >
              ← Back
            </Button>
            <ComplaintForm location={scannedLocation} />
          </div>
        )}
      </div>
    </main>
  )
}
