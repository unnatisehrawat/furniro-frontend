"use client";
import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ShopHero from "../components/ShopHero"; // We can reuse the ShopHero or make a custom one.

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories`);
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* Reusing ShopHero, but you could customize it if needed */}
            <Suspense fallback={<div>Loading...</div>}>
                <ShopHero title="Categories" breadcrumbs="Home > Categories" />
            </Suspense>

            <section className="max-w-7xl mx-auto py-20 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((category) => (
                        <Link href={`/shop?category=${category._id}`} key={category._id}>
                            <div className="flex flex-col items-center cursor-pointer group">
                                <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-sm">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    {/* Overlay that appears on hover to make it feel premium */}
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                </div>
                                <h3 className="text-3xl font-semibold mt-8 text-gray-800 group-hover:text-brand transition-colors">
                                    {category.name}
                                </h3>
                                <span className="text-brand mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Browse Collection →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
