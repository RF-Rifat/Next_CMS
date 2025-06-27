import { NextResponse } from "next/server"
import { getDatabase } from "@/nx/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()
    const layouts = await db
      .collection("layout")
      .find({ status: { $ne: "archived" } })
      .sort({ updated_at: -1 })
      .project({ title: 1, status: 1, created_at: 1, updated_at: 1 })
      .toArray()

    return NextResponse.json({ success: true, data: layouts })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch layouts" }, { status: 500 })
  }
}
