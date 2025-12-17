
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TrustSection from './TrustSection';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-8 pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center bg-[#f7f7f7]">

      <div className='pt-16 sm:pt-32 flex flex-col items-center justify-center'>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-16">
          <img src="/Vector.svg" alt="Quest Logo" className="w-24 md:w-32 h-auto" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-7xl font-gilroy-semibold text-[#222222] tracking-tight mb-10">
          Understand your mind and get unshakable clarity
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-2xl text-gray-700 mb-7 sm:mb-20 md:mb-20 max-w-5xl leading-relaxed font-gilroy-regular">
          <span className="italic font-gilroy-semibold">Quest</span> decodes the deeper psychological insights hidden in your words to reveal the patterns that quietly drive your life in 20 minutes.
        </p>

        {/* CTA */}
        <div className="mb-8">
          <Link href="/quest/quest-mode">
            <button className='px-7 py-3 bg-black text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Enter Quest Mode</button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex items-center space-x-4 mb-12">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://picsum.photos/100/100?random=${i}`}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <div className="flex flex-col items-start">
            <div className="flex text-orange-400">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-sm text-gray-600 font-gilroy-semibold">500+ happy users</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full max-w-2xl mx-auto mb-16">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full bottom-0"></div>
        <img
          src="https://picsum.photos/800/600?random=100"
          alt="Mosaic App Interface"
          className="rounded-2xl shadow-2xl border border-gray-200 w-full"
        />
      </div>

      {/* Logos */}
      <div className="text-center w-full flex flex-col items-center justify-center max-w-5xl">
        <p className="text-gray-500 text-lg mb-4 font-gilroy-medium">Used by high intent thinkers at</p>
        <TrustSection />
      </div>
      
    </section>
  );
};

export default HeroSection;