import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, ObjectId } from "@/nx/mongodb"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = await getDatabase()

    const page = await db.collection("page").findOne({ _id: new ObjectId(id) })

    if (!page) {
      return NextResponse.json({ success: false, error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: page })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const db = await getDatabase()

    const updateData = {
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
      updated_at: new Date(),
    }

    await db.collection("page").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = await getDatabase()

    await db.collection("page").deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete page" }, { status: 500 })
  }
} 