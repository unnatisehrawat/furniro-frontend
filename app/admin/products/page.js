"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import AddProductModal from "../components/AddProductModal"
import ProductTable from "../components/ProductTable"

export default function Products(){
    const [ products , setProducts] = useState([])
    const [open , setOpen] = useState(false)
    const [categories , setCategories] = useState([])
    
    async function getProducts(){
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
    }

    async function getCategories(){
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
    }

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])



    return(
        <>
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <div className="mx-4 mt-4">
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                <p  className="text-gray-500 mt-2">Organise and manage your store's products</p>
            </div>
            <button className="mx-8 text-white bg-admin-brand px-4 py-2 cursor-pointer rounded-2xl" 
            onClick={() => setOpen(true)}>
             + Add Product
            </button>
        </div>

        <ProductTable products ={products} refresh ={getProducts} />

        { open && (
            <AddProductModal close = { () => setOpen(false)}
            refresh = {getProducts}
            categories={categories} />


        )}
        </>
    )
}