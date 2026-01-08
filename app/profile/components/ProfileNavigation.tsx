'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProfileNavigationProps {
  activeTab: string;
}

/**
 * Navigation tabs for the profile page
 */
const ProfileNavigation = ({ activeTab }: ProfileNavigationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs = [
    { id: 'overview', label: 'Overview', mobileLabel: 'Overview' },
    { id: 'history', label: 'Quest History', mobileLabel: 'History' },
    { id: 'application', label: 'Application', mobileLabel: 'Villa' },
    { id: 'security', label: 'Manage Your Account', mobileLabel: 'Settings' },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 border-b border-neutral-200 sticky top-0 z-30">
      <nav className="mx-auto flex gap-6 md:gap-8 max-w-7xl px-6 overflow-x-auto scrollbar-hide no-scrollbar" aria-label="Profile navigation">
        {tabs.map(tab => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('tab', tab.id);
          const href = `${pathname}?${params.toString()}`;
          const isActive = activeTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={href}
              replace
              className={cn(
                "relative py-4 text-sm md:text-base font-gilroy-bold whitespace-nowrap transition-all duration-300 shrink-0",
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.mobileLabel}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        {/* Spacer for mobile scroll edge */}
        <div className="w-8 shrink-0 md:hidden" aria-hidden="true" />
      </nav>
    </div>
  );
};

export default ProfileNavigation;