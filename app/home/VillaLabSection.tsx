'use client';


import { motion } from 'framer-motion';
import { useSectionRevealAnimation } from './hooks/useSectionRevealAnimation';
import { ArrowRight } from 'lucide-react';
import { EnhancedParallaxScroll } from './ui/enhanced-parallax-scroll';
import { AboutFratVilla } from './AboutFratVilla';

const VillaLabSection = () => {
  // Section header animations
  const headerAnimation = useSectionRevealAnimation({
    variant: 'fade-up',
    once: false,
    duration: 0.7,
    staggerChildren: 0.2
  });

  // CTA button animation
  const ctaAnimation = useSectionRevealAnimation({
    variant: 'fade-up',
    once: false,
    duration: 0.6
  });

  return (
    <section className="bg-white sm:py-[49px] py-[31px]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header with scroll animations */}
        {/* <motion.div 
          className="mb-8 sm:mb-12"
          ref={headerAnimation.ref}
          variants={headerAnimation.parentVariants}
          initial="hidden"
          animate={headerAnimation.controls}
        >
          <motion.h2 
            className="text-center sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-navy mb-3 sm:mb-4 text-4xl"
            variants={headerAnimation.childVariants}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            The Villa Lab
          </motion.h2>

          <motion.p 
            className="text-center sm:text-xl text-gray-600 text-base"
            variants={headerAnimation.childVariants}
          >
            <span className="font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Think</span> hard.{' '}
            <span className="font-extrabold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Vibe</span> harder.
          </motion.p>
        </motion.div> */}

        {/* Enhanced Parallax Gallery */}
        {/* <div className="mb-8 sm:mb-12">
          <EnhancedParallaxScroll className="rounded-xl overflow-hidden shadow-lg border-black-4" />
        </div> */}

        <AboutFratVilla />

        {/* Instagram Link */}
        {/* <div className="mt-8 sm:mt-12 text-center sm:text-right">
          <a 
            href="https://www.instagram.com/join.fraterny/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-navy hover:text-black transition-colors group"
          >
            <span className="mr-2">see more</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div> */}

      </div>
    </section>
  );
};

export default VillaLabSection;