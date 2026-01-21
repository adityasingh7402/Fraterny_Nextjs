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

// const Envicon = () => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" xmlSpace="preserve">
//       <path fill="#282D33" d="M64.266 60.616c-6.621 0-12.008-5.413-12.008-12.066s5.387-12.066 12.008-12.066 12.009 5.413 12.009 12.066-5.388 12.066-12.009 12.066zm0-20.115c-4.406 0-7.991 3.611-7.991 8.049 0 4.438 3.584 8.049 7.991 8.049s7.991-3.61 7.991-8.049c0-4.438-3.585-8.049-7.991-8.049zM83.001 31.457c-4.792-5.329-11.621-8.385-18.736-8.385-7.123 0-13.955 3.054-18.742 8.379l-2.987-2.685c5.548-6.172 13.468-9.711 21.729-9.711 8.253 0 16.172 3.542 21.724 9.716l-2.988 2.686zM64.258 78.048c-8.252 0-16.169-3.542-21.722-9.718l2.987-2.686c4.792 5.329 11.621 8.387 18.734 8.387 7.123 0 13.955-3.056 18.745-8.381l2.987 2.686c-5.55 6.173-13.47 9.712-21.731 9.712zM29.453 63.89l-2.85-2.831 11.056-11.132-11.056-11.133 2.85-2.83 13.868 13.963z"/>
//       <path fill="#282D33" d="M38.718 52.041H21.927c-10.66 0-19.332-8.722-19.332-19.442 0-10.709 8.672-19.421 19.332-19.421v4.017c-8.444 0-15.315 6.91-15.315 15.404 0 8.505 6.871 15.425 15.315 15.425h16.791v4.017zM101.143 63.892 87.272 49.928l13.871-13.963 2.849 2.831-11.056 11.132 11.056 11.133z"/>
//       <path fill="#282D33" d="M108.669 52.041H91.876v-4.017h16.793c8.444 0 15.313-6.919 15.313-15.423 0-8.494-6.869-15.404-15.313-15.404V13.18c10.659 0 19.331 8.712 19.331 19.421 0 10.719-8.672 19.44-19.331 19.44z"/>
//       <g><path fill="#282D33" d="M110.882 40.482c-4.41-21.037-23.146-36.307-44.549-36.307-21.271 0-39.984 15.157-44.493 36.04l-3.927-.849C22.819 16.647 43.182.158 66.333.158c23.295 0 43.684 16.612 48.48 39.5l-3.931.824zM101.993 127.84h-4.018V82.915l.583-.587c6.955-7.009 11.387-15.869 12.816-25.625l3.974.583c-1.514 10.336-6.126 19.749-13.355 27.275v43.279zM49.646 127.842h-4.017v-15.158H27.333c-8.175 0-14.825-6.686-14.825-14.903V80.918H0l14.275-24.861 3.484 2L6.939 76.9h9.586v20.88c0 6.003 4.849 10.887 10.808 10.887h22.313v19.175z"/></g>
      
//     </svg>
//   );
// };

