"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavigationArrowsProps {
    onPrev: () => void;
    onNext: () => void;
    isExpanded: boolean;
}

const NavigationArrows = ({ onPrev, onNext, isExpanded }: NavigationArrowsProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Hide navigation arrows on mobile (users can swipe or tap side cards)
    if (isMobile && !isExpanded) {
        return null;
    }

    return (
        <>
            {/* Left Arrow - hidden on mobile */}
            {!isMobile && (
                <motion.button
                    className="nav-button fixed left-8 top-1/2 -translate-y-1/2 z-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isExpanded ? 0 : 1, x: isExpanded ? -20 : 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>
            )}

            {/* Right Arrow - hidden on mobile */}
            {!isMobile && (
                <motion.button
                    className="nav-button fixed right-8 top-1/2 -translate-y-1/2 z-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isExpanded ? 0 : 1, x: isExpanded ? 20 : 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
            )}
        </>
    );
};

export default NavigationArrows;
