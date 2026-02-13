
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Journey from "@/components/Journey";
import Proposal from "@/components/Proposal";
import Success from "@/components/Success";
import CreateForm from "@/components/CreateForm";
import { AnimatePresence, motion } from "framer-motion";

function ValentineApp() {
    const searchParams = useSearchParams();
    const toParam = searchParams.get("to");
    const fromParam = searchParams.get("from");
    const messageParam = searchParams.get("msg");

    const [step, setStep] = useState<"create" | "journey" | "proposal" | "success">("create");

    // Initialize state based on URL parameters
    useEffect(() => {
        if (toParam && fromParam) {
            setStep("journey");
        } else {
            setStep("create");
        }
    }, [toParam, fromParam]);

    const toName = toParam || "Rasini";
    const fromName = fromParam || "Your Valentine";

    return (
        <AnimatePresence mode="wait">
            {step === "create" && (
                <motion.div
                    key="create"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                >
                    <CreateForm />
                </motion.div>
            )}

            {step === "journey" && (
                <motion.div
                    key="journey"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                >
                    <Journey
                        onComplete={() => setStep("proposal")}
                        to={toName}
                        from={fromName}
                    />
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
                    <Success
                        onRestart={() => setStep("journey")}
                        to={toName}
                        from={fromName}
                        customMessage={messageParam || undefined}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ValentineApp />
        </Suspense>
    );
}
