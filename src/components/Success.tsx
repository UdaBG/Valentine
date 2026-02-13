
"use client";
import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";


interface SuccessProps {
    onRestart: () => void;
}

export default function Success({ onRestart }: SuccessProps) {
    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden text-center p-4 relative">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.5
                }}
                className="flex flex-col items-center justify-center max-h-full gap-4 md:gap-8 z-10"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-rose-600 font-serif leading-tight shrink-0">
                    Yayyy!! 🎉 <br />
                    So happy!
                </h1>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-300 mx-auto shrink min-h-0">
                    {/* Image constrained to viewport height minus header/footer space */}
                    <img
                        src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                        alt="Romantic Kiss"
                        className="w-auto h-auto max-h-[50vh] object-contain"
                    />
                </div>

                <p className="text-xl md:text-3xl text-rose-800 font-medium shrink-0 pb-4">
                    See you soon babe 🍆💦😏
                </p>
            </motion.div>

            <button
                onClick={onRestart}
                className="absolute bottom-4 right-4 text-xs text-rose-400 hover:text-rose-600 underline opacity-50 hover:opacity-100 transition-opacity z-20"
            >
                Restart Journey ↺
            </button>
        </div>
    );
}
