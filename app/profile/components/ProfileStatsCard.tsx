'use client'

import React from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, Calendar, Shield, CheckCircle, Clock,
  XCircle, MapPin, Briefcase, Building, Bell, Edit, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../../app/auth/cotexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProfileStatsCardProps {
  variant?: 'compact' | 'detailed';
  className?: string;
  onEditClick?: () => void;
}

export default function ProfileStatsCard({
  variant = 'detailed',
  className = '',
  onEditClick
}: ProfileStatsCardProps) {

  const { user, isLoading } = useAuth();
  const router = useRouter();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 🟡 Step 1: Loading Skeleton (keep as is)
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm animate-pulse"
      >
        <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-navy/10 dark:bg-navy/30"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // 🟠 Step 2: Handle no user (without blocking re-render)
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800/50"
      >
        <h3 className="font-semibold mb-2 text-lg">Loading user profile...</h3>
        <p className="text-sm">If this takes too long, try refreshing or logging in again.</p>
      </motion.div>
    );
  }

  // 🟢 Step 3: User is available, render full profile
  const userMetadata = user.user_metadata || {};

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const profileSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      items: [
        {
          id: 'name',
          label: 'Full Name',
          value: `${userMetadata.first_name || ''} ${userMetadata.last_name || ''}`.trim() || 'Not provided',
          icon: User,
          color: 'text-navy',
          bgColor: 'bg-navy/10',
        },
        {
          id: 'email',
          label: 'Email Address',
          value: user.email || 'Not provided',
          verified: userMetadata.email_verified || false,
          icon: Mail,
          color: 'text-terracotta',
          bgColor: 'bg-terracotta/10',
        },
        {
          id: 'phone',
          label: 'Phone Number',
          value: userMetadata.phone || 'Not provided',
          verified: userMetadata.phone_verified || false,
          icon: Phone,
          color: 'text-gold',
          bgColor: 'bg-gold/10',
        }
      ]
    },
    {
      id: 'professional',
      title: 'Professional Information',
      items: [
        {
          id: 'location',
          label: 'Location',
          value: userMetadata.location || 'Not provided',
          icon: MapPin,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
        },
        {
          id: 'job_title',
          label: 'Job Title',
          value: userMetadata.job_title || 'Not provided',
          icon: Briefcase,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
        },
        {
          id: 'company',
          label: 'Company',
          value: userMetadata.company || 'Not provided',
          icon: Building,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Information',
      items: [
        {
          id: 'member_since',
          label: 'Member Since',
          value: formatDate(user.created_at),
          icon: Calendar,
          color: 'text-navy',
          bgColor: 'bg-navy/10',
        },
        {
          id: 'last_sign_in',
          label: 'Last Sign In',
          value: formatDate(user.last_sign_in_at || user.created_at),
          icon: Clock,
          color: 'text-terracotta',
          bgColor: 'bg-terracotta/10',
        },
        {
          id: 'notification_preference',
          label: 'Notification Preference',
          value:
            userMetadata.notification_preference === 'all'
              ? 'All Notifications'
              : userMetadata.notification_preference === 'important'
                ? 'Important Only'
                : userMetadata.notification_preference === 'none'
                  ? 'No Notifications'
                  : 'All Notifications',
          icon: Bell,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
        }
      ]
    }
  ];

  const userBio = userMetadata.bio || '';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: Personal Context */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-neutral-200 p-5 md:p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-gilroy-bold text-neutral-900">Personal</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-blue-600 hover:text-blue-700 font-gilroy-bold text-xs"
                onClick={() => router.push('/profile?tab=security')}
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Shield className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-[10px] font-gilroy-bold text-neutral-400 uppercase tracking-widest">Verification Status</p>
                  <p className="text-sm font-gilroy-bold text-neutral-900">
                    {userMetadata.email_verified ? 'Identity Verified' : 'Pending Verification'}
                  </p>
                </div>
              </div>

              {userBio && (
                <div>
                  <p className="text-[10px] font-gilroy-bold text-neutral-400 uppercase tracking-widest mb-2">Short Bio</p>
                  <p className="text-sm text-neutral-600 font-gilroy-medium italic leading-relaxed">"{userBio}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white border border-neutral-200 p-5 md:p-6 rounded-2xl shadow-sm h-full">
            <h2 className="text-xl font-gilroy-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-3">Master Records</h2>

            <div className="space-y-6 md:space-y-8">
              {profileSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xs font-gilroy-bold text-neutral-400 uppercase tracking-widest mb-6 px-1">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-start group">
                        <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-105 duration-300 ${item.bgColor}`}>
                          <item.icon className={`h-4.5 w-4.5 ${item.color}`} />
                        </div>
                        <div className="ml-3.5">
                          <p className="text-[10px] font-gilroy-medium text-neutral-400 mb-0.5">{item.label}</p>
                          <p className="font-gilroy-bold text-neutral-900 text-sm">{item.value}</p>
                          {'verified' in item && (
                            <div className="mt-1">
                              {item.verified ? (
                                <span className="flex items-center text-[10px] font-gilroy-bold text-green-600">
                                  <CheckCircle className="w-3 h-3 mr-1" /> SECURE
                                </span>
                              ) : (
                                <span className="flex items-center text-[10px] font-gilroy-bold text-amber-600">
                                  <XCircle className="w-3 h-3 mr-1" /> UNVERIFIED
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Missing Info Prompt */}
      {(!userMetadata.first_name || !userMetadata.phone || !userMetadata.location || !userMetadata.job_title || !userMetadata.company) && (
        <motion.div
          variants={itemVariants}
          className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-2xl">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-gilroy-bold text-amber-900">
                  Profile Incomplete
                </h3>
                <p className="text-sm font-gilroy-medium text-amber-700">
                  Complete your profile to unlock full Master Voyager features.
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push('/profile?tab=security')}
              className="w-full md:w-auto font-gilroy-bold bg-amber-600 hover:bg-amber-700 text-white rounded-2xl px-8 h-12"
            >
              Finish Profile
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
