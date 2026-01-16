'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading screen for the affiliates route
 * Displays a white screen with the Quest logo and a progress bar
 */
export default function AffiliatesLoading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                <motion.img
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    alt="Quest Logo"
                    className="w-24 md:w-32 h-auto mb-8"
                    src="/Vector.svg"
                />

                <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#0A0A0A]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
