import { Suspense } from "react";
import ShopHero from "../components/ShopHero"
import ShopProducts from "../components/ShopProducts"
export default function ShopPage(){
    return(
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <ShopHero />
            <ShopProducts />
        </Suspense>
        </>
    )
}