"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import axios from "axios";
import { AuthProvider, AuthGuard } from "../context/AuthContext";

export default function AdminLayout({ children }) {
    
    axios.defaults.withCredentials = true;
    
    const pathname = usePathname();
    const isAuthPage = pathname === "/admin";

    return (
    
        <AuthProvider>
            
            {isAuthPage ? (
                
                <>{children}</>
            ) : (
                
                <AuthGuard>
                    <div className="min-h-screen flex bg-admin-bg">
                        <Sidebar />
                        <div className="flex-1 flex flex-col">
                            <main className="flex-1">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </div>
                </AuthGuard>
            )}
            
        </AuthProvider>
    );
}
