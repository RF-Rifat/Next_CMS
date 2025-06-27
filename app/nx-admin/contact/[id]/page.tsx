"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Globe, Monitor, MapPin, Mail, Phone, User, FileText } from "lucide-react"

interface ContactSubmission {
  _id: string
  formId: string
  submittedAt: string
  ip: string
  userAgent: string
  url: string
  fields: Record<string, any>
}

export default function ContactDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [contact, setContact] = useState<ContactSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchContact()
    }
  }, [params.id])

  const fetchContact = async () => {
    try {
      const response = await fetch(`/api/contact/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setContact(data.data)
      } else {
        setError(data.error || "Contact not found")
      }
    } catch (error) {
      console.error("Failed to fetch contact:", error)
      setError("Failed to fetch contact")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getFieldIcon = (key: string, value: any) => {
    const lowerKey = key.toLowerCase()

    if (lowerKey.includes("name")) return <User className="h-4 w-4" />
    if (lowerKey.includes("email")) return <Mail className="h-4 w-4" />
    if (lowerKey.includes("phone") || lowerKey.includes("tel")) return <Phone className="h-4 w-4" />
    if (lowerKey.includes("message") || lowerKey.includes("comment")) return <FileText className="h-4 w-4" />

    return <FileText className="h-4 w-4" />
  }

  const formatFieldValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No"
    }
    if (Array.isArray(value)) {
      return value.join(", ")
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2)
    }
    return String(value)
  }

  const deleteContact = async () => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return

    try {
      const response = await fetch(`/api/contact/${params.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/nx-admin/contact")
      } else {
        alert("Failed to delete contact")
      }
    } catch (error) {
      console.error("Failed to delete contact:", error)
      alert("Failed to delete contact")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (error || !contact) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-red-500">{error || "Contact not found"}</p>
          <Link
            href="/nx-admin/contact"
            className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contacts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/nx-admin/contact"
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contacts
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Contact Submission Details</h1>
            <p className="text-gray-600 mt-1">Form ID: {contact.formId}</p>
          </div>
        </div>
        <button
          onClick={deleteContact}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors bg-red-600 text-white hover:bg-red-700"
        >
          Delete Submission
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Fields */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Form Data</h2>
            </div>
            <div className="px-6 py-4">
              {Object.keys(contact.fields).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No form data available</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(contact.fields).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1 text-gray-400">{getFieldIcon(key, value)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900 capitalize">{key.replace(/[_-]/g, " ")}</h3>
                          <span className="text-xs text-gray-500">
                            {typeof value === "boolean" ? "Boolean" : Array.isArray(value) ? "Array" : typeof value}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          {key.toLowerCase().includes("message") || key.toLowerCase().includes("comment") ? (
                            <div className="whitespace-pre-wrap bg-white p-3 rounded border">
                              {formatFieldValue(value)}
                            </div>
                          ) : (
                            <span className="font-mono">{formatFieldValue(value)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Submission Info */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Submission Info</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Submitted At</p>
                  <p className="text-sm text-gray-600">{formatDate(contact.submittedAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Form ID</p>
                  <p className="text-sm text-gray-600 font-mono">{contact.formId}</p>
                </div>
              </div>

              {contact.url && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Source URL</p>
                    <a
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 break-all"
                    >
                      {contact.url}
                    </a>
                  </div>
                </div>
              )}

              {contact.ip && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">IP Address</p>
                    <p className="text-sm text-gray-600 font-mono">{contact.ip}</p>
                  </div>
                </div>
              )}

              {contact.userAgent && (
                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">User Agent</p>
                    <p className="text-xs text-gray-600 break-all">{contact.userAgent}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="px-6 py-4 space-y-3">
              {contact.fields.email && (
                <a
                  href={`mailto:${contact.fields.email}`}
                  className="block w-full px-4 py-2 text-sm font-medium text-center rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700"
                >
                  Reply via Email
                </a>
              )}

              {contact.fields.phone && (
                <a
                  href={`tel:${contact.fields.phone}`}
                  className="block w-full px-4 py-2 text-sm font-medium text-center rounded-md transition-colors bg-green-600 text-white hover:bg-green-700"
                >
                  Call Phone
                </a>
              )}

              <button
                onClick={() => {
                  const data = JSON.stringify(contact, null, 2)
                  const blob = new Blob([data], { type: "application/json" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `contact-${contact._id}.json`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="block w-full px-4 py-2 text-sm font-medium text-center rounded-md transition-colors bg-gray-600 text-white hover:bg-gray-700"
              >
                Export as JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
