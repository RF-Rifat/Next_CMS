"use client"
import type React from "react"
import { useState, useEffect } from "react"
import type { ContactFormField } from "./layout"

interface PreviewProps {
  id: string
}

// Update the TemplateRenderer function to pass style
function TemplateRenderer({ template, content, style }: { template: string; content: any; style?: any }) {
  switch (template) {
    case "Hello":
      return <HelloTemplate data={content} style={style} />

    case "Qna":
      return <QnaTemplate data={content} style={style} />

    case "Banner":
      return <BannerTemplate data={content} style={style} />

    case "Banners":
      return <BannersTemplate data={content} style={style} />

    case "Grid":
      return <GridTemplate data={content} style={style} />

    case "ContactForm":
      return <ContactFormTemplate data={content} style={style} />

    default:
      return (
        <div className="p-4 bg-red-100 border border-red-300 rounded">
          <p className="text-red-700">Unknown template: {template}</p>
          <pre className="text-xs mt-2">{JSON.stringify(content, null, 2)}</pre>
        </div>
      )
  }
}

// Contact Form Template Component
function ContactFormTemplate({
  data,
  style,
}: {
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
}) {
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
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: data.formId,
          data: formData,
          url: window.location.href,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit form")
      const result = await response.json()

      if (result.success) {
        setFormState("success")
      } else {
        throw new Error(result.error || "Failed to submit form")
      }
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
      <div className="py-8">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
            <p className="text-center font-medium">
              {data.successMessage || "Thank you! Your message has been sent successfully."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
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

                {field.type === "password" && (
                  <input
                    type="password"
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {field.type === "upload" && (
                  <input
                    type="file"
                    id={field.id}
                    name={field.id}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {field.type === "hidden" && (
                  <input type="hidden" id={field.id} name={field.id} value={field.placeholder || ""} />
                )}

                {field.type === "html" && (
                  <div
                    className="p-3 bg-gray-50 border border-gray-300 rounded-md"
                    dangerouslySetInnerHTML={{ __html: field.placeholder || "" }}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="w-full mt-4">
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              style={{ backgroundColor: buttonBg, color: buttonText }}
            >
              {formState === "submitting" ? "Submitting..." : data.submitButtonText || "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Section Renderer for responsive layouts with proper column ratios
function SectionRenderer({ section }: { section: any }) {
  const columnsInRow = section.columnsInRow || section.columns.length
  const columnRatio = section.columnRatio || section.columns.map(() => `${100 / columnsInRow}%`)

  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row gap-4">
        {section.columns.map((column: any, index: number) => {
          // Calculate column width based on ratio
          const widthPercentage = columnRatio[index] || `${100 / columnsInRow}%`

          return (
            <div
              key={column.id || index}
              className={`${column.width || "w-full"} ${column.mobileWidth || "w-full"}`}
              style={{
                backgroundColor: column.style?.backgroundColor,
                width: `${widthPercentage}`, // Use exact percentage from database
                flexBasis: widthPercentage,
                flexGrow: 0,
                flexShrink: 0,
              }}
            >
              {column.components.map((component: any, compIndex: number) => (
                <div key={component.id || compIndex} className="mb-4">
                  <TemplateRenderer template={component.type} content={component.content} style={component.style} />
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Debug info - remove in production */}
      <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
        <strong>Section Info:</strong> {columnsInRow} columns | Ratios: {columnRatio.join(", ")}
      </div>
    </div>
  )
}

// Update the HelloTemplate function
function HelloTemplate({ data, style }: { data: any; style?: any }) {
  const textAlign = style?.text_align || "left"
  const textColor = style?.text_color || "#000000"
  const bgColor = style?.bg_color || "#ffffff"
  const fontSize = style?.font_size || 24
  const padding = style?.padding || 16

  return (
    <div
      className="py-8"
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
        {data?.textme || "Hello World"}
      </h1>
    </div>
  )
}

// Update the QnaTemplate function
function QnaTemplate({ data, style }: { data: any[]; style?: any }) {
  if (!Array.isArray(data)) return null

  const questionColor = style?.question_color || "#1f2937"
  const answerColor = style?.answer_color || "#6b7280"
  const borderColor = style?.border_color || "#3b82f6"
  const spacing = style?.spacing || 16

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto" style={{ gap: `${spacing}px` }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
            style={{ borderLeft: `4px solid ${borderColor}` }}
          >
            <h2 className="text-xl font-semibold mb-3" style={{ color: questionColor }}>
              {item.questions}
            </h2>
            <p className="leading-relaxed" style={{ color: answerColor }}>
              {item.answers}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Update the BannerTemplate function
function BannerTemplate({ data, style }: { data: any; style?: any }) {
  const overlayColor = style?.overlay_color || "#000000"
  const overlayOpacity = style?.overlay_opacity || 50
  const titleColor = style?.title_color || "#ffffff"
  const bannerHeight = style?.banner_height || 400

  return (
    <div className="py-8">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: `${bannerHeight}px` }}>
        <img
          src={data?.image || "/placeholder.svg?height=400&width=800"}
          alt={data?.title || "Banner"}
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
          <div className="text-center p-8 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4" style={{ color: titleColor }}>
              {data?.title || "Welcome to Our Platform"}
            </h1>
            <p className="text-xl mb-6" style={{ color: titleColor }}>
              {data?.description || "This is a sample banner description"}
            </p>
            {data?.link && (
              <a
                href={data.link}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the BannersTemplate function
function BannersTemplate({ data, style }: { data: any[]; style?: any }) {
  if (!Array.isArray(data)) return null

  // ...existing code...
  const gridColumns: 1 | 2 | 3 | 4 = style?.grid_columns as 1 | 2 | 3 | 4 || 2
  const gapSize = style?.gap_size || 24
  const cardBg = style?.card_bg || "#ffffff"
  const borderRadius = style?.border_radius || 8

  const gridClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[gridColumns] || "grid-cols-1 md:grid-cols-2"


  return (
    <div className="py-8">
      <div className={`grid ${gridClass}`} style={{ gap: `${gapSize}px` }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="shadow-md overflow-hidden"
            style={{
              backgroundColor: cardBg,
              borderRadius: `${borderRadius}px`,
            }}
          >
            <img
              src={item.image || "/placeholder.svg?height=200&width=300"}
              alt={item.title || `Banner ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.title || `Banner ${index + 1}`}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.subtitle || `Subtitle ${index + 1}`}</p>
              <p className="text-gray-700 mb-3">{item.description || `Description ${index + 1}`}</p>
              <a
                href={item.link || "#"}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
              >
                Learn More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Update the GridTemplate function
function GridTemplate({ data, style }: { data: any; style?: any }) {
  const [layouts, setLayouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const gridColumns = style?.grid_columns || data?.columns || 3
  const titleColor = style?.title_color || "#1f2937"
  const cardBg = style?.card_bg || "#ffffff"
  const gapSize = style?.gap_size || 24

  useEffect(() => {
    async function fetchLayouts() {
      try {
        const response = await fetch("/api/layouts")
        const result = await response.json()

        if (result.success) {
          setLayouts(result.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch layouts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLayouts()
  }, [])

  const colClassMap: Record<1 | 2 | 3 | 4, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }
  const gridColKey: 1 | 2 | 3 | 4 = [1, 2, 3, 4].includes(Number(gridColumns))
    ? (Number(gridColumns) as 1 | 2 | 3 | 4)
    : 2
  const colClass = colClassMap[gridColKey]

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: titleColor }}>
          {data?.title || "Our Layouts"}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {data?.description || "Browse through our collection of layouts"}
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (layouts.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: titleColor }}>
          {data?.title || "Our Layouts"}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {data?.description || "Browse through our collection of layouts"}
        </p>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No layouts found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-2" style={{ color: titleColor }}>
        {data?.title || "Our Layouts"}
      </h2>
      <p className="text-gray-600 text-center mb-6">
        {data?.description || "Browse through our collection of layouts"}
      </p>

      <div className={`grid ${colClass}`} style={{ gap: `${gapSize}px` }}>
        {layouts.map((layout) => (
          <div
            key={layout._id}
            className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            style={{ backgroundColor: cardBg }}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{layout.title}</h3>
                {data?.showStatus && getStatusBadge(layout.status)}
              </div>

              {data?.showDate && (
                <div className="text-sm text-gray-500 mb-4">
                  <p>Created: {new Date(layout.created_at).toLocaleDateString()}</p>
                </div>
              )}

              {data?.linkToPreview && (
                <a
                  href={`/preview/${layout._id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Layout →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "published":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Published
        </span>
      )
    case "draft":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Draft
        </span>
      )
    case "archived":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Archived
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {status}
        </span>
      )
  }
}

// Update the main Preview component to handle sections with column structure from database
export default function Preview({ id }: PreviewProps) {
  const [layoutData, setLayoutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchLayoutData()
    }
  }, [id])

  const fetchLayoutData = async () => {
    try {
      console.log("Fetching preview data for ID:", id)
      const response = await fetch(`/api/layout/${id}`)
      const data = await response.json()

      console.log("Preview API Response:", data)

      if (data.success) {
        setLayoutData(data.data)
      } else {
        setError(data.error || "Layout not found")
      }
    } catch (error) {
      console.error("Failed to fetch layout:", error)
      setError("Failed to load layout")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!layoutData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content available</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {layoutData.layout?.title && (
        <div className="bg-white shadow-sm border-b mb-8">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">{layoutData.layout.title}</h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Render sections from database with proper column structure */}
        {layoutData.sections && layoutData.sections.length > 0 ? (
          layoutData.sections.map((section: any, index: number) => (
            <SectionRenderer key={section.id || index} section={section} />
          ))
        ) : (
          /* Fallback to old format */
          <div className="space-y-8">
            {layoutData.metas?.map((meta: any, index: number) => (
              <TemplateRenderer
                key={`${meta.template}_${index}`}
                template={meta.template}
                content={meta.content}
                style={meta.style}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
