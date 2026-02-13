
"use client";
import { useState } from "react";
import Journey from "@/components/Journey";
import Proposal from "@/components/Proposal";
import Success from "@/components/Success";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
    const [step, setStep] = useState<"journey" | "proposal" | "success">("journey");

    return (
        <AnimatePresence mode="wait">
            {step === "journey" && (
                <motion.div
                    key="journey"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                >
                    <Journey onComplete={() => setStep("proposal")} />
                </motion.div>
            )}

            {step === "proposal" && (
                <motion.div
                    key="proposal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                >
                    <Proposal onSuccess={() => setStep("success")} />
                </motion.div>
            )}

            {step === "success" && (
                <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                >
                    <Success onRestart={() => setStep("journey")} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
