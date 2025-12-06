'use client';

import Gallery3D from "./components/Gallery3D";
import ConcertPage from './components/ConcertPage';
import PrimaryPattern from './components/PrimaryPattern';
import CalibrateSection from './components/CalibrateSection';
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

            {/* Gallery3D Section - Fixed height */}
            <div className="relative w-full h-screen overflow-hidden bg-[#4A90A4]"
                style={{ backgroundColor: activeCardColor, transition: 'background-color 0.5s ease' }}>
                <Gallery3D onColorChange={setActiveCardColor} />
            </div>

            {/* Primary Pattern & Core Line Section */}
            <PrimaryPattern
                coreLine={mockData.core_line}
                pattern={mockData.primary_pattern}
                backgroundColor={activeCardColor}
            />

            {/* Calibrate Section */}
            <CalibrateSection
                depthScore={mockData?.depth_score || 0}
                questions={mockData.slider_question}
                accentColor={activeCardColor}
            />

            {/* Behaviour Signals Section */}
            <ConcertPage backgroundColor={activeCardColor} />
        </div>
    );
}
