"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Mail, Building, MessageSquare, CheckCircle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WaitlistFormProps {
  isOpen: boolean
  onClose: () => void
  type: "investor" | "early-access"
}

interface FormData {
  name: string
  email: string
  company: string
  role: string
  message: string
  investmentRange?: string // Added investment range for investors
  type: "investor" | "early-access"
}

export function WaitlistForm({ isOpen, onClose, type }: WaitlistFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    investmentRange: type === "investor" ? "" : undefined, // Initialize investment range for investors
    type,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting form data:", formData)
      console.log("[v0] MongoDB Test - Form type:", type)
      console.log("[v0] MongoDB Test - Investment range:", formData.investmentRange)

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          id: `${type}-${Date.now()}`,
        }),
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.text()
        console.error("[v0] Response error:", errorData)
        throw new Error(`Failed to submit form: ${response.status} ${errorData}`)
      }

      const result = await response.json()
      console.log("[v0] Submission successful:", result)
      console.log("[v0] MongoDB Test - Data should now be in investors collection")

      setIsSubmitted(true)
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          message: "",
          investmentRange: type === "investor" ? "" : undefined,
          type,
        })
      }, 2000)
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      console.error("[v0] MongoDB Test - Submission failed, check database connection")
      alert(`Error submitting form: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {type === "investor" ? "Join as Investor" : "Get Early Access"}
              </h2>
              <p className="text-gray-400">
                {type === "investor"
                  ? "Be part of the next-generation CI/CD revolution"
                  : "Get priority access to RustCI & Valkyrie"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-400">We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <Input
                    type="text"
                    placeholder="Role/Title"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    required
                  />

                  {type === "investor" && (
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                      <Select onValueChange={(value) => handleInputChange("investmentRange", value)} required>
                        <SelectTrigger className="pl-10 bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Investment Range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="50k-250k" className="text-white hover:bg-gray-700">
                            $50K - $250K
                          </SelectItem>
                          <SelectItem value="250k-500k" className="text-white hover:bg-gray-700">
                            $250K - $500K
                          </SelectItem>
                          <SelectItem value="500k-1m" className="text-white hover:bg-gray-700">
                            $500K - $1M
                          </SelectItem>
                          <SelectItem value="1m-5m" className="text-white hover:bg-gray-700">
                            $1M - $5M
                          </SelectItem>
                          <SelectItem value="5m+" className="text-white hover:bg-gray-700">
                            $5M+
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Textarea
                      placeholder={
                        type === "investor"
                          ? "Tell us about your investment interests and portfolio focus..."
                          : "What are you planning to build with RustCI & Valkyrie?"
                      }
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : type === "investor"
                        ? "Submit Investment Interest"
                        : "Request Early Access"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
