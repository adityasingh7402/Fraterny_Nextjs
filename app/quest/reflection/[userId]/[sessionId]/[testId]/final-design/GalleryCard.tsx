"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    description: React.ReactNode;
    included: string;
    color: string;
    categoryText: string;
    categoryHeading?: string;
}

const GalleryCard = ({ cardId, image, subtitle, title, description, included, color, categoryText, categoryHeading, isActive, isExpanded, onClick, position }: GalleryCardProps) => {
    const [isMobile, setIsMobile] = useState(false);

    // Check if this card should use black text (card id 6)
    const useBlackText = cardId === 6 && isActive;

    // Check if this is The Free Spirit card (#545454) - should use card color instead of white
    const useFreeSpirit = color === '#545454';

    // Determine heading text color
    const getHeadingColor = () => {
        if (useBlackText) return 'text-black';
        if (useFreeSpirit) return 'text-[#545454]';
        return 'text-white';
    };

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
                layout: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                },
                default: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                }
            }}
            onClick={onClick}
            style={{
                transformStyle: "preserve-3d",
            }}
            whileHover={!isExpanded && isActive ? { scale: 1.01, z: 20 } : {}}
        >
            <motion.div layout className={`flex flex-col items-center ${isExpanded && isActive ? 'md:flex-row md:gap-8 md:items-stretch' : ''} ${getContainerSizeClasses()}`}>
                {/* Header Section - OUTSIDE the white card */}
                {/* Mobile: Only show on active card. Desktop:Always show unless expanded & active */}
                <motion.div layout
                    layoutId={`card-header-${cardId}`} className={`w-full text-center mb-4 md:mb-6 
                    ${!isActive ? 'hidden' : ''} 
                    ${isExpanded && isActive ? 'md:hidden' : 'md:block'}`}>
                    {/* Category Heading (e.g., "ASPIRATION") */}
                    {categoryHeading && (
                        <motion.h1
                            layout
                            layoutId={`card-heading-${cardId}`}
                            className={`font-gilroy-bold uppercase ${getHeadingColor()}`}
                            initial={false}
                            animate={{
                                fontSize: isExpanded && isActive
                                    ? (isMobile ? "2.5rem" : "3rem")
                                    : (isMobile ? "2.5rem" : "3rem"),
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {categoryHeading}
                        </motion.h1>
                    )}
                    {/* Category Subheading (e.g., "HOW YOU ASPIRE TO BE") */}
                    <motion.p
                        layout
                        layoutId={`card-subheading-${cardId}`}
                        className={`font-gilroy-regular tracking-[0.2rem] -mt-3 uppercase ${useBlackText ? 'text-black/80' :
                            useFreeSpirit ? 'text-[#545454]/80' :
                                'text-white/80'
                            }`}
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
                </motion.div>

                {/* White Card - Contains ONLY the image */}
                <motion.div layout
                    layoutId={`card-image-${cardId}`} className={`clean-card overflow-hidden ${getCardSizeClasses()} ${isExpanded && isActive ? 'md:shrink-0' : ''}`}>
                    <motion.div layout className={`relative w-full h-full py-2 bg-white rounded-3xl ${isExpanded && isActive ? '' : 'py-2'}`}>
                        <motion.img
                            layout
                            layoutId={`card-img-${cardId}`}
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
                    </motion.div>
                </motion.div>

                {/* Title Section - OUTSIDE and BELOW the white card (or to the right on desktop when expanded) */}
                <motion.div layout layoutId={`card-title-section-${cardId}`} className={`w-full text-center mt-5 ${isExpanded && isActive ? 'md:flex-1 md:text-left md:bg-white md:rounded-3xl md:p-8 md:flex md:flex-col md:justify-start md:shadow-lg md:mt-0 md:w-auto' : 'md:mt-8'}`}>
                    <div className={`${!isActive ? 'hidden md:block' : ''}`}>
                        <motion.h2
                            layout
                            layoutId={`card-title-${cardId}`}
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
                    <AnimatePresence mode="wait">
                        {isExpanded && isActive && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                    layout: { duration: 0.3 },
                                    opacity: { duration: 0.3 },
                                    height: { duration: 0.3, delay: 0.1 }
                                }}
                                className="overflow-hidden"
                            >
                                {/* Description - formatted JSX content */}
                                <motion.div
                                    initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                    exit={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                                    transition={{ duration: 0.3, delay: 0.20 }}
                                    className={`font-gilroy-regular text-sm md:text-base leading-relaxed mb-4 md:mb-5 ${isMobile ? 'max-w-md mx-auto' : ''}`}
                                    style={{ color: '#000000' }}
                                >
                                    {description}
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                    className="font-gilroy-regular uppercase tracking-[0.15em] text-xs md:text-sm mb-2 md:mb-5"
                                    style={{ color: color, opacity: 0.8 }}
                                >
                                    CURRENTLY INCLINED
                                </motion.p>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    className="px-8 md:px-10 py-3 md:py-3.5 text-white rounded-full font-gilroy-regular text-base uppercase"
                                    style={{ backgroundColor: color }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {included}
                                </motion.button>

                                {/* Three dots indicator - bottom right */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                    className="flex flex-row items-end justify-end gap-1 w-full mt-6"
                                >
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default GalleryCard;
