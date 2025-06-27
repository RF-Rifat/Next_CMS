import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/nx/mongodb"
import { WIDTH_OPTIONS } from "@/components/layouts/layout"

export async function GET() {
  try {
    const db = await getDatabase()
    const layouts = await db.collection("layout").find({}).sort({ updated_at: -1 }).toArray()

    return NextResponse.json({ success: true, data: layouts })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch layouts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const layout = {
      title: body.title,
      status: body.status || "draft",
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.collection("layout").insertOne(layout)

    // Create layout_meta entries with column structure
    if (body.sections && body.sections.length > 0) {
      const metaEntries: any[] = []

      body.sections.forEach((section: any, sectionIndex: number) => {
        section.columns.forEach((column: any, columnIndex: number) => {
          column.components.forEach((component: any) => {
            metaEntries.push({
              layout_id: result.insertedId,
              template: component.type,
              content: component.content,
              style: component.style || {},
              // Column structure data
              section_id: section.id,
              column_id: column.id,
              column_width: column.width,
              mobile_width: column.mobileWidth,
              column_order: columnIndex,
              section_order: sectionIndex,
              columns_in_row: section.columns.length,
              column_ratio: section.columns.map((col: any) => {
                const widthOption = WIDTH_OPTIONS.find((w) => w.value === col.width)
                return widthOption ? `${widthOption.percentage}%` : "100%"
              }),
            })
          })
        })
      })

      if (metaEntries.length > 0) {
        await db.collection("layout_meta").insertMany(metaEntries)
      }
    }

    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...layout } })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to create layout" }, { status: 500 })
  }
}
