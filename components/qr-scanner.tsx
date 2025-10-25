"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface QRScannerProps {
  onScan: (data: any) => void
}

export function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string>("")
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState<string>("")

  useEffect(() => {
    if (!isScanning) return

    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        const scanInterval = setInterval(async () => {
          if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d")
            if (context) {
              canvasRef.current.width = videoRef.current.videoWidth
              canvasRef.current.height = videoRef.current.videoHeight
              context.drawImage(videoRef.current, 0, 0)

              try {
                const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
                const code = decodeQRCode(imageData)
                if (code && code !== scannedCode) {
                  setScannedCode(code)
                  try {
                    const locationData = JSON.parse(code)
                    onScan(locationData)
                    setIsScanning(false)
                    stream.getTracks().forEach((track) => track.stop())
                  } catch {
                    console.log("[v0] Scanned code is not valid location data")
                  }
                }
              } catch (err) {
                console.log("[v0] Error processing frame")
              }
            }
          }
        }, 500)

        return () => {
          clearInterval(scanInterval)
          stream.getTracks().forEach((track) => track.stop())
        }
      } catch (err) {
        setError("Unable to access camera. Please check permissions.")
        setIsScanning(false)
      }
    }

    const cleanup = startScanning()
    return () => {
      cleanup?.then((fn) => fn?.())
    }
  }, [isScanning, scannedCode, onScan])

  const decodeQRCode = (imageData: ImageData): string | null => {
    const data = imageData.data
    let qrPattern = ""

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const brightness = (r + g + b) / 3

      qrPattern += brightness > 128 ? "1" : "0"
    }

    // Look for QR-like patterns (simplified detection)
    if (qrPattern.includes("1")) {
      return null // In production, use a proper QR library like jsQR
    }

    return null
  }

  const handleMockScan = () => {
    // Mock QR scan for demo
    const mockLocation = {
      id: 1,
      name: "Library Main Entrance",
      building: "Library",
      floor: 1,
    }
    onScan(mockLocation)
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {isScanning && (
        <div className="space-y-2">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-blue-300 bg-black" />
          <canvas ref={canvasRef} className="hidden" />
          <p className="text-sm text-gray-600 text-center">Point camera at QR code...</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={() => setIsScanning(!isScanning)} className="flex-1 bg-blue-600 hover:bg-blue-700">
          {isScanning ? "Stop Scanning" : "Start Scanning"}
        </Button>
        <Button onClick={handleMockScan} variant="outline" className="flex-1 bg-transparent">
          Demo Scan
        </Button>
      </div>
    </div>
  )
}
