'use client'


import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/auth/cotexts/AuthContext';

/**
 * Profile header component showing user info and quick stats
 * Redesigned with brand identity
 */
const ProfileHeader = () => {
  const { user } = useAuth();

  // Extract user metadata
  const userMetadata = user?.user_metadata || {};
  const firstName = userMetadata.first_name || '';
  const lastName = userMetadata.last_name || '';
  const displayName = firstName && lastName
    ? `${firstName} ${lastName}`
    : user?.email?.split('@')[0] || 'User';

  // Format join date
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'Recent member';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(255,255,255,0.3)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="relative bg-neutral-900 pt-36 pb-12 overflow-hidden border-b border-white/10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image Layer with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.3, ease: "easeOut" }}
      >
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/hero-mobile.webp"
            type="image/webp"
          />
          <img
            src="/hero-desktop.webp"
            alt="Cosmic journey background"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </picture>
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </motion.div>

      <div className="px-6 mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex-1">
            <motion.div
              variants={itemVariants}
              className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-gilroy-bold tracking-widest uppercase mb-6"
            >
              Master Voyager Profile
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-gilroy-bold mb-3 text-white tracking-tight"
              variants={itemVariants}
            >
              The Journey <span className="text-blue-400">Inward</span>
            </motion.h1>

            <motion.div
              className="text-base font-gilroy-medium flex items-center mt-1 text-neutral-300"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 border border-white/20 backdrop-blur-md">
                  <span className="text-white font-gilroy-bold text-lg">{displayName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-white font-gilroy-bold leading-none text-base">{displayName}</p>
                  <p className="text-xs mt-1 text-neutral-400">Since {joinDate}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex gap-4"
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-4 rounded-2xl">
              <p className="text-[9px] font-gilroy-bold text-neutral-400 uppercase tracking-widest mb-1">Status</p>
              <p className="text-base font-gilroy-bold text-white">Active Archetype</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;