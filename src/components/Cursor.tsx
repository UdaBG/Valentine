
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === "pointer");
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <style jsx global>{`
        body {
          cursor: none; /* Hide default cursor */
        }
        a, button, [role="button"] {
          cursor: none; /* Hide on interactive elements too */
        }
      `}</style>

            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50"
                animate={{ x: position.x - 16, y: position.y - 16 }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            >
                <div className={`relative flex items-center justify-center transition-transform duration-100 ${isPointer ? "scale-150" : "scale-100"}`}>
                    <span className="text-3xl filter drop-shadow-md">💖</span>
                </div>
            </motion.div>
        </>
    );
}
