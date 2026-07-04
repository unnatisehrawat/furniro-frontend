"use client"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {

    return (
        <section className="relative h-120 sm:h-140 md:h-150">
            <Image
                src="/images/home-hero-banner.png"
                alt="Luxury Furniture Collection"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute left-4 right-4 sm:left-auto sm:right-10 md:right-20 top-1/2 -translate-y-1/2 bg-[#FFF3E3] max-w-xl p-6 sm:p-8 md:p-12 rounded-md z-10 shadow-lg">
                <p className="tracking-[3px] uppercase text-xs sm:text-sm font-semibold text-gray-800">New Arrival</p>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-brand leading-tight mt-2 sm:mt-3">
                    Discover Our
                    <br />
                    New Collection
                </h1>

                <p className="mt-3 sm:mt-6 text-xs sm:text-base text-gray-600 font-medium leading-relaxed">Elevate your living space with our premium, modern furniture designed for ultimate comfort and timeless elegance.</p>

                <Link href="/shop" className="inline-block mt-4 sm:mt-8 bg-brand text-white px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-base font-semibold hover:bg-opacity-90 transition-opacity">
                    BUY NOW
                </Link>
            </div>
        </section>
    )
}