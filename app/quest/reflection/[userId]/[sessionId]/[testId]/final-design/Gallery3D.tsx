"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryCard from "./GalleryCard";
import BackgroundImage from "./BackgroundImage";


interface CardData {
    id: number;
    imageUrl: string;
    bgGradient: string;
    subtitle: string;
    title: React.ReactNode;
    content: React.ReactNode;
    buttonbg: string;
    textcolor: string;
    bgHeading: React.ReactNode;
    bgSubheading: React.ReactNode;
    tag: string;
}

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

// Helper function to convert ReactNode to string
const reactNodeToString = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node.trim();
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) {
        // Join array elements with a space to prevent words from concatenating
        return node.map(reactNodeToString).filter(str => str).join(' ');
    }
    if (node && typeof node === 'object') {
        // Check for React._payload structure (lazy/promise values)
        const anyNode = node as any;
        if (anyNode._payload && anyNode._payload.value) {
            return reactNodeToString(anyNode._payload.value);
        }

        // Extract text from JSX elements
        if ('props' in node) {
            const element = node as any;
            if (element.props && element.props.children) {
                return reactNodeToString(element.props.children);
            }
        }
    }
    return '';
};

interface Gallery3DProps {
    onColorChange?: (color: string) => void;
    cards: CardData[];
}

const Gallery3D = ({ onColorChange, cards }: Gallery3DProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const isMobile = useIsMobile();

    // Touch/swipe handling
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Notify parent of color change
    useEffect(() => {
        if (onColorChange && cards[currentIndex]) {
            // Extract color from buttonbg (e.g., "bg-[#4dbdfc]" -> "#4dbdfc")
            const buttonbg = cards[currentIndex].buttonbg;
            const colorMatch = buttonbg.match(/#[0-9A-Fa-f]{6}/);
            let color = colorMatch ? colorMatch[0] : '#4A90A4';

            // Override color for The Free Spirit (#545454) and The Strategist (#000000)
            // Use Blue #043974 for other sections instead
            if (color === '#545454' || color === '#000000') {
                color = '#043974';
            }

            onColorChange(color);

            // DEBUG: Log desktop center card data
            if (!isMobile) {
                console.log('🖥️ DESKTOP Gallery3D - Center Card Data:', {
                    currentIndex,
                    card: cards[currentIndex],
                    title: cards[currentIndex].title,
                    subtitle: cards[currentIndex].subtitle,
                    bgSubheading: cards[currentIndex].bgSubheading,
                    imageUrl: cards[currentIndex].imageUrl,
                    content: cards[currentIndex].content
                });
            }
        }
    }, [currentIndex, onColorChange, cards, isMobile]);

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
            const cardTitle = reactNodeToString(cards[index].title).toUpperCase();
            if (cardTitle === "UNKNOWN") return;
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
                image={cards[currentIndex].bgGradient}
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
                        .map((index) => {
                            const card = cards[index];
                            const currentCard = cards[currentIndex];
                            // Extract color from buttonbg
                            const colorMatch = currentCard.buttonbg.match(/#[0-9A-Fa-f]{6}/);
                            const color = colorMatch ? colorMatch[0] : '#4A90A4';

                            return (
                                <GalleryCard
                                    key={card.id}
                                    cardId={card.id}
                                    image={card.imageUrl}
                                    subtitle={card.subtitle}
                                    title={reactNodeToString(card.title)}
                                    description={card.content}
                                    included={card.subtitle}
                                    color={color}
                                    categoryHeading={reactNodeToString(card.bgHeading)}
                                    categoryText={reactNodeToString(card.bgSubheading)}
                                    isActive={index === currentIndex}
                                    isExpanded={isExpanded}
                                    onClick={() => handleCardClick(index)}
                                    position={getCardPosition(index)}
                                />
                            );
                        })}
                </AnimatePresence>
            </div>


        </div>
    );
};

export default Gallery3D;
