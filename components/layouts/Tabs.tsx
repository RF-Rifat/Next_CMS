"use client"
import type React from "react"
import { useState, createContext, useContext } from "react"

interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

interface TabsProps {
  children: React.ReactNode
  defaultValue: string
  className?: string
  onTabChange?: (tab: string) => void
}

export default function Tabs({ children, defaultValue, className = "", onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex space-x-1 bg-gray-100 p-1 rounded-lg ${className}`}>{children}</div>
}

export function TabsTrigger({
  children,
  value,
  className = "",
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  return (
    <button
      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  children,
  value,
  className = "",
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div className={className}>{children}</div>
}
