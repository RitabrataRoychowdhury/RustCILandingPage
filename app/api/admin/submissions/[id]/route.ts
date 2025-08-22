import { type NextRequest, NextResponse } from "next/server"
import { deleteSubmission } from "@/lib/mongodb"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    await deleteSubmission(params.id)

    return NextResponse.json({ message: "Submission deleted successfully" })
  } catch (error) {
    console.error("Error deleting submission:", error)
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 })
  }
}
