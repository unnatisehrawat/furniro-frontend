"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import ShareModal from "./ShareModal";
import FilterBar from "./FilterBar";
import toast from "react-hot-toast";

export default function ShopProducts() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const { refreshCartCount } = useCart();

    const searchParams = useSearchParams();
    const urlCategory = searchParams.get("category");

    // Filter Bar States
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [sortOption, setSortOption] = useState("default");
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Initialize filter from URL once on mount
    useEffect(() => {
        if (urlCategory) {
            setSelectedCategories([urlCategory]);
        }
    }, [urlCategory]);

    // Fetch all products once
    useEffect(() => {
        getProducts();
    }, []);

    // Reset to page 1 whenever filters or sorting change
    useEffect(() => {
        setPage(1);
    }, [selectedCategories, sortOption, itemsPerPage]);

    async function getProducts() {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`);
            setProducts(data);
            setPage(1);
        } catch (err) {
            console.log(err);
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

    // Filter by Selected Categories
    let processedProducts = [...products];
    if (selectedCategories.length > 0) {
        processedProducts = processedProducts.filter(p =>
            selectedCategories.includes(p.categoryId?._id || p.categoryId)
        );
    }

    // Sort Products
    if (sortOption === "price-asc") processedProducts.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") processedProducts.sort((a, b) => b.price - a.price);
    if (sortOption === "name-asc") processedProducts.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOption === "name-desc") processedProducts.sort((a, b) => b.name.localeCompare(a.name));

    // Paginate Products
    const last = page * itemsPerPage;
    const first = last - itemsPerPage;
    const currentProducts = processedProducts.slice(first, last);
    const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

    return (
        <>
            <FilterBar
                totalResults={processedProducts.length}
                firstItemIndex={processedProducts.length > 0 ? first + 1 : 0}
                lastItemIndex={last}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                sortOption={sortOption}
                setSortOption={setSortOption}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />

            <section className="max-w-7xl mx-auto py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10 lg:px-40">
                    {currentProducts.map((product) => (
                        <div
                            key={product._id}
                            className="group bg-[#F4F5F7] overflow-hidden flex flex-col"
                        >
                            <div className="relative h-75 overflow-hidden flex-shrink-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-300"
                                />

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center">
                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        className="bg-white text-[#B88E2F] font-semibold px-8 py-3 cursor-pointer"
                                    >
                                        Add to Cart
                                    </button>

                                    <div className="mt-6 flex justify-center w-full z-20 relative">
                                        <ShareModal productId={product._id} productName={product.name} />
                                    </div>
                                </div>
                            </div>

                            <Link href={`/product/${product._id}`} className="flex-grow flex flex-col">
                                <div className="p-5 cursor-pointer hover:bg-gray-50 transition-colors flex-grow flex flex-col">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {product.name}
                                    </h2>

                                    <p className="text-gray-500 mt-2 flex-grow">
                                        {product.description}
                                    </p>

                                    <p className="font-bold text-xl mt-3 text-gray-800">
                                        ₹{product.price}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {currentProducts.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500 text-lg">
                            No products found matching your filter criteria.
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-4 mt-16">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index + 1)}
                                className={`w-12 h-12 cursor-pointer rounded transition-colors ${page === index + 1
                                        ? "bg-[#B88E2F] text-white"
                                        : "bg-[#F9F1E7] text-black hover:bg-[#f0e2d1]"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
