"use client"
import { useState } from "react"
import Submit from "@/components/ui/Submit"
import Select from "@/components/ui/Select"
import Text from "@/components/ui/Text"
import Checkbox from "@/components/ui/Checkbox"
import Media from "@/components/ui/media"

export interface MenuItem {
  id: string
  title: string
  children?: MenuItem[]
  isExpanded?: boolean
}

export interface DragInfo {
  id: string
  parentId: string | null
  index: number
}

const initialMenuItems: MenuItem[] = [
  { id: "1", title: "Home" },
  {
    id: "2",
    title: "Collections",
    children: [
      { id: "2-1", title: "Spring" },
      { id: "2-2", title: "Summer" },
      { id: "2-3", title: "Fall" },
      { id: "2-4", title: "Winter" },
    ],
  },
  { id: "3", title: "About Us" },
  {
    id: "4",
    title: "My Account",
    children: [
      { id: "4-1", title: "Addresses" },
      { id: "4-2", title: "Order History" },
    ],
  },
]

interface PostOption {
  id: string
  title: string
}

const postOptions: PostOption[] = [
  { id: "1", title: "Post 1" },
  { id: "2", title: "Post 2" },
  { id: "3", title: "Post 3" },
  { id: "4", title: "Post 4" },
  { id: "5", title: "Post 5" },
  { id: "6", title: "Post 6" },
  { id: "7", title: "Post 7" },
  { id: "8", title: "Post 8" },
  { id: "9", title: "Post 9" },
  { id: "10", title: "Post 10" },
  { id: "11", title: "Post 11" },
  { id: "12", title: "Post 12" },
  { id: "13", title: "Post 13" },
  { id: "14", title: "Post 14" },
  { id: "15", title: "Post 15" },
  { id: "16", title: "Post 16" },
  { id: "17", title: "Post 17" },
  { id: "18", title: "Post 18" },
  { id: "19", title: "Post 19" },
  { id: "20", title: "Post 20" },
];