const Envicon = () => {
  return (
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="128" 
      height="128" 
      xmlSpace="preserve"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Central pin/marker - pops in first */}
      <motion.path 
        fill="#282D33" 
        d="M64.266 60.616c-6.621 0-12.008-5.413-12.008-12.066s5.387-12.066 12.008-12.066 12.009 5.413 12.009 12.066-5.388 12.066-12.009 12.066zm0-20.115c-4.406 0-7.991 3.611-7.991 8.049 0 4.438 3.584 8.049 7.991 8.049s7.991-3.61 7.991-8.049c0-4.438-3.585-8.049-7.991-8.049z"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              duration: 0.5,
              ease: "backOut"
            }
          }
        }}
        style={{ transformOrigin: "64.266px 48.55px" }}
      />

      {/* Rest of your paths remain the same... */}
      <motion.path 
        fill="#282D33" 
        d="M83.001 31.457c-4.792-5.329-11.621-8.385-18.736-8.385-7.123 0-13.955 3.054-18.742 8.379l-2.987-2.685c5.548-6.172 13.468-9.711 21.729-9.711 8.253 0 16.172 3.542 21.724 9.716l-2.988 2.686zM64.258 78.048c-8.252 0-16.169-3.542-21.722-9.718l2.987-2.686c4.792 5.329 11.621 8.387 18.734 8.387 7.123 0 13.955-3.056 18.745-8.381l2.987 2.686c-5.55 6.173-13.47 9.712-21.731 9.712z"
        variants={{
          hidden: { scale: 0.8, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut"
            }
          }
        }}
        style={{ transformOrigin: "64px 49px" }}
      />

      <motion.g
        variants={{
          hidden: { x: -20, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              delay: 0.4,
              duration: 0.4,
              ease: "easeOut"
            }
          }
        }}
      >
        <path fill="#282D33" d="M29.453 63.89l-2.85-2.831 11.056-11.132-11.056-11.133 2.85-2.83 13.868 13.963z"/>
        <path fill="#282D33" d="M38.718 52.041H21.927c-10.66 0-19.332-8.722-19.332-19.442 0-10.709 8.672-19.421 19.332-19.421v4.017c-8.444 0-15.315 6.91-15.315 15.404 0 8.505 6.871 15.425 15.315 15.425h16.791v4.017z"/>
      </motion.g>

      <motion.g
        variants={{
          hidden: { x: 20, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              delay: 0.4,
              duration: 0.4,
              ease: "easeOut"
            }
          }
        }}
      >
        <path fill="#282D33" d="M101.143 63.892 87.272 49.928l13.871-13.963 2.849 2.831-11.056 11.132 11.056 11.133z"/>
        <path fill="#282D33" d="M108.669 52.041H91.876v-4.017h16.793c8.444 0 15.313-6.919 15.313-15.423 0-8.494-6.869-15.404-15.313-15.404V13.18c10.659 0 19.331 8.712 19.331 19.421 0 10.719-8.672 19.44-19.331 19.44z"/>
      </motion.g>

      <motion.g
        variants={{
          hidden: { scale: 0.9, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              delay: 0.6,
              duration: 0.5,
              ease: "easeOut"
            }
          }
        }}
        style={{ transformOrigin: "64px 64px" }}
      >
        <path fill="#282D33" d="M110.882 40.482c-4.41-21.037-23.146-36.307-44.549-36.307-21.271 0-39.984 15.157-44.493 36.04l-3.927-.849C22.819 16.647 43.182.158 66.333.158c23.295 0 43.684 16.612 48.48 39.5l-3.931.824z"/>
      </motion.g>

      <motion.g
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              delay: 0.7,
              duration: 0.4,
              ease: "easeOut"
            }
          }
        }}
      >
        <path fill="#282D33" d="M101.993 127.84h-4.018V82.915l.583-.587c6.955-7.009 11.387-15.869 12.816-25.625l3.974.583c-1.514 10.336-6.126 19.749-13.355 27.275v43.279zM49.646 127.842h-4.017v-15.158H27.333c-8.175 0-14.825-6.686-14.825-14.903V80.918H0l14.275-24.861 3.484 2L6.939 76.9h9.586v20.88c0 6.003 4.849 10.887 10.808 10.887h22.313v19.175z"/>
      </motion.g>
    </motion.svg>
  );
};

