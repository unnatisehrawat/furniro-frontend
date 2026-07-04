"use client"

import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import ShareModal from "./ShareModal";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";

export default function OurProducts() {
    const [products, setProducts] = useState([]);
    const { refreshCartCount } = useCart();

    useEffect(() => {
        getProducts()
    }, [])

    async function getProducts() {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`)
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleAddToCart(productId) {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, { productId }, { withCredentials: true });
            refreshCartCount();
            toast.success("Added to cart!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add to cart. Please log in first.");
        }
    }

    return (
        <section className="max-w-7xl mx-auto py-20">
            <h2 className="text-4xl font-bold text-center mb-12">
                Our Products
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 px-3 sm:px-0">
                {products.slice(0, 8).map((product) => (

                    <div
                        key={product._id}
                        className="group bg-[#F4F5F7] overflow-hidden flex flex-col rounded-lg"
                    >
                        <div className="relative h-44 sm:h-75 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                            />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-2">
                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    className="bg-white text-brand font-semibold px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-base cursor-pointer"
                                >
                                    Add to Cart
                                </button>

                                <div className="mt-4 sm:mt-6 flex justify-center w-full z-20 relative">
                                    <ShareModal productId={product._id} productName={product.name} />
                                </div>
                            </div>
                        </div>
                        <Link href={`/product/${product._id}`} className="flex-grow flex flex-col">
                            <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base sm:text-2xl font-semibold text-gray-800 line-clamp-1">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-500 text-xs sm:text-base mt-1 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-2 sm:mt-3">
                                    <span className="font-bold text-sm sm:text-xl text-gray-900">
                                        ₹{product.price}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-14">
                <Link
                    href="/shop"
                    className="border border-brand text-brand px-16 py-3 font-semibold hover:bg-brand hover:text-white transition"
                >
                    Show More
                </Link>
            </div>
        </section>
    );
}