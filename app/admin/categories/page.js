"use client"
import axios from "axios";


import { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import AddCategoryModal from "../components/AddCategoryModal";

export default function Category(){
    const [categories , setCategories] = useState([]);
    const [open , setOpen ] = useState(false);

    async function getCategories(){
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
}

    useEffect(() => {
        getCategories();
    } , [])

    return(
        <>
       <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div className="mx-4 mt-4">
            <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
            <p className="text-gray-500 mt-2">Organise and manage your store's categories</p>
        </div>
        <button className="mx-8 text-white bg-admin-brand px-4 py-2 cursor-pointer rounded-2xl"
        onClick={() => setOpen(true)}>
            + Add Category

        </button>
       </div>

       <CategoryTable categories ={categories} refresh = {getCategories} />


       {open && (
        <AddCategoryModal  close = {() => setOpen(false)} refresh = {getCategories}/>
       )}
        </>
    )
}