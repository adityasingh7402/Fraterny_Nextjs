'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/auth/cotexts/AuthContext';
import { getInfluencerByEmail, updateInfluencerLocation } from '@/lib/services/influencer';
import { getUserLocation } from '@/lib/services/location';
import {
  Zap,
  ArrowRight,
  Shield,
  Star,
  MousePointerClick,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Wallet,
  Link2,
  Bell,
  Users,
  Globe,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '../website-navigation/components/Navigation'
import Footer from '../website-navigation/components/Footer'
import CustomCursor from '@/components/CustomCursor'

/* ============================================
   GOOGLE ICON SVG
============================================ */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/* ============================================
   MAIN AFFILIATE LANDING PAGE
============================================ */
export default function AffiliatesPage() {
  const { user, isLoading: authLoading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    // If user is logged in, check if they're an influencer
    if (user && user.email && !authLoading) {
      checkInfluencerAccess(user.email);
    }
  }, [user, authLoading]);

  const checkInfluencerAccess = async (email: string) => {
    setChecking(true);
    try {
      const response = await getInfluencerByEmail(email);

      if (response.success && response.data) {
        // User is an influencer
        const influencer = response.data;

        // Detect and save location if not already set
        if (influencer.is_india === null || influencer.is_india === undefined) {
          try {
            console.log('🌍 Detecting influencer location...');
            const locationData = await getUserLocation();
            console.log('🌍 Location detected:', locationData);

            // Update influencer with location
            await updateInfluencerLocation(influencer.id, locationData.isIndia);
            console.log('✅ Influencer location saved:', locationData.isIndia ? 'India' : 'International');
          } catch (error) {
            console.error('❌ Failed to detect/save location:', error);
            // Continue to dashboard even if location detection fails
          }
        }

        // Redirect to dashboard
        router.push('/affiliates/dashboard');
      } else {
        // User is not an influencer
        toast.error('Access Denied', {
          description: 'You are not registered as an influencer. Please contact the admin.',
        });
      }
    } catch (error) {
      console.error('Error checking influencer access:', error);
      toast.error('Error', {
        description: 'Failed to verify influencer status',
      });
    } finally {
      setChecking(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      // After OAuth redirect, the useEffect will check influencer status
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error('Sign In Failed', {
        description: error.message || 'Failed to sign in with Google',
      });
      setIsSigningIn(false);
    }
  };

  const stats = [
    {
      icon: MousePointerClick,
      title: "Track Clicks",
      value: "1.2M+",
      description: "Monthly clicks tracked across all affiliates",
    },
    {
      icon: ShoppingCart,
      title: "Track Sales",
      value: "$8.5M",
      description: "Total sales generated this quarter",
    },
    {
      icon: DollarSign,
      title: "Earn Money",
      value: "30%",
      description: "Average commission rate for top performers",
    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor your clicks, conversions, and earnings with our comprehensive dashboard updated in real-time.",
    },
    {
      icon: Wallet,
      title: "Commission Tracking",
      description: "Transparent commission tracking with detailed breakdowns of every sale and pending payouts.",
    },
    {
      icon: Link2,
      title: "Smart Link Management",
      description: "Create and manage your affiliate links with custom tracking parameters and short URLs.",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get notified instantly when you make a sale, hit milestones, or when new campaigns launch.",
    },
    {
      icon: Users,
      title: "Referral Program",
      description: "Earn additional income by referring other influencers to join our affiliate network.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access campaigns from brands worldwide with multi-currency support and localized tracking.",
    },
  ];

  const benefits = [
    "Free to join, no hidden fees",
    "Weekly payouts via PayPal or bank transfer",
    "Dedicated affiliate manager support",
    "Exclusive brand partnerships",
  ];

  if (authLoading || checking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
        <p className="text-xl font-gilroy-medium animate-pulse">Verifying credentials...</p>
      </div>
    );
  }

  return (
    <div className='force-scrolled-nav min-h-screen'>
      <CustomCursor />
      <Navigation />

      <div className='bg-[#f7f7f7]'>
        {/* ============ HERO SECTION ============ */}
        <section className="pt-8 pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center bg-[#f7f7f7]">
          <div className='pt-16 sm:pt-32 flex flex-col items-center justify-center'>
            {/* Logo/Badge */}
            <div className="flex flex-col items-center mb-8">
              <div className="p-3 bg-white rounded-full shadow-lg mb-6 border border-gray-100">
                <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="bg-neutral-800 text-white text-[10px] md:text-xs font-gilroy-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-8">
                Join 10,000+ Affiliates
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-8xl font-gilroy-semibold text-[#222222] tracking-tighter mb-10 leading-[0.9]">
              Turn Your Influence Into <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(157deg,var(--color-emerald-200),var(--color-violet-800))] pr-4">Passive Income</span>
            </h1>

            {/* Subhead */}
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl leading-relaxed font-gilroy-regular">
              Partner with top brands, track your performance in real-time, and earn competitive commissions on every sale you generate.
            </p>

            {/* CTA */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-20 relative">
              <Link href="/partner">
                <button className="group flex items-center justify-center gap-3 px-10 py-5 bg-neutral-900 hover:bg-black shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 text-white rounded-2xl font-gilroy-semibold tracking-tight text-xl min-w-[280px]">
                  <span>Become a Partner</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>

              <div className="relative group">
                <button
                  className="group flex items-center justify-center gap-3 px-10 py-5 bg-white border border-neutral-200 hover:bg-neutral-50 shadow-md transition-all duration-300 text-neutral-900 rounded-2xl font-gilroy-semibold tracking-tight text-xl min-w-[280px]"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn || checking}
                >
                  <div className="bg-white p-1 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm border border-neutral-100">
                    <GoogleIcon />
                  </div>
                  <span>{isSigningIn ? "Signing in..." : "Google Login"}</span>
                </button>
                <div className="absolute top-full left-0 right-0 pt-2 text-center pointer-events-none">
                  <span className="text-xs text-neutral-400 font-gilroy-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Already have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 mb-20 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/50 shadow-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/100/100?random=${i + 20}`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-orange-400">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-xs text-gray-600 font-gilroy-bold">500+ top performers onboard</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Dashboard Mockup */}
          <div className="relative w-full max-w-6xl mx-auto group">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/20 to-emerald-500/20 rounded-4xl blur-3xl group-hover:scale-105 transition-transform duration-700 opacity-50"></div>
            <div className="relative bg-white rounded-4xl p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white transition-all duration-500 group-hover:-translate-y-2">
              <div className="aspect-video w-full rounded-3xl overflow-hidden bg-neutral-50 relative">
                <img
                  src="/partnership_premium_abstract.png"
                  alt="Affiliate Dashboard Preview"
                  className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATS SECTION (DARK) ============ */}
        <section className="bg-black text-white py-32 px-6 text-center black-bg-section overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-white/20 to-transparent"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-gray-500 uppercase tracking-[0.3em] text-sm font-gilroy-bold mb-6">Performance Metrics</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-20 font-gilroy-bold tracking-tighter">
              Scale Your <span className="text-transparent bg-clip-text bg-linear-to-br from-emerald-200 to-violet-800 pr-4">Earnings</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-neutral-900 rounded-4xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-white/20 transition-all duration-500 group-hover:-translate-y-2">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl md:text-6xl font-gilroy-bold mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                  <div className="text-xl font-gilroy-semibold text-gray-200 mb-2 uppercase tracking-widest">{stat.title}</div>
                  <p className="text-gray-500 font-gilroy-regular max-w-[200px] leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-32 inline-flex items-center gap-2 border border-white/10 bg-neutral-900/50 backdrop-blur-md px-6 py-2.5 rounded-2xl text-gray-400 text-sm font-gilroy-medium shadow-2xl">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              Real-time synchronization active
            </div>
          </div>
        </section>

        {/* ============ FEATURES SECTION ============ */}
        <section id="features" className="py-32 px-4 bg-[#f7f7f7]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <div className="text-emerald-600 font-gilroy-bold uppercase tracking-widest text-sm mb-4">The Platform</div>
                <h2 className="text-4xl md:text-7xl font-gilroy-bold tracking-tighter leading-[0.95] text-neutral-900">
                  Infrastructure built for <br /> <span className="text-gray-400 italic">high-intent creators.</span>
                </h2>
              </div>
              <p className="text-gray-500 text-xl font-gilroy-regular max-w-sm leading-relaxed">
                Powerful tools and insights to help you maximize your affiliate earnings without the friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 border border-gray-100 group relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-neutral-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50"></div>

                  <div className="w-14 h-14 bg-neutral-900 rounded-2xl flex items-center justify-center mb-10 text-white shadow-xl transition-all duration-500 group-hover:rotate-15 group-hover:scale-110 relative z-10">
                    <feature.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-gilroy-bold mb-4 tracking-tight relative z-10">{feature.title}</h3>
                  <p className="text-gray-500 text-lg font-gilroy-regular leading-relaxed relative z-10">{feature.description}</p>

                  <div className="mt-8 pt-6 border-t border-gray-50 flex items-center text-sm font-gilroy-bold text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300 relative z-10">
                    Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA SECTION (DARK) ============ */}
        <section className="bg-black text-white py-40 px-6 text-center black-bg-section relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)] opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent_50%)] opacity-30"></div>

          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-6xl md:text-9xl font-bold mb-10 font-gilroy-bold tracking-tighter leading-[0.85]">
              Ready to Start <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(157deg,var(--color-emerald-200),var(--color-violet-800))] pr-6">Earning?</span>
            </h2>
            <p className="text-xl md:text-3xl text-gray-400 mb-16 font-gilroy-regular max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful affiliates and start monetizing your audience today with our premium network.
            </p>

            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-20">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-lg font-gilroy-semibold text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20 relative">
              <Link href="/partner">
                <button className="group flex items-center justify-center gap-3 px-10 py-5 bg-neutral-900 hover:bg-black shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 text-white rounded-2xl font-gilroy-semibold tracking-tight text-xl min-w-[280px]">
                  <span>Become a Partner</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>

              <div className="relative group">
                <button
                  className="group flex items-center justify-center gap-3 px-10 py-5 bg-white border border-neutral-200 hover:bg-neutral-50 shadow-md transition-all duration-300 text-neutral-900 rounded-2xl font-gilroy-semibold tracking-tight text-xl min-w-[280px]"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn || checking}
                >
                  <div className="bg-white p-1 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm border border-neutral-100">
                    <GoogleIcon />
                  </div>
                  <span>{isSigningIn ? "Signing in..." : "Google Login"}</span>
                </button>
                <div className="absolute top-full left-0 right-0 pt-2 text-center pointer-events-none">
                  <span className="text-xs text-neutral-400 font-gilroy-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Already have an account?
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-20 text-gray-600 font-gilroy-medium text-sm flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Encrypted OAuth authentication via Google
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
