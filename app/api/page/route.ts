import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/nx/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()
    const pages = await db
      .collection("page")
      .find({})
      .sort({ updated_at: -1 })
      .project({
        title: 1,
        slug: 1,
        status: 1,
        featured_image: 1,
        created_at: 1,
        updated_at: 1,
      })
      .toArray()

    return NextResponse.json({ success: true, data: pages })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const page = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      meta_title: body.meta_title || "",
      meta_description: body.meta_description || "",
      meta_keywords: body.meta_keywords || [],
      featured_image: body.featured_image || [],
      gallery_images: body.gallery_images || [],
      layout_top: body.layout_top || "",
      layout_bottom: body.layout_bottom || "",
      status: body.status || "draft",
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.collection("page").insertOne(page)

    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...page } })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to create page" }, { status: 500 })
  }
} 