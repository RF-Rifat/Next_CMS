"use client"
import type React from "react"
import { useState } from "react"
import type { ContactFormField } from "./layout"

interface ContactFormTemplateProps {
  data: {
    formId: string
    title: string
    submitButtonText: string
    successMessage: string
    fields: ContactFormField[]
  }
  style?: {
    label_color?: string
    button_bg?: string
    button_text?: string
    spacing?: number
  }
}

export default function ContactFormTemplate({ data, style }: ContactFormTemplateProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errorMessage, setErrorMessage] = useState<string>("")

  const labelColor = style?.label_color || "#1f2937"
  const buttonBg = style?.button_bg || "#3b82f6"
  const buttonText = style?.button_text || "#ffffff"
  const spacing = style?.spacing || 16

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    try {
      // In a real implementation, this would send data to the server
      // const response = await fetch("/api/contact/submit", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     formId: data.formId,
      //     data: formData,
      //     url: window.location.href,
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // if (!response.ok) throw new Error("Failed to submit form")
      // const result = await response.json()

      setFormState("success")
    } catch (error) {
      console.error("Form submission error:", error)
      setFormState("error")
      setErrorMessage("Failed to submit form. Please try again later.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const parseOptions = (optionsString?: string) => {
    if (!optionsString) return []

    return optionsString.split("\n").map((line) => {
      const [label, value] = line.split("|")
      return { label: label.trim(), value: value?.trim() || label.trim() }
    })
  }

  const getColumnWidthClass = (width: string) => {
    const numWidth = Number.parseInt(width)
    if (numWidth <= 25) return "w-full md:w-1/4"
    if (numWidth <= 33) return "w-full md:w-1/3"
    if (numWidth <= 50) return "w-full md:w-1/2"
    if (numWidth <= 66) return "w-full md:w-2/3"
    if (numWidth <= 75) return "w-full md:w-3/4"
    return "w-full"
  }

  if (formState === "success") {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
          <p className="text-center font-medium">
            {data.successMessage || "Thank you! Your message has been sent successfully."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {data.title && (
        <h2 className="text-2xl font-bold mb-6" style={{ color: labelColor }}>
          {data.title}
        </h2>
      )}

      {formState === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-wrap" style={{ gap: `${spacing}px` }}>
        {data.fields?.map((field, index) => (
          <div key={field.id || index} className={getColumnWidthClass(field.columnWidth)}>
            <div className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium mb-1" style={{ color: labelColor }}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "email" && (
                <input
                  type="email"
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "tel" && (
                <input
                  type="tel"
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "url" && (
                <input
                  type="url"
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "date" && (
                <input
                  type="date"
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "time" && (
                <input
                  type="time"
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {field.type === "select" && (
                <select
                  id={field.id}
                  name={field.id}
                  required={field.required}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an option</option>
                  {parseOptions(field.options).map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "radio" && (
                <div className="space-y-2">
                  {parseOptions(field.options).map((option, i) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="radio"
                        id={`${field.id}_${i}`}
                        name={field.id}
                        value={option.value}
                        required={field.required}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`${field.id}_${i}`} className="ml-2 block text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === "checkbox" && (
                <div className="space-y-2">
                  {parseOptions(field.options).map((option, i) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${field.id}_${i}`}
                        name={`${field.id}_${i}`}
                        value={option.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`${field.id}_${i}`} className="ml-2 block text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === "acceptance" && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={field.id}
                    name={field.id}
                    required={field.required}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={field.id} className="ml-2 block text-sm text-gray-700">
                    {field.label}
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="w-full mt-4">
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{ backgroundColor: buttonBg, color: buttonText }}
          >
            {formState === "submitting" ? "Submitting..." : data.submitButtonText || "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}
