"use client";
import React, { useState, ReactNode, ReactElement } from "react";
import Link from "next/link";

interface TableProps {
  name: string;
  link: string;
  children: ReactNode[];
}

const Table: React.FC<TableProps> = ({ name, link, children }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // প্রতি পেজে ১০টি পোস্ট দেখাবে

  // Convert children to array (যদি children একক node হয়)
  const childrenArray = React.Children.toArray(children);

  // ফিল্টার করা পোস্টগুলো দেখানো হবে (এখানে পুরো ডাটার উপর সার্চ হবে)
  const filteredChildren = childrenArray.filter((child) => {
    if (React.isValidElement(child)) {
      const element = child as ReactElement<{ children: string | ReactNode }>; // Type Assertion
      if (typeof element.props.children === "string") {
        return element.props.children.toLowerCase().includes(search.toLowerCase());
      }
    }
    return true;
  });

  // পেজ অনুযায়ী ডাটা দেখানো হবে
  const paginatedChildren = filteredChildren.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Pagination Functions
  const nextPage = () => {
    if (page < Math.ceil(filteredChildren.length / itemsPerPage)) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 outline-0 bg-white border"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {link && (
            <Link href={link} className="px-4 py-2 bg-blue-500 text-white">
              Add
            </Link>
            )}
          </div>
        </div>

        {/* Filtered Content */}
        <div className="w-full block divide-y divide-gray-200 bg-white">
          {paginatedChildren.length > 0 ? paginatedChildren : <p className="p-2">No results found</p>}
        </div>

        {/* Pagination */}
        {filteredChildren.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded-md ${page >= totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;