// const Successicon = () => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" xmlSpace="preserve"><path fill="#282D33" d="m63.684 56.621 2.841 2.816-59.414 59.938-2.84-2.816z"/><path fill="#282D33" d="m12.874 110.744 10.196 10.29-2.842 2.816-10.195-10.291zM27.065 96.432l10.196 10.288-2.84 2.816-10.197-10.289zM19.962 103.584l6.207 6.264-2.842 2.815-6.206-6.264zM59.214 61.791a14.092 14.092 0 0 1-10.078-4.21c-5.545-5.595-5.545-14.698-.001-20.293 2.692-2.716 6.272-4.212 10.081-4.212s7.389 1.496 10.081 4.212c5.544 5.595 5.543 14.698-.002 20.292a14.103 14.103 0 0 1-10.081 4.211zm.002-24.716a10.122 10.122 0 0 0-7.239 3.028c-4.006 4.042-4.006 10.62 0 14.663 1.934 1.951 4.504 3.025 7.237 3.025s5.305-1.075 7.239-3.027c4.007-4.042 4.008-10.619.002-14.661a10.122 10.122 0 0 0-7.239-3.028z"/><path fill="#282D33" d="M76.92 79.655a14.099 14.099 0 0 1-10.08-4.211c-5.544-5.595-5.544-14.698-.001-20.293A14.095 14.095 0 0 1 76.92 50.94c3.809 0 7.389 1.496 10.081 4.211 5.543 5.593 5.543 14.696-.001 20.292a14.096 14.096 0 0 1-10.08 4.212zm0-24.715a10.122 10.122 0 0 0-7.239 3.027c-4.005 4.042-4.005 10.62 0 14.662 1.935 1.951 4.506 3.026 7.239 3.026s5.304-1.075 7.238-3.027c4.006-4.043 4.006-10.62.001-14.661a10.125 10.125 0 0 0-7.239-3.027z"/><g><path fill="#282D33" d="M83.849 54.8c-3.81 0-7.389-1.496-10.08-4.211-5.546-5.595-5.546-14.698.001-20.293a14.093 14.093 0 0 1 10.078-4.21c3.81 0 7.39 1.496 10.08 4.213 5.544 5.593 5.544 14.695 0 20.29A14.098 14.098 0 0 1 83.849 54.8zm-.001-24.715a10.122 10.122 0 0 0-7.237 3.026c-4.008 4.042-4.008 10.619-.001 14.661a10.125 10.125 0 0 0 7.239 3.027c2.733 0 5.304-1.075 7.237-3.026 4.006-4.042 4.006-10.619 0-14.66a10.122 10.122 0 0 0-7.238-3.028z"/></g><g><path fill="#282D33" d="m64.014 128-.802-.005.045-4 .757.005c1.033 0 2.081-.027 3.113-.082l.211 3.994a62.5 62.5 0 0 1-3.324.088zm-4.93-.192a63.508 63.508 0 0 1-4.105-.456l.571-3.959c1.275.184 2.569.327 3.845.427l-.311 3.988zm12.369-.247-.473-3.973a59.406 59.406 0 0 0 3.825-.581l.729 3.934a66.068 66.068 0 0 1-4.081.62zm-20.542-.931a63.531 63.531 0 0 1-4.009-.986l1.082-3.852c1.23.347 2.494.657 3.757.926l-.83 3.912zm28.657-.575-.986-3.877a59.45 59.45 0 0 0 3.715-1.076l1.238 3.803a63.818 63.818 0 0 1-3.967 1.15zm-36.604-1.659a63.061 63.061 0 0 1-3.848-1.504l1.578-3.676c1.18.507 2.392.98 3.603 1.408l-1.333 3.772zm44.452-.898-1.484-3.715c1.194-.478 2.385-1 3.538-1.553l1.729 3.607a61.963 61.963 0 0 1-3.783 1.661zm-52.039-2.361a62.61 62.61 0 0 1-3.617-1.997l2.048-3.436a59.27 59.27 0 0 0 3.387 1.87l-1.818 3.563zm59.483-1.202-1.961-3.486a60.077 60.077 0 0 0 3.307-2.005l2.184 3.352a64.183 64.183 0 0 1-3.53 2.139zm6.911-4.506-2.398-3.201a61.592 61.592 0 0 0 3.02-2.419l2.6 3.039a66.04 66.04 0 0 1-3.222 2.581zm6.267-5.365-2.791-2.865a62.567 62.567 0 0 0 2.687-2.789l2.967 2.684a66.422 66.422 0 0 1-2.863 2.97zm5.534-6.121-3.133-2.486a61.275 61.275 0 0 0 2.309-3.109l3.287 2.279a63.78 63.78 0 0 1-2.463 3.316zm4.704-6.785-3.428-2.063a60.041 60.041 0 0 0 1.886-3.379l3.555 1.834a63.612 63.612 0 0 1-2.013 3.608zM8.989 95.892a64.103 64.103 0 0 1-1.929-3.651l3.596-1.752a58.985 58.985 0 0 0 1.808 3.421l-3.475 1.982zm113.074-6.07-3.666-1.602a60.302 60.302 0 0 0 1.434-3.595l3.762 1.359a63.985 63.985 0 0 1-1.53 3.838zM5.373 88.474a63.213 63.213 0 0 1-1.441-3.868l3.791-1.275a60.014 60.014 0 0 0 1.352 3.626l-3.702 1.517zm119.498-6.413-3.84-1.117c.359-1.238.683-2.5.959-3.749l3.906.865a63.257 63.257 0 0 1-1.025 4.001zM2.741 80.653a64.817 64.817 0 0 1-.934-4.02l3.923-.781c.25 1.26.545 2.528.876 3.771l-3.865 1.03zm123.921-6.648-3.951-.617a61.64 61.64 0 0 0 .474-3.843l3.984.363a65.177 65.177 0 0 1-.507 4.097zM1.132 72.562a64.53 64.53 0 0 1-.415-4.105l3.99-.275c.088 1.279.22 2.576.39 3.854l-3.965.526zm126.281-6.772-3.998-.107a61.386 61.386 0 0 0-.017-3.873l3.998-.146a64.903 64.903 0 0 1 .017 4.126zM.563 64.331l-.001-.353c0-1.254.037-2.522.109-3.77l3.993.232a62.143 62.143 0 0 0-.103 3.537l.001.336-3.999.018zm122.574-6.385a60.94 60.94 0 0 0-.508-3.838l3.947-.65c.223 1.351.404 2.727.541 4.09l-3.98.398zM5.012 56.584l-3.971-.486a65.68 65.68 0 0 1 .632-4.078l3.932.737a60.841 60.841 0 0 0-.593 3.827zm116.868-6.273a61.438 61.438 0 0 0-.992-3.743l3.832-1.146c.394 1.316.75 2.658 1.057 3.988l-3.897.901zM6.44 48.978l-3.876-.988c.338-1.326.724-2.66 1.147-3.966l3.805 1.234a61.6 61.6 0 0 0-1.076 3.72zm113.218-6.077a59.594 59.594 0 0 0-1.463-3.582l3.652-1.631a65.041 65.041 0 0 1 1.561 3.82l-3.75 1.393zM8.828 41.618 5.111 40.14a64.892 64.892 0 0 1 1.648-3.786l3.614 1.714a60.786 60.786 0 0 0-1.545 3.55zm107.676-5.776a60.588 60.588 0 0 0-1.913-3.363l3.412-2.088a65.323 65.323 0 0 1 2.04 3.585l-3.539 1.866zM12.146 34.627 8.65 32.682a63.912 63.912 0 0 1 2.125-3.542l3.361 2.168a59.664 59.664 0 0 0-1.99 3.319zm100.319-5.377a59.464 59.464 0 0 0-2.329-3.085l3.111-2.513a64.097 64.097 0 0 1 2.487 3.293l-3.269 2.305zM16.34 28.123l-3.214-2.381a63.891 63.891 0 0 1 2.564-3.238l3.054 2.584c-.83.981-1.64 2.002-2.404 3.035zm91.269-4.892a60.61 60.61 0 0 0-2.707-2.764l2.762-2.893c.404.386.804.778 1.199 1.177.576.582 1.14 1.173 1.691 1.772l-2.945 2.708zm-86.27-1.019-2.882-2.774a64.061 64.061 0 0 1 2.953-2.88l2.7 2.951a60.46 60.46 0 0 0-2.771 2.703zm80.68-4.336a59.633 59.633 0 0 0-3.041-2.397l2.371-3.221a63.643 63.643 0 0 1 3.246 2.557l-2.576 3.061zm-74.971-.886-2.503-3.12a64.319 64.319 0 0 1 3.299-2.476l2.296 3.275a60.193 60.193 0 0 0-3.092 2.321zm68.741-3.702a59.668 59.668 0 0 0-3.326-1.979l1.932-3.503a63.325 63.325 0 0 1 3.551 2.112l-2.157 3.37zm-62.413-.733L31.3 9.136a63.108 63.108 0 0 1 3.597-2.026l1.848 3.548a58.841 58.841 0 0 0-3.369 1.897zm55.639-3a58.771 58.771 0 0 0-3.557-1.524l1.453-3.727a63.036 63.036 0 0 1 3.799 1.627l-1.695 3.624zm-48.786-.569-1.61-3.661a62.98 62.98 0 0 1 3.832-1.537l1.367 3.759a58.872 58.872 0 0 0-3.589 1.439zm41.582-2.241a58.33 58.33 0 0 0-3.726-1.044l.953-3.885a62.95 62.95 0 0 1 3.978 1.115l-1.205 3.814zm-34.318-.398-1.117-3.841a62.824 62.824 0 0 1 4.001-1.022l.861 3.906a58.666 58.666 0 0 0-3.745.957zm26.806-1.445a58.82 58.82 0 0 0-3.83-.548l.438-3.977c1.362.15 2.738.347 4.09.586l-.698 3.939zm-19.257-.221L54.436.727a63.71 63.71 0 0 1 4.101-.491l.345 3.985a58.46 58.46 0 0 0-3.84.46zm11.57-.623A40.902 40.902 0 0 0 63.996 4c-.418 0-.834.004-1.252.013L62.658.014c.457-.01.919.004 1.371-.014.92 0 1.841.021 2.761.062l-.178 3.996z"/></g></svg>
//   )
// }

