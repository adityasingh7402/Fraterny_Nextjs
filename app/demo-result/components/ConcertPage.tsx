"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { PanInfo as FramerPanInfo } from "framer-motion";

// Types
interface Concert {
    id: number;
    band: string;
    date: string;
    venue: string;
    city: string;
    sponsor: string;
    price: number;
    description: string;
}

// Sample data
const signalsData: any = {
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
};

const concerts: Concert[] = [1, 2, 3, 4, 5].map((id) => ({
    id,
    band: signalsData[`signal${id}_purpose`],
    date: `Signal 0${id}`,
    venue: "Internal",
    city: "Pattern",
    sponsor: "Behavioral Signal",
    price: 0,
    description: signalsData[`signal${id}_description`]
}));

// Inline styles for the page
const styles = `
  .concert-page {
    --primary: 220 100% 50%;
    --primary-foreground: 0 0% 100%;
    --foreground: 0 0% 100%;
    --background: 220 20% 8%;
    --muted: 220 15% 25%;
    --accent: 280 100% 60%;
    
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: 'Gilroy-Regular', system-ui, -apple-system, sans-serif;
  }
  
  .concert-page * {
    box-sizing: border-box;
  }
`;

// Concert List Component
const ConcertList = ({
    concerts,
    onSelectConcert,
    backgroundColor = '#0394A3'
}: {
    concerts: Concert[];
    onSelectConcert: (concert: Concert) => void;
    backgroundColor?: string;
}) => {
    return (
        <div className="h-auto p-6 relative overflow-hidden concert-page" style={{ background: backgroundColor, transition: 'background-color 0.5s ease' }}>
            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto pt-12">

                {/* Concert List */}
                <div className="space-y-6">
                    {concerts.map((concert, index) => (
                        <motion.div
                            key={concert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => onSelectConcert(concert)}
                            className="cursor-pointer group"
                        >
                            <div
                                className="flex items-baseline justify-between pb-4 transition-all duration-300"
                                style={{
                                    borderBottom: '1px solid hsl(0 0% 100% / 0.2)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderBottomColor = 'hsl(0 0% 100% / 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderBottomColor = 'hsl(0 0% 100% / 0.2)';
                                }}
                            >
                                <div>
                                    <h2
                                        className="font-gilroy-bold text-3xl md:text-5xl uppercase tracking-tight leading-none transition-all duration-300"
                                        style={{ color: 'hsl(0 0% 100%)' }}
                                    >
                                        {concert.band}
                                    </h2>
                                    <p
                                        className="text-xs uppercase tracking-widest mt-1 font-gilroy-regular"
                                        style={{ color: 'hsl(0 0% 100% / 0.6)' }}
                                    >
                                        {concert.date}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Concert Detail Component
const ConcertDetail = ({
    concert,
    onBack,
    backgroundColor = '#0492A9'
}: {
    concert: Concert;
    onBack: () => void;
    backgroundColor?: string;
}) => {
    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.y > 100 || info.velocity.y > 500) {
            onBack();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 concert-page"
            style={{ background: 'hsl(220 20% 8% / 0.8)' }}
            onClick={onBack}
        >
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={handleDragEnd}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden"
                style={{
                    background: backgroundColor,
                    maxHeight: '85vh',
                    transition: 'background-color 0.5s ease'
                }}
            >
                {/* Drag Handle */}
                <div className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing">
                    <div
                        className="w-12 h-1.5 rounded-full"
                        style={{ background: 'hsl(0 0% 100% / 0.3)' }}
                    />
                </div>

                {/* Content */}
                <div className="px-6 pb-12 overflow-y-auto w-full max-w-7xl mx-auto" style={{ maxHeight: 'calc(85vh - 40px)' }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 mt-4"
                    >
                        <h1
                            className="font-gilroy-bold text-4xl md:text-6xl uppercase leading-none mb-4"
                            style={{ color: 'hsl(0 0% 100%)' }}
                        >
                            {concert.band}
                        </h1>
                        {/* <p
                            className="text-sm uppercase tracking-widest font-gilroy-regular"
                            style={{ color: 'white' }}
                        >
                            Signal Detected
                        </p> */}
                    </motion.div>

                    {/* Description Only */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <p
                            className="text-base md:text-xl font-gilroy-regular leading-relaxed text-balance"
                            style={{ color: 'hsl(0 0% 100% / 0.9)' }}
                        >
                            {concert.description}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Main Page Component
interface ConcertPageProps {
    backgroundColor?: string;
}

const ConcertPage = ({ backgroundColor }: ConcertPageProps) => {
    const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

    return (
        <>
            <style>{styles}</style>
            <div className="concert-page">
                <ConcertList
                    concerts={concerts}
                    onSelectConcert={setSelectedConcert}
                    backgroundColor={backgroundColor}
                />

                <AnimatePresence>
                    {selectedConcert && (
                        <ConcertDetail
                            concert={selectedConcert}
                            onBack={() => setSelectedConcert(null)}
                            backgroundColor={backgroundColor}
                        />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default ConcertPage;
