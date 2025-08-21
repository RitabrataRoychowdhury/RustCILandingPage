"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LogOut, Users, Download, Trash2, Calendar, Building, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Submission {
  id: string
  name: string
  email: string
  company: string
  role: string
  message: string
  type: "investor" | "early-access"
  timestamp: string
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = localStorage.getItem("admin-logged-in")
    if (isLoggedIn !== "true") {
      router.push("/admin")
      return
    }

    // Load submissions
    const savedSubmissions = JSON.parse(localStorage.getItem("waitlist-submissions") || "[]")
    setSubmissions(savedSubmissions)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-logged-in")
    router.push("/admin")
  }

  const handleDownload = () => {
    const dataStr = JSON.stringify(submissions, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `waitlist-submissions-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = (id: string) => {
    const updatedSubmissions = submissions.filter((sub) => sub.id !== id)
    setSubmissions(updatedSubmissions)
    localStorage.setItem("waitlist-submissions", JSON.stringify(updatedSubmissions))
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all submissions?")) {
      setSubmissions([])
      localStorage.removeItem("waitlist-submissions")
    }
  }

  const investorSubmissions = submissions.filter((sub) => sub.type === "investor")
  const earlyAccessSubmissions = submissions.filter((sub) => sub.type === "early-access")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10" />

      <div className="relative">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">RustCI & Valkyrie Admin</h1>
              <p className="text-gray-400">Waitlist Management Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleDownload} variant="outline" className="border-gray-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button onClick={handleLogout} variant="outline" className="border-gray-700 bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Submissions</p>
                  <p className="text-3xl font-bold text-white">{submissions.length}</p>
                </div>
                <Users className="w-8 h-8 text-cyan-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Investor Interest</p>
                  <p className="text-3xl font-bold text-purple-400">{investorSubmissions.length}</p>
                </div>
                <Building className="w-8 h-8 text-purple-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Early Access</p>
                  <p className="text-3xl font-bold text-cyan-400">{earlyAccessSubmissions.length}</p>
                </div>
                <Users className="w-8 h-8 text-cyan-500" />
              </div>
            </motion.div>
          </div>

          {/* Submissions List */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Submissions</h2>
              {submissions.length > 0 && (
                <Button onClick={handleClearAll} variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            {submissions.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No submissions yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {submissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-white">{submission.name}</h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              submission.type === "investor"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-cyan-500/20 text-cyan-400"
                            }`}
                          >
                            {submission.type === "investor" ? "Investor" : "Early Access"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{submission.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Building className="w-4 h-4" />
                            <span className="text-sm">
                              {submission.company} - {submission.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-gray-400 mb-3">
                          <MessageSquare className="w-4 h-4 mt-0.5" />
                          <p className="text-sm">{submission.message}</p>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(submission.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleDelete(submission.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
