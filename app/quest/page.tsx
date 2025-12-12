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
    <div>
      <Navigation />
      <HeroSection />
      <Thesis />
      <Testimonials title="What our actual users said about Quest by Fraterny" data={testimonials1} />

      {/* Feature 0: The Hook */}
      <section className="bg-black text-white py-24 px-6 text-center black-bg-section">
        <div className="max-w-3xl mx-auto">
          <div className="text-gray-500 uppercase tracking-widest text-xs font-gilroy-bold mb-4">What's in it?</div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 font-gilroy-bold">Personal Growth on <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic">Ster*ids</span></h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-gilroy-medium">
            Quest curates the best ideas from the world's top thinkers in mental models, business strategy, psychology, philosophy, and productivity.
          </p>
          <p className="text-lg text-gray-500 mb-12 font-gilroy-light">
            These are the ideas that have stood the test of time and helped generations of leaders make better decisions and live better lives.
          </p>
          <div className="text-white font-bold text-xl mb-16 font-gilroy-semibold">
            QUEST brings them all together for you in one place.
          </div>
          <div className="inline-block border-b bg-neutral-800 shadow-2xl border-neutral-300 pb-2 text-gray-400 text-sm font-gilroy-medium px-4 py-2 rounded-lg">Pure signal. Zero noise.</div>
        </div>
      </section>

      {/* Feature 1 */}
      <Feature
        // tag={<div className='font-gilroy-black'></div>}
        tag=<div className="relative overflow-hidden flex items-center justify-center gap-4 w-full rounded-3xl cursor-pointer mt-2">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-3xl z-0"
            style={{
              background: "linear-gradient(-45deg, #1a1a1a, #ffffff, #6b7280, #d1d5db, #1a1a1a)",
              backgroundSize: "400% 400%",
              animation: "gradient 6s ease infinite",
            }}
          />
          <div className="bg-neutral-800 rounded-3xl flex items-center justify-center gap-4 m-1 w-full relative z-10">
            <div className="text-gray-300 text-sm font-gilroy-medium px-6 py-2">
              Mental Models
            </div>
          </div>
        </div>
        title={<div className="font-gilroy-bold">Visualized <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic pr-3'>Wisdom</span></div>}
        subTitle={null}
        description="Elite thinking frameworks for management, science, psychology, philosophy, and communication. Upgrade your ability to analyze, decide, and execute."
        imageUrl="https://picsum.photos/800/600?random=101"
        testimonial={{
          text: "I love the wide range of topics of you can find insights about. There's always something to find related to whatever my current focus topic is, personal or professional.",
          author: "Vincent W.",
          role: "Product Manager",
          avatar: "https://picsum.photos/100/100?random=53"
        }}
      />

      {/* Feature 2 */}
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
              <div className="text-gray-300 text-xl font-gilroy-medium px-5 py-1">Insights</div>
            </div>
          </div>
        }
        title={<div className="font-gilroy-bold"><span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic pr-3'>Visualized</span> X <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic pr-3'>Philosophy</span></div>}
        subTitle={null}
        description="A powerful collection of leadership and strategy insights combined with timeless maxims on living a fulfilled life. Expand your understanding of what matters in business and in life like never before."
        imageUrl="https://picsum.photos/800/600?random=102"
        testimonial={{
          text: "I wanted to review the way I make (life) decisions and found Mosaic incredibly useful for challenging my current way and come up with a new and improved way to make big and small decisions.",
          author: "Julia S.",
          role: "Head of Operations",
          avatar: "https://picsum.photos/100/100?random=54"
        }}
      />

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
              <div className="text-gray-300 text-xl font-gilroy-medium px-5 py-1">Resources</div>
            </div>
          </div>
        }
        title={<div className="font-gilroy-bold"><span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 pr-3'>Books</span> <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 pr-3'>Podcasts</span> & More</div>}
        subTitle={null}
        description="Most books, podcasts, and Youtube videos are a waste of your time. These recommendation lists include only the kind of resources you want to tell others about."
        imageUrl="https://picsum.photos/800/600?random=103"
        testimonial={{
          text: "All the books I've read and podcasts I've listened to over the past 4-5 months came from Mosaic's recommendations. The value density is ridiculous.",
          author: "Moritz P.",
          role: "Senior Strategy Manager",
          avatar: "https://picsum.photos/100/100?random=55"
        }}
      />

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