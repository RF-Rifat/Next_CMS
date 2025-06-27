"use client"
import { useState } from "react"
import Image from "next/image"

interface Category {
  id: number
  name: string
  slug: string
  description: string
  parent: string
  count: number
  image?: string
}

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "All electronic items",
    parent: "-",
    count: 150,
    image: "/user/1.jpg",
  },
  {
    id: 2,
    name: "— Laptops",
    slug: "laptops",
    description: "Laptop computers",
    parent: "Electronics",
    count: 45,
    image: "/user/2.jpg",
  },
  {
    id: 3,
    name: "— Smartphones",
    slug: "smartphones",
    description: "Mobile phones",
    parent: "Electronics",
    count: 85,
    image: "/user/3.jpg",
  },
  {
    id: 4,
    name: "Clothing",
    slug: "clothing",
    description: "Fashion items",
    parent: "-",
    count: 200,
    image: "/user/4.jpg",
  },
  {
    id: 5,
    name: "— Men\'\s Wear",
    slug: "mens-wear",
    description: "Clothing for men",
    parent: "Clothing",
    count: 95,
    image: "/user/5.jpg",
  },
  {
    id: 6,
    name: "Books",
    slug: "books",
    description: "Books and publications",
    parent: "-",
    count: 120,
    image: "/user/1.jpg",
  },
]

export default function CategoriesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>(categories)
  const itemsPerPage = 5

  const filteredCategories = allCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage)

  const toggleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(filteredCategories.map((cat) => cat.id))
    }
  }

  const toggleCategory = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((catId) => catId !== id))
    } else {
      setSelectedCategories([...selectedCategories, id])
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1
    handlePageChange(value)
  }

  const handleDelete = () => {
    const updatedCategories = allCategories.filter((cat) => !selectedCategories.includes(cat.id))
    setAllCategories(updatedCategories)
    setSelectedCategories([])
  }

  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-4 p-2">
        <div className="relative flex items-center border w-full">
          <span className="">🔍</span>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 outline-0"
          />
        </div>
        {selectedCategories.length > 0 && (
          <button onClick={handleDelete} className="p-2 text-nowrap bg-red-500 text-white rounded hover:bg-red-600">
            🗑️ Delete ({selectedCategories.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto text-sx">
        <table className="w-full">
          <thead>
            <tr className="border-y">
              <th className="w-10 p-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === filteredCategories.length}
                  onChange={toggleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Slug</th>
              <th className="p-2 text-left">Parent</th>
              <th className="p-2 text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category) => (
              <tr key={category.id} className="border-b group">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="border-gray-200 flex mx-auto"
                  />
                </td>
                <td className="p-2">
                  <Image
                    src={category.image || "/placeholder.svg?height=40&width=40"}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </td>
                <td className="p-2 text-nowrap">
                  {category.name}
                  <div className="text-xs flex items-center space-x-1 md:hidden md:group-hover:block">
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>View</button>
                  </div>
                </td>
                <td className="p-2">{category.description}</td>
                <td className="p-2">{category.slug}</td>
                <td className="p-2">{category.parent}</td>
                <td className="p-2 text-right">{category.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-2">
        <div className="text-sm text-gray-600">
          {startIndex + 1} To {Math.min(startIndex + itemsPerPage, filteredCategories.length)} Showing, Total{" "}
          {filteredCategories.length} Categorie
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ⏮️
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ◀️
          </button>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={handlePageInputChange}
              className="w-16 text-center border outline-0 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-600">/ {totalPages}</span>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ▶️
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ⏭️
          </button>
        </div>
      </div>
    </div>
  )
}