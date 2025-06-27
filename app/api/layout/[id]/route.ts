import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, ObjectId } from "@/nx/mongodb"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = await getDatabase()

    const layout = await db.collection("layout").findOne({ _id: new ObjectId(id) })
    const layoutMetas = await db
      .collection("layout_meta")
      .find({ layout_id: new ObjectId(id) })
      .sort({ section_order: 1, column_order: 1 })
      .toArray()

    if (!layout) {
      return NextResponse.json({ success: false, error: "Layout not found" }, { status: 404 })
    }

    // Define types for better type safety
    type ComponentType = {
      id: string
      type: string
      content: any
      style: Record<string, any>
    }
    
    type ColumnType = {
      id: string
      width: string
      mobileWidth: string
      order: number
      components: ComponentType[]
      style: Record<string, any>
    }
    
    type SectionType = {
      id: string
      order: number
      columnsInRow: number
      columnRatio: string[]
      columns: Map<string, ColumnType>
    }
    
    // Group layout_meta by sections and columns
    const sectionsMap = new Map<string, SectionType>()
    
    layoutMetas.forEach((meta) => {
      const sectionId = meta.section_id || "default_section"
      const columnId = meta.column_id || "default_column"
    
      if (!sectionsMap.has(sectionId)) {
        sectionsMap.set(sectionId, {
          id: sectionId,
          order: meta.section_order || 0,
          columnsInRow: meta.columns_in_row || 1,
          columnRatio: meta.column_ratio || ["100%"],
          columns: new Map<string, ColumnType>(),
        })
      }
    
      const section = sectionsMap.get(sectionId)!
    
      if (!section.columns.has(columnId)) {
        section.columns.set(columnId, {
          id: columnId,
          width: meta.column_width || "w-full",
          mobileWidth: meta.mobile_width || "w-full",
          order: meta.column_order || 0,
          components: [],
          style: {},
        })
      }
    
      section.columns.get(columnId)!.components.push({
        id: meta._id?.toString() || "",
        type: meta.template,
        content: meta.content,
        style: meta.style || {},
      })
    })
    
    // Convert maps to arrays and sort
    const sections = Array.from(sectionsMap.values())
      .map((section) => ({
        ...section,
        columns: Array.from(section.columns.values()).sort((a, b) => (a as ColumnType).order - (b as ColumnType).order),
      }))
      .sort((a, b) => a.order - b.order)

    return NextResponse.json({
      success: true,
      data: {
        layout,
        metas: layoutMetas,
        sections,
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch layout" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const db = await getDatabase()

    // Update layout
    await db.collection("layout").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title,
          status: body.status,
          updated_at: new Date(),
        },
      },
    )

    // Delete existing layout_meta entries
    await db.collection("layout_meta").deleteMany({ layout_id: new ObjectId(id) })

    // Insert new layout_meta entries with column structure
    if (body.sections && body.sections.length > 0) {
      const metaEntries: any[] = []

      body.sections.forEach((section: any, sectionIndex: number) => {
        const preset = body.columnPresets?.find((p: any) => p.id === section.presetId)

        section.columns.forEach((column: any, columnIndex: number) => {
          column.components.forEach((component: any) => {
            metaEntries.push({
              layout_id: new ObjectId(id),
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
                const widthOption = body.widthOptions?.find((w: any) => w.value === col.width)
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update layout" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = await getDatabase()

    await db.collection("layout").deleteOne({ _id: new ObjectId(id) })
    await db.collection("layout_meta").deleteMany({ layout_id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete layout" }, { status: 500 })
  }
}
