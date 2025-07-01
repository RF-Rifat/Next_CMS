"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import type { Layout } from "@/components/layouts/layout"

export default function LayoutsPage() {
  const [layouts, setLayouts] = useState<Layout[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLayouts()
  }, [])

  const fetchLayouts = async () => {
    try {
      const response = await fetch("/api/layout")
      const data = await response.json()
      if (data.success) {
        setLayouts(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch layouts:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteLayout = async (id: string) => {
    if (!confirm("Are you sure you want to delete this layout?")) return

    try {
      const response = await fetch(`/api/layout/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setLayouts(layouts.filter((layout) => layout._id?.toString() !== id))
      }
    } catch (error) {
      console.error("Failed to delete layout:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[status as keyof typeof variants] || variants.archived}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Layout Manager</h1>
        <Link
          href="/nx-admin/layouts/add"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create New Layout
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layouts.map((layout) => (
          <div
            key={layout._id?.toString()}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{layout.title}</h3>
                {getStatusBadge(layout.status)}
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="text-sm text-gray-600 mb-4">
                <p>Created: {new Date(layout.created_at).toLocaleDateString()}</p>
                <p>Updated: {new Date(layout.updated_at).toLocaleDateString()}</p>
              </div>

              <div className="flex gap-2">
                <Link href={`/nx-admin/layouts/${layout._id}`}>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300">
                    Edit
                  </button>
                </Link>

                <Link href={`/preview/${layout._id}`}>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300">
                    Preview
                  </button>
                </Link>

                <button
                  onClick={() => deleteLayout(layout._id?.toString() || "")}
                  className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {layouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No layouts found</p>
          <Link href="/nx-admin/layouts/add">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Create Your First Layout
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
