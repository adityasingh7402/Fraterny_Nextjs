'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CardProps {
  data: CardData;
  dimensions: CardDimensions;
  active: boolean;
}

export interface CardData {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  stats: { label: string; value: number }[];
  bgGradient: string;
    buttonbg: string;
    textcolor: string;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface CardDimensions {
  width: number;
  height: number;
  imageWidth: number;
  imageHeight: number;
  gap: number;
}

const Card: React.FC<CardProps> = ({ data, dimensions, active }) => {
  // Center image horizontally: (CardWidth - ImageWidth) / 2
  const sidePadding = (dimensions.width - dimensions.imageWidth) / 2;
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  
  // The reference implies the image is somewhat top-aligned with padding
  const topPadding = sidePadding; 

  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden bg-white select-none transition-shadow duration-300`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        borderRadius: '12px', // Reduced by 50% from 24px
        boxShadow: active 
          ? '0 25px 50px -12px rgba(0,0,0,0.4)' // Deeper, more diffuse shadow for active
          : '0 10px 15px -3px rgba(0,0,0,0.1)',
      }}
    >
      {/* 
         1. IMAGE CONTAINER 
         Fixed height from specs: 139.6px
      */}
      <div 
        className="flex-shrink-0 relative z-10 bg-gray-100"
        style={{
          width: `${dimensions.imageWidth}px`,
          height: `${dimensions.imageHeight}px`,
          marginTop: `${topPadding}px`,
          borderRadius: '10px',
          overflow: 'hidden',
        }}
        onClick={() => setIsExpanded(true)}
      >
        <img 
          src={data.imageUrl} 
          alt="Card Visual"
          className="w-full h-full object-cover block"
          draggable={false}
        />
        <div className="absolute bottom-0 right-0 text-white font-gilroy-regular text-sm pr-4 pb-2 mix-blend-overlay"> Know More ..</div>
      </div>

      <motion.div layoutId={`card-info-${data.id}`} className="flex-1 w-full flex flex-col items-start justify-start relative z-10 px-6 pt-4">
        <motion.div layoutId={`card-title-${data.id}`} className={`${data.textcolor} text-2xl font-gilroy-semibold uppercase tracking-tighter`}>{data.title}</motion.div>
        <motion.div layoutId={`card-subtitle-${data.id}`} className={`mt-2 ${data.textcolor} text-sm font-gilroy-regular uppercase tracking-[0.1rem]`}>Currently Inclined</motion.div>
        <motion.div layoutId={`card-tag-${data.id}`} className={`mt-1 text-md font-gilroy-regular px-3 py-2 rounded-xl ${data.buttonbg} text-white`}>{data.subtitle}</motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
            <motion.div
            className="absolute inset-0 bg-white rounded-xl z-30 flex flex-col p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            >
            {/* Close Button */}
            <button
                onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors z-40"
            >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Expanded Content */}
            <motion.div 
                layoutId={`card-info-${data.id}`} 
                className="flex-1 w-full flex flex-col items-start justify-start"
            >
                <motion.div 
                layoutId={`card-title-${data.id}`} 
                className={`${data.textcolor} text-2xl font-gilroy-semibold uppercase tracking-tighter`}
                >
                {data.title}
                </motion.div>
                
                <motion.div 
                layoutId={`card-subtitle-${data.id}`} 
                className='mt-4 text-gray-600 text-lg font-gilroy-regular uppercase tracking-[0.15rem]'
                >
                Currently Inclined
                </motion.div>
                
                <motion.div 
                layoutId={`card-tag-${data.id}`} 
                className={`mt-1 text-md font-gilroy-regular px-3 py-2 rounded-xl ${data.buttonbg} text-white`}
                >
                {data.subtitle}
                </motion.div>

                {/* Stats - if available */}
                {data.stats && data.stats.length > 0 && (
                <div className="mt-6 w-full space-y-2">
                    {data.stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-gilroy-regular">{stat.label}</span>
                        <span className="text-gray-900 text-lg font-gilroy-bold">{stat.value}</span>
                    </div>
                    ))}
                </div>
                )}
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>

      {/* Glossy Reflection Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none z-20 opacity-50"></div>
    </div>
  );
};

export default Card;