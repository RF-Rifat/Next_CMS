"use client"
import { useState, useEffect, useMemo } from "react"
import * as LucideIcons from "lucide-react"

const allLucideIconNames = [
  "Home",
  "Search",
  "Settings",
  "User",
  "Heart",
  "Camera",
  "Bell",
  "Mail",
  "Calendar",
  "MapPin",
  "Cloud",
  "Download",
  "Upload",
  "Trash",
  "Edit",
  "Plus",
  "Minus",
  "Check",
  "X",
  "Info",
  "AlertTriangle",
  "Star",
  "Sun",
  "Moon",
  "Zap",
  "Link",
  "Share",
  "MessageSquare",
  "Phone",
  "Laptop",
  "Monitor",
  "Tablet",
  "Smartphone",
  "Gamepad",
  "Headphones",
  "Mic",
  "Speaker",
  "Wifi",
  "Bluetooth",
  "BatteryCharging",
  "BatteryFull",
  "BatteryLow",
  "CreditCard",
  "DollarSign",
  "Euro",
  "PoundSterling",
  "IndianRupee",
  "Bitcoin",
  "ShoppingCart",
  "Package",
  "Truck",
  "Plane",
  "Car",
  "Bike",
  "Walk",
  "Run",
  "Anchor",
  "Award",
  "BarChart",
  "Book",
  "Briefcase",
  "Brush",
  "Bug",
  "Building",
  "Calculator",
  "Clipboard",
  "Code",
  "Coffee",
  "Compass",
  "Crown",
  "Database",
  "Dribbble",
  "Droplet",
  "Feather",
  "Figma",
  "FileText",
  "Film",
  "Folder",
  "Framer",
  "Globe",
  "Grid",
  "HardDrive",
  "Hash",
  "HelpCircle",
  "Image",
  "Key",
  "Layers",
  "LifeBuoy",
  "Lightbulb",
  "Lock",
  "LogOut",
  "Map",
  "Maximize",
  "Menu",
  "Minimize",
  "MoreHorizontal",
  "MoreVertical",
  "MousePointer",
  "Move",
  "Music",
  "Navigation",
  "Octagon",
  "Paperclip",
  "Pause",
  "PenTool",
  "Percent",
  "PieChart",
  "Play",
  "Pocket",
  "Power",
  "Printer",
  "Puzzle",
  "QrCode",
  "Radio",
  "RefreshCw",
  "Repeat",
  "Rewind",
  "Rocket",
  "Save",
  "Scissors",
  "Send",
  "Server",
  "Share2",
  "Shield",
  "ShoppingBag",
  "Shuffle",
  "Sidebar",
  "SkipBack",
  "SkipForward",
  "Slack",
  "Sliders",
  "Square",
  "StopCircle",
  "Sunrise",
  "Sunset",
  "Table",
  "Tag",
  "Target",
  "Terminal",
  "ThumbsDown",
  "ThumbsUp",
  "ToggleLeft",
  "ToggleRight",
  "Tool",
  "TrendingDown",
  "TrendingUp",
  "Trello",
  "Tv",
  "Twitch",
  "Twitter",
  "Type",
  "Umbrella",
  "Unlock",
  "UploadCloud",
  "UserCheck",
  "UserMinus",
  "UserPlus",
  "UserX",
  "Users",
  "Verified",
  "Video",
  "Voicemail",
  "Volume",
  "Volume1",
  "Volume2",
  "VolumeX",
  "Wallet",
  "Watch",
  "Waves",
  "Webcam",
  "Webhook",
  "Weight",
  "WifiOff",
  "Wind",
  "WrapText",
  "Youtube",
  "ZapOff",
  "ZoomIn",
  "ZoomOut",
]

interface IconPickerProps {
  title?: string
  multiple?: boolean
  icons?: string[]
  onIconsChange?: (icons: string[]) => void
}

