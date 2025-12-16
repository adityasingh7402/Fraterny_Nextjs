'use client'

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: "The Quest assessment completely transformed how I understand myself. The insights were incredibly accurate and actionable.",
    name: "Sarah Mitchell",
    username: "@sarahmitchell",
    avatar: "https://i.pravatar.cc/150?img=1",
    size: "small"
  },
  {
    id: 2,
    text: "Fratvilla was the most transformative experience of my life. Being surrounded by like-minded individuals pushed me to levels I never thought possible.",
    name: "Marcus Chen",
    username: "@marcuschen",
    avatar: "https://i.pravatar.cc/150?img=13",
    size: "small"
  },
  {
    id: 3,
    text: "The level of self-awareness I gained from Quest is unmatched. It's like having a roadmap to your own potential.",
    name: "Emily Rodriguez",
    username: "@emilyrodriguez",
    avatar: "https://i.pravatar.cc/150?img=5",
    size: "small"
  },
  {
    id: 4,
    text: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
    name: "Jessica Williams",
    username: "@jessicawilliams",
    avatar: "https://i.pravatar.cc/150?img=9",
    size: "large",
    featured: true
  },
  {
    id: 5,
    text: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
    name: "David Park",
    username: "@davidpark",
    avatar: "https://i.pravatar.cc/150?img=12",
    size: "medium"
  },
  {
    id: 6,
    text: "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsam perferendis recusandae saepe corrupti.",
    name: "Rachel Green",
    username: "@rachelgreen",
    avatar: "https://i.pravatar.cc/150?img=45",
    size: "medium"
  },
  {
    id: 7,
    text: "Nam nesciunt dolorem dolor asperiores cum. Incidunt molestiae quis deleniti vitae ut in earum delectus iusto.",
    name: "Alex Thompson",
    username: "@alexthompson",
    avatar: "https://i.pravatar.cc/150?img=33",
    size: "medium"
  },
  {
    id: 8,
    text: "Aliquid dolore praesentium ratione. Cumque ea officia repellendus laboriosam. Vitae quod id explicabo non sunt.",
    name: "Sophia Martinez",
    username: "@sophiamartinez",
    avatar: "https://i.pravatar.cc/150?img=44",
    size: "medium"
  },
  {
    id: 9,
    text: "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.",
    name: "James Wilson",
    username: "@jameswilson",
    avatar: "https://i.pravatar.cc/150?img=14",
    size: "small"
  },
  {
    id: 10,
    text: "Architecto libero natus est. Est quam debitis officia enim atque et ut non. Sunt reiciendis quasi eaque. Itaque error ut et.",
    name: "Olivia Brown",
    username: "@oliviabrown",
    avatar: "https://i.pravatar.cc/150?img=32",
    size: "small"
  },
  {
    id: 11,
    text: "Temporibus ea molestiae impedit adipisci perspiciatis illo aliquid. Quis ut ratione et voluptatem et. Nostrum explicabo iste unde beatae.",
    name: "Michael Davis",
    username: "@michaeldavis",
    avatar: "https://i.pravatar.cc/150?img=15",
    size: "small"
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        bg-neutral-800 backdrop-blur-sm
        rounded-2xl p-6 md:p-8
        border border-neutral-200
        hover:border-slate-600/50 transition-all duration-300
        ${testimonial.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
        ${testimonial.size === 'medium' ? 'md:col-span-1' : ''}
        ${testimonial.featured ? 'relative overflow-hidden' : ''}
      `}
    >
      {testimonial.featured && (
        <div className="absolute inset-0 bg-neutral-800" />
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Quote */}
        <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6 flex-grow font-gilroy-regular">
          "{testimonial.text}"
        </p>

        {/* Featured Logo (for large card) */}
        {testimonial.featured && (
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl">F</span>
            </div>
            <span className="text-white text-xl font-bold ml-3 self-center">Fraterny</span>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
          />
          <div>
            <p className="text-white font-gilroy-semibold text-sm">{testimonial.name}</p>
            <p className="text-neutral-500 font-gilroy-medium text-xs">{testimonial.username}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BentoTestimonialGrid = () => {
  return (
    <section className="min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <motion.h2 
                className="text-5xl sm:text-6xl md:text-7xl font-gilroy-bold text-neutral-500"
            >
                What Our <span className="text-neutral-100">Community</span> says
            </motion.h2>
          <p className="text-neutral-500 text-xl font-gilroy-semibold">
            Real transformations from real people
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-4 md:space-y-6">
            <TestimonialCard testimonial={testimonials[0]} index={0} />
            <TestimonialCard testimonial={testimonials[1]} index={1} />
            <TestimonialCard testimonial={testimonials[2]} index={2} />
          </div>

          {/* Center Large Area */}
          <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-fr hidden sm:grid">
            {/* Featured Large Card */}
            <div className="md:col-span-2">
              <TestimonialCard testimonial={testimonials[3]} index={3} />
            </div>

            {/* Bottom 4 Medium Cards */}
            <TestimonialCard testimonial={testimonials[4]} index={4} />
            <TestimonialCard testimonial={testimonials[5]} index={5} />
            <TestimonialCard testimonial={testimonials[6]} index={6} />
            <TestimonialCard testimonial={testimonials[7]} index={7} />
          </div>

          {/* Right Column */}
          <div className="md:col-span-1 lg:col-span-1 space-y-4 md:space-y-6">
            <TestimonialCard testimonial={testimonials[8]} index={8} />
            <TestimonialCard testimonial={testimonials[9]} index={9} />
            <TestimonialCard testimonial={testimonials[10]} index={10} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoTestimonialGrid;