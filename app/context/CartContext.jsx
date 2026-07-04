"use client"
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);

    function clearCart() {
        setCartCount(0);
    }

    async function refreshCartCount() {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cart`, {
                withCredentials: true
            });
            const totalItems = data.items ? data.items.length : 0;
            setCartCount(totalItems);
        } catch (error) {
            setCartCount(0);
        }
    }

    useEffect(() => {
        refreshCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, refreshCartCount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}