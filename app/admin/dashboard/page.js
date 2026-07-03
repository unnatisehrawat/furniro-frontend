"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard"

export default function AdminPage() {
    const [counts, setCounts] = useState({
        categories: 0,
        products: 0,
        leads: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const [categoriesRes, productsRes, leadsRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/leads`)
                ]);

                setCounts({
                    categories: categoriesRes.data.length || 0,
                    products: productsRes.data.length || 0,
                    leads: leadsRes.data.length || 0
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <>
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <div className="mx-4 mt-4">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-2">Welcome back! Here is your store analytics.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-8">
                <StatsCard
                    title="Total Categories"
                    value={counts.categories}
                    link="/admin/categories"
                />

                <StatsCard
                    title="Total Products"
                    value={counts.products}
                    link="/admin/products"
                />
                
                <StatsCard
                    title="Total Leads"
                    value={counts.leads}
                    link="/admin/leads"
                />
            </div>
        </>
    )
}
