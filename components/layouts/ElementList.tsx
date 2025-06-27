"use client"
import { useDrag } from "react-dnd"
import { Type, HelpCircle, ImageIcon, Layout, Grid, Mail } from "lucide-react"

interface ElementListProps {
  onAddComponent?: (type: string) => void // Optional now since we're using drag and drop
}

const availableElements = [
  { type: "Hello", icon: Type, label: "Text Component", description: "Simple text element" },
  { type: "Qna", icon: HelpCircle, label: "Q&A Component", description: "Questions and answers" },
  { type: "Banner", icon: Layout, label: "Hero Section", description: "Hero banner section" },
  { type: "Banners", icon: ImageIcon, label: "Multiple Banners", description: "Banner grid layout" },
  { type: "Grid", icon: Grid, label: "Content Grid", description: "Flexible content grid" },
  { type: "ContactForm", icon: Mail, label: "Contact Form", description: "Dynamic contact form" },
]

export default function ElementList({ onAddComponent }: ElementListProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-gray-700">Available Elements</h3>
      {availableElements.map((element) => (
        <DraggableElement key={element.type} element={element} />
      ))}
    </div>
  )
}

interface DraggableElementProps {
  element: {
    type: string
    icon: any
    label: string
    description: string
  }
}

function DraggableElement({ element }: DraggableElementProps) {
  const Icon = element.icon

  const [{ isDragging }, drag] = useDrag({
    type: "element",
    item: {
      type: "element",
      elementType: element.type,
      id: `new_${element.type}_${Date.now()}`,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`bg-white rounded-lg border border-gray-200 shadow-sm cursor-grab hover:shadow-md transition-shadow p-3 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-4 h-4 text-blue-600" />
        <span className="font-medium text-sm">{element.label}</span>
      </div>
      <p className="text-xs text-gray-600">{element.description}</p>
      <div className="mt-2 text-xs text-gray-500">Drag to add to layout</div>
    </div>
  )
}

