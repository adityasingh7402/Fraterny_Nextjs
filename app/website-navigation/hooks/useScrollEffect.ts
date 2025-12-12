'use client';


import { useState, useEffect, useCallback } from 'react';

export const useScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isInBlackSection, setIsInBlackSection] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    requestAnimationFrame(() => {
      setIsScrolled(scrollPosition > 20);
      setIsPastHero(scrollPosition > 100);

      // Check if we're in any black background section
      const blackSections = document.querySelectorAll('.black-bg-section');
      let inBlackSection = false;

      blackSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Check if section is in viewport (with navbar area consideration)
        if (rect.top < 100 && rect.bottom > 0) {
          inBlackSection = true;
        }
      });

      setIsInBlackSection(inBlackSection);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isScrolled, isPastHero, isInBlackSection };
};
