'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CardData, CardDimensions, CardProps } from './types';
import {LogOut} from 'lucide-react'



const Card: React.FC<CardProps> = ({ data, dimensions, active }) => {
  // Center image horizontally: (CardWidth - ImageWidth) / 2
  const sidePadding = (dimensions.width - dimensions.imageWidth) / 2;
  const [isExpanded, setIsExpanded] = React.useState(false);
  console.log('Card Data:', data);
  
  
  
  // The reference implies the image is somewhat top-aligned with padding
  const topPadding = sidePadding;
  const imagepadding = (57 -  topPadding);
  

  React.useEffect(() => {
    if (!active && isExpanded) {
      setIsExpanded(false);
    }
  }, [active, isExpanded]);

  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden bg-white select-none transition-shadow duration-300`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        borderRadius: '57px',
        boxShadow: active 
          ? '0 25px 50px -12px rgba(0,0,0,0.4)'
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
          borderRadius: `${imagepadding}px`,
          overflow: 'hidden',
        }}
      >
        <img 
          src={data.imageUrl} 
          alt="Card Visual"
          className="w-full h-full object-cover block"
          draggable={false}
        />
        <div onClick={() => setIsExpanded(true)} className="absolute bottom-0 right-0 text-white font-gilroy-regular text-sm pr-4 pb-2 mix-blend-overlay"> Know More ..</div>
      </div>

      <motion.div 
        {...(isExpanded && { layoutId: `card-info-${data.id}` })}
        className="flex-1 w-full flex flex-col items-start justify-start relative z-10 px-6 py-6"
        >
        <motion.div 
            {...(isExpanded && { layoutId: `card-title-${data.id}` })}
            className={`${data.textcolor} text-3xl font-gilroy-semibold uppercase tracking-tight`}
        >
            {data.title}
        </motion.div>
        
        <motion.div 
            {...(isExpanded && { layoutId: `card-subtitle-${data.id}` })}
            className={`mt-4 ${data.textcolor} text-[12px] font-gilroy-regular uppercase tracking-[0.05rem]`}
        >
            Currently Inclined
        </motion.div>
        
        <motion.div 
            {...(isExpanded && { layoutId: `card-tag-${data.id}` })}
            className={`mt-1 text-xl font-gilroy-light px-8 py-2 rounded-[35px] ${data.buttonbg} text-white`}
        >
            {data.subtitle}
        </motion.div>
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
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-40"
            >
                <span>{data.icon}</span>
            </button>

            {/* Expanded Content */}
            <motion.div 
                layoutId={`card-info-${data.id}`} 
                className="flex-1 w-full flex flex-col items-start justify-start"
            >
                <motion.div 
                layoutId={`card-title-${data.id}`} 
                className={`${data.textcolor} text-4xl font-gilroy-semibold uppercase tracking-tight`}
                >
                {data.title}
                </motion.div>
                
                <motion.div 
                layoutId={`card-subtitle-${data.id}`} 
                className='mt-4 text-gray-600 text-[15px] font-gilroy-regular uppercase tracking-[0.1rem]'
                >
                Currently Inclined
                </motion.div>
                
                <motion.div 
                layoutId={`card-tag-${data.id}`} 
                className={`mt-1 text-xl font-gilroy-regular px-8 py-2 rounded-xl ${data.buttonbg} text-white`}
                >
                {data.subtitle}
                </motion.div>

                <div className="mt-6 flex-1 w-full overflow-y-auto">
                    {data.content}
                </div>

                {/* Stats - if available */}
                {/* {data.stats && data.stats.length > 0 && (
                <div className="mt-6 w-full space-y-2">
                    {data.stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-gilroy-regular">{stat.label}</span>
                        <span className="text-gray-900 text-lg font-gilroy-bold">{stat.value}</span>
                    </div>
                    ))}
                </div>
                )} */}
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