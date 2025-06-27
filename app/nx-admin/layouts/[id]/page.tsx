"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import LayoutForm from "../form"
import type { Layout, LayoutMeta } from "@/components/layouts/layout"

export default function EditLayoutPage() {
  const params = useParams()
  const [layoutData, setLayoutData] = useState<{ layout: Layout; metas: LayoutMeta[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchLayout()
    }
  }, [params.id])

  const fetchLayout = async () => {
    try {
      console.log("Fetching layout with ID:", params.id)
      const response = await fetch(`/api/layout/${params.id}`)
      const data = await response.json()

      console.log("API Response:", data)

      if (data.success) {
        setLayoutData(data.data)
      } else {
        setError(data.error || "Failed to load layout")
      }
    } catch (error) {
      console.error("Failed to fetch layout:", error)
      setError("Failed to fetch layout")
    } finally {
      setLoading(false)
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

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <p className="text-sm text-gray-500 mt-2">Layout ID: {params.id}</p>
        </div>
      </div>
    )
  }

  if (!layoutData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-red-500">Layout not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Layout: {layoutData.layout.title}</h1>
      <LayoutForm initialData={layoutData} />
    </div>
  )
}
