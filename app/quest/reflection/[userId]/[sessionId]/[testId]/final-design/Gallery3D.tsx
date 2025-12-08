"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryCard from "./GalleryCard";
import BackgroundImage from "./BackgroundImage";


interface CardData {
    id: number;
    image: string;
    background: string;
    subtitle: string;
    title: string;
    description: string;
    included: string;
    color: string;
    categoryText: string;
}

const cards: CardData[] = [
    {
        id: 1,
        image: "/result/SOUL ALIGNED (2).webp",
        background: "/result/SOUL ALIGNED (4).webp",
        subtitle: "SELF IMAGE",
        title: "SOUL ALIGNED",
        description: "The Healing Heart is someone who makes a room feel safe just by walking into it.\n\nPsychologically, this energy combines:\n• Approach orientation to recovery\n• Rhythmic regulation\n• Realistic optimism\n\nYour personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.",
        included: "Quiet Beacon",
        color: "#4dbdfc",
        categoryText: "HOW YOU SEE YOURSELF"
    },
    {
        id: 2,
        image: "/result/RESTLESS MIND.webp",
        background: "/result/RESTLESS MIND (4).webp",
        subtitle: "SOCIAL VIEW",
        title: "RESTLESS MIND",
        description: "The Healing Heart is someone who makes a room feel safe just by walking into it.\n\nPsychologically, this energy combines:\n• Approach orientation to recovery\n• Rhythmic regulation\n• Realistic optimism\n\nYour personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.",
        included: "SIGNAL FINDER",
        color: "#04486f",
        categoryText: "HOW THE WORLD SEES YOU"
    },
    {
        id: 3,
        image: "/result/HIDDEN THINKER (2).webp",
        background: "/result/HIDDEN THINKER (5).webp",
        subtitle: "ASPIRATION",
        title: "HIDDEN THINKER",
        description: "The Healing Heart is someone who makes a room feel safe just by walking into it.\n\nPsychologically, this energy combines:\n• Approach orientation to recovery\n• Rhythmic regulation\n• Realistic optimism\n\nYour personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.",
        included: "Quiet Prodigy",
        color: "#043974",
        categoryText: "WHAT YOU ASPIRE TO BE"
    },
    {
        id: 4,
        image: "/result/STRATEGIST.webp",
        background: "/result/STRATEGIST (4).webp",
        subtitle: "ASPIRATION",
        title: "The Strategist",
        description: "The Healing Heart is someone who makes a room feel safe just by walking into it.\n\nPsychologically, this energy combines:\n• Approach orientation to recovery\n• Rhythmic regulation\n• Realistic optimism\n\nYour personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.",
        included: "MIN-MAXER",
        color: "#000000",
        categoryText: "WHAT YOU ASPIRE TO BE"
    },
    {
        id: 5,
        image: "/result/HEALING HEART.webp",
        background: "/result/HEALING HEART (4).webp",
        subtitle: "ASPIRATION",
        title: "Healing Heart",
        description: "The Healing Heart is someone who makes a room feel safe just by walking into it.\n\nPsychologically, this energy combines:\n• Approach orientation to recovery\n• Rhythmic regulation\n• Realistic optimism\n\nYour personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.",
        included: "Embercarrier",
        color: "#0198ac",
        categoryText: "WHAT YOU ASPIRE TO BE"
    },
    {
        id: 6,
        image: "/result/FREE SPIRIT (2).webp",
        background: "/result/FREE SPIRIT (4).webp",
        subtitle: "ASPIRATION",
        title: "The Free Spirit",
        description: "The Healing Heart is someone who makes a room feel safe just by walking into it.\n\nPsychologically, this energy combines:\n• Approach orientation to recovery\n• Rhythmic regulation\n• Realistic optimism\n\nYour personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.",
        included: "OFFSCRIPT",
        color: "#545454",
        categoryText: "WHAT YOU ASPIRE TO BE"
    },
];

// Preload all images on mount
const preloadImages = () => {
    cards.forEach(card => {
        const img = new Image();
        img.src = card.image;
    });
};

// Check if mobile
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

interface Gallery3DProps {
    onColorChange?: (color: string) => void;
}

const Gallery3D = ({ onColorChange }: Gallery3DProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const isMobile = useIsMobile();

    // Touch/swipe handling
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Preload images on mount
    useEffect(() => {
        preloadImages();
    }, []);

    // Notify parent of color change
    useEffect(() => {
        if (onColorChange) {
            onColorChange(cards[currentIndex].color);
        }
    }, [currentIndex, onColorChange]);

    const getCardPosition = (index: number): "left" | "center" | "right" => {
        let diff = index - currentIndex;

        // Handle wrap-around for circular array
        if (diff > cards.length / 2) {
            diff -= cards.length;
        } else if (diff < -cards.length / 2) {
            diff += cards.length;
        }

        if (diff === 0) return "center";
        if (diff === -1) return "left";
        if (diff === 1) return "right";

        // Fallback for any other case
        return diff < 0 ? "left" : "right";
    };

    const handlePrev = useCallback(() => {
        if (isExpanded) return;
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, [isExpanded]);

    const handleNext = useCallback(() => {
        if (isExpanded) return;
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, [isExpanded]);

    const handleCardClick = (index: number) => {
        if (index === currentIndex) {
            setIsExpanded(!isExpanded);
        } else {
            setCurrentIndex(index);
        }
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isExpanded) return;
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isExpanded) return;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (isExpanded || touchStartX.current === null || touchEndX.current === null) return;

        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isExpanded && e.key === "Escape") {
                setIsExpanded(false);
                return;
            }
            if (isExpanded) return;

            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsExpanded(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePrev, handleNext, isExpanded]);

    // Get visible cards (current, previous, next)
    const getVisibleIndices = () => {
        const prev = (currentIndex - 1 + cards.length) % cards.length;
        const next = (currentIndex + 1) % cards.length;
        return [prev, currentIndex, next];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <div
            className="relative w-full h-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Dynamic Background */}
            <BackgroundImage
                image={cards[currentIndex].background}
                imageKey={currentIndex}
            />

            {/* 3D Card Container */}
            <div
                className={`relative w-full h-full flex items-center justify-center perspective-1000`}
                onClick={() => isExpanded && handleClose()}
            >
                <AnimatePresence mode="sync">
                    {/* Render in z-index order: right (lowest), left (middle), center (highest) */}
                    {visibleIndices
                        .sort((a, b) => {
                            // Sort by position to control z-index stacking
                            const posA = getCardPosition(a);
                            const posB = getCardPosition(b);

                            // Right cards render first (lowest z-index)
                            if (posA === "right" && posB !== "right") return -1;
                            if (posB === "right" && posA !== "right") return 1;

                            // Left cards render second
                            if (posA === "left" && posB === "center") return -1;
                            if (posB === "left" && posA === "center") return 1;

                            // Center card renders last (highest z-index)
                            return 0;
                        })
                        .map((index) => (
                            <GalleryCard
                                key={cards[index].id}
                                cardId={cards[index].id}
                                image={cards[index].image}
                                subtitle={cards[index].subtitle}
                                title={cards[index].title}
                                description={cards[index].description}
                                included={cards[index].included}
                                color={cards[currentIndex].color}
                                categoryText={cards[index].categoryText}
                                isActive={index === currentIndex}
                                isExpanded={isExpanded}
                                onClick={() => handleCardClick(index)}
                                position={getCardPosition(index)}
                            />
                        ))}
                </AnimatePresence>
            </div>


        </div>
    );
};

export default Gallery3D;
