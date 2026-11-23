'use client';

import React from 'react';
import { HainProvider, useHain } from '../context/HainContext';
import { SafeAreaProvider } from '../context/SafeAreaContext';
import ThemeWrapper from '../components/ThemeWrapper';
import AppLayout from '../components/AppLayout';
import HomeTab from '../components/HomeTab';
import SearchTab from '../components/SearchTab';
import ListTab from '../components/ListTab';
import KusinaTab from '../components/KusinaTab';
import LeftoversTab from '../components/LeftoversTab';
import MoreTab from '../components/MoreTab';
import BottomNavBar from '../components/BottomNavBar';
import BudgetModal from '../components/BudgetModal';
import RecipeDetailScreen from '../components/RecipeDetailScreen';
import CookCountdownModal from '../components/CookCountdownModal';
import PabiliExportModal from '../components/PabiliExportModal';
import PadeliverModal from '../components/PadeliverModal';
import FiltersModal from '../components/FiltersModal';
import CalendarPlannerModal from '../components/CalendarPlannerModal';
import CalendarHistoryPage from '../components/CalendarHistoryPage';
import CategoryDishesPage from '../components/CategoryDishesPage';
import DeveloperOptionsModal from '../components/DeveloperOptionsModal';
import RegionLocationModal from '../components/RegionLocationModal';
import TrafficAlertPromptModal from '../components/TrafficAlertPromptModal';
import InteractiveStoreMapModal from '../components/InteractiveStoreMapModal';
import RiceAllocationModal from '../components/RiceAllocationModal';

function MainApp() {
  const { 
    activeTab, 
    isRecipeDetailOpen, 
    isBudgetModalOpen, 
    isRiceModalOpen,
    isCalendarPageOpen,
    isSearchOpen,
    activeCategoryPage 
  } = useHain();

  return (
    <div className="flex-1 flex flex-col relative w-full h-full">
      {/* If Calendar History Page is open, render dedicated scrollable calendar page */}
      {isCalendarPageOpen ? (
        <CalendarHistoryPage />
      ) : activeCategoryPage ? (
        /* Dedicated Category Trending Dishes Page */
        <CategoryDishesPage />
      ) : isSearchOpen ? (
        /* Actual Dedicated Search Screen */
        <SearchTab />
      ) : (
        <>
          {/* Active Tab Screen */}
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'search' && <SearchTab />}
          {activeTab === 'list' && <ListTab />}
          {activeTab === 'kusina' && <KusinaTab />}
          {activeTab === 'leftovers' && <LeftoversTab />}
          {(activeTab === 'more' || (activeTab as string) === 'profile') && <MoreTab />}
        </>
      )}

      {/* Floating Bottom Navigation Bar (Pill) - Visible on category page too matching user mockup */}
      {!isBudgetModalOpen && !isRiceModalOpen && !isRecipeDetailOpen && !isCalendarPageOpen && !isSearchOpen && <BottomNavBar />}

      {/* Full Page Picker & Overlays */}
      <BudgetModal />
      <RiceAllocationModal />
      <FiltersModal />
      <CalendarPlannerModal />
      {isRecipeDetailOpen && <RecipeDetailScreen />}
      <CookCountdownModal />
      <PabiliExportModal />
      <PadeliverModal />
      <DeveloperOptionsModal />
      <RegionLocationModal />
      <TrafficAlertPromptModal />
      <InteractiveStoreMapModal />
    </div>
  );
}

export default function Home() {
  return (
    <SafeAreaProvider>
      <HainProvider>
        <ThemeWrapper>
          <AppLayout>
            <MainApp />
          </AppLayout>
        </ThemeWrapper>
      </HainProvider>
    </SafeAreaProvider>
  );
}
