import axios from "axios";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CategoryTable({ categories, refresh }) {
    async function deleteCategory(id) {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`, { withCredentials: true });
            refresh();
        } catch (error) {
            console.log(error);
            alert("Failed to delete category");
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="p-4 border-b border-gray-100 w-16 text-center">S.No</th>
                            <th className="p-4 border-b border-gray-100">Category</th>
                            <th className="p-4 border-b border-gray-100 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {categories.map((category, index) => (
                            <tr key={category._id} className="hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0">
                                <td className="p-4 text-center text-gray-400 font-medium">{index + 1}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="font-medium text-gray-800">{category.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all cursor-pointer inline-flex items-center justify-center"
                                        onClick={() => deleteCategory(category._id)}
                                        title="Delete Category"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-gray-400 italic">No categories found. Add one to get started!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}