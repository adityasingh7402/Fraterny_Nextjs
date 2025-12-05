'use client';

import Gallery3D from "./components/Gallery3D";
import ConcertPage from './components/ConcertPage';
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
    const [activeCardColor, setActiveCardColor] = useState<string>('#0394A3');

    return (
        <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-white">

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

            {/* Gallery3D Section - Fixed height */}
            <div className="relative w-full h-screen overflow-hidden bg-[#4A90A4]">
                <Gallery3D onColorChange={setActiveCardColor} />
            </div>

            {/* Primary Pattern Section */}
            <div className='relative w-full max-w-screen pt-18 p-10 bg-neutral-400'>
                <motion.h1 className="mb-5 text-left">
                    <span className="block text-sm uppercase tracking-[0.3em] text-neutral-600 mb-1">Primary Pattern</span>
                    <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                        Your <span className='transition-colors duration-500' style={{ color: activeCardColor }}>Primary</span> Pattern
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
            <ConcertPage backgroundColor={activeCardColor} />
        </div>
    );
}
