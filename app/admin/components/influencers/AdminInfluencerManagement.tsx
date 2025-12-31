'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Users, TrendingUp, DollarSign, Activity, MousePointer, Eye, Trash2, AlertTriangle, ChevronLeft, ChevronRight, Plus, Globe, Check, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AddInfluencerPopup from './components/AddInfluencerPopup';
import ViewInfluencerPopup from './components/ViewInfluencerPopup';

interface InfluencerData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profile_image?: string | null;
  bio?: string | null;
  social_links?: any | null;
  affiliate_code: string;
  status: 'active' | 'inactive' | 'suspended';
  commission_rate: number;
  total_clicks: number;
  total_signups: number;
  total_questionnaires: number;
  total_purchases: number;
  total_commission_earned: number;
  total_earnings: number;
  remaining_balance: number;
  total_paid: number;
  payment_info?: any | null;
  created_at: string;
  updated_at: string;
  last_activity_at?: string | null;
}

interface InfluencerStats {
  totalInfluencers: number;
  activeInfluencers: number;
  totalRevenue: number;
  totalCommissions: number;
  totalClicks: number;
  totalSignups: number;
  totalQuestionnaires: number;
  totalPurchases: number;
  averageConversionRate: number;
}

export default function AdminInfluencerManagement() {
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState<InfluencerData[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(83.50); // Fallback rate
  const [stats, setStats] = useState<InfluencerStats>({
    totalInfluencers: 0,
    activeInfluencers: 0,
    totalRevenue: 0,
    totalCommissions: 0,
    totalClicks: 0,
    totalSignups: 0,
    totalQuestionnaires: 0,
    totalPurchases: 0,
    averageConversionRate: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'' | 'active' | 'inactive' | 'suspended'>('');
  const [minEarnings, setMinEarnings] = useState('');
  const [maxEarnings, setMaxEarnings] = useState('');

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerData | null>(null);
  const [deleting, setDeleting] = useState(false);

  // New state for applications
  const [activeTab, setActiveTab] = useState<'influencers' | 'requests'>('influencers');
  const [applications, setApplications] = useState<any[]>([]);
  const [applicationToConvert, setApplicationToConvert] = useState<any>(null);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showDeleteAppPopup, setShowDeleteAppPopup] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const handleAcceptApplication = (app: any) => {
    setApplicationToConvert({
      name: `${app.first_name} ${app.last_name}`,
      email: app.email,
      phone: app.contact,
      bio: app.description,
      social_links: app.social_links,
      id: app.id
    });
    setShowAddPopup(true);
  };

  const handleRejectClick = (app: any) => {
    setSelectedApplication(app);
    setShowRejectPopup(true);
  };

  const confirmRejectApplication = async () => {
    if (!selectedApplication) return;
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('partner_applications')
        .update({ status: 'rejected' })
        .eq('id', selectedApplication.id);

      if (error) throw error;
      toast.success("Application rejected");
      setShowRejectPopup(false);
      setSelectedApplication(null);
      fetchApplications();
    } catch (err: any) {
      toast.error("Failed to reject application");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteAppClick = (app: any) => {
    setSelectedApplication(app);
    setShowDeleteAppPopup(true);
  };

  const confirmDeleteApplication = async () => {
    if (!selectedApplication) return;
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('partner_applications')
        .delete()
        .eq('id', selectedApplication.id);

      if (error) throw error;
      toast.success("Application deleted");
      setShowDeleteAppPopup(false);
      setSelectedApplication(null);
      fetchApplications();
    } catch (err: any) {
      toast.error("Failed to delete application");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('/api/commission?operation=exchange-rate');
      const result = await response.json();
      if (result.success && result.data) {
        setExchangeRate(result.data.rate);
      }
    } catch (err: any) {
      console.error('Error fetching exchange rate:', err);
      // Fallback rate is already set in state
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/influencers/stats');
      const result = await response.json();
      if (result.success && result.data) {
        setStats(result.data);
      }
    } catch (err: any) {
      console.error('Error fetching stats:', err);
    }
  };

  const getProfileImageUrl = (storagePath: string | null): string | null => {
    if (!storagePath) return null;
    if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) return storagePath;
    if (storagePath.startsWith('data:')) return storagePath;
    const { data } = supabase.storage.from('website-images').getPublicUrl(storagePath);
    return data?.publicUrl || null;
  };

  const fetchInfluencers = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      });

      if (searchTerm) params.append('searchTerm', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      if (minEarnings) params.append('minEarnings', minEarnings);
      if (maxEarnings) params.append('maxEarnings', maxEarnings);

      const response = await fetch(`/api/admin/influencers?${params}`);
      const result = await response.json();

      if (result.success && result.data) {
        setInfluencers(result.data.influencers);
        setPagination(result.data.pagination);
      } else {
        setError(result.error || 'Failed to load influencers');
        setInfluencers([]);
        setPagination(null);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setInfluencers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchInfluencers();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setMinEarnings('');
    setMaxEarnings('');
    setCurrentPage(1);
    setError(null);
    setTimeout(() => fetchInfluencers(), 0);
  };

  const handleDelete = async () => {
    if (!selectedInfluencer) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/influencers/${selectedInfluencer.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.success) {
        toast.success('Influencer deleted successfully');
        setShowDeletePopup(false);
        setSelectedInfluencer(null);
        fetchInfluencers();
        fetchStats();
      } else {
        toast.error(result.error || 'Failed to delete influencer');
      }
    } catch (error: any) {
      toast.error('Failed to delete influencer');
      setError(error.message || 'Failed to delete influencer');
    } finally {
      setDeleting(false);
    }
  };

  const formatCurrency = (amountInUSD: number | undefined) => {
    const usd = amountInUSD || 0;
    const inr = usd * exchangeRate;
    return `₹${inr.toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    fetchStats();
    fetchInfluencers();
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      fetchInfluencers();
    }
  }, [currentPage]);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Influencer Management</h1>
        <div className="flex gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'influencers' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              onClick={() => setActiveTab('influencers')}
            >
              Influencers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'requests' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              onClick={() => setActiveTab('requests')}
            >
              Requests
              {applications.filter(a => a.status === 'pending').length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {applications.filter(a => a.status === 'pending').length}
                </span>
              )}
            </button>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              setApplicationToConvert(null);
              setShowAddPopup(true);
            }}
          >
            <Plus className="h-5 w-5" />
            Add Influencer
          </button>
        </div>
      </div>

      {activeTab === 'requests' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Partner Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase">Applicant</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase">Social Links</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase">Details</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No pending applications found
                    </td>
                  </tr>
                ) : (
                  applications.map((app: any) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{app.first_name} {app.last_name}</p>
                          <p className="text-sm text-gray-500">{app.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">{app.contact || '-'}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {app.social_links && app.social_links.map((link: string, i: number) => (
                            <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              <Globe className="w-4 h-4" />
                            </a>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-600 line-clamp-2" title={app.description}>{app.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-500">{new Date(app.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {app.status === 'pending' && (
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => handleAcceptApplication(app)}
                              className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm font-medium"
                              title="Accept"
                            >
                              <Check className="h-4 w-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleRejectClick(app)}
                              className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                              Reject
                            </button>
                          </div>
                        )}
                        {app.status !== 'pending' && (
                          <button
                            onClick={() => handleDeleteAppClick(app)}
                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (<>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-base font-medium">Total Influencers</p>
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-gray-900 text-4xl font-bold">
              {stats.totalInfluencers.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-base font-medium">Active</p>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-gray-900 text-4xl font-bold">
              {stats.activeInfluencers.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-base font-medium">Total Revenue</p>
              <DollarSign className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-gray-900 text-4xl font-bold">
              {formatCurrency(stats.totalRevenue)}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-base font-medium">Commissions Paid</p>
              <TrendingUp className="h-6 w-6 text-orange-500" />
            </div>
            <p className="text-gray-900 text-4xl font-bold">
              {formatCurrency(stats.totalCommissions)}
            </p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <p className="text-gray-600 text-sm font-medium">Total Questionnaires</p>
            <p className="text-gray-900 text-2xl font-bold">{stats.totalQuestionnaires.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <p className="text-gray-600 text-sm font-medium">Total Signups</p>
            <p className="text-gray-900 text-2xl font-bold">{stats.totalSignups.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <p className="text-gray-600 text-sm font-medium">Total Purchases</p>
            <p className="text-gray-900 text-2xl font-bold">{stats.totalPurchases.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white">
            <p className="text-gray-600 text-sm font-medium">Avg Conversion Rate</p>
            <p className="text-gray-900 text-2xl font-bold">{(stats.averageConversionRate || 0).toFixed(2)}%</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Influencers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end mb-6">
            <label className="flex flex-col">
              <p className="text-sm font-medium text-gray-700 pb-2">Search</p>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, code..."
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </label>

            <label className="flex flex-col">
              <p className="text-sm font-medium text-gray-700 pb-2">Status</p>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </label>

            <label className="flex flex-col">
              <p className="text-sm font-medium text-gray-700 pb-2">Min Earnings</p>
              <input
                type="number"
                value={minEarnings}
                onChange={(e) => setMinEarnings(e.target.value)}
                placeholder="Min amount..."
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </label>

            <label className="flex flex-col">
              <p className="text-sm font-medium text-gray-700 pb-2">Max Earnings</p>
              <input
                type="number"
                value={maxEarnings}
                onChange={(e) => setMaxEarnings(e.target.value)}
                placeholder="Max amount..."
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </label>

            <div className="flex gap-2">
              <Button onClick={applyFilters} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
              <Button variant="outline" onClick={resetFilters} disabled={loading}>
                Reset
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-red-800 font-semibold mb-2">Error:</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Data Table */}
          <div className="overflow-x-auto" data-lenis-prevent>
            <table className="w-full text-left">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Influencer</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Affiliate Code</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Commission %</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Earnings</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Questionnaires/Signups/Paid</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  Array.from({ length: pageSize }).map((_, index) => (
                    <tr key={`loading-${index}`} className="animate-pulse">
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                      <td className="py-4 px-4 text-right"><div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div></td>
                    </tr>
                  ))
                ) : influencers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 text-sm">
                      No influencers found
                    </td>
                  </tr>
                ) : (
                  influencers.map((influencer) => (
                    <tr key={influencer.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 shrink-0">
                            {influencer.profile_image ? (
                              <img
                                src={getProfileImageUrl(influencer.profile_image) || ''}
                                alt={influencer.name}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold absolute top-0 left-0 ${influencer.profile_image ? 'hidden' : ''}`}
                            >
                              {influencer.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{influencer.name}</p>
                            <p className="text-gray-500">{influencer.email || 'N/A'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-sm font-mono text-gray-900">{influencer.affiliate_code}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-gray-900">{influencer.commission_rate}%</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(influencer.status)}`}>
                          {influencer.status}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(influencer.total_commission_earned)}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{influencer.total_questionnaires} / {influencer.total_signups} / {influencer.total_purchases}</span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedInfluencer(influencer);
                              setShowViewPopup(true);
                            }}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedInfluencer(influencer);
                              setShowDeletePopup(true);
                            }}
                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 0 && (
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm text-gray-600">
                Showing {((pagination.currentPage - 1) * pageSize) + 1} to {Math.min(pagination.currentPage * pageSize, pagination.totalRecords)} of {pagination.totalRecords} influencers
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center rounded-lg h-9 w-9 border border-gray-300 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: Math.min(pagination.totalPages, 5) }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium ${currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="flex items-center justify-center rounded-lg h-9 w-9 border border-gray-300 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </>)}

      {/* Add Influencer Popup */}
      <AddInfluencerPopup
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        initialData={applicationToConvert}
        onSuccess={async () => {
          setShowAddPopup(false);
          fetchInfluencers();
          fetchStats();
          if (applicationToConvert && applicationToConvert.id) {
            try {
              const { error } = await supabase
                .from('partner_applications')
                .update({ status: 'approved' })
                .eq('id', applicationToConvert.id);

              if (error) throw error;
              toast.success("Application marked as approved");
              fetchApplications();
            } catch (err) {
              console.error("Error updating application status:", err);
              toast.error("Influencer added but failed to update application status");
            }
          }
        }}
      />

      {/* View Influencer Popup */}
      {
        selectedInfluencer && (
          <ViewInfluencerPopup
            isOpen={showViewPopup}
            influencer={selectedInfluencer}
            onClose={() => {
              setShowViewPopup(false);
              setSelectedInfluencer(null);
            }}
            onUpdate={() => {
              fetchInfluencers();
              fetchStats();
            }}
          />
        )
      }

      {/* Delete Confirmation */}
      {
        showDeletePopup && selectedInfluencer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete Influencer</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete {selectedInfluencer.name}? This action cannot be undone and will remove all associated records.
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeletePopup(false);
                    setSelectedInfluencer(null);
                  }}
                  disabled={deleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        )
      }

      {/* Reject Application Popup */}
      {
        showRejectPopup && selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Reject Application</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to reject the application from {selectedApplication.first_name} {selectedApplication.last_name}?
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRejectPopup(false);
                    setSelectedApplication(null);
                  }}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmRejectApplication}
                  disabled={isProcessing}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isProcessing ? 'Rejecting...' : 'Reject'}
                </Button>
              </div>
            </div>
          </div>
        )
      }

      {/* Delete Application Popup */}
      {
        showDeleteAppPopup && selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete Application</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete the application from {selectedApplication.first_name} {selectedApplication.last_name}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteAppPopup(false);
                    setSelectedApplication(null);
                  }}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDeleteApplication}
                  disabled={isProcessing}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isProcessing ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
