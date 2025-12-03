'use client';

import React, { act, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import mockData from '@/app/quest/reflection/[userId]/[sessionId]/[testId]/components/mock-data';

const SwipableCards = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const cardDetails = mockData.archetype
  const keys = Object.keys(cardDetails);
  console.log(activeCardIndex);
  
  
  

  const cards = [
    {
      id: 1,
      title: keys[0],
      description: cardDetails.self,
      bgColor: "from-purple-500 to-pink-500",
      bgimg: "./result/16.png",
      cardimg: './result/14.png'
    },
    {
      id: 2,
      title: keys[1],
      description: cardDetails.aspiration,
      bgColor: "from-blue-500 to-cyan-500",
      bgimg: "./result/13.png",
      cardimg: './result/15.png'
    },
    {
      id: 3,
      title: keys[2],
      description: cardDetails.world,
      bgColor: "from-orange-500 to-red-500",
      bgimg: "./result/18.png",
      cardimg: './result/17.png'
    }
  ];

  const handleDragEnd = (event: PointerEvent | TouchEvent | MouseEvent, info: PanInfo) => {
    const threshold = 50;
    
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Background - Layered approach */}
      <div className="absolute inset-0">
        
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className={`absolute inset-0`}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
            style={{ backgroundImage: `url(${cards[currentIndex].bgimg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.6)'
            }}
          />
        </AnimatePresence>
      </div>

      {/* Header Section */}
      <div className="absolute top-2 left-0 right-0 flex justify-center z-20">
        <motion.h1 layout className="mb-10 text-left p-10">
          <span className="block text-sm uppercase tracking-[0.3em] text-white/70 mb-1 font-gilroy-regular">Analysis Complete</span>
          <span className="block text-5xl font-gilroy-bold tracking-tighter bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Quest Reveals About You
          </span>
          
          <motion.span layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6">
            <motion.p
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-left text-white pt-14 text-3xl font-gilroy-semibold">{cards[currentIndex].description}</motion.p>
            <motion.p className="text-left text-white text-xl font-gilroy-regular">More description one liner if needed</motion.p>
          </motion.span>
        </motion.h1>
        <AnimatePresence>
          <motion.div
            key={currentIndex + "-header"}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cards Container - Carousel Layout */}
      <motion.div className="absolute inset-x-0 bottom-0 h-3/5 flex items-center justify-center">
        <motion.div className="relative w-full flex justify-center items-center h-full" >
          {cards.map((card, index) => {
            const isActive = index === currentIndex;
            const offset = index - currentIndex;
            
            return (
              <motion.div
                // layoutId={`card-${card.id}`}
                key={card.id}
                className="bg-white rounded-tl-3xl rounded-tr-3xl shadow-2xl p-4 absolute"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `${offset * 85}%`,
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.4,
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                style={{
                  width: '75vw',
                  maxWidth: '380px',
                  height: '100%',
                }}
                onClick={() => setActiveCardIndex(index)}
              >
              <AnimatePresence>
              {activeCardIndex !== index &&
              <motion.div key={card.id} layoutId={`card-${card.id}`}>
                <motion.div key={`image-${card.id}`} className=" mask-b-from-25% w-full h-3/4 mb-4 overflow-hidden rounded-xl">
                  <motion.img
                    layoutId={`image-${card.id}`}
                    // initial={{ scale: 0.9 }}
                    // animate={{ scale: 1 }}
                    // exit={{ scale: 0.9 }}
                    // transition={{ duration: 0.5 }}
                    key={card.bgimg} 
                    src={card.cardimg}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.h2 layoutId={`title-${card.id}`}
                layout 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.3 }}
                className="text-2xl font-gilroy-extrabold uppercase tracking-tighter text-gray-800 mb-2">
                  {card.title}
                </motion.h2>
                <motion.p layoutId={`description-${card.id}`}
                layout 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.3 }}
                className="text-gray-600 text-base font-gilroy-bold">
                  {card.description}
                </motion.p>
              </motion.div>
              }

              {activeCardIndex===index && 
                    <motion.div
                      layoutId={`card-${card.id}`}
                      initial={{ opacity: 0,}}
                      animate={{ opacity: 1, }}
                      exit={{ opacity: 0,}}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="absolute inset-0 bg-white rounded-3xl p-6 flex flex-col"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardIndex(null);
                        }}
                        className="self-end text-gray-500 hover:text-gray-800 mb-4"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <motion.h2 layoutId={`title-${card.id}`}
                      layout
                      initial={{ opacity: 0,}}
                      animate={{ opacity: 1, }}
                      exit={{ opacity: 0,}}
                      transition={{ duration: 0.3}}
                      className="text-3xl font-gilroy-extrabold text-gray-800 mb-4">
                        Detailed {cards[activeCardIndex].title}
                      </motion.h2>
                      <motion.p 
                      layoutId={`description-${card.id}`}
                      layout
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1}}
                      exit={{ opacity: 0}}
                      transition={{ duration: 0.3 }}
                      className="text-gray-600 font-gilroy-semibold">
                        Here is a more detailed description about {cards[activeCardIndex].title}. You can add more information, images, or any other content you want to display when the card is active.
                      </motion.p>
                    </motion.div>
                  }
              </AnimatePresence>

                {/* <AnimatePresence>
                  {activeCardIndex===index && 
                    <motion.div
                      layoutId={`card-${card.id}`}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="absolute inset-0 bg-white rounded-3xl p-6 flex flex-col"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardIndex(null);
                        }}
                        className="self-end text-gray-500 hover:text-gray-800 mb-4"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <motion.h2 layoutId={`title-${card.id}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-3xl font-bold text-gray-800 mb-4">
                        Detailed {cards[activeCardIndex].title}
                      </motion.h2>
                      <motion.p layoutId={`description-${card.id}`} className="text-gray-600 flex-grow">
                        Here is a more detailed description about {cards[activeCardIndex].title}. You can add more information, images, or any other content you want to display when the card is active.
                      </motion.p>
                    </motion.div>
                  }
          
                </AnimatePresence> */}

              </motion.div>
              
            );
          })}
        </motion.div>
        
      </motion.div>
      
      {/* Navigation Controls - Arrows and Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-8 z-20">
        
        <button
          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`w-5 h-5 rounded-full bg-neutral-400 backdrop-blur-sm flex items-center justify-center transition-all ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-white/30'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

       
        <div className="flex justify-center gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        
        <button
          onClick={() => currentIndex < cards.length - 1 && setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === cards.length - 1}
          className={`w-5 h-5 rounded-full bg-neutral-400 backdrop-blur-sm flex items-center justify-center transition-all ${
            currentIndex === cards.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-white/30'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SwipableCards;