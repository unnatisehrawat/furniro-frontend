"use client";

import { MapPin, Phone, Clock } from "lucide-react"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactForm(){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields (Name, Email, Message)");
            return;
        }

        setIsSubmitting(true);
        
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/leads`, formData);
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <section className="max-w-7xl mx-auto py-24 px-6 md:px-12">
            
            
            <div className="text-center max-w-2xl mx-auto mb-20">
                <h2 className="text-4xl font-bold mb-4">Get In Touch With Us</h2>
                <p className="text-gray-400">
                    For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                
                
                <div className="flex-1 flex flex-col gap-10 max-w-md mx-auto lg:mx-0">
                    <div className="flex gap-6 items-start group">
                        <MapPin size={28} className="text-black shrink-0 mt-1 group-hover:text-brand transition-colors" />
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Address</h3>
                            <p className="text-gray-600 leading-relaxed">236 5th SE Avenue, New<br/>York NY10000, United<br/>States</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <Phone size={28} className="text-black shrink-0 mt-1 group-hover:text-brand transition-colors" />
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Phone</h3>
                            <p className="text-gray-600 leading-relaxed">Mobile: +(84) 546-6789<br/>Hotline: +(84) 456-6789</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <Clock size={28} className="text-black shrink-0 mt-1 group-hover:text-brand transition-colors" />
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Working Time</h3>
                            <p className="text-gray-600 leading-relaxed">Monday-Friday: 9:00 - 22:00<br/>Saturday-Sunday: 9:00 - 21:00</p>
                        </div>
                    </div>
                </div>

                
                <div className="flex-1 max-w-xl mx-auto lg:mx-0 w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div>
                            <label className="block text-black font-medium mb-4">Your name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name" 
                                className="w-full border border-gray-300 rounded-lg px-6 py-5 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" 
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-black font-medium mb-4">Email address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email" 
                                className="w-full border border-gray-300 rounded-lg px-6 py-5 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" 
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-black font-medium mb-4">Subject</label>
                            <input 
                                type="text" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Enter the subject(optional)" 
                                className="w-full border border-gray-300 rounded-lg px-6 py-5 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-black font-medium mb-4">Message</label>
                            <textarea 
                                rows="4" 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your message" 
                                className="w-full border border-gray-300 rounded-lg px-6 py-5 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all resize-none"
                                required
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`bg-brand text-white w-full lg:w-56 py-4 rounded-lg font-medium mt-4 shadow-md transition-all ${
                                isSubmitting 
                                    ? "opacity-50 cursor-not-allowed" 
                                    : "hover:bg-[#9c7827] cursor-pointer active:scale-95"
                            }`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
                
            </div>
        </section>
    )
}