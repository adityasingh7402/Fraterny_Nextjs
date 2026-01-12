"use client";

import React, { useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
  if (isInView) {
    // Start directly at the initial value
    setCount(end);
    
    const scheduleNextIncrement = () => {
      // Random delay between 2-6 seconds
      const delay = Math.random() * 4000 + 2000;
      
      const timeout = setTimeout(() => {
        setCount(prev => prev + 1);
        scheduleNextIncrement(); // Schedule next increment
      }, delay);
      
      return timeout;
    };
    
    const timeoutId = scheduleNextIncrement();
    
    return () => clearTimeout(timeoutId);
  }
}, [end, isInView]);

  return (
  <span ref={ref} className="inline-block tabular-nums">
    <AnimatePresence mode="popLayout">
      <motion.span
        key={count}
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
        exit={{ 
          y: 20, 
          opacity: 0,
          transition: { duration: 0.2 }
        }}
        className="inline-block"
      >
        {prefix}{count}{suffix}
      </motion.span>
    </AnimatePresence>
  </span>
);
};

function EndCTAsection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as any,
      },
    },
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - CTA Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center space-y-10"
          >
            {/* Begin Your Journey */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-gilroy-bold text-neutral-900 tracking-tight leading-tight">
                Begin Your Journey
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-gilroy-regular leading-relaxed max-w-xl">
                Start exploring your potential and unlock new possibilities with our comprehensive platform.
              </p>
            </div>

            {/* Want to Know More */}
            <div className="space-y-5">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-gilroy-semibold text-neutral-700">
                Want to Know More?
              </h3>
              <Link href="/faq">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center justify-center gap-8 px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'
                >
                  Visit FAQ
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Info Cards */}
          <div className="flex flex-col gap-6 lg:gap-7">
            
            {/* FratVilla Card */}
            <motion.article variants={itemVariants}>
              <Link href="/fratvilla" className="group block">
                <div className="p-5 sm:p-6 md:p-7 border rounded-3xl shadow-lg bg-accent/50 backdrop-blur-sm hover:shadow-xl transition-all">
                  <div className="space-y-4">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-gilroy-bold text-foreground group-hover:text-primary transition-colors">
                      FratVilla
                    </h4>
                    
                    <div className="space-y-2">
                      <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-gilroy-regular">
                        {/* <AnimatedCounter end={10} duration={2} /> successful sessions */}
                        30+ successful sessions
                      </p>
                      <p className="text-base sm:text-lg md:text-xl text-emerald-600 font-gilroy-semibold">
                        {/* <AnimatedCounter end={5} duration={1.5} /> seats open */}
                        5 seats open now
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-base sm:text-lg font-gilroy-bold text-primary group-hover:gap-3 transition-all">
                        Explore Villa
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>

            {/* Quest Card */}
            <motion.article variants={itemVariants}>
              <Link href="/quest" className="group block">
                <div className="p-5 sm:p-6 md:p-7 border rounded-3xl shadow-lg bg-accent/50 backdrop-blur-sm hover:shadow-xl transition-all">
                  <div className="space-y-4">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-gilroy-bold text-foreground group-hover:text-primary transition-colors">
                      Quest
                    </h4>
                    
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-gilroy-bold text-primary">
                        <AnimatedCounter end={247} duration={3.5} />
                      </span>
                      <span className="text-sm sm:text-base md:text-lg text-muted-foreground font-gilroy-regular">
                        total quests completed
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-base sm:text-lg font-gilroy-bold text-primary group-hover:gap-3 transition-all">
                        Enter Quest Mode
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>

            {/* Intelligence File Card */}
            <motion.article variants={itemVariants}>
              <Link href="/intelligence-file" className="group block">
                <div className="p-5 sm:p-6 md:p-7 border rounded-3xl shadow-lg bg-accent/50 backdrop-blur-sm hover:shadow-xl transition-all">
                  <div className="space-y-4">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-gilroy-bold text-foreground group-hover:text-primary transition-colors">
                      Private Intelligence File
                    </h4>
                    
                    <div className="space-y-2">
                      <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-gilroy-regular">
                        {/* <AnimatedCounter end={100} duration={2} suffix="+" /> purchased */}
                        130+ purchased
                      </p>
                      <p className="text-base sm:text-lg md:text-xl text-primary font-gilroy-semibold">
                        {/* Community of <AnimatedCounter end={230} duration={3.5} suffix="+" /> members */}
                        Community of 300+ members
                      </p>
                    </div>

                    {/* <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-base sm:text-lg font-gilroy-bold text-primary group-hover:gap-3 transition-all">
                        Access Intelligence
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div> */}
                  </div>
                </div>
              </Link>
            </motion.article>

          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default EndCTAsection;