import React from 'react'
import HeroSection from './homepage/components/HeroSection'
import Feature from './homepage/components/Feature'
import { Thesis } from './homepage/components/Thesis'
import { Testimonials, TestimonialData } from './homepage/components/Testimonials'
import { FeaturesGrid } from './homepage/components/FeaturesGrid'
import { Pricing, PricingPlan } from './homepage/components/Pricing'
import { FAQ, FAQItem } from './homepage/components/FAQ'
import Navigation from '../website-navigation/components/Navigation'
import Footer from '../website-navigation/components/Footer'
import FaqSection from './homepage/components/FaqSection'
import CustomCursor from '@/components/CustomCursor'

const testimonials1: TestimonialData[] = [
  {
    name: "Hope_Good19",
    role: "",
    avatar: "https://picsum.photos/100/100?random=60",
    stars: 5,
    text: "I am speechless — the accuracy, introspective feedback and summary from my file was outstanding."
  },
  {
    name: "wicked-dream1",
    role: "",
    avatar: "https://picsum.photos/100/100?random=61",
    stars: 5,
    text: "Spending 10 minutes on Quest was the equivalent to an hour with a psychiatrist, yet I even get a tangible file from my time spent."
  },
  {
    name: "Anonymous",
    role: "",
    avatar: "https://picsum.photos/100/100?random=62",
    stars: 5,
    text: "Woww — some key takeaways for me to reflect on in life that I never would have pieced together before! Highly recommend."
  },
  {
    name: "Veronicastyles",
    role: "",
    avatar: "https://picsum.photos/100/100?random=63",
    stars: 5,
    text: "Very insightful! Thank you."
  },
  {
    name: "Jennaofficial90",
    role: "",
    avatar: "https://picsum.photos/100/100?random=64",
    stars: 5,
    text: "I am surprised how accurate the free preview was considering I gave quite vague answers."
  },
  {
    name: "Vibess1998",
    role: "",
    avatar: "https://picsum.photos/100/100?random=65",
    stars: 5,
    text: "I tried it out. The file didn’t resonate with me at first, but the next observations it made blew my mind with perspective."
  },
  {
    name: "Anonymous",
    role: "",
    avatar: "https://picsum.photos/100/100?random=66",
    stars: 5,
    text: "This makes my self-obsessed self happy because no one wants to pick my brain apart and I have to do it myself."
  },
  {
    name: "Anonymous",
    role: "",
    avatar: "https://picsum.photos/100/100?random=67",
    stars: 5,
    text: "STOP SEEING THROUGH ME! Kudos to your efforts!!!"
  }
];


const faqItems: FAQItem[] = [
  {
    question: "What Makes Mosaic Different from Other Learning Tools?",
    answer: "Mosaic isn't just a list of facts. It's a curated system of mental models and frameworks designed to change HOW you think, not just WHAT you know. We focus on visualization and interconnection of ideas."
  },
  {
    question: "Who Is Mosaic Designed For?",
    answer: "It is designed for knowledge workers, leaders, entrepreneurs, and lifelong learners who want to upgrade their decision-making skills and strategic thinking."
  },
  {
    question: "Is Mosaic Really Worth That Much?",
    answer: "Consider the ROI of just one better decision made because you used a better mental model. Or one mistake avoided. The value density is extremely high compared to traditional courses."
  },
  {
    question: "How Much Time Will I Need to Invest?",
    answer: "Mosaic is designed for busy professionals. You can get value in 5-minute bursts. There is no 'curriculum' you must follow linearly."
  }
];


const testimonials2: TestimonialData[] = [
  {
    name: "Regina K.",
    role: "Director of Operations",
    avatar: "https://picsum.photos/100/100?random=60",
    stars: 5,
    text: "I question many ideas I come up with in meetings or otherwise. Mosaic helped me understand how to refine and share them more effectively. Now I'm way more confident in discussions and presentations."
  },
  {
    name: "Joseph C.",
    role: "A.I. Researcher",
    avatar: "https://picsum.photos/100/100?random=61",
    stars: 5,
    text: "It's surprisingly dense in useful information. I really love the short maxims about life and living. Super unique and interesting. The mental models are also extremely powerful."
  },
  {
    name: "Philipp Z.",
    role: "Head of Finance",
    avatar: "https://picsum.photos/100/100?random=62",
    stars: 5,
    text: "Super valuable stuff! I'm using the insights section almost on a daily basis to find new triggers for me to look at my challenges at work differently. Definitely has upped my game."
  }
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Mosaic Light",
    price: "$57",
    description: "Get access to all insights and resources. No mental models.",
    features: [
      { text: "275+ Insights & Ideas", included: true },
      { text: "200+ Resources", included: true },
      { text: "25+ Mental Models", included: false },
    ]
  },
  {
    name: "Full Lifetime Access",
    price: "$57",
    originalPrice: "$99",
    isBestOffer: true,
    description: "Unlock everything. Pay only once. Free updates forever.",
    features: [
      { text: "275+ Insights & Ideas", included: true },
      { text: "200+ Resources", included: true },
      { text: "25+ Mental Models", included: true },
    ],
    bonuses: [
      "Bonus: Clarity Second Brain (Value: $49)",
      "Bonus: Personal OKR Tracker (Value: $19)",
      "Bonus: ToolVault (Value: $19)",
      "Bonus: A.I. Power Prompts (Value: $15)"
    ]
  }
];

