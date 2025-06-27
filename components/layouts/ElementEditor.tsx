"use client"
import type { ComponentData } from "./layout"
import ContactFormEditor from "./ContactFormEditor"
interface ElementEditorProps {
  component: ComponentData | null
  onUpdate: (id: string, updates: Partial<ComponentData>) => void
}

export default function ElementEditor({ component, onUpdate }: ElementEditorProps) {
  if (!component) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Select an element to edit</p>
      </div>
    )
  }

  const handleContentUpdate = (newContent: any) => {
    onUpdate(component.id, { content: newContent })
  }

  const renderEditor = () => {
    switch (component.type) {
      case "Hello":
        return (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Text Content</label>
            <input
              type="text"
              value={component.content?.textme || ""}
              onChange={(e) => handleContentUpdate({ textme: e.target.value })}
              placeholder="Enter your text content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )

      case "Qna":
        return <QnaEditor component={component} onUpdate={handleContentUpdate} />

      case "Banner":
        return <BannerEditor component={component} onUpdate={handleContentUpdate} />

      case "Banners":
        return <BannersEditor component={component} onUpdate={handleContentUpdate} />

      case "Grid":
        return <GridEditor component={component} onUpdate={handleContentUpdate} />

      case "ContactForm":
        return <ContactFormEditor component={component} onUpdate={handleContentUpdate} />

      default:
        return <p>No editor available for this component type</p>
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Editing: {component.type}</h3>
      </div>
      {renderEditor()}
    </div>
  )
}

// Simplified editor components with native HTML
export function QnaEditor({ component, onUpdate }: { component: ComponentData; onUpdate: (content: any) => void }) {
  const content = Array.isArray(component.content) ? component.content : []

  const addQna = () => {
    const newContent = [...content, { questions: "", answers: "" }]
    onUpdate(newContent)
  }

  const updateQna = (index: number, field: string, value: string) => {
    const newContent = [...content]
    newContent[index] = { ...newContent[index], [field]: value }
    onUpdate(newContent)
  }

  const removeQna = (index: number) => {
    const newContent = content.filter((_, i) => i !== index)
    onUpdate(newContent)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">Questions & Answers</span>
        <button
          onClick={addQna}
          className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Q&A
        </button>
      </div>

      {content.map((item: any, index: number) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Q&A #{index + 1}</span>
              <button
                onClick={() => removeQna(index)}
                className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                Remove
              </button>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Question</label>
              <input
                type="text"
                value={item.questions || ""}
                onChange={(e) => updateQna(index, "questions", e.target.value)}
                placeholder="Enter question"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Answer</label>
              <textarea
                value={item.answers || ""}
                onChange={(e) => updateQna(index, "answers", e.target.value)}
                placeholder="Enter answer"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function BannerEditor({ component, onUpdate }: { component: ComponentData; onUpdate: (content: any) => void }) {
  const content = component.content || {}

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={content.image || ""}
          onChange={(e) => updateField("image", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Link URL</label>
        <input
          type="url"
          value={content.link || ""}
          onChange={(e) => updateField("link", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export function BannersEditor({ component, onUpdate }: { component: ComponentData; onUpdate: (content: any) => void }) {
  const content = Array.isArray(component.content) ? component.content : []

  const addBanner = () => {
    const newContent = [
      ...content,
      {
        image: "/placeholder.svg?height=300&width=400",
        title: "New Banner",
        subtitle: "New Subtitle",
        description: "New banner description",
        link: "#",
      },
    ]
    onUpdate(newContent)
  }

  const updateBanner = (index: number, field: string, value: string) => {
    const newContent = [...content]
    newContent[index] = { ...newContent[index], [field]: value }
    onUpdate(newContent)
  }

  const removeBanner = (index: number) => {
    const newContent = content.filter((_, i) => i !== index)
    onUpdate(newContent)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">Banner Boxes</span>
        <button
          onClick={addBanner}
          className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Banner
        </button>
      </div>

      {content.map((item: any, index: number) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Banner #{index + 1}</span>
              <button
                onClick={() => removeBanner(index)}
                className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                Remove
              </button>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={item.image || ""}
                onChange={(e) => updateBanner(index, "image", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => updateBanner(index, "title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={item.subtitle || ""}
                onChange={(e) => updateBanner(index, "subtitle", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={item.description || ""}
                onChange={(e) => updateBanner(index, "description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Link URL</label>
              <input
                type="url"
                value={item.link || ""}
                onChange={(e) => updateBanner(index, "link", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function GridEditor({ component, onUpdate }: { component: ComponentData; onUpdate: (content: any) => void }) {
  const content = component.content || {}

  const updateField = (field: string, value: any) => {
    onUpdate({ ...content, [field]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Columns</label>
        <select
          value={content.columns || 3}
          onChange={(e) => updateField("columns", Number.parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={1}>1 Column</option>
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>
    </div>
  )
}
