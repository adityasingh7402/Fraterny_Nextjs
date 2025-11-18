'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to ensure animations only start after client-side hydration is complete.
 * This fixes the issue where framer-motion animations don't run on first page load
 * due to SSR/hydration mismatch.
 * 
 * @returns {boolean} - true when the component is mounted and ready for animations
 */
export function useAnimationReady(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is fully painted before animations start
    requestAnimationFrame(() => {
      setIsReady(true);
    });
  }, []);

  return isReady;
}

/**
 * Hook to track when a specific screen becomes active and is ready for animations.
 * Forces animations to retrigger when screen changes.
 * 
 * @param {number} screenIndex - The current screen index
 * @returns {boolean} - true when the screen is ready for animations
 */
export function useScreenAnimationReady(screenIndex: number): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Reset animation state when screen changes
    setIsReady(false);
    
    // Small delay to ensure clean state transition
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [screenIndex]);

  return isReady;
}
