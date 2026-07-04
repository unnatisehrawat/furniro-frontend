"use client"
import Link from "next/link"
import { User, ShoppingCart, LogOut, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useCart } from "@/app/context/CartContext"
import { useAuth } from "@/app/context/AuthContext"
import { useState } from "react"

export default function NavBar() {
    const { cartCount } = useCart()
    const { user, logout } = useAuth()
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <nav className="h-20 px-6 md:px-12 flex items-center justify-between bg-white shadow-sm sticky top-0 z-50">
                <div className="flex-1">
                    <Link href="/">
                        <h1 className="text-2xl md:text-3xl font-bold hover:opacity-80 transition-opacity cursor-pointer">FURNIRO</h1>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex flex-1 justify-center">
                    <ul className="flex items-center gap-12 font-medium">
                        <li><Link href="/" className={pathname === "/" ? "underline" : ""}>Home</Link></li>
                        <li><Link href="/shop" className={pathname === "/shop" ? "underline" : ""}>Shop</Link></li>
                        <li><Link href="/contact" className={pathname === "/contact" ? "underline" : ""}>Contact</Link></li>
                    </ul>
                </div>

                <div className="flex-1 flex justify-end items-center gap-4">
                    <div className="flex items-center gap-4 md:gap-6">
                        {user ? (
                            <div className="relative group cursor-pointer flex items-center py-2">
                                <div className="w-9 h-9 flex items-center justify-center bg-brand text-white font-semibold rounded-full hover:bg-brand/90 transition-colors uppercase text-sm shadow-sm">
                                    {user.name ? user.name[0] : user.email[0]}
                                </div>
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

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-700 hover:text-brand focus:outline-none"
                            aria-label="Toggle Mobile Menu"
                        >
                            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 sticky top-20 z-40 shadow-md">
                    <ul className="flex flex-col gap-4 font-medium text-lg">
                        <li>
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-1 ${pathname === "/" ? "text-brand font-semibold" : "text-gray-700"}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/shop"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-1 ${pathname === "/shop" ? "text-brand font-semibold" : "text-gray-700"}`}
                            >
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-1 ${pathname === "/contact" ? "text-brand font-semibold" : "text-gray-700"}`}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}