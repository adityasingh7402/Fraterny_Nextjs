'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/app/admin/hooks/use-mobile';
import { cn } from "@/lib/utils";
import img from '@/public/img1HeroDesktop.png'
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Link from 'next/link';

interface AboutProjectGalleryProps {
  className?: string;
}

export const AboutFratVilla = ({ className }: AboutProjectGalleryProps) => {
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
          {/* Text Block - Top Left (spans 2 rows) */}
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
                Fratvilla <span className="text-neutral-900">Experience</span>
            </motion.h2>
            <p className="text-lg md:text-2xl text-neutral-500 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-tight font-gilroy-regular text-left sm:text-left mt-10 mx-auto">
                <span className=" font-gilroy-medium">Fratvilla is our exclusive, hyper-luxurious 6-day experience for 20 ambitious 
                individuals in a secret villa. It's an immersive, real-world application of the 
                principles discovered through Quest, where you'll be surrounded by a curated 
                group of like-minded peers.</span>
            </p>
            <div className="mb-8">
                <Link href="/experience">
                    <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Explore our Villa</button>
                </Link>
            </div>
          </motion.div>

          {/* Image 1 - Top Middle (small decorative) */}
          <motion.div 
            className="md:col-span-1 md:row-span-2 flex flex-col justify-start pr-4 lg:pr-8 min-h-[500px] lg:min-h-[600px]"
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
                src='https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg'
                alt="Decorative pampas grass and vintage camera"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Image 2 - Top Right (tall, spans 2 rows) */}
          <motion.div
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
                src="https://images.pexels.com/photos/31921726/pexels-photo-31921726.jpeg"
                alt="Modern chair with fur throw by the window"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Image 3 - Bottom Left-Center (wide, spans 2 columns) */}
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
                src="https://images.pexels.com/photos/7245430/pexels-photo-7245430.jpeg"
                alt="Cozy living room with modern fireplace and large windows"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover rounded-lg"
                fetchPriority="low"
              />
            </motion.div>
          </motion.div>

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
                src="https://images.pexels.com/photos/23496598/pexels-photo-23496598.jpeg"
                alt="Cozy living room with modern fireplace and large windows"
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
                Fratvilla <span className="text-neutral-900">Experience</span>
            </motion.h2>
            <p className="text-lg md:text-2xl text-neutral-500 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-tight font-gilroy-regular text-left sm:text-left mt-10 mx-auto">
                <span className=" font-gilroy-medium">Fratvilla is our exclusive, hyper-luxurious 6-day experience for 20 ambitious 
                individuals in a secret villa. It's an immersive, real-world application of the 
                principles discovered through Quest, where you'll be surrounded by a curated 
                group of like-minded peers.</span>
            </p>
            <div className="mb-8">
                <Link href="/experience">
                    <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Explore our Villa</button>
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
                src="https://images.pexels.com/photos/27623464/pexels-photo-27623464.jpeg"
                alt="Cozy living room with modern fireplace and large windows"
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
                src="https://images.pexels.com/photos/31921726/pexels-photo-31921726.jpeg"
                alt="Modern chair with fur throw by the window"
                fill
                sizes="100vw"
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
                src="https://images.pexels.com/photos/23496598/pexels-photo-23496598.jpeg"
                alt="Decorative pampas grass and vintage camera"
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