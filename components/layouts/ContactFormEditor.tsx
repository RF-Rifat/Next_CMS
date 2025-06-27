"use client"
import type React from "react"
import { useState, useRef } from "react"
import { type ContactFieldType, type ContactFormField, FORM_COLUMN_WIDTH_OPTIONS } from "./layout"
import { ChevronDown, ChevronUp, Copy, Trash2, GripVertical } from "lucide-react"

interface ContactFormEditorProps {
  component: any
  onUpdate: (content: any) => void
}

export default function ContactFormEditor({ component, onUpdate }: ContactFormEditorProps) {
  const content = component.content || {}
  const fields = content.fields || []
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([])

  const fieldTypes: ContactFieldType[] = [
    "text",
    "email",
    "textarea",
    "url",
    "tel",
    "radio",
    "select",
    "checkbox",
    "acceptance",
    "number",
    "date",
    "time",
    "upload",
    "password",
    "html",
    "hidden",
  ]

  const updateField = (index: number, field: Partial<ContactFormField>) => {
    const updatedFields = [...fields]
    updatedFields[index] = { ...updatedFields[index], ...field }
    onUpdate({ ...content, fields: updatedFields })
  }

  const addField = () => {
    const newField: ContactFormField = {
      id: `field_${Date.now()}`,
      type: "text",
      label: "New Field",
      placeholder: "Enter value",
      required: false,
      columnWidth: "100",
    }
    onUpdate({ ...content, fields: [...fields, newField] })
    // Open the accordion for the new field
    setTimeout(() => {
      setOpenAccordion(`field_${fields.length}`)
    }, 100)
  }

  const duplicateField = (index: number) => {
    const fieldToDuplicate = fields[index]
    const newField = {
      ...fieldToDuplicate,
      id: `field_${Date.now()}`,
    }
    const updatedFields = [...fields]
    updatedFields.splice(index + 1, 0, newField)
    onUpdate({ ...content, fields: updatedFields })
  }

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_: any, i: number) => i !== index)
    onUpdate({ ...content, fields: updatedFields })
    if (openAccordion === `field_${index}`) {
      setOpenAccordion(null)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem === null) return

    const draggedOverItem = fieldRefs.current[index]
    if (!draggedOverItem) return

    const rect = draggedOverItem.getBoundingClientRect()
    const y = e.clientY - rect.top
    const isInTopHalf = y < rect.height / 2

    // Apply visual indicator for drop position
    fieldRefs.current.forEach((ref, i) => {
      if (!ref) return
      ref.classList.remove("border-t-2", "border-b-2", "border-blue-500")

      if (i === index && isInTopHalf && i !== draggedItem) {
        ref.classList.add("border-t-2", "border-blue-500")
      } else if (i === index && !isInTopHalf && i !== draggedItem) {
        ref.classList.add("border-b-2", "border-blue-500")
      }
    })
  }

  const handleDragEnd = () => {
    // Remove all visual indicators
    fieldRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.remove("border-t-2", "border-b-2", "border-blue-500")
      }
    })
    setDraggedItem(null)
  }

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem === null) return

    const rect = fieldRefs.current[index]?.getBoundingClientRect()
    if (!rect) return

    const y = e.clientY - rect.top
    const isInTopHalf = y < rect.height / 2

    // Calculate the new position
    let newPosition = isInTopHalf ? index : index + 1
    if (draggedItem < index) {
      newPosition = isInTopHalf ? index - 1 : index
    }

    // Reorder the fields
    const updatedFields = [...fields]
    const [movedItem] = updatedFields.splice(draggedItem, 1)
    updatedFields.splice(newPosition, 0, movedItem)

    onUpdate({ ...content, fields: updatedFields })
    handleDragEnd()
  }

  const updateFormSettings = (key: string, value: any) => {
    onUpdate({ ...content, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Form Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-gray-700">Form Settings</h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Form ID</label>
          <input
            type="text"
            value={content.formId || ""}
            onChange={(e) => updateFormSettings("formId", e.target.value)}
            placeholder="contact-form"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500">Unique identifier for this form</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Form Title</label>
          <input
            type="text"
            value={content.title || ""}
            onChange={(e) => updateFormSettings("title", e.target.value)}
            placeholder="Contact Us"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Submit Button Text</label>
          <input
            type="text"
            value={content.submitButtonText || ""}
            onChange={(e) => updateFormSettings("submitButtonText", e.target.value)}
            placeholder="Send Message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Success Message</label>
          <textarea
            value={content.successMessage || ""}
            onChange={(e) => updateFormSettings("successMessage", e.target.value)}
            placeholder="Thank you! Your message has been sent successfully."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm text-gray-700">Form Fields</h3>
          <button
            onClick={addField}
            className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>

        <div className="space-y-2">
          {fields.map((field: ContactFormField, index: number) => (
            <div
              key={field.id || index}
              ref={(el) => { fieldRefs.current[index] = el }}
              className="bg-white border border-gray-200 rounded-md overflow-hidden"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* Field Header */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="cursor-move">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-medium text-sm">{field.label || `Field ${index + 1}`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === `field_${index}` ? null : `field_${index}`)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    {openAccordion === `field_${index}` ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  <button onClick={() => duplicateField(index)} className="p-1 text-gray-500 hover:text-gray-700">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeField(index)} className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Field Content */}
              {openAccordion === `field_${index}` && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(index, { type: e.target.value as ContactFieldType })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {fieldTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Label
                        <span className="text-pink-500 ml-1">*</span>
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => updateField(index, { label: e.target.value })}
                          placeholder="Field Label"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-200">
                          <span className="sr-only">Copy</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Placeholder
                        <span className="text-pink-500 ml-1">*</span>
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={field.placeholder || ""}
                          onChange={(e) => updateField(index, { placeholder: e.target.value })}
                          placeholder="Field Placeholder"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-200">
                          <span className="sr-only">Copy</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Required</label>
                      <div className="flex items-center">
                        <div
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${field.required ? "bg-blue-600" : "bg-gray-200"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${field.required ? "translate-x-6" : "translate-x-1"}`}
                          />
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={field.required}
                            onChange={(e) => updateField(index, { required: e.target.checked })}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700">{field.required ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Column Width</label>
                    <div className="flex items-center">
                      <select
                        value={field.columnWidth}
                        onChange={(e) => updateField(index, { columnWidth: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {FORM_COLUMN_WIDTH_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Options for radio, select, checkbox */}
                  {(field.type === "radio" || field.type === "select" || field.type === "checkbox") && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Options</label>
                      <textarea
                        value={field.options || ""}
                        onChange={(e) => updateField(index, { options: e.target.value })}
                        placeholder="Enter each option in a separate line. To differentiate between label and value, separate them with a pipe char (|). For example: First Name|f_name"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500">
                        Enter each option in a separate line. To differentiate between label and value, separate them
                        with a pipe char (|).
                        <br />
                        Example: First Name|f_name
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No fields added yet</p>
              <p className="text-sm text-gray-400 mt-1">Click "Add Item" to create your first field</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={addField}
            className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-gray-800 text-white hover:bg-gray-700"
          >
            + Add Item
          </button>
        </div>
      </div>
    </div>
  )
}
