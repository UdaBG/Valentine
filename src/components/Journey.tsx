
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface JourneyProps {
    onComplete: () => void;
}

const steps = [
    "Hi Rasini...",
    "I wanted to ask you something special...",
    "We've shared so many beautiful moments...",
    "And every day with you is a gift.",
    "So...",
    "Are you ready?",
];

export default function Journey({ onComplete }: JourneyProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full"
                >
                    <h1 className="text-4xl md:text-6xl font-script text-rose-600 mb-12 min-h-[120px] flex items-center justify-center">
                        {steps[currentStep]}
                    </h1>
                </motion.div>
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="mt-8 px-8 py-3 bg-white/80 backdrop-blur-sm border-2 border-rose-300 text-rose-600 rounded-full font-semibold text-lg hover:bg-rose-50 hover:border-rose-400 transition-colors shadow-lg flex items-center gap-2 group"
            >
                {currentStep === steps.length - 1 ? "Let's Go" : "Next"}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </div>
    );
}
