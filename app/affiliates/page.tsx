'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import './affiliate-landing.css';

/* ============================================
   GOOGLE ICON SVG
============================================ */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="google-icon" aria-hidden="true">
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
   STAT CARD COMPONENT
============================================ */
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
  delay?: number;
}

const StatCard = ({ icon: Icon, title, value, description, delay = 0 }: StatCardProps) => (
  <div
    className="stat-card animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="stat-card-content">
      <div className="stat-icon-wrapper">
        <Icon className="stat-icon" />
      </div>
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
        <p className="stat-description">{description}</p>
      </div>
    </div>
    <div className="stat-card-border" />
  </div>
);

/* ============================================
   FEATURE CARD COMPONENT
============================================ */
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => (
  <div
    className="feature-card animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="feature-icon-wrapper">
      <Icon className="feature-icon" />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
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
      <div className="loading-container">
        <div className="loading-content">
          <Loader2 className="loading-spinner" />
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="affiliate-landing">
      <main>
        {/* ============ HERO SECTION ============ */}
        <section className="hero">
          <div className="hero-bg-decoration">
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />
          </div>

          <div className="container hero-content">
            <div className="badge animate-fade-in">
              <Star className="badge-icon" />
              <span>Join 10,000+ Affiliates</span>
            </div>

            <h1 className="hero-title animate-slide-up">
              Turn Your Influence Into
              <span className="hero-title-accent">Passive Income</span>
            </h1>

            <p className="hero-subtitle animate-slide-up" style={{ animationDelay: "100ms" }}>
              Partner with top brands, track your performance in real-time, and earn competitive commissions on every sale you generate.
            </p>

            <div className="hero-cta animate-slide-up" style={{ animationDelay: "200ms" }}>
              <button
                className="btn-google"
                onClick={handleGoogleSignIn}
                disabled={isSigningIn || checking}
              >
                <GoogleIcon />
                <span>{isSigningIn ? "Signing in..." : "Sign in with Google"}</span>
              </button>
              <a href="#features" className="link-learn-more">
                Learn more
                <ArrowRight className="link-arrow" />
              </a>
            </div>

            <div className="trust-badges animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="trust-item">
                <Shield className="trust-icon" />
                <span>Secure Payments</span>
              </div>
              <div className="trust-item">
                <span className="trust-dot" />
                <span>Real-time Tracking</span>
              </div>
              <div className="trust-item">
                <span className="trust-dot" />
                <span>Weekly Payouts</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATS SECTION ============ */}
        <section className="stats-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Your Dashboard Preview</h2>
              <p className="section-subtitle">
                Get access to powerful analytics and earn competitive commissions
              </p>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.title}
                  icon={stat.icon}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES SECTION ============ */}
        <section id="features" className="features-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Features</span>
              <h2 className="section-title">Everything You Need to Succeed</h2>
              <p className="section-subtitle">
                Powerful tools and insights to help you maximize your affiliate earnings
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 50}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className="cta-section">
          <div className="container cta-content">
            <h2 className="cta-title">Ready to Start Earning?</h2>
            <p className="cta-subtitle">
              Join thousands of successful affiliates and start monetizing your audience today.
            </p>

            <div className="cta-benefits">
              {benefits.map((benefit) => (
                <div key={benefit} className="cta-benefit-item">
                  <CheckCircle2 className="benefit-check" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <button
              className="btn-google btn-google-cta"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn || checking}
            >
              <GoogleIcon />
              <span>{isSigningIn ? "Signing in..." : "Sign in with Google"}</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
