'use client'

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSectionRevealAnimation } from '../../home/hooks/useSectionRevealAnimation';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

// Peer profiles data
const peers = [
  { 
    title: "The Strategists", 
    dynamicKey: "tribe-visionary",
    description: "Think Speed, Structure, Scale",
    imageSrc: {
      mobile: "/images/tribe/visionary-mobile.webp",
      desktop: "/images/tribe/visionary-desktop.webp"
    }
  },
  { 
    title: "The Hidden Thinkers", 
    dynamicKey: "tribe-hustler",
    description: "Move with Evidence",
    imageSrc: {
      mobile: "/images/tribe/hustler-mobile.webp",
      desktop: "/images/tribe/hustler-desktop.webp"
    }
  },
  { 
    title: "The Restless Minds", 
    dynamicKey: "tribe-workaholic",
    description: "Overflowing with Ideas",
    imageSrc: {
      mobile: "/images/tribe/workaholic-mobile.webp",
      desktop: "/images/tribe/workaholic-desktop.webp"
    }
  },
  { 
    title: "The Soul-Aligned", 
    dynamicKey: "tribe-experienced",
    description: "Meaning-driven, Vibe-tuning, Purpose-focused",
    imageSrc: {
      mobile: "/images/tribe/experienced-mobile.webp",
      desktop: "/images/tribe/experienced-desktop.webp"
    }
  },
  { 
    title: "The Healing Hearts", 
    dynamicKey: "tribe-optimist",
    description: "Protect Calm and Safety",
    imageSrc: {
      mobile: "/images/tribe/optimist-mobile.webp",
      desktop: "/images/tribe/optimist-desktop.webp"
    }
  },
  { 
    title: "The Free Spirits", 
    dynamicKey: "tribe-guardian",
    description: "Creative, curious, and nonlinear.",
    imageSrc: {
      mobile: "/images/tribe/guardian-mobile.webp",
      desktop: "/images/tribe/guardian-desktop.webp"
    }
  }
];

const journeySteps = [
    {
      step: "1",
      title: "Start with Quest:",
      description: "Begin your journey by taking the free Quest analysis to gain clarity on your internal reality.",
      isButton: true,
      link: "/quest"
    },
    {
      step: "2",
      title: "Apply for Fratvilla:",
      description: "Use your Quest results to apply for the Fratvilla experience, where you'll be surrounded by a curated group of peers who will challenge and support you.",
      isButton: true,
      link: "/fratvilla"
    },
    {
      step: "3",
      title: "Reshape Yourself",
      description: "Through the combined power of Quest and Fratvilla, you'll gain the tools, mindset, and network to reshape both your internal and external realities, unlocking your full potential and becoming the best version of yourself.",
      isButton: false,
      link: ""
    }
  ];

const timelineEvents = [
  { time: "11:30 AM", title: <><span className='text-neutral-500'>Brainstorming <br/> Breakfasts</span></>, description: "Start your day with engaging discussions", img: 'https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg' },
  { time: "1:00 PM", title: <><span className='text-neutral-500'>Team Activity <br/> Afternoons</span></>, description: "Collaborative sessions and workshops", img: 'https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg' },
  { time: "6:00 PM", title: <><span className='text-neutral-500'>Simulation <br/> Sunsets</span></>, description: "Apply learnings in practical scenarios", img: 'https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg' },
  { time: "12:00 AM", title: <><span className='text-neutral-500'>Midnight <br/> Momentum</span></>, description: "Deep conversations and connections", img: 'https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg' },
];

