'use client';

import Gallery3D from "./components/Gallery3D";
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, LockIcon } from 'lucide-react';
import { useState } from 'react';

export const mockData = {
    "archetype": {
        "self": "Soul Cartographer",
        "world": "Quiet Prodigy",
        "aspiration": "Hopewright"
    },
    "core_line": "You keep reaching for a life built on quiet presence, yet when uncertainty rises you almost automatically reach back for the old proof-by-effort script that once kept you safe.",
    "primary_pattern": "You see yourself as someone who is here to map inner worlds and turn suffering into understanding. In daily life, others meet the reliable, undemanding achiever who rarely shows how much weight you carry inside. What pulls you forward is a simple but demanding wish: to live from embodied peace, abroad if needed, and to let spiritual practice shape your days instead of fear. The live tension is between trusting this slower, riskier path and the fast, familiar comfort of working harder than you actually want to.",
    "slider_question": {
        "question1": "When you slow down and rest, do you start to feel guilty inside?",
        "question2": "Right now, how hard is it for you to ask someone for help?",
        "question3": "How much do you feel torn between family duty and your own path?",
        "question4": "Do you feel your spiritual ideas and your daily life actually match?",
        "likert1": ["Not at all", "Very much"],
        "likert2": ["Not Hard", "Very Hard"],
        "likert3": ["Doesn't matter", "Matters a lot"],
        "likert4": ["Never", "Always"]
    },
    "signals": {
        "signal1_purpose": "Work-as-safety autopilot",
        "signal2_purpose": "Disappearing needs",
        "signal3_purpose": "Deferred grief",
        "signal4_purpose": "Concepts as armor",
        "signal5_purpose": "Conditional freedom plan",
        "signal1_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal2_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal3_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal4_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal5_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want."
    },
    "depth_score": 42
};

