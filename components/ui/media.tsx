"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface MediaProps {
  title?: string
  multiple?: boolean
  images?: string[]
  onImagesChange?: (images: string[]) => void
}

interface MediaItem {
  id: string
  url: string
  thumbnail?: string
  name: string
  date?: string
  size?: string
  dimensions?: string
  title: string
  caption?: string
  photographer?: string
  source?: string
  tags?: string[]
  category?: string
}

interface ApiResponse {
  images: MediaItem[]
  total: number
  page: number
  hasMore: boolean
  error?: string
}

export default function Media({
  title = "Featured image",
  multiple = false,
  images = [],
  onImagesChange = () => {},
}: MediaProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>(images)
  const [tempSelectedImages, setTempSelectedImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<
    "upload" | "library" | "flaticon" | "pexels" | "streamlinehq" | "unsplash" | "pixabay"
  >("upload")
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | null>(null)
  const [isAddingMore, setIsAddingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [apiImages, setApiImages] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      url: "/product/1.jpg",
      name: "rean.jpg",
      date: "April 19, 2025",
      size: "124 KB",
      dimensions: "725 by 516 pixels",
      title: "rean",
      caption: "la soluzione vicino",
    },
    {
      id: "2",
      url: "/product/2.jpg",
      name: "salaxy.jpg",
      date: "April 20, 2025",
      size: "256 KB",
      dimensions: "800 by 600 pixels",
      title: "Salaxy S25 Ultra",
      caption: "Mobile Price: In Bangladesh",
    },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelectedImages(images)
  }, [images])

  const handleOpenModal = (addMore = false) => {
    setIsAddingMore(addMore)
    setTempSelectedImages(addMore ? [...selectedImages] : [])
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setIsAddingMore(false)
    setTempSelectedImages([])
    setSearchQuery("")
    setApiImages([])
    setCurrentPage(1)
    setError(null)
  }

  const handleSelectImage = (url: string) => {
    if (multiple) {
      if (isAddingMore) {
        const newTempSelectedImages = tempSelectedImages.includes(url)
          ? tempSelectedImages.filter((img) => img !== url)
          : [...tempSelectedImages, url]
        setTempSelectedImages(newTempSelectedImages)
      } else {
        const newSelectedImages = selectedImages.includes(url)
          ? selectedImages.filter((img) => img !== url)
          : [...selectedImages, url]
        setSelectedImages(newSelectedImages)
      }
    } else {
      setSelectedImages(selectedImages.length > 0 && selectedImages[0] === url ? [] : [url])
    }
  }

  const handleSetFeaturedImage = () => {
    if (isAddingMore && multiple) {
      const combinedImages = [...new Set([...selectedImages, ...tempSelectedImages])]
      setSelectedImages(combinedImages)
      onImagesChange(combinedImages)
    } else {
      onImagesChange(multiple ? selectedImages : selectedImages)
    }
    handleCloseModal()
  }

  const handleRemoveFeaturedImage = () => {
    setSelectedImages([])
    onImagesChange([])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log("Files dropped:", e.dataTransfer.files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Files selected:", e.target.files)
  }

  const handleSelectMediaItem = (item: MediaItem) => {
    setSelectedMediaItem(item)
    handleSelectImage(item.url)
  }

  const handleRemoveSingleImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    setSelectedImages(newImages)
    onImagesChange(newImages)
  }

  const searchApiImages = async (apiName: string, query: string, page = 1) => {
    if (!query.trim()) {
      setError("Please enter a search query")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/media/${apiName}?q=${encodeURIComponent(query)}&page=${page}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      if (data.error) {
        setError(data.error)
        if (page === 1) {
          setApiImages([])
        }
        return
      }

      if (page === 1) {
        setApiImages(data.images || [])
      } else {
        setApiImages((prev) => [...prev, ...(data.images || [])])
      }

      setHasMore(data.hasMore || false)
      setCurrentPage(page)
    } catch (error) {
      console.error("Error fetching images:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch images"
      setError(errorMessage)

      if (page === 1) {
        setApiImages([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab !== "upload" && activeTab !== "library") {
      searchApiImages(activeTab, searchQuery, 1)
    }
  }

  const loadMoreImages = () => {
    if (activeTab !== "upload" && activeTab !== "library" && hasMore && !isLoading) {
      searchApiImages(activeTab, searchQuery, currentPage + 1)
    }
  }

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab)
    setApiImages([])
    setSearchQuery("")
    setCurrentPage(1)
    setSelectedMediaItem(null)
    setError(null)
  }

  const isImageSelected = (url: string) => {
    if (isAddingMore && multiple) {
      return tempSelectedImages.includes(url)
    }
    return selectedImages.includes(url)
  }

  const getCurrentImages = () => {
    if (activeTab === "library") {
      return mediaItems
    } else if (activeTab === "upload") {
      return []
    } else {
      return apiImages
    }
  }

  return (
    <div className="w-full">
      {selectedImages.length > 0 ? (
        <div>
          <div className="relative mb-2">
            {multiple ? (
              <div className="grid grid-cols-2 gap-2">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt="Selected image"
                      width={150}
                      height={150}
                      className="border border-gray-300 rounded"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveSingleImage(index)
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
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
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <Image
                src={selectedImages[0] || "/placeholder.svg"}
                alt="Featured image"
                width={300}
                height={200}
                className="border border-gray-300 rounded"
              />
            )}
            <p className="mt-2 text-sm text-gray-500">Click the image to edit or update</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {multiple && (
              <button
                onClick={() => handleOpenModal(true)}
                className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                Add more images
              </button>
            )}
            <button
              onClick={handleRemoveFeaturedImage}
              className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              Remove {multiple ? "all gallery images" : "featured image"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => handleOpenModal(false)}
          className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
        >
          {title}
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-6xl h-[85vh] bg-white rounded-lg shadow-xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">{isAddingMore ? "Add More Images" : title}</h2>
              <button onClick={handleCloseModal} className="p-1 text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b overflow-x-auto">
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === "upload" ? "bg-white border-b-2 border-blue-600" : "bg-gray-100"}`}
                onClick={() => handleTabChange("upload")}
              >
                Upload files
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === "library" ? "bg-white border-b-2 border-blue-600" : "bg-gray-100"}`}
                onClick={() => handleTabChange("library")}
              >
                Media Library
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === "flaticon" ? "bg-white border-b-2 border-blue-600" : "bg-gray-100"}`}
                onClick={() => handleTabChange("flaticon")}
              >
                Flaticon
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === "pexels" ? "bg-white border-b-2 border-blue-600" : "bg-gray-100"}`}
                onClick={() => handleTabChange("pexels")}
              >
                Pexels
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === "streamlinehq" ? "bg-white border-b-2 border-blue-600" : "bg-gray-100"}`}
                onClick={() => handleTabChange("streamlinehq")}
              >
                StreamlineHQ
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === "unsplash" ? "bg-white border-b-2 border-blue-600" : "bg-gray-100"}`}
                onClick={() => handleTabChange("unsplash")}
              >
                Unsplash
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === "pixabay" ? "bg-white border-b-2 border-blue-600" : "bg-gray-100"}`}
                onClick={() => handleTabChange("pixabay")}
              >
                Pixabay
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto">
              {activeTab === "upload" && (
                <div
                  className="flex flex-col items-center justify-center h-full p-8"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <p className="mb-2 text-lg font-medium">Drop files to upload</p>
                  <p className="mb-4 text-sm text-gray-500">or</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                  >
                    Select Files
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple={multiple}
                    onChange={handleFileSelect}
                  />
                  <p className="mt-8 text-sm text-gray-500">Maximum upload file size: 256 MB.</p>
                </div>
              )}

              {(activeTab === "library" ||
                activeTab === "flaticon" ||
                activeTab === "pexels" ||
                activeTab === "streamlinehq" ||
                activeTab === "unsplash" ||
                activeTab === "pixabay") && (
                <div className="flex h-full">
                  {/* Left side - Media Grid */}
                  <div className="flex-1 p-4 overflow-auto">
                    {/* Search and Filters */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        {activeTab === "library" ? (
                          <div className="flex space-x-2">
                            <div className="relative">
                              <select className="px-3 py-2 pr-8 text-sm border border-gray-300 rounded appearance-none">
                                <option>Images</option>
                                <option>All media items</option>
                              </select>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute w-4 h-4 right-2 top-2.5 pointer-events-none text-gray-500"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </div>
                            <div className="relative">
                              <select className="px-3 py-2 pr-8 text-sm border border-gray-300 rounded appearance-none">
                                <option>All dates</option>
                                <option>April 2025</option>
                              </select>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute w-4 h-4 right-2 top-2.5 pointer-events-none text-gray-500"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <form onSubmit={handleSearch} className="flex space-x-2">
                              <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded"
                              />
                              <button
                                type="submit"
                                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                                disabled={isLoading}
                              >
                                {isLoading ? "Searching..." : "Search"}
                              </button>
                            </form>
                          </div>
                        )}

                        {activeTab === "library" && (
                          <div>
                            <input
                              type="text"
                              placeholder="Search media"
                              className="px-3 py-2 text-sm border border-gray-300 rounded"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
                    )}

                    {/* Images Grid */}
                    <div className="grid grid-cols-5 gap-4">
                      {getCurrentImages().map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectMediaItem(item)}
                          className={`relative cursor-pointer border rounded overflow-hidden ${
                            isImageSelected(item.url) ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"
                          }`}
                        >
                          <div className="relative h-24">
                            <Image
                              src={item.thumbnail || item.url || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                            {isImageSelected(item.url) && (
                              <div className="absolute top-0 left-0 w-6 h-6 bg-blue-500 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          {item.source && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                              {item.source}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* No Results Message */}
                    {activeTab !== "library" && apiImages.length === 0 && !isLoading && !error && searchQuery && (
                      <div className="text-center py-8 text-gray-500">
                        No images found for "{searchQuery}". Try a different search term.
                      </div>
                    )}

                    {/* Load More Button */}
                    {hasMore && activeTab !== "library" && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={loadMoreImages}
                          disabled={isLoading}
                          className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 disabled:opacity-50"
                        >
                          {isLoading ? "Loading..." : "Load More"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right side - Media Details */}
                  {selectedMediaItem && (
                    <div className="w-1/3 p-4 border-l border-gray-300 overflow-auto">
                      <h3 className="mb-4 text-lg font-medium">ATTACHMENT DETAILS</h3>

                      <div className="mb-4">
                        <div className="relative h-40 mb-2">
                          <Image
                            src={selectedMediaItem.url || "/placeholder.svg"}
                            alt={selectedMediaItem.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm">{selectedMediaItem.name}</p>
                        {selectedMediaItem.date && <p className="text-sm">{selectedMediaItem.date}</p>}
                        {selectedMediaItem.size && <p className="text-sm">{selectedMediaItem.size}</p>}
                        {selectedMediaItem.dimensions && <p className="text-sm">{selectedMediaItem.dimensions}</p>}
                        {selectedMediaItem.photographer && (
                          <p className="text-sm">By: {selectedMediaItem.photographer}</p>
                        )}
                        {selectedMediaItem.source && <p className="text-sm">Source: {selectedMediaItem.source}</p>}
                      </div>

                      {activeTab === "library" && (
                        <>
                          <div className="mb-4">
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                              Edit Image
                            </a>
                            <a href="#" className="ml-4 text-sm text-red-600 hover:text-red-800">
                              Delete permanently
                            </a>
                          </div>

                          <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Alt Text</label>
                            <textarea
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              rows={3}
                            ></textarea>
                          </div>

                          <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Title</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              defaultValue={selectedMediaItem.title}
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Caption</label>
                            <textarea
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              rows={3}
                              defaultValue={selectedMediaItem.caption}
                            ></textarea>
                          </div>

                          <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Description</label>
                            <textarea
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                              rows={3}
                            ></textarea>
                          </div>
                        </>
                      )}

                      <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">File URL:</label>
                        <div className="flex">
                          <input
                            type="text"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l"
                            value={selectedMediaItem.url}
                            readOnly
                          />
                          <button className="px-3 py-2 text-sm text-white bg-gray-500 rounded-r hover:bg-gray-600">
                            Copy URL to clipboard
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                onClick={handleSetFeaturedImage}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                disabled={
                  isAddingMore
                    ? tempSelectedImages.length === 0
                    : multiple
                      ? selectedImages.length === 0
                      : selectedImages.length === 0
                }
              >
                {isAddingMore ? "Add selected images" : multiple ? "Set gallery images" : "Get featured image"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
