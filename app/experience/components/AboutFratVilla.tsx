// 'use client'

// import React from 'react';
// import { motion } from 'framer-motion';
// import useSectionRevealAnimation from '@/app/quest/assessment-shared/hooks/useSectionRevealAnimation';

// const features = [
//     {
//       title: "Creates an Environment:",
//       description: "The Fratvilla group is carefully selected based on the harmony, diversity, and thinking depth of their Quest results, ensuring a dynamic and supportive environment for all attendees."
//     },
//     {
//       title: "Instills the Psychology of Success:",
//       description: "Through a series of specially designed activities and the application of our \"Fratrules,\" you'll learn to embody the mindset of a high-achiever."
//     },
//     {
//       title: "Fosters Genuine Connection:",
//       description: "Fratvilla is designed to maximize personal growth and bonding, creating a powerful network of ambitious individuals who will support you long after the experience is over."
//     }
//   ];

// const AboutFratVilla = () => {

//   // First section header animation - for "About FratVilla" title and description
//   const headerAnimation = useSectionRevealAnimation({
//     variant: 'fade-up',
//     once: true,
//     duration: 0.7,
//     staggerChildren: 0.2
//   });

//   // Second section header animation - for "What FratVilla Does" title
//   const secondHeaderAnimation = useSectionRevealAnimation({
//     variant: 'fade-up',
//     once: true,
//     duration: 0.6
//   });

//   // Feature cards animation - exactly matching PricingSection
//   const featureCardsAnimation = useSectionRevealAnimation({
//     variant: 'slide-up',
//     once: true,
//     duration: 0.6,
//     staggerChildren: 0.15,
//     delayChildren: 0.2
//   });

//   // Individual card animation variants - exactly matching FeatureCard from PricingSection
//   const cardVariants = {
//     hidden: { 
//       y: 40,
//       opacity: 0,
//       scale: 0.95
//     },
//     visible: { 
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring" as const,
//         stiffness: 100,
//         damping: 15
//       }
//     },
//     hover: {
//       y: -8,
//       scale: 1.02,
//       transition: {
//         type: "spring" as const,
//         stiffness: 400,
//         damping: 25
//       }
//     }
//   };
    
//   return (
//     <section className="py-4 bg-white">
//       <div className="mx-auto px-6">
//         <div className="max-w-7xl mx-auto">

//           {/* First Section - About FratVilla */}
//           <motion.div
//             ref={headerAnimation.ref}
//             variants={headerAnimation.parentVariants}
//             initial="hidden"
//             animate={headerAnimation.controls}
//           >
//             <motion.h2
//               className="text-3xl sm:text-3xl md:text-4xl font-gilroy-semibold mb-3 sm:mb-4"
//               variants={headerAnimation.childVariants}
//             >
//               About FratVilla
//             </motion.h2>
            
//             <motion.p 
//               className="text-lg md:text-xl md:leading-[-10px] lg:text-xl font-gilroy-regular text-left mb-8 text-black"
//               variants={headerAnimation.childVariants}
//             >
//               Fratvilla is our exclusive, hyper-luxurious 6-day experience for 20 ambitious 
//               individuals in a secret villa. It's an immersive, real-world application of the 
//               principles discovered through Quest, where you'll be surrounded by a curated 
//               group of like-minded peers.
//             </motion.p>
//           </motion.div>

//           {/* Second Section - What FratVilla Does */}
//           <section className="bg-white rounded-xl max-w-7xl">
//             <div className="max-w-7xl mx-auto">
//               <div className="text-left">
//                 {/* Section Title */}
//                 <motion.div
//                   ref={secondHeaderAnimation.ref}
//                   variants={secondHeaderAnimation.parentVariants}
//                   initial="hidden"
//                   animate={secondHeaderAnimation.controls}
//                 >
//                   <motion.h2 
//                     className="text-3xl sm:text-3xl md:text-4xl font-gilroy-semibold mb-3 sm:mb-4"
//                     variants={secondHeaderAnimation.childVariants}
//                   >
//                     What FratVilla Does
//                   </motion.h2>
//                 </motion.div>

