// QuestResultClient.tsx
'use client';

import React, { useState, useRef, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Quote, Film as FilmIcon, BookOpen, Share2, Send, ThumbsUp,
  ThumbsDown,
  ChevronsUp,
  BookmarkPlus,
  Star,
  ScrollText,
  ChevronUp,
  LockIcon,
  Download,
  Pointer,
  LogOut
} from 'lucide-react';
import Image from 'next/image';
import { ResultData, Film, Book, DualGatewayPricingData } from '../utils/types';
// import { tokens, CTA_HEIGHT } from '../utils/constants';
import { sectionIds } from '../utils/sectionHelpers';
import { ProgressRail } from './ProgressRail';
import { StickyCTA } from './StickyCTA';
import { PaymentSuccessMessage } from './PaymentSuccessMessage';
import { UpsellSheet } from './UpsellSheet';
import { InsightModal } from './InsightModal';
import { FilmModal } from './FilmModal';
import { BookModal } from './BookModal';
import { FeedbackPopup } from './FeedbackPopUp';
// import { PDFImageViewer } from './PDFImageViewer';
import { AstrologyModal } from './AstrologyModal';
import { FindingModal } from './FindingModal';
import { PaymentSuccessPopup } from './PaymentSuccessPopup';
import { SectionFrame } from './SectionFrame';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/app/auth/cotexts/AuthContext';
import { googleAnalytics } from '@/lib/services/googleAnalytics';
import { fetchDynamicPricing, checkExistingPaymentStatus, startPaymentStatusPolling } from '../utils/paymentHelpers';
// import Testimonials from '@/app/quest/quest-mode/sections/Testimonials';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Testimonials from '@/app/quest/quest-mode/sections/Testimonials';
import FAQ from '@/app/quest/reflection/[userId]/[sessionId]/[testId]/components/FAQ';



import ConcertPage from "../final-design/ConcertPage";
import PrimaryPattern from '../final-design/PrimaryPattern';
import CalibrateSection from '../final-design/CalibrateSection';
import Gallery3D from "../final-design/Gallery3D";
import { CARDS_DATA, mockData } from '../final-design/ResultData'
import { useIsMobile } from '@/app/admin/hooks/use-mobile';
import { VIEWPORT_DIMENSIONS, CARD_DIMENSIONS, calculateDimensions } from '../final-design/Constants';
import { Skeleton } from "@/components/ui/skeleton"
import CardCarousel from "../final-design/CardCarousal";
import { AuthBanner } from "../final-design/AuthBanner"
import { PDFImageViewer } from "../../[testId]/components/PDFImageViewer";
import { CTA_HEIGHT } from "../../[testId]/utils/constants";
import FAQIntrospection from "../final-design/FAQIntrospection";
import Testimonial from "../final-design/Testimonial";
import QuestFooter from "../../../../../quest-mode/sections/QuestFooter";
import { CardData } from '../final-design/types'



interface QuestResultClientProps {
  initialData: ResultData | null;
  userId: string;
  sessionId: string;
  testId: string;
}

interface User {
  id: string;
  email?: string; // Make email optional to match Supabase
  name?: string;
  // Add other properties you might need
  user_metadata?: any;
  app_metadata?: any;
}