const TribeSection = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Simulate progressive image loading
  useEffect(() => {
    // Start loading images progressively after component mounts
    const loadImage = (index: number) => {
      setTimeout(() => {
        setLoadedImages(prev => new Set(prev).add(index));
      }, 800 + (index * 400)); // First image at 800ms, then every 400ms
    };

    // Load all images progressively
    peers.forEach((_, index) => {
      loadImage(index);
    });
  }, []);

  // Journey section title animation
  const journeyTitleAnimation = useSectionRevealAnimation({
    variant: 'fade-up',
    once: true,
    duration: 0.7
  });

  // Journey steps animation
  const journeyStepsAnimation = useSectionRevealAnimation({
    variant: 'slide-up',
    once: true,
    duration: 0.6,
    staggerChildren: 0.15,
    delayChildren: 0.2
  });

  // Timeline title animation
  const timelineTitleAnimation = useSectionRevealAnimation({
    variant: 'fade-up',
    once: true,
    duration: 0.7
  });

  // Timeline animation
  const timelineAnimation = useSectionRevealAnimation({
    variant: 'slide-up',
    once: true,
    duration: 0.6,
    staggerChildren: 0.15,
    delayChildren: 0.2
  });

  // Tribe section title animation
  const tribeTitleAnimation = useSectionRevealAnimation({
    variant: 'fade-up',
    once: true,
    duration: 0.7
  });

  // Tribe profiles animation
  const profilesAnimation = useSectionRevealAnimation({
    variant: 'scale-in',
    once: true,
    duration: 0.6,
    staggerChildren: 0.15,
    delayChildren: 0.2
  });

  // Tagline animation
  const taglineAnimation = useSectionRevealAnimation({
    variant: 'fade-up',
    once: true,
    duration: 0.8
  });

  // Card hover variants
  const cardVariants = {
    hidden: { 
      y: 40,
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Profile card hover variants
  const profileCardVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      y: 30
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <section className="">
      {/* Journey Section */}
      <section className="bg-neutral-100 p-5">
        <section className="py-2 md:py-8">
          {/* <div className="container mx-auto">
            <div className="max-w-7xl mx-auto text-left">
              <motion.div
                ref={journeyTitleAnimation.ref}
                variants={journeyTitleAnimation.parentVariants}
                initial="hidden"
                animate={journeyTitleAnimation.controls}
              >
                <motion.h2 
                  className="text-3xl sm:text-3xl md:text-4xl font-gilroy-semibold mb-3 sm:mb-4"
                  variants={journeyTitleAnimation.childVariants}
                >
                  The Integrated Fraterny Journey
                </motion.h2>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                ref={journeyStepsAnimation.ref}
                variants={journeyStepsAnimation.parentVariants}
                initial="hidden"
                animate={journeyStepsAnimation.controls}
              >
                {journeySteps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={journeyStepsAnimation.childVariants}
                  >
                    <motion.div 
                      className="bg-neutral-100 h-full relative backdrop-blur-md rounded-xl p-6 md:p-8 text-left shadow-lg hover:shadow-xl transition-all duration-500"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <h3 
                          className="text-xl md:text-xl lg:text-2xl font-gilroy-bold text-black tracking-tighter"
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p 
                          className="text-[16px] font-gilroy-regular md:text-xl lg:text-xl text-black mt-4 mb-8"
                        >
                          {step.description}
                        </p>
                      <div className='lg:absolute lg:bottom-6 md:absolute md:bottom-6'>
                        {step.isButton && (
                          <button onClick={() => window.location.href = step.link} className="text-2xl mt-4 px-4 py-2 bg-neutral-500 font-gilroy-bold tracking-tighter text-white rounded-md shadow-md cursor-pointer transition-all duration-300">
                            Get Started
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div> */}

          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                
                {/* Left Side - Sticky Title (Desktop only) */}
                <div className="lg:w-1/2 lg:sticky lg:top-20 lg:h-screen hidden lg:flex flex-col justify-center">
                  <motion.div
                    ref={journeyTitleAnimation.ref}
                    variants={journeyTitleAnimation.parentVariants}
                    initial="hidden"
                    animate="visible"
                    className=''
                  >
                    <motion.h2 
                      className="text-5xl md:text-6xl font-gilroy-bold mb-6 text-neutral-900 tracking-tight"
                      variants={journeyTitleAnimation.childVariants}
                    >
                      The Integrated <br />
                      <span className="text-neutral-500">Fraterny Journey</span>
                    </motion.h2>
                    <motion.p
                      className="text-xl text-neutral-600 font-gilroy-regular max-w-md"
                      variants={journeyTitleAnimation.childVariants}
                    >
                      Follow these steps to unlock your full potential and reshape your reality.
                    </motion.p>
                  </motion.div>
                </div>

                {/* Mobile Title */}
                <motion.div
                  className="lg:hidden mb-8"
                  ref={journeyTitleAnimation.ref}
                  variants={journeyTitleAnimation.parentVariants}
                  initial="hidden"
                  animate={journeyTitleAnimation.controls}
                >
                  <motion.h2 
                    className="text-3xl sm:text-4xl font-gilroy-bold mb-4 text-neutral-700 tracking-tight"
                    variants={journeyTitleAnimation.childVariants}
                  >
                    The Integrated Fraterny Journey
                  </motion.h2>
                </motion.div>

                {/* Right Side - Timeline */}
                <div className="w-full lg:w-1/2" ref={journeyStepsAnimation.ref}>
                  <div className="relative">
                    {/* Vertical Line */}
                    <div 
                      className="absolute left-[23px] top-0 w-[2px] bg-neutral-300"
                      style={{ height: `calc(100% - 80px)` }}
                    />

                    {/* Timeline Items */}
                    <ul className="space-y-0 relative">
                      {journeySteps.map((step, index) => (
                        <motion.li
                          key={index}
                          className="relative pb-20 last:pb-0"
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.15,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                        >
                          <div className="flex items-start gap-6">
                            {/* Circle Dot */}
                            <motion.div 
                              className="relative z-10 flex-shrink-0 w-12 h-12 bg-white rounded-full border-4 border-neutral-300 shadow-lg"
                              whileHover={{ scale: 1.15, borderColor: "#404040" }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            />

                            {/* Card */}
                            <motion.div
                              className="flex-1 bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-xl border border-neutral-700 relative overflow-hidden"
                              whileHover={{ 
                                y: -5, 
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              {/* Year/Step Label */}
                              <span className="text-sm font-mono text-neutral-400 mb-2 block">
                                Step {step.step}
                              </span>
                              
                              <h3 className="text-2xl md:text-3xl font-gilroy-bold text-white mb-3 tracking-tight">
                                {step.title}
                              </h3>
                              
                              <p className="text-base md:text-lg font-gilroy-regular text-neutral-300 leading-relaxed mb-6">
                                {step.description}
                              </p>
                              
                              {step.isButton && (
                                <motion.button
                                  onClick={() => window.location.href = step.link}
                                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 font-gilroy-bold text-lg rounded-lg shadow-md hover:bg-neutral-100 transition-colors duration-300"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Get Started
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                </motion.button>
                              )}
                            </motion.div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Timeline Section */}
      {/* <section className="bg-white p-5">
        <section className="py-4 md:py-8">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto text-left">
              
              <motion.div
                ref={timelineTitleAnimation.ref}
                variants={timelineTitleAnimation.parentVariants}
                initial="hidden"
                animate={timelineTitleAnimation.controls}
              >
                <motion.h2 
                  className="text-3xl sm:text-3xl md:text-4xl font-gilroy-semibold mb-3 sm:mb-4"
                  variants={timelineTitleAnimation.childVariants}
                >
                  A Day at Fratvilla
                </motion.h2>
              </motion.div>

              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                ref={timelineAnimation.ref}
                variants={timelineAnimation.parentVariants}
                initial="hidden"
                animate={timelineAnimation.controls}
              >
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    variants={timelineAnimation.childVariants}
                  >
                    <motion.div 
                      className="bg-white backdrop-blur-md rounded-xl p-6 md:p-8 text-left border border-cyan-700/20 shadow-lg hover:shadow-xl transition-all duration-500"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <div className="mb-4">
                        <span className="text-3xl md:text-4xl font-gilroy-bold text-black">
                          {event.time}
                        </span>
                      </div>
                      <h3 
                        className="text-xl md:text-2xl font-gilroy-bold text-black italic h-20 mb-3"
                      >
                        {event.title}
                      </h3>
                      <p 
                        className="text-[16px] font-gilroy-regular md:text-xl lg:text-xl text-black mt-4 mb-8"
                      >
                        {event.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </section> */}
      <section className="bg-white p-5">
        <section className="py-4 md:py-8">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  ref={timelineTitleAnimation.ref}
                  variants={timelineTitleAnimation.parentVariants}
                  initial="hidden"
                  animate={timelineTitleAnimation.controls}
                >
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-gilroy-bold text-neutral-700"
                    variants={timelineTitleAnimation.childVariants}
                  >
                    A Day at <span className="text-neutral-500">Fratvilla</span>
                  </motion.h2>
                </motion.div>
                
                {/* <motion.button
                  className="text-sm md:text-base font-gilroy-semibold text-neutral-700 flex items-center gap-2 hover:gap-3 transition-all"
                  whileHover={{ x: 5 }}
                >
                  READ MORE
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button> */}
              </div>

              {/* Cards Grid - 12 column system */}
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
                ref={timelineAnimation.ref}
                variants={timelineAnimation.parentVariants}
                initial="hidden"
                animate={timelineAnimation.controls}
              >
                {timelineEvents.map((event, index) => (
                  <TimelineCard 
                    key={index} 
                    event={event} 
                    index={index}
                    variants={timelineAnimation.childVariants}
                    isExpanded={expandedIndex === index}
                    onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    hasExpanded={expandedIndex !== null}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </section>
      
      {/* Tribe Section */}
      <section className="py-4 md:py-8 bg-neutral-100">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Section Title with scroll animation */}
          <motion.div
            ref={tribeTitleAnimation.ref}
            variants={tribeTitleAnimation.parentVariants}
            initial="hidden"
            animate={tribeTitleAnimation.controls}
          >
            <motion.h2 
              className="text-3xl sm:text-3xl md:text-4xl font-gilroy-semibold mb-3 sm:mb-4"
              variants={tribeTitleAnimation.childVariants}
            >
              Play Your Ideal Archetype
            </motion.h2>
          </motion.div>
          
          {/* Tribe Profiles Grid with enhanced animations */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12"
            ref={profilesAnimation.ref}
            variants={profilesAnimation.parentVariants}
            initial="hidden"
            animate={profilesAnimation.controls}
          >
            {peers.map((peer, index) => (
              <motion.div
                key={index}
                variants={profilesAnimation.childVariants}
              >
                <motion.div 
                  className="text-center group cursor-pointer"
                  variants={profileCardVariants}
                  whileHover="hover"
                >
                  {/* Circular profile image with loading state */}
                  <motion.div 
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto mb-4 bg-white/10 rounded-full overflow-hidden relative border-2 border-white/20"
                  >
                    {/* Loading State */}
                    {!loadedImages.has(index) && (
                      <motion.div 
                        className="absolute inset-0 bg-cyan-700/30 flex items-center justify-center"
                      >
                        {/* Animated spinner */}
                        <div className="relative">
                          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          
                          {/* Subtle background pulse */}
                          <motion.div 
                            className="absolute inset-0 w-8 h-8 border-4 border-cyan-300/20 rounded-full"
                          />
                        </div>
                        
                        {/* Loading dots pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div 
                            className="w-full h-full"
                            style={{
                              backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.2) 2px, transparent 2px)`,
                              backgroundSize: '20px 20px',
                              animation: `float ${1.5 + (index % 3) * 0.3}s ease-in-out infinite alternate`
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Image - fades in when loaded */}
                    <motion.div
                      className={`transition-opacity duration-500 ${
                        loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <ResponsiveImage 
                        dynamicKey={peer.dynamicKey} 
                        alt={peer.title}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300 group-hover:scale-110"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </motion.div>
                    
                    {/* Subtle overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                    />
                  </motion.div>
                  
                  {/* Title with staggered reveal */}
                  <motion.h3 
                    className="text-lg md:text-xl lg:text-2xl text-black mb-2 font-gilroy-bold"
                  >
                    {peer.title}
                  </motion.h3>
                  
                  {/* Description with final reveal */}
                  <motion.p 
                    className="text-gray-700 text-xs md:text-sm lg:text-base font-gilroy-regular"
                  >
                    {peer.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Tagline with scroll animation */}
          <motion.div
            ref={taglineAnimation.ref}
            variants={taglineAnimation.parentVariants}
            initial="hidden"
            animate={taglineAnimation.controls}
          >
            <motion.p 
              className="text-center text-lg md:text-xl text-gray-100 font-['Gilroy-Medium']"
              variants={taglineAnimation.childVariants}
            >
              Divided by Masks, United by Fraterny
            </motion.p>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default TribeSection;

const TimelineCard = ({ 
  event, 
  index, 
  variants,
  isExpanded,
  onToggle,
  hasExpanded 
}: any) => {
  
  const cardColors = [
    'bg-green-100',
    'bg-gray-100', 
    'bg-blue-100',
    'bg-yellow-100'
  ];

  return (
    <motion.div
      layout
      className={`
        ${cardColors[index % 4]} 
        rounded-3xl overflow-hidden relative cursor-pointer
        col-span-1 md:col-span-1 sm:h-72 
        ${isExpanded ? 'md:col-span-2 lg:col-span-6' : hasExpanded ? 'lg:col-span-2' : 'lg:col-span-3'}
      `}
      onClick={() => onToggle()}
      transition={{
        layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      <motion.div 
        layout
        className={`p-6 md:p-8 h-full flex ${isExpanded ? 'flex-col md:flex-row md:gap-6' : 'flex-col'}`}
      >
        {/* Text Content */}
        <motion.div 
          layout
          className="flex-1 flex flex-col"
        >
          {/* Time */}
          <motion.div 
            layout="position"
            className="mb-4"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="text-2xl md:text-3xl font-gilroy-bold text-neutral-700">
              {event.time}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3 
            layout="position"
            className={`text-xl md:text-2xl font-gilroy-bold text-neutral-900 mb-3 ${isExpanded ? 'hidden' : ''}`}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {event.title}
          </motion.h3>

          <motion.div 
            layout="position"
            className="flex-grow mb-4"
            initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              filter: 'blur(0px)',
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              filter: 'blur(10px)',
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm md:text-base font-gilroy-regular text-neutral-600 leading-relaxed">
              {event.description}
            </p>
          </motion.div>

          {/* Description - only in expanded */}
          {/* <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div 
                layout="position"
                className="flex-grow mb-4"
                initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
                animate={{ 
                  opacity: 1, 
                  height: 'auto',
                  filter: 'blur(0px)',
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  filter: 'blur(10px)',
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm md:text-base font-gilroy-regular text-neutral-600 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence> */}

          {/* Button */}
          <motion.button
            layout="position"
            className={`flex items-center gap-2 text-sm md:text-base font-gilroy-semibold text-neutral-700 self-start group ${isExpanded ? '' : 'hidden'}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Image - only in expanded state */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              layout
              className="mt-6 md:mt-0 w-full md:w-1/2 rounded-2xl overflow-hidden flex-shrink-0"
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                filter: 'blur(20px)',
                height: 0
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                filter: 'blur(0px)',
                height: 'auto'
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                filter: 'blur(20px)',
                height: 0
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1
              }}
            >
              <motion.img 
                src={event.img}
                alt={event.title}
                className="w-full h-[250px] md:h-[300px] object-cover"
                loading="lazy"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};


// const TimelineCard = ({ 
//   event, 
//   index, 
//   variants,
//   isExpanded,
//   onToggle,
//   hasExpanded 
// }: any) => {
  
//   const cardColors = [
//     'bg-green-100',
//     'bg-gray-100', 
//     'bg-blue-100',
//     'bg-yellow-100'
//   ];

//   return (
//     <>
//       {/* Collapsed Card State */}
//       <AnimatePresence mode='wait'>
//         {!isExpanded && (
//           <motion.div
//             layoutId={`timeline-card-${index}`}
//             className={`
//               ${cardColors[index % 4]} 
//               rounded-3xl overflow-hidden relative cursor-pointer
//               col-span-1 md:col-span-1
//               ${hasExpanded ? 'md:col-span-2' : 'lg:col-span-3'}
//             `}
//             onClick={() => onToggle()}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <div className="p-6 md:p-8 h-full flex flex-col">
//               <motion.div
//                 layoutId={`timeline-time-${index}`} className="mb-4">
//                 <span className="text-2xl md:text-3xl font-gilroy-bold text-neutral-700">
//                   {event.time}
//                 </span>
//               </motion.div>

//               <motion.h3 
//                 layoutId={`timeline-title-${index}`}
//                 className="text-xl md:text-2xl font-gilroy-bold text-neutral-900 mb-3 min-h-[60px]"
//               >
//                 {event.title}
//               </motion.h3>

//               {/* <motion.p 
//                 layoutId={`timeline-desc-${index}`}
//                 className="text-sm md:text-base font-gilroy-regular text-neutral-600 leading-relaxed mb-6 flex-grow line-clamp-3"
//               >
//                 {event.description}
//               </motion.p> */}

//               <motion.button
//                 className="flex items-center gap-2 text-sm md:text-base font-gilroy-semibold text-neutral-700 self-start group"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onToggle();
//                 }}
//               >
//                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </div>
//               </motion.button>
//             </div>

            
//           </motion.div>
//         )}

//         {isExpanded && (
//           <motion.div
//             layoutId={`timeline-card-${index}`}
//             className={`
//               ${cardColors[index % 4]}
//               rounded-3xl overflow-hidden relative cursor-pointer
//               md:col-span-2 lg:col-span-6
//             `}
//             onClick={() => onToggle()}
//           >
//             <div className="p-6 md:p-8 h-full flex flex-col md:flex-row md:gap-6">
//               {/* Text Content */}
//               <div className="flex-1 flex flex-col">
//                 {/* <motion.div
//                 layoutId={`timeline-time-${index}`} className="mb-4">
//                   <span className="text-2xl md:text-3xl font-gilroy-bold text-neutral-700">
//                     {event.time}
//                   </span>
//                 </motion.div>

//                 <motion.h3
//                   layoutId={`timeline-title-${index}`}
//                   className="text-xl md:text-2xl font-gilroy-bold text-neutral-900 mb-3"
//                 >
//                   {event.title}
//                 </motion.h3> */}

//                 <motion.div layoutId={`timeline-desc-${index}`} className="flex-grow">
//                   <p className="text-sm md:text-base font-gilroy-regular text-neutral-600 leading-relaxed mb-4">
//                     {event.description}
//                   </p>
//                 </motion.div>

//                 <motion.button
//                   layoutId={`timeline-button-${index}`}
//                   className="flex items-center gap-2 text-sm md:text-base font-gilroy-semibold text-neutral-700 self-start group"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onToggle();
//                   }}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
//                     <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                     </svg>
//                   </div>
//                 </motion.button>
//               </div>

//               {/* Image - only in expanded state */}
//               <motion.div
//                   layoutId={`timeline-image-${index}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                 className="mt-6 md:mt-0 w-full md:w-1/2 h-[250px] md:h-auto rounded-2xl overflow-hidden flex-shrink-0"
//               >
//                 <ResponsiveImage 
//                   dynamicKey={`timeline-event-${index}`} 
//                   alt={event.title}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                 />
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };