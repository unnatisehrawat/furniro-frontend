import Image from "next/image";
import Link from "next/link";

export default function ContactHero() {
    return (
        <>
        <section className="relative h-80">
        
                    <Image
                        src="/images/shop-banner.jpg"
                        alt="Shop Banner"
                        fill
                        priority
                        className="object-cover"
                    />
        
                    <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center">
        
                        <h1 className="text-5xl font-bold">
                            Contact Us
                        </h1>
        
                        <p className="mt-3 flex gap-1">
                            <Link href="/">
                            Home
                            </Link>
                            
                            &gt;
                            <span className="font-medium">Contact</span>
                        </p>
                    </div>
        
                </section>
        
        
        </>
        
        
        
    )
}