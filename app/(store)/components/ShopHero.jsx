"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShopHero() {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("category");
    
    
    const [categoryName, setCategoryName] = useState("");

    
    useEffect(() => {
        if (categoryId) {
            getCategoryName();
        } else {
            setCategoryName("");
        }
    }, [categoryId]);

    async function getCategoryName() {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories/${categoryId}`);
            setCategoryName(data.name);
        } catch (error) {
            console.log("Failed to fetch category", error);
        }
    }

    return (
        <section className="relative h-80">
            <Image
                src="/images/shop-banner.jpg"
                alt="Shop Banner"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center">
                
                {/* Dynamically change the big title based on category */}
                <h1 className="text-5xl font-bold text-black">
                    {categoryName ? categoryName : "Shop"}
                </h1>

                <p className="mt-3 flex gap-1 text-black items-center">
                    <Link href="/" className="font-medium hover:underline">
                        Home
                    </Link>
                    
                    &gt;
                    
                    {/* Make "Shop" clickable so users can go back to all products easily */}
                    <Link href="/shop" className={categoryName ? "font-medium hover:underline" : "font-medium"}>
                        Shop
                    </Link>
                    
                    {/* Only show "> CategoryName" if a category is actually selected */}
                    {categoryName && (
                        <>
                            &gt;
                            <span className="font-light">{categoryName}</span>
                        </>
                    )}
                </p>
            </div>
        </section>
    );
}
