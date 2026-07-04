"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Grid2X2, User, Mail, LayoutDashboard, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"
import { useState } from "react"

export default function Sidebar() {
    const pathname = usePathname()
    const { logout } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)

    const menuItems = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: <LayoutDashboard size={18} />
        },
        {
            name: "Categories",
            href: "/admin/categories",
            icon: <Grid2X2 size={18} />
        },
        {
            name: "Products",
            href: "/admin/products",
            icon: <Package size={18} />
        },
        {
            name: "Leads",
            href: "/admin/leads",
            icon: <Mail size={18} />
        }
    ];

    const sidebarContent = (
        <div className="h-full flex flex-col justify-between">
            <div>
                <div className="px-8 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-wide text-admin-brand">FURNIRO</h1>
                        <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
                    </div>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="md:hidden text-gray-500 hover:text-gray-800"
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className="px-4 flex flex-col space-y-2">
                    {menuItems.map((items) => {
                        const active = pathname === items.href;
                        return (
                            <Link
                                key={items.name}
                                href={items.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                            ${active ? "bg-admin-brand text-white" : "text-gray-600 hover:bg-gray-200"}
                            `}
                            >
                                {items.icon}
                                <span className="font-medium">{items.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 p-6">
                <div className="flex items-center gap-4 text-gray-600 font-semibold">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-admin-brand text-white">
                        <User size={18} />
                    </div>
                    <h3>Admin User</h3>
                </div>

                <button
                    onClick={logout}
                    className="text-gray-500 hover:text-red-500 transition cursor-pointer"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Top Header Bar */}
            <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="text-gray-700 p-1 hover:text-admin-brand"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-admin-brand">FURNIRO Admin</h1>
                </div>
            </div>

            {/* Backdrop for mobile */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar drawer on mobile, fixed sidebar on desktop */}
            <aside className={`w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between fixed md:sticky top-0 left-0 z-50 transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}>
                {sidebarContent}
            </aside>
        </>
    )
}