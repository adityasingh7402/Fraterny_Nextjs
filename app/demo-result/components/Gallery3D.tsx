"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryCard from "./GalleryCard";
import NavigationArrows from "./NavigationArrows";
import BackgroundImage from "./BackgroundImage";
import Indicators from "./Indicators";

interface CardData {
    id: number;
    image: string;
    background: string;
    subtitle: string;
    title: string;
    description: string;
}

const cards: CardData[] = [
    {
        id: 1,
        image: "/result/SOUL ALIGNED (2).png",
        background: "/result/SOUL ALIGNED (3).png",
        subtitle: "SELF IMAGE",
        title: "Soul Cartographer",
        description: "A breathtaking futuristic cityscape where technology meets dreams.",
    },
    {
        id: 2,
        image: "/result/RESTLESS MIND.png",
        background: "/result/RESTLESS MIND (2).png",
        subtitle: "WORLD IMAGE",
        title: "Quiet Prodigy",
        description: "Mystical temples hidden in nature's embrace, waiting to be discovered.",
    },
    {
        id: 3,
        image: "/result/HIDDEN THINKER (2).png",
        background: "/result/HIDDEN THINKER (3).png",
        subtitle: "ASPIRATION IMAGE",
        title: "Hopewright",
        description: "Journey through the infinite beauty of the universe's celestial wonders.",
    },
    {
        id: 4,
        image: "/result/STRATEGIST.png",
        background: "/result/STRATEGIST (2).png",
        subtitle: "ASPIRATION IMAGE",
        title: "Strategist",
        description: "Journey through the infinite beauty of the universe's celestial wonders.",
    },
    {
        id: 5,
        image: "/result/HEALING HEART.png",
        background: "/result/HEALING HEART (2).png",
        subtitle: "ASPIRATION IMAGE",
        title: "Healing Heart",
        description: "Journey through the infinite beauty of the universe's celestial wonders.",
    },
    {
        id: 6,
        image: "/result/FREE SPIRIT (2).png",
        background: "/result/FREE SPIRIT (3).png",
        subtitle: "ASPIRATION IMAGE",
        title: "Free Spirit",
        description: "Journey through the infinite beauty of the universe's celestial wonders.",
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

const Gallery3D = () => {
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

            {/* Heading Section - Hidden when card is expanded */}
            {!isExpanded && (
                <div className="absolute top-0 left-0 right-0 z-10 pt-8 p-5 md:p-10">
                    <h1 className="mb-10 text-left">
                        <span className={`block text-sm md:text-base uppercase tracking-[0.3em] mb-1 font-gilroy-regular ${cards[currentIndex].id === 6 ? 'text-black/70' : 'text-white/70'}`}>Analysis Complete</span>
                        <span className={`block text-5xl md:text-6xl lg:text-7xl font-gilroy-bold tracking-tighter ${cards[currentIndex].id === 6 ? 'text-black' : 'bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent'}`}>
                            Quest Reveals About You
                        </span>
                    </h1>
                </div>
            )}

            {/* 3D Card Container */}
            <div
                className={`relative w-full h-full flex items-center justify-center perspective-1000 ${isExpanded ? 'pt-0' : 'pt-24 md:pt-48'}`}
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
                                isActive={index === currentIndex}
                                isExpanded={isExpanded}
                                onClick={() => handleCardClick(index)}
                                position={getCardPosition(index)}
                            />
                        ))}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <NavigationArrows
                onPrev={handlePrev}
                onNext={handleNext}
                onClose={handleClose}
                isExpanded={isExpanded}
            />

            {/* Indicators */}
            <Indicators
                total={cards.length}
                current={currentIndex}
                isExpanded={isExpanded}
            />
        </div>
    );
};

export default Gallery3D;