//                 {/* Feature Cards with staggered animation */}
//                 <motion.div 
//                   className="grid grid-cols-1 md:grid-cols-3 gap-6"
//                   ref={featureCardsAnimation.ref}
//                   variants={featureCardsAnimation.parentVariants}
//                   initial="hidden"
//                   animate={featureCardsAnimation.controls}
//                 >
//                   {features.map((feature, index) => (
//                     <motion.div
//                       key={index}
//                       variants={featureCardsAnimation.childVariants}
//                       className=''
//                     >
//                       <motion.div 
//                         className="backdrop-blur-md h-full rounded-xl p-6 md:p-8 text-left border border-white/20 shadow-xl hover:bg-white/20 hover:border-white/30 hover:shadow-2xl transition-all duration-300 cursor-pointer"
//                         variants={cardVariants}
//                         whileHover="hover"
//                       >
//                         <h3 
//                           className="text-xl md:text-xl lg:text-2xl font-gilroy-bold text-neutral-700 tracking-tighter"
//                         >
//                           {feature.title}
//                         </h3>
                        
//                         <p 
//                           className="text-[16px] font-gilroy-regular md:text-xl lg:text-xl text-black mt-4 mb-8"
//                         >
//                           {feature.description}
//                         </p>
//                       </motion.div>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </div>
//             </div>
//           </section>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutFratVilla;


'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    number: 1,
    title: <span className='text-neutral-500 text-2xl'>Creates an <br/> <span className='text-neutral-700 text-4xl'>Environment</span></span>,
    description: "The Fratvilla group is carefully selected based on the harmony, diversity, and thinking depth of their Quest results, ensuring a dynamic and supportive environment for all attendees.",
    image: "https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg" // Add your images
  },
  {
    number: 2,
    title: <span className='text-neutral-500 text-2xl'>Instills the Psychology of <br/> <span className='text-neutral-700 text-4xl'> Success</span></span>,
    description: "Through a series of specially designed activities and the application of our \"Fratrules,\" you'll learn to embody the mindset of a high-achiever.",
    image: "https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg"
  },
  {
    number: 3,
    title: <span className='text-neutral-500 text-2xl'>Fosters Genuine <br/> <span className='text-neutral-700 text-4xl'>Connection</span></span>,
    description: "Fratvilla is designed to maximize personal growth and bonding, creating a powerful network of ambitious individuals who will support you long after the experience is over.",
    image: "https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg"
  }
];

const timelineImages = [
  'https://images.pexels.com/photos/35386131/pexels-photo-35386131.jpeg',
  'https://images.pexels.com/photos/35361398/pexels-photo-35361398.jpeg',
  'https://images.pexels.com/photos/35355333/pexels-photo-35355333.jpeg',
  'https://images.pexels.com/photos/35372560/pexels-photo-35372560.jpeg',
]

