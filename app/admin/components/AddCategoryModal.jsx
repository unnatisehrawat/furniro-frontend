"use client"
import axios from "axios"
import { useState } from "react"
import { X, Upload } from "lucide-react"

export default function AddCategoryModal({ close, refresh }) {
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("image", image);

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories`, formData, { withCredentials: true })

            refresh()
            close()
        } catch (error) {
            console.log(error)
            alert("Failed to add category")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Add New Category</h2>
                        <p className="text-sm text-gray-500 mt-1">Create a new product category</p>
                    </div>
                    <button 
                        onClick={close} 
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="e.g. Living Room"
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-admin-brand/20 focus:border-admin-brand transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category Image</label>
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
                        <div className="relative rounded-xl overflow-hidden h-40 border border-gray-200 shadow-sm">
                            <img
                                src={URL.createObjectURL(image)}
                                className="w-full h-full object-cover"
                                alt="Preview"
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
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
                            {isSubmitting ? "Saving..." : "Save Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}