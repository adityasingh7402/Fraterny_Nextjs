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
  const [subTab, setSubTab] = useState<'assessment' | 'payment'>('assessment');
  const [data, setData] = useState<DashboardTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [archetypeData, setArchetypeData] = useState<{ cluster: Cluster; archetype: Archetype } | null>(null);
  const [archetypeLoading, setArchetypeLoading] = useState(false);

  const userId = user?.id;

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        setLoading(true);
        if (!userId) return;

        const response = await axios.get<DashboardApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userdashboard/${userId}`
        );

        if (response.data.status === 200) {
          const assessmentData = response.data.data || [];
          const sortedData = assessmentData.sort((a, b) =>
            new Date(b.testtaken).getTime() - new Date(a.testtaken).getTime()
          );
          setData(sortedData);
        }
      } catch (err) {
        console.error('Error fetching assessments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentData();
  }, [userId]);

  // Fetch archetype data based on latest assessment
  useEffect(() => {
    const fetchArchetypeData = async () => {
      if (data.length === 0) {
        setArchetypeLoading(false);
        return;
      }

      const latestAssessment = data[0];

      try {
        setArchetypeLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${latestAssessment.userid}/${latestAssessment.sessionid}/${latestAssessment.testid}`
        );

        let resultsData = response.data.results;
        if (typeof resultsData === 'string') {
          resultsData = JSON.parse(resultsData);
        }

        const archetypeName = resultsData?.['Mind Card']?.personality_type || resultsData?.['Mind Card']?.name;

        if (archetypeName) {
          for (const cluster of clusters) {
            const foundArchetype = cluster.archetypes.find(
              arch => arch.name.toLowerCase() === archetypeName.toLowerCase()
            );
            if (foundArchetype) {
              setArchetypeData({ cluster, archetype: foundArchetype });
              break;
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch archetype data:', error);
      } finally {
        setArchetypeLoading(false);
      }
    };

    if (data.length > 0) {
      fetchArchetypeData();
    }
  }, [data]);

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



  const renderArchetypeSection = () => {
    if (archetypeLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!archetypeData) {
      return (
        <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 text-center mb-8 group">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20 opacity-50" />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-gilroy-bold text-white mb-2">Unlock Your Archetype</h3>
            <p className="text-blue-100/70 font-gilroy-medium text-sm mb-6 max-w-xs mx-auto">
              You haven't discovered your psychological archetype yet. Complete your first assessment to begin.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/quest/begin')}
              className="px-8 py-3 bg-white text-slate-900 font-gilroy-black text-sm rounded-xl shadow-xl hover:shadow-white/10 transition-all"
            >
              Start Your Journey
            </motion.button>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-200"
        >
          <div className="relative h-48">
            <img
              src={archetypeData.cluster.img}
              alt={archetypeData.cluster.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-gilroy-bold uppercase tracking-wider">
                {archetypeData.cluster.name}
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-gilroy-bold text-neutral-900 mb-2">{archetypeData.archetype.name}</h3>
            <p className="text-sm text-neutral-600 font-gilroy-medium leading-relaxed">
              {archetypeData.archetype.contexts.self}
            </p>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderHomeTab = () => {
    return (
      <div className="px-4 md:px-0">
        {renderArchetypeSection()}

        {/* Sub-tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-neutral-100">
          <button
            onClick={() => setSubTab('assessment')}
            className={`pb-3 text-sm font-gilroy-bold transition-all relative ${subTab === 'assessment' ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
          >
            Assessments
            {subTab === 'assessment' && (
              <motion.div
                layoutId="activeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setSubTab('payment')}
            className={`pb-3 text-sm font-gilroy-bold transition-all relative ${subTab === 'payment' ? 'text-blue-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
          >
            Payments
            {subTab === 'payment' && (
              <motion.div
                layoutId="activeSubTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
        </div>

        <section className="mb-6">
          <AnimatePresence mode="wait">
            {subTab === 'assessment' ? (
              <motion.div
                key="assessment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <QuestAssessmentDashboard hideHeader={true} hideArchetype={true} />
              </motion.div>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <QuestPaymentDashboard hideHeader={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
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
      className={`mx-auto max-w-7xl px-6 py-8 ${className}`}
    >
      <div className="bg-white border border-neutral-200 p-0 md:p-6 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-neutral-100 p-4">
          <motion.div variants={itemVariants} className="flex-1">
            <h2 className="text-xl md:text-2xl font-gilroy-bold text-neutral-900 mb-1">
              The Archive
            </h2>
            <p className="text-xs font-gilroy-medium text-neutral-500">
              A historical record of your inward journeys and transformations.
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="p-4 md:p-0">
          {renderHomeTab()}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default QuestHistory;