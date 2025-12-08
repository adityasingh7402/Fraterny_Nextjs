'use client';


import ConcertPage from "./final-design/ConcertPage";
import PrimaryPattern from './final-design/PrimaryPattern';
import CalibrateSection from './final-design/CalibrateSection';
import Gallery3D from "./final-design/Gallery3D";
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, LockIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {CARDS_DATA, mockData} from './final-design/ResultData'
import { useIsMobile } from "../admin/hooks/use-mobile";
import { VIEWPORT_DIMENSIONS, CARD_DIMENSIONS, calculateDimensions } from './final-design/Constants';
import { Skeleton } from "@/components/ui/skeleton"
import CardCarousel from "./components/CardCarousal";
import { AuthBanner } from "./final-design/AuthBanner"
import { PDFImageViewer } from "../quest/reflection/[userId]/[sessionId]/[testId]/components/PDFImageViewer";
import { CTA_HEIGHT } from "../quest/reflection/[userId]/[sessionId]/[testId]/utils/constants";
import FAQIntrospection from "./final-design/FAQIntrospection";
import Testimonial from "./final-design/Testimonial";
import QuestFooter from "../quest/quest-mode/sections/QuestFooter";



export default function page() {
    const [clickedbuttonId, setClickedButtonId] = useState<string | null>(null);
    const [activeCardColor, setActiveCardColor] = useState<string>('#0394A3');
    const isMobile = useIsMobile();
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasTriggeredFeedback, setHasTriggeredFeedback] = useState(false);
    const [feedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
    const [isClicked, setIsClicked] = useState<{key: string, value: string} | null>(null)
    const containerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    
        const handleScroll = () => {
          const sections = container.querySelectorAll('[id]');
          let currentIndex = 0;
    
          sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentIndex = index;
            }
          });
    
          setActiveIndex(currentIndex);
          // Show feedback popup after 2 seconds when user reaches subjects section (index 3)
          if (currentIndex >= 3 && !hasTriggeredFeedback) {
            setHasTriggeredFeedback(true);
            setTimeout(() => {
              setFeedbackPopupOpen(true);
            }, 2000);
          }
        };
    
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }, [hasTriggeredFeedback]);

    return (
        <div>
            <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-white">
                <AuthBanner
                    onSignIn={() => {}}
                    onPayment={() => {}}
                    user={null}
                    paymentLoading={false}
                    activeIndex={activeIndex}
                />

            {/* Primary Pattern & Core Line Section */}
            <div id="primary-pattern" className='relative w-full mx-auto pt-20 pb-16 px-6 md:px-12 lg:px-16 bg-[#fafaf9]'>
            <div className="max-w-7xl mx-auto">
                {/* Byline Section */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-300">
                    <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-transparent flex items-center justify-center">
                        <span className="text-white font-gilroy-bold text-xs">
                            <img src='/quillpen.png' className=''/>
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-gilroy-semibold text-neutral-800">Published by Quest</p>
                        <p className="text-xs font-gilroy-regular text-neutral-500"> {new Date().toLocaleDateString()} • 2 min read</p>
                    </div>
                    </div>
                    <div className="hidden md:block text-xs font-gilroy-regular text-neutral-400">
                    Pattern Analysis
                    </div>
                </div>

                {/* Eyebrow */}
                <div className="mb-3">
                    <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-500 font-gilroy-regular">
                    Primary Pattern
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="mb-1 text-4xl md:text-5xl lg:text-6xl font-gilroy-bold tracking-tight text-neutral-900 leading-[1.1]">
                    Your <span className='text-neutral-400'>Primary</span> Pattern
                </h1>

                {/* Contributor Line */}
                <p className="text-sm font-gilroy-regular text-neutral-600 mb-10 pb-8 border-b border-neutral-200">
                    Insights compiled for your personal journey
                </p>

                {/* Body Text with Drop Cap */}
                <div className="max-w-none">
                    <p className="text-neutral-700 font-gilroy-regular text-base md:text-lg leading-relaxed">
                    <span className="float-left text-6xl md:text-7xl font-gilroy-bold text-neutral-800 leading-none mr-2 mt-1">
                        Y
                    </span>
                    {mockData.primary_pattern.substring(1)}
                    </p>
                </div>

                {/* Pull Quote */}
                <div className="my-12 py-8 border-l-4 border-neutral-800 pl-6">
                    <p className="text-xl md:text-2xl font-gilroy-light text-neutral-700 leading-relaxed">
                    "{mockData.core_line}"
                    </p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-wrap gap-2 items-center text-xs font-gilroy-regular text-neutral-500">
                    <span>Filed under:</span>
                    <span className="px-3 py-1 bg-neutral-200 rounded-full text-neutral-700">Self-Discovery</span>
                    <span className="px-3 py-1 bg-neutral-200 rounded-full text-neutral-700">Pattern Analysis</span>
                </div>
            </div>
            </div>

            {/* Gallery3D Section - Fixed height */}
            {!isMobile ? (
                <div id="gallery-3d" className="relative w-full h-screen overflow-hidden bg-[#4A90A4]"
                    style={{ backgroundColor: activeCardColor, transition: 'background-color 0.5s ease' }}>
                    <Gallery3D onColorChange={setActiveCardColor} />
                </div>
             ) : (
                <div id="gallery-3d-mobile" className="relative overflow-hidden"
                style={{
                    width: '100vw',
                    height: `${dimensions.viewport.height}px`,
                    marginLeft: 'calc(50% - 50vw)',
                    marginRight: 'calc(50% - 50vw)'
                }}>
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
             )}


            {/* Calibrate Section */}
            <div id="calibrate-section">
                <CalibrateSection
                    depthScore={mockData?.depth_score || 0}
                    questions={mockData.slider_question}
                    accentColor={activeCardColor}
                />
            </div>

            {/* Behaviour Signals Section */}
            <div id="concert-page">
                <ConcertPage backgroundColor={activeCardColor} />
            </div>

            <div id="pdf-report" className="relative w-full mx-auto pt-6 pb-16 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 max-w-7xl mx-auto px-6 sm:px-0"
                >
                    <span className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-2 font-gilroy-medium">
                        Private File
                    </span>
                    <h1 className="text-5xl md:text-7xl font-gilroy-bold tracking-tighter text-neutral-900 leading-none">
                         Your <span style={{ color: activeCardColor }}>Private</span> File
                    </h1>
                </motion.div>
                <div style={{ paddingBottom: CTA_HEIGHT }} className="flex flex-col sm:flex-row justify-center items-center gap-10">
                    <div className="max-w-xl px-6 sm:px-0">
                    <PDFImageViewer
                        paymentSuccess={false}
                        paymentStatus={{
                        ispaymentdone: "success",
                        quest_pdf: "https://example.com/sample.pdf",
                        quest_status: "generated",
                        }}
                        onPDFDownload={() => {}}
                        onUnlockClick={() => {
                        // if (!paymentSuccess) {
                        //   // googleAnalytics.trackPdfUnlockCTA({...});
                        //   // setUpsellOpen(true);
                        // }
                        }}
                        pricing={{
                        razorpay: { main: "199", original: "399" },
                        isLoading: false,
                        }}
                    />
                    </div>
                    <div>
                    <FAQIntrospection />
                    </div>
                </div>
                <div className="mt-5">
                <Testimonial 
                    headerText="How people feel with Quest insights"
                />
                </div>
            </div>

            <div>
                <QuestFooter />
            </div>
            </div>
        </div>
    );
}