const AboutFratVilla = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
    const checkMobile = () => {
      console.log('Checking mobile viewport', window.innerWidth);
      
      setIsMobile(window.innerWidth < 640); // 640px = sm breakpoint
    };
    
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Header animation variants
  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  };

  // Container for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  // Number circle animation - pops in after card
  const circleVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  };

  const timelineCardVariants = {
  rest: (idx: number) => {
    // Mobile positions - fan/hand effect
    const mobilePositions = [
      { left: 1, top: 0, rotate: -5 },
      { left: 180, top: 20, rotate: 8 },
      { left: 10, top: 200, rotate: -10 },
      { left: 190, top: 230, rotate: 20 }
    ];
    
    // Desktop positions - scattered effect
    const desktopPositions = [
      { left: 200, top: 40 },
      { left: 420, top: 100 },
      { left: 660, top: 20 },
      { left: 860, top: 100 }
    ];
    
    const positions = isMobile ? mobilePositions : desktopPositions;
    
    return {
      left: `${positions[idx].left}px`,
      top: `${positions[idx].top}px`,
      // rotate: positions[idx].rotate,
      opacity: 1,
      transition: { duration: 0.3 }
    };
  },
  hover: (idx: number) => ({
    opacity: 1,
    transition: { duration: 0.3 }
  })
}

    const cardRadius = 30; // --r value
    const innerCurveSize = 40; // --s value
  return (
    <section className="py-16 md:py-20 bg-[#f5f5f5]" ref={sectionRef}>
      <div className="mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          className="text-left sm:text-center mb-10 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h1 className="font-gilroy-semibold text-[#222222] tracking-tight mb-10">
            <span className='text-neutral-500 text-4xl md:text-7xl'>FratVilla by Fraterny</span> <br/><span className='text-3xl md:text-6xl'>The Journey Outward</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-500 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-tight font-gilroy-regular text-left sm:text-center mx-auto">
            <span className=" font-gilroy-medium">Fratvilla is our exclusive, hyper-luxurious 6-day experience for 20 ambitious 
            individuals in a secret villa. It's an immersive, real-world application of the 
            principles discovered through Quest, where you'll be surrounded by a curated 
            group of like-minded peers.</span>
          </p>
          {/* <p className="text-base md:text-lg lg:text-xl font-gilroy-regular text-[#555] max-w-4xl mx-auto leading-relaxed">
            Fratvilla is our exclusive, hyper-luxurious 6-day experience for 20 ambitious 
            individuals in a secret villa. It's an immersive, real-world application of the 
            principles discovered through Quest, where you'll be surrounded by a curated 
            group of like-minded peers.
          </p> */}
        </motion.div>

        <div className='w-full h-full mb-10 md:mb-16 '>
                  {/* Image show with random rotate and skew effect */}
          <div className={`relative flex items-center justify-center ${isMobile ? 'h-[400px]' : 'h-96'}`}>
          {timelineImages.map((imgSrc, idx) => (
            <motion.div
                key={`card-${idx}-${isMobile}`}  // Force re-render on mobile change
                className={`absolute ${isMobile ? 'h-64 w-44' : 'h-96 w-64'}`}
                initial="rest"
                animate="rest"  // ADD THIS LINE
                whileHover="hover"
                variants={timelineCardVariants}
                custom={idx}
              >
              <Image
                src={imgSrc}
                alt={`Mountain ${idx}`}
                fill
                fetchPriority='low'
                preload={true}
                className={`w-full h-full object-cover rounded-2xl shadow-md border-2 border-white cursor-pointer`}
              />
            </motion.div>
          ))}
          </div>

        </div>

        {/* Second Header */}
        {/* <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tighter">
            What <span className='text-neutral-700 tracking-wide'>FratVilla</span> Does
          </h2>
        </motion.div> */}

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 sm:mt-36 mt-28"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative"
            >
              <motion.section
                className="relative h-full"
                initial = {{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Number Circle - positioned absolutely */}
                <motion.div 
                  className="absolute top-0 right-0 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-2xl text-[#1a1a1a] z-10 shadow-lg font-gilroy-black"
                  variants={circleVariants}
                >
                  {feature.number}
                </motion.div>

                {/* Card with clip-path */}
                <motion.div
                  className="bg-white rounded-[30px] h-full p-2"
                  style={{
                    '--r': `${cardRadius}px`,
                    '--s': `${innerCurveSize}px`,
                    clipPath: 'shape(from 0 0, hline to calc(100% - var(--s) - 2 * var(--r)), arc by var(--r) var(--r) of var(--r) cw, arc by var(--s) var(--s) of var(--s), arc by var(--r) var(--r) of var(--r) cw, vline to 100%, hline to 0)',
                  } as React.CSSProperties}
                >
                  <div className='relative'>
                  {/* Content */}
                  <div className="pr-3 flex flex-col gap-1 sm:gap-1">
                    <h3 className="font-gilroy-medium mb-0 sm:mb-8 tracking-tighter pl-4 pr-16 pt-8 md:pl-4 md:pr-16 md:pt-8">
                      {feature.title}
                    </h3>
                    <div className={`text-lg sm:text-lg font-gilroy-regular text-[#666] leading-relaxed pl-4 pr-16 md:pl-4 md:pr-16 pb-10 ${index === 1 ? 'mb-8' : ''}`}>
                      {feature.description}
                    </div>
                    <motion.img
                      initial={{ y: -20, opacity: 0, filter: 'blur(2px)' }}
                      animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: -20, opacity: 0, filter: 'blur(2px)' }}
                      transition={{ duration: 0.6, delay: 0.4 }} 
                      src={feature.image} 
                      alt={`Feature ${feature.number} Image`}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  </div>
                </motion.div>
              </motion.section>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Custom CSS for clip-path fallback */}
      <style jsx>{`
        @supports not (clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)) {
          .clip-path-card {
            clip-path: none !important;
            border-radius: 30px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutFratVilla;