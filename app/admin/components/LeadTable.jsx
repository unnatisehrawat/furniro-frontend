import axios from "axios";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function LeadTable({ leads, refresh }) {
    const router = useRouter();

    async function deleteLead(id) {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;
        
        try {
            await axios.delete(`http://localhost:5000/api/leads/${id}`, { withCredentials: true })
            refresh()
        } catch (error) {
            console.log(error)
            alert("Failed to delete lead")
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mx-4">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="p-4 border-b border-gray-100 w-16 text-center">S.No</th>
                            <th className="p-4 border-b border-gray-100">Date</th>
                            <th className="p-4 border-b border-gray-100">Name</th>
                            <th className="p-4 border-b border-gray-100">Email</th>
                            <th className="p-4 border-b border-gray-100">Subject</th>
                            <th className="p-4 border-b border-gray-100">Message</th>
                            <th className="p-4 border-b border-gray-100 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {leads.map((lead, index) => (
                            <tr 
                                key={lead._id} 
                                onClick={() => router.push(`/admin/leads/${lead._id}`)}
                                className="hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                            >
                                <td className="p-4 text-center text-gray-400 font-medium">{index + 1}</td>
                                <td className="p-4 text-gray-500 whitespace-nowrap">
                                    {new Date(lead.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="p-4 font-medium text-gray-800">
                                    {lead.name}
                                </td>
                                <td className="p-4 text-admin-brand">
                                    <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()} className="hover:underline">
                                        {lead.email}
                                    </a>
                                </td>
                                <td className="p-4 font-medium text-gray-700">
                                    {lead.subject || <span className="text-gray-400 italic">No Subject</span>}
                                </td>
                                <td className="p-4 text-gray-500 max-w-[200px] truncate" title={lead.message}>
                                    {lead.message}
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all cursor-pointer inline-flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteLead(lead._id);
                                        }}
                                        title="Delete Lead"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-400 italic">No leads found. When customers contact you, they will appear here!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
