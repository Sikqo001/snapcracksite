"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { MatrixRain } from "@/components/matrix-rain"
import { QRCodeSVG } from "qrcode.react"

const CRYPTO_OPTIONS = [
  { id: "btc", name: "Bitcoin", symbol: "BTC" },
  { id: "eth", name: "Ethereum", symbol: "ETH" },
  { id: "sol", name: "Solana", symbol: "SOL" },
]

const CRYPTO_ADDRESSES = {
  btc: "bc1ptrtm4s57j40cx45azeflj0dp5qhjeu369csvyjauusj2p38mucus6fnjzw",
  eth: "0x3829098Ad1559bC03942cdE519D6BDCaC30CcE86",
  sol: "3ibaaoiW7wg8eiuWbyGJDJMAbxCWpHGPs23Qym1z1RoL",
}

export default function CryptoPaymentPage() {
  const searchParams = useSearchParams()
  const [selectedCrypto, setSelectedCrypto] = useState(searchParams.get("crypto") || "btc")
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const plan = searchParams.get("plan") || "single"

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getPlanAmount = () => {
    switch (plan) {
      case "single":
        return "39€"
      case "triple":
        return "89€"
      case "five":
        return "129€"
      default:
        return "39€"
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Address copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err))
  }

  return (
    <div className="min-h-screen bg-black text-[#1DB954]">
      <MatrixRain />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/buy">
          <Button variant="ghost" className="text-[#1DB954] hover:text-[#1DB954]/90 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Packages
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-black/50 border-[#1DB954]/50 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-[#1DB954]">Crypto Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* Order Info */}
                <div className="text-center">
                  <div className="text-white/80 mb-2">Order #: X4FV24</div>
                  <div className="text-xl font-bold text-white mb-4">
                    Payment will expire in: <span className="text-[#1DB954]">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                {/* Crypto Selection */}
                <div className="grid grid-cols-3 gap-4">
                  {CRYPTO_OPTIONS.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => setSelectedCrypto(crypto.id)}
                      className={`p-4 rounded-lg border-2 transition-all
                        ${
                          selectedCrypto === crypto.id
                            ? "border-[#1DB954] bg-[#1DB954]/10"
                            : "border-[#1DB954]/50 hover:border-[#1DB954] hover:bg-[#1DB954]/5"
                        }`}
                    >
                      <div className="text-center">
                        <div className="font-bold text-white">{crypto.symbol}</div>
                        <div className="text-sm text-white/60">{crypto.name}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment Details */}
                <Card className="bg-black/50 border-[#1DB954]/50">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-lg text-white/80 mb-2">Send:</div>
                      <div className="text-2xl font-bold text-white">
                        {CRYPTO_OPTIONS.find((c) => c.id === selectedCrypto)?.name} ({getPlanAmount()})
                      </div>
                    </div>

                    <div className="flex justify-center mb-6">
                      <QRCodeSVG
                        value={CRYPTO_ADDRESSES[selectedCrypto as keyof typeof CRYPTO_ADDRESSES]}
                        size={200}
                        level="H"
                        includeMargin={true}
                        className="p-2 bg-white rounded-lg"
                      />
                    </div>

                    <div className="flex items-center gap-2 bg-black/50 p-4 rounded-lg">
                      <div className="flex-1 break-all text-white text-sm">
                        {CRYPTO_ADDRESSES[selectedCrypto as keyof typeof CRYPTO_ADDRESSES]}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 border-[#1DB954]/50 text-[#1DB954] hover:bg-[#1DB954]/10"
                        onClick={() =>
                          copyToClipboard(CRYPTO_ADDRESSES[selectedCrypto as keyof typeof CRYPTO_ADDRESSES])
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-center mt-6">
                      <div className="text-white/80 mb-2">Time remaining:</div>
                      <div className="text-xl font-bold text-[#1DB954]">{formatTime(timeLeft)}</div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10"
                    onClick={() => window.open("https://t.me/sikq01", "_blank")}
                  >
                    Pay without crypto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

