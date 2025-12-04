"use client";

import { motion } from "framer-motion";

interface IndicatorsProps {
    total: number;
    current: number;
    isExpanded: boolean;
}

const Indicators = ({ total, current, isExpanded }: IndicatorsProps) => {
    return (
        <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: isExpanded ? 0 : 1,
                y: isExpanded ? 20 : 0
            }}
            transition={{ duration: 0.3 }}
        >
            {Array.from({ length: total }).map((_, index) => (
                <motion.div
                    key={index}
                    className="relative"
                    initial={false}
                    animate={{
                        scale: current === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index
                                ? "bg-white"
                                : "bg-white/30"
                            }`}
                    />
                    {current === index && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white"
                            layoutId="indicator"
                            initial={false}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.5 }}
                            style={{ opacity: 0.3 }}
                        />
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Indicators;
