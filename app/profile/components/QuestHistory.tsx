'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Clock,
  AlertTriangle,
  Brain,
  User,
  Unlock,
} from 'lucide-react';
import { useAuth } from '@/app/auth/cotexts/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { clusters, Archetype, Cluster } from '../../archeotype/archeotype'
// import { PaymentService, sessionManager } from '@/services/payments';
import { googleAnalytics } from '../../../lib/services/googleAnalytics'
import QuestAssessmentDashboard from '@/app/quest/assessment-shared/components/QuestAssessmentDashboard';
import QuestPaymentDashboard from '@/app/quest/assessment-shared/components/QuestPaymentDashboard';

// Data types matching backend API
interface DashboardApiResponse {
  status: number;
  data: DashboardTest[];
}

interface DashboardTest {
  userid: string;
  testid: string;
  sessionid: string;
  testtaken: string;
  ispaymentdone: "success" | null;
  quest_pdf: string;
  quest_status: "generated" | "working";
}

interface QuestHistoryProps {
  className?: string;
}

export function QuestHistory({ className = '' }: QuestHistoryProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'home' | 'results' | 'payments'>('home');
  const [data, setData] = useState<DashboardTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [archetypeData, setArchetypeData] = useState<{ cluster: Cluster; archetype: Archetype } | null>(null);
  const [archetypeLoading, setArchetypeLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  const userId = user?.id;

  // Format date helper
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  const renderTabContent = () => {
  switch (activeTab) {
    case 'home':
      return renderHomeTab();
    default:
      return null;
  }
};

const renderHomeTab = () => {
  return (
    <>
      <section className="mb-6">
        
        <QuestAssessmentDashboard />
        <QuestPaymentDashboard />
      </section>
    </>
  );
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

  return (

    <motion.div
      initial="hidden"
      animate="visible"
      className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm overflow-hidden ${className}`}
    >
     
      <div className="bg-gradient-to-br from-cyan-600 to-blue-800 p-6 md:p-8 text-white">
        <div className="flex justify-between items-start">
          <motion.div variants={itemVariants} className="flex-1">
            <h2 className="dtext-2xl md:text-3xl font-gilroy-bold mb-2">
              Your Quest History
            </h2>
            <p className="text-sm md:text-base font-gilroy-medium text-white/80;">
              A record of your completed and ongoing quests
            </p>
          </motion.div>
          
          
        </div>
      </div>
      
      
      
      <motion.div variants={itemVariants} className="px-6 md:px-8 pt-6 pb-8">
        {renderHomeTab()}  
      </motion.div>
    
    </motion.div>
  );
}

export default QuestHistory;