const Successicon = () => {
  return (
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="128" 
      height="128" 
      xmlSpace="preserve"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Diagonal lines - animate with opacity and scale */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.3,
              duration: 0.4,
              ease: "easeOut"
            }
          }
        }}
        style={{ transformOrigin: "center" }}
      >
        <path fill="#282D33" d="m63.684 56.621 2.841 2.816-59.414 59.938-2.84-2.816z"/>
        <path fill="#282D33" d="m12.874 110.744 10.196 10.29-2.842 2.816-10.195-10.291zM27.065 96.432l10.196 10.288-2.84 2.816-10.197-10.289zM19.962 103.584l6.207 6.264-2.842 2.815-6.206-6.264z"/>
      </motion.g>

      {/* First circle (bottom-left) */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              duration: 0.5,
              ease: "backOut"
            }
          }
        }}
        style={{ transformOrigin: "59.214px 47.382px" }}
      >
        <path fill="#282D33" d="M59.214 61.791a14.092 14.092 0 0 1-10.078-4.21c-5.545-5.595-5.545-14.698-.001-20.293 2.692-2.716 6.272-4.212 10.081-4.212s7.389 1.496 10.081 4.212c5.544 5.595 5.543 14.698-.002 20.292a14.103 14.103 0 0 1-10.081 4.211zm.002-24.716a10.122 10.122 0 0 0-7.239 3.028c-4.006 4.042-4.006 10.62 0 14.663 1.934 1.951 4.504 3.025 7.237 3.025s5.305-1.075 7.239-3.027c4.007-4.042 4.008-10.619.002-14.661a10.122 10.122 0 0 0-7.239-3.028z"/>
      </motion.g>

      {/* Second circle (middle) */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              delay: 0.15,
              duration: 0.5,
              ease: "backOut"
            }
          }
        }}
        style={{ transformOrigin: "76.92px 65.246px" }}
      >
        <path fill="#282D33" d="M76.92 79.655a14.099 14.099 0 0 1-10.08-4.211c-5.544-5.595-5.544-14.698-.001-20.293A14.095 14.095 0 0 1 76.92 50.94c3.809 0 7.389 1.496 10.081 4.211 5.543 5.593 5.543 14.696-.001 20.292a14.096 14.096 0 0 1-10.08 4.212zm0-24.715a10.122 10.122 0 0 0-7.239 3.027c-4.005 4.042-4.005 10.62 0 14.662 1.935 1.951 4.506 3.026 7.239 3.026s5.304-1.075 7.238-3.027c4.006-4.043 4.006-10.62.001-14.661a10.125 10.125 0 0 0-7.239-3.027z"/>
      </motion.g>

      {/* Third circle (top-right) */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              delay: 0.3,
              duration: 0.5,
              ease: "backOut"
            }
          }
        }}
        style={{ transformOrigin: "83.849px 40.393px" }}
      >
        <path fill="#282D33" d="M83.849 54.8c-3.81 0-7.389-1.496-10.08-4.211-5.546-5.595-5.546-14.698.001-20.293a14.093 14.093 0 0 1 10.078-4.21c3.81 0 7.39 1.496 10.08 4.213 5.544 5.593 5.544 14.695 0 20.29A14.098 14.098 0 0 1 83.849 54.8zm-.001-24.715a10.122 10.122 0 0 0-7.237 3.026c-4.008 4.042-4.008 10.619-.001 14.661a10.125 10.125 0 0 0 7.239 3.027c2.733 0 5.304-1.075 7.237-3.026 4.006-4.042 4.006-10.619 0-14.66a10.122 10.122 0 0 0-7.238-3.028z"/>
      </motion.g>

      {/* Outer circle segments - draw in effect */}
      <motion.g
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              delay: 0.6,
              duration: 0.8,
              ease: "easeInOut"
            }
          }
        }}
      >
        <path fill="#282D33" d="m64.014 128-.802-.005.045-4 .757.005c1.033 0 2.081-.027 3.113-.082l.211 3.994a62.5 62.5 0 0 1-3.324.088zm-4.93-.192a63.508 63.508 0 0 1-4.105-.456l.571-3.959c1.275.184 2.569.327 3.845.427l-.311 3.988zm12.369-.247-.473-3.973a59.406 59.406 0 0 0 3.825-.581l.729 3.934a66.068 66.068 0 0 1-4.081.62zm-20.542-.931a63.531 63.531 0 0 1-4.009-.986l1.082-3.852c1.23.347 2.494.657 3.757.926l-.83 3.912zm28.657-.575-.986-3.877a59.45 59.45 0 0 0 3.715-1.076l1.238 3.803a63.818 63.818 0 0 1-3.967 1.15zm-36.604-1.659a63.061 63.061 0 0 1-3.848-1.504l1.578-3.676c1.18.507 2.392.98 3.603 1.408l-1.333 3.772zm44.452-.898-1.484-3.715c1.194-.478 2.385-1 3.538-1.553l1.729 3.607a61.963 61.963 0 0 1-3.783 1.661zm-52.039-2.361a62.61 62.61 0 0 1-3.617-1.997l2.048-3.436a59.27 59.27 0 0 0 3.387 1.87l-1.818 3.563zm59.483-1.202-1.961-3.486a60.077 60.077 0 0 0 3.307-2.005l2.184 3.352a64.183 64.183 0 0 1-3.53 2.139zm6.911-4.506-2.398-3.201a61.592 61.592 0 0 0 3.02-2.419l2.6 3.039a66.04 66.04 0 0 1-3.222 2.581zm6.267-5.365-2.791-2.865a62.567 62.567 0 0 0 2.687-2.789l2.967 2.684a66.422 66.422 0 0 1-2.863 2.97zm5.534-6.121-3.133-2.486a61.275 61.275 0 0 0 2.309-3.109l3.287 2.279a63.78 63.78 0 0 1-2.463 3.316zm4.704-6.785-3.428-2.063a60.041 60.041 0 0 0 1.886-3.379l3.555 1.834a63.612 63.612 0 0 1-2.013 3.608zM8.989 95.892a64.103 64.103 0 0 1-1.929-3.651l3.596-1.752a58.985 58.985 0 0 0 1.808 3.421l-3.475 1.982zm113.074-6.07-3.666-1.602a60.302 60.302 0 0 0 1.434-3.595l3.762 1.359a63.985 63.985 0 0 1-1.53 3.838zM5.373 88.474a63.213 63.213 0 0 1-1.441-3.868l3.791-1.275a60.014 60.014 0 0 0 1.352 3.626l-3.702 1.517zm119.498-6.413-3.84-1.117c.359-1.238.683-2.5.959-3.749l3.906.865a63.257 63.257 0 0 1-1.025 4.001zM2.741 80.653a64.817 64.817 0 0 1-.934-4.02l3.923-.781c.25 1.26.545 2.528.876 3.771l-3.865 1.03zm123.921-6.648-3.951-.617a61.64 61.64 0 0 0 .474-3.843l3.984.363a65.177 65.177 0 0 1-.507 4.097zM1.132 72.562a64.53 64.53 0 0 1-.415-4.105l3.99-.275c.088 1.279.22 2.576.39 3.854l-3.965.526zm126.281-6.772-3.998-.107a61.386 61.386 0 0 0-.017-3.873l3.998-.146a64.903 64.903 0 0 1 .017 4.126zM.563 64.331l-.001-.353c0-1.254.037-2.522.109-3.77l3.993.232a62.143 62.143 0 0 0-.103 3.537l.001.336-3.999.018zm122.574-6.385a60.94 60.94 0 0 0-.508-3.838l3.947-.65c.223 1.351.404 2.727.541 4.09l-3.98.398zM5.012 56.584l-3.971-.486a65.68 65.68 0 0 1 .632-4.078l3.932.737a60.841 60.841 0 0 0-.593 3.827zm116.868-6.273a61.438 61.438 0 0 0-.992-3.743l3.832-1.146c.394 1.316.75 2.658 1.057 3.988l-3.897.901zM6.44 48.978l-3.876-.988c.338-1.326.724-2.66 1.147-3.966l3.805 1.234a61.6 61.6 0 0 0-1.076 3.72zm113.218-6.077a59.594 59.594 0 0 0-1.463-3.582l3.652-1.631a65.041 65.041 0 0 1 1.561 3.82l-3.75 1.393zM8.828 41.618 5.111 40.14a64.892 64.892 0 0 1 1.648-3.786l3.614 1.714a60.786 60.786 0 0 0-1.545 3.55zm107.676-5.776a60.588 60.588 0 0 0-1.913-3.363l3.412-2.088a65.323 65.323 0 0 1 2.04 3.585l-3.539 1.866zM12.146 34.627 8.65 32.682a63.912 63.912 0 0 1 2.125-3.542l3.361 2.168a59.664 59.664 0 0 0-1.99 3.319zm100.319-5.377a59.464 59.464 0 0 0-2.329-3.085l3.111-2.513a64.097 64.097 0 0 1 2.487 3.293l-3.269 2.305zM16.34 28.123l-3.214-2.381a63.891 63.891 0 0 1 2.564-3.238l3.054 2.584c-.83.981-1.64 2.002-2.404 3.035zm91.269-4.892a60.61 60.61 0 0 0-2.707-2.764l2.762-2.893c.404.386.804.778 1.199 1.177.576.582 1.14 1.173 1.691 1.772l-2.945 2.708zm-86.27-1.019-2.882-2.774a64.061 64.061 0 0 1 2.953-2.88l2.7 2.951a60.46 60.46 0 0 0-2.771 2.703zm80.68-4.336a59.633 59.633 0 0 0-3.041-2.397l2.371-3.221a63.643 63.643 0 0 1 3.246 2.557l-2.576 3.061zm-74.971-.886-2.503-3.12a64.319 64.319 0 0 1 3.299-2.476l2.296 3.275a60.193 60.193 0 0 0-3.092 2.321zm68.741-3.702a59.668 59.668 0 0 0-3.326-1.979l1.932-3.503a63.325 63.325 0 0 1 3.551 2.112l-2.157 3.37zm-62.413-.733L31.3 9.136a63.108 63.108 0 0 1 3.597-2.026l1.848 3.548a58.841 58.841 0 0 0-3.369 1.897zm55.639-3a58.771 58.771 0 0 0-3.557-1.524l1.453-3.727a63.036 63.036 0 0 1 3.799 1.627l-1.695 3.624zm-48.786-.569-1.61-3.661a62.98 62.98 0 0 1 3.832-1.537l1.367 3.759a58.872 58.872 0 0 0-3.589 1.439zm41.582-2.241a58.33 58.33 0 0 0-3.726-1.044l.953-3.885a62.95 62.95 0 0 1 3.978 1.115l-1.205 3.814zm-34.318-.398-1.117-3.841a62.824 62.824 0 0 1 4.001-1.022l.861 3.906a58.666 58.666 0 0 0-3.745.957zm26.806-1.445a58.82 58.82 0 0 0-3.83-.548l.438-3.977c1.362.15 2.738.347 4.09.586l-.698 3.939zm-19.257-.221L54.436.727a63.71 63.71 0 0 1 4.101-.491l.345 3.985a58.46 58.46 0 0 0-3.84.46zm11.57-.623A40.902 40.902 0 0 0 63.996 4c-.418 0-.834.004-1.252.013L62.658.014c.457-.01.919.004 1.371-.014.92 0 1.841.021 2.761.062l-.178 3.996z"/>
      </motion.g>
    </motion.svg>
  )
}

