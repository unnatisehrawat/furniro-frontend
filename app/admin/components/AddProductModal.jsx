"use client"
import axios from "axios"
import { useState } from "react"
import { X, Upload } from "lucide-react"
import toast from "react-hot-toast"

export default function AddProductModal({ close, refresh, categories }) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState("")
    const [sizes, setSizes] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [image, setImage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const availableSizes = ["S", "M", "L", "XL"]

    function toggleSize(size) {
        setSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        )
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("rating", rating);
            formData.append("categoryId", categoryId);
            formData.append("image", image);
            sizes.forEach(size => formData.append("size", size));

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`, formData, { withCredentials: true })
            
            refresh()
            close()
        } catch (error) {
            console.log(error)
            toast.error("Failed to add product")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b border-gray-100 z-10 -mt-2 pt-2">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                        <p className="text-sm text-gray-500 mt-1">Fill in the details to create a product</p>
                    </div>
                    <button 
                        onClick={close} 
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="e.g. Syltherine Sofa"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-admin-brand/20 focus:border-admin-brand transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price (₹)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="2500"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-admin-brand/20 focus:border-admin-brand transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="A brief description of the product..."
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-admin-brand/20 focus:border-admin-brand transition-all resize-none"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-admin-brand/20 focus:border-admin-brand transition-all bg-white"
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rating (0-5)</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                                placeholder="4.5"
                                min={0} max={5} step="0.1"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-admin-brand/20 focus:border-admin-brand transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Available Sizes</label>
                        <div className="flex gap-3">
                            {availableSizes.map(size => (
                                <button
                                    type="button"
                                    key={size}
                                    onClick={() => toggleSize(size)}
                                    className={`w-12 h-12 rounded-xl font-medium transition-all cursor-pointer border ${
                                        sizes.includes(size)
                                            ? "bg-admin-brand border-admin-brand text-white shadow-md shadow-admin-brand/20"
                                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Image</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">Click to upload image</p>
                                </div>
                                <input
                                    type="file"
                                    required
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>

                    {image && (
                        <div className="relative rounded-xl overflow-hidden h-48 border border-gray-200 shadow-sm">
                            <img
                                src={URL.createObjectURL(image)}
                                className="w-full h-full object-cover"
                                alt="Preview"
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
                        <button
                            type="button"
                            onClick={close}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-admin-brand text-white px-6 py-2.5 rounded-xl font-medium shadow-md shadow-admin-brand/20 hover:bg-admin-brand/90 transition-all cursor-pointer disabled:opacity-70"
                        >
                            {isSubmitting ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}