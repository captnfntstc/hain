'use client';

import React from 'react';
import { useHain, ActiveTab } from '../context/HainContext';
import { Home, List, CookingPot, UtensilsCrossed, MoreHorizontal } from 'lucide-react';
import { TabBar } from 'glisse';

export default function BottomNavBar() {
  const { activeTab, setActiveTab, setActiveCategoryPage, setIsSearchOpen, setSearchQuery, t } = useHain();

  const handleTabChange = (val: string) => {
    setActiveCategoryPage(null);
    setIsSearchOpen(false);
    setSearchQuery('');
    setActiveTab(val as ActiveTab);
  };

  const navItems = [
    { value: 'home', label: t.nav_home, icon: <Home className="w-5 h-5" /> },
    { value: 'list', label: t.nav_list, icon: <List className="w-5 h-5" /> },
    { value: 'kusina', label: t.nav_kusina, icon: <CookingPot className="w-5 h-5" /> },
    { value: 'leftovers', label: t.nav_leftovers, icon: <UtensilsCrossed className="w-5 h-5" /> },
    { value: 'more', label: t.nav_more, icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  return (
    <nav 
      aria-label="App Navigation"
      className="fixed bottom-safe-nav left-0 right-0 z-40 flex justify-center px-2 pointer-events-none"
    >
      <div className="pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full">
        <TabBar 
          items={navItems}
          value={activeTab}
          onValueChange={handleTabChange}
          className="[--lg-tab-width:62px] xs:[--lg-tab-width:68px] sm:[--lg-tab-width:74px]"
        />
      </div>
    </nav>
  );
}
