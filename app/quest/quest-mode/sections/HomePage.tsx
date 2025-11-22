'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import Change from '../sections/Change';
import Testimonials from '../sections/Testimonials';
import FaqSection from '../sections/FaqSection';
import QuestFooter from '../sections/QuestFooter';
import { AnalyzeSidebar } from '../sections/AnalyzeSidebar';
import Image from 'next/image';
import BrowserPopup from '../utils/BrowserPopup';
import { useIsMobile } from '../utils/use-mobile';

function page() {
    const animationVariants = {
        invisible: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    const [screen, setScreen] = useState<0 | 1 | 2 | 3>(0)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleMenuClick = () => {
        setIsSidebarOpen(true);
    };

    const [isInHeroSection, setIsInHeroSection] = useState(true);
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const analyzeScrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (screen !== 3) return;
        console.log('useEffect running, screen is:', screen);
        const container = analyzeScrollRef.current;
        if (!container) {
            return;
        }


        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const shouldBeInHero = scrollTop < 20;

            if (shouldBeInHero !== isInHeroSection) {
                setIsInHeroSection(shouldBeInHero);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isInHeroSection, screen]);


    const handleScroll = () => {
        console.log('scroll clicked', screen);
        if (screen === 0 || screen === 1 || screen === 2) {
            setScreen((screen + 1) as 1 | 2 | 3);
        } else if (screen === 3 && analyzeScrollRef.current) {
            analyzeScrollRef.current.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    }

    const isMobile = useIsMobile();

    // Mouse wheel and touch navigation
    useEffect(() => {
        let touchStartY = 0;

        const handleWheel = (event: WheelEvent) => {
            // For screen 3, handle scroll within the section
            if (screen === 3 && analyzeScrollRef.current) {
                const container = analyzeScrollRef.current;
                const { scrollTop, scrollHeight, clientHeight } = container;
                const isAtTop = scrollTop <= 5;

                // Only navigate back if at top and scrolling up
                if (event.deltaY < 0 && isAtTop && !isTransitioning) {
                    event.preventDefault();
                    setIsTransitioning(true);
                    setScreen(2);
                }
                // Allow natural scroll within section
                return;
            }

            // For screens 0, 1, 2 - navigate between screens
            if (isTransitioning) return;

            event.preventDefault();
            const scrollThreshold = 30;

            if (Math.abs(event.deltaY) < scrollThreshold) return;

            if (event.deltaY > 0 && screen < 3) {
                setIsTransitioning(true);
                setScreen((screen + 1) as 1 | 2 | 3);
            } else if (event.deltaY < 0 && screen > 0) {
                setIsTransitioning(true);
                setScreen((screen - 1) as 0 | 1 | 2);
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            touchStartY = event.touches[0].clientY;
            // Prevent any default behavior immediately on touch start for screens 0, 1, 2
            if (screen !== 3) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
        };

        const handleTouchMove = (event: TouchEvent) => {
            // Prevent default scroll behavior for screens 0, 1, 2
            if (screen !== 3) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
        };

        const handleTouchEnd = (event: TouchEvent) => {
            if (isTransitioning) return;

            // Always prevent default on touch end for screens 0, 1, 2
            if (screen !== 3) {
                event.preventDefault();
                event.stopPropagation();
            }

            const touchEndY = event.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;
            const minSwipeDistance = 50;

            if (Math.abs(touchDiff) < minSwipeDistance) return;

            // For screen 3, handle scroll within section
            if (screen === 3 && analyzeScrollRef.current) {
                const container = analyzeScrollRef.current;
                const { scrollTop, scrollHeight, clientHeight } = container;
                const isAtTop = scrollTop === 0;

                // Only navigate back if at top and swiping down
                if (touchDiff < 0 && isAtTop) {
                    setIsTransitioning(true);
                    setScreen(2);
                }
                return;
            }

            // For screens 0, 1, 2 - navigate between screens
            if (touchDiff > 0 && screen < 3) {
                // Swipe up - go to next screen
                setIsTransitioning(true);
                setScreen((screen + 1) as 1 | 2 | 3);
            } else if (touchDiff < 0 && screen > 0) {
                // Swipe down - go to previous screen
                setIsTransitioning(true);
                setScreen((screen - 1) as 0 | 1 | 2);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [screen, isTransitioning]);

    // Reset transition state
    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    // Reset screen 3 scroll position when entering
    useEffect(() => {
        if (screen === 3 && analyzeScrollRef.current) {
            analyzeScrollRef.current.scrollTop = 0;
        }
    }, [screen]);

    // Prevent body scroll on mobile for screens 0, 1, 2
    useEffect(() => {
        if (isMobile && screen !== 3) {
            // Add scroll-locked class to body and html
            document.body.classList.add('scroll-locked');
            document.documentElement.classList.add('scroll-locked');
        } else {
            document.body.classList.remove('scroll-locked');
            document.documentElement.classList.remove('scroll-locked');
        }

        return () => {
            document.body.classList.remove('scroll-locked');
            document.documentElement.classList.remove('scroll-locked');
        };
    }, [screen, isMobile]);


    if (isMobile) {
        return (
            <motion.div
                ref={containerRef}
                className={`${screen !== 3 ? 'mobile-container-lock' : 'relative h-screen-mobile overflow-hidden'}`}
                onTouchStart={(e) => screen !== 3 && e.preventDefault()}
                onTouchMove={(e) => screen !== 3 && e.preventDefault()}
            >
                <motion.section
                    className={`w-full h-full relative overflow-hidden ${screen !== 3 ? 'prevent-scroll' : ''}`}>
                    {/* Background Animation */}
                    <AnimatePresence>
                        {screen == 0 && <motion.div
                            layoutId='bg'
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            className='absolute z-0 w-[554px] h-[554px] rounded-full'
                            style={{
                                background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #0C45F0 0%, #41D9FF 51%, #48B9D8 100%)',
                                left: '-70px',
                                top: '47%',
                                filter: 'blur(30px)',
                                boxShadow: '60px 60px 60px rgba(0, 0, 0, 0.1)',
                            }}
                        />}

                        {screen == 1 && <motion.div
                            layoutId='bg'
                            transition={{ duration: 1.2 }}
                            className='absolute z-0 w-[554px] h-[554px] rounded-full'
                            style={{
                                background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #0C45F0 0%, #41D9FF 51%, #48B9D8 100%)',
                                left: '-70px',
                                top: '17%',
                                filter: 'blur(30px)',
                                boxShadow: '60px 60px 60px rgba(0, 0, 0, 0.1)',
                            }}
                        />}

                        {screen == 2 && <motion.div
                            layoutId='bg'
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            className='absolute z-0 rounded-full'
                            style={{
                                background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #0C45F0 0%, #41D9FF 51%, #48B9D8 100%)',
                                width: '1000px',
                                height: '1000px',
                                left: '-269px',
                                top: '-39px',
                                filter: 'blur(30px)',
                                boxShadow: '60px 60px 60px rgba(0, 0, 0, 0.1)',
                            }}
                        />}

                    </AnimatePresence>

                    <AnimatePresence>
                        {screen == 0 &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className=' flex flex-col gap-20 top-[8%] absolute pl-5 h-screen overflow-hidden'>

                                <div className=' flex flex-col'>
                                    <motion.div
                                        variants={animationVariants}
                                        initial="invisible"
                                        animate="visible"
                                        className='justify-start text-neutral-950 text-5xl font-normal font-gilroy-regular'
                                    >
                                        hi there,
                                    </motion.div>

                                    <div className='flex gap-2'>
                                        <motion.div
                                            variants={animationVariants}
                                            initial="invisible"
                                            animate="visible"
                                            className=""
                                        >
                                            <div className='justify-start text-neutral-500 text-7xl font-bold font-gilroy-bold'>
                                                I'm
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            layoutId='logo'
                                            transition={{ duration: 1.2 }}
                                            className="flex items-center"
                                        >

                                            <div>
                                                <div className='text-7xl font-normal font-gilroy-bold tracking-[-0.5rem]'>
                                                    QUEST
                                                </div>
                                                <div className='text-xl font-normal font-gilroy-regular tracking-[0.1rem] pl-5 mt-[-8px]'>
                                                    BY FRATERNY
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                </div>

                                <div className=' flex flex-col gap-0'>
                                    <motion.div
                                        variants={animationVariants}
                                        initial="invisible"
                                        animate="visible"
                                        className='justify-start text-neutral-950 text-4xl font-normal font-gilroy-regular'
                                    >
                                        I can
                                    </motion.div>
                                    <motion.div
                                        variants={animationVariants}
                                        initial="invisible"
                                        animate="visible"
                                        className=''
                                    >
                                        <span className='justify-start text-neutral-950 text-4xl font-normal font-gilroy-bold'>
                                            Analyse Your Brain
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        variants={animationVariants}
                                        initial="invisible"
                                        animate="visible"
                                    >
                                        <div className="justify-start text-neutral-950 text-4xl font-normal font-gilroy-regular">
                                            in 15 minutes
                                        </div>
                                    </motion.div>

                                </div>

                                <Link href="begin">
                                    <div className=''>
                                        <div className="w-40 h-14 mix-blend-luminosity bg-gradient-to-br from-white/20 to-white/20 rounded-[30px] border-2 border-white flex items-center justify-center" >
                                            <div className="justify-center text-white text-2xl font-gilroy-bold">Begin</div>
                                        </div>
                                    </div>
                                </Link>

                            </motion.div>
                        }

                        {screen == 1 &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                key={`screen-${screen}`}
                                layoutId='section1'
                                className='w-full h-screen flex flex-col items-center justify-center relative'>

                                <div className='flex w-full items-center justify-center pt-4'>
                                    <motion.div
                                        className="z-50"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: 0.4
                                        }}
                                    >
                                        <img
                                            src='/Vector.svg'
                                            alt="QUEST"
                                            className="h-[36px] w-auto brightness-0 cursor-pointer"
                                            onClick={() => setScreen(0)}
                                        />
                                    </motion.div>

                                </div>

                                <div className='relative flex flex-col gap-10 top-[18%] h-screen'>
                                    <div className=''>
                                        <motion.div
                                            variants={animationVariants}
                                            initial="invisible"
                                            animate="visible"
                                            className="text-center justify-start text-white text-xl font-normal font-gilroy-regular">You’d be shocked to know,<br />Harvard researchers suggest that
                                        </motion.div>
                                    </div>

                                    <div className=''>
                                        <motion.div
                                            variants={animationVariants}
                                            initial="invisible"
                                            animate="visible"
                                            className="text-center justify-start text-white text-5xl font-normal font-gilroy-semibold">95%
                                        </motion.div>
                                        <motion.div
                                            variants={animationVariants}
                                            initial="invisible"
                                            animate="visible"
                                            className="text-center justify-start"><span className="text-white text-2xl font-normal font-gilroy-regular">of people believe<br />they are </span><span className="text-white text-2xl font-gilroy-bold font-bold">self-aware<br /></span><span className="text-white text-2xl font-normal font-gilroy-regular">but only</span>
                                        </motion.div>
                                    </div>

                                    <div className=''>
                                        <div className='flex flex-col gap-1'>
                                            <motion.div
                                                variants={animationVariants}
                                                initial="invisible"
                                                animate="visible"
                                                className="text-center justify-start text-white text-5xl font-normal font-gilroy-semibold">10-15%</motion.div>

                                            <motion.div
                                                variants={animationVariants}
                                                initial="invisible"
                                                animate="visible"
                                                className="text-center justify-start text-white text-2xl font-normal font-gilroy-regular">
                                                actually are
                                            </motion.div>

                                        </div>
                                    </div>

                                    <div className='w-full flex justify-center mt-[-5px]'>
                                        <motion.div
                                            variants={animationVariants}
                                            initial="invisible"
                                            animate="visible"
                                            className='w-20'
                                        >
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-full h-full relative"
                                                style={{}}
                                            >
                                                {/* Circular spinning text */}
                                                <motion.div
                                                    className=""
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        duration: 10,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                >
                                                    <img
                                                        src="/text.svg"
                                                        alt="Those who are"
                                                        className="w-full h-full"
                                                    />
                                                </motion.div>

                                                {/* Central arrow */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <img
                                                        src="/arrow-down.svg"
                                                        alt="arrow down"
                                                        className="w-6 h-6"
                                                    />
                                                </div>
                                            </motion.button>

                                        </motion.div>

                                    </div>

                                </div>
                            </motion.div>
                        }

                        {screen == 2 &&
                            (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    key={`screen-${screen}`}
                                    className='w-full h-screen flex flex-col items-center justify-center relative'>

                                    <motion.div
                                        className="absolute w-full flex justify-center pt-4 z-20 inset-0 invert"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: 0.4
                                        }}
                                    >
                                        <img
                                            src='/Vector.svg'
                                            alt="QUEST"
                                            className="h-[36px] w-auto brightness-0 cursor-pointer"
                                            onClick={() => setScreen(0)}
                                        />
                                    </motion.div>


                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.10, delay: 0.4 }}
                                        className='z-50 pl-5 flex flex-col gap-10 absolute w-full top-[25%]'>

                                        <motion.div
                                            className='flex flex-col gap-4 z-50 w-[96%]'>
                                            <div className='flex justify-between items-center'>
                                                <div className="justify-start text-white text-4xl font-normal font-gilroy-bold">Are more<br /> effective leaders.</div>
                                                <div className="justify-start text-white text-2xl font-normal font-gilroy-regular mt-10">1</div>
                                            </div>
                                            <div className="h-0 outline outline-2 outline-white w-[99%]"></div>
                                        </motion.div>

                                        <motion.div
                                            className='flex flex-col gap-4 z-50 w-[96%]'>
                                            <div className='flex justify-between items-center'>
                                                <div className="justify-start text-white text-4xl font-normal font-gilroy-bold">Perform better <br /> at work.</div>
                                                <div className="justify-start text-white text-2xl font-normal font-gilroy-regular mt-10">2</div>
                                            </div>
                                            <div className="h-0 outline outline-2 outline-white w-[99%]"></div>

                                        </motion.div>

                                        <motion.div
                                            className='flex flex-col gap-4 z-50 w-[96%]'>
                                            <div className='flex justify-between items-center'>
                                                <div className="justify-start text-white text-4xl font-normal font-gilroy-bold">Are more <br /> confident</div>
                                                <div className="justify-start text-white text-2xl font-normal font-gilroy-regular mt-10">3</div>
                                            </div>
                                            <div className="h-0 outline outline-2 outline-white w-[99%]"></div>

                                        </motion.div>

                                    </motion.div>
                                    <motion.div />
                                </motion.div>
                            )
                        }

                        {screen == 3 &&
                            <motion.section
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1, delay: 0.1 }}
                                key={`screen-${screen}`}
                                className=''>
                                <div ref={analyzeScrollRef} className='relative h-screen overflow-y-auto'>
                                    {/* Header */}
                                    <div className='flex justify-between fixed top-0 w-full z-50 pt-4 left-0 text-white items-center'>
                                        <motion.div>
                                        </motion.div>

                                        <div className="z-50">
                                            <Image
                                                src='/Vector.svg'
                                                alt="QUEST: Run Quest in 15 minutes. Free test with optional paid PDF. Map thought patterns, get a 35+ page report."
                                                width={90}
                                                height={36}
                                                className={`transition-all duration-500 ${isInHeroSection ? 'brightness-0 invert' : 'opacity-0'} ease-out cursor-pointer`}
                                                onClick={() => setScreen(0)}
                                            />
                                        </div>

                                        <motion.div
                                            className={`flex items-center justify-center cursor-pointer ${isInHeroSection ? 'brightness-0 invert' : ''} p-2 rounded-lg hover:bg-white/10 transition-colors`}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleMenuClick}
                                        >
                                            <Menu className="w-6 h-6" />
                                        </motion.div>
                                    </div>

                                    {/* Sidebar */}
                                    <AnalyzeSidebar
                                        isOpen={isSidebarOpen}
                                        onClose={() => setIsSidebarOpen(false)}
                                        theme="blue"
                                        showMobileOnly={false}
                                        onNavigateToSection={(targetScreen) => {
                                            setScreen(targetScreen as 0 | 1 | 2 | 3);
                                        }}
                                    />


                                    {/* ${isScrolled ? 'brightness-0 invert' : 'opacity-0'} */}
                                    <div id="analyze-hero" ref={heroSectionRef} className='max-h-400 relative bg-[#004A7F] overflow-hidden gap-7 text-white w-full p-4 py-20'>
                                        <div className='gap-8 flex relative flex-col z-20'>
                                            {/* Main Title */}
                                            <div className='w-[140px] text-left'>
                                                <motion.p
                                                    variants={animationVariants}
                                                    initial="invisible"
                                                    animate="visible"
                                                    className='pb-[10px] font-gilroy-medium text-4xl'
                                                >
                                                    What I will do?
                                                </motion.p>
                                                <div className='border-b-2 border-white ml-1' />
                                            </div>

                                            {/* Description */}
                                            <p className='pt-2 font-gilroy-regular text-[20px]'>
                                                I'll guide you to reflect on your
                                            </p>

                                            {/* Pills */}
                                            <motion.div
                                                variants={animationVariants}
                                                initial="invisible"
                                                animate="visible"
                                                className='flex flex-wrap gap-2 mt-[-5px]'
                                            >
                                                {['Motivations', 'Desires', 'Patterns', 'Triggers', 'Fears'].map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="px-4 py-2 font-normal font-gilroy-bold rounded-full border-2 border-white bg-white/10 text-white tracking-[-1.1px]"
                                                        style={{ fontSize: '20px', fontWeight: 400 }}
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </motion.div>

                                            {/* Understanding text */}
                                            <p className='pt-4 font-gilroy-regular text-[20px]'>
                                                So together, we can understand
                                            </p>

                                            {/* Questions list */}
                                            <motion.div
                                                variants={animationVariants}
                                                initial="invisible"
                                                animate="visible"
                                                className='flex flex-col gap-6'
                                            >
                                                {[
                                                    'What makes you unique',
                                                    "How to use your strengths",
                                                    'How others truly see you',
                                                    'How to reach your ideal self'
                                                ].map((question, i) => (
                                                    <div key={i} className="relative flex items-center justify-between">
                                                        <p
                                                            className="text-white font-bold pb-3 font-gilroy-bold text-[20px]"
                                                        >
                                                            {question}
                                                        </p>
                                                        <span
                                                            className="font-normal ml-4 mb-3 font-gilroy-regular text-[14px]"
                                                        >
                                                            {i + 1}
                                                        </span>
                                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </div>

                                        {/* Background Gradient */}
                                        <motion.div
                                            transition={{ duration: 0.8 }}
                                            className='absolute z-10 w-[554px] h-[554px] bg-radial from-10% from-[#48B9D8] via-80% to-40% via-[#41D9FF] to-[#0C45F0] flex bottom-0 top-[45px] right-[51px] translate-x-1/2 rounded-full blur-[80px]'
                                            style={{
                                                background: 'radial-gradient(50% 50% at 50% 50%, #0C45F0 0%, #41D9FF 50.96%, #48B9D8 100%)',
                                                backdropFilter: 'blur(10px)',
                                            }}
                                        />
                                    </div>

                                    <div id="change-section">
                                        <Change />
                                    </div>
                                    <div className='flex flex-col'>
                                        <Testimonials />
                                        <div id="faq-section">
                                            <FaqSection />
                                        </div>
                                        <div id="contact-section">
                                            <QuestFooter />
                                        </div>
                                    </div>

                                </div>
                            </motion.section>
                        }

                    </AnimatePresence>

                </motion.section>

                {/* Visual scroll indicator - non-clickable */}
                {screen !== 3 && (
                    <div className="bottom-6 right-6 z-50 fixed transition-opacity duration-300 pointer-events-none">
                        <div className={`flex items-center justify-center text-white w-10 h-10 rounded-full ${screen === 0 ? 'bg-white/30' : 'bg-black/50'} transition-all duration-200 backdrop-blur-sm`}>
                            <ChevronDown className="text-white w-6 h-6" />
                        </div>
                    </div>
                )}
            </motion.div>
        )
    } else {

        return (

            <>
                <BrowserPopup />

                <section className='bg-sky-800 gap-1 h-screen flex flex-col items-center justify-center'>
                    <div className=' flex flex-col w-full items-center justify-center'>
                        <div className='flex gap-2'>
                            <motion.div
                                initial="invisible"
                                animate="visible"
                                className=""
                            >
                                <div className='justify-center text-neutral-900 text-[200px] font-normal font-gilroy-bold'>
                                    I'm
                                </div>
                            </motion.div>
                            <motion.div
                                layoutId='logo'
                                transition={{ duration: 1.2 }}
                                className="flex items-center"
                            >
                                <div>
                                    <div className='text-[180px] text-white font-normal font-gilroy-bold tracking-[-0.5rem]'>
                                        QUEST
                                    </div>
                                    <div className='text-[40px] text-neutral-900 font-normal font-gilroy-regular tracking-[0.1rem] pl-28 mt-[-70px]'>
                                        BY FRATERNY
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>

                    <div className='flex flex-col items-center justify-center w-full pl-5'>
                        <img src="/qr-code.png" alt="QR Code" className="w-40 h-40" />
                        <div className='text-white text-[25px] font-normal font-gilroy-regular mt-2'>Scan the QR code to get started on your mobile.</div>
                    </div>
                </section>
            </>

        )
    }
}

export default page