const Socialconnection = () => {
  return (
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="128" 
      height="128" 
      xmlSpace="preserve"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Circle paths - animated with drawing effect */}
      <motion.path 
        fill="none"
        stroke="#282D33"
        strokeWidth="1"
        d="M64 128C29.028 128 .576 99.29.576 64S29.028 0 64 0c34.972 0 63.424 28.71 63.424 64h-4c0-33.084-26.657-60-59.424-60S4.576 30.916 4.576 64 31.233 124 64 124v4z"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { 
              pathLength: { duration: 1.5, ease: "easeInOut" },
              opacity: { duration: 0.5 }
            }
          }
        }}
      />
      
      {/* Second circle path segments */}
      <motion.g
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { 
              pathLength: { duration: 1.5, ease: "easeInOut" },
              opacity: { duration: 0.5 }
            }
          }
        }}
      >
        <motion.path fill="none" stroke="#282D33" strokeWidth="1" d="m127.392 66.018-3.998-.133c.021-.626.03-1.255.03-1.885h4c0 .675-.01 1.347-.032 2.018z"/>
        <motion.path fill="none" stroke="#282D33" strokeWidth="1" d="M68.089 127.869l-.256-3.992a59.036 59.036 0 0 0 3.885-.379l.52 3.967a63.582 63.582 0 0 1-4.149.404zm8.371-1.105-.785-3.922c1.3-.261 2.611-.571 3.898-.923l1.057 3.857a61.967 61.967 0 0 1-4.17.988zm8.26-2.259-1.316-3.777a59.194 59.194 0 0 0 3.736-1.446l1.57 3.678a63.113 63.113 0 0 1-3.99 1.545zm7.866-3.359-1.816-3.564a60.071 60.071 0 0 0 3.507-1.941l2.055 3.432a64.595 64.595 0 0 1-3.746 2.073zm7.341-4.398-2.283-3.285a60.023 60.023 0 0 0 3.217-2.398l2.496 3.125a65.199 65.199 0 0 1-3.43 2.558zm6.683-5.343-2.701-2.949a59.804 59.804 0 0  0 2.867-2.809l2.893 2.764a63.993 63.993 0 0 1-3.059 2.994zm5.91-6.186-3.068-2.566a59.493 59.493 0 0 0 2.469-3.164l3.234 2.354a65.147 65.147 0 0 1-2.635 3.376zm5.037-6.921-3.383-2.133a59.595 59.595 0 0 0 2.025-3.467l3.52 1.902a64.194 64.194 0 0 1-2.162 3.698zm4.072-7.534-3.639-1.66a61.138 61.138 0 0 0 1.545-3.708l3.742 1.414a64.983 64.983 0 0 1-1.648 3.954zm3.029-8.011-3.828-1.16a60.67 60.67 0 0 0 1.036-3.877l3.896.902a64.236 64.236 0 0 1-1.104 4.135zm1.931-8.335-3.949-.639c.214-1.316.386-2.656.512-3.982l3.982.379a66.537 66.537 0 0 1-.545 4.242zM64 128v-4c.634 0 1.267-.012 1.896-.028l.109 3.998c-.666.018-1.334.03-2.005.03z"/>
      </motion.g>

      {/* Checkmark - appears after circle */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { 
              delay: 1.2, // Appears after circle animation
              duration: 0.4,
              ease: "backOut"
            }
          }
        }}
        style={{ transformOrigin: "center" }}
      >
        <path fill="#282D33" d="M53.521 94.636 29.584 70.159l14.814-14.961 9.272 9.359 30.896-31.185 14.827 14.97-45.872 46.294zM35.196 70.177l18.343 18.758 40.224-40.593-9.196-9.286L53.671 70.24 44.4 60.882l-9.204 9.295z"/>
      </motion.g>
    </motion.svg>
  )
}





