'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useQuest } from '../hooks/useQuest';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '../../quest-mode/utils/use-mobile';
import Link from 'next/link';
import Image from 'next/image';
import { clearQuestTags } from '../utils/questStorage';
import { saveDevMode, generateAutoFilledResponses } from '../utils/devModeHelper';
import { useAuth } from '../../../auth/cotexts/AuthContext';


interface QuestIntroProps {
  onStart: () => void;
  className?: string;
}

/**
 * Introduction screen for the quest
 * Provides overview, instructions, and start button
 */
export function QuestIntro({
  onStart,
  className = ''
}: QuestIntroProps) {
  const router = useRouter();
  const { startQuest } = useQuest();
  const { isAdmin } = useAuth();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const isMobile = useIsMobile();
  const [hasUnfinishedQuest, setHasUnfinishedQuest] = useState(false);

  // Development mode toggles
  const [skipAgent, setSkipAgent] = useState(false);
  const [skipInput, setSkipInput] = useState(false);

  useEffect(() => {
    // Check on mount
    const savedSession = localStorage.getItem('fraterny_quest_session');
    //console.log('🔍 Checking for saved session:', savedSession);

    if (savedSession) {
      try {
        JSON.parse(savedSession); // Validate JSON
        setHasUnfinishedQuest(true);
        toast.info("You have an unfinished quest. Resume the test to finish it", {
          position: "top-right"
        });
      } catch (error) {
        localStorage.removeItem('fraterny_quest_session');
        setHasUnfinishedQuest(false);
      }
    }
  }, []);

  // Conditional button text
  const buttonText = hasUnfinishedQuest ? "Resume" : "Get Started";

  const handleStart = async () => {
    if (!isTermsAccepted) {
      toast.error("Hey, You'll have to accept the terms and conditions to start the test", {
        position: "top-right"
      });
      return;
    }

    // Handle development mode
    if (skipAgent || skipInput) {
      const mode = skipAgent ? 'skip_agent' : 'skip_input';
      saveDevMode(mode);

      if (skipInput) {
        // Generate auto-filled session
        const userId = "anonymous"; // Temporary user ID
        const autoFilledSession = generateAutoFilledResponses(userId);

        // Save to localStorage
        localStorage.setItem('fraterny_quest_session', JSON.stringify(autoFilledSession));
        console.log('✅ Skip Input mode: Auto-filled all responses');

        toast.success('🎭 Skip Input mode enabled - All questions pre-filled!', {
          position: "top-right"
        });
      } else {
        toast.success('🎭 Skip Agent mode enabled - Mock results will be shown', {
          position: "top-right"
        });
      }
    } else {
      // Normal mode - clear any existing dev mode
      saveDevMode(null);
    }

    if (!hasUnfinishedQuest && !skipInput) {
      // Only clear tags if not resuming and not in skip input mode
      clearQuestTags();
    }

    if (skipInput) {
      // Skip Input mode: session is already set, navigate directly to introspect
      localStorage.setItem('fraterny_terms_accepted', 'true');
      router.push('/quest/introspect');
    } else {
      // Normal mode: let parent handle start (which calls startQuest and navigates)
      if (onStart) onStart();
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setIsTermsAccepted(checked);
  };

  // Handle toggle changes - mutually exclusive
  const handleSkipAgentToggle = (checked: boolean) => {
    if (checked && skipInput) {
      setSkipInput(false); // Turn off Skip Input
    }
    setSkipAgent(checked);
  };

  const handleSkipInputToggle = (checked: boolean) => {
    if (checked && skipAgent) {
      setSkipAgent(false); // Turn off Skip Agent
    }
    setSkipInput(checked);
  };

  return (
    <section className='bg-sky-800 flex flex-col justify-between h-dvh overflow-hidden'>

      <div className='flex items-start pt-4 justify-center invert h-1/3'>
        <Image src='/Vector.svg' alt='Quest Logo' width={isMobile ? 120 : 200} height={isMobile ? 60 : 100} />
      </div>

      <div className=' pl-5 xs:pr-0 py-2'>
        <div className="justify-start text-white text-4xl font-normal font-gilroy-regular mb-1">Let&apos;s get you</div>
        <div className="justify-start text-white text-6xl font-bold font-gilroy-bold mb-3">Analysed.</div>
        <div className="w-full justify-start text-white text-xl font-normal font-gilroy-regular mb-3">A 15 minute guided self-reflection. The more thoughtful your responses, the deeper the insights.</div>


        {/* Development Mode Toggles - Admin Only */}
        {isAdmin && (
          <div className='mb-3 mr-2 p-3 bg-white/10 rounded-lg'>
            <div className='text-white text-sm font-gilroy-medium mb-2'>Development Mode</div>

            {/* Skip Agent Toggle */}
            <label className='flex items-center gap-3 mb-2 cursor-pointer'>
              <div className="relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  checked={skipAgent}
                  onChange={(e) => handleSkipAgentToggle(e.target.checked)}
                  className="sr-only"
                />
                <motion.div
                  animate={{
                    backgroundColor: skipAgent ? '#10b981' : '#475569'
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-11 h-6 rounded-full"
                />
                <motion.div
                  animate={{
                    x: skipAgent ? 20 : 2
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow"
                />
              </div>
              <span className='text-white text-sm font-gilroy-regular'>
                Skip Agent (Mock Results)
              </span>
            </label>

            {/* Skip Input Toggle */}
            <label className='flex items-center gap-3 cursor-pointer'>
              <div className="relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  checked={skipInput}
                  onChange={(e) => handleSkipInputToggle(e.target.checked)}
                  className="sr-only"
                />
                <motion.div
                  animate={{
                    backgroundColor: skipInput ? '#10b981' : '#475569'
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-11 h-6 rounded-full"
                />
                <motion.div
                  animate={{
                    x: skipInput ? 20 : 2
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow"
                />
              </div>
              <span className='text-white text-sm font-gilroy-regular'>
                Skip Input (Auto-fill All)
              </span>
            </label>
          </div>
        )}


        {/* Terms Checkbox */}
        <label className='flex gap-2 mb-3 cursor-pointer'>
          {/* checkbox code from above */}
          <label className="relative inline-block w-5 h-5 cursor-pointer mt-1">
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) => handleTermsChange(e.target.checked)}
              className="sr-only"
            />
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isTermsAccepted ? 'white' : 'rgb(7 89 133)', // sky-800
                scale: isTermsAccepted ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 rounded-[3px] border-[1.50px] border-white flex items-center justify-center mt-5"
            >
              {isTermsAccepted && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3 text-sky-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              )}
            </motion.div>
          </label>
          <div className='justify-start text-white text-xl font-normal font-gilroy-regular pr-1 pt-5 pb-2'>
            I agree to the <Link href="/terms-of-use" className="text-white text-xl font-normal font-gilroy-medium underline">Terms and Use</Link> and <Link href="/privacy-policy" className="text-white text-xl font-normal font-gilroy-medium underline">Privacy Policy</Link>
          </div>
        </label>

        {/* Start Button */}
        <div className='w-full pr-3 pb-5'>
          <button
            onClick={handleStart}
            className="w-full h-14 mix-blend-luminosity bg-gradient-to-br from-white/20 to-white/20 rounded-[30px] border-2 border-white flex items-center justify-center leading-[1px]">
            <div className='flex gap-2 items-center'>
              <div className="w-full text-white text-2xl font-normal font-gilroy-bold tracking-tighter">{buttonText}</div>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </button>
        </div>

      </div>

    </section>
  );
}

export default QuestIntro;
