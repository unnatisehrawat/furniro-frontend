"use client"
import Link from "next/link"
import { User , Search , ShoppingCart, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { useCart } from "@/app/context/CartContext"
import { useAuth } from "@/app/context/AuthContext"

export default function NavBar(){
    const { cartCount } = useCart()
    const { user, logout } = useAuth()
    const pathname = usePathname()
    return(
        <>
        <nav className="h-20 px-12 flex items-center justify-between bg-white shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                <Link href="/">
                    <h1 className="text-3xl font-bold hover:opacity-80 transition-opacity cursor-pointer">FURNIRO</h1>
                </Link>
            </div>
            <div className="flex-1 flex justify-center">
                <ul className="flex items-center gap-12 font-medium">
                    <li><Link href = "/"  className={pathname === "/" ? "underline" : ""} >Home</Link> </li>
                    <li><Link href = "/shop"  className={pathname === "/shop" ? "underline" : ""} >Shop</Link> </li>
                  <li><Link href = "/contact"   className={pathname === "/contact" ? "underline" : ""} >Contact</Link> </li>
                </ul>

            </div>
            
            
            <div className="flex-1 flex justify-end items-center">
                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="relative group cursor-pointer flex items-center py-2">
                            <User size={24} className="hover:text-brand transition-colors" />
                            {/* Hover Dropdown */}
                            <div className="absolute right-0 top-full mt-0 w-56 bg-white shadow-xl border border-gray-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                                </div>
                                <button 
                                    onClick={logout}
                                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 flex items-center gap-2 text-sm font-medium transition-colors"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link href="/auth" className="hover:text-brand transition-colors py-2">
                            <User size={24} />
                        </Link>
                    )}
                    <Link href="/cart" className="relative flex items-center hover:text-brand transition-colors py-2">
                        <ShoppingCart size={22} />
                        
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-brand text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
        </>
    )
}