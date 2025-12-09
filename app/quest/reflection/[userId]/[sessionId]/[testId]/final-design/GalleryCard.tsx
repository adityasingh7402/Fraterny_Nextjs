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
    description: string;
    included: string;
    color: string;
    categoryText: string;
}

const GalleryCard = ({ cardId, image, subtitle, title, description, included, color, categoryText, isActive, isExpanded, onClick, position }: GalleryCardProps) => {
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

    // Container size classes - utilizing Tailwind responsive prefixes
    const getContainerSizeClasses = () => {
        if (isExpanded && isActive) {
            return "w-[85vw] md:w-[90vw] md:max-w-[1050px]";
        }
        return "w-[75vw] md:w-[450px]";
    };

    // Card (image container) size
    const getCardSizeClasses = () => {
        // When expanded, make image 20% smaller
        if (isExpanded && isActive) {
            return "w-[64vw] md:w-[380px] aspect-[3/4]";
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
        if (!isExpanded) {
            return "pt-2 md:pt-0"; // Keep pt-2 for mobile, reset to 0 for desktop
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
            <div className={`flex flex-col items-center ${isExpanded && isActive ? 'md:flex-row md:gap-8 md:items-stretch' : ''} ${getContainerSizeClasses()}`}>
                {/* Header Section - OUTSIDE the white card */}
                {/* Logic: Hidden on Desktop if Expanded & Active. Hidden on Mobile if Not Active. */}
                <div className={`w-full text-center mb-4 md:mb-6 ${isExpanded && isActive ? 'md:hidden' : ''} ${!isActive ? 'hidden md:block' : ''}`}>
                    {/* <motion.h1
                        className={`font-gilroy-bold uppercase ${useBlackText ? 'text-black' : 'text-white'}`}
                        initial={false}
                        animate={{
                            fontSize: isExpanded && isActive
                                ? (isMobile ? "2.5rem" : "3rem")
                                : (isMobile ? "2.5rem" : "3rem"),
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {subtitle}
                    </motion.h1> */}
                    <motion.p
                        className={`font-gilroy-semibold tracking-[0.2rem] -mt-3 uppercase ${useBlackText ? 'text-black/80' : 'text-white/80'}`}
                        initial={false}
                        animate={{
                            fontSize: isExpanded && isActive
                                ? (isMobile ? "0.90rem" : "1rem")
                                : (isMobile ? "0.80rem" : "1rem"),
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        {categoryText}
                    </motion.p>
                </div>

                {/* White Card - Contains ONLY the image */}
                <div className={`clean-card overflow-hidden transition-all duration-500 ${getCardSizeClasses()} ${isExpanded && isActive ? 'md:shrink-0' : ''}`}>
                    <div className={`relative w-full h-full py-2 bg-white rounded-3xl ${isExpanded && isActive ? '' : 'py-2'}`}>
                        <motion.img
                            src={image}
                            alt={title}
                            className={`w-full h-full object-contain ${isExpanded && isActive ? 'p-1' : 'p-2 md:p-3'}`}
                            initial={false}
                            animate={{
                                scale: isExpanded && isActive ? 1 : 1.05,
                            }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* "Know more" text overlay on image */}
                        {/* <div className={`absolute bottom-6 left-0 right-0 text-center ${!isActive ? 'hidden md:block' : ''}`}>
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
                        </div> */}
                    </div>
                </div>

                {/* Title Section - OUTSIDE and BELOW the white card (or to the right on desktop when expanded) */}
                <div className={`transition-all duration-500 w-full text-center mt-5 ${isExpanded && isActive ? 'md:flex-1 md:text-left md:bg-white md:rounded-3xl md:p-8 md:flex md:flex-col md:justify-start md:shadow-lg md:mt-0 md:w-auto' : 'md:mt-8'}`}>
                    <div className={`${!isActive ? 'hidden md:block' : ''}`}>
                        <motion.h2
                            className="font-gilroy-bold uppercase"
                            style={{ color: color }}
                            initial={false}
                            animate={{
                                fontSize: isExpanded && isActive
                                    ? (isMobile ? "2rem" : "2.5rem")
                                    : (isMobile ? "2rem" : "2.5rem"),
                                lineHeight: "1.2",
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {title}
                        </motion.h2>
                    </div>

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
                            <p
                                className={`font-gilroy-regular text-sm md:text-base leading-relaxed mb-4 md:mb-5 whitespace-pre-line ${isMobile ? 'max-w-md mx-auto' : ''}`}
                                style={{ color: '#000000' }}
                            >
                                {description}
                            </p>

                            <p
                                className="font-gilroy-regular uppercase tracking-[0.15em] text-xs md:text-sm mb-2 md:mb-5"
                                style={{ color: color, opacity: 0.8 }}
                            >
                                CURRENTLY INCLINED
                            </p>

                            <motion.button
                                className="px-8 md:px-10 py-3 md:py-3.5 text-white rounded-full font-gilroy-regular text-base uppercase"
                                style={{ backgroundColor: color }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {included}
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Click hint for non-expanded state */}
                    {!isExpanded && isActive && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xs md:text-sm font-gilroy-regular mt-2"
                            style={{ color: color, opacity: 0.6 }}
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