export function QuestResultClient({
  initialData,
  userId,
  sessionId,
  testId
}: QuestResultClientProps) {
  const [resultData] = useState<ResultData | null>(initialData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [findingModalOpen, setFindingModalOpen] = useState(false);
  const [selectedFindingIndex, setSelectedFindingIndex] = useState<number | null>(null);
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [feedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
  const [hasTriggeredFeedback, setHasTriggeredFeedback] = useState(false);
  const [showFeedbackStar, setShowFeedbackStar] = useState(false);
  const [hasFeedbackSubmitted, setHasFeedbackSubmitted] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<{ index: number; text: string } | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  const [selectedFinding, setSelectedFinding] = useState<string | null>(null);
  const [clickedbuttonId, setClickedButtonId] = useState<string | null>(null);
  const [likertValues, setLikertValues] = useState({ q1: 7, q2: 7, q3: 7, q4: 7 });
  const [likertSubmitting, setLikertSubmitting] = useState(false);
  const archetype: Record<string, string> = mockData.archetype;
  const router = useRouter();
  const getEffectiveUserId = () => {
    return userId;
  };
  const [assessmentPaymentStatus, setAssessmentPaymentStatus] = useState<{
    ispaymentdone: "success" | null;
    quest_pdf: string;
    quest_status: "generated" | "working" | null;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  //cast the user to User type
  const { user, signInWithGoogle } = useAuth();
  const stopPollingRef = useRef<(() => void) | null>(null);
  const hasResumedPayment = useRef<boolean>(false);
  const hasTrackedSignup = useRef<boolean>(false);

  // Dynamic pricing state
  const [pricing, setPricing] = useState<DualGatewayPricingData>({
    razorpay: {
      main: '₹299',
      original: '₹999',
      currency: 'INR',
      symbol: '₹',
      amount: 299,
      isIndia: true,
      isLoading: true
    },
    paypal: {
      main: '$5',
      original: '$15',
      currency: 'USD',
      amount: 5,
      isIndia: false
    },
    isLoading: true
  });

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  // Check for pending payment context after auth and auto-resume + redirect URL
  useEffect(() => {
    const resumePendingPayment = async () => {
      // Only run if user is authenticated
      if (!user) {
        console.log('🔴 No user yet, skipping payment resume check');
        return;
      }

      console.log(`🔄 Redirecting from anonymous to authenticated user URL ${user.id}`);

      // Redirect from anonymous URL to authenticated user URL
      if (userId === 'anonymous' && user.id) {
        console.log(`🔄 Redirecting from anonymous to authenticated user URL ${user.id}`);
        const authUserId = user.id;
        const username = user.user_metadata?.full_name || 'User';
        const email = user.email || '';
        console.log('💾 Saving session for user:', { sessionId, testId, authUserId });

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saveusingsignin`,
            { sessionId, testId, userId: authUserId, username, email }
          );
          console.log('✅ Session saved:', response.data);
          toast.success('Your results have been saved!');
        } catch (error) {
          console.error('❌ Failed to save session:', error);
          toast.error('Failed to save your results. Please try again.');
        }
        const newUrl = `/quest/reflection/${user.id}/${sessionId}/${testId}`;
        router.push(newUrl);
        return; // Exit early, will re-run after redirect
      }

      // Prevent duplicate resumes on tab focus/visibility changes
      if (hasResumedPayment.current) {
        console.log('⏭️ Payment already resumed, skipping duplicate execution');
        return;
      }

      try {
        const { getPaymentContext, clearPaymentContext } = await import('@/app/payment-gateway/shared/paymentApi');
        const paymentContext = getPaymentContext();

        if (paymentContext) {
          console.log('🔄 Found pending payment context after auth:', paymentContext);

          // Mark as resumed and clear context IMMEDIATELY to prevent refresh from re-triggering
          hasResumedPayment.current = true;
          clearPaymentContext();
          console.log('🧼 Payment context cleared from localStorage - refresh won\'t re-trigger payment');

          // Small delay to ensure UI is ready
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Resume the payment (pass flag to prevent re-storing context)
          console.log('▶️ Resuming payment with gateway:', paymentContext.gateway);
          toast.info('Resuming your payment...', {
            position: "top-right"
          });
          await handlePayment(paymentContext.gateway, true); // true = isResuming
        } else {
          console.log('✅ User authenticated, no pending payment to resume');
        }
      } catch (error) {
        console.error('❌ Error resuming pending payment:', error);
      }
    };

    resumePendingPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Fetch dynamic pricing on mount
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const dynamicPricing = await fetchDynamicPricing();
        setPricing(dynamicPricing);
      } catch (error) {
        console.error('Failed to load dynamic pricing:', error);
        // Keep fallback pricing
      }
    };

    loadPricing();
  }, []);

  // Check for existing payment status on mount
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const existingStatus = await checkExistingPaymentStatus(sessionId, testId);

        if (existingStatus?.ispaymentdone === 'success') {
          console.log('💳 Found existing payment:', existingStatus);
          setAssessmentPaymentStatus(existingStatus);
          setPaymentSuccess(true);
        }
      } catch (error) {
        console.error('Error checking existing payment:', error);
      }
    };
    checkPaymentStatus();
  }, [sessionId, testId, user?.id]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (stopPollingRef.current) {
        stopPollingRef.current();
      }
    };
  }, []);

  // Track affiliate signup for logged-in users on result page
  useEffect(() => {
    const trackAffiliateSignupIfNeeded = async () => {
      // Prevent duplicate tracking
      if (hasTrackedSignup.current) {
        console.log('⏭️ Affiliate signup already tracked in this session, skipping');
        return;
      }

      // Only track if user is logged in and there's an affiliate code
      if (!user?.id || userId === 'anonymous') return;

      const referredBy = localStorage.getItem('referred_by');
      if (!referredBy) return;

      try {
        console.log('📊 Tracking affiliate signup for logged-in user:', {
          userId: user.id,
          affiliateCode: referredBy,
          sessionId,
          testId
        });

        const response = await fetch('/api/tracking/affiliate/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user.id,
            session_id: sessionId,
            test_id: testId,
            affiliate_code: referredBy,
            ip_address: null,
            device_info: null,
            location: null,
            metadata: {
              signup_time: new Date().toISOString(),
              source: 'quest_completion_logged_in'
            }
          })
        });

        const result = await response.json();

        if (result.success) {
          console.log('✅ Affiliate signup tracked successfully');
          hasTrackedSignup.current = true; // Mark as tracked
          // Don't clear referred_by yet - only clear after purchase
        } else if (result.skipped) {
          console.log('⏭️ Signup already tracked, skipping');
          hasTrackedSignup.current = true; // Mark as tracked even if skipped
        } else {
          console.error('❌ Failed to track affiliate signup:', result.error);
        }
      } catch (error) {
        console.error('❌ Error tracking affiliate signup:', error);
      }
    };

    trackAffiliateSignupIfNeeded();
  }, [user, userId, sessionId, testId]);

  // Cleanup quest-related localStorage after successfully reaching result page
  useEffect(() => {
    const cleanupQuestData = () => {
      console.log('🧹 Cleaning up quest data after successful completion...');

      const keysToCleanup = [
        'fraterny_quest_session',
        'fraterny_quest_responses',
        'questSessionId',
        'testid',
        'fraterny_device_backup'
      ];

      // Clean up specific keys
      keysToCleanup.forEach(key => {
        const removed = localStorage.getItem(key);
        if (removed) {
          localStorage.removeItem(key);
          console.log(`🗑️ Removed: ${key}`);
        }
      });

      // Also clean up any quest_tags_* keys
      const allKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quest_tags_')) {
          allKeys.push(key);
        }
      }

      allKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`🗑️ Removed tag: ${key}`);
      });

      // Clear payment context from sessionStorage
      sessionStorage.removeItem('payment_context');
      sessionStorage.removeItem('session_data');

      console.log('✅ Quest data cleanup complete');
    };

    // Run cleanup on mount
    cleanupQuestData();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll('[id]');
      let currentIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentIndex = index;
        }
      });

      setActiveIndex(currentIndex);
      // Show feedback popup after 2 seconds when user reaches subjects section (index 3)
      if (currentIndex >= 3 && !hasTriggeredFeedback) {
        setHasTriggeredFeedback(true);
        setTimeout(() => {
          setFeedbackPopupOpen(true);
        }, 2000);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasTriggeredFeedback]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // send the userdata to the backend to associate the session
      if (user?.id) {
        const userId = user?.id
        const username = user.user_metadata.full_name;
        const email = user?.email || '';
        //console.log('User signed in:', user.user_metadata.full_name, user.email);
        console.log('Associating session with user after sign-in:', { sessionId, testId, userId, username, email });
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saveusingsignin`, {
          sessionId,
          testId,
          userId,
          username,
          email
        });
        console.log('Sign-in association response:', response);

      }
    } catch (error) {
      console.error('Sign-in error:', error);
      toast.error('Sign-in failed. Please try again.', {
        position: "top-right"
      });
    }
  };


  const handleAuthAction = () => {
    if (user) {
      router.push(`/profile?tab=history`); // or wherever your dashboard is
    } else {
      handleSignIn();
    }
  };


  const handlePayment = async (gateway: 'razorpay' | 'paypal', isResuming: boolean = false) => {
    setPaymentLoading(true);

    try {
      console.log(`💳 Initiating ${gateway} payment... (isResuming: ${isResuming})`);

      // Check if user is authenticated
      if (!user) {
        console.log('👤 User not authenticated, initiating sign-in and save flow...');

        // Store payment context BEFORE redirecting to auth
        const { storePaymentContext } = await import('@/app/payment-gateway/shared/paymentApi');
        storePaymentContext(sessionId, testId, gateway);
        console.log('💾 Stored payment context for gateway:', gateway);

        toast.info('Signing in to save your results and continue payment...', {
          position: "top-right"
        });

        // Trigger Google sign-in (redirect-based)
        await signInWithGoogle();
        await new Promise(resolve => setTimeout(resolve, 1000));

        const signedInUser = user as User | null;
        console.log('👤 User signed in:', signedInUser);
        if (signedInUser?.id) {
          const userId = signedInUser?.id;
          const username = signedInUser?.user_metadata?.first_name
            ? `${signedInUser.user_metadata.first_name} ${signedInUser.user_metadata.last_name || ''}`.trim()
            : 'User';
          const email = signedInUser?.email || '';

          console.log('💾 Saving assessment results after sign-in:', { sessionId, testId, userId, username, email });

          // Save the assessment results
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/saveusingsignin`, {
            sessionId,
            testId,
            userId,
            username,
            email
          });

          console.log('✅ Assessment saved:', response);
          toast.success('Results saved! Resuming payment...', {
            position: "top-right"
          });

          // Continue with payment flow below (don't return)
        } else {
          // Sign-in failed or cancelled
          setPaymentLoading(false);
          toast.error('Sign-in required to proceed with payment', {
            position: "top-right"
          });
          return;
        }
      }

      // Only store payment context if this is NOT a resumed payment
      // (resumed payments already cleared context to prevent re-trigger on refresh)
      if (!isResuming) {
        const { storePaymentContext } = await import('@/app/payment-gateway/shared/paymentApi');
        storePaymentContext(sessionId, testId, gateway);
        console.log('💾 Stored payment context for potential resume');
      } else {
        console.log('⏭️ Skipping context storage - this is a resumed payment');
      }

      // Dynamically import the correct payment service
      let paymentResult;

      if (gateway === 'razorpay') {
        const { processRazorpayPayment } = await import('@/app/payment-gateway/razorpay/razorpayService');
        paymentResult = await processRazorpayPayment(sessionId, testId, user);
      } else {
        const { processPayPalPayment } = await import('@/app/payment-gateway/paypal/paypalService');
        paymentResult = await processPayPalPayment(sessionId, testId, user);
      }

      setPaymentLoading(false);

      // Handle payment result
      if (paymentResult.success) {
        console.log('✅ Payment successful, starting status polling...');
        setUpsellOpen(false);

        toast.success('Payment successful! Verifying...', {
          position: "top-right"
        });

        // Start polling for payment status verification
        const stopPolling = startPaymentStatusPolling(
          sessionId,
          testId,
          (status) => {
            // Status update callback
            if (status) {
              console.log('📊 Payment status update:', status);
              setAssessmentPaymentStatus(status);
            }
          },
          (completedStatus) => {
            // Payment completed callback
            console.log('✅ Payment verified!', completedStatus);
            setPaymentSuccess(true);
            setAssessmentPaymentStatus(completedStatus);
            setShowSuccessPopup(true);

            // Clear payment context after successful payment
            const clearContext = async () => {
              const { clearPaymentContext } = await import('@/app/payment-gateway/shared/paymentApi');
              clearPaymentContext();
              console.log('🧹 Cleared payment context after successful payment');
            };
            clearContext();

            toast.success('Payment verified successfully!', {
              position: "top-right",
              duration: 5000
            });
          },
          (error) => {
            // Error callback
            console.error('❌ Payment verification failed:', error);
            toast.error('Payment verification timeout. Please refresh the page.', {
              position: "top-right",
              duration: 10000
            });
          }
        );

        // Store cleanup function
        stopPollingRef.current = stopPolling;

      } else {
        // Payment failed or cancelled
        console.log('❌ Payment failed:', paymentResult.error);
        toast.error(paymentResult.error || 'Payment failed', {
          position: "top-right"
        });
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentLoading(false);
      toast.error(error?.message || 'Payment failed. Please try again.', {
        position: "top-right"
      });
    }
  };

  const handlePDFDownload = () => {
    if (!assessmentPaymentStatus?.quest_pdf) {
      toast.error('PDF not available');
      return;
    }

    // Open PDF in new tab
    window.open(assessmentPaymentStatus.quest_pdf, '_blank');
    toast.success('Opening your PDF report!');
  };

  // const handleCardClick = (index: number) => {
  //   const insight = mindCard?.insights[index];
  //   if (insight) {
  //     setSelectedInsight({ index, text: insight });
  //   }
  // };

  const handleLikertSubmit = async () => {
    setLikertSubmitting(true);
    try {
      console.log(likertValues, testId);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/likert/`, {
        test_id: testId,
        q1: String(likertValues.q1),
        q2: String(likertValues.q2),
        q3: String(likertValues.q3),
        q4: String(likertValues.q4)
      });
      console.log(response.data);

      if (response.data.status === 200) {
        toast.success(response.data.Message || 'Successfully updated the likert', {
          position: "top-right"
        });
      } else {
        toast.error(response.data.Message || 'Failed to update', {
          position: "top-right"
        });
      }
    } catch (error: any) {
      console.error('Likert submission error:', error);
      toast.error(error?.response?.data?.Message || 'Failed to update the likert', {
        position: "top-right"
      });
    } finally {
      setLikertSubmitting(false);
    }
  };

  const [activeCardColor, setActiveCardColor] = useState<string>('#0394A3');
  const isMobile = useIsMobile();
  const [isClicked, setIsClicked] = useState<{ key: string, value: string } | null>(null)

  const SCALE = 2.8;
  // Dynamic dimensions based on window width
  const [dimensions, setDimensions] = useState({
    viewport: VIEWPORT_DIMENSIONS,
    card: CARD_DIMENSIONS
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const handleResize = () => {
      setDimensions(calculateDimensions(window.innerWidth));
    };

    // Initial calculation
    handleResize();

    // Ensure minimum 80ms loading time
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, 80 - elapsed);

    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll('[id]');
      let currentIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentIndex = index;
        }
      });

      setActiveIndex(currentIndex);
      // Show feedback popup after 2 seconds when user reaches subjects section (index 3)
      if (currentIndex >= 3 && !hasTriggeredFeedback) {
        setHasTriggeredFeedback(true);
        setTimeout(() => {
          setFeedbackPopupOpen(true);
        }, 2000);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasTriggeredFeedback]);

  if (!resultData) {
    return (
      <div className="h-screen bg-[#004A7F] flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-4xl font-gilroy-bold text-white mb-4">
            No results found
          </h2>
        </div>
      </div>
    );
  }


  // Transform resultData.archetypes into CardData format
  const transformArchetypesToCards = (): CardData[] => {
    if (!resultData?.archetypes) return CARDS_DATA;

    const { self, world, aspiration } = resultData.archetypes;
    console.log('self', self);


    return [
      {
        id: 1,
        title: self.clusterName,
        subtitle: self.subtitle,
        tag: "SELF VIEW",
        imageUrl: self.imgUrl,
        stats: [],
        bgGradient: self.bgUrl,
        icon: self.icon,
        buttonbg: self.buttonbg,
        textcolor: self.textcolor,
        bgHeading: self.bgHeading,
        bgSubheading: self.bgSubheading,
        content: self.content
      },
      {
        id: 2,
        title: world.clusterName,
        subtitle: world.subtitle,
        tag: "SOCIAL VIEW",
        imageUrl: world.imgUrl,
        stats: [],
        bgGradient: world.bgUrl,
        icon: world.icon,
        buttonbg: world.buttonbg,
        textcolor: world.textcolor,
        bgHeading: world.bgHeading,
        bgSubheading: world.bgSubheading,
        content: world.content
      },
      {
        id: 3,
        title: aspiration.clusterName,
        subtitle: aspiration.subtitle,
        tag: "ASPIRATION",
        imageUrl: aspiration.imgUrl,
        stats: [],
        bgGradient: aspiration.bgUrl,
        icon: aspiration.icon,
        buttonbg: aspiration.buttonbg,
        textcolor: aspiration.textcolor,
        bgHeading: aspiration.bgHeading,
        bgSubheading: aspiration.bgSubheading,
        content: aspiration.content
      }
    ];
  };






  return (
    <div>
      <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-white">
        <AuthBanner
          onSignIn={handleAuthAction}
          onPayment={handlePayment}
          user={user}
          paymentLoading={paymentLoading}
          activeIndex={activeIndex}
        />

        {/* Primary Pattern & Core Line Section */}
        <div id="primary-pattern" className='relative w-full mx-auto pt-20 pb-16 px-6 md:px-12 lg:px-16 bg-white'>
          <div className="max-w-7xl mx-auto">
            {/* Byline Section */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-transparent flex items-center justify-center">
                  <span className="text-white font-gilroy-bold text-xs">
                    <img src='/quillpen.png' className='' />
                  </span>
                </div>
                <div>
                  <p className="text-xs font-gilroy-semibold text-neutral-800">Published by Quest</p>
                  <p className="text-xs font-gilroy-regular text-neutral-500"> {new Date().toLocaleDateString()} • 2 min read</p>
                </div>
              </div>
              <div className="hidden md:block text-xs font-gilroy-regular text-neutral-400">
                Pattern Analysis
              </div>
            </div>

            {/* Eyebrow */}
            <div className="mb-3">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-500 font-gilroy-regular">
                Primary Pattern
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-1 text-4xl md:text-5xl lg:text-6xl font-gilroy-bold tracking-tight text-neutral-900 leading-[1.1]">
              Your <span style={{ color: activeCardColor }}>Primary</span> Pattern
            </h1>

            {/* Contributor Line */}
            <p className="text-sm font-gilroy-regular text-neutral-600 mb-10 pb-8 border-b border-neutral-200">
              Insights compiled for your personal journey
            </p>

            {/* Body Text with Drop Cap */}
            <div className="max-w-none">
              <p className="text-neutral-700 font-gilroy-regular text-base md:text-lg leading-relaxed">
                <span className="float-left text-6xl md:text-7xl font-gilroy-bold leading-none mr-2 mt-1" style={{ color: activeCardColor }}>
                  Y
                </span>
                {resultData.primary_pattern.substring(1)}
              </p>
            </div>

            {/* Pull Quote */}
            <div className="my-12 py-8 border-l-4 border-neutral-800 pl-6">
              <p className="text-xl md:text-2xl font-gilroy-light text-neutral-700 leading-relaxed">
                "{resultData.core_line}"
              </p>
            </div>

            {/* Footer Metadata */}
            <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-wrap gap-2 items-center text-xs font-gilroy-regular text-neutral-500">
              <span>Filed under:</span>
              <span className="px-3 py-1 bg-neutral-200 rounded-full text-neutral-700">Self-Discovery</span>
              <span className="px-3 py-1 bg-neutral-200 rounded-full text-neutral-700">Pattern Analysis</span>
            </div>
          </div>
        </div>

        {/* Gallery3D Section - Fixed height */}
        {!isMobile ? (
          <div id="gallery-3d" className="relative w-full h-screen overflow-hidden bg-[#4A90A4]"
            style={{ backgroundColor: activeCardColor, transition: 'background-color 0.5s ease' }}>
            <Gallery3D
              onColorChange={setActiveCardColor}
              cards={transformArchetypesToCards()}
            />
          </div>
        ) : (
          <div id="gallery-3d-mobile" className="relative overflow-hidden"
            style={{
              width: '100vw',
              height: `${dimensions.viewport.height}px`,
              marginLeft: 'calc(50% - 50vw)',
              marginRight: 'calc(50% - 50vw)'
            }}>
            {isLoading ? (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Center Card */}
                <Skeleton
                  className="absolute rounded-xl"
                  style={{
                    width: `${dimensions.card.width}px`,
                    height: `${dimensions.card.height}px`,
                  }}
                />
                {/* Left Card */}
                <Skeleton
                  className="absolute rounded-xl opacity-40"
                  style={{
                    width: `${dimensions.card.width * 0.85}px`,
                    height: `${dimensions.card.height * 0.85}px`,
                    transform: 'translateX(-120%)',
                  }}
                />
                {/* Right Card */}
                <Skeleton
                  className="absolute rounded-xl opacity-40"
                  style={{
                    width: `${dimensions.card.width * 0.85}px`,
                    height: `${dimensions.card.height * 0.85}px`,
                    transform: 'translateX(120%)',
                  }}
                />
              </div>
            ) : (
              <CardCarousel
                cards={transformArchetypesToCards()}
                cardDim={dimensions.card}
                viewportDim={dimensions.viewport}
              />
            )}
          </div>
        )}


        {/* Calibrate Section */}
        <div id="calibrate-section">
          <CalibrateSection
            depthScore={resultData?.depth_score || 0}
            questions={resultData.slider_question}
            accentColor={activeCardColor}
          />
        </div>

        {/* Behaviour Signals Section */}
        <div id="concert-page">
          <ConcertPage
            backgroundColor={activeCardColor}
            signalsData={resultData?.signals}
          />
        </div>

        <div id="pdf-report" className="relative w-full mx-auto pt-6 pb-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-7xl mx-auto px-6 sm:px-0"
          >
            <span className="block text-sm uppercase tracking-[0.3em] text-neutral-400 mb-2 font-gilroy-medium">
              Private File
            </span>
            <h1 className="text-5xl md:text-7xl font-gilroy-bold tracking-tighter text-neutral-900 leading-none">
              Your <span style={{ color: activeCardColor }}>Private</span> File
            </h1>
          </motion.div>
          <div style={{ paddingBottom: CTA_HEIGHT }} className="flex flex-col sm:flex-row justify-center items-center gap-10">
            <div className="max-w-xl px-6 sm:px-0">
              <PDFImageViewer
                paymentSuccess={paymentSuccess}
                paymentStatus={assessmentPaymentStatus}
                onPDFDownload={handlePDFDownload}
                onUnlockClick={() => {
                  if (!paymentSuccess) {
                    // googleAnalytics.trackPdfUnlockCTA({...});
                    setUpsellOpen(true);
                  }
                }}
                pricing={pricing}
              />
            </div>
            <div>
              <FAQIntrospection />
            </div>
          </div>
          <div className="mt-5">
            <Testimonial
              headerText="How people feel with Quest insights"
            />
          </div>
        </div>

        <div>
          <QuestFooter />
        </div>
      </div>

      <UpsellSheet
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        onPayment={(gateway) => handlePayment(gateway)}
        paymentLoading={paymentLoading}
        pricing={pricing}
      />

      <PaymentSuccessPopup
        open={showSuccessPopup}
        onClose={handleCloseSuccessPopup}
      />

      {!hasFeedbackSubmitted && (
        <FeedbackPopup
          open={feedbackPopupOpen}
          onClose={() => setFeedbackPopupOpen(false)}
          onDismiss={(hasInteracted) => setShowFeedbackStar(hasInteracted)}
          onFeedbackSubmit={() => {
            setHasFeedbackSubmitted(true);
            setShowFeedbackStar(false);
            setFeedbackPopupOpen(false);
          }}
          sessionId={sessionId}
          testId={testId}
          userId={userId}
        />
      )}

      {/* Sticky Feedback Star */}
      {!hasFeedbackSubmitted && (
        <AnimatePresence>
          {showFeedbackStar && (
            <motion.button
              onClick={() => {
                setShowFeedbackStar(false);
                setFeedbackPopupOpen(true);
              }}
              className="fixed right-5 bottom-20 z-[60] flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -3, 0]
              }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Give feedback"
            >
              <Star className="h-5 w-5 text-white fill-white" />
            </motion.button>
          )}
        </AnimatePresence>
      )}

    </div>
  );
}
