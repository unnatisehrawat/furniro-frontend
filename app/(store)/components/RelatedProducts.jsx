"use client"

import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function RelatedProducts({ categoryId, currentProductId }) {
    const [products, setProducts] = useState([]);
    const { refreshCartCount } = useCart();

    useEffect(() => {
        if (categoryId) {
            fetchRelatedProducts();
        }
    }, [categoryId, currentProductId]);

    async function fetchRelatedProducts() {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?category=${categoryId}`)
            
        
            const relatedData = data.filter(product => product._id !== currentProductId);
            
            setProducts(relatedData);
        } catch (error) {
            console.log(error)
        }
    }

    async function handleAddToCart(productId) {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, { productId }, { withCredentials: true });
            refreshCartCount();
            alert("Added to cart!");
        } catch (error) {
            console.log(error);
            alert("Failed to add to cart");
        }
    }

    if (products.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto py-20 border-t border-gray-200 mt-16">
            <h2 className="text-4xl font-bold text-center mb-12">
                Related Products
            </h2>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map((product) => (
                    <div
                        key={product._id}
                        className="group bg-[#F4F5F7] overflow-hidden"
                    >
                        <div className="relative h-72 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                            />
                            
                            {/* Hover overlay with add to cart button */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center">
                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    className="bg-white text-brand font-semibold px-8 py-3 cursor-pointer hover:bg-brand hover:text-white transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <Link href={`/product/${product._id}`}>
                            <div className="p-4 bg-[#F4F5F7]">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {product.name}
                                </h3>

                                <p className="text-gray-500 mt-2 truncate">
                                    {product.description}
                                </p>

                                <div className="mt-3">
                                    <span className="font-bold text-xl text-gray-900">
                                        ₹{product.price}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Link
                    href={`/shop?category=${categoryId}`}
                    className="border border-brand text-brand px-16 py-3 font-semibold hover:bg-brand hover:text-white transition"
                >
                    Show More
                </Link>
            </div>
        </section>
    );
}
