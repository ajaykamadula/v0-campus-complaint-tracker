"use client"

import { useState } from "react"
import { QRScanner } from "@/components/qr-scanner"
import { ComplaintForm } from "@/components/complaint-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { AlertCircle, QrCode, BarChart3, Shield } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/lib/auth-context"

export const dynamic = "force-dynamic"

export default function Home() {
  const [scannedLocation, setScannedLocation] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const { isAuthenticated } = useAuth()

  const handleQRScanned = (locationData: any) => {
    setScannedLocation(locationData)
    setShowForm(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Campus Complaint Tracker
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Report campus issues instantly with QR codes. Track resolutions in real-time and help make campus better.
            </p>
          </div>

          {!showForm ? (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4 mb-8 animate-slide-up">
                <Card className="p-6 hover-lift bg-white/80 backdrop-blur border-0 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <QrCode className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Quick Report</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Scan QR codes to instantly report issues at specific locations
                  </p>
                </Card>

                <Card className="p-6 hover-lift bg-white/80 backdrop-blur border-0 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Track Progress</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Monitor complaint status and get real-time updates on resolutions
                  </p>
                </Card>

                <Card className="p-6 hover-lift bg-white/80 backdrop-blur border-0 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Shield className="w-5 h-5 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Anonymous Safe</h3>
                  </div>
                  <p className="text-sm text-gray-600">Report issues anonymously without any personal information</p>
                </Card>
              </div>

              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur animate-slide-up">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h2>
                    <p className="text-gray-600">Scan the QR code at the location where you found the issue</p>
                  </div>

                  {isAuthenticated ? (
                    <>
                      <QRScanner onScan={handleQRScanned} />

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500 font-medium">or</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => setShowForm(true)}
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 hover-lift"
                      >
                        Report Without QR Code
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Please log in to report an issue</p>
                      <Link href="/auth/login">
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                          Sign In to Report
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="border-t pt-6 space-y-3">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Quick Links</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/track" className="block">
                        <Button
                          variant="outline"
                          className="w-full h-11 border-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 ease-in-out bg-transparent"
                        >
                          Track Complaint
                        </Button>
                      </Link>
                      <Link href="/qr-generator" className="block">
                        <Button
                          variant="outline"
                          className="w-full h-11 border-2 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 ease-in-out bg-transparent"
                        >
                          Generate QR
                        </Button>
                      </Link>
                      <Link href="/admin" className="block col-span-2">
                        <Button
                          variant="outline"
                          className="w-full h-11 border-2 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 ease-in-out bg-transparent"
                        >
                          Admin Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto animate-slide-up">
              <Button
                onClick={() => {
                  setShowForm(false)
                  setScannedLocation(null)
                }}
                variant="ghost"
                className="mb-4 hover:bg-white/50 transition-all duration-300 ease-in-out"
              >
                ← Back
              </Button>
              <ComplaintForm location={scannedLocation} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
