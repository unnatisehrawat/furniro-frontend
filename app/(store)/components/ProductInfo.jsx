import Image from "next/image";

export default function ProductInfo({product}){
    return(
        <>

         <main>
<div className="mt-20 border-t border-gray-200 pt-12">
    
    {/* Tab Navigation */}
    <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xl mb-10">
        <button className="text-black font-semibold">Description</button>
    </div>

    {/* Description Text */}
    <div className="text-gray-500 text-base leading-7 space-y-6 max-w-5xl mx-auto px-4 md:px-0">
        <p>
            Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
        </p>
        <p>
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
        </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 p-10">
        <div className="relative h-96 bg-[#F9F1E7] rounded-lg overflow-hidden flex items-center justify-center">
             <Image 
                src={product.image} 
                alt={`${product.name} View 1`}
                fill
                className="object-contain p-8"
            />
        </div>
        <div className="relative h-96 bg-[#F9F1E7] rounded-lg overflow-hidden flex items-center justify-center">
             <Image 
                src={product.image} 
                alt={`${product.name} View 2`}
                fill
                className="object-contain p-8"
            />
        </div>
    </div>
    
</div>
</main>
        
        
        </>
    )
}