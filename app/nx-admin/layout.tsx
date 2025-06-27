"use client"
import type React from "react"
import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <AdminHeader />
          {children}
        <AdminFooter />
      </DndProvider>
    </main>
  )
}