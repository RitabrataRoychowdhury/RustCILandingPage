import { type NextRequest, NextResponse } from "next/server"
import { clearAllSubmissions } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    // Check for admin authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    if (token !== "admin-token-rustci") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    await clearAllSubmissions()

    return NextResponse.json({ message: "All submissions cleared successfully" })
  } catch (error) {
    console.error("Error clearing submissions:", error)
    return NextResponse.json({ error: "Failed to clear submissions" }, { status: 500 })
  }
}
