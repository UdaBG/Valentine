
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Loading from "./Loading";

interface ProposalProps {
    onSuccess: () => void;
}

const noTexts = [
    "No 💔",
    "Are you sure? 🥺",
    "Really? 😢",
    "Think again! 😭",
    "Last chance! 🥀",
    "Surely not? 🌧️",
    "You might regret this! 🌫️",
    "Give it another thought! 🤔",
    "Are you absolutely certain? 🤨",
    "This could be a mistake! ⚠️",
    "Have a heart! 🫀",
    "Don't be so cold! ❄️",
    "Change of heart? ❤️‍🩹",
    "Wouldn't you reconsider? 🌥️",
    "Is that your final answer? 🗿",
    "You're breaking my heart ;( 💔",
    "JUST CLICK YES! 😤😒",
];

export default function Proposal({ onSuccess }: ProposalProps) {
    const [noCount, setNoCount] = useState(0);
    const noBtnRef = useRef<HTMLButtonElement>(null);

    // Fixed positioning state
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    const [imgSrc, setImgSrc] = useState("https://cataas.com/cat/cute/says/Please?fontSize=50&fontColor=white");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Only start logic after 3 clicks or if we already started moving
            if (noCount < 3 && position === null) return;
            if (!noBtnRef.current) return;

            const btn = noBtnRef.current;
            const rect = btn.getBoundingClientRect();
            const btnWidth = rect.width;
            const btnHeight = rect.height;

            let currentX = position ? position.x : rect.left;
            let currentY = position ? position.y : rect.top;

            const centerX = currentX + btnWidth / 2;
            const centerY = currentY + btnHeight / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            const SAFE_RADIUS = 200;
            const PANIC_RADIUS = 100;

            if (distance < SAFE_RADIUS) {
                if (distance < PANIC_RADIUS) {
                    const nextX = Math.random() * (window.innerWidth - btnWidth - 40) + 20;
                    const nextY = Math.random() * (window.innerHeight - btnHeight - 40) + 20;
                    setPosition({ x: nextX, y: nextY });
                    setNoCount(c => c + 1);
                    return;
                }

                const angle = Math.atan2(deltaY, deltaX);
                const targetDist = SAFE_RADIUS + 50;

                const targetCenterX = mouseX - Math.cos(angle) * targetDist;
                const targetCenterY = mouseY - Math.sin(angle) * targetDist;

                let nextX = targetCenterX - btnWidth / 2;
                let nextY = targetCenterY - btnHeight / 2;

                const padding = 20;
                const maxX = window.innerWidth - btnWidth - padding;
                const maxY = window.innerHeight - btnHeight - padding;

                if (nextX < padding) nextX = padding + (padding - nextX);
                if (nextX > maxX) nextX = maxX - (nextX - maxX);
                if (nextY < padding) nextY = padding + (padding - nextY);
                if (nextY > maxY) nextY = maxY - (nextY - maxY);

                nextX = Math.min(Math.max(padding, nextX), maxX);
                nextY = Math.min(Math.max(padding, nextY), maxY);

                setPosition({ x: nextX, y: nextY });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [noCount, position]);

    const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newCount = noCount + 1;
        setNoCount(newCount);

        if (newCount === 3) {
            const btn = noBtnRef.current;
            if (!btn) return;
            const rect = btn.getBoundingClientRect();
            const btnWidth = rect.width;
            const btnHeight = rect.height;

            // Immediate panic jump to start the chaos
            const nextX = Math.random() * (window.innerWidth - btnWidth - 40) + 20;
            const nextY = Math.random() * (window.innerHeight - btnHeight - 40) + 20;
            setPosition({ x: nextX, y: nextY });
        }
    };

    const getNoButtonText = () => {
        return noTexts[Math.min(noCount, noTexts.length - 1)];
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className={`flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden relative transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                >
                    <img
                        src={imgSrc}
                        alt="Cute cat asking please"
                        className="rounded-xl shadow-xl w-[200px] md:w-[300px] mb-8 mx-auto object-cover bg-white/50 border-4 border-white transform rotate-2"
                        onError={() => setImgSrc("https://media.tenor.com/uDkS17R-KxAAAAAi/cat-cute.gif")}
                        onLoad={() => setIsLoading(false)}
                    />
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-8 font-serif drop-shadow-sm">
                    Will you be my Valentine? 🌹
                </h1>

                <div className="w-full h-32 relative flex justify-center items-center gap-8">
                    {/* The Romantic Yes Button */}
                    <motion.button
                        className="relative group bg-gradient-to-r from-rose-400 to-red-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl border-2 border-white/50 z-10 overflow-hidden"
                        style={{ fontSize: Math.min(noCount * 2 + 18, 40) }} // Cap size at 40px
                        onClick={onSuccess}
                        whileHover={{
                            scale: 1.1,
                            y: -5,
                            boxShadow: "0px 10px 20px rgba(244, 63, 94, 0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            scale: [1, 1.15, 1], // Increased pulse scale
                            boxShadow: [
                                "0px 0px 0px rgba(244, 63, 94, 0.4)",
                                "0px 0px 40px rgba(244, 63, 94, 1)",
                                "0px 0px 0px rgba(244, 63, 94, 0.4)"
                            ],
                        }}
                        transition={{
                            duration: 1.5, // Faster pulse
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Yes, I will! 💖
                        </span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>

                    {/* The Heartbreaking No Button */}
                    <motion.button
                        ref={noBtnRef}
                        className="bg-slate-800 text-gray-400 font-bold py-3 px-6 rounded-lg shadow-inner border border-slate-700 transition-all duration-300 z-20 backdrop-blur-sm bg-opacity-80"
                        onClick={handleNoClick}
                        style={
                            position
                                ? {
                                    position: "fixed",
                                    left: 0,
                                    top: 0
                                }
                                : { position: 'relative' }
                        }
                        animate={
                            position
                                ? { x: position.x, y: position.y }
                                : { x: 0, y: 0 }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 800,
                            damping: 20,
                            mass: 0.2
                        }}
                    >
                        <span className="flex items-center gap-2">
                            {getNoButtonText()}
                        </span>
                    </motion.button>
                </div>
            </div>
        </>
    );
}
