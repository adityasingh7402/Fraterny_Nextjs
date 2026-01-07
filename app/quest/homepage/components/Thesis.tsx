import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const Thesis: React.FC = () => {
  return (
    <div>
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
    <div className='container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-24 pt-8'>
        <div className='relative w-80 h-80 md:w-[600px] md:h-[800px]'>
          <Image
            src='/quest/quest-pdf-page-1.webp'
            alt='Thesis Illustration'
            layout='fill'
            objectFit='contain'
            priority
          />
        </div>
        <div className='p-4 sm:p-0 relative '>
          {[
            {
              id: "extract-1",
              title: "Reveals Your True Self",
              description: "Quest helps you understand your core motivations, strengths, and weaknesses, providing a clear picture of your current self."
            },
            {
              id: "extract-2",
              title: "Identifies the Gap",
              description: "It highlights the gap between your current reality and your ideal self, showing you exactly what's holding you back."
            },
            {
              id: "extract-3",
              title: "Provides Personalized Tools",
              description: "Based on your unique persona, Quest delivers hyper-personalized psychological frameworks and tools to take immediate action."
            }
          ].map((item) => (
            <li className="group pb-4 mb-4 border-b border-gray-300 list-none" key={item.id}>
              <input
                type="radio"
                name="accordion"
                id={item.id}
                className="peer hidden"
                defaultChecked={item.id === "extract-1"}
              />
              <label
                htmlFor={item.id}
                className="transition-colors peer-checked:text-black text-neutral-400 cursor-pointer block"
              >
                <p className="text-3xl sm:text-5xl font-gilroy-semibold">{item.title}</p>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-has-checked:grid-rows-[1fr]">
                  <div className="overflow-hidden text-lg md:text-xl font-gilroy-regular">
                    {item.description}
                  </div>
                </div>
              </label>
            </li>
          ))}

          <div className='pt-20'>
            <Link href='/quest/quest-mode'>
              <div className="text-2xl md:text-3xl font-bold text-neutral-900 sm:text-neutral-400 hover:text-neutral-900  transition-colors duration-300 flex flex-row items-center gap-4 cursor-pointer underline">
                Enter Quest Mode.
                <ArrowRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};