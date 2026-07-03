import axios from "axios";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function ProductTable({ products, refresh }) {
    async function deleteProduct(id) {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${id}`, { withCredentials: true });
            refresh();
        } catch (error) {
            console.log(error);
            alert("Failed to delete product");
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="p-4 border-b border-gray-100 w-16 text-center">S.No</th>
                            <th className="p-4 border-b border-gray-100">Product</th>
                            <th className="p-4 border-b border-gray-100">Price</th>
                            <th className="p-4 border-b border-gray-100">Sizes</th>
                            <th className="p-4 border-b border-gray-100">Category</th>
                            <th className="p-4 border-b border-gray-100 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {products.map((product, index) => (
                            <tr key={product._id} className="hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0">
                                <td className="p-4 text-center text-gray-400 font-medium">{index + 1}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="font-medium text-gray-800">{product.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 font-semibold text-gray-700">₹{product.price}</td>
                                <td className="p-4 text-gray-500">
                                    <div className="flex gap-1">
                                        {product.size.map(s => (
                                            <span key={s} className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{s}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600">
                                    <span className="bg-admin-brand/10 text-admin-brand px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                                        {product.categoryId?.name || "N/A"}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all cursor-pointer inline-flex items-center justify-center"
                                        onClick={() => deleteProduct(product._id)}
                                        title="Delete Product"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-400 italic">No products found. Add one to get started!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}