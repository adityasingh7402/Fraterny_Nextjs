"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CalibrateSectionProps {
    depthScore: number;
    questions: {
        [key: string]: string | string[];
    };
    accentColor?: string;
}

export default function CalibrateSection({ depthScore, questions, accentColor = "#0394A3" }: CalibrateSectionProps) {
    // Extract questions and likert scales
    const questionKeys = Object.keys(questions).filter(key => key.startsWith('question'));

    return (
        <section className="relative w-full py-24 px-6 md:px-12 bg-white text-neutral-900 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4 font-gilroy-medium">
                        Calibrate
                    </span>
                    <h1 className="text-5xl md:text-7xl font-gilroy-bold tracking-tighter text-neutral-900 leading-none">
                        Calibrate Your <span style={{ color: accentColor }}>Depth</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Score / Intro Column */}
                    <div className="col-span-1 lg:col-span-4 sticky top-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100"
                        >
                            <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-gilroy-regular">
                                Current Depth Score
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl font-gilroy-bold text-neutral-900">
                                    {depthScore}
                                </span>
                                <span className="text-xl text-neutral-400 font-gilroy-medium">/ 100</span>
                            </div>
                            <div className="w-full h-1 bg-neutral-200 mt-6 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: accentColor }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${depthScore}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <p className="mt-6 text-neutral-500 text-sm leading-relaxed font-gilroy-regular">
                                Your depth score reflects your current alignment with your inner truth. Adjust the sliders to reflect your current state.
                            </p>
                        </motion.div>
                    </div>

                    {/* Sliders Column */}
                    <div className="col-span-1 lg:col-span-8 flex flex-col gap-12">
                        {questionKeys.map((key, index) => {
                            const questionNumber = index + 1;
                            const likertKey = `likert${questionNumber}`;
                            const likertLabels = questions[likertKey] as [string, string];
                            const questionText = questions[key] as string;

                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <h3 className="text-xl md:text-2xl font-gilroy-medium text-neutral-800 mb-6">
                                        {questionText}
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="relative h-12 flex items-center">
                                            <input
                                                type="range"
                                                min="0"
                                                max="10"
                                                defaultValue="5"
                                                className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer
                                                    focus:outline-none
                                                    [&::-webkit-slider-thumb]:appearance-none
                                                    [&::-webkit-slider-thumb]:w-6
                                                    [&::-webkit-slider-thumb]:h-6
                                                    [&::-webkit-slider-thumb]:rounded-full
                                                    [&::-webkit-slider-thumb]:bg-white
                                                    [&::-webkit-slider-thumb]:border-4
                                                    [&::-webkit-slider-thumb]:cursor-pointer
                                                    [&::-webkit-slider-thumb]:shadow-lg
                                                    [&::-webkit-slider-thumb]:transition-transform
                                                    [&::-webkit-slider-thumb]:duration-200
                                                    [&::-webkit-slider-thumb]:hover:scale-125
                                                    [&::-moz-range-thumb]:w-6
                                                    [&::-moz-range-thumb]:h-6
                                                    [&::-moz-range-thumb]:rounded-full
                                                    [&::-moz-range-thumb]:bg-white
                                                    [&::-moz-range-thumb]:border-4
                                                    [&::-moz-range-thumb]:cursor-pointer
                                                    [&::-moz-range-thumb]:shadow-lg
                                                    [&::-moz-range-thumb]:border-transparent"
                                                style={{
                                                    // We can't easily style the thumb border color dynamically in plain CSS modules/setup without styled-components or CSS variables.
                                                    // So we use accentColor for the "filled" part via a linear gradient trick.
                                                    backgroundImage: `linear-gradient(to right, ${accentColor} 50%, #e5e5e5 50%)`
                                                }}
                                                onInput={(e) => {
                                                    const target = e.target as HTMLInputElement;
                                                    const value = parseInt(target.value);
                                                    const percentage = (value / 10) * 100;
                                                    target.style.backgroundImage = `linear-gradient(to right, ${accentColor} ${percentage}%, #e5e5e5 ${percentage}%)`;
                                                    // Optional: You could update some local state here if you wanted the thumb border to change color too
                                                }}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center font-gilroy-medium text-xs uppercase tracking-wider text-neutral-400">
                                            <span>{likertLabels?.[0] || "Low"}</span>
                                            <span>{likertLabels?.[1] || "High"}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        <div className="flex justify-end pt-8">
                            <button
                                className="px-8 py-4 rounded-full font-gilroy-bold text-white text-sm uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                                style={{ backgroundColor: accentColor }}
                            >
                                Submit Calibration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
