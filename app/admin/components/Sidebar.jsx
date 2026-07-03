"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Grid2X2, User, Mail, LayoutDashboard, LogOut } from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"

export default function Sidebar() {
    const pathname = usePathname()
    const { logout } = useAuth()

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

    return (
        <>
            <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between sticky top-0">
                <div>
                    <div className="px-8 py-6">
                        <h1 className="text-3xl font-bold tracking-wide text-admin-brand "> FURNIRO</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Admin Portal
                        </p>
                    </div>
                    <nav className="px-4 flex flex-col space-y-2">
                        {menuItems.map((items) => {
                            const active = pathname === items.href;
                            return (
                                <Link
                                    key={items.name}
                                    href={items.href}
                                    className={` flex items-center gap-3 px-4 py-3 rounded-lg transition
                                ${active ? "bg-admin-brand text-white" :
                                            "text-gray-600 hover:bg-gray-200"
                                        }
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
                        <h3> Admin User</h3>
                    </div>
                    
                    <button 
                        onClick={logout} 
                        className="text-gray-500 hover:text-red-500 transition cursor-pointer"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>

            </aside>
        </>
    )
}