export default function Icons({
  title = "Select Icon",
  multiple = false,
  icons = [],
  onIconsChange = () => {},
}: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIcons, setSelectedIcons] = useState<string[]>(icons)
  const [tempSelectedIcons, setTempSelectedIcons] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setSelectedIcons(icons)
  }, [icons])

  const filteredIcons = useMemo(() => {
    if (!searchQuery) {
      return allLucideIconNames
    }
    const lowerCaseQuery = searchQuery.toLowerCase()
    return allLucideIconNames.filter((name) => name.toLowerCase().includes(lowerCaseQuery))
  }, [searchQuery])

  const handleOpenModal = () => {
    setTempSelectedIcons([...selectedIcons])
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setTempSelectedIcons([])
    setSearchQuery("")
  }

  const handleSelectIcon = (iconName: string) => {
    if (multiple) {
      setTempSelectedIcons((prev) =>
        prev.includes(iconName) ? prev.filter((name) => name !== iconName) : [...prev, iconName],
      )
    } else {
      setTempSelectedIcons(tempSelectedIcons.includes(iconName) ? [] : [iconName])
    }
  }

  const handleConfirmSelection = () => {
    setSelectedIcons(tempSelectedIcons)
    onIconsChange(tempSelectedIcons)
    handleCloseModal()
  }

  const handleRemoveSingleIcon = (index: number) => {
    const newIcons = selectedIcons.filter((_, i) => i !== index)
    setSelectedIcons(newIcons)
    onIconsChange(newIcons)
  }

  const renderIcon = (iconName: string, size = 24, strokeWidth = 2, p0: string) => {
    const LucideIconComponent = (LucideIcons as any)[iconName]
    if (!LucideIconComponent) {
      return null // Or a placeholder icon
    }
    return <LucideIconComponent size={size} strokeWidth={strokeWidth} />
  }

  const isIconSelected = (iconName: string) => {
    return tempSelectedIcons.includes(iconName)
  }

  return (
    <div className="w-full">
      {selectedIcons.length > 0 ? (
        <div>
          <div className="relative mb-2">
            {multiple ? (
              <div className="grid grid-cols-4 gap-2">
                {selectedIcons.map((iconName, index) => (
                  <div
                    key={index}
                    className="relative group flex flex-col items-center justify-center p-2 border border-gray-300 rounded"
                  >
                    <div className="w-12 h-12 flex items-center justify-center">{renderIcon(iconName, 32, 2, "")}</div>
                    <p className="text-xs text-center mt-1 truncate w-full">{iconName}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveSingleIcon(index)
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {renderIcon("X", 16, 2, "")}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded">
                <div className="w-24 h-24 flex items-center justify-center">{renderIcon(selectedIcons[0], 64, 2, "")}</div>
              </div>
            )}
            <p className="mt-2 text-sm text-gray-500">Click to edit or update</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              {multiple ? "Edit selected icons" : "Change icon"}
            </button>
            <button
              onClick={() => {
                setSelectedIcons([])
                onIconsChange([])
              }}
              className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              Remove {multiple ? "all icons" : "icon"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
        >
          {title}
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl h-[85vh] bg-white rounded-lg shadow-xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button onClick={handleCloseModal} className="p-1 text-gray-500 hover:text-gray-700">
                {renderIcon("X", 20, 2, "")}
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 rounded"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {renderIcon("Search", 16, 2, "")}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2">
                {filteredIcons.length > 0 ? (
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
                    {filteredIcons.map((iconName) => (
                      <div
                        key={iconName}
                        onClick={() => handleSelectIcon(iconName)}
                        className={`flex flex-col items-center justify-center p-2 border rounded cursor-pointer transition-all duration-200 ${
                          isIconSelected(iconName)
                            ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                        }`}
                      >
                        <div className="w-10 h-10 flex items-center justify-center">{renderIcon(iconName, 28, 2, "")}</div>
                        <p className="text-xs text-center mt-1 truncate w-full">{iconName}</p>
                        {isIconSelected(iconName) && (
                          <div className="absolute top-0 right-0 w-5 h-5 bg-blue-500 flex items-center justify-center rounded-bl-lg">
                            {renderIcon("Check", 14, 2, "text-white")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">No icons found for "{searchQuery}".</div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 mr-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSelection}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={tempSelectedIcons.length === 0}
              >
                {multiple ? "Select icons" : "Select icon"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}