export function Menu() {
  const [featuredImage, setFeaturedImage] = useState<string[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => new Set())
  const [draggedItem, setDraggedItem] = useState<DragInfo | null>(null)
  const [dropTarget, setDropTarget] = useState<{ id: string; position: "before" | "after" | "inside" } | null>(null)
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set())
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const findMenuItem = (items: MenuItem[], id: string): [MenuItem | null, MenuItem[] | null, number] => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return [items[i], items, i]
      }
      if (items[i].children) {
        const [found, parent, index] = findMenuItem(items[i].children!, id)
        if (found) {
          return [found, parent, index]
        }
      }
    }
    return [null, null, -1]
  }

  const removeMenuItem = (items: MenuItem[], id: string): MenuItem[] => {
    return items.filter((item) => {
      if (item.id === id) {
        return false
      }
      if (item.children) {
        item.children = removeMenuItem(item.children, id)
      }
      return true
    })
  }

  const handleDragStart = (e: React.DragEvent, id: string, parentId: string | null, index: number) => {
    setDraggedItem({ id, parentId, index })
    e.dataTransfer.setData("text/plain", "") // Required for Firefox
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.id === id) return

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const y = e.clientY - rect.top
    const height = rect.height

    // Determine drop position based on mouse position
    if (y < height * 0.25) {
      setDropTarget({ id, position: "before" })
    } else if (y > height * 0.75) {
      setDropTarget({ id, position: "after" })
    } else {
      setDropTarget({ id, position: "inside" })
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (!draggedItem || !dropTarget) {
      setDraggedItem(null)
      setDropTarget(null)
      return
    }

    const [draggedNode] = findMenuItem(menuItems, draggedItem.id)
    if (!draggedNode) return

    let newItems = [...menuItems]

    // Remove the dragged item from its original position
    newItems = removeMenuItem(newItems, draggedItem.id)

    // Insert the dragged item in its new position
    const insertItem = (items: MenuItem[], targetId: string, position: "before" | "after" | "inside"): MenuItem[] => {
      return items.flatMap((item) => {
        if (item.id === targetId) {
          if (position === "before") {
            return [draggedNode, item]
          } else if (position === "after") {
            return [item, draggedNode]
          } else if (position === "inside") {
            return {
              ...item,
              children: [...(item.children || []), draggedNode],
            }
          }
        }
        if (item.children) {
          const newChildren = insertItem(item.children, targetId, position)
          if (newChildren !== item.children) {
            return { ...item, children: newChildren }
          }
        }
        return item
      })
    }

    newItems = insertItem(newItems, dropTarget.id, dropTarget.position)

    setMenuItems(newItems)
    setDraggedItem(null)
    setDropTarget(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDropTarget(null)
  }

  const renderMenuItem = (item: MenuItem, parentId: string | null = null, index = 0, level = 0) => {
    const isExpanded = !expandedItems.has(item.id)
    const isDropTarget = dropTarget?.id === item.id

    const indentStyle = level > 0
      ? { marginLeft: `${level * 2}em` }
      : {};

    return (
      <div key={item.id} className="w-full">
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item.id, parentId, index)}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          className={`
            relative flex items-center justify-between gap-2 p-2 border-2 bg-white cursor-move
            ${isDropTarget && dropTarget.position === "inside" ? "border-blue-500" : "border-gray-200"}
            ${draggedItem?.id === item.id ? "opacity-50" : ""}
          `}
          style={indentStyle}
        >
          {/* Drop indicators */}
          {isDropTarget && dropTarget.position === "before" && (
            <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500" />
          )}
          {isDropTarget && dropTarget.position === "after" && (
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500" />
          )}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 6v5h5V7.75L22.25 12L18 16.25V13h-5v5h3.25L12 22.25L7.75 18H11v-5H6v3.25L1.75 12L6 7.75V11h5V6H7.75L12 1.75L16.25 6z"/></svg>

            {item.children && item.children.length > 0 && (
              <button onClick={() => toggleExpand(item.id)} className="hover:bg-gray-100 rounded">
                {isExpanded ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
                  :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"/></svg>
                }
              </button>
            )}
            <span className="flex-1">{item.title}</span>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="M3.082 13.945c-.529-.95-.793-1.426-.793-1.945s.264-.994.793-1.944L4.43 7.63l1.426-2.381c.559-.933.838-1.4 1.287-1.66c.45-.259.993-.267 2.08-.285L12 3.26l2.775.044c1.088.018 1.631.026 2.08.286s.73.726 1.288 1.659L19.57 7.63l1.35 2.426c.528.95.792 1.425.792 1.944s-.264.994-.793 1.944L19.57 16.37l-1.426 2.381c-.559.933-.838 1.4-1.287 1.66c-.45.259-.993.267-2.08.285L12 20.74l-2.775-.044c-1.088-.018-1.631-.026-2.08-.286s-.73-.726-1.288-1.659L4.43 16.37z"/><circle cx="12" cy="12" r="3"/></g></svg>
          </button>

          {/* Popup Panel */}
          <div 
            className={`fixed top-0 right-0 bottom-0 h-full w-80 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="p-2 flex justify-between items-center border-b">
              <h2 className="text-base font-semibold">Popup Panel</h2>
              <button onClick={() => setIsOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="p-2">
              <Text
                defaultValue={item.title}
                title="Title"
                sub="Enter your title"
              />
              <Media
                  title="Set Featured image"
                  multiple={false}
                  images={featuredImage}
                  onImagesChange={setFeaturedImage}
              />
              <Select
                title="Style"
                items={['Style 1', 'Style 2', 'Style 3']}
              />
            </div>
          </div>
        </div>

        {item.children && item.children.length > 0 && isExpanded && (
          <div className="my-1 space-y-1">
            {item.children.map((child, idx) => renderMenuItem(child, item.id, idx, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const togglePostSelection = (id: string) => {
    setSelectedPosts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedPosts.size === postOptions.length) {
      setSelectedPosts(new Set())
    } else {
      setSelectedPosts(new Set(postOptions.map((post) => post.id)))
    }
  }

  const addSelectedPosts = () => {
    const newMenuItems = [...menuItems]
    selectedPosts.forEach((postId) => {
      const post = postOptions.find((p) => p.id === postId)
      if (post) {
        newMenuItems.push({
          id: `menu-${Date.now()}-${postId}`,
          title: post.title,
        })
      }
    })
    setMenuItems(newMenuItems)
    setSelectedPosts(new Set())
  }

  const addNewMenu = () => {
    const newId = `menu-${Date.now()}`
    setMenuItems((prev) => [...prev, { id: newId, title: "New Menu" }])
  }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/3">
          <div className="bg-white">
            <h3 className="text-base font-semibold p-2 border-b border-gray-200 leading-none">Post list</h3>
            <div className="p-2 max-h-60 overflow-y-auto">
              {postOptions.map((post) => (
                <label key={post.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPosts.has(post.id)}
                    onChange={() => togglePostSelection(post.id)}
                    className="form-checkbox"
                  />
                  <span className="leading-5">{post.title}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between p-2 border-t border-gray-200">
              <button
                onClick={toggleSelectAll}
                className="w-min p-2 border text-nowrap text-sm leading-none"
              >
                {selectedPosts.size === postOptions.length ? "Deselect All" : "Select All"}
              </button>
              <button
                onClick={addSelectedPosts}
                className="bg-blue-500 text-white w-min p-2.5 border text-nowrap text-sm leading-none"
              >
                Add
              </button>
            </div>
          </div>
          <button
            onClick={addNewMenu}
            className="p-2 my-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add Menu
          </button>
        </div>
        <div className="w-full md:w-2/3 space-y-1">
          <Text
            defaultValue=""
            title=""
            sub="Enter your title"
          />
          <span className="text-sm my-2 black">Drag the items into the order you prefer. Click the arrow on the right of the item to reveal additional configuration options.</span>
          {menuItems.map((item, index) => renderMenuItem(item, null, index))}
          <Checkbox
            title="Menu Settings"
            items={[
              { title: "Top Bar", checked: false},
              { title: "Main", checked: false},
              { title: "Footer", checked: false},
              { title: "Mobile (optional)", checked: false}
            ]}
          />
          <Submit
            defaultValue="Submit"
            title="Published"
            sub="Enter your title"
          />
        </div>
      </div>
    </>
  )
}

export default Menu;