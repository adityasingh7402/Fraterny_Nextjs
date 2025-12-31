// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useIsMobile } from '@/app/admin/hooks/use-mobile';
// import { cn } from "@/lib/utils";
// import Link from 'next/link';

// interface AboutQuestProps {
//   className?: string;
// }

// export const AboutQuest = ({ className }: AboutQuestProps) => {
//   const isMobile = useIsMobile();

//   // Animation variants for images
//   const imageVariants = {
//     rest: {
//       scale: 1,
//     },
//     hover: {
//       transition: {
//         duration: 0.4,
//         ease: "easeOut" as const
//       }
//     }
//   };

//   // Fade in animation for initial load
//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.6,
//         ease: "easeOut" as const
//       }
//     })
//   };

//   return (
//     <section className={cn("w-full bg-white py-12 md:py-20 px-4 md:px-8 lg:px-12", className)}>
//       <div className="max-w-7xl mx-auto">
//         {/* Desktop & Tablet Layout - CSS Grid */}
//         <div className="hidden md:grid md:grid-cols-3 md:grid-rows-[auto_auto] gap-15 lg:gap-6">
          
//           {/* Image 1 - Top Left */}
//           <motion.div 
//             className="md:col-span-1 md:row-span-1 relative h-[250px] lg:h-[300px] rounded-lg overflow-hidden"
//             custom={0}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInVariants}
//           >
//             {/* <motion.div
//               className="w-full h-full relative"
//               initial="rest"
//               whileHover="hover"
//               variants={imageVariants}
//             >
//               <Image
//                 src='/quest/quest-introspective.webp'
//                 alt="Quest introspective journaling interface"
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
//                 className="object-contain rounded-lg absoloute"
//                 priority
//               />
//             </motion.div> */}
//             <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 aspect-video w-full h-full">
//             <Image
//                 src='/quest/quest-introspective.webp'
//                 alt="Feature Image"
//                 fill
//                 className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
//                 priority
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none"></div>
//             </div>
//           </motion.div>

//           {/* Image 2 - Top Middle */}
//           <motion.div
//             className="md:col-span-1 md:row-span-1 relative h-[250px] lg:h-[300px] rounded-lg overflow-hidden"
//             custom={1}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInVariants}
//           >
//             <motion.div
//               className="w-full h-full relative"
//               initial="rest"
//               whileHover="hover"
//               variants={imageVariants}
//             >
//               <Image
//                 src="/quest/quest-psychology.webp"
//                 alt="Quest psychological file design"
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
//                 className="object-cover rounded-lg"
//                 priority
//               />
//             </motion.div>
//           </motion.div>

//           {/* Text Block - Top Right (spans 2 rows) */}
//           <motion.div 
//             className="md:col-span-1 md:row-span-2 flex flex-col justify-center pr-4 lg:pr-8 min-h-[500px] lg:min-h-[600px]"
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.h2 
//                 className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//             >
//                 Quest <span className="text-neutral-900">Experience</span>
//             </motion.h2>
//             <p className="text-lg md:text-2xl text-neutral-500 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-tight font-gilroy-regular text-left sm:text-left mt-10 mx-auto">
//                 <span className="font-gilroy-medium">Quest is a self-mapping tool designed for ambitious, overthinking people. 
//                 It uses introspective journaling prompts and psychological analysis to help you understand 
//                 your patterns, process emotions, and make decisions you actually trust.</span>
//             </p>
//             <div className="mb-8">
//                 <Link href="/quest">
//                     <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>
//                         Start Your Quest
//                     </button>
//                 </Link>
//             </div>
//           </motion.div>