export default function DemoResultPage() {
    const [clickedbuttonId, setClickedButtonId] = useState<string | null>(null);

    return (
        <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-white">
            {/* Gallery3D Section - Fixed height */}
            <div className="relative w-full h-screen overflow-hidden bg-[#4A90A4]">
                <Gallery3D />
            </div>
            {/* Core Line Section */}
            <div className='relative w-full max-w-screen mx-auto pt-18 p-10 bg-white'>
                <motion.h1 className="mb-5 text-left">
                    <span className="block text-sm uppercase tracking-[0.3em] text-black mb-1">Core line</span>
                    <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                        Core Line of You
                    </span>
                    <div className="mt-6">
                        <p className="text-black/80 text-lg font-gilroy-bold">{mockData.core_line}</p>
                    </div>
                </motion.h1>
            </div>

            {/* Primary Pattern Section */}
            <div className='relative w-full max-w-screen pt-18 p-10 bg-neutral-400'>
                <motion.h1 className="mb-5 text-left">
                    <span className="block text-sm uppercase tracking-[0.3em] text-neutral-600 mb-1">Primary Pattern</span>
                    <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                        Your <span className='text-neutral-200'>Primary</span> Pattern
                    </span>
                    <div className="mt-6">
                        <p className="text-black/80 text-lg font-gilroy-regular">{mockData.primary_pattern}</p>
                    </div>
                </motion.h1>
            </div>

            {/* Calibrate Section */}
            <div className='relative w-full max-w-screen pt-18 p-10 bg-white'>
                <motion.h1 className="mb-5 text-left">
                    <span className="block text-sm uppercase tracking-[0.3em] text-black mb-1">Calibrate</span>
                    <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                        Calibrate Your Depth
                    </span>
                </motion.h1>

                <div className="relative w-full max-w-[480px] mx-auto pt-4">
                    <motion.div className="mb-5 flex w-full items-center justify-between">
                        <span className="block text-md uppercase tracking-[0.3em] text-black/70 mb-1"> </span>
                        <span className="block text-sm font-gilroy-bold bg-transparent px-2 py-1 rounded-xl shadow-xl border-2 border-black text-black/70">
                            DEPTH SCORE - {mockData?.depth_score || 10}
                        </span>
                    </motion.div>

                    <div className="flex flex-col gap-8">
                        {Object.keys(mockData.slider_question)
                            .filter(key => key.startsWith('question'))
                            .map((key, index) => {
                                const questionNumber = index + 1;
                                const likertKey = `likert${questionNumber}` as keyof typeof mockData.slider_question;
                                const likertLabels = mockData.slider_question[likertKey] as [string, string];

                                return (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className=""
                                    >
                                        <h3 className="text-black text-lg font-gilroy-semibold">
                                            {mockData.slider_question[key as keyof typeof mockData.slider_question]}
                                        </h3>

                                        <div className="space-y-1">
                                            <div className="relative">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="10"
                                                    className="w-full h-2 bg-black rounded-full appearance-none cursor-pointer
                                                        [&::-webkit-slider-thumb]:appearance-none
                                                        [&::-webkit-slider-thumb]:w-6
                                                        [&::-webkit-slider-thumb]:h-6
                                                        [&::-webkit-slider-thumb]:rounded-full
                                                        [&::-webkit-slider-thumb]:bg-black
                                                        [&::-webkit-slider-thumb]:cursor-pointer
                                                        [&::-webkit-slider-thumb]:shadow-lg
                                                        [&::-moz-range-thumb]:w-6
                                                        [&::-moz-range-thumb]:h-6
                                                        [&::-moz-range-thumb]:rounded-full
                                                        [&::-moz-range-thumb]:bg-black
                                                        [&::-moz-range-thumb]:cursor-pointer
                                                        [&::-moz-range-thumb]:border-0
                                                        [&::-moz-range-thumb]:shadow-lg"
                                                    style={{
                                                        background: `linear-gradient(to right, #000000 80%, rgba(0,0,0,0.1) 70%)`
                                                    }}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const numericValue = parseInt(value);
                                                        const percentage = (numericValue / 10) * 100;
                                                        e.target.style.background = `linear-gradient(to right, #000000 ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-between items-center font-gilroy-light">
                                                <span className="text-neutral-900 text-sm uppercase tracking-wider">
                                                    {likertLabels[0]}
                                                </span>
                                                <span className="text-neutral-900 text-sm uppercase tracking-wider">
                                                    {likertLabels[1]}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                    </div>

                    <div className='flex w-full justify-end mt-10'>
                        <button
                            className='block text-sm font-gilroy-bold bg-transparent px-2 py-1 rounded-xl shadow-xl border-2 border-black text-black/70 hover:bg-black/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {/* Behaviour Signals Section */}
            <div className='relative w-full max-w-screen pt-18 p-10 bg-sky-900'>
                <motion.h1 className="mb-5 text-left">
                    <span className="block text-sm uppercase tracking-[0.3em] text-white mb-1">Calibrate</span>
                    <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-100">
                        Behaviour Signals
                    </span>
                </motion.h1>
                <motion.div className="mb-5 flex w-full items-center justify-between">
                    <span className="block text-md uppercase tracking-[0.3em] text-white/70 mb-1"></span>
                    <span className="block text-sm uppercase font-gilroy-bold bg-transparent px-2 py-1 rounded-xl shadow-xl border-2 border-white text-white/70">
                        5 detected
                    </span>
                </motion.div>

                <div className='w-full flex justify-center overflow-hidden'>
                    <svg className="w-full max-w-md" viewBox="0 0 664 744" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 134 344 Q 240 180 330 110" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                        <path d="M 134 344 Q 300 300 450 250" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                        <path d="M 134 344 Q 300 380 460 410" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                        <path d="M 134 344 Q 220 480 293 573" stroke="#0ea5e9" strokeWidth="2" fill="none" />

                        {/* Top node */}
                        <circle cx="330" cy="110" r="20" fill="#f8fafc" />

                        {/* Right top node */}
                        <circle cx="450" cy="250" r="16" fill="#f8fafc" />

                        {/* Right bottom node */}
                        <circle cx="460" cy="410" r="14" fill="#f8fafc" />

                        {/* Bottom node */}
                        <circle cx="293" cy="573" r="14" fill="#f8fafc" />

                        {/* Center node (largest) */}
                        <circle cx="134" cy="344" r="28" fill="#f8fafc" />

                        {/* Text labels */}
                        <text x="332" y="50" fontFamily="Arial, sans-serif" fontSize="24" fill="#e5e5e5" textAnchor="middle">
                            Building confidence in public speaking
                        </text>

                        <text x="450" y="300" fontFamily="Arial, sans-serif" fontSize="22" fill="#e5e5e5" textAnchor="middle">
                            Exploring new hobbies
                        </text>

                        <text x="460" y="460" fontFamily="Arial, sans-serif" fontSize="22" fill="#e5e5e5" textAnchor="middle">
                            Managing digital screen time
                        </text>

                        <text x="293" y="635" fontFamily="Arial, sans-serif" fontSize="22" fill="#e5e5e5" textAnchor="middle">
                            Feeling grateful for time with family
                        </text>

                        <text x="1" y="395" fontFamily="Arial, sans-serif" fontSize="20" fill="#e5e5e5" textAnchor="start">
                            Anxiety due to changing work
                        </text>
                    </svg>
                </div>
            </div>
        </div>
    );
}
