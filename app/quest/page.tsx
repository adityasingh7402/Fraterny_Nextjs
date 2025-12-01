import React from 'react'
import HeroSection from './quest-components/HeroSection'
import Feature from './quest-components/Feature'
import { Thesis } from './quest-components/Thesis'
import { Testimonials, TestimonialData  } from './quest-components/Testimonials'
import {FeaturesGrid} from './quest-components/FeaturesGrid'
import { Pricing, PricingPlan } from './quest-components/Pricing'
import { FAQ, FAQItem } from './quest-components/FAQ'
import Navigation from '../website-navigation/components/Navigation'

const testimonials1: TestimonialData[] = [
  {
    name: "Jørn vd F.",
    role: "Head of Digital Transformation",
    avatar: "https://picsum.photos/100/100?random=50",
    stars: 5,
    text: "The mental models and different resources helped me dive deeper into a few impactful topics I definitely wouldn't have had on my radar otherwise."
  },
  {
    name: "Anthony Y.",
    role: "Entrepreneur",
    avatar: "https://picsum.photos/100/100?random=51",
    stars: 5,
    text: "It's such a simple yet powerful tool. I love how simple and deep it is at the same time. There literally nothing about it I don't like."
  },
  {
    name: "Isabel H.",
    role: "Senior Consultant, Strategy",
    avatar: "https://picsum.photos/100/100?random=52",
    stars: 5,
    text: "This has given me so much to think about and apply both in my job and everyday life. A few of the concepts have really changed how I approach problems. Pretty amazing tool actually."
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
        <Testimonials title="What Future Thought-Leaders Are Saying About Mosaic" data={testimonials1} />

        {/* Feature 0: The Hook */}
        <section className="bg-black text-white py-24 px-6 text-center">
            <div className="max-w-3xl mx-auto">
            <div className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-4">What's in it?</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">Personal Growth on <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic">Ster*ids</span></h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                As I've been scaling startups to unicorns and helped young professionals become A-players I took tens of thousands of notes.
            </p>
            <p className="text-lg text-gray-500 mb-12">
                On leadership, communication, strategy, product development, team building, negotiation, big picture thinking, deductive reasoning, equanimity & happiness, and more. Much more.
            </p>
            <div className="text-white font-bold text-xl mb-16">
                Mosaic brings you the best of those ideas to create a simple but powerful learning tool unlike anything else.
            </div>
            <div className="inline-block border-b border-gray-700 pb-2 text-gray-400 text-sm">Pure signal. Zero noise.</div>
            </div>
        </section>

        {/* Feature 1 */}
      <Feature
        tag="Mental Models"
        title="Visualized Wisdom"
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
        tag="Insights"
        title="Business x Philosophy"
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
        tag="Resources"
        title="Books, Podcasts & More"
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

      <Testimonials title="More Feedback From People Like You" data={testimonials2} light={true} />
      <FeaturesGrid />
      <Pricing plans={pricingPlans} />
      <FAQ items={faqItems} />

    </div>
  )
}

export default page