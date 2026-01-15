'use client'

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Filter,
  MoreVertical,
  Home,
  FileText,
  CreditCard,
  Calendar,
  BarChart3,
  Brain,
  Briefcase,
  Lock,
  Download,
  Clock,
  Eye,
  User,
  MessageCircle,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/app/auth/cotexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import { googleAnalytics } from '@/lib/services/googleAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Cluster, clusters, Archetype } from '@/app/archeotype/archeotype';

// Import payment functions from quest reflection
import { fetchDynamicPricing, startPaymentStatusPolling } from '@/app/quest/reflection/[userId]/[sessionId]/[testId]/utils/paymentHelpers';
import type { PaymentGateway } from '@/app/quest/reflection/[userId]/[sessionId]/[testId]/utils/types';


// Design tokens for UpsellSheet
const tokens = {
  textDark: "#0A0A0A",
  textLight: "#FFFFFF",
  muted: "#6B7280",
  border: "#E6EAF2",
  accent: "#0C45F0",
  accent2: "#41D9FF",
  accent3: "#48B9D8",
  soft: "#F7F9FC",
};

// Utility function to format time
const formatTime = (s: number): string => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const r = (s % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
};

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

interface QuestAssessmentDashboardProps {
  className?: string;
  hideHeader?: boolean;
  hideArchetype?: boolean;
}


// Assessment types with their corresponding icons and colors
const getAssessmentType = (index: number) => {
  const types = [
    {
      name: "Personality Assessment",
      icon: FileText,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      name: "Cognitive Ability Test",
      icon: FileText,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      name: "Emotional Intelligence Quiz",
      icon: FileText,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      name: "Career Aptitude Test",
      icon: FileText,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    }
  ];

  return types[index % types.length];
};

