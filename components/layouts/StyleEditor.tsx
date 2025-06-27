"use client"
import { useState, useEffect } from "react"
import { getTemplateByName } from "./templates"
import type { ComponentData } from "./layout"

interface StyleEditorProps {
  component: ComponentData | null
  onUpdateStyle: (id: string, style: any) => void
}

export default function StyleEditor({ component, onUpdateStyle }: StyleEditorProps) {
  const [localStyle, setLocalStyle] = useState<any>({})

  useEffect(() => {
    if (component) {
      setLocalStyle(component.style || {})
    }
  }, [component])

  if (!component) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Select an element to edit styles</p>
      </div>
    )
  }

  const template = getTemplateByName(component.type)
  if (!template?.styleConfig) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No styles available for this component</p>
      </div>
    )
  }

  const handleStyleUpdate = (key: string, value: any) => {
    const newStyle = { ...localStyle, [key]: value }
    setLocalStyle(newStyle)
    onUpdateStyle(component.id, newStyle)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Styling: {component.type}</h3>
      </div>

      {template.styleConfig.map((config) => (
        <div key={config.value} className="space-y-1">
          {config.type === "text" && (
            <>
              <label className="block text-sm font-medium text-gray-700">{config.title}</label>
              <input
                type="text"
                value={localStyle[config.value] || config.default || ""}
                onChange={(e) => handleStyleUpdate(config.value, e.target.value)}
                placeholder={`Enter ${config.title.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </>
          )}

          {config.type === "number" && (
            <>
              <label className="block text-sm font-medium text-gray-700">{config.title}</label>
              <input
                type="number"
                value={localStyle[config.value] || config.default || 0}
                onChange={(e) => handleStyleUpdate(config.value, Number(e.target.value))}
                placeholder={`Enter ${config.title.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </>
          )}

          {config.type === "color" && (
            <>
              <label className="block text-sm font-medium text-gray-700">{config.title}</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={localStyle[config.value] || config.default || "#000000"}
                  onChange={(e) => handleStyleUpdate(config.value, e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={localStyle[config.value] || config.default || "#000000"}
                  onChange={(e) => handleStyleUpdate(config.value, e.target.value)}
                  placeholder="#000000"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {config.type === "url" && (
            <>
              <label className="block text-sm font-medium text-gray-700">{config.title}</label>
              <input
                type="url"
                value={localStyle[config.value] || config.default || ""}
                onChange={(e) => handleStyleUpdate(config.value, e.target.value)}
                placeholder={`Enter ${config.title.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}
