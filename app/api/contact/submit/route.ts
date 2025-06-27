import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/nx/mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formId, data: formData, url } = body

    // Get client information
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    const db = await getDatabase()

    const submission = {
      formId: formId || "contact-form",
      submittedAt: new Date(),
      ip,
      userAgent,
      url: url || "",
      fields: formData,
    }

    const result = await db.collection("contact").insertOne(submission)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...submission },
    })
  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 })
  }
}
