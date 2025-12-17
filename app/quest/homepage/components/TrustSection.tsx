'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

const trustlogo = [
    {
        id: 1,
        src: '/next.svg',
        alt: "Logo 1"
    },
    {
        id: 2,
        src: '/next.svg',
        alt: "Logo 2"
    },
    {
        id: 3,
        src: '/next.svg',
        alt: "Logo 3"
    },
    {
        id: 4,
        src: '/next.svg',
        alt: "Logo 4"
    },
    {
        id: 5,
        src: '/next.svg',
        alt: "Logo 5"
    },
    {
        id: 6,
        src: '/next.svg',
        alt: "Logo 6"
    },
]

const TrustSection: React.FC = () => {
  return (
    <motion.div className='flex flex-col items-center justify-center w-full lg:w-auto overflow-hidden' >
        
        <div className="overflow-hidden max-w-7xl w-full">
            <motion.div
                className="flex flex-row items-center justify-between gap-0 sm:gap-8"
                // animate={{ x: ['0%', '-10%'] }}
                // transition={{
                //     duration: 5,
                //     repeat: Infinity,
                //     ease: 'linear',
                // }}
            >
                {/* {[...new Array(1)].fill(0).map((_, index) => (
                    
                    <React.Fragment key={index}>
                        {trustlogo.map((logo, idx) => (
                            <div
                                key={idx}
                                className=' grayscale hover:grayscale-0 transition-all duration-300'
                            >
                                <Image
                                    src={logo.src}
                                    height={80}
                                    width={80}
                                    alt={logo.alt}
                                    className='text-foreground opacity-70 dark:invert'
                                />
                            </div>
                        ))}
                    </React.Fragment>
                ))} */}
                <span className="font-bold text-xl font-serif text-neutral-400">Google</span>
                <span className="font-bold text-xl font-sans italic text-neutral-400">NETFLIX</span>
                <span className="font-bold text-xl font-sans text-neutral-400">amazon</span>
                <span className="font-bold text-xl font-serif hidden sm:block text-neutral-400">The New York Times</span>
                <span className="font-bold text-xl font-sans italic text-neutral-400">Meta</span>
                <span className="font-bold text-xl font-sans hidden sm:block text-neutral-400">Microsoft</span>
            </motion.div>
        </div>

    </motion.div>
  )};

  export default TrustSection;

