"use client"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {

    return (
        <section className="relative h-150">
            <Image
                src="/images/home-hero-banner.png"
                alt="Luxury Furniture Collection"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#FFF3E3] max-w-xl p-12 rounded-md z-10 shadow-lg">
                <p className="tracking-[3px] uppercase text-sm font-semibold text-gray-800">New Arrival</p>
                <h1 className="text-6xl font-bold text-brand leading-tight mt-3">
                    Discover Our
                    <br />
                    New Collection
                </h1>

                <p className="mt-6 text-gray-600 font-medium">Elevate your living space with our premium, modern furniture designed for ultimate comfort and timeless elegance.</p>

                <Link href="/shop" className="inline-block mt-8 bg-brand text-white px-10 py-4 font-semibold hover:bg-opacity-90 transition-opacity">
                    BUY NOW
                </Link>
            </div>
        </section>
    )
}