//           {/* Image 3 - Bottom Left (wide, spans 2 columns) */}
//           <motion.div
//             className="md:col-span-2 md:row-span-1 relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden"
//             custom={2}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeInVariants}
//           >
//             <motion.div
//               className="w-full h-full relative"
//               initial="rest"
//               whileHover="hover"
//               variants={imageVariants}
//             >
//               <Image
//                 src="/quest/quest-depth.webp"
//                 alt="Quest depth and resources"
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
//                 className="object-cover rounded-lg"
//                 fetchPriority="low"
//               />
//             </motion.div>
//           </motion.div>
          
//         </div>

//         {/* Mobile Layout - Single Column Stack */}
//         <div className="md:hidden space-y-6">
//           {/* Text Section - Top on Mobile */}
//           <motion.div 
//             className="flex flex-col justify-start"
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.h2 
//                 className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//             >
//                 Quest <span className="text-neutral-900">Experience</span>
//             </motion.h2>
//             <p className="text-lg md:text-2xl text-neutral-500 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-tight font-gilroy-regular text-left sm:text-left mt-10 mx-auto">
//                 <span className="font-gilroy-medium">Quest is a self-mapping tool designed for ambitious, overthinking people. 
//                 It uses introspective journaling prompts and psychological analysis to help you understand 
//                 your patterns, process emotions, and make decisions you actually trust.</span>
//             </p>
//             <div className="mb-8">
//                 <Link href="/quest">
//                     <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>
//                         Start Your Quest
//                     </button>
//                 </Link>
//             </div>
//           </motion.div>

//           {/* Mobile Gallery - Single Column */}
//           <div className="space-y-4">
//             {/* Image 1 - Mobile */}
//             <motion.div
//               className="relative h-[250px] rounded-lg overflow-hidden"
//               custom={0}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInVariants}
//             >
//               <Image
//                 src="/quest/quest-introspective.webp"
//                 alt="Quest introspective journaling interface"
//                 fill
//                 sizes="100vw"
//                 className="object-cover rounded-lg"
//                 priority
//               />
//             </motion.div>

//             {/* Image 2 - Mobile */}
//             <motion.div
//               className="relative h-[300px] rounded-lg overflow-hidden"
//               custom={1}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInVariants}
//             >
//             <Image
//                 src="/quest/quest-psychology.webp"
//                 alt="Quest psychological file design"
//                 fill
//                 sizes="100vw"
//                 className="object-cover rounded-lg"
//                 fetchPriority="low"
//               />
//             </motion.div>

//             {/* Image 3 - Mobile */}
//             <motion.div
//               className="relative h-[200px] rounded-lg overflow-hidden"
//               custom={2}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInVariants}
//             >
//               <Image
//                 src="/quest/quest-depth.webp"
//                 alt="Quest depth and resources"
//                 fill
//                 sizes="100vw"
//                 className="object-cover rounded-lg"
//                 fetchPriority="low"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/app/admin/hooks/use-mobile';
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface AboutQuestProps {
  className?: string;
}

