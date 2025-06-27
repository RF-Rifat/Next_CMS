import { NextResponse } from "next/server"
import { getDatabase } from "@/nx/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()
    const contacts = await db
      .collection("contact")
      .find({})
      .sort({ submittedAt: -1 })
      .project({
        formId: 1,
        submittedAt: 1,
        url: 1,
        "fields.name": 1,
        "fields.email": 1,
        "fields.subject": 1,
      })
      .toArray()

    return NextResponse.json({ success: true, data: contacts })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 })
  }
}
