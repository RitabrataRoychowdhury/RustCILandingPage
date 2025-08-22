import { type NextRequest, NextResponse } from "next/server"
import { getSubmissions } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication (simple check for the static credentials)
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    // Simple token validation - in production, use proper JWT validation
    if (token !== "admin-token-rustci") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "investor" | "early-access" | null

    const allSubmissions = await getSubmissions()

    let submissions
    if (type) {
      submissions = allSubmissions.filter((s) => s.type === type)
    } else {
      submissions = allSubmissions
    }

    // Calculate stats
    const stats = {
      total: submissions.length,
      investors: submissions.filter((s) => s.type === "investor").length,
      earlyAccess: submissions.filter((s) => s.type === "early-access").length,
    }

    return NextResponse.json({
      submissions,
      stats,
    })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
