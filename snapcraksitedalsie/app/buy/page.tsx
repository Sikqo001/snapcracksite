"use client"

import { useState } from "react"
import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MatrixRain } from "@/components/matrix-rain"
import { AccountNamesDialog } from "@/components/account-names-dialog"

export default function BuyPage() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"single" | "triple" | "five" | null>(null)

  const handleSelectPackage = (plan: "single" | "triple" | "five") => {
    setSelectedPlan(plan)
    setIsDialogOpen(true)
  }

  const handleAccountNamesSubmit = (names: string[]) => {
    localStorage.setItem("accountNames", JSON.stringify(names))
    router.push(`/crypto?plan=${selectedPlan}`)
  }

  return (
    <div className="min-h-screen bg-black text-[#1DB954]">
      <MatrixRain />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="text-[#1DB954] hover:text-[#1DB954]/90 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Choose Your Package</h1>

        <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
          Select the perfect package for your needs. Our most popular option offers the best value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Single */}
          <Card className="bg-black/50 border-[#1DB954]/50 hover:border-[#1DB954] transition-all">
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-[#1DB954]">1 SnapCrack</span>
                <div className="text-3xl font-bold mt-4 text-white">39€</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8 text-white/80">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Basic Support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>3 Months Updates</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Core Features</span>
                </li>
              </ul>
              <Button
                className="w-full bg-[#1DB954] text-black hover:bg-[#1DB954]/90"
                onClick={() => handleSelectPackage("single")}
              >
                Select Package
              </Button>
            </CardContent>
          </Card>

          {/* Triple */}
          <Card className="bg-black/50 border-[#1DB954]/50 hover:border-[#1DB954] transition-all relative">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-[#1DB954] text-black px-4">BEST VALUE</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-[#1DB954]">3 SnapCracks</span>
                <div className="text-3xl font-bold mt-4 text-white">89€</div>
                <div className="text-sm text-white/80">Save 50€</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8 text-white/80">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Priority Support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Lifetime Updates</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Premium Features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Private Discord Access</span>
                </li>
              </ul>
              <Button
                className="w-full bg-[#1DB954] text-black hover:bg-[#1DB954]/90"
                onClick={() => handleSelectPackage("triple")}
              >
                Select Package
              </Button>
            </CardContent>
          </Card>

          {/* Five Pack */}
          <Card className="bg-black/50 border-[#1DB954]/50 hover:border-[#1DB954] transition-all">
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-[#1DB954]">5 SnapCracks</span>
                <div className="text-3xl font-bold mt-4 text-white">129€</div>
                <div className="text-sm text-white/80">Save 66€</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8 text-white/80">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>24/7 VIP Support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Lifetime Updates</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>All Premium Features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Private Discord Access</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#1DB954]" />
                  <span>Priority Queue</span>
                </li>
              </ul>
              <Button
                className="w-full bg-[#1DB954] text-black hover:bg-[#1DB954]/90"
                onClick={() => handleSelectPackage("five")}
              >
                Select Package
              </Button>
            </CardContent>
          </Card>
        </div>

        <AccountNamesDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleAccountNamesSubmit}
          numberOfAccounts={selectedPlan === "single" ? 1 : selectedPlan === "triple" ? 3 : 5}
          planName={
            selectedPlan === "single" ? "1 SnapCrack" : selectedPlan === "triple" ? "3 SnapCracks" : "5 SnapCracks"
          }
        />
      </div>
    </div>
  )
}

