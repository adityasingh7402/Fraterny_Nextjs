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
    existingLikertData?: {
        q1?: number;
        q2?: number;
        q3?: number;
        q4?: number;
        q5?: number;
    };
}

export default function CalibrateSection({
    depthScore: initialDepthScore,
    questions,
    accentColor = "#0394A3",
    hasAutoTriggered = false,
    onFeedbackTrigger,
    testId,
    existingLikertData
}: CalibrateSectionProps) {
    // Extract questions and likert scales
    const questionKeys = Object.keys(questions).filter(key => key.startsWith('question'));
    const sectionRef = useRef<HTMLElement>(null);
    const hasTriggeredRef = useRef(false);
    const initializedRef = useRef(false);

    // Initialize slider values from DB data or default to 5
    const getInitialSliderValues = () => {
        if (existingLikertData) {
            return {
                q1: existingLikertData.q1 ?? 5,
                q2: existingLikertData.q2 ?? 5,
                q3: existingLikertData.q3 ?? 5,
                q4: existingLikertData.q4 ?? 5
            };
        }
        return { q1: 5, q2: 5, q3: 5, q4: 5 };
    };

    // State for slider values
    const [sliderValues, setSliderValues] = useState(getInitialSliderValues());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate initial depth score with DB bonuses
    const calculateInitialDepthScore = () => {
        let baseScore = Number(initialDepthScore) || 0;

        if (existingLikertData) {
            // Add +2 for each slider that has a value different from 5 in DB
            let bonusCount = 0;

            if (existingLikertData.q1 !== undefined && existingLikertData.q1 !== 5) {
                bonusCount++;
            }
            if (existingLikertData.q2 !== undefined && existingLikertData.q2 !== 5) {
                bonusCount++;
            }
            if (existingLikertData.q3 !== undefined && existingLikertData.q3 !== 5) {
                bonusCount++;
            }
            if (existingLikertData.q4 !== undefined && existingLikertData.q4 !== 5) {
                bonusCount++;
            }

            if (bonusCount > 0) {
                console.log(`📊 Adding +${bonusCount * 2} to initial depth score for ${bonusCount} non-5 sliders`);
                baseScore += (bonusCount * 2);
            }
        }

        return baseScore;
    };

    // Ensure depthScore is always a number, with DB bonuses applied
    const [depthScore, setDepthScore] = useState(calculateInitialDepthScore());

    // Initialize touched sliders for those that already have non-5 values in DB
    const getInitialTouchedSliders = () => {
        const touched = new Set<string>();

        if (existingLikertData) {
            if (existingLikertData.q1 !== undefined && existingLikertData.q1 !== 5) {
                touched.add('q1');
            }
            if (existingLikertData.q2 !== undefined && existingLikertData.q2 !== 5) {
                touched.add('q2');
            }
            if (existingLikertData.q3 !== undefined && existingLikertData.q3 !== 5) {
                touched.add('q3');
            }
            if (existingLikertData.q4 !== undefined && existingLikertData.q4 !== 5) {
                touched.add('q4');
            }
        }

        return touched;
    };

    const [touchedSliders, setTouchedSliders] = useState<Set<string>>(getInitialTouchedSliders());
    // Also mark bonus as applied for sliders that got it from DB
    const [bonusApplied, setBonusApplied] = useState<Set<string>>(getInitialTouchedSliders());

    // Log initialization for debugging
    useEffect(() => {
        if (!initializedRef.current) {
            console.log('🎯 Calibration Section Initialized');
            console.log('📊 Existing Likert Data:', existingLikertData);
            console.log('📊 Initial Slider Values:', sliderValues);
            console.log('📊 Initial Depth Score:', depthScore);
            console.log('🔒 Pre-touched sliders (from DB):', Array.from(touchedSliders));
            console.log('🆕 Remaining sliders can still get +2 bonus on first interaction');
            initializedRef.current = true;
        }
    }, [existingLikertData, sliderValues, initialDepthScore, depthScore, touchedSliders]);

    const handleSubmitCalibration = async () => {
        if (!testId) {
            toast.error('Test ID not found', { position: "top-right" });
            return;
        }

        setIsSubmitting(true);
        let shouldTriggerFeedback = false;

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
                toast.success(response.data.Message || 'Psych File successfully updated', {
                    position: "top-right"
                });
                shouldTriggerFeedback = true;
            } else {
                toast.error(response.data.Message || 'Failed to update', {
                    position: "top-right"
                });
                shouldTriggerFeedback = true;
            }
        } catch (error: any) {
            console.error('Calibration submission error:', error);
            toast.error(error?.response?.data?.Message || 'Failed to update calibration', {
                position: "top-right"
            });
            shouldTriggerFeedback = true;
        } finally {
            setIsSubmitting(false);

            // Trigger feedback popup after 2 seconds regardless of success or failure
            if (shouldTriggerFeedback && onFeedbackTrigger && !hasTriggeredRef.current && !hasAutoTriggered) {
                setTimeout(() => {
                    if (onFeedbackTrigger && !hasTriggeredRef.current && !hasAutoTriggered) {
                        hasTriggeredRef.current = true;
                        onFeedbackTrigger();
                        console.log('✅ Feedback popup triggered after compilation attempt');
                    }
                }, 2000);
            }
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
                    <span className="block text-base sm:text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4 font-gilroy-medium">
                        Data density Index
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
                                Current Depth Index
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl md:text-7xl font-gilroy-bold" style={{ color: accentColor }}>
                                    {Math.min(100, depthScore)}
                                </span>
                                <span className="text-xl md:text-2xl text-neutral-400 font-gilroy-medium">/ 100</span>
                            </div>
                            <div className="w-full h-1 bg-neutral-200 mt-6 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: accentColor }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.min(100, depthScore)}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <p className="mt-6 text-neutral-500 text-sm leading-relaxed font-gilroy-regular">
                                This index calculates the density of the psychological data you provided. It represents the difference between a surface scan and a deep-core extraction of your behavioral patterns.  Users with Depth Index greater than 70 love their unique psychological file.
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
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl md:text-2xl font-gilroy-medium text-neutral-800">
                                            {questionText}
                                        </h3>
                                        {bonusApplied.has(`q${questionNumber}`) && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 15
                                                }}
                                                className="text-2xl font-gilroy-bold"
                                                style={{ color: accentColor }}
                                            >
                                                +2
                                            </motion.span>
                                        )}
                                    </div>

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
                                                    const questionKey = `q${questionNumber}`;

                                                    // Check if this is the first touch of this slider
                                                    const isFirstTouch = !touchedSliders.has(questionKey);

                                                    console.log(`\n🎯 Slider ${questionKey} interaction:`, {
                                                        value,
                                                        isFirstTouch,
                                                        currentDepthScore: depthScore,
                                                        touchedSliders: Array.from(touchedSliders)
                                                    });

                                                    // Apply +2 bonus if:
                                                    // 1. This is the first touch
                                                    // 2. The value is NOT 5
                                                    if (isFirstTouch && value !== 5) {
                                                        console.log(`✅ APPLYING +2 BONUS!`);

                                                        // Add +2 to depth score ONLY (not to slider)
                                                        const newDepthScore = depthScore + 2;
                                                        setDepthScore(newDepthScore);

                                                        // Set slider to the actual dragged value (smooth)
                                                        setSliderValues(prev => ({
                                                            ...prev,
                                                            [questionKey]: value
                                                        }));

                                                        // Mark this slider as touched
                                                        setTouchedSliders(prev => new Set(prev).add(questionKey));

                                                        // Mark bonus as applied for this slider
                                                        setBonusApplied(prev => new Set(prev).add(questionKey));

                                                        console.log(`🎯 ${questionKey}: slider=${value}, Depth: ${depthScore} → ${newDepthScore} (+2 bonus)`);
                                                    } else {
                                                        if (!isFirstTouch) {
                                                            console.log(`⏭️ Skipping bonus - slider already touched`);
                                                        } else if (value === 5) {
                                                            console.log(`⏭️ Skipping bonus - value is 5`);
                                                        }

                                                        // Normal slider update without bonus
                                                        setSliderValues(prev => ({
                                                            ...prev,
                                                            [questionKey]: value
                                                        }));
                                                    }
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
                                {isSubmitting ? 'Submitting...' : 'Compile My Artifact'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
