"use client"
import { useState, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Plus, Edit, Copy, Trash2, GripVertical, Settings, Palette } from "lucide-react"
import { COLUMN_PRESETS, WIDTH_OPTIONS, type SectionData, type ColumnData, type ComponentData } from "./layout"

interface SectionBuilderProps {
  sections: SectionData[]
  onAddSection: (preset: string) => void
  onEditSection: (sectionId: string) => void
  onCopySection: (sectionId: string) => void
  onDeleteSection: (sectionId: string) => void
  onMoveSection: (dragIndex: number, hoverIndex: number) => void
  onMoveComponent: (componentId: string, targetSectionId: string, targetColumnId: string) => void
  onSelectComponent: (component: ComponentData) => void
  onUpdateColumn: (sectionId: string, columnId: string, updates: Partial<ColumnData>) => void
}

const ItemTypes = {
  SECTION: "section",
  COMPONENT: "component",
  ELEMENT: "element",
}

export default function SectionBuilder({
  sections,
  onAddSection,
  onEditSection,
  onCopySection,
  onDeleteSection,
  onMoveSection,
  onMoveComponent,
  onSelectComponent,
  onUpdateColumn,
}: SectionBuilderProps) {
  const [showColumnPresets, setShowColumnPresets] = useState(false)
  const [editingColumn, setEditingColumn] = useState<{ sectionId: string; columnId: string } | null>(null)

  return (
    <div className="space-y-6">
      {/* Add Section Button */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setShowColumnPresets(!showColumnPresets)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Section
          </button>
        </div>

        {showColumnPresets && (
          <div className="px-6 py-4">
            <div className="grid grid-cols-2 gap-3">
              {COLUMN_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="cursor-pointer border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    onAddSection(preset.id)
                    setShowColumnPresets(false)
                  }}
                >
                  <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <img
                      src={`/placeholder.svg?height=60&width=100&text=${preset.label}`}
                      alt={preset.label}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <p className="text-xs font-medium text-center">{preset.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sections List */}
      {sections.map((section, sectionIndex) => (
        <DraggableSection
          key={section.id}
          section={section}
          index={sectionIndex}
          onEdit={() => onEditSection(section.id)}
          onCopy={() => onCopySection(section.id)}
          onDelete={() => onDeleteSection(section.id)}
          onMove={onMoveSection}
          onMoveComponent={onMoveComponent}
          onSelectComponent={onSelectComponent}
          onUpdateColumn={onUpdateColumn}
          editingColumn={editingColumn}
          setEditingColumn={setEditingColumn}
        />
      ))}

      {sections.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No sections added yet</p>
          <p className="text-sm">Click "Add Section" to get started</p>
        </div>
      )}
    </div>
  )
}

interface DraggableSectionProps {
  section: SectionData
  index: number
  onEdit: () => void
  onCopy: () => void
  onDelete: () => void
  onMove: (dragIndex: number, hoverIndex: number) => void
  onMoveComponent: (componentId: string, targetSectionId: string, targetColumnId: string) => void
  onSelectComponent: (component: ComponentData) => void
  onUpdateColumn: (sectionId: string, columnId: string, updates: Partial<ColumnData>) => void
  editingColumn: { sectionId: string; columnId: string } | null
  setEditingColumn: (editing: { sectionId: string; columnId: string } | null) => void
}

function DraggableSection({
  section,
  index,
  onEdit,
  onCopy,
  onDelete,
  onMove,
  onMoveComponent,
  onSelectComponent,
  onUpdateColumn,
  editingColumn,
  setEditingColumn,
}: DraggableSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.SECTION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      onMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SECTION,
    item: () => ({ id: section.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm group hover:shadow-md transition-shadow">
        {/* Section Header */}
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
          <div className="flex items-center gap-2">
            <div className="cursor-move">
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-700">Section {index + 1}</span>
          </div>

          <div className="flex gap-1">
            <button
              className="h-6 px-2 text-xs bg-transparent text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={onEdit}
            >
              <Edit className="w-3 h-3" />
            </button>
            <button
              className="h-6 px-2 text-xs bg-transparent text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={onCopy}
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              className="h-6 px-2 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
              onClick={onDelete}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Section Content - Columns */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {section.columns.map((column, columnIndex) => (
              <DroppableColumn
                key={column.id}
                column={column}
                sectionId={section.id}
                columnIndex={columnIndex}
                onMoveComponent={onMoveComponent}
                onSelectComponent={onSelectComponent}
                onUpdateColumn={onUpdateColumn}
                isEditing={editingColumn?.sectionId === section.id && editingColumn?.columnId === column.id}
                setEditingColumn={setEditingColumn}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface DroppableColumnProps {
  column: ColumnData
  sectionId: string
  columnIndex: number
  onMoveComponent: (componentId: string, targetSectionId: string, targetColumnId: string) => void
  onSelectComponent: (component: ComponentData) => void
  onUpdateColumn: (sectionId: string, columnId: string, updates: Partial<ColumnData>) => void
  isEditing: boolean
  setEditingColumn: (editing: { sectionId: string; columnId: string } | null) => void
}

function DroppableColumn({
  column,
  sectionId,
  columnIndex,
  onMoveComponent,
  onSelectComponent,
  onUpdateColumn,
  isEditing,
  setEditingColumn,
}: DroppableColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["element", "component"],
    drop: (item: any, monitor) => {
      console.log("Dropped item:", item) // Debug log

      if (item.type === "element") {
        // Handle new element drop
        onMoveComponent(item.elementType, sectionId, column.id)
      } else {
        // Handle existing component move
        onMoveComponent(item.id, sectionId, column.id)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const handleColumnUpdate = (field: string, value: any) => {
    onUpdateColumn(sectionId, column.id, { [field]: value })
  }

  return (
    <div
      ref={drop as unknown as React.RefCallback<HTMLDivElement>}
      className={`${column.width} ${column.mobileWidth || "w-full"} border-2 border-dashed rounded-lg p-3 min-h-[100px] transition-colors relative ${
        isOver && canDrop ? "border-blue-500 bg-blue-50" : isOver ? "border-red-500 bg-red-50" : "border-gray-300"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500">Column {columnIndex + 1}</div>
        <div className="flex gap-1">
          <button
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => setEditingColumn({ sectionId, columnId: column.id })}
          >
            <Settings className="w-3 h-3" />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => handleColumnUpdate("style", { ...column.style, backgroundColor: "#f3f4f6" })}
          >
            <Palette className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Column Settings */}
      {isEditing && (
        <div className="absolute top-0 left-0 right-0 bg-white border border-gray-300 rounded-lg p-3 shadow-lg z-10">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Column Settings</h4>
              <button onClick={() => setEditingColumn(null)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Desktop Width</label>
              <select
                value={column.width}
                onChange={(e) => handleColumnUpdate("width", e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {WIDTH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Mobile Width</label>
              <select
                value={column.mobileWidth || "w-full"}
                onChange={(e) => handleColumnUpdate("mobileWidth", e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {WIDTH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Background Color</label>
              <input
                type="color"
                value={column.style?.backgroundColor || "#ffffff"}
                onChange={(e) => handleColumnUpdate("style", { ...column.style, backgroundColor: e.target.value })}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  // Clone column logic would go here
                  setEditingColumn(null)
                }}
                className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Clone
              </button>
              <button
                onClick={() => {
                  // Delete column logic would go here
                  setEditingColumn(null)
                }}
                className="flex-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Components in this column */}
      <div className="space-y-2" style={{ backgroundColor: column.style?.backgroundColor }}>
        {column.components.map((component, componentIndex) => (
          <DraggableComponent
            key={component.id}
            component={component}
            index={componentIndex}
            onSelect={() => onSelectComponent(component)}
          />
        ))}
      </div>

      {/* Drop zone indicator */}
      {column.components.length === 0 && (
        <div
          className={`text-center text-xs py-8 transition-colors ${
            isOver && canDrop ? "text-blue-600" : "text-gray-400"
          }`}
        >
          {isOver && canDrop ? "Drop element here" : "Drop elements here"}
        </div>
      )}
    </div>
  )
}

interface DraggableComponentProps {
  component: ComponentData
  index: number
  onSelect: () => void
}

function DraggableComponent({ component, index, onSelect }: DraggableComponentProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COMPONENT,
    item: { id: component.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag as unknown as React.RefCallback<HTMLDivElement>}
      className={`bg-white border border-gray-200 rounded p-3 cursor-pointer hover:border-blue-500 transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={onSelect}
    >
      <ComponentPreview component={component} />
    </div>
  )
}


// Component Preview - Shows actual rendered content
function ComponentPreview({ component }: { component: ComponentData }) {
  const { type, content, style } = component
  const titleColor = style?.title_color || "#1f2937"

  switch (type) {
    case "Hello":
      const textAlign = style?.text_align || "left"
      const textColor = style?.text_color || "#000000"
      const bgColor = style?.bg_color || "#ffffff"
      const fontSize = style?.font_size || 24
      const padding = style?.padding || 16

      return (
        <div
          className="rounded"
          style={{
            backgroundColor: bgColor,
            padding: `${padding}px`,
          }}
        >
          <h1
            className="font-bold"
            style={{
              textAlign: textAlign as any,
              color: textColor,
              fontSize: `${fontSize}px`,
            }}
          >
            {content?.textme || "Hello World"}
          </h1>
        </div>
      )

    case "Qna":
      const qnaContent = Array.isArray(content) ? content : []
      const questionColor = style?.question_color || "#1f2937"
      const answerColor = style?.answer_color || "#6b7280"
      const borderColor = style?.border_color || "#3b82f6"

      return (
        <div className="space-y-2">
          {qnaContent.slice(0, 2).map((item: any, index: number) => (
            <div key={index} className="bg-gray-50 rounded p-2" style={{ borderLeft: `3px solid ${borderColor}` }}>
              <h3 className="text-sm font-semibold mb-1" style={{ color: questionColor }}>
                {item.questions || `Question ${index + 1}`}
              </h3>
              <p className="text-xs" style={{ color: answerColor }}>
                {item.answers || `Answer ${index + 1}`}
              </p>
            </div>
          ))}
          {qnaContent.length > 2 && (
            <div className="text-xs text-gray-500 text-center">+{qnaContent.length - 2} more</div>
          )}
        </div>
      )

    case "Banner":
      const overlayColor = style?.overlay_color || "#000000"
      const overlayOpacity = style?.overlay_opacity || 50

      return (
        <div className="relative bg-gray-900 rounded overflow-hidden h-24">
          <img
            src={content?.image || "/placeholder.svg?height=100&width=200"}
            alt={content?.title || "Banner"}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: `${overlayColor}${Math.round(overlayOpacity * 2.55)
                .toString(16)
                .padStart(2, "0")}`,
            }}
          >
            <div className="text-center p-2">
              <h2 className="text-sm font-bold" style={{ color: titleColor }}>
                {content?.title || "Banner Title"}
              </h2>
            </div>
          </div>
        </div>
      )

    case "Banners":
      const bannersContent = Array.isArray(content) ? content : []
      const cardBg = style?.card_bg || "#ffffff"

      return (
        <div className="grid grid-cols-2 gap-2">
          {bannersContent.slice(0, 4).map((item: any, index: number) => (
            <div key={index} className="rounded overflow-hidden" style={{ backgroundColor: cardBg }}>
              <img
                src={item.image || "/placeholder.svg?height=50&width=80"}
                alt={item.title || `Banner ${index + 1}`}
                className="w-full h-8 object-cover"
              />
              <div className="p-1">
                <h3 className="text-xs font-bold truncate" style={{ color: titleColor }}>
                  {item.title || `Banner ${index + 1}`}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )

    case "Grid":
      return (
        <div className="p-2 bg-gray-50 rounded">
          <h2 className="text-sm font-bold text-center mb-2" style={{ color: titleColor }}>
            {content?.title || "Our Layouts"}
          </h2>
          <div className="grid grid-cols-2 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-1 rounded text-xs border">
                Layout {i}
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return <div className="p-2 bg-gray-100 rounded text-xs">Unknown: {type}</div>
  }
}
