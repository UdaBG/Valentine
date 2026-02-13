
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CreateForm() {
    const [toName, setToName] = useState("");
    const [fromName, setFromName] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!toName || !fromName) return;

        // Get current base URL
        const baseUrl = window.location.origin;
        // Encode names to handle special characters/spaces
        let link = `${baseUrl}?to=${encodeURIComponent(toName)}&from=${encodeURIComponent(fromName)}`;
        if (customMessage) {
            link += `&msg=${encodeURIComponent(customMessage)}`;
        }
        setGeneratedLink(link);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-20 relative">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full border-2 border-rose-200"
            >
                <h1 className="text-3xl font-bold text-rose-600 mb-2 font-serif">
                    Create Your Proposal 💘
                </h1>
                <p className="text-rose-400 mb-6">
                    Make a special link for your Valentine!
                </p>

                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label className="block text-left text-sm font-semibold text-rose-500 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={fromName}
                            onChange={(e) => setFromName(e.target.value)}
                            placeholder="e.g. Romeo"
                            className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/50 text-rose-900 placeholder-rose-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-left text-sm font-semibold text-rose-500 mb-1">
                            Valentine's Name
                        </label>
                        <input
                            type="text"
                            value={toName}
                            onChange={(e) => setToName(e.target.value)}
                            placeholder="e.g. Juliet"
                            className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/50 text-rose-900 placeholder-rose-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-left text-sm font-semibold text-rose-500 mb-1">
                            Custom Message (Optional)
                        </label>
                        <textarea
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="e.g. See you tonight! 😉"
                            className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/50 text-rose-900 placeholder-rose-300 resize-none h-20"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-md transition-colors mt-4"
                    >
                        Create Magic Link ✨
                    </motion.button>
                </form>

                {generatedLink && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-100"
                    >
                        <p className="text-sm text-rose-500 mb-2 font-semibold">
                            Share this link with {toName}:
                        </p>
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-rose-200 overflow-hidden">
                            <input
                                readOnly
                                value={generatedLink}
                                className="flex-1 text-sm text-gray-600 bg-transparent outline-none truncate"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="text-xs px-3 py-1.5 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>

                        <a
                            href={generatedLink}
                            target="_blank"
                            rel="noreferrer"
                            className="block mt-3 text-sm text-rose-400 hover:text-rose-600 underline"
                        >
                            Test it yourself →
                        </a>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
