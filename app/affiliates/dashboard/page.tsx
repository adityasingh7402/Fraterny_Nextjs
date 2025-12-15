'use client';

import './affiliate-dashboard.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth/cotexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  DollarSign,
  MousePointer,
  Copy,
  Download,
  LogOut,
  Loader2,
  Clock,
  ChevronRight,
  BarChart3,
  Menu,
  X,
  User,
  Link,
  Activity,
  CreditCard,
  Upload,
  Save,
  Edit2,
  Shield,
  UserPlus,
  ShoppingCart,
} from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';
import {
  getInfluencerByEmail,
  getDashboardStats,
  getRecentActivity,
  getConversionFunnel,
  getPerformanceData,
  generateAffiliateLink,
  updateInfluencerProfile,
  updateBankDetails,
  getExchangeRate,
  type InfluencerProfile,
  type DashboardStats,
  type RecentActivity,
  type ConversionFunnel,
  type PerformanceData,
} from '@/lib/services/influencer';
import { supabase } from '@/lib/supabase';

// ============ TYPES ============
type MenuSection = 'dashboard' | 'profile' | 'affiliate' | 'bank' | 'activity';

// ============ UTILITY FUNCTIONS ============
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// ============ MAIN COMPONENT ============
export default function AffiliateDashboard() {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true);
  const [influencer, setInfluencer] = useState<InfluencerProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [funnel, setFunnel] = useState<ConversionFunnel | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activeSection, setActiveSection] = useState<MenuSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(83.50);

  // Edit mode states
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingBank, setEditingBank] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Profile edit states
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editTwitter, setEditTwitter] = useState('');
  const [editYoutube, setEditYoutube] = useState('');
  const [editLinkedin, setEditLinkedin] = useState('');

  // Bank edit states
  const [editBankName, setEditBankName] = useState('');
  const [editAccountNumber, setEditAccountNumber] = useState('');
  const [editIfsc, setEditIfsc] = useState('');
  const [editUpi, setEditUpi] = useState('');

  const affiliateLink = influencer ? generateAffiliateLink(influencer.affiliate_code) : '';

  useEffect(() => {
    if (!authLoading) {
      if (!user || !user.email) {
        router.push('/affiliates');
      } else {
        loadDashboardData(user.email);
      }
    }
  }, [user, authLoading, router]);

  const loadDashboardData = async (email: string) => {
    setLoading(true);
    try {
      // Fetch exchange rate
      const rate = await getExchangeRate();
      setExchangeRate(rate);

      // Get influencer profile
      const influencerResponse = await getInfluencerByEmail(email);

      if (!influencerResponse.success || !influencerResponse.data) {
        toast.error('Access Denied', {
          description: 'You are not registered as an influencer.',
        });
        router.push('/affiliates');
        return;
      }

      const influencerData = influencerResponse.data;
      setInfluencer(influencerData);

      // Load all dashboard data in parallel
      const [statsResponse, activityResponse, funnelResponse, performanceResponse] = await Promise.all([
        getDashboardStats(influencerData.affiliate_code),
        getRecentActivity(influencerData.affiliate_code, 10),
        getConversionFunnel(influencerData.affiliate_code),
        getPerformanceData(influencerData.affiliate_code),
      ]);

      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }

      if (activityResponse.success && activityResponse.data) {
        setRecentActivity(activityResponse.data);
      }

      if (funnelResponse.success && funnelResponse.data) {
        setFunnel(funnelResponse.data);
      }

      if (performanceResponse.success && performanceResponse.data) {
        setPerformanceData(performanceResponse.data);
      }

      // Generate QR code
      const link = generateAffiliateLink(influencerData.affiliate_code);
      QRCode.toDataURL(link, {
        width: 256,
        margin: 2,
        color: { dark: '#1a1f2e', light: '#FFFFFF' },
      }).then(setQrCodeUrl);

    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Error', {
        description: 'Failed to load dashboard data',
      });
    } finally {
      setLoading(false);
    }
  };

  const convertUSDtoINR = (amountInUSD: number): number => {
    return amountInUSD * exchangeRate;
  };

  const formatCurrency = (amountInUSD: number) => {
    if (influencer?.is_india) {
      const amountInINR = convertUSDtoINR(amountInUSD);
      return `₹${amountInINR.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${amountInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getProfileImageUrl = (storagePath: string | null): string | null => {
    if (!storagePath) return null;
    if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) return storagePath;
    if (storagePath.startsWith('data:')) return storagePath;
    const { data } = supabase.storage.from('website-images').getPublicUrl(storagePath);
    return data?.publicUrl || null;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast.success('Link copied to clipboard!');
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.download = `affiliate-qr-${influencer?.affiliate_code}.png`;
    link.href = qrCodeUrl;
    link.click();
    toast.success('QR Code downloaded!');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/affiliates');
  };

  // Profile Editing Functions
  const startEditingProfile = () => {
    setEditName(influencer?.name || '');
    setEditBio(influencer?.bio || '');
    setProfileImagePreview(influencer?.profile_image || '');
    setProfileImageFile(null);
    setEditInstagram(influencer?.social_links?.instagram || '');
    setEditTwitter(influencer?.social_links?.twitter || '');
    setEditYoutube(influencer?.social_links?.youtube || '');
    setEditLinkedin(influencer?.social_links?.linkedin || '');
    setEditingProfile(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const saveProfileChanges = async () => {
    if (!influencer) return;
    if (!editName.trim()) {
      toast.error('Name is required');
      return;
    }

    setProfileLoading(true);
    setImageUploading(!!profileImageFile);

    try {
      const socialLinks: any = {};
      if (editInstagram.trim()) socialLinks.instagram = editInstagram.trim();
      if (editTwitter.trim()) socialLinks.twitter = editTwitter.trim();
      if (editYoutube.trim()) socialLinks.youtube = editYoutube.trim();
      if (editLinkedin.trim()) socialLinks.linkedin = editLinkedin.trim();

      const response = await updateInfluencerProfile(
        influencer.id,
        {
          name: editName.trim(),
          bio: editBio.trim(),
          profile_image: influencer.profile_image ?? undefined,
          social_links: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
        },
        profileImageFile
      );

      if (response.success && response.data) {
        setInfluencer(response.data);
        setEditingProfile(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(response.error || 'Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setProfileLoading(false);
      setImageUploading(false);
    }
  };

  // Bank details editing
  const startEditingBank = () => {
    setEditBankName(influencer?.payment_info?.bank_name || '');
    setEditAccountNumber(influencer?.payment_info?.account_number || '');
    setEditIfsc(influencer?.payment_info?.ifsc || '');
    setEditUpi(influencer?.payment_info?.upi || '');
    setEditingBank(true);
  };

  const saveBankDetails = async () => {
    if (!influencer) return;

    setBankLoading(true);

    try {
      const response = await updateBankDetails(influencer.id, {
        bank_name: editBankName.trim(),
        account_number: editAccountNumber.trim(),
        ifsc: editIfsc.trim().toUpperCase(),
        upi: editUpi.trim(),
      });

      if (response.success && response.data) {
        setInfluencer(response.data);
        setEditingBank(false);
        toast.success('Bank details updated successfully!');
      } else {
        toast.error(response.error || 'Failed to update bank details');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setBankLoading(false);
    }
  };


  if (loading || authLoading) {
    return (
      <div className="aff-loading">
        <Loader2 className="aff-loading-icon" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!influencer || !stats) {
    return (
      <div className="aff-loading">
        <p>Failed to load dashboard data. Please try refreshing.</p>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard' as MenuSection, label: 'Dashboard', icon: BarChart3 },
    { id: 'profile' as MenuSection, label: 'My Profile', icon: User },
    { id: 'affiliate' as MenuSection, label: 'Affiliate Links', icon: Link },
    { id: 'bank' as MenuSection, label: 'Bank Details', icon: CreditCard },
    { id: 'activity' as MenuSection, label: 'Activity', icon: Activity },
  ];

  return (
    <div className="aff-dashboard">
      {/* Mobile Header */}
      <header className="aff-mobile-header">
        <button onClick={() => setSidebarOpen(true)} className="aff-menu-btn">
          <Menu size={24} />
        </button>
        <h1>Affiliate Portal</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="aff-layout">
        {/* Overlay */}
        {sidebarOpen && <div className="aff-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={cn('aff-sidebar', sidebarOpen && 'aff-sidebar-open')}>
          <div className="aff-sidebar-header">
            <div>
              <h2>Affiliate Portal</h2>
              <p>Welcome, {influencer.name}</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="aff-close-btn">
              <X size={20} />
            </button>
          </div>

          <nav className="aff-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn('aff-nav-item', isActive && 'aff-nav-item-active')}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="aff-sidebar-footer">
            <button onClick={handleSignOut} className="aff-nav-item">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="aff-main">
          <div className="aff-container">
            {/* ========== DASHBOARD SECTION ========== */}
            {activeSection === 'dashboard' && stats && (
              <>
                <div className="aff-page-header">
                  <h1>Dashboard</h1>
                  <p>Overview of your affiliate performance</p>
                </div>

                {/* Stats Grid */}
                <div className="aff-stats-grid">
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="aff-stat-card">
                    <div className="aff-stat-header">
                      <span>Total Clicks</span>
                      <div className="aff-stat-icon aff-stat-icon-info"><MousePointer size={20} /></div>
                    </div>
                    <p className="aff-stat-value">{stats.totalClicks.toLocaleString()}</p>
                    <span className="aff-stat-subtitle aff-text-info">All-time clicks</span>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aff-stat-card">
                    <div className="aff-stat-header">
                      <span>Total Signups</span>
                      <div className="aff-stat-icon aff-stat-icon-success"><Users size={20} /></div>
                    </div>
                    <p className="aff-stat-value">{stats.totalSignups.toLocaleString()}</p>
                    <span className="aff-stat-subtitle aff-text-success">{stats.clickToSignup}% conversion</span>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="aff-stat-card">
                    <div className="aff-stat-header">
                      <span>PDF Sales</span>
                      <div className="aff-stat-icon aff-stat-icon-warning"><TrendingUp size={20} /></div>
                    </div>
                    <p className="aff-stat-value">{stats.totalPurchases.toLocaleString()}</p>
                    <span className="aff-stat-subtitle aff-text-warning">{stats.conversionRate}% overall</span>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="aff-stat-card aff-stat-card-primary">
                    <div className="aff-stat-header">
                      <span>Total Earnings</span>
                      <div className="aff-stat-icon aff-stat-icon-primary"><DollarSign size={20} /></div>
                    </div>
                    <p className="aff-stat-value">{formatCurrency(stats.totalEarnings)}</p>
                    <span className="aff-stat-subtitle">Commission: {influencer.commission_rate}%</span>
                  </motion.div>
                </div>

                {/* Charts Grid */}
                <div className="aff-charts-grid">
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="aff-card">
                    <div className="aff-card-header">
                      <h2>Performance Over Time</h2>
                      <div className="aff-stat-icon"><BarChart3 size={20} /></div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="signupsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="clicks" stroke="#3b82f6" fill="url(#clicksGrad)" strokeWidth={2} />
                        <Area type="monotone" dataKey="signups" stroke="#10b981" fill="url(#signupsGrad)" strokeWidth={2} />
                        <Line type="monotone" dataKey="purchases" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="aff-chart-legend">
                      <div><span className="aff-legend-dot aff-bg-info" /> Clicks</div>
                      <div><span className="aff-legend-dot aff-bg-success" /> Signups</div>
                      <div><span className="aff-legend-dot aff-bg-warning" /> Purchases</div>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="aff-card">
                    <h2 className="aff-card-title">Conversion Funnel</h2>
                    {funnel && (
                      <div className="aff-funnel">
                        <FunnelStep label="Clicks" value={funnel.clicks} pct={100} color="aff-bg-info" />
                        <FunnelArrow rate={funnel.clickToSignupRate} />
                        <FunnelStep label="Signups" value={funnel.signups} pct={funnel.clicks > 0 ? (funnel.signups / funnel.clicks) * 100 : 0} color="aff-bg-success" />
                        <FunnelArrow rate={funnel.signupToQuestionnaireRate} />
                        <FunnelStep label="Questionnaires" value={funnel.questionnairesCompleted} pct={funnel.clicks > 0 ? (funnel.questionnairesCompleted / funnel.clicks) * 100 : 0} color="aff-bg-warning" />
                        <FunnelArrow rate={funnel.questionnaireToPurchaseRate} />
                        <FunnelStep label="Purchases" value={funnel.purchases} pct={funnel.clicks > 0 ? (funnel.purchases / funnel.clicks) * 100 : 0} color="aff-bg-primary" />
                        <div className="aff-funnel-summary">
                          <span>Overall Conversion Rate</span>
                          <strong>{funnel.overallConversionRate}%</strong>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </>
            )}

            {/* ========== PROFILE SECTION ========== */}
            {activeSection === 'profile' && (
              <>
                <div className="aff-page-header aff-page-header-flex">
                  <div>
                    <h1>My Profile</h1>
                    <p>Manage your account information</p>
                  </div>
                  {!editingProfile && (
                    <button onClick={startEditingProfile} className="aff-btn aff-btn-primary">
                      <Edit2 size={16} /> Edit Profile
                    </button>
                  )}
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="aff-card">
                  <div className="aff-profile-header">
                    <div className="aff-avatar">
                      {editingProfile && profileImagePreview ? (
                        <img
                          src={getProfileImageUrl(profileImagePreview) || ''}
                          alt="Profile"
                        />
                      ) : (
                        influencer.profile_image ? (
                          <img src={getProfileImageUrl(influencer.profile_image) || ''} alt="Profile" />
                        ) : (
                          <span>{influencer.name.charAt(0)}</span>
                        )
                      )}

                      {editingProfile && (
                        <label className="aff-avatar-upload">
                          <Upload size={12} />
                          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        </label>
                      )}
                    </div>
                    <div className="aff-profile-info">
                      {editingProfile ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="aff-input"
                          placeholder="Your name"
                        />
                      ) : (
                        <>
                          <h3>{influencer.name}</h3>
                          <p>{influencer.email}</p>
                          <span>Commission Rate: {influencer.commission_rate}%</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="aff-form-grid">
                    <div className="aff-field">
                      <label>Email</label>
                      <div className="aff-field-value">{influencer.email}</div>
                    </div>
                    <div className="aff-field">
                      <label>Phone</label>
                      <div className="aff-field-value">{influencer.phone || 'Not provided'}</div>
                    </div>
                  </div>

                  <div className="aff-field">
                    <label>Bio</label>
                    {editingProfile ? (
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="aff-textarea"
                        rows={3}
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <div className="aff-field-value">{influencer.bio || 'No bio provided'}</div>
                    )}
                  </div>

                  <div className="aff-section-title">Social Media Links</div>
                  <div className="aff-form-grid">
                    {['Instagram', 'Twitter', 'YouTube', 'LinkedIn'].map((platform) => {
                      const key = platform.toLowerCase();
                      const value = editingProfile
                        ? (key === 'instagram' ? editInstagram : key === 'twitter' ? editTwitter : key === 'youtube' ? editYoutube : editLinkedin)
                        : influencer.social_links?.[key as keyof typeof influencer.social_links];

                      return (
                        <div key={platform} className="aff-field">
                          <label>{platform}</label>
                          {editingProfile ? (
                            <input
                              type="url"
                              value={value as string || ''}
                              onChange={(e) => {
                                if (key === 'instagram') setEditInstagram(e.target.value);
                                else if (key === 'twitter') setEditTwitter(e.target.value);
                                else if (key === 'youtube') setEditYoutube(e.target.value);
                                else if (key === 'linkedin') setEditLinkedin(e.target.value);
                              }}
                              className="aff-input"
                              placeholder={`https://${key}.com/username`}
                            />
                          ) : (
                            <div className="aff-field-value">
                              {value ? (
                                <a href={value as string} target="_blank" rel="noopener noreferrer">
                                  {value as string}
                                </a>
                              ) : (
                                'Not provided'
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {editingProfile && (
                    <div className="aff-btn-group">
                      <button onClick={saveProfileChanges} disabled={profileLoading} className="aff-btn aff-btn-primary">
                        {profileLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        Save Changes
                      </button>
                      <button onClick={() => setEditingProfile(false)} disabled={profileLoading} className="aff-btn aff-btn-outline">
                        Cancel
                      </button>
                    </div>
                  )}

                  <div className="aff-section-title">Earnings Summary</div>
                  <div className="aff-earnings-grid">
                    <div className="aff-earnings-card aff-earnings-success">
                      <span>Total Earnings</span>
                      <strong>{formatCurrency(influencer.total_earnings)}</strong>
                    </div>
                    <div className="aff-earnings-card aff-earnings-warning">
                      <span>Remaining Balance</span>
                      <strong>{formatCurrency(influencer.remaining_balance)}</strong>
                    </div>
                    <div className="aff-earnings-card aff-earnings-info">
                      <span>Total Paid</span>
                      <strong>{formatCurrency(influencer.total_paid)}</strong>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* ========== AFFILIATE LINKS SECTION ========== */}
            {activeSection === 'affiliate' && (
              <>
                <div className="aff-page-header">
                  <h1>Affiliate Links</h1>
                  <p>Share your unique affiliate link to earn commissions</p>
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="aff-card">
                  <h2 className="aff-card-title">Your Affiliate Link</h2>
                  <div className="aff-link-section">
                    <div className="aff-link-content">
                      <div className="aff-link-input-group">
                        <input type="text" value={affiliateLink} readOnly className="aff-input aff-input-mono" />
                        <button onClick={copyLink} className="aff-btn aff-btn-primary">
                          <Copy size={16} /> Copy
                        </button>
                      </div>
                      <p className="aff-help-text">Share this link to track referrals and earn commissions.</p>
                    </div>
                    {qrCodeUrl && (
                      <div className="aff-qr-section">
                        <div className="aff-qr-code">
                          <img src={qrCodeUrl} alt="QR Code" />
                        </div>
                        <button onClick={downloadQR} className="aff-btn-link">
                          <Download size={16} /> Download QR
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>

                {stats && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aff-card">
                    <h2 className="aff-card-title">Quick Stats</h2>
                    <div className="aff-quick-stats">
                      <div className="aff-quick-stat">
                        <div className="aff-quick-stat-header">
                          <span>Total Clicks</span>
                          <MousePointer size={16} className="aff-text-info" />
                        </div>
                        <strong>{stats.totalClicks.toLocaleString()}</strong>
                      </div>
                      <div className="aff-quick-stat">
                        <div className="aff-quick-stat-header">
                          <span>Total Signups</span>
                          <Users size={16} className="aff-text-success" />
                        </div>
                        <strong>{stats.totalSignups.toLocaleString()}</strong>
                      </div>
                      <div className="aff-quick-stat">
                        <div className="aff-quick-stat-header">
                          <span>Purchases</span>
                          <TrendingUp size={16} className="aff-text-warning" />
                        </div>
                        <strong>{stats.totalPurchases.toLocaleString()}</strong>
                      </div>
                      <div className="aff-quick-stat">
                        <div className="aff-quick-stat-header">
                          <span>Earnings</span>
                          <DollarSign size={16} className="aff-text-primary" />
                        </div>
                        <strong>{formatCurrency(stats.totalEarnings)}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* ========== BANK DETAILS SECTION ========== */}
            {activeSection === 'bank' && (
              <>
                <div className="aff-page-header aff-page-header-flex">
                  <div>
                    <h1>Bank Details</h1>
                    <p>Manage your payment information</p>
                  </div>
                  {!editingBank && (
                    <button onClick={startEditingBank} className="aff-btn aff-btn-primary">
                      <Edit2 size={16} /> Edit Details
                    </button>
                  )}
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="aff-card">
                  <div className="aff-form-grid">
                    <div className="aff-field">
                      <label>Bank Name</label>
                      {editingBank ? (
                        <input
                          type="text"
                          value={editBankName}
                          onChange={(e) => setEditBankName(e.target.value)}
                          className="aff-input"
                          placeholder="Enter bank name"
                        />
                      ) : (
                        <div className="aff-field-value">{influencer.payment_info?.bank_name || 'Not provided'}</div>
                      )}
                    </div>
                    <div className="aff-field">
                      <label>Account Number</label>
                      {editingBank ? (
                        <input
                          type="text"
                          value={editAccountNumber}
                          onChange={(e) => setEditAccountNumber(e.target.value)}
                          className="aff-input"
                          placeholder="Enter account number"
                        />
                      ) : (
                        <div className="aff-field-value">{influencer.payment_info?.account_number || 'Not provided'}</div>
                      )}
                    </div>
                    <div className="aff-field">
                      <label>IFSC Code</label>
                      {editingBank ? (
                        <input
                          type="text"
                          value={editIfsc}
                          onChange={(e) => setEditIfsc(e.target.value.toUpperCase())}
                          className="aff-input"
                          placeholder="Enter IFSC code"
                        />
                      ) : (
                        <div className="aff-field-value aff-mono">{influencer.payment_info?.ifsc || 'Not provided'}</div>
                      )}
                    </div>
                    <div className="aff-field">
                      <label>UPI ID</label>
                      {editingBank ? (
                        <input
                          type="text"
                          value={editUpi}
                          onChange={(e) => setEditUpi(e.target.value)}
                          className="aff-input"
                          placeholder="yourname@upi"
                        />
                      ) : (
                        <div className="aff-field-value">{influencer.payment_info?.upi || 'Not provided'}</div>
                      )}
                    </div>
                  </div>

                  {editingBank && (
                    <div className="aff-btn-group">
                      <button onClick={saveBankDetails} disabled={bankLoading} className="aff-btn aff-btn-primary">
                        {bankLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        Save Changes
                      </button>
                      <button onClick={() => setEditingBank(false)} disabled={bankLoading} className="aff-btn aff-btn-outline">
                        Cancel
                      </button>
                    </div>
                  )}

                  <div className="aff-info-box">
                    <Shield size={20} />
                    <div>
                      <strong>Secure Payment Information</strong>
                      <p>Your bank details are encrypted and securely stored. They will only be used for commission payouts.</p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* ========== ACTIVITY SECTION ========== */}
            {activeSection === 'activity' && (
              <>
                <div className="aff-page-header">
                  <h1>Recent Activity</h1>
                  <p>Track your referral activities in real-time</p>
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="aff-card aff-card-no-padding">
                  {recentActivity.length > 0 ? (
                    <div className="aff-activity-list">
                      {recentActivity.map((activity, index) => {
                        const icons: Record<string, any> = { click: MousePointer, signup: UserPlus, purchase: ShoppingCart };
                        const colors: Record<string, string> = { click: 'info', signup: 'success', purchase: 'primary' };
                        const Icon = icons[activity.type] || Activity;
                        const color = colors[activity.type] || 'info';

                        return (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="aff-activity-item"
                          >
                            <div className={`aff-activity-icon aff-activity-icon-${color}`}>
                              <Icon size={18} />
                            </div>
                            <div className="aff-activity-content">
                              <div className="aff-activity-header">
                                <span className={`aff-activity-badge aff-activity-badge-${color}`}>
                                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                </span>
                                {activity.earnings && <strong>{formatCurrency(activity.earnings)}</strong>}
                              </div>
                              {activity.description && <p>{activity.description}</p>}
                            </div>
                            <div className="aff-activity-time">
                              <Clock size={14} />
                              <span>{getTimeAgo(activity.timestamp)}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="aff-empty-state">
                      <Clock size={32} />
                      <h3>No activity yet</h3>
                      <p>Your referral activities will appear here.</p>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============ SUB-COMPONENTS ============
function FunnelStep({ label, value, pct, color }: { label: string; value: number; pct: number; color: string }) {
  return (
    <div className="aff-funnel-step">
      <div className="aff-funnel-step-header">
        <span>{label}</span>
        <strong>{value.toLocaleString()}</strong>
      </div>
      <div className="aff-funnel-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct, 2)}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`aff-funnel-bar-fill ${color}`}
        />
      </div>
    </div>
  );
}

function FunnelArrow({ rate }: { rate: number }) {
  return (
    <div className="aff-funnel-arrow">
      <ChevronRight size={16} />
      <span>{rate}%</span>
    </div>
  );
}