const features = [
  {
    number: 1,
    title: <span className='text-neutral-500 text-2xl'>Creates an <br/> <span className='text-neutral-700 text-4xl'>Environment</span></span>,
    description: "The Fratvilla group is carefully selected based on the harmony, diversity, and thinking depth of their Quest results, ensuring a dynamic and supportive environment for all attendees.",
    image: "https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg", // Add your images
    icon: <Envicon />
  },
  {
    number: 2,
    title: <span className='text-neutral-500 text-2xl'>Instills the Psychology of <br/> <span className='text-neutral-700 text-4xl'> Success</span></span>,
    description: "Through a series of specially designed activities and the application of our \"Fratrules,\" you'll learn to embody the mindset of a high-achiever.",
    image: "https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg",
    icon: <Successicon />
  },
  {
    number: 3,
    title: <span className='text-neutral-500 text-2xl'>Fosters Genuine <br/> <span className='text-neutral-700 text-4xl'>Connection</span></span>,
    description: "Fratvilla is designed to maximize personal growth and bonding, creating a powerful network of ambitious individuals who will support you long after the experience is over.",
    image: "https://images.pexels.com/photos/34410598/pexels-photo-34410598.jpeg",
    icon: <Socialconnection />
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
                {/* <motion.div
                  className="bg-white rounded-[30px] h-full p-2"
                  style={{
                    '--r': `${cardRadius}px`,
                    '--s': `${innerCurveSize}px`,
                    clipPath: 'shape(from 0 0, hline to calc(100% - var(--s) - 2 * var(--r)), arc by var(--r) var(--r) of var(--r) cw, arc by var(--s) var(--s) of var(--s), arc by var(--r) var(--r) of var(--r) cw, vline to 100%, hline to 0)',
                  } as React.CSSProperties}
                >
                  <div className='relative '>
                 
                  <div className="pr-3 flex flex-col gap-1 sm:gap-1">
                    <h3 className="font-gilroy-medium mb-0 sm:mb-2 tracking-tighter pl-4 pr-16 pt-8 md:pl-4 md:pr-16 md:pt-8">
                      {feature.title}
                    </h3>
                    {
                      feature.icon && (
                        <div className="flex items-center justify-start mt-5 ml-4 mb-4">
                          {feature.icon}
                        </div>
                      )
                    }
                    <div className={`text-lg sm:text-lg font-gilroy-regular text-[#666] leading-relaxed pl-4 pr-16 md:pl-4 md:pr-16 pb-10 ${index === 1 ? 'mb-8' : ''}`}>
                      {feature.description}
                    </div>
                  </div>
                  </div>
                </motion.div> */}
                <motion.section
                  className="relative h-full group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Number Circle */}
                  <motion.div 
                    className="absolute top-0 right-0 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-2xl text-[#1a1a1a] z-10 shadow-lg font-gilroy-black"
                    variants={circleVariants}
                  >
                    {feature.number}
                  </motion.div>

                  {/* Gradient Glow Background */}
                  <div className="absolute -inset-[2px] rounded-[32px] bg-gradient-to-r from-neutral-600 via-neutral-700 to-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  {/* Card with clip-path */}
                  <motion.div
                    className="bg-white rounded-[30px] h-full p-2 relative"
                    style={{
                      '--r': `${cardRadius}px`,
                      '--s': `${innerCurveSize}px`,
                      clipPath: 'shape(from 0 0, hline to calc(100% - var(--s) - 2 * var(--r)), arc by var(--r) var(--r) of var(--r) cw, arc by var(--s) var(--s) of var(--s), arc by var(--r) var(--r) of var(--r) cw, vline to 100%, hline to 0)',
                    } as React.CSSProperties}
                  >
                    <div className='relative'>
                      {/* Content stays exactly the same */}
                      <div className="pr-3 flex flex-col gap-1 sm:gap-1">
                        <h3 className="font-gilroy-medium mb-0 sm:mb-2 tracking-tighter pl-4 pr-16 pt-8 md:pl-4 md:pr-16 md:pt-8">
                          {feature.title}
                        </h3>
                        {feature.icon && (
                          <div className="flex items-center justify-start mt-5 ml-4 mb-4">
                            {feature.icon}
                          </div>
                        )}
                        <div className={`text-lg sm:text-lg font-gilroy-regular text-[#666] leading-relaxed pl-4 pr-16 md:pl-4 md:pr-16 pb-10 ${index === 1 ? 'mb-8' : ''}`}>
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.section>
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


