

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const experiences = [
  {
    title: "Exclusive and Curated",
    description: "Fratvilla is an invitation-only experience, ensuring that every attendee is a genuine and authentic individual committed to personal growth.",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg", // Luxury villa
    imageAlt: "Exclusive curated experience"
  },
  {
    title: "Holistic Approach",
    description: "We focus on a holistic approach to soft skills, providing not just tactics and hacks, but a deep understanding of the underlying principles of success.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", // Team collaboration
    imageAlt: "Holistic approach to success"
  },
  {
    title: "Secret Events",
    description: "Members who have been a part of the Fratvilla experience will have access to exclusive, secret events, further expanding their network and opportunities.",
    image: "https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg", // Networking event
    imageAlt: "Secret exclusive events"
  }
];

// Individual Experience Card Component
function ExperienceCard({ experience, index }: { experience: typeof experiences[0], index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Current card animations (scrolling out - moving up and fading)
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 1, 1, 0]);
const y = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [200, 0, 0, -200]);
const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.8, 1, 1, 0.8]);

  // Text animations (slightly different timing)
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
const textY = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [100, 0, 0, -100]);

  // Image animations (parallax effect - moves faster)
  const imageY = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [250, 0, 0, -250]);
const imageScale = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0.85, 1, 1, 0.85]);

  return (
    <section 
      ref={ref}
      className="h-screen flex items-center justify-center relative"
      style={{ scrollSnapAlign: 'start' }}
    >
      <motion.div 
        className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        style={{ opacity, y, scale }}
      >
        {/* Left Side - Text Content */}
        <motion.div 
          className="space-y-6 lg:pr-8"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Number Badge */}
          <motion.div 
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-700 text-white font-gilroy-bold text-xl"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            viewport={{ once: true }}
          >
            {index + 1}
          </motion.div>

          {/* Title */}
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-gilroy-medium text-neutral-700 tracking-tight leading-tight">
            {experience.title}
          </h3>

          {/* Description */}
          <p className="text-lg sm:text-xl lg:text-2xl font-gilroy-regular text-neutral-600 leading-relaxed">
            {experience.description}
          </p>

          {/* Decorative line */}
          <motion.div 
            className="w-20 h-1 bg-neutral-700"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Right Side - Image */}
        <motion.div 
          className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          style={{ y: imageY, scale: imageScale }}
        >
          {/* Image with blur-in effect */}
          <motion.img
            src={experience.image}
            alt={experience.imageAlt}
            className="w-full h-full object-cover"
            initial={{ filter: 'blur(10px)', scale: 1.1 }}
            whileInView={{ filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

const TimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring animation for progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="bg-neutral-100 relative">
      {/* Section Header - Fixed at top initially */}
      <div className="sticky top-0 z-10 bg-neutral-100/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-700 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            The Fratvilla <span className="text-neutral-500">Experience</span>
          </motion.h2>
        </div>
      </div>

      {/* Experience Cards - Scroll-based animations */}
      <div className="relative">
        {experiences.map((experience, index) => (
          <ExperienceCard 
            key={index} 
            experience={experience} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;