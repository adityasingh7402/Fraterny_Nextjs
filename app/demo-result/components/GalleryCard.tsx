"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GalleryCardProps {
    cardId: number;
    image: string;
    subtitle: string;
    title: string;
    isActive: boolean;
    isExpanded: boolean;
    onClick: () => void;
    position: "left" | "center" | "right";
}

const GalleryCard = ({ cardId, image, subtitle, title, isActive, isExpanded, onClick, position }: GalleryCardProps) => {
    const [isMobile, setIsMobile] = useState(false);

    // Check if this card should use black text (card id 6)
    const useBlackText = cardId === 6 && isActive;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getTransform = () => {
        if (isExpanded && isActive) {
            return { x: 0, scale: 1, rotateY: 0, z: 100 };
        }
        if (isExpanded && !isActive) {
            return { x: position === "left" ? -300 : 300, scale: 0.6, rotateY: 0, z: -200, opacity: 0 };
        }

        // Mobile transforms - smaller offset, show edges
        if (isMobile) {
            switch (position) {
                case "left":
                    return { x: -160, scale: 0.8, rotateY: 15, z: -80 };
                case "right":
                    return { x: 160, scale: 0.8, rotateY: -15, z: -80 };
                default:
                    return { x: 0, scale: 1, rotateY: 0, z: 0 };
            }
        }

        // Desktop transforms
        switch (position) {
            case "left":
                return { x: -380, scale: 0.8, rotateY: 25, z: -100 };
            case "right":
                return { x: 380, scale: 0.8, rotateY: -25, z: -100 };
            default:
                return { x: 0, scale: 1, rotateY: 0, z: 0 };
        }
    };

    const transform = getTransform();

    // Container size classes
    const getContainerSizeClasses = () => {
        if (isExpanded && isActive) {
            return isMobile
                ? "w-[85vw]"
                : "w-[90vw] max-w-[900px]";
        }
        return isMobile
            ? "w-[75vw]"
            : "w-[450px]";
    };

    // Card (image container) size
    const getCardSizeClasses = () => {
        // When expanded, make image 20% smaller
        if (isExpanded && isActive) {
            return isMobile
                ? "w-[64vw] aspect-[3/4]"  // 20% smaller than 80vw
                : "w-[280px] aspect-[3/4]"; // 20% smaller than 350px
        }
        return "lg:w-[80%] w-[100%] aspect-[3/4]";
    };

    // Get z-index based on position and state
    const getZIndex = () => {
        // Only use z-index for expanded state, otherwise rely on DOM order
        if (isExpanded && isActive) return "z-50";
        return ""; // No z-index, use natural DOM stacking order
    };

    // Get top padding classes for mobile non-expanded state
    const getTopPaddingClasses = () => {
        if (isMobile && !isExpanded) {
            return "pt-16"; // Increased top padding for mobile non-expanded
        }
        return "";
    };

    return (
        <motion.div
            className={`absolute cursor-pointer preserve-3d ${getZIndex()} ${getTopPaddingClasses()}`}
            initial={false}
            animate={{
                x: transform.x,
                scale: transform.scale,
                rotateY: transform.rotateY,
                z: transform.z,
                opacity: transform.opacity ?? 1,
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1,
            }}
            onClick={onClick}
            style={{
                transformStyle: "preserve-3d",
            }}
            whileHover={!isExpanded && isActive ? { scale: 1.02, z: 20 } : {}}
        >
            <div className={`flex ${isExpanded && isActive && !isMobile ? 'flex-row gap-8 items-start' : 'flex-col items-center'} ${getContainerSizeClasses()}`}>
                {/* Header Section - OUTSIDE the white card */}
                {!(isExpanded && isActive && !isMobile) && (
                    <div className="w-full text-center mb-4 md:mb-6">
                        <motion.h1
                            className={`font-gilroy-bold uppercase ${useBlackText ? 'text-black' : 'text-white'}`}
                            initial={false}
                            animate={{
                                fontSize: isExpanded && isActive
                                    ? (isMobile ? "1.5rem" : "3rem")
                                    : (isMobile ? "1.5rem" : "3rem"),
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {subtitle}
                        </motion.h1>
                        <motion.p
                            className={`font-gilroy-regular uppercase ${useBlackText ? 'text-black/80' : 'text-white/80'}`}
                            initial={false}
                            animate={{
                                fontSize: isExpanded && isActive
                                    ? (isMobile ? "0.90rem" : "1rem")
                                    : (isMobile ? "0.80rem" : "1rem"),
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            HOW YOU SEE YOURSELF
                        </motion.p>
                    </div>
                )}

                {/* White Card - Contains ONLY the image */}
                <div className={`clean-card overflow-hidden transition-all duration-500 ${getCardSizeClasses()} ${isExpanded && isActive && !isMobile ? 'flex-shrink-0' : ''}`}>
                    <div className="relative w-full h-full bg-white py-2 rounded-3xl">
                        <motion.img
                            src={image}
                            alt={title}
                            className="w-full h-full object-contain p-2 md:p-3"
                            initial={false}
                            animate={{
                                scale: isExpanded && isActive ? 1 : 1.05,
                            }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* "Know more" text overlay on image */}
                        <div className="absolute bottom-6 left-0 right-0 text-center">
                            <motion.p
                                className="font-gilroy-regular text-white/70 tracking-wider"
                                initial={false}
                                animate={{
                                    fontSize: isExpanded && isActive
                                        ? (isMobile ? "0.60rem" : "1rem")
                                        : (isMobile ? "0.60rem" : "0.875rem"),
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                Know more
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Title Section - OUTSIDE and BELOW the white card (or to the right on desktop when expanded) */}
                <div className={`${isExpanded && isActive && !isMobile ? 'flex-1 text-left' : 'w-full text-center mt-5 md:mt-8'}`}>
                    <motion.h2
                        className={`font-gilroy-bold uppercase tracking-wider ${useBlackText ? 'text-black' : 'text-[#4A90A4] md:text-white'}`}
                        initial={false}
                        animate={{
                            fontSize: isExpanded && isActive
                                ? (isMobile ? "1.5rem" : "3rem")
                                : (isMobile ? "1.5rem" : "2rem"),
                            lineHeight: "1.2",
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {title}
                    </motion.h2>

                    {/* Expanded content */}
                    {isExpanded && isActive && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="overflow-hidden"
                        >
                            {/* Description - 2-3 lines */}
                            <p className={`font-gilroy-regular text-sm md:text-base leading-relaxed mb-4 md:mb-5 ${isMobile ? 'max-w-md mx-auto' : ''} ${useBlackText ? 'text-black/80' : 'text-[#4A90A4]/70 md:text-white/90'}`}>
                                Discover your inner journey through self-reflection and understanding.
                            </p>

                            <p className={`font-gilroy-regular uppercase tracking-[0.15em] text-xs md:text-sm mb-2 md:mb-5 ${useBlackText ? 'text-black/70' : 'text-[#4A90A4] md:text-white/80'}`}>
                                CURRENTLY INCLINED
                            </p>

                            <motion.button
                                className="px-8 md:px-10 py-3 md:py-3.5 bg-[#4A90A4] text-white rounded-full font-gilroy-bold text-sm md:text-base uppercase tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Embercarrier
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Click hint for non-expanded state */}
                    {!isExpanded && isActive && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white/60 text-xs md:text-sm font-gilroy-regular mt-2"
                        >
                            Click to expand
                        </motion.p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default GalleryCard;
