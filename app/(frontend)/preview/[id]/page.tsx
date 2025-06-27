"use client"
import { useParams } from "next/navigation"
import Preview from "@/components/layouts/Preview"

export default function PreviewPage() {
  const params = useParams()
  const id = params.id as string

  if (!id) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Invalid layout ID</p>
      </div>
    )
  }

  return <Preview id={id} />
}
