"use client"

import { useState, useEffect, useRef } from "react"
import { SlidersHorizontal } from "lucide-react"
import axios from "axios"

export default function FilterBar({
    totalResults,
    firstItemIndex,
    lastItemIndex,
    itemsPerPage,
    setItemsPerPage,
    sortOption,
    setSortOption,
    selectedCategories,
    setSelectedCategories
}) {
    const [categories, setCategories] = useState([])
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories`)
                setCategories(res.data)
            } catch (error) {
                console.error("Failed to fetch categories", error)
            }
        }
        fetchCategories()
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCategoryDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function toggleCategory(categoryId) {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
        } else {
            setSelectedCategories([...selectedCategories, categoryId])
        }
    }

    return (
        <div className="w-full bg-[#F9F1E7] py-4 md:py-6 px-4 md:px-20 mt-0 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 z-10 relative">

            {/* Left Side: Filter & Results Text */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 md:gap-6 w-full md:w-auto">

                {/* Filter Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className="flex items-center gap-2 hover:opacity-70 transition cursor-pointer bg-white px-3 py-1.5 rounded border border-gray-200 md:border-none md:bg-transparent"
                    >
                        <SlidersHorizontal size={18} />
                        <span className="font-medium text-sm md:text-base">Filter</span>
                        {selectedCategories.length > 0 && (
                            <span className="bg-admin-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {selectedCategories.length}
                            </span>
                        )}
                    </button>

                    {showCategoryDropdown && (
                        <div className="absolute top-10 left-0 bg-white border border-gray-200 shadow-xl rounded-xl w-56 py-3 z-50">
                            <div className="px-4 pb-2 mb-2 border-b border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-gray-800 text-sm">Categories</span>
                                <button
                                    onClick={() => setSelectedCategories([])}
                                    className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    Clear
                                </button>
                            </div>

                            <div className="max-h-60 overflow-y-auto">
                                {categories.map(cat => (
                                    <label
                                        key={cat._id}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat._id)}
                                            onChange={() => toggleCategory(cat._id)}
                                            className="w-4 h-4 text-admin-brand border-gray-300 rounded focus:ring-admin-brand cursor-pointer accent-admin-brand"
                                        />
                                        <span className="text-sm text-gray-700">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-[2px] h-6 bg-gray-400"></div>

                {/* Results Text */}
                <p className="text-xs sm:text-sm text-gray-800 text-center sm:text-left">
                    Showing {totalResults > 0 ? firstItemIndex : 0}–{Math.min(lastItemIndex, totalResults)} of {totalResults} results
                </p>
            </div>

            {/* Right Side: Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                <span className="text-xs sm:text-sm text-gray-800 shrink-0">Sort by</span>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="h-10 md:h-12 px-3 md:px-4 bg-white rounded outline-none border border-gray-200 md:border-none text-xs sm:text-sm text-gray-600 cursor-pointer w-44 md:w-48"
                >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>
        </div>
    )
}