export const AboutQuest = ({ className }: AboutQuestProps) => {
  const isMobile = useIsMobile();

  // Animation variants for images
  const imageVariants = {
    rest: {
      scale: 1,
    },
    hover: {
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  // Fade in animation for initial load
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section className={cn("w-full bg-white py-12 md:py-20 px-4 md:px-8 lg:px-12", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop & Tablet Layout - CSS Grid */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-[auto_auto] gap-4 lg:gap-6">
          
          {/* Image 1 - Top Left (spans 2 rows) */}
          <motion.div 
            className="md:col-span-2 md:row-span-2 flex flex-col justify-start pr-4 lg:pr-8 min-h-[500px] lg:min-h-[600px]"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <motion.div
              className="w-full h-full relative"
              initial="rest"
              whileHover="hover"
              variants={imageVariants}
            >
              <Image
                src='/quest/quest-hero.webp'
                alt="Quest introspective journaling interface"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Image 2 - Top Middle (tall, spans 2 rows) */}
          {/* <motion.div
            className="md:col-span-1 md:row-span-2 relative h-full min-h-[500px] lg:min-h-[600px] rounded-lg overflow-hidden"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <motion.div
              className="w-full h-full relative"
              initial="rest"
              whileHover="hover"
              variants={imageVariants}
            >
              <Image
                src="/quest/quest-psychology.webp"
                alt="Quest psychological file design"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </motion.div> */}

          {/* Text Block - Top Right (spans 2 rows) */}
          <motion.div 
            className="md:col-span-1 md:row-span-2 flex flex-col justify-start pr-4 lg:pr-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
                className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Quest <span className="text-neutral-900">Experience</span>
            </motion.h2>
            <p className="text-lg md:text-2xl text-neutral-500 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-tight font-gilroy-regular text-left sm:text-left mt-10 mx-auto">
                <span className=" font-gilroy-medium">Quest is a self-mapping tool designed for ambitious, overthinking people. 
                It uses introspective journaling prompts and psychological analysis to help you understand 
                your patterns, process emotions, and make decisions you actually trust.</span>
            </p>
            <div className="mb-8">
                <Link href="/quest">
                    <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Start Your Quest</button>
                </Link>
            </div>
          </motion.div>

          {/* Image 3 - Bottom Left */}
          <motion.div
            className="md:col-span-2 md:row-span-1 relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <motion.div
              className="w-full h-full relative"
              initial="rest"
              whileHover="hover"
              variants={imageVariants}
            >
              <Image
                src="/quest/quest-introspective.webp"
                alt="Quest depth and resources"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover rounded-lg"
                fetchPriority="low"
              />
            </motion.div>
          </motion.div>

          {/* Image 4 - Bottom Right (wide, spans 2 columns) */}
          <motion.div
            className="md:col-span-1 md:row-span-1 relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <motion.div
              className="w-full h-full relative"
              initial="rest"
              whileHover="hover"
              variants={imageVariants}
            >
              <Image
                src="/quest/quest-psychology.webp"
                alt="Quest additional depth showcase"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover rounded-lg"
                fetchPriority="low"
              />
            </motion.div>
          </motion.div>
          
        </div>

        {/* Mobile Layout - Single Column Stack */}
        <div className="md:hidden space-y-6">
          {/* Text Section - Top on Mobile */}
          <motion.div 
            className="md:col-span-1 md:row-span-2 flex flex-col justify-start pr-4 lg:pr-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
                className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Quest <span className="text-neutral-900">Experience</span>
            </motion.h2>
            <p className="text-lg md:text-2xl text-neutral-500 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-tight font-gilroy-regular text-left sm:text-left mt-10 mx-auto">
                <span className=" font-gilroy-medium">Quest is a self-mapping tool designed for ambitious, overthinking people. 
                It uses introspective journaling prompts and psychological analysis to help you understand 
                your patterns, process emotions, and make decisions you actually trust.</span>
            </p>
            <div className="mb-8">
                <Link href="/quest">
                    <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Start Your Quest</button>
                </Link>
            </div>
          </motion.div>

          {/* Mobile Gallery - Single Column */}
          <div className="space-y-4">
            {/* Image 1 - Mobile */}
            <motion.div
              className="relative h-[250px] rounded-lg overflow-hidden"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <Image
                src="/quest/quest-introspective.webp"
                alt="Quest introspective journaling interface"
                fill
                sizes="100vw"
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>

            {/* Image 2 - Mobile */}
            <motion.div
              className="relative h-[300px] rounded-lg overflow-hidden"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
            <Image
                src="/quest/quest-psychology.webp"
                alt="Quest psychological file design"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover rounded-lg absolute"
                fetchPriority="low"
              />
            </motion.div>

            {/* Image 3 - Mobile */}
            <motion.div
              className="relative h-[200px] rounded-lg overflow-hidden"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <Image
                src="/quest/quest-depth.webp"
                alt="Quest depth and resources"
                fill
                sizes="100vw"
                className="object-cover rounded-lg"
                fetchPriority="low"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};