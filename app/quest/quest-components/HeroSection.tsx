import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-8 pb-32 px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center text-center bg-[#f7f7f7] min-h-screen">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src="/quest-transparent-logo.png" alt="Quest Logo" className="w-24 md:w-32 h-auto" />
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-[#222222] leading-tight tracking-tight mb-6">
        Understand your mind and get unshakable clarity
      </h1>

      {/* Subhead */}
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
        <span className="italic">Quest</span> decodes the deeper psychological insights hidden in your words to reveal the patterns that quietly drive your life in 20 minutes.
      </p>

      {/* CTA */}
      <div className="mb-8">
        <button>Enter Quest Mode</button>
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
          <span className="text-sm text-gray-600 font-medium">5100+ happy users</span>
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
      <div className="text-center w-full">
        <p className="text-gray-400 text-sm mb-4">Used already by outstanding thinkers at</p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50 grayscale">
          {/* Simple Text Placeholders for Logos to avoid external SVG complexity */}
          <span className="font-bold text-xl font-serif">Google</span>
          <span className="font-bold text-xl font-sans italic">NETFLIX</span>
          <span className="font-bold text-xl font-sans">amazon</span>
          <span className="font-bold text-xl font-serif">The New York Times</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;