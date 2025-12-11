"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { toast } from 'sonner';

interface CalibrateSectionProps {
    depthScore: number;
    questions: {
        [key: string]: string | string[];
    };
    accentColor?: string;
    hasAutoTriggered?: boolean;
    onFeedbackTrigger?: () => void;
    testId?: string;
}

export default function CalibrateSection({ depthScore, questions, accentColor = "#0394A3", hasAutoTriggered = false, onFeedbackTrigger, testId }: CalibrateSectionProps) {
    // Extract questions and likert scales
    const questionKeys = Object.keys(questions).filter(key => key.startsWith('question'));
    const sectionRef = useRef<HTMLElement>(null);
    const hasTriggeredRef = useRef(false);

    // State for slider values (default to middle value 5)
    const [sliderValues, setSliderValues] = useState({ q1: 5, q2: 5, q3: 5, q4: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Trigger feedback popup when section comes into view
    useEffect(() => {
        if (!onFeedbackTrigger || hasAutoTriggered || hasTriggeredRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTriggeredRef.current && !hasAutoTriggered) {
                        // Wait 2 seconds after section is in view
                        setTimeout(() => {
                            if (onFeedbackTrigger && !hasTriggeredRef.current && !hasAutoTriggered) {
                                hasTriggeredRef.current = true;
                                onFeedbackTrigger();
                            }
                        }, 2000);
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% of section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [onFeedbackTrigger, hasAutoTriggered]);

    const handleSubmitCalibration = async () => {
        if (!testId) {
            toast.error('Test ID not found', { position: "top-right" });
            return;
        }

        setIsSubmitting(true);
        try {
            console.log('Submitting calibration:', sliderValues, testId);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/likert/`, {
                test_id: testId,
                q1: String(sliderValues.q1),
                q2: String(sliderValues.q2),
                q3: String(sliderValues.q3),
                q4: String(sliderValues.q4)
            });

            console.log('Calibration response:', response.data);

            if (response.data.status === 200) {
                toast.success(response.data.Message || 'Successfully updated calibration', {
                    position: "top-right"
                });
            } else {
                toast.error(response.data.Message || 'Failed to update', {
                    position: "top-right"
                });
            }
        } catch (error: any) {
            console.error('Calibration submission error:', error);
            toast.error(error?.response?.data?.Message || 'Failed to update calibration', {
                position: "top-right"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full py-24 px-6 md:px-12 bg-white text-neutral-900 overflow-hidden">
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
                    <div className="col-span-1 lg:col-span-5 sticky top-10">
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
                                <span className="text-6xl md:text-7xl font-gilroy-bold" style={{ color: accentColor }}>
                                    {depthScore}
                                </span>
                                <span className="text-xl md:text-2xl text-neutral-400 font-gilroy-medium">/ 100</span>
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
                    <div className="col-span-1 lg:col-span-7 flex flex-col gap-12">
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
                                                value={sliderValues[`q${questionNumber}` as keyof typeof sliderValues]}
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
                                                    backgroundImage: `linear-gradient(to right, ${accentColor} ${(sliderValues[`q${questionNumber}` as keyof typeof sliderValues] / 10) * 100}%, #e5e5e5 ${(sliderValues[`q${questionNumber}` as keyof typeof sliderValues] / 10) * 100}%)`
                                                }}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    setSliderValues(prev => ({
                                                        ...prev,
                                                        [`q${questionNumber}`]: value
                                                    }));
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
                                onClick={handleSubmitCalibration}
                                disabled={isSubmitting}
                                className="px-8 py-4 rounded-full font-gilroy-bold text-white text-sm uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: accentColor }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Calibration'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
