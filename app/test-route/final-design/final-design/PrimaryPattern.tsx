"use client";

import { motion } from "framer-motion";

interface PrimaryPatternProps {
    coreLine: string;
    pattern: string;
    backgroundColor?: string;
}

export default function PrimaryPattern({ coreLine, pattern, backgroundColor = 'hsl(220,20%,8%)' }: PrimaryPatternProps) {
    return (
        <section
            className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-12 text-white overflow-hidden transition-colors duration-500 ease-in-out"
            style={{ backgroundColor }}
        >
            {/* Background Gradient/Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Primary Pattern Column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col"
                >
                    <span className="block text-sm uppercase tracking-[0.3em] text-white/60 mb-4 font-gilroy-medium">
                        Primary Pattern
                    </span>
                    <h1 className="text-5xl md:text-7xl font-gilroy-bold tracking-tighter text-white mb-8 leading-none">
                        Your <span className="text-white/50 transition-colors duration-500">Primary</span> Pattern
                    </h1>
                    <div className=" text-white leading-normal font-gilroy-regular text-lg md:text-xl">
                        <p>{pattern}</p>
                    </div>
                </motion.div>

                {/* Core Line Column - styled as a card or highlight */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent blur-sm opacity-50" />
                    <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-2xl transition-colors duration-500">
                        <span
                            className="block text-xs uppercase tracking-[0.3em] mb-6 font-gilroy-bold transition-colors duration-500"
                            style={{ color: backgroundColor }}
                        >
                            Core Line
                        </span>

                        <blockquote
                            className="text-2xl md:text-3xl font-gilroy-medium leading-normal mb-6 transition-colors duration-500"
                            style={{ color: backgroundColor }}
                        >
                            "{coreLine}"
                        </blockquote>

                        <div
                            className="w-12 h-1 mb-6 transition-colors duration-500"
                            style={{ backgroundColor: backgroundColor }}
                        />

                        <p
                            className="text-sm uppercase tracking-widest font-gilroy-regular transition-colors duration-500"
                            style={{ color: backgroundColor, opacity: 0.6 }}
                        >
                            Essence of your path
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
