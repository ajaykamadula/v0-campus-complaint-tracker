"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Copy } from "lucide-react"

interface QRGeneratorProps {
  location: {
    id: number
    name: string
    building: string
    floor?: number
  }
}

export function QRGenerator({ location }: QRGeneratorProps) {
  const [qrCode, setQrCode] = useState<string>("")
  const [copied, setCopied] = useState(false)

  const generateQR = async () => {
    const qrData = JSON.stringify({
      id: location.id,
      name: location.name,
      building: location.building,
      floor: location.floor,
    })

    const encodedData = encodeURIComponent(qrData)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}`
    setQrCode(qrUrl)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    const link = document.createElement("a")
    link.href = qrCode
    link.download = `qr-${location.id}-${location.name.replace(/\s+/g, "-")}.png`
    link.click()
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{location.name}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {location.building}
        {location.floor !== undefined && ` - Floor ${location.floor}`}
      </p>

      {!qrCode ? (
        <Button onClick={generateQR} className="w-full bg-blue-600 hover:bg-blue-700">
          Generate QR Code
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
            <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
          </div>
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="outline" className="flex-1 bg-transparent">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={downloadQR} variant="outline" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          <Button onClick={() => setQrCode("")} variant="ghost" className="w-full">
            Generate Another
          </Button>
        </div>
      )}
    </Card>
  )
}
