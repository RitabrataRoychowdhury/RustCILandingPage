import { type NextRequest, NextResponse } from "next/server"
import { saveSubmission, type WaitlistSubmission } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Received waitlist submission request")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { name, email, company, role, message, type, id, timestamp } = body

    if (!name || !email || !company || !role || !message || !type || !id || !timestamp) {
      console.error("[v0] Missing required fields:", {
        name: !!name,
        email: !!email,
        company: !!company,
        role: !!role,
        message: !!message,
        type: !!type,
        id: !!id,
        timestamp: !!timestamp,
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (type !== "investor" && type !== "early-access") {
      console.error("[v0] Invalid submission type:", type)
      return NextResponse.json({ error: "Invalid submission type" }, { status: 400 })
    }

    const submission: Omit<WaitlistSubmission, "_id"> = {
      type,
      name,
      email,
      company,
      role,
      message,
      timestamp,
      ...(body.investmentRange && { investmentRange: body.investmentRange }),
    }

    console.log("[v0] Saving submission:", submission)
    await saveSubmission(submission)
    console.log("[v0] Submission saved successfully")

    return NextResponse.json({ message: "Submission saved successfully", id }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error saving submission:", error)
    return NextResponse.json(
      { error: `Failed to save submission: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
