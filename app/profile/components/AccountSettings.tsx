'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Lock,
  UserCog,
  ChevronRight,
  Loader2,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/app/auth/cotexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ProfileEditForm from './ProfileEditForm';

// Animation variants matching VillaApplicationSection
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

interface AccountSettingsProps {
  className?: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ className = '' }) => {
  const { user, isLoading } = useAuth();

  // Section states
  const [activeSection, setActiveSection] = useState<'password' | 'profile' | 'delete' | null>(null);

  // Password change state
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Account deletion state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const toggleSection = (section: 'password' | 'profile' | 'delete') => {
    setActiveSection(activeSection === section ? null : section);
    // Reset states when switching sections
    if (section === 'password') {
      setPasswordSuccess(false);
      setPasswordError('');
    }
  };

  const handlePasswordChange = (field: keyof PasswordFormData, value: string) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    setPasswordError('');
    setPasswordSuccess(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      setPasswordLoading(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      setPasswordLoading(false);
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError('New password must be different from current password');
      setPasswordLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      setPasswordSuccess(true);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast.success('Password updated successfully!');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update password. Please try again.';
      setPasswordError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      setDeleteError('Please type "DELETE" to confirm account deletion');
      return;
    }

    setDeleteLoading(true);
    setDeleteError('');

    try {
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

      if (userError || !currentUser) {
        throw new Error('Unable to get user information');
      }

      // const { error: profileError } = await supabase
      //   .from('user_profiles')
      //   .delete()
      //   .eq('user_id', currentUser.id);

      // if (profileError) {
      //   console.error('Profile deletion error:', profileError);
      // }

      // const { error: analyticsError } = await supabase
      //   .from('user_analytics')
      //   .delete()
      //   .eq('user_id', currentUser.id);

      // if (analyticsError) {
      //   console.error('Analytics deletion error:', analyticsError);
      // }

      const { error: authError } = await supabase.auth.admin.deleteUser(currentUser.id);

      if (authError) {
        console.error('Admin delete failed, signing out user:', authError);
        await supabase.auth.signOut();
      }

      toast.success('Account deleted successfully');
      setDeleteDialogOpen(false);
      setDeleteConfirmation('');
      window.location.href = '/';

    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete account. Please try again.';
      setDeleteError(errorMessage);
      toast.error(errorMessage);
      console.error('Account deletion error:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-gilroy-bold text-red-900 mb-2">
          Error Loading Account Settings
        </h3>
        <p className="text-red-600 font-gilroy-regular">
          Unable to load your account settings. Please try refreshing or logging in again.
        </p>
      </div>
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
              Security & Settings
            </h2>
            <p className="text-xs font-gilroy-medium text-neutral-500">
              Manage your credentials and personal Voyager profile.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-blue-50 p-3 rounded-2xl">
            <Shield className="h-6 w-6 text-blue-600" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 p-4 md:p-0">
          {/* Security Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            {/* Change Password Card */}
            <motion.button
              variants={itemVariants}
              onClick={() => toggleSection('password')}
              className={`p-5 rounded-xl border-2 transition-all duration-300 text-left group ${activeSection === 'password'
                ? 'bg-blue-50 border-blue-200 shadow-sm'
                : 'bg-white border-neutral-100 hover:border-neutral-200 shadow-sm'
                }`}
            >
              <div className={`p-2.5 rounded-lg w-fit mb-3 ${activeSection === 'password' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Lock className="h-5 w-5" />
              </div>
              <h3 className={`text-base font-gilroy-bold mb-0.5 ${activeSection === 'password' ? 'text-blue-900' : 'text-neutral-900'}`}>Security</h3>
              <p className="text-[11px] text-neutral-500 font-gilroy-medium mb-3">
                Update account password
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-gilroy-bold text-neutral-400 uppercase tracking-widest">
                  {activeSection === 'password' ? 'Active' : 'Configure'}
                </span>
                <ChevronRight className={`h-3.5 w-3.5 transition-transform ${activeSection === 'password' ? 'rotate-90' : ''
                  }`} />
              </div>
            </motion.button>

            {/* Edit Profile Card */}
            <motion.button
              variants={itemVariants}
              onClick={() => toggleSection('profile')}
              className={`p-5 rounded-xl border-2 transition-all duration-300 text-left group ${activeSection === 'profile'
                ? 'bg-blue-50 border-blue-200 shadow-sm'
                : 'bg-white border-neutral-100 hover:border-neutral-200 shadow-sm'
                }`}
            >
              <div className={`p-2.5 rounded-lg w-fit mb-3 ${activeSection === 'profile' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <UserCog className="h-5 w-5" />
              </div>
              <h3 className={`text-base font-gilroy-bold mb-0.5 ${activeSection === 'profile' ? 'text-blue-900' : 'text-neutral-900'}`}>Profile</h3>
              <p className="text-[11px] text-neutral-500 font-gilroy-medium mb-3">
                Update personal info
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-gilroy-bold text-neutral-400 uppercase tracking-widest">
                  {activeSection === 'profile' ? 'Active' : 'Configure'}
                </span>
                <ChevronRight className={`h-3.5 w-3.5 transition-transform ${activeSection === 'profile' ? 'rotate-90' : ''
                  }`} />
              </div>
            </motion.button>

            {/* Delete Account Card */}
            <motion.button
              variants={itemVariants}
              onClick={() => toggleSection('delete')}
              className={`p-5 rounded-xl border-2 transition-all duration-300 text-left group ${activeSection === 'delete'
                ? 'bg-red-50 border-red-200 shadow-sm'
                : 'bg-white border-neutral-100 hover:border-red-100 shadow-sm'
                }`}
            >
              <div className={`p-2.5 rounded-lg w-fit mb-3 ${activeSection === 'delete' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className={`text-base font-gilroy-bold mb-0.5 ${activeSection === 'delete' ? 'text-red-900' : 'text-neutral-900'}`}>Remove</h3>
              <p className="text-[11px] text-neutral-500 font-gilroy-medium mb-3">
                Permanently delete account
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-gilroy-bold text-neutral-400 uppercase tracking-widest">
                  {activeSection === 'delete' ? 'Active' : 'Configure'}
                </span>
                <ChevronRight className={`h-3.5 w-3.5 transition-transform ${activeSection === 'delete' ? 'rotate-90' : ''
                  }`} />
              </div>
            </motion.button>
          </div>

          {/* Expandable Content Sections */}
          <AnimatePresence mode="wait">

            {/* Password Change Section */}
            {activeSection === 'password' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                      <Lock className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-gilroy-bold text-gray-900 dark:text-white">
                        Change Your Password
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-gilroy-regular">
                        Create a strong password with at least 8 characters
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    {passwordSuccess && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 font-gilroy-semibold">
                          Password updated successfully!
                        </AlertDescription>
                      </Alert>
                    )}

                    {passwordError && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="font-gilroy-semibold">
                          {passwordError}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="font-gilroy-bold text-base">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={passwordForm.currentPassword}
                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            placeholder="Enter current password"
                            className="pr-10 font-gilroy-regular"
                            disabled={passwordLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            disabled={passwordLoading}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="font-gilroy-bold text-base">
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordForm.newPassword}
                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            placeholder="Enter new password"
                            className="pr-10 font-gilroy-regular"
                            disabled={passwordLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            disabled={passwordLoading}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="font-gilroy-bold text-base">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            placeholder="Confirm new password"
                            className="pr-10 font-gilroy-regular"
                            disabled={passwordLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={passwordLoading}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={passwordLoading}
                      className="w-full bg-linear-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-gilroy-bold shadow-md hover:shadow-lg"
                    >
                      {passwordLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Update Password
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Profile Edit Section */}
            {activeSection === 'profile' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                      <UserCog className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-gilroy-bold text-gray-900 dark:text-white">
                        Edit Your Profile
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-gilroy-regular">
                        Update your personal information and preferences
                      </p>
                    </div>
                  </div>
                  <ProfileEditForm />
                </div>
              </motion.div>
            )}

            {/* Account Deletion Section */}
            {activeSection === 'delete' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-gilroy-bold text-gray-900 dark:text-white">
                        Delete Your Account
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-gilroy-regular">
                        This action cannot be undone
                      </p>
                    </div>
                  </div>

                  <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="font-gilroy-semibold">
                      <strong>Warning:</strong> Account deletion is permanent and cannot be undone.
                      All your data, including quest history and analytics, will be permanently deleted.
                    </AlertDescription>
                  </Alert>

                  <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full font-gilroy-bold bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete My Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="font-gilroy-regular">
                      <DialogHeader>
                        <DialogTitle className="font-gilroy-bold">
                          Are you absolutely sure?
                        </DialogTitle>
                        <DialogDescription className="font-gilroy-semibold">
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        {deleteError && (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="font-gilroy-semibold">
                              {deleteError}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="deleteConfirm" className="font-gilroy-bold">
                            Type <span className="font-mono font-bold">DELETE</span> to confirm
                          </Label>
                          <Input
                            id="deleteConfirm"
                            value={deleteConfirmation}
                            onChange={(e) => {
                              setDeleteConfirmation(e.target.value);
                              setDeleteError('');
                            }}
                            placeholder="Type DELETE"
                            className="font-gilroy-regular"
                            disabled={deleteLoading}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setDeleteDialogOpen(false);
                            setDeleteConfirmation('');
                            setDeleteError('');
                          }}
                          disabled={deleteLoading}
                          className="font-gilroy-semibold"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={deleteLoading || deleteConfirmation !== 'DELETE'}
                          className="font-gilroy-bold"
                        >
                          {deleteLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Delete Account'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Footer */}
          {!activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800"
            >
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="font-gilroy-bold text-cyan-900 dark:text-cyan-100 mb-1">
                    Security Tips
                  </h4>
                  <ul className="text-sm text-cyan-800 dark:text-cyan-200 font-gilroy-regular space-y-1">
                    <li>• Use a strong, unique password for your account</li>
                    <li>• Keep your profile information up to date</li>
                    <li>• Never share your password with anyone</li>
                    <li>• Review your account activity regularly</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountSettings;