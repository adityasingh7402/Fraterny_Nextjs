'use client'

import { useProfileContext } from './contexts/profile-client';

// Import profile components
import ProfileStatsCard from './components/ProfileStatsCard';
import AccountSettings from './components/AccountSettings';
import QuestHistory from './components/QuestHistory';
import VillaApplicationSection from './components/VillaApplicationSection';
const UserProfile = () => {
  const { activeTab } = useProfileContext();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProfileStatsCard />;
      case 'application':
        return <VillaApplicationSection />;
      case 'history':
        return <QuestHistory />;
      case 'security':
        return <AccountSettings />;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="mx-auto w-full">
      {renderTabContent()}
    </div>
  );
};

export default UserProfile;