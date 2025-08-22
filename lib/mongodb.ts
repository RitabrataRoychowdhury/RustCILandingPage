import { MongoClient, type Db, type Collection } from "mongodb"

const MONGODB_URI =
  "mongodb+srv://aritpalwork:rfuV3sYZ750ELRgQ@cluster0.exctigw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const DB_NAME = "investors"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(DB_NAME)

    cachedClient = client
    cachedDb = db

    console.log("[v0] Connected to MongoDB successfully")
    return { client, db }
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error)
    throw error
  }
}

export interface WaitlistSubmission {
  _id?: string
  name: string
  email: string
  company?: string
  role?: string
  investmentRange?: string
  message?: string
  type: "investor" | "early-access"
  timestamp: string
}

export async function saveSubmission(submission: Omit<WaitlistSubmission, "_id">): Promise<void> {
  try {
    console.log("[v0] Saving submission to MongoDB:", submission)
    const { db } = await connectToDatabase()
    const collection: Collection<WaitlistSubmission> = db.collection("investors")

    const result = await collection.insertOne(submission)
    console.log("[v0] Submission saved with ID:", result.insertedId)
  } catch (error) {
    console.error("[v0] Error saving submission to MongoDB:", error)
    throw error
  }
}

export async function getSubmissions(): Promise<WaitlistSubmission[]> {
  try {
    console.log("[v0] Fetching submissions from MongoDB")
    const { db } = await connectToDatabase()
    const collection: Collection<WaitlistSubmission> = db.collection("investors")

    const submissions = await collection.find({}).sort({ timestamp: -1 }).toArray()
    console.log("[v0] Retrieved", submissions.length, "submissions from MongoDB")

    return submissions.map((sub) => ({
      ...sub,
      _id: sub._id?.toString(),
    }))
  } catch (error) {
    console.error("[v0] Error fetching submissions from MongoDB:", error)
    throw error
  }
}

export async function deleteSubmission(id: string): Promise<void> {
  try {
    console.log("[v0] Deleting submission from MongoDB:", id)
    const { db } = await connectToDatabase()
    const collection: Collection<WaitlistSubmission> = db.collection("investors")

    await collection.deleteOne({ _id: id })
    console.log("[v0] Submission deleted successfully")
  } catch (error) {
    console.error("[v0] Error deleting submission from MongoDB:", error)
    throw error
  }
}

export async function clearAllSubmissions(): Promise<void> {
  try {
    console.log("[v0] Clearing all submissions from MongoDB")
    const { db } = await connectToDatabase()
    const collection: Collection<WaitlistSubmission> = db.collection("investors")

    const result = await collection.deleteMany({})
    console.log("[v0] Cleared", result.deletedCount, "submissions from MongoDB")
  } catch (error) {
    console.error("[v0] Error clearing submissions from MongoDB:", error)
    throw error
  }
}
