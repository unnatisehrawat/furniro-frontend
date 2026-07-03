"use client"
import { useState } from "react"
import { Copy, Check, MessageCircle, X } from "lucide-react"

export default function ShareModal({ productId, productName }) {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const url = `http://localhost:3000/product/${productId}`

    async function handleCopy() {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    function handleWhatsApp() {
        const message = `Check out this product: ${productName} - ${url}`
        window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank")
    }

    return (
        <>
            {/* Share trigger button */}
            <button
                onClick={() => setOpen(true)}
                className="text-white text-sm cursor-pointer"
            >
                Share
            </button>


            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 w-105 shadow-xl">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Share Product</h2>
                            <button onClick={() => setOpen(false)} className="cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        {/* URL + Copy */}
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <input
                                type="text"
                                value={url}
                                readOnly
                                className="flex-1 px-4 py-3 text-sm text-gray-600 outline-none bg-gray-50"
                            />
                            <button
                                onClick={handleCopy}
                                className="px-4 py-3 bg-gray-100 border-l hover:bg-gray-200 transition cursor-pointer"
                            >
                                {copied
                                    ? <Check size={18} className="text-green-500" />
                                    : <Copy size={18} className="text-gray-600" />
                                }
                            </button>
                        </div>

                        {copied && (
                            <p className="text-green-500 text-sm mt-2">Link copied!</p>
                        )}


                        <button
                            onClick={handleWhatsApp}
                            className="mt-6 w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#1ebe5d] transition cursor-pointer"
                        >
                            <MessageCircle size={20} />
                            Share on WhatsApp
                        </button>

                    </div>
                </div>
            )}
        </>
    )
}