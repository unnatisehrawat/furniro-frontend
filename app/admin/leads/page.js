"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import LeadTable from "../components/LeadTable";

export default function Leads() {
    const [leads, setLeads] = useState([]);

    async function getLeads() {
        try {
            const res = await axios.get("http://localhost:5000/api/leads");
            setLeads(res.data);
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        }
    }

    useEffect(() => {
        getLeads();
    }, [])

    return (
        <>
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <div className="mx-4 mt-4">
                    <h1 className="text-3xl font-bold text-gray-800">Leads Management</h1>
                    <p className="text-gray-500 mt-2">View and manage customer contact submissions</p>
                </div>
            </div>

            <LeadTable leads={leads} refresh={getLeads} />
        </>
    )
}
