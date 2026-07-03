"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import ProductInfo from "../../components/ProductInfo"
import RelatedProducts from "../../components/RelatedProducts"
import { useCart } from "@/app/context/CartContext";
import { Rating } from 'react-simple-star-rating'




export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { refreshCartCount } = useCart();

    useEffect(() => {
        getProduct()
    }, [id])

    async function getProduct() {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${id}`)
            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleAddToCart() {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, { productId: id, quantity }, { withCredentials: true })
            refreshCartCount();
            alert("Added to cart!")
        } catch (error) {
            console.log(error)
            alert("Failed to add to cart")
        }
    }

    if (!product) {
        return <div className="h-96 flex items-center justify-center">Loading...</div>
    }

    return (
        <>
            <section className="max-w-7xl mx-auto py-16 px-6">
                <p className="text-gray-500 mb-8">
                    Home &gt; Shop &gt; <span className="font-medium text-black">{product.name}</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="relative h-125">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-semibold">{product.name}</h1>
                        <p className="text-2xl text-gray-500 mt-3">₹{product.price}</p>

                        <div className="flex items-center gap-2 mt-4">
                            <Rating
                                initialValue={Number(product.rating || 0)}
                                readonly={true}
                                allowFraction={true}
                                fillColor="#B88E2F"
                                emptyColor="#e5e7eb"
                                size={20}
                                SVGstyle={{ display: 'inline-block' }}
                            />

                            <span className="text-gray-500">{product.rating} Rating</span>
                        </div>

                        <p className="text-gray-600 mt-6 leading-7">
                            {product.description}
                        </p>



                        <button
                            onClick={handleAddToCart}
                            className="mt-10 bg-brand text-white px-12 py-4 font-semibold cursor-pointer"
                        >
                            Add To Cart
                        </button>

                        <hr className="mt-10" />

                        <div className="mt-6 text-gray-500 space-y-2">
                            <p>Category: <span className="text-black">{product.categoryId?.name}</span></p>
                        </div>
                    </div>
                </div>
            </section>

            <ProductInfo product={product} />
            <RelatedProducts categoryId={product.categoryId?._id} currentProductId={product._id} />
        </>


    )
}