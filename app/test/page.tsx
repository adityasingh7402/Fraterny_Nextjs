'use client';

import React, { useRef, useState } from 'react'
import mockData from './mock-data';
import { AuthBanner } from '../quest/reflection/[userId]/[sessionId]/[testId]/components/AuthBanner';
import { tokens, CTA_HEIGHT } from '../quest/reflection/[userId]/[sessionId]/[testId]/utils/constants';
import { SectionFrame } from '../quest/reflection/[userId]/[sessionId]/[testId]/components/SectionFrame';
import { motion, AnimatePresence } from 'motion/react';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { ArrowBigDown, ChevronDown, ChevronUp, LockIcon } from 'lucide-react';
import { sectionIds } from '../quest/reflection/[userId]/[sessionId]/[testId]/utils/sectionHelpers';
import { PDFImageViewer } from '../quest/reflection/[userId]/[sessionId]/[testId]/components/PDFImageViewer';
import FAQIntrospection from '../quest/reflection/[userId]/[sessionId]/[testId]/components/FAQIntrospection';
import Testimonials from '../quest/quest-mode/sections/Testimonials';
import { DualGatewayPricingData } from '../quest/reflection/[userId]/[sessionId]/[testId]/utils/types';

function page() {

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const archetype: Record<string, string> = mockData.archetype;
    const [clickedbuttonId, setClickedButtonId] = useState<string | null>(null);
    const [pricing, setPricing] = useState<DualGatewayPricingData>({
        razorpay: {
          main: '₹299',
          original: '₹999',
          currency: 'INR',
          symbol: '₹',
          amount: 299,
          isIndia: true,
          isLoading: true
        },
        paypal: {
          main: '$5',
          original: '$15',
          currency: 'USD',
          amount: 5,
          isIndia: false
        },
        isLoading: true
      });
    
    
  return (
    <div className='w-screen max-w-screen overflow-x-hidden'>
        <AuthBanner
            onSignIn={() => {}}
            onPayment={() => {}}
            user={null}
            paymentLoading={false}
            activeIndex={0}
        />

        <div
            ref={containerRef}
            className="w-full overflow-y-auto"
            style={{
                // iOS-friendly height and scrolling
                // Dynamic height: full height in PDF section, reduced height in other sections
                height: activeIndex === 9 ? '100dvh' : `calc(100dvh - ${CTA_HEIGHT}px)`,
                WebkitOverflowScrolling: 'touch',
                overscrollBehaviorY: 'none',
                overscrollBehaviorX: 'none',
                overscrollBehavior: 'none',
                touchAction: 'pan-y',
                // Softer snapping -> less "bounce"
                scrollSnapType: 'y mandatory',
                // Prevent elastic bounce
                position: 'relative',
                isolation: 'isolate'
            }}
            >

                <SectionFrame
                    id="emotional"
                    title=""
                    sub=""
                    shareText={ ""}
                    themeKey="emotional"
                    sessionId={""}
                    customClass="pt-16 pb-16 overflow-y-auto"
                    testId={""}
                    >
                    <div className="relative w-full max-w-[480px] mx-auto pt-4">
                        <motion.h1 className="mb-5 text-left">
                        <span className="block text-sm uppercase tracking-[0.3em] text-white/70 mb-1">Analysis Complete</span>
                        <span className="block text-5xl font-gilroy-bold tracking-tighter bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Let's explore Your Mind
                        </span>
                        
                        </motion.h1>

                        <div className="flex flex-row gap-5">
                        { Object.entries(archetype).map(([key, value]) => (
                            <div key={key} className="mb-6 border-l-2 border-white/30 pl-4">
                                <h2 className="text-lg font-gilroy-semibold text-white uppercase tracking-[0.1em]">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                                <p className="text-white/80 text-[12px]">{value}</p>
                            </div>
                        ))}
                        </div>
                        <span className="block mt-1 w-full h-0.5 bg-white/50 rounded-full"></span>

                        <div className="mt-6">
                            <h2 className="text-lg font-gilroy-semibold text-white uppercase tracking-[0.1em] mb-2">Core Line</h2>
                            <p className="text-white/80 text-lg font-gilroy-bold">{mockData.core_line}</p>
                        </div>

                        <PatternSVG />

                        <div className="mt-6">
                            <h2 className="text-lg font-gilroy-semibold text-white uppercase tracking-[0.1em] mb-2">Primary Pattern</h2>
                            <p className="text-white/80 text-sm">{mockData.primary_pattern}</p>
                        </div>
                    </div>
                </SectionFrame>


                {/* slider questions should be done by Aditya here */}
                <SectionFrame
                    id="mind"
                    title="Calibration"
                    sub=""
                    shareText={ ""}
                    themeKey="mind"
                    sessionId={""}
                    customClass="pt-16 pb-16 overflow-y-auto"
                    testId={""}
                    >
                    <div className="relative w-full max-w-[480px] mx-auto pt-4">
                        
                    </div>
                </SectionFrame> 

                <SectionFrame
                    id="mind"
                    title=""
                    sub=""
                    shareText={ ""}
                    themeKey="films"
                    sessionId={""}
                    customClass="pt-16 pb-16 overflow-y-auto"
                    testId={""}
                    >
                    <div className="relative w-full max-w-[480px] mx-auto pt-4">
                        <motion.h1 className="mb-5 text-left">
                        <span className="block text-sm uppercase tracking-[0.3em] text-white/70 mb-1">Behaviour Signals</span>
                        <span className="block text-5xl font-gilroy-bold tracking-tighter bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Quest Insights on Your Behaviour
                        </span>
                        </motion.h1>

                        <div className="flex flex-col gap-5">
                        { Object.entries(mockData.signals).filter(([key, _]) => key.endsWith("_purpose")).map(([key, value]) => {
                            const descKey = key.replace("_purpose", "_description");
                            return (
                                <motion.div key={key}
                                className="p-4 border border-white/20 rounded-lg bg-white/5 cursor-pointer">
                                    <div className="flex items-center mb-2">
                                    <div
                                    onClick={() => clickedbuttonId === key ? setClickedButtonId(null) :  setClickedButtonId(key)}
                                    className="text-xl font-gilroy-semibold text-white mb-2 px-2 py-2 w-full flex items-center justify-between">
                                        {value}
                                        {clickedbuttonId === key ? <ChevronUp size={16} className="ml-2"/> : <ChevronDown size={16} className="ml-2"/>}
                                    </div>
                                    </div>

                               <AnimatePresence>
                                {clickedbuttonId === key && (
                                    <>
                                    <motion.div
                                        initial={{height: 40, overflow: 'hidden'}}
                                        animate={{height: 'auto'}}
                                        exit={{height: 0, overflow: 'hidden'}}
                                        transition={{duration: 0.3}}
                                        className={`text-white/80 text-sm font-gilroy-medium ${key === 'signal1_purpose' ? '' : 'blur-sm'}`}
                                    >
                                        <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.3, delay: 0.1}}
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
                        
                    </div>
                </SectionFrame>

                 <SectionFrame
                id="pdf-report"
                title="Made from your words"
                sub="Sealed in full file"
                shareText="Check out my complete personality analysis from Fraterny!"
                themeKey="mind"
                customClass="pt-16 relative"
                sessionId={"ghhj"}
                testId={"ghh"}
                >
                <div style={{ paddingBottom: CTA_HEIGHT }}>
                    <div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='bg-transparent rounded-lg p-4 border border-white/30 shadow-lg'>
                                <p className='font-gilroy-semibold text-black uppercase'>blind spot analysis</p>
                            </div>
                            <div className='bg-transparent rounded-lg p-4 border border-white/30 shadow-lg'>
                                <p className='font-gilroy-semibold text-black uppercase'>growth levers</p>
                               
                            </div>
                            <div className='bg-transparent rounded-lg p-4 border border-white/30 shadow-lg'>
                                <p className='font-gilroy-semibold text-black uppercase'>relationship dynamics</p>
                            
                            </div>
                            <div className='bg-transparent rounded-lg p-4 border border-white/30 shadow-lg'>
                                <p className='font-gilroy-semibold text-black uppercase'>architectural map</p>
                            </div>
                        </div>
                        <div className='mt-6 uppercase text-sm text-neutral-100 w-full flex items-center justify-center'>
                            file contains 28 additional pages
                        </div>
                    </div>

                    <div className='bg-transparent rounded-lg mt-6 p-4 h-[300px] flex flex-col items-center justify-center backdrop-blur-3xl border border-white/30 shadow-lg'>
                        <div className='font-gilroy-bold text-2xl text-center text-neutral-900'>
                            <p>TAKE OWNERSHIP OF YOUR <br />ARCHITECTURE</p>
                            <p className='mt-2 text-sm font-gilroy-medium'>Access the full, unredacted dossier tailored to your specific calibration.</p>
                        </div>
                        <div>
                            <button className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-gilroy-semibold px-6 py-3 rounded-lg shadow-lg transition-colors'>
                                Download Full Report
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center mb-10 gap-4'>
                    <div className='bg-sky-300/10 rounded-lg p-4 w-full max-w-md border border-sky-300/30 shadow-lg'>
                        <p className='font-gilroy-semibold text-white text-lg'>"It felt illegal to read this. It articulated things I've felt for 10 years but never said."</p>
                        <p className='font-gilroy-medium text-neutral-300'>— Sarah K. // Architect</p>
                    </div>

                    <div className='bg-sky-300/10 rounded-lg p-4 w-full max-w-md border border-sky-300/30 shadow-lg'>
                        <p className='font-gilroy-semibold text-white text-lg'>"No fluff. Just pure signal. It didn't try to fix me, it just showed me the map."</p>
                        <p className='font-gilroy-medium text-neutral-300'>— James R. // Founder</p>
                    </div>
                </div>

                
                </SectionFrame>






                {/* Progress Rail */}
                <div className="fixed right-2 top-1/2 z-[55] -translate-y-1/2 flex flex-col items-center gap-2">
                {sectionIds.map((id, i) => (
                    <button
                    key={id}
                    aria-label={`Jump to ${id}`}
                    onClick={() => containerRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="transition-all"
                    style={{
                        width: 6,
                        height: i === activeIndex ? 20 : 6,
                        borderRadius: 9999,
                        background: i === activeIndex ? tokens.accent : 'rgba(10,10,10,0.25)'
                    }}
                    />
                ))}
                </div>

                

            </div>
        
    </div>
  )
}

export default page


const PatternSVG = () => {
    return (
        <svg width="500" height="500" viewBox="70 20 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>

    <radialGradient id="resultGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stopColor="#4facfe" stopOpacity="0.7" />
      <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.4" />
    </radialGradient>
    
   
    
   
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/> 
      </feMerge>
    </filter>
  </defs>


  <path d="M250 100 L250 266 M77 400 L250 266 M423 400 L250 266" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4"/>
  
 
  <polygon points="250,100 77,400 423,400" fill="none" stroke="#333" strokeWidth="3" strokeLinejoin="round" />

 
  <polygon points="250,150 130,360 380,330" fill="url(#resultGradient)" stroke="#00c6ff" strokeWidth="2" filter="url(#dropShadow)" />
  

  <circle cx="250" cy="150" r="4" fill="#0072ff" />
  <circle cx="130" cy="360" r="4" fill="#0072ff" />
  <circle cx="380" cy="330" r="4" fill="#0072ff" />


  <g transform="translate(145, 240) rotate(-60)">
    <rect x="-30" y="-15" width="60" height="30" fill="#f8f9fa" opacity="0.8"/> 
    <text x="0" y="5" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#333" textAnchor="middle" letterSpacing="2">SELF</text>
  </g>


  <g transform="translate(355, 240) rotate(60)">
    <rect x="-35" y="-15" width="70" height="30" fill="#f8f9fa" opacity="0.8"/>
    <text x="0" y="5" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#333" textAnchor="middle" letterSpacing="2">WORLD</text>
  </g>


  <g transform="translate(250, 400)">
    <rect x="-60" y="-10" width="120" height="20" fill="#f8f9fa" />
    <text x="0" y="5" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#333" textAnchor="middle" letterSpacing="2">ASPIRATION</text>
  </g>

</svg>
    )
}