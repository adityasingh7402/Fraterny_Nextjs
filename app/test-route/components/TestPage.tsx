'use client';

import React, {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import { Tooltip } from './Tooltip';
import { ChevronDown, ChevronUp, LockIcon } from 'lucide-react';
import CardCarousel from './CardCarousal';
import { VIEWPORT_DIMENSIONS, CARD_DIMENSIONS, CARDS_DATA, calculateDimensions } from './Constants';


export const mockData = {
    "archetype":{
        "self":"Soul Cartographer",
        "world":"Quiet Prodigy",
        "aspiration":"Hopewright"
    },
    "core_line":"You keep reaching for a life built on quiet presence, yet when uncertainty rises you almost automatically reach back for the old proof-by-effort script that once kept you safe.",
    "primary_pattern":"You see yourself as someone who is here to map inner worlds and turn suffering into understanding. In daily life, others meet the reliable, undemanding achiever who rarely shows how much weight you carry inside. What pulls you forward is a simple but demanding wish: to live from embodied peace, abroad if needed, and to let spiritual practice shape your days instead of fear. The live tension is between trusting this slower, riskier path and the fast, familiar comfort of working harder than you actually want to.",
    "slider_question":{
        "question1":"When you slow down and rest, do you start to feel guilty inside?",
        "question2":"Right now, how hard is it for you to ask someone for help?",
        "question3":"How much do you feel torn between family duty and your own path?",
        "question4":"Do you feel your spiritual ideas and your daily life actually match?",
        "likert1":["Not at all","Very much"],
        "likert2":["Not Hard","Very Hard"],
        "likert3":["Doesn’t matter","Matters a lot"],
        "likert4":["Never","Always"]
    },
    "signals":{
        "signal1_purpose":"Work-as-safety autopilot",
        "signal2_purpose":"Disappearing needs",
        "signal3_purpose":"Deferred grief",
        "signal4_purpose":"Concepts as armor",
        "signal5_purpose":"Conditional freedom plan",
        "signal1_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal2_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal3_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal4_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal5_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want."
    },
    "depth_score":42
};

function TestPage() {
    const [isClicked, setIsClicked] = useState<{key: string, value: string} | null>(null)
    const [clickedbuttonId, setClickedButtonId] = useState<string | null>(null);
    const SCALE = 2.8;
    const cardDetails = mockData.archetype
    // Dynamic dimensions based on window width
    const [dimensions, setDimensions] = useState({
    viewport: VIEWPORT_DIMENSIONS,
    card: CARD_DIMENSIONS
});

    // Calculate dimensions on mount and window resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions(calculateDimensions(window.innerWidth));
        };

        // Initial calculation
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);



  return (
    <div>
        <div>
          {/* <div className="relative w-full max-w-screen">
            <motion.h1 className="mb-10 text-left p-10">
              <span className="block text-sm uppercase tracking-[0.3em] text-white/70 mb-1">Analysis Complete</span>
              <span className="block text-5xl font-gilroy-bold tracking-tighter bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Quest Reveals About You
              </span>

            </motion.h1>
            <div className="flex relative justify-center items-center h-[380px] mt-24">
                    {Object.entries(mockData.archetype).map(([key, value], index) => (
                    <motion.div 
                        key={key} 
                        layoutId={`card-${key}`}
                        className='bg-linear-to-b from-sky-700 to-sky-950 backdrop-blur-3xl border-white/20 border rounded-t-lg p-4 flex flex-col h-[280px] w-[200px] absolute cursor-pointer'
                        style={{
                        rotate: `${(index - 1) * 23}deg`,
                        transformOrigin: 'bottom center',
                        bottom: '190px',
                        left: '25%',
                        transform: `translateX(-100%) rotate(${(index - 1) * 23}deg)`,
                        }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        onClick={() => setIsClicked({key, value})}
                    >
                        <motion.h2 
                        layoutId={`title-${key}`}
                        className="text-lg font-gilroy-semibold text-white uppercase tracking-[0.1em]"
                        >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        </motion.h2>
                       
                    </motion.div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center mask-t-from-55% via-55% to-0%">
                        <motion.div
                            layoutId={`card-${isClicked?.key}`}
                            className='bg-linear-to-b from-sky-700 to-sky-950  backdrop-blur-3xl rounded-xl p-4 flex flex-col h-[250px] w-full cursor-pointer'
                            onClick={() => setIsClicked(null)}
                        >
                            <p className='text-[10px] text-white/30 text-center'>Tap each card to discover..</p>
                            <span className="block mt-1 w-full h-0.5 bg-white/50 rounded-full"></span>

                            <div className="mt-6 text-white/90 text-center">
                                <h3 className="text-xl font-gilroy-bold mb-4">{isClicked ? isClicked.key.charAt(0).toUpperCase() + isClicked.key.slice(1) : "This is how the world sees you"}</h3>
                                <p className='text-md font-gilroy-medium'>{isClicked ? isClicked.value : "Select a card to see the description"}</p>
                                <p className='text-sm text-white/80 font-gilroy-medium'>Dummy text to illustrate what does this mean?</p>
                                <div className='flex flex-row items-center justify-center gap-5'>
                                    <p className='text-sm text-white/80 font-gilroy-medium'>You are among 20 others</p>
                                    <div className='flex items-center justify-center mt-10'>
                                    <Tooltip />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
            </div>
          </div> */}

          <div className="w-full relative overflow-hidden"
                style={{
                    width: '100vw',
                    height: `${dimensions.viewport.height}px`
                }}
            >
                <CardCarousel 
                    cards={CARDS_DATA}
                    cardDim={dimensions.card}
                    viewportDim={dimensions.viewport}
                />
            </div>

          <div className='relative w-full max-w-screen mx-auto pt-18 p-10 bg-white'>
            <motion.h1 className="mb-5 text-left">
              <span className="block text-sm uppercase tracking-[0.3em] text-black mb-1">Core line</span>
              <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                Core Line of You
              </span>
              <div className="mt-6">
                
                <p className="text-black/80 text-lg font-gilroy-bold">{mockData.core_line}</p>
              </div>

            </motion.h1>
          </div>

          <div className='relative w-full max-w-screen pt-18 p-10 bg-neutral-400'>
            <motion.h1 className="mb-5 text-left">
              <span className="block text-sm uppercase tracking-[0.3em] text-neutral-600 mb-1">Primary Pattern</span>
              {/* <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                Your <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-400 to-teal-400'>Primary</span> Pattern
              </span> */}
              <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                Your <span className='text-neutral-200'>Primary</span> Pattern
              </span>
              <div className="mt-6">

                <p className="text-black/80 text-lg font-gilroy-regular">{mockData.primary_pattern}</p>
              </div>
            </motion.h1>
          </div>

          <div className='relative w-full max-w-screen pt-18 p-10 bg-white'>
            <motion.h1 className="mb-5 text-left">
              <span className="block text-sm uppercase tracking-[0.3em] text-black mb-1">Calibrate</span>
              {/* <span className="block text-5xl font-gilroy-bold tracking-tighter text-neutral-800">
                Your <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-400 to-teal-400'>Primary</span> Pattern
              </span> */}
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
          </div>

          <div className='relative w-full max-w-screen pt-18 p-10 bg-sky-900'>
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

            {/* <div className="flex flex-col gap-5">
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
            </div> */}

            {/* <div className='w-full'>
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
            </div> */}
            

          </div>

            
          </div>




        </div>
  )
}

export default TestPage