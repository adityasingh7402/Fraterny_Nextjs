'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {CircleArrowDown} from "lucide-react" 

const TransformationJourney = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Section refs for intersection detection
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);

  // Track which section is in view
  const isSection1InView = useInView(section1Ref, { margin: "-40% 0px -40% 0px" });
  const isSection2InView = useInView(section2Ref, { margin: "-40% 0px -40% 0px" });
  const isSection3InView = useInView(section3Ref, { margin: "-40% 0px -40% 0px" });
  const isSection4InView = useInView(section4Ref, { margin: "-40% 0px -40% 0px" });
  const isSection5InView = useInView(section5Ref, { margin: "-40% 0px -40% 0px" });
  const isSection6InView = useInView(section6Ref, { margin: "-40% 0px -40% 0px" });

  // Update active section based on what's in view
  useEffect(() => {
    if (isSection1InView) setActiveSection(1);
    else if (isSection2InView) setActiveSection(2);
    else if (isSection3InView) setActiveSection(3);
    else if (isSection4InView) setActiveSection(4);
    else if (isSection5InView) setActiveSection(5);
    else if (isSection6InView) setActiveSection(6);
    else setActiveSection(0);
  }, [isSection1InView, isSection2InView, isSection3InView, isSection4InView, isSection5InView, isSection6InView]);

  // Scroll progress for overall page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sections = [
    {
      id: 1,
      ref: section1Ref,
      focusText: "You have goals. But action feels impossible.",
      description: "Procrastination isn't laziness—it's a systems failure. We diagnose the exact friction points blocking your execution.",
      visualType: "particles",
      color: "#DC2626"
    },
    {
      id: 2,
      ref: section2Ref,
      focusText: "Decision paralysis is not a character flaw.",
      description: "Clarity is engineered, not found. We build your personal decision framework from first principles.",
      visualType: "brain",
      color: "#3B82F6"
    },
    {
      id: 3,
      ref: section3Ref,
      focusText: "Confidence is trainable. Not inherited.",
      description: "Social anxiety dissolves when you understand the patterns. We teach the frameworks behind every interaction.",
      visualType: "network",
      color: "#F59E0B"
    },
    {
      id: 4,
      ref: section4Ref,
      focusText: "You're not stuck. You're reactive by default.",
      description: "Agency is a habit. We rewire your response from passive to proactive through deliberate challenges.",
      visualType: "chains",
      color: "#10B981"
    },
    {
      id: 5,
      ref: section5Ref,
      focusText: "Welcome to the Human Performance Lab.",
      description: "10 days. 20 minds. One villa. Scientific diagnosis meets immersive application. This is where Version 2.0 is built.",
      visualType: "dna",
      color: "#3B82F6"
    },
    {
      id: 6,
      ref: section6Ref,
      focusText: "You leave fundamentally different.",
      description: "Confident leader. Clear communicator. Decisive executor. Self-mastery. These aren't goals—they're your new baseline.",
      visualType: "ascend",
      color: "#8B5CF6"
    }
  ];

  const isInsideSection = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1] // Always 1 when in section, could be 0 when outside
    );

    const isContainerInView = useInView(containerRef, { 
  margin: "-10% 0px -10% 0px" 
});

  return (
    <div className='bg-neutral-900'>
    <div ref={containerRef} className="container mx-auto relative bg-neutral-900 text-white overflow-hidden">
      
      {/* Mobile Progress Widget */}
      {/* <motion.div className="md:hidden fixed bottom-8 right-8 w-16 h-16 z-50">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#D4C5A3"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            style={{
              strokeDashoffset: useTransform(scrollYProgress, [0, 1], [251.2, 0])
            }}
          />
        </svg>
      </motion.div> */}

      {/* Sticky Visual Container - Right Side */}
      <div className="hidden md:block fixed top-0 right-0 w-1/2 h-screen z-10 pointer-events-none border-l border-white/5">
        
        {/* Desktop Progress Line */}
        <motion.div
        className="absolute left-0 top-0 w-1 h-screen bg-[#D4C5A3] origin-top"
        style={{
            scaleY: scrollYProgress,
            opacity: useTransform(scrollYProgress, [0, 0.98, 1], [1, 1, 0]) // Fade out at end
        }}
        />

        {/* Visual Components */}
        <div className="w-full h-full flex items-center justify-center">
          <ScatteredParticles active={activeSection === 1} />
          <FoggyBrain active={activeSection === 2} />
          <BrokenNetwork active={activeSection === 3} />
          <BreakingChains active={activeSection === 4} />
          <DNATransformation active={activeSection === 5} />
          <AscendingFigure active={activeSection === 6} />
        </div>
      </div>

      {/* Scrollable Content - Left Side */}
      <div className="relative w-full md:w-1/2 z-20">
        
        {/* Header */}
        <header className="min-h-screen flex items-center px-6 md:px-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm md:text-base tracking-[0.2em] uppercase font-gilroy-regular text-[#D4C5A3] opacity-80 mb-4"
            >
              FRATERNY LAB
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block text-6xl md:text-7xl lg:text-8xl font-gilroy-semibold leading-none"
            >
              The Ambition
              <br />
              <span className="italic font-gilroy-regular">Paradox.</span>
            </motion.span>
          </div>
        </header>

        {/* Scroll Sections */}
        {sections.map((section) => (
          <section
            key={section.id}
            ref={section.ref}
            className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-12"
          >
            <SectionContent
              focusText={section.focusText}
              description={section.description}
              isInView={activeSection === section.id}
            />
          </section>
        ))}

        {/* Closing Section */}
        <div className="min-h-[60vh] flex items-center px-6 md:px-16 border-t border-white/10 mt-20">
          <div>
            <p className="text-5xl md:text-6xl font-gilroy-semibold text-neutral-400 mb-6">
              Ready to <br/>
              <span className='text-neutral-100 italic font-gilroy-regular'>Transform</span> Your Life?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-neutral-600 text-neutral-100 border border-neutral-200 rounded-full font-gilroy-medium text-lg tracking-tighter"
            >
              Begin Your Journey
              <CircleArrowDown className="ml-2 inline-block" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
type SectionContentProps = {
  focusText: string;
  description: string;
  isInView: boolean;
};

// Section Content Component with Focus Animation
const SectionContent = ({ focusText, description, isInView }: SectionContentProps) => {
  return (
    <>
      <motion.p
        className="text-4xl md:text-5xl lg:text-6xl font-gilroy-semibold leading-tight text-neutral-400 mb-8 max-w-2xl"
        animate={{
          filter: isInView ? "blur(0px)" : "blur(12px)",
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.8,
          y: isInView ? 0 : 40,
          color: isInView ? "#FFFFFF" : "#6B7280"
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {focusText}
      </motion.p>
      
      <motion.p
        className="text-base md:text-lg font-gilroy-regular text-neutral-500 max-w-xl leading-relaxed border-l-2 border-transparent pl-6"
        animate={{
          filter: isInView ? "blur(0px)" : "blur(12px)",
          opacity: isInView ? 1 : 0,
          borderColor: isInView ? "#D4C5A3" : "transparent",
          color: isInView ? "#9CA3AF" : "#4B5563"
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {description}
      </motion.p>
    </>
  );
};

// Visual Components

const ScatteredParticles = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
        y: active ? 0 : 40
      }}
      transition={{ duration: 0.6 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="w-full h-full"
      >
        {/* Definitions */}
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0" />
          </filter>
          <filter id="particleBlur">
            <feGaussianBlur stdDeviation="0" />
          </filter>
        </defs>

        {/* Central Core - Animated */}
        <motion.g filter="url(#softGlow)">
          <motion.circle
            cx="200"
            cy="200"
            r="14"
            fill="url(#coreGradient)"
            animate={active ? {
              r: [13, 16, 13],
              opacity: [0.7, 1, 0.7]
            } : {}}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>

        {/* Particles with Motion */}
        <g filter="url(#particleBlur)">
          {/* Cluster A */}
          <motion.path
            d="M200 200 C260 140 300 120 320 110"
            stroke="#EF4444"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            fill="none"
            animate={active ? {
              strokeDashoffset: [0, 20, 0]
            } : {}}
            strokeDasharray="5,3"
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="320"
            cy="110"
            r="3"
            fill="#EF4444"
            opacity="0.6"
            animate={active ? {
              cx: [320, 325, 320],
              cy: [110, 105, 110],
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M200 200 C250 230 290 260 315 280"
            stroke="#DC2626"
            strokeOpacity="0.3"
            strokeWidth="1"
            fill="none"
            animate={active ? {
              strokeDashoffset: [0, -15, 0]
            } : {}}
            strokeDasharray="4,2"
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="315"
            cy="280"
            r="2.5"
            fill="#DC2626"
            opacity="0.5"
            animate={active ? {
              cx: [315, 318, 315],
              cy: [280, 275, 280],
              opacity: [0.5, 0.7, 0.5]
            } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="285"
            cy="155"
            r="3"
            fill="#F87171"
            opacity="0.7"
            animate={active ? {
              cx: [285, 280, 285],
              cy: [155, 160, 155],
              r: [3, 3.5, 3]
            } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="305"
            cy="190"
            r="2.5"
            fill="#EF4444"
            opacity="0.4"
            animate={active ? {
              cx: [305, 310, 305],
              cy: [190, 185, 190]
            } : {}}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Cluster B */}
          <motion.path
            d="M120 220 C160 210 185 205 195 200 C210 195 235 185 260 170"
            stroke="#F87171"
            strokeOpacity="0.4"
            strokeWidth="1.1"
            fill="none"
            strokeDasharray="6,4"
            animate={active ? {
              strokeDashoffset: [0, 30, 0]
            } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="260"
            cy="170"
            r="3"
            fill="#F87171"
            opacity="0.6"
            animate={active ? {
              cx: [260, 255, 260],
              cy: [170, 175, 170],
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M140 140 C170 165 185 185 190 195 C195 215 180 240 160 260"
            stroke="#EF4444"
            strokeOpacity="0.35"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,3"
            animate={active ? {
              strokeDashoffset: [0, -20, 0]
            } : {}}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="160"
            cy="260"
            r="2.5"
            fill="#EF4444"
            opacity="0.5"
            animate={active ? {
              cx: [160, 165, 160],
              cy: [260, 255, 260]
            } : {}}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="135"
            cy="190"
            r="3"
            fill="#DC2626"
            opacity="0.6"
            animate={active ? {
              cx: [135, 140, 135],
              cy: [190, 195, 190],
              r: [3, 3.5, 3]
            } : {}}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="150"
            cy="165"
            r="2"
            fill="#F87171"
            opacity="0.4"
            animate={active ? {
              cx: [150, 145, 150],
              cy: [165, 170, 165]
            } : {}}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Cluster C */}
          <motion.path
            d="M200 200 C190 140 185 110 180 80"
            stroke="#DC2626"
            strokeOpacity="0.3"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4,2"
            animate={active ? {
              strokeDashoffset: [0, 15, 0]
            } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="180"
            cy="80"
            r="3"
            fill="#DC2626"
            opacity="0.6"
            animate={active ? {
              cx: [180, 175, 180],
              cy: [80, 85, 80],
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M200 200 C225 150 250 130 280 120"
            stroke="#EF4444"
            strokeOpacity="0.35"
            strokeWidth="1.1"
            fill="none"
            strokeDasharray="5,3"
            animate={active ? {
              strokeDashoffset: [0, -18, 0]
            } : {}}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="280"
            cy="120"
            r="2.5"
            fill="#EF4444"
            opacity="0.5"
            animate={active ? {
              cx: [280, 285, 280],
              cy: [120, 115, 120]
            } : {}}
            transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="165"
            cy="115"
            r="2.5"
            fill="#F87171"
            opacity="0.4"
            animate={active ? {
              cx: [165, 170, 165],
              cy: [115, 120, 115]
            } : {}}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.circle
            cx="210"
            cy="95"
            r="2"
            fill="#DC2626"
            opacity="0.3"
            animate={active ? {
              cx: [210, 215, 210],
              cy: [95, 90, 95]
            } : {}}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Cluster D - Diffuse particles */}
          <motion.circle cx="90" cy="210" r="3" fill="#EF4444" opacity="0.5"
            animate={active ? { cx: [90, 85, 90], cy: [210, 215, 210] } : {}}
            transition={{ duration: 4.1, repeat: Infinity }} />
          <motion.circle cx="105" cy="255" r="2.5" fill="#DC2626" opacity="0.4"
            animate={active ? { cx: [105, 110, 105], cy: [255, 250, 255] } : {}}
            transition={{ duration: 5.3, repeat: Infinity }} />
          <motion.circle cx="130" cy="300" r="3" fill="#F87171" opacity="0.6"
            animate={active ? { cx: [130, 125, 130], cy: [300, 305, 300] } : {}}
            transition={{ duration: 3.9, repeat: Infinity }} />
          <motion.circle cx="260" cy="305" r="2.5" fill="#EF4444" opacity="0.4"
            animate={active ? { cx: [260, 265, 260], cy: [305, 310, 305] } : {}}
            transition={{ duration: 4.6, repeat: Infinity }} />
          <motion.circle cx="295" cy="330" r="3" fill="#DC2626" opacity="0.5"
            animate={active ? { cx: [295, 290, 295], cy: [330, 325, 330] } : {}}
            transition={{ duration: 5.1, repeat: Infinity }} />
          <motion.circle cx="330" cy="215" r="3" fill="#F87171" opacity="0.6"
            animate={active ? { cx: [330, 335, 330], cy: [215, 220, 215] } : {}}
            transition={{ duration: 3.7, repeat: Infinity }} />
          <motion.circle cx="310" cy="165" r="2.5" fill="#EF4444" opacity="0.4"
            animate={active ? { cx: [310, 315, 310], cy: [165, 160, 165] } : {}}
            transition={{ duration: 4.9, repeat: Infinity }} />
          <motion.circle cx="200" cy="350" r="2.5" fill="#DC2626" opacity="0.3"
            animate={active ? { cx: [200, 205, 200], cy: [350, 345, 350] } : {}}
            transition={{ duration: 5.8, repeat: Infinity }} />
          <motion.circle cx="65" cy="145" r="3" fill="#EF4444" opacity="0.5"
            animate={active ? { cx: [65, 70, 65], cy: [145, 150, 145] } : {}}
            transition={{ duration: 4.4, repeat: Infinity }} />
          <motion.circle cx="350" cy="145" r="3" fill="#F87171" opacity="0.6"
            animate={active ? { cx: [350, 345, 350], cy: [145, 140, 145] } : {}}
            transition={{ duration: 3.6, repeat: Infinity }} />
        </g>
      </svg>
    </motion.div>
  );
};

const FoggyBrain = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
        y: active ? 0 : 40
      }}
      transition={{ duration: 0.6 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        width="400"
        height="400"
        className="w-full h-full"
      >
        {/* Brain Outline */}
        <motion.g
          id="brain-outline"
          opacity="0.5"
          animate={active ? {
            opacity: [0.5, 0.7, 0.5]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Outer brain shape */}
          <path
            d="M200 70 C140 60, 90 110, 95 170 C80 210, 105 260, 150 275 C165 305, 235 305, 250 275 C295 260, 320 210, 305 170 C310 110, 260 60, 200 70 Z"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Hemisphere division */}
          <motion.path
            d="M200 75 C195 120, 195 180, 200 250 C205 280, 205 295, 200 305"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.6"
            animate={active ? {
              strokeDashoffset: [0, 12, 0]
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Subtle folds */}
          <path
            d="M140 120 C155 135, 155 155, 140 170"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path
            d="M260 120 C245 140, 245 160, 260 175"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path
            d="M160 210 C175 225, 175 245, 160 260"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path
            d="M240 210 C225 230, 225 250, 240 265"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </motion.g>

        {/* Fog Layer 1 */}
        <motion.g
          id="fog-layer-1"
          opacity="0.35"
          animate={active ? {
            x: [0, -5, 0],
            y: [0, 3, 0],
            opacity: [0.35, 0.5, 0.35]
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path
            d="M120 150 C150 120, 220 120, 260 150 C300 180, 260 220, 220 215 C180 210, 150 240, 115 220 C90 200, 95 170, 120 150 Z"
            fill="#93C5FD"
          />
        </motion.g>

        {/* Fog Layer 2 */}
        <motion.g
          id="fog-layer-2"
          opacity="0.4"
          animate={active ? {
            x: [0, 5, 0],
            y: [0, -4, 0],
            opacity: [0.4, 0.55, 0.4]
          } : {}}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <path
            d="M180 190 C220 160, 280 170, 300 210 C315 245, 270 265, 235 255 C205 245, 175 260, 160 240 C145 215, 160 205, 180 190 Z"
            fill="#60A5FA"
          />
        </motion.g>

        {/* Fog Layer 3 */}
        <motion.g
          id="fog-layer-3"
          opacity="0.25"
          animate={active ? {
            x: [0, -3, 0],
            y: [0, 5, 0],
            opacity: [0.25, 0.4, 0.25]
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <path
            d="M100 210 C130 185, 160 190, 175 215 C190 245, 165 275, 130 265 C95 255, 80 235, 100 210 Z"
            fill="#3B82F6"
          />
        </motion.g>

        {/* Noise / Static */}
        <motion.g
          id="brain-static"
          animate={active ? {
            opacity: [1, 0.6, 1]
          } : {}}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Dots */}
          <motion.circle cx="190" cy="170" r="1" fill="#DBEAFE" opacity="0.5"
            animate={active ? { opacity: [0.5, 0.8, 0.5] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }} />
          <motion.circle cx="210" cy="185" r="1" fill="#BFDBFE" opacity="0.4"
            animate={active ? { opacity: [0.4, 0.7, 0.4] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
          <motion.circle cx="175" cy="200" r="1" fill="#DBEAFE" opacity="0.5"
            animate={active ? { opacity: [0.5, 0.8, 0.5] } : {}}
            transition={{ duration: 1.3, repeat: Infinity, delay: 0.4 }} />
          <motion.circle cx="225" cy="210" r="1" fill="#BFDBFE" opacity="0.4"
            animate={active ? { opacity: [0.4, 0.7, 0.4] } : {}}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.6 }} />
          <motion.circle cx="200" cy="230" r="1" fill="#DBEAFE" opacity="0.5"
            animate={active ? { opacity: [0.5, 0.8, 0.5] } : {}}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.8 }} />
          <motion.circle cx="185" cy="245" r="1" fill="#BFDBFE" opacity="0.4"
            animate={active ? { opacity: [0.4, 0.7, 0.4] } : {}}
            transition={{ duration: 1.7, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="215" cy="250" r="1" fill="#DBEAFE" opacity="0.5"
            animate={active ? { opacity: [0.5, 0.8, 0.5] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, delay: 1.2 }} />
          
          {/* Short lines */}
          <line x1="195" y1="190" x2="198" y2="192"
            stroke="#DBEAFE" strokeWidth="1" opacity="0.4" />
          <line x1="210" y1="215" x2="213" y2="217"
            stroke="#BFDBFE" strokeWidth="1" opacity="0.4" />
          <line x1="185" y1="220" x2="188" y2="222"
            stroke="#DBEAFE" strokeWidth="1" opacity="0.4" />
        </motion.g>

        {/* Neural Pathways */}
        <motion.g id="neural-pathways" opacity="0.3">
          <motion.path
            d="M150 190 C170 175, 190 175, 210 190"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 1, 0.7, 1],
              opacity: [0.3, 0.5, 0.3, 0.5]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M230 210 C245 225, 255 240, 260 255"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 0.8, 0, 0.8],
              opacity: [0.3, 0.5, 0.3, 0.5]
            } : {}}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.path
            d="M170 240 C185 255, 195 265, 200 270"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 0.6, 0, 0.6],
              opacity: [0.3, 0.5, 0.3, 0.5]
            } : {}}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.g>

        {/* Swirl Elements */}
        <motion.g id="swirls">
          <motion.path
            d="M260 160 C275 155, 285 165, 280 175 C270 190, 245 180, 255 165"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="0.8"
            opacity="0.25"
            animate={active ? {
              rotate: [0, 360]
            } : {}}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: "270px 167px" }}
          />
          <motion.path
            d="M140 235 C155 230, 165 240, 160 250 C150 265, 130 255, 135 240"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="0.8"
            opacity="0.25"
            animate={active ? {
              rotate: [0, -360]
            } : {}}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: "150px 247px" }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};

const BrokenNetwork = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
        y: active ? 0 : 40
      }}
      transition={{ duration: 0.6 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        width="400"
        height="400"
        className="w-full h-full"
      >
        {/* SOLID CONNECTIONS - Pulse animation */}
        <g id="connections-solid">
          <motion.line
            x1="200" y1="200" x2="245" y2="175"
            stroke="#F59E0B"
            strokeWidth="2"
            opacity="0.6"
            animate={active ? {
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="200" y1="200" x2="175" y2="235"
            stroke="#F59E0B"
            strokeWidth="2"
            opacity="0.6"
            animate={active ? {
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.line
            x1="245" y1="175" x2="275" y2="215"
            stroke="#F59E0B"
            strokeWidth="2"
            opacity="0.6"
            animate={active ? {
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
        </g>

        {/* DASHED CONNECTIONS - Animated dashoffset */}
        <g id="connections-dashed">
          <motion.line
            x1="175" y1="235" x2="145" y2="200"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.4"
            animate={active ? {
              strokeDashoffset: [0, 8, 0]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.line
            x1="245" y1="175" x2="300" y2="155"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            opacity="0.4"
            animate={active ? {
              strokeDashoffset: [0, 9, 0]
            } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.line
            x1="275" y1="215" x2="310" y2="245"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.4"
            animate={active ? {
              strokeDashoffset: [0, -8, 0]
            } : {}}
            transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.line
            x1="175" y1="235" x2="165" y2="285"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            opacity="0.4"
            animate={active ? {
              strokeDashoffset: [0, -9, 0]
            } : {}}
            transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* BROKEN CONNECTIONS - Flicker effect */}
        <g id="connections-broken">
          {/* Broken 1 */}
          <motion.line
            x1="200" y1="200" x2="180" y2="170"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0, 0.3, 0.3]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="160" y1="145" x2="140" y2="120"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0.3, 0, 0.3]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Broken 2 */}
          <motion.line
            x1="245" y1="175" x2="260" y2="150"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0, 0.3, 0.3]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.line
            x1="280" y1="120" x2="300" y2="95"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0.3, 0, 0.3]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Broken 3 */}
          <motion.line
            x1="175" y1="235" x2="150" y2="255"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0, 0.3, 0.3]
            } : {}}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.line
            x1="120" y1="280" x2="95" y2="300"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0.3, 0, 0.3]
            } : {}}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          />

          {/* Broken 4 */}
          <motion.line
            x1="275" y1="215" x2="295" y2="230"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0, 0.3, 0.3]
            } : {}}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.line
            x1="325" y1="255" x2="350" y2="275"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            opacity="0.3"
            animate={active ? {
              opacity: [0.3, 0.3, 0, 0.3]
            } : {}}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
        </g>

        {/* FRICTION SPARKS - Pulse/burst animation */}
        <motion.g
          opacity="0.4"
          animate={active ? {
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "170px 160px" }}
        >
          <line x1="170" y1="160" x2="165" y2="150" stroke="#EF4444" strokeWidth="0.8" />
          <line x1="170" y1="160" x2="160" y2="162" stroke="#EF4444" strokeWidth="0.8" />
          <line x1="170" y1="160" x2="172" y2="148" stroke="#EF4444" strokeWidth="0.8" />
        </motion.g>

        <motion.g
          opacity="0.5"
          animate={active ? {
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "270px 135px" }}
        >
          <line x1="270" y1="135" x2="262" y2="128" stroke="#EF4444" strokeWidth="0.8" />
          <line x1="270" y1="135" x2="280" y2="130" stroke="#EF4444" strokeWidth="0.8" />
          <line x1="270" y1="135" x2="268" y2="125" stroke="#EF4444" strokeWidth="0.8" />
        </motion.g>

        {/* ATTEMPTED CONNECTIONS - Draw/retract animation */}
        <g id="attempted-connections">
          <motion.line
            x1="200" y1="200" x2="215" y2="150"
            stroke="#FDE68A"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 0.7, 0],
              opacity: [0.2, 0.4, 0.2]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="175" y1="235" x2="135" y2="235"
            stroke="#FDE68A"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 0.6, 0],
              opacity: [0.2, 0.4, 0.2]
            } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </g>

        {/* NODES */}
        <g id="nodes">
          {/* CENTRAL USER NODE - Anxious pulse */}
          <motion.circle
            cx="200" cy="200" r="18"
            fill="#F59E0B"
            opacity="0.8"
            animate={active ? {
              r: [18, 20, 18],
              opacity: [0.8, 1, 0.8]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="200" cy="200" r="24"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
            opacity="0.3"
            animate={active ? {
              r: [24, 28, 24],
              opacity: [0.3, 0.5, 0.3]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* KEY NODES - Gentle breathing */}
          <motion.circle
            cx="245" cy="175" r="17"
            fill="#FBBF24"
            opacity="0.7"
            animate={active ? {
              r: [17, 18, 17],
              opacity: [0.7, 0.85, 0.7]
            } : {}}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="175" cy="235" r="16"
            fill="#FBBF24"
            opacity="0.6"
            animate={active ? {
              r: [16, 17, 16],
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* MEDIUM NODES */}
          <motion.circle
            cx="275" cy="215" r="13"
            fill="#FCD34D"
            opacity="0.6"
            animate={active ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "275px 215px" }}
          />
          <motion.circle
            cx="145" cy="200" r="12"
            fill="#FCD34D"
            opacity="0.5"
            animate={active ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            style={{ transformOrigin: "145px 200px" }}
          />
          <motion.circle
            cx="165" cy="285" r="12"
            fill="#FCD34D"
            opacity="0.5"
            animate={active ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{ transformOrigin: "165px 285px" }}
          />

          {/* SMALL/DISTANT NODES */}
          <motion.circle
            cx="300" cy="155" r="9"
            fill="#FCD34D"
            opacity="0.4"
            animate={active ? {
              opacity: [0.4, 0.6, 0.4]
            } : {}}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="310" cy="245" r="8"
            fill="#FCD34D"
            opacity="0.4"
            animate={active ? {
              opacity: [0.4, 0.6, 0.4]
            } : {}}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* ISOLATED NODES - Sad pulse with ripples */}
          <motion.circle
            cx="80" cy="120" r="10"
            fill="#FBBF24"
            opacity="0.3"
            animate={active ? {
              r: [10, 11, 10],
              opacity: [0.3, 0.5, 0.3]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="80" cy="120" r="18"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="1"
            opacity="0.25"
            animate={active ? {
              r: [18, 24, 18],
              opacity: [0.25, 0, 0.25]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          />

          <motion.circle
            cx="350" cy="300" r="9"
            fill="#FBBF24"
            opacity="0.3"
            animate={active ? {
              r: [9, 10, 9],
              opacity: [0.3, 0.5, 0.3]
            } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.circle
            cx="350" cy="300" r="16"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="1"
            opacity="0.25"
            animate={active ? {
              r: [16, 22, 16],
              opacity: [0.25, 0, 0.25]
            } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
        </g>
      </svg>
    </motion.div>
  );
};

const BreakingChains = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
        y: active ? 0 : 40
      }}
      transition={{ duration: 0.6 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        width="400"
        height="400"
        className="w-full h-full"
      >
        {/* Gradients */}
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#374151" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient id="metal-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#6B7280" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="break-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="50%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="400" height="400" fill="url(#bg-gradient)" />

        {/* Shadow - Weight effect */}
        <motion.g
          opacity="0.25"
          animate={active ? {
            opacity: [0.25, 0.15, 0.25]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="95" y="215" width="210" height="20" rx="10" fill="#111827" />
        </motion.g>

        {/* Intact Chain Link 1 - Subtle swing */}
        <motion.g
          animate={active ? {
            rotate: [0, -2, 0, 2, 0],
            y: [0, -1, 0, 1, 0]
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "114px 197px" }}
        >
          <rect x="90" y="185" width="48" height="24" rx="12"
            fill="none" stroke="#4B5563" strokeWidth="3" />
          <rect x="90" y="185" width="48" height="24" rx="12"
            fill="url(#metal-sheen)" />
        </motion.g>

        {/* Intact Chain Link 2 */}
        <motion.g
          animate={active ? {
            rotate: [0, 1, 0, -1, 0],
            y: [0, 1, 0, -1, 0]
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "154px 197px" }}
        >
          <rect x="130" y="185" width="48" height="24" rx="12"
            fill="none" stroke="#6B7280" strokeWidth="3" />
          <rect x="130" y="185" width="48" height="24" rx="12"
            fill="url(#metal-sheen)" />
        </motion.g>

        {/* Breaking Link - Center */}
        <motion.g
          animate={active ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "194px 197px" }}
        >
          <rect x="170" y="185" width="48" height="24" rx="12"
            fill="none" stroke="url(#break-gradient)" strokeWidth="3" />

          {/* Cracks - Progressive appearance */}
          <motion.line
            x1="190" y1="187" x2="198" y2="205"
            stroke="#A3E635"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 1, 1],
              opacity: [0, 1, 0.7]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="200" y1="187" x2="195" y2="207"
            stroke="#10B981"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 1, 1],
              opacity: [0, 1, 0.7]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.line
            x1="210" y1="188" x2="205" y2="203"
            stroke="#6EE7B7"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={active ? {
              pathLength: [0, 1, 1],
              opacity: [0, 1, 0.7]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
        </motion.g>

        {/* Energy Sparks - Burst effect */}
        <motion.g
          animate={active ? {
            opacity: [0, 1, 0.7, 0],
            scale: [0, 1.5, 1, 0]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          <line x1="200" y1="200" x2="212" y2="190"
            stroke="#10B981" strokeWidth="1.5" />
          <line x1="200" y1="200" x2="214" y2="205"
            stroke="#34D399" strokeWidth="1.5" />
          <line x1="200" y1="200" x2="195" y2="186"
            stroke="#A3E635" strokeWidth="1.2" />
          <line x1="200" y1="200" x2="188" y2="208"
            stroke="#6EE7B7" strokeWidth="1.2" />
        </motion.g>

        {/* Chain Fragments - Scatter animation */}
        <motion.rect
          x="230" y="180" width="16" height="8" rx="3"
          fill="#6B7280"
          animate={active ? {
            x: [230, 250, 260],
            y: [180, 165, 155],
            rotate: [0, 45, 90],
            opacity: [1, 0.8, 0.3],
            fill: ["#6B7280", "#10B981", "#34D399"]
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        <motion.rect
          x="250" y="170" width="12" height="10" rx="3"
          fill="#10B981"
          animate={active ? {
            x: [250, 275, 290],
            y: [170, 150, 135],
            rotate: [0, -60, -120],
            opacity: [1, 0.7, 0.2]
          } : {}}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
        />
        <motion.rect
          x="260" y="200" width="14" height="9" rx="3"
          fill="#34D399"
          animate={active ? {
            x: [260, 280, 295],
            y: [200, 215, 225],
            rotate: [0, 30, 60],
            opacity: [1, 0.6, 0.1]
          } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
        />
        <motion.rect
          x="240" y="210" width="10" height="6" rx="2"
          fill="#6EE7B7"
          animate={active ? {
            x: [240, 255, 265],
            y: [210, 230, 245],
            rotate: [0, -45, -90],
            opacity: [1, 0.5, 0]
          } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
        />
        <motion.rect
          x="275" y="185" width="18" height="8" rx="3"
          fill="#10B981"
          animate={active ? {
            x: [275, 300, 320],
            y: [185, 170, 160],
            rotate: [0, 75, 150],
            opacity: [1, 0.6, 0.2]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        <motion.rect
          x="290" y="205" width="12" height="6" rx="2"
          fill="#A3E635"
          animate={active ? {
            x: [290, 310, 325],
            y: [205, 195, 185],
            rotate: [0, -90, -180],
            opacity: [1, 0.5, 0.1]
          } : {}}
          transition={{ duration: 2.7, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
        />

        {/* Energy Waves - Expand and fade */}
        <motion.path
          d="M200 200 A30 30 0 0 1 225 185"
          fill="none"
          stroke="#10B981"
          strokeWidth="0.8"
          opacity="0.35"
          animate={active ? {
            scale: [1, 1.5, 2],
            opacity: [0.35, 0.2, 0]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.path
          d="M200 200 A50 50 0 0 1 245 165"
          fill="none"
          stroke="#10B981"
          strokeWidth="0.7"
          opacity="0.3"
          animate={active ? {
            scale: [1, 1.4, 1.8],
            opacity: [0.3, 0.15, 0]
          } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.path
          d="M200 200 A70 70 0 0 1 260 150"
          fill="none"
          stroke="#10B981"
          strokeWidth="0.6"
          opacity="0.25"
          animate={active ? {
            scale: [1, 1.3, 1.6],
            opacity: [0.25, 0.12, 0]
          } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.path
          d="M200 200 A90 90 0 0 1 280 140"
          fill="none"
          stroke="#10B981"
          strokeWidth="0.5"
          opacity="0.2"
          animate={active ? {
            scale: [1, 1.2, 1.4],
            opacity: [0.2, 0.1, 0]
          } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Liberation Particles - Rising animation */}
        <g id="liberation-particles">
          {/* Clustered near source */}
          <motion.circle
            cx="205" cy="190" r="3"
            fill="#10B981"
            opacity="0.8"
            animate={active ? {
              cy: [190, 160, 130],
              x: [0, 5, 10],
              opacity: [0.8, 0.5, 0]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <motion.circle
            cx="210" cy="185" r="2.5"
            fill="#34D399"
            opacity="0.7"
            animate={active ? {
              cy: [185, 155, 125],
              x: [0, -3, -6],
              opacity: [0.7, 0.4, 0]
            } : {}}
            transition={{ duration: 2.7, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
          <motion.circle
            cx="215" cy="195" r="2"
            fill="#6EE7B7"
            opacity="0.6"
            animate={active ? {
              cy: [195, 165, 135],
              x: [0, 8, 15],
              opacity: [0.6, 0.3, 0]
            } : {}}
            transition={{ duration: 2.3, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
          />

          {/* Outward arc */}
          <motion.circle
            cx="230" cy="170" r="3"
            fill="#34D399"
            opacity="0.6"
            animate={active ? {
              cy: [170, 140, 110],
              cx: [230, 245, 260],
              opacity: [0.6, 0.3, 0]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
          />
          <motion.circle
            cx="245" cy="155" r="2.5"
            fill="#6EE7B7"
            opacity="0.5"
            animate={active ? {
              cy: [155, 125, 95],
              cx: [245, 265, 285],
              opacity: [0.5, 0.25, 0]
            } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: 1 }}
          />
          <motion.circle
            cx="260" cy="145" r="2"
            fill="#10B981"
            opacity="0.5"
            animate={active ? {
              cy: [145, 115, 85],
              cx: [260, 280, 300],
              opacity: [0.5, 0.25, 0]
            } : {}}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          />

          <motion.circle
            cx="235" cy="215" r="3"
            fill="#34D399"
            opacity="0.6"
            animate={active ? {
              cy: [215, 185, 155],
              cx: [235, 250, 265],
              opacity: [0.6, 0.3, 0]
            } : {}}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
          />
          <motion.circle
            cx="255" cy="225" r="2.5"
            fill="#6EE7B7"
            opacity="0.5"
            animate={active ? {
              cy: [225, 195, 165],
              cx: [255, 275, 290],
              opacity: [0.5, 0.25, 0]
            } : {}}
            transition={{ duration: 3.1, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
          />

          {/* Motion trails */}
          <motion.line
            x1="230" y1="170" x2="222" y2="176"
            stroke="#34D399"
            strokeWidth="0.6"
            opacity="0.4"
            animate={active ? {
              y1: [170, 140, 110],
              y2: [176, 146, 116],
              opacity: [0.4, 0.2, 0]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
          />
          <motion.line
            x1="260" y1="145" x2="252" y2="150"
            stroke="#6EE7B7"
            strokeWidth="0.6"
            opacity="0.4"
            animate={active ? {
              y1: [145, 115, 85],
              y2: [150, 120, 90],
              opacity: [0.4, 0.2, 0]
            } : {}}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          />
        </g>
      </svg>
    </motion.div>
  );
};

const DNATransformation = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
        y: active ? 0 : 40
      }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-80 h-80"
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* DNA Helix */}
          <motion.path
            d="M50 20 Q75 50 50 80 Q25 110 50 140 Q75 170 50 180"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M150 20 Q125 50 150 80 Q175 110 150 140 Q125 170 150 180"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const AscendingFigure = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
        y: active ? 0 : 40
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Figure */}
        <motion.div
          className="w-16 h-24 bg-gradient-to-b from-purple-500 to-gold-500 rounded-full"
          animate={active ? {
            y: [0, -30, 0]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Achievement Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-gold-500 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={active ? {
              scale: [0, 2],
              opacity: [1, 0]
            } : {}}
            transition={{
              duration: 2,
              delay: i * 0.6,
              repeat: Infinity
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TransformationJourney;