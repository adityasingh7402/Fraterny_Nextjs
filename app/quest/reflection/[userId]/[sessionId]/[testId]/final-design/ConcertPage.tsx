"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { PanInfo as FramerPanInfo } from "framer-motion";
import { LockIcon, ChevronDown } from "lucide-react";

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

interface SignalsData {
    signal1_purpose: string;
    signal2_purpose: string;
    signal3_purpose: string;
    signal4_purpose: string;
    signal1_description: string;
    signal2_description: string;
    signal3_description: string;
    signal4_description: string;
}

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
            <div className="relative z-10 max-w-7xl mx-auto py-12">
                {/* Header */}
                <motion.div
                    className="max-w-7xl mx-auto pb-12">
                    <span className="block text-base sm:text-sm uppercase tracking-[0.3em] text-white/80 mb-4 font-gilroy-medium px-1 sm:px-0">
                        Behavioural Signals
                    </span>
                    <h1 className="text-5xl md:text-7xl font-gilroy-bold tracking-tighter text-white leading-none px-1 sm:px-0">
                        Your <span className="text-white/50">Behavioural</span> Aspects
                    </h1>
                </motion.div>

                {/* <motion.div className="mb-5 flex w-full items-center justify-between">
                    <span className="block text-md uppercase tracking-[0.3em] text-white/70 mb-1"></span>
                    <span className="block text-sm uppercase font-gilroy-bold bg-transparent px-2 py-1 rounded-xl shadow-xl border-2 border-white text-white/70">
                        5 detected
                    </span>
                </motion.div> */}

                {/* Concert List */}
                <div className="space-y-6">
                    {concerts.map((concert, index) => (
                        <motion.div
                            key={concert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => concert.id <= 2 && onSelectConcert(concert)}
                            className="cursor-pointer group"
                        >
                            <div
                                className="flex items-center justify-between pb-4 transition-all duration-300"
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
                                    <p
                                        className="text-xs uppercase tracking-widest inline-flex flex-row items-center gap-2 mt-1 font-gilroy-regular bg-white/20 rounded-full px-3 py-1 mb-4 transition-colors duration-300"
                                        style={{ color: 'hsl(0 0% 100% / 0.6)' }}
                                    >
                                        {concert.date} {concert.id !== 1 && <LockIcon className="w-4 h-4" />}
                                    </p>
                                    <h2
                                        className={`font-gilroy-semibold text-3xl md:text-5xl uppercase tracking-tight leading-none transition-all duration-300 flex items-center gap-3 ${concert.id >= 3 ? 'blur-sm' : ''}`}
                                        style={{ color: 'hsl(0 0% 100%)' }}
                                    >
                                        {concert.band}
                                    </h2>

                                </div>
                                <ChevronDown
                                    className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover:text-white group-hover:translate-y-1 transition-all duration-300 flex-shrink-0"
                                />
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
                    height: '50vh',
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
                <div className="px-6 py-12 overflow-y-auto w-full max-w-7xl mx-auto" style={{ maxHeight: 'calc(95vh - 40px)' }}>
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
                            className={`text-base md:text-xl font-gilroy-regular leading-relaxed text-balance ${concert.id === 1 ? '' : 'blur-[4px]'}`}
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
    signalsData?: SignalsData;
}

const ConcertPage = ({ backgroundColor, signalsData }: ConcertPageProps) => {
    const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

    // Generate concerts array from signals data - only 4 signals from DB
    const concerts: Concert[] = signalsData ? [1, 2, 3, 4].map((id) => ({
        id,
        band: signalsData[`signal${id}_purpose` as keyof SignalsData],
        date: `Signal 0${id}`,
        venue: "Internal",
        city: "Pattern",
        sponsor: "Behavioral Signal",
        price: 0,
        description: signalsData[`signal${id}_description` as keyof SignalsData]
    })) : [];

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
