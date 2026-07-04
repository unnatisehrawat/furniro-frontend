"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Calendar, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function LeadDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLeadDetails();
    }, [id]);

    async function getLeadDetails() {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/leads/${id}`);
            setLead(res.data);
        } catch (error) {
            console.error("Failed to fetch lead details:", error);
            toast.error("Lead not found");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="p-8 text-gray-500">Loading lead details...</div>;
    if (!lead) return <div className="p-8 text-red-500">Lead not found.</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Back Button */}
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition cursor-pointer"
            >
                <ArrowLeft size={20} />
                Back to Leads
            </button>

            {/* Header */}
            <div className="mb-10 border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-800">Lead Details</h1>
                <p className="text-gray-500 mt-2">Viewing full contact submission</p>
            </div>

            {/* Content Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-orange-50 p-3 rounded-lg text-brand">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Name</p>
                            <p className="text-lg font-semibold text-gray-900">{lead.name}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-orange-50 p-3 rounded-lg text-brand">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Email</p>
                            <a href={`mailto:${lead.email}`} className="text-lg font-semibold text-blue-600 hover:underline">
                                {lead.email}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-orange-50 p-3 rounded-lg text-brand">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Submitted On</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date(lead.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-100" />

                {/* Message Section */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <MessageSquare size={20} className="text-brand" />
                        <h3 className="text-xl font-bold text-gray-800">
                            {lead.subject || "No Subject Provided"}
                        </h3>
                    </div>
                    
                    <div className="bg-white p-6 rounded border border-gray-200">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {lead.message}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
