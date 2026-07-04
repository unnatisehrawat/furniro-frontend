"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useCart } from "../../context/CartContext"
import toast from "react-hot-toast"

export default function CartTable(){
    const [cart, setCart] = useState({ items: [] }) 
    const { refreshCartCount } = useCart()

    useEffect(() => {
        getCart()
    }, [])

    async function getCart(){
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, { withCredentials: true }) 
            setCart(data)
        } catch (error) {
            toast.error('Failed to fetch cart')
            console.log(error)
        }
    }

    async function removeFromCart(productId) {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart/${productId}`, { withCredentials: true })
            getCart()
            refreshCartCount()
        } catch (error) {
            console.log(error)
            toast.error("Failed to remove item")
        }
    }

    const items = cart?.items || [];  
    
    
    

    if (items.length === 0) {
        return (
            <div className="p-6 text-center py-20 text-gray-500 text-xl font-medium">
                Cart is empty
            </div>
        )
    }

    return(
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <div className="overflow-x-auto border border-gray-300 rounded-lg">
                <table className="w-full text-sm sm:text-base">
                    <thead className="text-white bg-admin-brand">
                        <tr>
                            <th className="p-3 sm:p-4 border border-gray-300">S.No</th>
                            <th className="p-3 sm:p-4 border border-gray-300">Name</th>
                            <th className="p-3 sm:p-4 border border-gray-300">Image</th>
                            <th className="p-3 sm:p-4 border border-gray-300">Price</th>
                            <th className="p-3 sm:p-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.productId._id} className="border border-gray-300 text-center">
                                <td className="border border-gray-300 p-3 sm:p-4 w-3">{index + 1}</td>
                                <td className="border border-gray-300 p-3 sm:p-4 font-medium">
                                    {item.productId.name}
                                </td>
                                <td className="border border-gray-300 p-3 sm:p-4">
                                    <img src={item.productId.image} alt={item.productId.name} className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                                </td>
                                <td className="border border-gray-300 p-3 sm:p-4 font-semibold">
                                    ₹{item.productId.price}
                                </td>
                                <td className="border border-gray-300 p-3 sm:p-4">
                                    <button className="text-red-500 hover:underline font-medium cursor-pointer"
                                        onClick={() => removeFromCart(item.productId._id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}