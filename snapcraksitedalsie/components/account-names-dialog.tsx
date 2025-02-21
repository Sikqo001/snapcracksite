"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface AccountNamesDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (names: string[]) => void
  numberOfAccounts: number
  planName: string
}

export function AccountNamesDialog({ isOpen, onClose, onSubmit, numberOfAccounts, planName }: AccountNamesDialogProps) {
  const [accountNames, setAccountNames] = useState(Array(numberOfAccounts).fill(""))

  const handleSubmit = () => {
    onSubmit(accountNames)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/50 border-[#1DB954]/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-[#1DB954]">Enter Account Names</DialogTitle>
          <DialogDescription>Please enter the account names for your {planName}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Array.from({ length: numberOfAccounts }).map((_, i) => (
            <div key={i} className="grid gap-2">
              <label htmlFor={`name${i}`} className="text-sm">
                Account {i + 1} Name
              </label>
              <Input
                id={`name${i}`}
                value={accountNames[i]}
                onChange={(e) => {
                  const newAccountNames = [...accountNames]
                  newAccountNames[i] = e.target.value
                  setAccountNames(newAccountNames)
                }}
                className="bg-black border-[#1DB954]/50 text-white"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="bg-[#1DB954] text-black hover:bg-[#1DB954]/90">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

