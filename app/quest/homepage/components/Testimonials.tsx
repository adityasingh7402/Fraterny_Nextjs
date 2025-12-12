'use client';

// import React from 'react';
// import { Star } from 'lucide-react';

// export interface TestimonialData {
//   name: string;
//   role: string;
//   avatar: string;
//   stars: number;
//   text: string;
// }

// interface TestimonialsProps {
//   title: string;
//   data: TestimonialData[];
//   light?: boolean;
// }

// export const Testimonials: React.FC<TestimonialsProps> = ({ title, data, light = true }) => {
//   return (
//     <section className={`py-20 px-4 ${light ? 'bg-white text-black' : 'bg-gray-50 text-black'}`}>
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl md:text-5xl font-gilroy-bold text-center mb-4 leading-tight">
//           {title}
//         </h2>
//         <p className="text-center text-gray-500 mb-12 font-gilroy-semibold">Genuine people, real feedback.</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data.map((item, index) => (
//             <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
//               <div className="flex items-center mb-4">
//                 <img 
//                   src={item.avatar} 
//                   alt={item.name} 
//                   className="w-12 h-12 rounded-full mr-4 object-cover"
//                 />
//                 <div>
//                   <h4 className="font-bold text-sm font-gilroy-bold">{item.name}</h4>
//                   <p className="text-md text-gray-500 font-gilroy-semibold">{item.role}</p>
//                 </div>
//               </div>
//               <div className="flex text-orange-400 mb-3">
//                 {[...Array(item.stars)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-700 text-md leading-relaxed italic font-gilroy-regular">"{item.text}"</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export interface TestimonialData {
  name: string;
  role: string;
  avatar: string;
  stars: number;
  text: string;
}

interface TestimonialsProps {
  title: string;
  data: TestimonialData[];
  light?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ title, data, light = true }) => {
  // Split data into two rows and duplicate for infinite scroll
  const midPoint = Math.ceil(data.length / 2);
  const topRow = [...data.slice(0, midPoint), ...data.slice(0, midPoint), ...data.slice(0, midPoint)];
  const bottomRow = [...data.slice(midPoint), ...data.slice(midPoint), ...data.slice(midPoint)];

  return (
    <section className="py-12 md:py-20 px-4 overflow-hidden 
  [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]
  [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
      <div className="max-w-7xl mx-auto mb-8 md:mb-16">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-gilroy-bold text-center mb-3 md:mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-center text-gray-500 text-sm md:text-base mb-8 md:mb-12 font-gilroy-semibold">
          Genuine people, real feedback.
        </p>
      </div>

      {/* Top Row - Left to Right */}
      <div className="mb-4 md:mb-8">
        <motion.div
          className="flex gap-3 md:gap-6"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {topRow.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg border border-gray-100 w-[280px] flex-shrink-0"
            >
              <div className="mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-neutral-900 mb-2 md:mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 font-gilroy-regular line-clamp-4 md:line-clamp-none h-20">
                {item.text}
              </p>
              <div className="flex items-center pt-3 md:pt-4 border-t border-gray-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-2 md:mr-3 object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-xs md:text-sm font-gilroy-bold">{item.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-gilroy-semibold">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row - Right to Left */}
      <div>
        <motion.div
          className="flex gap-3 md:gap-6"
          animate={{
            x: [-2000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {bottomRow.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg border border-gray-100 w-[300px] flex-shrink-0"
            >
              <div className="mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-neutral-800 mb-2 md:mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 font-gilroy-regular line-clamp-4 md:line-clamp-none h-20">
                {item.text}
              </p>
              <div className="flex items-center pt-3 md:pt-4 border-t border-gray-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-2 md:mr-3 object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-xs md:text-sm font-gilroy-bold">{item.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-gilroy-semibold">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};