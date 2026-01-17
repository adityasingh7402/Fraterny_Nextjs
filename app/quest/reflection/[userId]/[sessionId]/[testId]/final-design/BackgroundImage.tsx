"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface BackgroundImageProps {
    image: string;
    imageKey: number;
}

const BackgroundImage = ({ image, imageKey }: BackgroundImageProps) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    // Preload images
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(image));
        };
        img.src = image;
    }, [image]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Background image layer with transition */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={imageKey}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {/* Top half - Clear image without blur */}
                    <div className="absolute inset-0">
                        {image && image !== "" && image !== "undefined" && (
                            <img
                                src={image}
                                alt="Background"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* Gradient blur overlay - only bottom half */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backdropFilter: "blur(0px)",
                            WebkitBackdropFilter: "blur(0px)",
                            maskImage: "linear-gradient(to bottom, transparent 0%, transparent 40%, black 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 40%, black 100%)",
                        }}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                            }}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default BackgroundImage;