function page() {
  return (
    <div className='force-scrolled-nav'>
      <CustomCursor />
      <Navigation />
      <div className='bg-[#f7f7f7]'>
        <HeroSection />
        <Thesis />
        <Testimonials title="" data={testimonials1} />
        {/* <HeroSection />
        <Thesis />
        <Testimonials title="" data={testimonials1} /> */}

        {/* Feature 0: The Hook */}
        <section className="bg-black text-white py-24 px-6 text-center black-bg-section">
          <div className="max-w-5xl mx-auto">
            <div className="text-gray-500 uppercase tracking-widest text-xl font-gilroy-bold mb-4">What's in it?</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-gilroy-bold">Private Intelligence on Your <span className="text-transparent bg-clip-text bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))] pr-5">Psych*logy</span></h2>
            <p className="text-xl text-white mb-8 leading-relaxed font-gilroy-medium">
              As I’ve been building Quest and studying how ambitious, overthinking people actually move through life, I’ve taken tens of thousands of notes from real answers, late-night reflections, and repeating patterns.
            </p>
            <p className="text-xl text-white mb-12 font-gilroy-medium leading-relaxed">
              On identity conflicts, family vs freedom, money anxiety, control and trust, validation and ego, self-sabotage, focus and numbness, intensity in relationships, and more. Much more.
            </p>
            <div className="text-white font-bold text-xl mb-16 font-gilroy-medium leading-relaxed">
              Quest turns the sharpest of those patterns into a very powerful self-mapping tool unlike anything else.
            </div>
            <div className="inline-block border-b bg-neutral-800 shadow-2xl border-neutral-300 pb-2 text-gray-400 text-sm font-gilroy-medium px-4 py-2 rounded-lg">Pure signal. Zero noise.</div>
          </div>
        </section>
        {/* Feature 0: The Hook */}
        {/* <section className="bg-black text-white py-24 px-6 text-center black-bg-section">
          <div className="max-w-5xl mx-auto">
            <div className="text-gray-500 uppercase tracking-widest text-xl font-gilroy-bold mb-4">What's in it?</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-gilroy-bold">Private Intelligence on Your <span className="text-transparent bg-clip-text bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))] pr-5">Psych*logy</span></h2>
            <p className="text-xl text-white mb-8 leading-relaxed font-gilroy-medium">
              As I’ve been building Quest and studying how ambitious, overthinking people actually move through life, I’ve taken tens of thousands of notes from real answers, late-night reflections, and repeating patterns.
            </p>
            <p className="text-xl text-white mb-12 font-gilroy-medium leading-relaxed">
              On identity conflicts, family vs freedom, money anxiety, control and trust, validation and ego, self-sabotage, focus and numbness, intensity in relationships, and more. Much more.
            </p>
            <div className="text-white font-bold text-xl mb-16 font-gilroy-medium leading-relaxed">
              Quest turns the sharpest of those patterns into a very powerful self-mapping tool unlike anything else.
            </div>
            <div className="inline-block border-b bg-neutral-800 shadow-2xl border-neutral-300 pb-2 text-gray-400 text-sm font-gilroy-medium px-4 py-2 rounded-lg">Pure signal. Zero noise.</div>
          </div>
        </section> */}

      {/* <div className='flex flex-col items-center justify-center w-px bg-black lg:w-auto overflow-hidden'>
        <div className='flex flex-col items-center justify-center w-px bg-black lg:w-auto overflow-hidden'>
          <div className='bg-linear-to-b from-transparent via-white/90 to-transparent w-px h-48'>
              
          </div>
      </div> */}
      <div className='flex flex-col items-center justify-center bg-black overflow-hidden'>
        <div className='bg-linear-to-b from-transparent via-white/90 to-transparent w-px h-48'>
        </div>
      </div>

      {/* Feature 1 */}
      <Feature
        tag= {
        <div className="relative overflow-hidden flex items-center justify-center gap-4 w-full rounded-3xl cursor-pointer mt-2">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-3xl z-0"
            style={{
              background: "linear-gradient(-45deg, #1a1a1a, #ffffff, #6b7280, #d1d5db, #1a1a1a)",
              backgroundSize: "400% 400%",
              animation: "gradient 6s ease infinite",
            }}
          />
          <div className="bg-neutral-800 rounded-3xl flex items-center justify-center gap-4 m-1 w-full relative z-10">
            <div className="text-gray-300 text-sm sm:text-xl font-gilroy-medium px-6 py-2">
              INTROSPECTIVE JOURNALING
            </div>
          </div>
        </div>}
        title={<div className="font-gilroy-bold">Introspective <span className='text-transparent bg-clip-text bg-[linear-gradient(157deg,var(--color-emerald-200),var(--color-violet-800))] pr-3'>Precision</span></div>}
        subTitle={null}
        description="Open-ended journaling prompts built from psychology, real behavior patterns, and the inner conflicts of ambitious people. Upgrade your ability to notice your own patterns, process difficult emotions, and make decisions you actually trust."
        imageUrl="/quest/quest-introspective.webp"
        testimonial={{
          text: "love that  my answers keep changing as I do. I can come back to the prompts whenever my focus shifts: career, relationships, family and they still pull out things I hadn’t fully admitted to myself.",
          author: "Indranil Maiti",
          role: "Product Developer",
          avatar: "https://picsum.photos/100/100?random=53"
        }}
      />

      {/* Feature 2 */}


      <div className='flex flex-col items-center justify-center bg-black overflow-hidden'>
        <div className='bg-linear-to-b from-transparent via-white/90 to-transparent w-px h-48'>
        </div>
      </div>


      <Feature
        tag={
          <div className="relative overflow-hidden flex items-center justify-center gap-4 w-full rounded-3xl cursor-pointer mt-2">
            <div className="absolute top-0 left-0 w-full h-full animate-gradient rounded-3xl z-0"
              style={{
                background: "linear-gradient(-45deg, #1a1a1a, #ffffff, #6b7280, #d1d5db, #1a1a1a)",
                backgroundSize: "400% 400%",
                animation: "gradient 6s ease infinite",
              }}></div>
            <div className=" bg-neutral-800 rounded-3xl flex items-center justify-center gap-4 m-1 w-full relative z-10">
              <div className="text-gray-300 text-sm sm:text-xl font-gilroy-medium px-5 py-1">PSYCHOLOGICAL FILE</div>
            </div>
          </div>
        }
          title={<div className="font-gilroy-bold"><span className='text-transparent bg-clip-text bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))]'>Psychology</span> X <span className='text-transparent bg-clip-text bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))] pr-3'>Design</span></div>}
          subTitle={null}
          description="A crafted psychological file that turns your answers, patterns, and contradictions into a clean, readable artifact you can actually use. Expand your understanding of how your mind works and how to work with it in a way that feels precise, calm, and built for people who think deeply."
          imageUrl="/quest/quest-psychology.webp"
          testimonial={{
            text: "If you’re an ambitious, self-aware person, Quest’s psychological file is one of the few tools I actually recommend. It turns your raw answers into a structured, readable document that feels like a spec sheet for your mind: something you can revisit, reflect on, and use to make better decisions instead of just collecting more ‘insights’ you forget in a week.",
            author: "Harsimran Singh",
            role: "AI Engineer",
            avatar: "https://picsum.photos/100/100?random=54"
          }}
        />

          <div className='flex flex-col items-center justify-center bg-black overflow-hidden'>
            <div className='bg-linear-to-b from-transparent via-white/90 to-transparent w-px h-48'>
            </div>
          </div>

          {/* Feature 3 */}
            <Feature
              tag={
                <div className="relative overflow-hidden flex items-center justify-center gap-4 w-full rounded-3xl cursor-pointer mt-2">
                  <div className="absolute top-0 left-0 w-full h-full animate-gradient rounded-3xl z-0"
                    style={{
                      background: "linear-gradient(-45deg, #1a1a1a, #ffffff, #6b7280, #d1d5db, #1a1a1a)",
                      backgroundSize: "400% 400%",
                      animation: "gradient 6s ease infinite",
                    }}></div>
                  <div className=" bg-neutral-800 rounded-3xl flex items-center justify-center gap-4 m-1 w-full relative z-10">
                    <div className="text-gray-300 text-sm sm:text-xl font-gilroy-medium px-5 py-1">RESOURCES</div>
                  </div>
                </div>
              }
              title={<div className="font-gilroy-bold"><span className=' pr-3'>Undeniable</span> <span className='text-transparent bg-clip-text bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))] pr-3'>Depth</span></div>}
              subTitle={null}
              description="32 Unique identity masks which tell you how you see yourself, how the world sees you and how you want to be seen. Your answers are analyzed against 600+ personality traits, 90+ belief systems, evolutionary psychology, pattern recognition and multiple perspective lenses."
              imageUrl="/quest/quest-depth.webp"
              testimonial={{
                text: "It is insane how many parameters we are working with. We have achieved very high accuracy while creating completely new systems to translate open-ended answers into deep psychological information.",
                author: "Aditya Singh",
                role: "Full Stack Developer",
                avatar: "https://picsum.photos/100/100?random=55"
              }}
            />
        </div>

        {/* <Testimonials title="More Feedback From People Like You" data={testimonials2} light={true} /> */}
        {/* <FeaturesGrid />
        {/* <Testimonials title="More Feedback From People Like You" data={testimonials2} light={true} /> */}
        {/* <FeaturesGrid />
      <Pricing plans={pricingPlans} /> */}
        {/* <FAQ items={faqItems} /> */}
        <FaqSection />
        <Footer />

      </div>
  )
}

export default page