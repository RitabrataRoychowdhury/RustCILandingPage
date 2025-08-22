import { createHmac } from "crypto"

const AWS_ACCESS_KEY = "AKIAULZDLGBSCDLHU4O2"
const AWS_SECRET_KEY = "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"
const AWS_REGION = "us-east-1"
const BUCKET_NAME = "h4u-dev"

export interface WaitlistSubmission {
  id: string
  type: "investor" | "early-access"
  name: string
  email: string
  company?: string
  role?: string
  investmentRange?: string
  message?: string
  timestamp: string
}

// AWS Signature Version 4 signing
function createSignature(stringToSign: string, dateKey: Buffer, regionName: string, serviceName: string): string {
  const kDate = createHmac("sha256", `AWS4${AWS_SECRET_KEY}`).update(dateKey).digest()
  const kRegion = createHmac("sha256", kDate).update(regionName).digest()
  const kService = createHmac("sha256", kRegion).update(serviceName).digest()
  const kSigning = createHmac("sha256", kService).update("aws4_request").digest()
  return createHmac("sha256", kSigning).update(stringToSign).digest("hex")
}

function sha256(data: string): string {
  return createHmac("sha256", "").update(data).digest("hex")
}

function createAuthorizationHeader(
  method: string,
  path: string,
  queryString: string,
  headers: Record<string, string>,
  payload: string,
): string {
  const now = new Date()
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, "")
  const timeStamp = now.toISOString().slice(0, 19).replace(/[-:]/g, "") + "Z"

  headers["x-amz-date"] = timeStamp
  headers["host"] = `${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com`

  const signedHeaders = Object.keys(headers).sort().join(";")
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((key) => `${key}:${headers[key]}\n`)
    .join("")

  const canonicalRequest = [method, path, queryString, canonicalHeaders, signedHeaders, sha256(payload)].join("\n")

  const credentialScope = `${dateStamp}/${AWS_REGION}/s3/aws4_request`
  const stringToSign = ["AWS4-HMAC-SHA256", timeStamp, credentialScope, sha256(canonicalRequest)].join("\n")

  const signature = createSignature(stringToSign, Buffer.from(dateStamp), AWS_REGION, "s3")

  return `AWS4-HMAC-SHA256 Credential=${AWS_ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
}

export async function saveSubmissionToS3(submission: WaitlistSubmission): Promise<void> {
  const key = `rustci-waitlist/${submission.type}/${submission.id}.json`
  const payload = JSON.stringify(submission, null, 2)

  const headers: Record<string, string> = {
    "content-type": "application/json",
    "content-length": payload.length.toString(),
  }

  const authorization = createAuthorizationHeader("PUT", `/${key}`, "", headers, payload)
  headers["authorization"] = authorization

  const url = `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: payload,
  })

  if (!response.ok) {
    throw new Error(`Failed to save to S3: ${response.status} ${response.statusText}`)
  }
}

export async function getSubmissionsFromS3(): Promise<WaitlistSubmission[]> {
  const submissions: WaitlistSubmission[] = []

  // Get submissions from both investor and early-access folders
  for (const type of ["investor", "early-access"]) {
    const typeSubmissions = await getSubmissionsByType(type as "investor" | "early-access")
    submissions.push(...typeSubmissions)
  }

  return submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export async function getSubmissionsByType(type: "investor" | "early-access"): Promise<WaitlistSubmission[]> {
  const prefix = `rustci-waitlist/${type}/`
  const headers: Record<string, string> = {}

  const authorization = createAuthorizationHeader(
    "GET",
    "/",
    `list-type=2&prefix=${encodeURIComponent(prefix)}`,
    headers,
    "",
  )
  headers["authorization"] = authorization

  const url = `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/?list-type=2&prefix=${encodeURIComponent(prefix)}`

  const response = await fetch(url, {
    method: "GET",
    headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to list S3 objects: ${response.status} ${response.statusText}`)
  }

  const xmlText = await response.text()
  const submissions: WaitlistSubmission[] = []

  // Parse XML response to get object keys
  const keyMatches = xmlText.match(/<Key>([^<]+)<\/Key>/g)

  if (keyMatches) {
    for (const keyMatch of keyMatches) {
      const key = keyMatch.replace(/<\/?Key>/g, "")

      // Get individual object
      const objHeaders: Record<string, string> = {}
      const objAuth = createAuthorizationHeader("GET", `/${key}`, "", objHeaders, "")
      objHeaders["authorization"] = objAuth

      const objUrl = `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`
      const objResponse = await fetch(objUrl, {
        method: "GET",
        headers: objHeaders,
      })

      if (objResponse.ok) {
        const content = await objResponse.text()
        try {
          submissions.push(JSON.parse(content))
        } catch (e) {
          console.error("Failed to parse submission JSON:", e)
        }
      }
    }
  }

  return submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}
