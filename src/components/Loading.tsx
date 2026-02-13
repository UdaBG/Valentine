
"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-100">
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="text-6xl mb-4"
            >
                💖
            </motion.div>
            <h2 className="text-2xl font-dancing font-bold text-rose-600 animate-pulse">
                Loading Romance...
            </h2>
        </div>
    );
}
