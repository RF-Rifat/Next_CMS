"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Tabs, { TabsList, TabsTrigger, TabsContent } from "@/components/layouts/Tabs"
import SectionBuilder from "@/components/layouts/SectionBuilder"
import ElementList from "@/components/layouts/ElementList"
import ElementEditor from "@/components/layouts/ElementEditor"
import StyleEditor from "@/components/layouts/StyleEditor"
import { AVAILABLE_TEMPLATES, getDefaultContent, getDefaultStyle } from "@/components/layouts/templates"
import { COLUMN_PRESETS, WIDTH_OPTIONS, type SectionData, type ComponentData, type ColumnData } from "@/components/layouts/layout"
import type { Layout, LayoutMeta } from "@/components/layouts/layout"

interface LayoutFormProps {
  initialData?: {
    layout: Layout
    metas: LayoutMeta[]
    sections?: SectionData[]
  }
}

export default function LayoutForm({ initialData }: LayoutFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.layout.title || "")
  const [status, setStatus] = useState(initialData?.layout.status || "draft")
  const [sections, setSections] = useState<SectionData[]>([])
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null)
  const [activeTab, setActiveTab] = useState("elements")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialData?.sections && initialData.sections.length > 0) {
      // Use new section structure
      setSections(initialData.sections)
    } else if (initialData?.metas) {
      // Convert old structure to new section-based structure
      const defaultSection: SectionData = {
        id: `section_${Date.now()}`,
        columns: [
          {
            id: `column_${Date.now()}`,
            width: "w-full",
            mobileWidth: "w-full",
            components: initialData.metas.map((meta, index) => ({
              id: `${meta.template}_${Date.now()}_${index}`,
              type: meta.template,
              content: meta.content,
              style: meta.style || getDefaultStyle(meta.template),
            })),
            style: {},
            order: 0,
          },
        ],
        style: {},
        order: 0,
        columnsInRow: 1,
        columnRatio: ["100%"],
      }
      setSections([defaultSection])
    }
  }, [initialData])

  const addSection = (presetId: string) => {
    const preset = COLUMN_PRESETS.find((p) => p.id === presetId)
    if (!preset) return

    const newSection: SectionData = {
      id: `section_${Date.now()}`,
      columns: preset.widths.map((width, index) => ({
        id: `column_${Date.now()}_${index}`,
        width,
        mobileWidth: preset.mobileWidths[index],
        components: [],
        style: {},
        order: index,
      })),
      style: {},
      order: sections.length,
      columnsInRow: preset.columnsInRow,
      columnRatio: preset.ratio,
    }

    setSections([...sections, newSection])
  }

  const editSection = (sectionId: string) => {
    console.log("Edit section:", sectionId)
  }

  const copySection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return

    const copiedSection: SectionData = {
      ...section,
      id: `section_${Date.now()}`,
      order: sections.length,
      columns: section.columns.map((col, index) => ({
        ...col,
        id: `column_${Date.now()}_${Math.random()}`,
        order: index,
        components: col.components.map((comp) => ({
          ...comp,
          id: `${comp.type}_${Date.now()}_${Math.random()}`,
        })),
      })),
    }

    setSections([...sections, copiedSection])
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((s) => s.id !== sectionId))
    if (selectedComponent) {
      const componentExists = sections.some((s) =>
        s.columns.some((c) => c.components.some((comp) => comp.id === selectedComponent.id)),
      )
      if (!componentExists) {
        setSelectedComponent(null)
      }
    }
  }

  const moveSection = (dragIndex: number, hoverIndex: number) => {
    const newSections = [...sections]
    const [movedSection] = newSections.splice(dragIndex, 1)
    newSections.splice(hoverIndex, 0, movedSection)

    // Update section orders
    newSections.forEach((section, index) => {
      section.order = index
    })

    setSections(newSections)
  }

  const moveComponent = (componentIdOrType: string, targetSectionId: string, targetColumnId: string) => {
    console.log("moveComponent called:", { componentIdOrType, targetSectionId, targetColumnId })

    // Check if this is a new element being added
    if (AVAILABLE_TEMPLATES.some((t) => t.name === componentIdOrType)) {
      console.log("Adding new element:", componentIdOrType)

      // This is a new element
      const newComponent: ComponentData = {
        id: `${componentIdOrType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: componentIdOrType,
        content: getDefaultContent(componentIdOrType),
        style: getDefaultStyle(componentIdOrType),
      }

      const updatedSections = sections.map((section) => {
        if (section.id === targetSectionId) {
          return {
            ...section,
            columns: section.columns.map((column) => {
              if (column.id === targetColumnId) {
                console.log("Adding component to column:", column.id)
                return {
                  ...column,
                  components: [...column.components, newComponent],
                }
              }
              return column
            }),
          }
        }
        return section
      })

      console.log("Updated sections:", updatedSections)
      setSections(updatedSections)
      setSelectedComponent(newComponent)
      setActiveTab("editor")
      return
    }

    // This is moving an existing component
    let componentToMove: ComponentData | null = null

    // Find and remove the component from its current location
    const updatedSections = sections.map((section) => ({
      ...section,
      columns: section.columns.map((column) => {
        const componentIndex = column.components.findIndex((c) => c.id === componentIdOrType)
        if (componentIndex !== -1) {
          componentToMove = column.components[componentIndex]
          return {
            ...column,
            components: column.components.filter((c) => c.id !== componentIdOrType),
          }
        }
        return column
      }),
    }))

    if (!componentToMove) return

    // Add the component to the target location
    const finalSections = updatedSections.map((section) => {
      if (section.id === targetSectionId) {
        return {
          ...section,
          columns: section.columns.map((column) => {
            if (column.id === targetColumnId) {
              return {
                ...column,
                components: [...column.components, componentToMove!],
              }
            }
            return column
          }),
        }
      }
      return section
    })

    setSections(finalSections)
  }

  const updateColumn = (sectionId: string, columnId: string, updates: Partial<ColumnData>) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedColumns = section.columns.map((column) => {
          if (column.id === columnId) {
            return { ...column, ...updates }
          }
          return column
        })

        // Update column ratio when width changes
        const columnRatio = updatedColumns.map((col) => {
          const widthOption = WIDTH_OPTIONS.find((w) => w.value === col.width)
          return widthOption ? `${widthOption.percentage}%` : "100%"
        })

        return {
          ...section,
          columns: updatedColumns,
          columnRatio,
          columnsInRow: updatedColumns.length,
        }
      }
      return section
    })

    setSections(updatedSections)
  }

  const updateComponent = (id: string, updates: Partial<ComponentData>) => {
    const updatedSections = sections.map((section) => ({
      ...section,
      columns: section.columns.map((column) => ({
        ...column,
        components: column.components.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)),
      })),
    }))

    setSections(updatedSections)

    if (selectedComponent?.id === id) {
      setSelectedComponent((prev) => (prev ? { ...prev, ...updates } : null))
    }
  }

  const updateComponentStyle = (id: string, style: any) => {
    updateComponent(id, { style })
  }

  const selectComponent = (component: ComponentData) => {
    setSelectedComponent(component)
    setActiveTab("editor")
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    setSaving(true)
    try {
      const components: any[] = []
      const metaEntries: any[] = [] // Array to hold meta entries

      sections.forEach((section, sectionIndex) => {
        section.columns.forEach((column, columnIndex) => {
          column.components.forEach((component) => {
            components.push({
              template: component.type,
              content: component.content,
              style: component.style,
            })

            // Create meta entry for each component
            metaEntries.push({
              layout_id: null, // Will be populated after layout creation
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
              // Add column style
              column_style: {
                desktop_width: column.width,
                mobile_width: column.mobileWidth,
                bg_color: column.style?.backgroundColor || "#ffffff",
                font_size: column.style?.fontSize || 16,
                padding: column.style?.padding || 16,
              },
            })
          })
        })
      })

      const payload = {
        title,
        status,
        components,
        sections, // Save sections with column structure
        widthOptions: WIDTH_OPTIONS, // Include width options for percentage calculation
        metaEntries, // Include meta entries for each component
      }

      const url = initialData ? `/api/layout/${initialData.layout._id}` : "/api/layout"
      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        alert("Layout saved successfully!")
        if (!initialData) {
          router.push("/nx-admin/layouts")
        }
      } else {
        alert("Failed to save layout: " + (data.error || "Unknown error"))
      }
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to save layout")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Layout Settings</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter layout title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Layout"}
          </button>
        </div>
      </div>

      {/* Main Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Builder Tools</h3>
            </div>
            <div className="px-6 py-4">
              <Tabs defaultValue={activeTab} onTabChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="elements">Elements</TabsTrigger>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="elements" className="mt-4">
                  <ElementList />
                </TabsContent>

                <TabsContent value="editor" className="mt-4">
                  <ElementEditor component={selectedComponent} onUpdate={updateComponent} />
                </TabsContent>

                <TabsContent value="style" className="mt-4">
                  <StyleEditor component={selectedComponent} onUpdateStyle={updateComponentStyle} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right Panel - Section Builder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Layout Builder</h3>
            </div>
            <div className="px-6 py-4">
              <SectionBuilder
                sections={sections}
                onAddSection={addSection}
                onEditSection={editSection}
                onCopySection={copySection}
                onDeleteSection={deleteSection}
                onMoveSection={moveSection}
                onMoveComponent={moveComponent}
                onSelectComponent={selectComponent}
                onUpdateColumn={updateColumn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
