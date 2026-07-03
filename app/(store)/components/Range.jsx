"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link"; 

export default function Range(){
    const [categories , setCategories] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])

    async function getCategories(){
        try {
            const {data } = await axios.get("http://localhost:5000/api/categories")
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    const displayedCategories = categories.slice(0, 3);

    return(
        <>
        <section className="max-w-7xl mx-auto py-20 bg-admin-bg">
            <h2 className="text-4xl font-bold text-center">Browse the Range</h2>
            <p className="text-gray-500 text-center mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                {displayedCategories.map((category) =>(
                    
                    <Link href={`/shop?category=${category._id}`} key={category._id}>
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="relative w-full h-[400px]">
                                <Image 
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover hover:scale-105 transition duration-300 rounded-2xl"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold mt-6">{category.name}</h3>
                        </div>
                    </Link>

                ))}
            </div>

            <div className="flex justify-center mt-14">
                <Link
                    href="/categories"
                    className="border border-brand text-brand px-16 py-3 font-semibold hover:bg-brand hover:text-white transition cursor-pointer"
                >
                    Show More
                </Link>
            </div>
        </section>
        </>
    )
}
