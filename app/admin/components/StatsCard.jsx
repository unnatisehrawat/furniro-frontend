import Link from "next/link";
import { Grid2X2, Package, Mail } from "lucide-react";

export default function StatsCard({ title, value, link }) {
    
    // Determine which icon to use based on the title
    let Icon = Grid2X2;
    if (title.toLowerCase().includes("product")) Icon = Package;
    if (title.toLowerCase().includes("lead")) Icon = Mail;

    return (        
        <Link 
            href={link || "#"} 
            className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full relative overflow-hidden"
        >
            {/* Subtle background decoration */}
            <div className="absolute -right-6 -top-6 bg-gray-50 rounded-full p-8 transition-transform group-hover:scale-110 group-hover:bg-admin-brand/5">
                <Icon size={48} className="text-gray-200 group-hover:text-admin-brand/20 transition-colors" />
            </div>

            <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-admin-brand/10 flex items-center justify-center text-admin-brand">
                    <Icon size={24} />
                </div>
            </div>

            <div className="relative z-10 flex-grow">
                <h3 className="text-gray-500 font-medium text-sm tracking-wide uppercase">{title}</h3>
                <p className="text-4xl font-bold text-gray-800 mt-2">{value}</p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-admin-brand group-hover:text-admin-brand/80 transition-colors">
                <span>View details</span>
                <span>→</span>
            </div>
        </Link>
    );
}