'use client';

import React, {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import { Tooltip } from './Tooltip';
import { ChevronDown, ChevronUp, LockIcon } from 'lucide-react';
import CardCarousel from './CardCarousal';
import { VIEWPORT_DIMENSIONS, CARD_DIMENSIONS, calculateDimensions } from './Constants';
import { CARDS_DATA } from './CardData';
import { Skeleton } from "@/components/ui/skeleton"

function TestPage() {
    const [isClicked, setIsClicked] = useState<{key: string, value: string} | null>(null)
    const [clickedbuttonId, setClickedButtonId] = useState<string | null>(null);
    const SCALE = 2.8;
    // Dynamic dimensions based on window width
    const [dimensions, setDimensions] = useState({
        viewport: VIEWPORT_DIMENSIONS,
        card: CARD_DIMENSIONS
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const startTime = Date.now();
    
    const handleResize = () => {
        setDimensions(calculateDimensions(window.innerWidth));
    };

    // Initial calculation
    handleResize();
    
    // Ensure minimum 80ms loading time
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, 80 - elapsed);
    
    setTimeout(() => {
        setIsLoading(false);
    }, remainingTime);

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
    }, []);



  return (
    <div>
        <div>
          {/* <div className="relative overflow-hidden"
            style={{
                width: '100vw',
                height: `${dimensions.viewport.height}px`,
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)'
            }}>
                <CardCarousel 
                    cards={CARDS_DATA}
                    cardDim={dimensions.card}
                    viewportDim={dimensions.viewport}
                />
            </div> */}

            <div className="relative overflow-hidden"
                style={{
                    width: '100vw',
                    height: `${dimensions.viewport.height}px`,
                    marginLeft: 'calc(50% - 50vw)',
                    marginRight: 'calc(50% - 50vw)'
                }}
            >
                {isLoading ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Center Card */}
                        <Skeleton 
                            className="absolute rounded-xl"
                            style={{
                                width: `${dimensions.card.width}px`,
                                height: `${dimensions.card.height}px`,
                            }}
                        />
                        {/* Left Card */}
                        <Skeleton 
                            className="absolute rounded-xl opacity-40"
                            style={{
                                width: `${dimensions.card.width * 0.85}px`,
                                height: `${dimensions.card.height * 0.85}px`,
                                transform: 'translateX(-120%)',
                            }}
                        />
                        {/* Right Card */}
                        <Skeleton 
                            className="absolute rounded-xl opacity-40"
                            style={{
                                width: `${dimensions.card.width * 0.85}px`,
                                height: `${dimensions.card.height * 0.85}px`,
                                transform: 'translateX(120%)',
                            }}
                        />
                    </div>
                ) : (
                    <CardCarousel 
                        cards={CARDS_DATA}
                        cardDim={dimensions.card}
                        viewportDim={dimensions.viewport}
                    />
                )}
            </div>

          {/* <div className='relative w-full max-w-screen mx-auto pt-18 p-10 bg-white'>
            <motion.h1 className="mb-5 text-left">
              <span className="block text-sm uppercase tracking-[0.3em] text-black mb-1">Core line</span>
              <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                Core Line of You
              </span>
              <div className="mt-6">
                
                <p className="text-black/80 text-lg font-gilroy-bold">{mockData.core_line}</p>
              </div>

            </motion.h1>
          </div> */}

          {/* <div className='relative w-full max-w-screen pt-18 p-10 bg-neutral-400'>
            <motion.h1 className="mb-5 text-left">
              <span className="block text-sm uppercase tracking-[0.3em] text-neutral-600 mb-1">Primary Pattern</span>
              <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                Your <span className='text-neutral-200'>Primary</span> Pattern
              </span>
              <div className="mt-6">

                <p className="text-black/80 text-lg font-gilroy-regular">{mockData.primary_pattern}</p>
              </div>
            </motion.h1>
          </div> */}

          {/* <div className='relative w-full max-w-screen pt-18 p-10 bg-white'>
            <motion.h1 className="mb-5 text-left">
              <span className="block text-sm uppercase tracking-[0.3em] text-black mb-1">Calibrate</span>
              <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                Calibrate Your Depth
              </span>
            </motion.h1>

            <div className="relative w-full max-w-[480px] mx-auto pt-4">
            <motion.div className="mb-5 flex w-full items-center justify-between">
              <span className="block text-md uppercase tracking-[0.3em] text-black/70 mb-1"> </span>
              <span className="block text-sm font-gilroy-bold bg-transparent px-2 py-1 rounded-xl shadow-xl border-2 border-black text-black/70">
                DEPTH SCORE - {mockData?.depth_score || 10}
              </span>
            </motion.div>

            <div className="flex flex-col gap-8">
              {Object.keys(mockData.slider_question)
                .filter(key => key.startsWith('question'))
                .map((key, index) => {
                  const questionNumber = index + 1;
                  const likertKey = `likert${questionNumber}` as keyof typeof mockData.slider_question;
                  const likertLabels = mockData.slider_question[likertKey] as [string, string];

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className=""
                    >
                      
                      <h3 className="text-black text-lg font-gilroy-semibold">
                        {mockData.slider_question[key as keyof typeof mockData.slider_question]}
                      </h3>

                      
                      <div className="space-y-1">
                        
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            className="w-full h-2 bg-black rounded-full appearance-none cursor-pointer
                                  [&::-webkit-slider-thumb]:appearance-none
                                  [&::-webkit-slider-thumb]:w-6
                                  [&::-webkit-slider-thumb]:h-6
                                  [&::-webkit-slider-thumb]:rounded-full
                                  [&::-webkit-slider-thumb]:bg-black
                                  [&::-webkit-slider-thumb]:cursor-pointer
                                  [&::-webkit-slider-thumb]:shadow-lg
                                  [&::-moz-range-thumb]:w-6
                                  [&::-moz-range-thumb]:h-6
                                  [&::-moz-range-thumb]:rounded-full
                                  [&::-moz-range-thumb]:bg-black
                                  [&::-moz-range-thumb]:cursor-pointer
                                  [&::-moz-range-thumb]:border-0
                                  [&::-moz-range-thumb]:shadow-lg"
                            style={{
                              background: `linear-gradient(to right, #000000 80%, rgba(0,0,0,0.1) 70%)`
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              const numericValue = parseInt(value);
                              const percentage = (numericValue / 10) * 100;
                              e.target.style.background = `linear-gradient(to right, #000000 ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
                            }}
                          />
                        </div>

                       
                        <div className="flex justify-between items-center font-gilroy-light">
                          <span className="text-neutral-900 text-sm uppercase tracking-wider">
                            {likertLabels[0]}
                          </span>
                          <span className="text-neutral-900 text-sm uppercase tracking-wider">
                            {likertLabels[1]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>

            <div className='flex w-full justify-end mt-10'>
              <button
                className='block text-sm font-gilroy-bold bg-transparent px-2 py-1 rounded-xl shadow-xl border-2 border-white text-white/70 hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Submit
              </button>
            </div>
            </div>
          </div> */}

          {/* <div className='relative w-full max-w-screen pt-18 p-10 bg-sky-900'>
            <motion.h1 className="mb-5 text-left">
              <span className="block text-sm uppercase tracking-[0.3em] text-white mb-1">Calibrate</span>
              <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-100">
                Behaviour Signals
              </span>
            </motion.h1>
            <motion.div className="mb-5 flex w-full items-center justify-between">
              <span className="block text-md uppercase tracking-[0.3em] text-white/70 mb-1"></span>
              <span className="block text-sm uppercase font-gilroy-bold bg-transparent px-2 py-1 rounded-xl shadow-xl border-2 border-white text-white/70">
                5 detected
              </span>
            </motion.div>

            <div className="flex flex-col gap-5">
              {Object.entries(mockData.signals).filter(([key, _]) => key.endsWith("_purpose")).map(([key, value]) => {
                const descKey = key.replace("_purpose", "_description");
                return (
                  <motion.div key={key}
                    className="p-4 border border-white/20 rounded-lg bg-white/5 cursor-pointer">
                    <div className="flex items-center mb-2">
                      <div
                        onClick={() => clickedbuttonId === key ? setClickedButtonId(null) : setClickedButtonId(key)}
                        className="text-xl font-gilroy-semibold text-white mb-2 px-2 py-2 w-full flex items-center justify-between">
                        <span className='flex gap-2 items-center'>{value} {key !== 'signal1_purpose' ? <LockIcon className='text-white size-4' /> : null}</span>
                        {clickedbuttonId === key ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {clickedbuttonId === key && (
                        <>
                          <motion.div
                            initial={{ height: 40, overflow: 'hidden' }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                            className={`text-white/80 text-sm font-gilroy-medium ${key === 'signal1_purpose' ? '' : 'blur-sm'}`}
                          >
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                              className='relative'
                            >
                              {(mockData.signals as Record<string, string>)[descKey]}
                            </motion.div>

                          </motion.div>

                        </>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div> 

            <div className='w-full'>
            <svg width="400" height="450" viewBox="0 0 664 744" fill="none" xmlns="http://www.w3.org/2000/svg">


                <path d="M 134 344 Q 240 180 330 110" stroke="#0ea5e9" strokeWidth="2" fill="none"/>
                <path d="M 134 344 Q 300 300 450 250" stroke="#0ea5e9" strokeWidth="2" fill="none"/>
                <path d="M 134 344 Q 300 380 460 410" stroke="#0ea5e9" strokeWidth="2" fill="none"/>
                <path d="M 134 344 Q 220 480 293 573" stroke="#0ea5e9" strokeWidth="2" fill="none"/>

                Top node
                <circle cx="330" cy="110" r="20" fill="#f8fafc"/>

                Right top node
                <circle cx="450" cy="250" r="16" fill="#f8fafc"/>

                Right bottom node
                <circle cx="460" cy="410" r="14" fill="#f8fafc"/>

                Bottom node
                <circle cx="293" cy="573" r="14" fill="#f8fafc"/>

                Center node (largest)
                <circle cx="134" cy="344" r="28" fill="#f8fafc"/>

                Text labels
                <text x="332" y="50" fontFamily="Arial, sans-serif" fontSize="24" fill="#e5e5e5" textAnchor="middle">
                    Building confidence in public speaking
                </text>

                <text x="450" y="300" fontFamily="Arial, sans-serif" fontSize="22" fill="#e5e5e5" textAnchor="middle">
                    Exploring new hobbies
                </text>

                <text x="460" y="460" fontFamily="Arial, sans-serif" fontSize="22" fill="#e5e5e5" textAnchor="middle">
                    Managing digital screen time
                </text>

                <text x="293" y="635" fontFamily="Arial, sans-serif" fontSize="22" fill="#e5e5e5" textAnchor="middle">
                    Feeling grateful for time with family
                </text>

                <text x="1" y="395" fontFamily="Arial, sans-serif" fontSize="20" fill="#e5e5e5" textAnchor="start">
                    Anxiety due to changing work
                </text>
            </svg>
            </div>
            

          </div> */}

            
          </div>




        </div>
  )
}

export default TestPage