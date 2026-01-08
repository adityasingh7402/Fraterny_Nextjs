// src/components/profile/sections/VillaApplicationSection.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/app/auth/cotexts/AuthContext';
import VillaApplicationForm from './VillaApplicationForm'

interface VillaApplicationSectionProps {
  className?: string;
}

export function VillaApplicationSection({ className = '' }: VillaApplicationSectionProps) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [hasSubmittedApplication, setHasSubmittedApplication] = useState(false);

  // Animation variants matching QuestHistory pattern
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Get user's first name
  const getUserName = () => {
    return user?.user_metadata?.first_name || user?.user_metadata?.name || 'User';
  };

  // Handle form success
  const handleFormSuccess = () => {
    setHasSubmittedApplication(true);
    setShowForm(false);
  };

  // Handle start application
  const handleStartApplication = () => {
    setShowForm(true);
  };

  // If form is visible, render form component
  if (showForm) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        <VillaApplicationForm onSuccess={handleFormSuccess} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`mx-auto max-w-7xl px-6 py-8 ${className}`}
    >
      <div className="bg-white border border-neutral-200 p-0 md:p-6 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-neutral-100 p-4">
          <motion.div variants={itemVariants} className="flex-1">
            <h2 className="text-xl md:text-2xl font-gilroy-bold text-neutral-900 mb-1">
              Villa Application
            </h2>
            <p className="text-xs font-gilroy-medium text-neutral-500">
              Apply for an exclusive stay at the Fraterny villa.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-blue-50 p-3 rounded-2xl">
            <Home className="h-6 w-6 text-blue-600" />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="">
          {hasSubmittedApplication ? (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-gilroy-bold text-neutral-900 mb-2">
                Application Submitted
              </h3>
              <p className="text-neutral-500 font-gilroy-medium mb-6">
                Our team is reviewing your profile. Expect a response within 48 hours.
              </p>
            </div>
          ) : (
            <VillaApplicationForm />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default VillaApplicationSection;