const QuestAssessmentDashboard: React.FC<QuestAssessmentDashboardProps> = ({ className = '', hideHeader = false, hideArchetype = false }) => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);
  const [navigationLoading, setNavigationLoading] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<DashboardTest | null>(null);
  const [paymentModalLoading, setPaymentModalLoading] = useState(false);
  const [pricing, setPricing] = useState({
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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState<DashboardTest | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [assessmentForHelp, setAssessmentForHelp] = useState<DashboardTest | null>(null);
  const stopPollingRef = React.useRef<(() => void) | null>(null);
  const router = useRouter();
  const userId = user?.id;
  const [archetypeData, setArchetypeData] = useState<{ cluster: Cluster; archetype: Archetype } | null>(null);
  const [archetypeLoading, setArchetypeLoading] = useState(false);

  // Format date helper function
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  // Format date as assessment name
  const formatAssessmentName = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (err) {
      return 'Assessment';
    }
  };

  // Helper function to refresh dashboard data
  const fetchUpdatedAssessmentData = async (): Promise<DashboardTest[] | null> => {
    console.log('Refreshing assessment data for user:', userId);

    if (!user?.id) return null;

    try {
      const response = await axios.get<DashboardApiResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userdashboard/${userId}`
      );
      const assessmentData = response.data.data || [];
      console.log('Refreshed assessment data:', assessmentData);
      // Sort assessments in descending order by date (latest first)
      const sortedData = assessmentData.sort((a: DashboardTest, b: DashboardTest) => {
        const dateA = new Date(a.testtaken).getTime();
        const dateB = new Date(b.testtaken).getTime();
        return dateB - dateA; // Descending order (latest first)
      });

      return sortedData;
    } catch (error) {
      console.error('Failed to refresh assessment data:', error);
      return null;
    }
  };

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!userId) {
          setError('User not authenticated');
          return;
        }

        console.log('Fetching assessment data from API for user:', userId);
        const response = await axios.get<DashboardApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userdashboard/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Assessment data response:', response.data);
        if (response.data.status === 200) {
          const assessmentData = response.data.data || [];
          // Sort assessments in descending order by date (latest first)
          const sortedData = assessmentData.sort((a: DashboardTest, b: DashboardTest) => {
            const dateA = new Date(a.testtaken).getTime();
            const dateB = new Date(b.testtaken).getTime();
            return dateB - dateA; // Descending order (latest first)
          });
          setData(sortedData);
        } else {
          setError('There is an error in fetching your data. Please visit us again in sometime.');
        }
      } catch (err: any) {
        console.error('Assessment data fetch error:', err);

        if (err.code === 'ECONNABORTED') {
          setError('Request timeout - please try again');
        } else if (err.response?.status === 404) {
          setError('No assessment data found');
        } else if (err.response?.status === 401) {
          setError('Unauthorized - please log in again');
        } else {
          setError('Failed to load assessment data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentData();
  }, [userId]);

  // Load dynamic pricing from payment gateway
  useEffect(() => {
    const loadPricing = async () => {
      try {
        console.log('💰 Loading dynamic pricing for both gateways...');
        const dynamicPricing = await fetchDynamicPricing();
        setPricing(dynamicPricing);
        console.log('✅ Dynamic pricing loaded:', dynamicPricing);
      } catch (error) {
        console.error('❌ Failed to load pricing:', error);
        setPricing(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadPricing();
  }, []);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (stopPollingRef.current) {
        stopPollingRef.current();
      }
    };
  }, []);

  // Fetch archetype data based on latest assessment
  useEffect(() => {
    const fetchArchetypeData = async () => {
      if (data.length === 0) {
        setArchetypeLoading(false);
        return;
      }

      const latestAssessment = data[0]; // Latest assessment (already sorted)

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

  // Handle menu actions
  const handleView = (testData: DashboardTest) => {
    setOpenMenuId(null);
    router.push(`/quest/reflection/${testData.userid}/${testData.sessionid}/${testData.testid}`);
  };

  const handleFeedback = (testData: DashboardTest) => {
    setOpenMenuId(null);
    router.push(`/quest/reflection/${testData.userid}/${testData.sessionid}/${testData.testid}`);
  };

  const handleHelp = (testData: DashboardTest) => {
    setOpenMenuId(null);
    setAssessmentForHelp(testData);
    setHelpModalOpen(true);
  };

  const handleDelete = (testData: DashboardTest) => {
    // Close menu immediately
    setOpenMenuId(null);
    // Add small delay to prevent overlay conflicts
    setTimeout(() => {
      setAssessmentToDelete(testData);
      setDeleteConfirmOpen(true);
    }, 100);
  };

  const handleConfirmDelete = async () => {
    if (!assessmentToDelete || !user?.id) return;

    setDeleteLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete/assessment`,
        {
          userId: assessmentToDelete.userid,
          testId: assessmentToDelete.testid
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 200 || response.status === 200) {
        // Remove the deleted assessment from the local state
        setData(prevData => prevData.filter(item => item.testid !== assessmentToDelete.testid));
        toast.success('Quest deleted successfully!');
      } else {
        throw new Error('Delete failed');
      }
    } catch (error: any) {
      console.error('Delete assessment error:', error);
      let errorMessage = 'Failed to delete your quest. Please try again.';
      if (error.response?.status === 404) {
        errorMessage = 'Assessment not found.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Unauthorized. Please log in again.';
      }
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
      setDeleteConfirmOpen(false);
      setAssessmentToDelete(null);
    }
  };

  const handleAssessmentClick = (testData: DashboardTest) => {
    router.push(`/quest/reflection/${testData.userid}/${testData.sessionid}/${testData.testid}`);
  };

  // Handle payment and PDF actions
  const handlePaidReport = async (testData: DashboardTest) => {
    // If payment is done and PDF is ready, download directly
    if (testData.ispaymentdone === "success" && testData.quest_status === "generated") {
      try {
        const link = document.createElement('a');
        link.href = testData.quest_pdf;
        link.download = `Quest-Report-${formatDate(testData.testtaken)}.pdf`;
        link.target = '_blank';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success('Downloading your Psyche File!');
      } catch (error) {
        console.error('PDF download error:', error);
        window.open(testData.quest_pdf, '_blank');
        toast.success('Opening your Psyche File!');
      }
      return;
    }

    // If payment is done but PDF still generating, show appropriate message
    if (testData.ispaymentdone === "success" && testData.quest_status === "working") {
      toast.info('Your Psyche File is still being crafted. Kindly check in 5 minutes.');
      return;
    }

    // If payment not done, open the modal instead of direct payment
    if (testData.ispaymentdone !== "success") {
      setSelectedAssessment(testData);
      setUpsellOpen(true);
      return;
    }

    toast.error('Unable to process request. Please try again.');
  };

  // Handle payment from modal with dual gateway support
  const handleModalPayment = async (selectedGateway: PaymentGateway): Promise<void> => {
    if (!selectedAssessment || !user) return;

    setPaymentModalLoading(true);
    try {
      console.log(`💳 Initiating ${selectedGateway} payment from dashboard...`);

      // Check if user is authenticated
      if (!user) {
        toast.error('Please sign in to continue with payment', {
          position: "top-right"
        });
        setPaymentModalLoading(false);
        return;
      }

      // Store payment context in sessionStorage
      const { storePaymentContext } = await import('@/app/payment-gateway/shared/paymentApi');
      storePaymentContext(selectedAssessment.sessionid, selectedAssessment.testid, selectedGateway);

      // Dynamically import the correct payment service
      let paymentResult;

      if (selectedGateway === 'razorpay') {
        const { processRazorpayPayment } = await import('@/app/payment-gateway/razorpay/razorpayService');
        paymentResult = await processRazorpayPayment(selectedAssessment.sessionid, selectedAssessment.testid, user);
      } else {
        const { processPayPalPayment } = await import('@/app/payment-gateway/paypal/paypalService');
        paymentResult = await processPayPalPayment(selectedAssessment.sessionid, selectedAssessment.testid, user);
      }

      setPaymentModalLoading(false);

      // Handle payment result
      if (paymentResult.success) {
        console.log('✅ Payment successful, starting status polling...');
        setUpsellOpen(false);

        toast.success('Payment successful! Verifying...', {
          position: "top-right"
        });

        // Start polling for payment status verification
        const stopPolling = startPaymentStatusPolling(
          selectedAssessment.sessionid,
          selectedAssessment.testid,
          (status) => {
            // Status update callback
            if (status) {
              console.log('📊 Payment status update:', status);
            }
          },
          async (completedStatus) => {
            // Payment completed callback
            console.log('✅ Payment verified!', completedStatus);

            toast.success('Payment verified successfully!', {
              position: "top-right",
              duration: 5000
            });

            // Refresh assessment data to update the UI
            const updatedData = await fetchUpdatedAssessmentData();
            if (updatedData) {
              setData(updatedData);
            }
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
      setPaymentModalLoading(false);
      toast.error(error?.message || 'Payment failed. Please try again.', {
        position: "top-right"
      });
    }
  };

  // Navigation loading state
  if (navigationLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-400 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 font-gilroy-bold">Loading payment history...</p>
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full" style={{ animation: 'pulse 0.5s infinite alternate', animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full" style={{ animation: 'pulse 0.5s infinite alternate', animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full" style={{ animation: 'pulse 0.5s infinite alternate', animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Data loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-400 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 font-gilroy-bold">Loading previous results...</p>
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full" style={{ animation: 'pulse 0.5s infinite alternate', animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full" style={{ animation: 'pulse 0.5s infinite alternate', animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full" style={{ animation: 'pulse 0.5s infinite alternate', animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 font-gilroy-regular">
        <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <button onClick={() => router.push(`/quest-dashboard/${userId}`)} className="text-gray-600">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-gilroy-semibold text-gray-800">Result</h1>
            <div className="w-6"></div>
          </div>
        </header>

        <main className="p-4">
          <div className="text-center py-16">
            <div className="w-12 h-12 text-red-500 mx-auto mb-4">⚠️</div>
            <h3 className="text-lg font-gilroy-semibold text-gray-900 mb-2">Error Loading Results</h3>
            <p className="text-gray-600 font-gilroy-regular mb-4">{error}</p>
            <button
              onClick={() => router.push('/quest/quest-mode')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-gilroy-semibold"
            >
              Back to Quest
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Render Archetype Cards Section
  const renderArchetypeSection = () => {
    if (archetypeLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-gilroy-bold">Loading your insights...</p>
          </div>
        </div>
      );
    }

    if (!archetypeData) {
      return (
        <div className="bg-white rounded-xl shadow-md p-6 text-center mb-6">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-gilroy-regular mb-4">
            Complete a Quest to discover the Mask you're wearing.
          </p>
          <button
            onClick={() => router.push('/quest/begin')}
            className="px-6 py-3 bg-gradient-to-br from-cyan-600 to-blue-800 hover:from-cyan-600 hover:to-blue-800 text-white font-gilroy-bold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Quest
          </button>
        </div>
      );
    }

    const latestAssessment = data[0];

    return (
      <div className="relative mb-6">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scrollbar-hide">
          {/* Card 1: SELF */}
          <div className="flex-shrink-0 w-full snap-center h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden border border-blue-100 h-full flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
                <motion.img
                  src={archetypeData.cluster.img}
                  alt={archetypeData.cluster.name}
                  className="w-full h-full object-cover transform scale-105"
                />
                <div className="absolute top-4 right-4 z-20">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-full shadow-lg"
                  >
                    <User className="w-4 h-4 text-white" />
                    <span className="text-[11px] font-gilroy-bold text-white uppercase tracking-[0.08em] leading-none">How You See Yourself</span>
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600"></div>
              </div>

              <div className="px-6 pt-5 pb-7 relative flex-1 flex flex-col">
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2.5 mb-2 px-5 py-2.5 bg-gradient-to-br from-cyan-600 to-blue-800 text-white font-gilroy-bold text-xs rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm border border-white/20"
                  >
                    {archetypeData.cluster.name}
                  </motion.div>

                  <motion.h2
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[28px] font-gilroy-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-900 mb-4 leading-tight tracking-tight"
                  >
                    {archetypeData.archetype.name}
                  </motion.h2>
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 font-gilroy-regular text-base leading-[1.7] tracking-wide"
                >
                  {archetypeData.archetype.contexts.self}
                </motion.div>

                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-blue-100">
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-300 to-transparent rounded-full"></div>
                  <Brain className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 h-[2px] bg-gradient-to-l from-blue-300 to-transparent rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 2: WORLD */}
          {/* <div className="flex-shrink-0 w-full snap-center h-[600px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden border border-purple-100 relative h-full flex flex-col"
          >
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
              <img 
                src={archetypeData.cluster.img} 
                alt={archetypeData.cluster.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-[#003366] to-[#004A7F] text-white px-5 py-2.5 font-gilroy-regular text-xs rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm border border-white/20">
                  {archetypeData.cluster.name}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-600"></div>
            </div>
            
            <div className="px-6 pt-5 pb-7 relative flex-1 flex flex-col">
              <div className="relative z-30">
                <div className="inline-flex items-center gap-2.5 mb-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[11px] font-gilroy-bold text-white uppercase tracking-[0.08em] leading-none">How World Sees You</span>
                </div>
                
                <h2 className="text-[28px] font-gilroy-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-purple-900 mb-4 leading-tight tracking-tight">
                  {archetypeData.archetype.name}
                </h2>
              </div>
              
              <div className="text-gray-600 font-gilroy-regular text-base leading-[1.7] tracking-wide flex-1" style={{ filter: latestAssessment?.ispaymentdone === 'success' ? 'none' : 'blur(8px)' }}>
                {archetypeData.archetype.contexts.world}
              </div>
              
              {latestAssessment?.ispaymentdone === 'success' ? (
                <div className="mt-4 pt-4 border-t border-purple-100">
                  <button
                    onClick={() => handlePaidReport(latestAssessment)}
                    disabled={latestAssessment?.quest_status === 'working'}
                    className={`w-full px-6 py-3 bg-gradient-to-r ${
                      latestAssessment?.quest_status === 'generated' 
                        ? 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                        : 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                    } text-white text-base font-gilroy-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    {latestAssessment?.quest_status === 'generated' ? (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download PDF Report</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-5 h-5" />
                        <span>PDF Processing...</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="absolute inset-x-0 bottom-0 top-32 flex items-center justify-center bg-white/5 backdrop-blur-[2px]">
                  <button
                    onClick={() => {
                      setSelectedAssessment(latestAssessment);
                      setUpsellOpen(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-br from-cyan-600 to-blue-800 hover:from-cyan-600 hover:to-blue-800 text-white text-base font-gilroy-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Get Complete Analysis</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div> */}

          {/* Card 3: ASPIRE */}
          {/* <div className="flex-shrink-0 w-full snap-center h-[600px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-green-50 rounded-3xl overflow-hidden border border-green-100 relative h-full flex flex-col"
          >
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
              <img 
                src={archetypeData.cluster.img} 
                alt={archetypeData.cluster.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-[#003366] to-[#004A7F] text-white px-5 py-2.5 font-gilroy-bold text-xs rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm border border-white/20">
                  {archetypeData.cluster.name}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600"></div>
            </div>
            
            <div className="px-6 pt-5 pb-7 relative flex-1 flex flex-col">
              <div className="relative z-30">
                <div className="inline-flex items-center gap-2.5 mb-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-[11px] font-gilroy-bold text-white uppercase tracking-[0.08em] leading-none">What You Aspire To Be</span>
                </div>
                
                <h2 className="text-[28px] font-gilroy-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-green-900 mb-4 leading-tight tracking-tight">
                  {archetypeData.archetype.name}
                </h2>
              </div>
              
              <div className="text-gray-600 font-gilroy-regular text-base leading-[1.7] tracking-wide flex-1" style={{ filter: latestAssessment?.ispaymentdone === 'success' ? 'none' : 'blur(8px)' }}>
                {archetypeData.archetype.contexts.aspire}
              </div>
              
              {latestAssessment?.ispaymentdone === 'success' ? (
                <div className="mt-4 pt-4 border-t border-green-100">
                  <button
                    onClick={() => handlePaidReport(latestAssessment)}
                    disabled={latestAssessment?.quest_status === 'working'}
                    className={`w-full px-6 py-3 bg-gradient-to-r ${
                      latestAssessment?.quest_status === 'generated' 
                        ? 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                        : 'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                    } text-white text-base font-gilroy-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    {latestAssessment?.quest_status === 'generated' ? (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download PDF Report</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-5 h-5" />
                        <span>PDF Processing...</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="absolute inset-x-0 bottom-0 top-32 flex items-center justify-center bg-white/5 backdrop-blur-[2px]">
                  <button
                    onClick={() => {
                      setSelectedAssessment(latestAssessment);
                      setUpsellOpen(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-base font-gilroy-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Get Complete Analysis</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className="relative font-gilroy-regular">
      <div className="relative z-10">

        {!hideArchetype && renderArchetypeSection()}

        {/* Header */}
        {!hideHeader && (
          <header className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-xl shadow-sm sticky top-0 z-10 mx-4 md:mx-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-center items-center">
                <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-gilroy-semibold text-white tracking-tighter">Result</h1>
                <div className="w-6"></div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="">

          <div className="w-full">
            {data.length === 0 ? (
              // Empty state
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-gilroy-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 font-gilroy-regular mb-6">You haven't completed any Results yet.</p>
                <button
                  onClick={() => router.push('/quest/begin')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg transition-colors font-gilroy-semibold"
                >
                  Begin Your First Quest
                </button>
              </div>
            ) : (
              // Assessment list
              <div className="space-y-4">
                {data.map((assessment, index) => {
                  const assessmentType = getAssessmentType(index);
                  const IconComponent = assessmentType.icon;

                  return (
                    <motion.div
                      key={assessment.testid}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleAssessmentClick(assessment)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`${assessmentType.bgColor} p-3 rounded-lg mr-4`}>
                            <IconComponent className={`w-6 h-6 ${assessmentType.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <h2 className="font-gilroy-semibold text-gray-800">{formatAssessmentName(assessment.testtaken)}</h2>
                            <p className="text-sm font-gilroy-regular text-gray-500">
                              Completed on {formatDate(assessment.testtaken)}
                            </p>

                            {/* Payment/PDF Status */}
                            <div className="mt-2">
                              {assessment.ispaymentdone !== "success" ? (
                                // State 1: Payment not done - show unlock button
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    googleAnalytics.trackPdfUnlockCTAFromDashboard({
                                      session_id: assessment.sessionid,
                                      test_id: assessment.testid,
                                      user_state: user?.id ? 'logged_in' : 'anonymous'
                                    });
                                    handlePaidReport(assessment);
                                  }}
                                  disabled={paymentLoading === assessment.sessionid}
                                  className="bg-gradient-to-br from-cyan-700 to-blue-900 inline-flex items-center px-3 py-1 text-xs font-gilroy-semibold rounded-full border border-gray-300 text-white bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {paymentLoading === assessment.sessionid ? (
                                    <>
                                      <div className="w-3 h-3 mr-1 animate-spin border border-gray-500 border-t-transparent rounded-full"></div>
                                      Processing...
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="w-3 h-3 mr-1" />
                                      Unlock Psyche File
                                    </>
                                  )}
                                </button>
                              ) : assessment.quest_status === "working" ? (
                                // State 2: Payment done but PDF still generating
                                <div className="inline-flex items-center px-3 py-1 text-xs font-gilroy-regular text-orange-600 bg-orange-50 rounded-full">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>Building Artifact</span>
                                </div>
                              ) : assessment.quest_status === "generated" ? (
                                // State 3: Payment done and PDF ready
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePaidReport(assessment);
                                  }}
                                  className="inline-flex items-center px-3 py-1 text-xs font-gilroy-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Get Your File
                                </button>
                              ) : (
                                // Fallback: Payment done but PDF status unknown
                                <div className="inline-flex items-center px-3 py-1 text-xs font-gilroy-regular text-orange-600 bg-orange-50 rounded-full">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>Processing</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Menu dropdown */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === assessment.testid ? null : assessment.testid);
                            }}
                            className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {openMenuId === assessment.testid && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-30 border border-gray-100">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleView(assessment);
                                }}
                                className="flex items-center w-full text-left px-4 py-2 text-sm font-gilroy-regular text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleHelp(assessment);
                                }}
                                className="flex items-center w-full text-left px-4 py-2 text-sm font-gilroy-regular text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                                Help
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(assessment);
                                }}
                                className="flex items-center w-full text-left px-4 py-2 text-sm font-gilroy-regular text-red-600 hover:bg-gray-100 transition-colors"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        {/* Bottom Navigation */}
        {/* <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-t flex justify-around py-3 border-t z-20">
          <div 
            className="text-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => navigate(`/quest-dashboard/${userId}`)}
          >
            <Home className="w-6 h-6 mx-auto" />
            <p className="text-xs font-gilroy-semibold">Home</p>
          </div>
          <div className="text-center text-blue-600">
            <FileText className="w-6 h-6 mx-auto" />
            <p className="text-xs font-gilroy-semibold">Results</p>
          </div>
          <div 
            className="text-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => {
              setNavigationLoading(true);
              setTimeout(() => {
                navigate(`/payment-history/${userId}`);
              });
            }}
          >
            <CreditCard className="w-6 h-6 mx-auto" />
            <p className="text-xs font-gilroy-semibold">Payments</p>
          </div>
        </footer> */}
      </div>

      {/* Click outside to close menu */}
      {openMenuId && !deleteConfirmOpen && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => setOpenMenuId(null)}
        />
      )}

      {/* UpsellSheet Modal */}
      <UpsellSheetComponent
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        onPayment={handleModalPayment}
        paymentLoading={paymentModalLoading}
        pricing={pricing}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <DeleteConfirmationModal
          open={deleteConfirmOpen}
          onClose={() => {
            setDeleteConfirmOpen(false);
            setAssessmentToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
          assessmentName={assessmentToDelete ? formatAssessmentName(assessmentToDelete.testtaken) : ''}
        />
      )}

      {/* Help Request Modal */}
      <HelpRequestModal
        open={helpModalOpen}
        onClose={() => {
          setHelpModalOpen(false);
          setAssessmentForHelp(null);
        }}
        assessment={assessmentForHelp}
        user={user}
        formatAssessmentName={formatAssessmentName}
      />
    </div>
  );
};

// UpsellSheet Component
interface UpsellSheetComponentProps {
  open: boolean;
  onClose: () => void;
  onPayment: (gateway: PaymentGateway) => Promise<void>;
  paymentLoading: boolean;
  pricing: any;
}

const UpsellSheetComponent: React.FC<UpsellSheetComponentProps> = ({ open, onClose, onPayment, paymentLoading, pricing }) => {
  const [trial, setTrial] = useState(true);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('razorpay');
  const [seconds, setSeconds] = useState(30 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const handlePaymentClick = async () => {
    try {
      await onPayment(selectedGateway);
    } catch (error) {
      console.error('Payment error in UpsellSheet:', error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/35" onClick={onClose} />
          <motion.div
            className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[390px] rounded-t-[28px] bg-white flex flex-col"
            style={{
              boxShadow: "0 -12px 32px rgba(0,0,0,0.15)",
              border: `1px solid ${tokens.border}`,
              maxHeight: 'calc(100vh - 2rem)',
              minHeight: '60vh'
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Fixed Header with Close Button */}
            <div className="flex-shrink-0 relative px-4 pt-4 pb-2">
              <button
                aria-label="Close"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <X className="h-5 w-5" color={tokens.textDark} />
              </button>
              <div className="pt-6 text-[26px] font-gilroy-regular leading-8" style={{ color: tokens.textDark }}>
                Download your 35+ page <span className="font-gilroy-black">Personalised PDF Report</span>
              </div>
              <div className="mb-3 text-[14px] font-gilroy-regular" style={{ color: tokens.muted }}> Powered by Fraterny's advanced AI model </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4" style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}>
              <ul className="grid gap-2 pb-4">
                {["A Deep-Dive Mindset Analysis", "Detailed Mental Blueprint", "Personalized Content Operating System ", "You VS Future You", "Curated Action & Growth Plan"].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-[14px] font-gilroy-semibold">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: i === 0 ? "#FF3B6B" : tokens.accent }} />
                    <span className={i === 0 ? "font-[700]" : ""} style={{ color: tokens.textDark }}>
                      {i === 0 ? <span style={{ color: "#FF3B6B" }}>A Deep-Dive Mindset Analysis</span> : t}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.div
                className="relative rounded-2xl p-4 text-white mb-4"
                style={{ background: "linear-gradient(135deg, rgba(12,69,240,1) 0%, rgba(65,217,255,1) 45%, rgba(72,185,216,1) 100%)" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-[12px] opacity-95"><span>Ends in {formatTime(seconds)}</span></div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[24px] font-gilroy-regular font-[400] text-white">
                    {pricing.isLoading ? '...' : (selectedGateway === 'razorpay' ? pricing.razorpay.main : pricing.paypal.main)}
                  </span>
                  <span className="text-[18px] font-gilroy-regular line-through text-gray-800">
                    {pricing.isLoading ? '...' : (selectedGateway === 'razorpay' ? pricing.razorpay.original : pricing.paypal.original)}
                  </span>
                </div>
              </motion.div>

              <div className="mb-4 flex items-center justify-between rounded-xl bg-[#F2F5FA] px-3 py-3 font-gilroy-bold" style={{ border: `1px solid ${tokens.border}` }}>
                <div className="text-[16px] font-gilroy-semibold" style={{ color: tokens.textDark }}>Incorporate My Feedback</div>
                <button aria-label="toggle trial" onClick={() => setTrial((t) => !t)} className="relative h-6 w-11 rounded-full" style={{ background: trial ? tokens.accent : "#D1D5DB", boxShadow: "0 10px 30px rgba(12,69,240,0.06)" }}>
                  <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: `translateX(${trial ? 20 : 0}px)` }} />
                </button>
              </div>

              {/* Payment Gateway Selection */}
              <div className="pb-4">
                <div className="text-[14px] font-gilroy-semibold mb-3" style={{ color: tokens.textDark }}>
                  Choose Payment Method
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* Razorpay Option */}
                  <button
                    onClick={() => setSelectedGateway('razorpay')}
                    className={`p-3 rounded-xl border-2 transition-all ${selectedGateway === 'razorpay'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">💳</span>
                      <span className="font-gilroy-bold text-[14px]" style={{ color: tokens.textDark }}>
                        Razorpay
                      </span>
                    </div>
                    <div className="text-[12px] text-gray-600 text-left font-gilroy-black">
                      Cards, UPI, Net Banking
                    </div>
                  </button>

                  {/* PayPal Option */}
                  <button
                    onClick={() => setSelectedGateway('paypal')}
                    className={`p-3 rounded-xl border-2 transition-all ${selectedGateway === 'paypal'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌐</span>
                        <span className="font-gilroy-bold text-[14px]" style={{ color: tokens.textDark }}>
                          PayPal
                        </span>
                      </div>
                      <span className="text-[12px] text-gray-500 font-gilroy-regular">(USD)</span>
                    </div>
                    <div className="text-[12px] text-gray-600 text-left font-gilroy-black">
                      PayPal Balance, Cards
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 border-t bg-white" style={{ borderColor: tokens.border }}>
              <div className="px-4 py-3">
                <button
                  onClick={handlePaymentClick}
                  disabled={paymentLoading}
                  className="w-full rounded-xl px-4 py-3 text-[16px] font-[600] font-gilroy-bold tracking-tight text-white disabled:opacity-50"
                  style={{ background: tokens.textDark }}
                >
                  {paymentLoading ? 'Processing...' : 'Continue'}
                </button>
                <div className="pt-2 text-center text-[12px]" style={{ color: tokens.muted }}>
                  Fully Refundable. T&C apply.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Delete Confirmation Modal Component



interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  assessmentName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading,
  assessmentName
}) => {
  // Create a portal-like effect by rendering at the very top level
  if (!open) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4"
      style={{
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        width: '100vw',
        height: '100vh'
      }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto relative"
        style={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          zIndex: 999999
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-gilroy-bold text-gray-900 text-center mb-2">
          Delete Quest?
        </h3>

        {/* Description */}
        <p className="text-sm font-gilroy-regular text-gray-600 text-center mb-6">
          Are you sure you want to delete your quest from <span className="font-gilroy-semibold text-gray-800">{assessmentName}</span>? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-gilroy-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-gilroy-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Help Request Modal Component
interface HelpRequestModalProps {
  open: boolean;
  onClose: () => void;
  assessment: DashboardTest | null;
  user: any;
  formatAssessmentName: (date: string) => string;
}

const HelpRequestModal: React.FC<HelpRequestModalProps> = ({
  open,
  onClose,
  assessment,
  user,
  formatAssessmentName
}) => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Extract display name from user metadata
  const userMetadata = user?.user_metadata || {};
  const displayName = userMetadata.full_name ||
    (userMetadata.first_name ? `${userMetadata.first_name} ${userMetadata.last_name || ''}` : '') ||
    user?.email?.split('@')[0] || 'User';

  if (!open) return null;

  const handleSubmit = async () => {
    if (!problem.trim()) {
      toast.error('Please describe your problem or enquiry');
      return;
    }

    setLoading(true);
    try {
      // Using new dedicated help request endpoint via relative path
      await axios.post('/api/help/submit', {
        user_id: user?.id,
        user_name: displayName,
        test_id: assessment?.testid,
        user_query: problem
      });

      setSubmitted(true);
      toast.success('Your message has been sent!');
    } catch (error) {
      console.error('Help submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setProblem('');
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4"
      style={{
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        width: '100vw',
        height: '100vh'
      }}
      onClick={handleClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto relative"
        style={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          zIndex: 999999
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            {/* Header Icon */}
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-gilroy-bold text-gray-900 text-center mb-2">
              Need Help?
            </h3>

            <p className="text-sm font-gilroy-regular text-gray-500 text-center mb-6 px-2">
              Please share your concern. We'll get back to you as soon as possible.
            </p>

            {/* Context Info */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                <p className="text-[10px] text-blue-600 font-gilroy-bold uppercase tracking-wider mb-1">User Name</p>
                <p className="text-xs font-gilroy-semibold text-gray-800 truncate">{displayName}</p>
              </div>

              <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                <p className="text-[10px] text-blue-600 font-gilroy-bold uppercase tracking-wider mb-1">Assessment</p>
                <p className="text-xs font-gilroy-semibold text-gray-800 truncate">
                  {assessment ? formatAssessmentName(assessment.testtaken) : 'Loading...'}
                </p>
              </div>
            </div>

            {/* Textarea */}
            <div className="mb-8">
              <label className="block text-[10px] text-gray-400 font-gilroy-bold uppercase tracking-widest mb-2 px-1">
                Description
              </label>
              <textarea
                autoFocus
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Can you please explain what happened? We are here to help you."
                className="w-full h-36 p-4 text-sm font-gilroy-medium bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none shadow-inner"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 py-3 text-sm font-gilroy-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !problem.trim()}
                className="flex-[1.5] px-4 py-3 text-sm font-gilroy-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/10 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <MessageCircle className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100"
            >
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-gilroy-bold text-gray-900 mb-3">Message Sent!</h3>
            <p className="text-sm font-gilroy-medium text-gray-500 mb-10 px-4">
              Our team has received your enquiry. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="w-full px-4 py-3.5 text-sm font-gilroy-bold text-white bg-gray-900 hover:bg-black rounded-xl transition-all shadow-xl shadow-gray-200"
            >
              Back to Results
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuestAssessmentDashboard;
