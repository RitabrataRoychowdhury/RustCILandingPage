import { promises as fs } from "fs"
import path from "path"

export interface WaitlistSubmission {
  id: string
  type: "investor" | "early-access"
  name: string
  email: string
  company: string
  role: string
  message: string
  timestamp: string
  investmentRange?: string
}

const LOG_DIR = path.join(process.cwd(), "logs")
const SUBMISSIONS_FILE = path.join(LOG_DIR, "waitlist-submissions.json")

// Ensure logs directory exists
async function ensureLogDir() {
  try {
    await fs.access(LOG_DIR)
  } catch {
    await fs.mkdir(LOG_DIR, { recursive: true })
  }
}

// Save submission to local file
export async function saveSubmission(submission: WaitlistSubmission): Promise<void> {
  try {
    console.log("[v0] Ensuring log directory exists")
    await ensureLogDir()

    let submissions: WaitlistSubmission[] = []

    // Read existing submissions
    try {
      console.log("[v0] Reading existing submissions from:", SUBMISSIONS_FILE)
      const data = await fs.readFile(SUBMISSIONS_FILE, "utf-8")
      submissions = JSON.parse(data)
      console.log("[v0] Found", submissions.length, "existing submissions")
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      console.log(
        "[v0] No existing submissions file, starting fresh:",
        error instanceof Error ? error.message : "Unknown error",
      )
      submissions = []
    }

    // Add new submission
    submissions.push(submission)
    console.log("[v0] Added new submission, total count:", submissions.length)

    // Write back to file
    console.log("[v0] Writing submissions to file")
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))
    console.log("[v0] Successfully saved submission to file")
  } catch (error) {
    console.error("[v0] Error in saveSubmission:", error)
    throw error
  }
}

// Get all submissions from local file
export async function getSubmissions(): Promise<WaitlistSubmission[]> {
  try {
    await ensureLogDir()
    const data = await fs.readFile(SUBMISSIONS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Delete submission by ID
export async function deleteSubmission(id: string): Promise<void> {
  const submissions = await getSubmissions()
  const filtered = submissions.filter((sub) => sub.id !== id)
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(filtered, null, 2))
}

// Clear all submissions
export async function clearAllSubmissions(): Promise<void> {
  await ensureLogDir()
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2))
}
