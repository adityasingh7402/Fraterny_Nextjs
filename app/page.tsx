import dynamic from 'next/dynamic';
import Navigation from './website-navigation/components/Navigation';
import HeroSection from './home/HeroSection';
import Footer from './website-navigation/components/Footer';
import {AboutQuest} from '../app/home/Aboutquest'
import VillaTestimonials from './home/Villatestimonials';
import TransformationJourney from './home/TransformationJourney';
import { QuestJourney } from './home/QuestJourney';
import HomeBlogSection from './home/HomeBlogSection';

// Lazy load below-the-fold sections for better performance
const NavalQuoteSection = dynamic(() => import('./home/NavalQuoteSection'), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const VillaLabSection = dynamic(() => import('./home/VillaLabSection'), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const OurValuesSection = dynamic(() => import('./home/OurValuesSection'), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

const HowItWorksSection = dynamic(() => import('./home/HowItWorksSection'), {
  loading: () => <div className="min-h-screen" />,
  ssr: true
});

export default function Home() {
  return (
    <div className="h-full w-full bg-white overflow-y-hidden">
      {/* Fixed: Removed duplicate Navigation */}
      <Navigation />
      <HeroSection />
      <NavalQuoteSection />
      <TransformationJourney />
      <VillaLabSection />
      <OurValuesSection />
      <VillaTestimonials />
      <AboutQuest />
      <QuestJourney />
      <HomeBlogSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}


