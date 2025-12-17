import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const Thesis: React.FC = () => {
  return (
    <section className="bg-black text-white py-20 px-6 black-bg-section">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-gray-400 font-gilroy-semibold mb-6 uppercase tracking-wider text-xl">The <span className=" text-xl">Quest</span> Mode</h3>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 font-gilroy-semibold">
          The dynamics of belief have <span className="gradient-text">changed</span>.
          They can <span className="text-transparent bg-clip-text bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))] pr-3 font-gilroy-bold">blind</span> you.
          Or <span className="text-transparent bg-clip-text bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))] font-gilroy-bold">wake</span> you up.
        </h2>

        <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-gilroy-regular">
          <p>
            Here’s the problem: whether you’re a founder, designer, student, operator, or analyst - your attention is becoming a commodity.
          </p>

          <div className="space-y-4 border-l-2 border-gray-800 pl-6 my-8 font-gilroy-medium">
            <p>Biases are eating your judgement.</p>
            <p>Feeds are eating your focus.</p>
            <p>Propaganda is eating first principles.</p>
          </div>

          <p className="font-medium text-white">
            Thinking you <span className='font-gilroy-bold'>"know yourself"</span> used to be enough. <br />
            Not anymore.
          </p>

          <p className=''>
            The cost is quiet: you repeat moves that dont't serve you and keep making the same mistakes.
          </p>

          <p>
            The edge now is distance -
            step outside your story, see the frame, then act.
          </p>

          <p>
            Map the drivers, blind spots, loops.
            Name them. Choose better.
          </p>

          <div className="pt-8">
            <p className="mb-4">And it all starts with understanding your psychology.</p>

            <Link href='/quest/quest-mode'>
              <div className="text-2xl md:text-3xl font-bold text-white flex flex-row items-center gap-4 cursor-pointer underline">
                Enter: Quest. <span className="text-white font-gilroy-bold italic"><ArrowRight /></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};