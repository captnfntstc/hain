'use client';

import React, { useState } from 'react';
import { useHain } from '../context/HainContext';
import { 
  User, 
  Users, 
  ShieldCheck, 
  Settings as SettingsIcon, 
  LogOut, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ArrowLeft,
  Sparkles, 
  Check, 
  AlertTriangle,
  Store,
  DollarSign,
  Moon,
  Sun,
  Globe,
  WifiOff,
  X,
  MapPin,
  Clock,
  Volume2,
  SlidersHorizontal,
  BookmarkCheck,
  Coins,
  Palette
} from 'lucide-react';
import { HouseholdMember, SUPPORTED_CURRENCIES } from '../types/hain';
import { AllergenIcon, DietaryIcon } from './FilterIcons';
import { Button } from 'glisse';

type MoreSubpage = 'menu' | 'profile' | 'household' | 'palengke' | 'settings' | 'language' | 'currency';

export default function MoreTab() {
  const {
    householdMembers,
    toggleMemberEatingToday,
    addHouseholdMember,
    removeHouseholdMember,
    isFamilyShieldEnabled,
    setIsFamilyShieldEnabled,
    budgetCap,
    setBudgetCap,
    servingsPax,
    setServingsPax,
    costPerPerson,
    timeOfDay,
    themeMode,
    setThemeMode,
    setIsBudgetModalOpen,
    setBudgetModalStep,
    t,
    language,
    setLanguage,
    currency,
    setCurrency,
    colorTheme,
    setIsDevOptionsOpen,
    currencySymbol,
  } = useHain();

  // Navigation Subpage State
  const [currentView, setCurrentView] = useState<MoreSubpage>('menu');

  // Add Member Modal State
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Child');
  const [newMemberAvatar, setNewMemberAvatar] = useState('🧒');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  // Profile Form State
  const [profileName, setProfileName] = useState('Gracepheryle');
  const [profileEmail, setProfileEmail] = useState('gracepheryle@hain.ph');
  const [profileRole, setProfileRole] = useState('Head Cook & Budget Planner');
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  // Palengke Settings State
  const [selectedMarket, setSelectedMarket] = useState('munoz');
  const [includeRice, setIncludeRice] = useState(true);
  const [riceType, setRiceType] = useState<'sinandomeng' | 'dinorado'>('sinandomeng');
  const [marketRadius, setMarketRadius] = useState(3);

  // App Settings State
  const [isDataSaver, setIsDataSaver] = useState(false);
  const [isHapticFeedback, setIsHapticFeedback] = useState(true);

  // Logout Dialog State
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Clean allergen lists strictly based on selected language (no mixed parenthetical translations)
  const availableAllergens = language === 'tl' ? [
    'Mani',
    'Hipon / Alimango',
    'Gatas',
    'Itlog',
    'Trigo',
    'Isda',
    'Balatong',
  ] : [
    'Peanuts',
    'Shellfish',
    'Dairy',
    'Egg',
    'Gluten',
    'Fish',
    'Soy',
  ];

  const availableDiets = language === 'tl' ? [
    'Low Purine',
    'Low Sodium',
    'Low Sugar',
    'Vegetarian',
    'Pescatarian',
    'Halal',
  ] : [
    'Low Purine',
    'Low Sodium',
    'Low Sugar',
    'Vegetarian',
    'Pescatarian',
    'Halal',
  ];

  const formatRelationship = (rel: string) => {
    const r = (rel || '').toLowerCase();
    if (language === 'tl') {
      if (r.includes('partner') || r.includes('spouse') || r.includes('asawa') || r.includes('katuwang') || r.includes('kabiyak')) return 'Katuwang';
      if (r.includes('parent') || r.includes('tatay') || r.includes('nanay') || r.includes('magulang') || r.includes('father') || r.includes('mother')) return 'Magulang';
      if (r.includes('child') || r.includes('anak') || r.includes('bunso') || r.includes('panganay')) return 'Anak';
      if (r.includes('grandparent') || r.includes('lolo') || r.includes('lola') || r.includes('senior')) return 'Lolo / Lola';
      if (r.includes('relative') || r.includes('kamag-anak') || r.includes('tito') || r.includes('tita') || r.includes('pinsan')) return 'Kamag-anak';
      return 'Iba pa';
    }
    // English
    if (r.includes('partner') || r.includes('spouse') || r.includes('asawa') || r.includes('katuwang') || r.includes('kabiyak')) return 'Partner';
    if (r.includes('parent') || r.includes('tatay') || r.includes('nanay') || r.includes('magulang') || r.includes('father') || r.includes('mother')) return 'Parent';
    if (r.includes('child') || r.includes('anak') || r.includes('bunso') || r.includes('panganay')) return 'Child';
    if (r.includes('grandparent') || r.includes('lolo') || r.includes('lola') || r.includes('senior')) return 'Grandparent';
    if (r.includes('relative') || r.includes('kamag-anak') || r.includes('tito') || r.includes('tita') || r.includes('pinsan')) return 'Relative';
    return 'Others';
  };

  const handleCreateMember = () => {
    if (!newMemberName.trim()) return;
    addHouseholdMember({
      name: newMemberName.trim(),
      relationship: newMemberRole,
      avatar: newMemberAvatar,
      allergens: selectedAllergens,
      dietaryRestrictions: selectedDiets,
      isEatingToday: true,
    });
    setNewMemberName('');
    setSelectedAllergens([]);
    setSelectedDiets([]);
    setIsAddMemberOpen(false);
  };

  const toggleAllergen = (al: string) => {
    setSelectedAllergens((prev) => {
      const exists = prev.some(
        (item) =>
          item.toLowerCase().includes(al.toLowerCase()) ||
          al.toLowerCase().includes(item.toLowerCase())
      );
      if (exists) {
        return prev.filter(
          (item) =>
            !item.toLowerCase().includes(al.toLowerCase()) &&
            !al.toLowerCase().includes(item.toLowerCase())
        );
      }
      return [...prev, al];
    });
  };

  const isAllergenSelected = (al: string) => {
    return selectedAllergens.some(
      (item) =>
        item.toLowerCase().includes(al.toLowerCase()) ||
        al.toLowerCase().includes(item.toLowerCase())
    );
  };

  const toggleDiet = (dt: string) => {
    setSelectedDiets((prev) => {
      const exists = prev.some(
        (item) =>
          item.toLowerCase().includes(dt.toLowerCase()) ||
          dt.toLowerCase().includes(item.toLowerCase())
      );
      if (exists) {
        return prev.filter(
          (item) =>
            !item.toLowerCase().includes(dt.toLowerCase()) &&
            !dt.toLowerCase().includes(item.toLowerCase())
        );
      }
      return [...prev, dt];
    });
  };

  const isDietSelected = (dt: string) => {
    return selectedDiets.some(
      (item) =>
        item.toLowerCase().includes(dt.toLowerCase()) ||
        dt.toLowerCase().includes(item.toLowerCase())
    );
  };

  const formatRestrictionLabel = (text: string) => {
    if (language === 'en') {
      return text.replace(/\s*\([^)]*\)/g, '').trim();
    }
    return text;
  };

  const handleSaveProfile = () => {
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 2000);
  };

  return (
    <div className="flex-1 pb-safe-nav">
      
      {/* ============================================================ */}
      {/* VIEW 1: MAIN MORE MENU (THE HUB)                              */}
      {/* ============================================================ */}
      {currentView === 'menu' && (
        <div className="animate-in fade-in duration-200">
          {/* Header Banner */}
          <section 
            aria-label="More Menu Header" 
            className="bg-[#B8381D] text-white px-5 pt-safe pb-6 rounded-b-[40px] shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between text-xs text-white/90 font-medium mb-3">
              <span className="font-sans font-bold tracking-[0.3em] text-xs">H A I N</span>
              <div className="w-5 h-5 rounded-full overflow-hidden border border-white/40 shadow-sm flex items-center justify-center bg-white text-[10px]">
                🇵🇭
              </div>
            </div>

            <h1 className="font-serif-title font-bold text-2xl sm:text-[28px] tracking-tight leading-tight text-white mb-4">
              {t.more_title}
            </h1>

            {/* Quick Profile Mini Card */}
            <div 
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-3.5 bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl p-3.5 text-white shadow-sm cursor-pointer tap-spring transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-white text-[#B8381D] flex items-center justify-center text-xl shadow-md border-2 border-white/60 shrink-0">
                👩‍🍳
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-sans font-bold text-base text-white truncate">
                    {profileName}
                  </h2>
                  <span className="text-[9px] bg-amber-400 text-stone-900 font-bold px-2 py-0.5 rounded-full shrink-0">
                    Head Cook
                  </span>
                </div>
                <p className="text-xs text-white/80 font-sans truncate">
                  {profileEmail}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70 shrink-0" />
            </div>
          </section>

          {/* Navigation Items - Clean Apple Inset Grouped List (Avoiding overused separate rounded cards) */}
          <div className="px-4 pt-4 space-y-4">
            
            <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
              {/* 1. PROFILE */}
              <div 
                onClick={() => setCurrentView('profile')}
                className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FDECE8] text-[#C2410C] flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-stone-900 group-hover:text-[#B8381D] transition-colors">
                      {t.more_profile_title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5 line-clamp-1">
                      {t.more_profile_sub}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0 ml-2" />
              </div>

              {/* 2. MANAGE HOUSEHOLD */}
              <div 
                onClick={() => setCurrentView('household')}
                className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-bold text-sm text-stone-900 group-hover:text-[#B8381D] transition-colors">
                        {t.more_household_title}
                      </h3>
                      <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                        {householdMembers.length} Members
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-medium mt-0.5 line-clamp-1">
                      {t.more_household_sub}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0 ml-2" />
              </div>

              {/* 3. PALENGKE & BUDGET */}
              <div 
                onClick={() => setCurrentView('palengke')}
                className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-stone-900 group-hover:text-[#B8381D] transition-colors">
                      {t.more_palengke_title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5 line-clamp-1">
                      {t.more_palengke_sub}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0 ml-2" />
              </div>

              {/* 4. SETTINGS */}
              <div 
                onClick={() => setCurrentView('settings')}
                className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <SettingsIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-stone-900 group-hover:text-[#B8381D] transition-colors">
                      {t.more_settings_title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5 line-clamp-1">
                      {t.more_settings_sub}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0 ml-2" />
              </div>
            </div>

            {/* LOG OUT BUTTON & APP VERSION */}
            <div className="pt-2 space-y-3">
              <Button
                variant="glass"
                onClick={() => setIsLogoutDialogOpen(true)}
                icon={<LogOut className="w-4 h-4 text-rose-600" />}
                className="w-full !py-3 !rounded-xl !bg-white hover:!bg-rose-50 !text-rose-600 !text-xs !font-bold !border-rose-200"
              >
                <span className="text-rose-600">{t.more_logout}</span>
              </Button>

              {/* App Version below Logout Button */}
              <div className="text-center py-2 space-y-0.5">
                <div className="text-xs font-semibold text-stone-400 tracking-wide">
                  {t.more_app_version}
                </div>
                <div className="text-[11px] text-stone-400/80">
                  {t.more_tagline}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 2: PROFILE PAGE                                         */}
      {/* ============================================================ */}
      {currentView === 'profile' && (
        <div className="animate-in slide-in-from-right duration-250">
          <section className="bg-[#B8381D] text-white px-5 pt-safe pb-5 rounded-b-[36px] shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="glass"
                icon={<ArrowLeft className="w-5 h-5 text-white" />}
                onClick={() => setCurrentView('menu')}
                className="!w-9 !h-9 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-sm"
              />
              <h1 className="font-serif-title font-bold text-xl text-white">
                {t.prof_title}
              </h1>
            </div>
            <p className="text-xs text-white/80 pl-12 font-sans">
              {t.prof_sub}
            </p>
          </section>

          <div className="px-4 pt-4 space-y-4">
            {/* Avatar & Achievements Summary */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-none text-center space-y-3">
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-full bg-[#FDECE8] text-3xl flex items-center justify-center mx-auto border-2 border-white shadow-sm">
                  👩‍🍳
                </div>
                <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-0.5 rounded-full text-[9px] border-2 border-white">
                  ✓
                </span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-base text-stone-900">
                  {profileName}
                </h3>
                <p className="text-xs text-[#B8381D] font-bold">
                  {profileRole}
                </p>
              </div>

              {/* Achievements row */}
              <div className="grid grid-cols-3 divide-x divide-stone-100 pt-3 border-t border-stone-100 text-center">
                <div className="px-2">
                  <div className="font-bold text-stone-900 text-sm">42</div>
                  <div className="text-[10px] text-stone-400">{t.prof_cooked}</div>
                </div>
                <div className="px-2">
                  <div className="font-bold text-emerald-700 text-sm">₱4.8k</div>
                  <div className="text-[10px] text-stone-400">{t.prof_saved}</div>
                </div>
                <div className="px-2">
                  <div className="font-bold text-stone-900 text-sm">{householdMembers.length}</div>
                  <div className="text-[10px] text-stone-400">{t.prof_members}</div>
                </div>
              </div>
            </div>

            {/* Editable Profile Inputs */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-none space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  {t.prof_name_label}
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-sans text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B8381D]/30"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  {t.prof_email_label}
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-sans text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B8381D]/30"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  {t.prof_role_label}
                </label>
                <select
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-sans text-stone-900 focus:bg-white"
                >
                  <option value="Head Cook & Budget Planner">Head Cook &amp; Budget Planner</option>
                  <option value="Nanay / Ilaw ng Tahanan">Nanay / Ilaw ng Tahanan</option>
                  <option value="Tatay / Tagapamalengke">Tatay / Tagapamalengke</option>
                  <option value="Solo Cook / Independent">Solo Cook / Independent</option>
                </select>
              </div>

              <Button
                variant="filled"
                tint="#B8381D"
                onClick={handleSaveProfile}
                className="w-full !py-2.5 !rounded-xl !text-white text-xs font-bold shadow-sm transition-all mt-2"
              >
                {isProfileSaved ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{t.prof_saved_toast}</span>
                  </span>
                ) : (
                  <span>{t.prof_save_btn}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 3: MANAGE HOUSEHOLD PAGE                                */}
      {/* ============================================================ */}
      {currentView === 'household' && (
        <div className="animate-in slide-in-from-right duration-250">
          <section className="bg-[#B8381D] text-white px-5 pt-safe pb-5 rounded-b-[36px] shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Button
                  variant="glass"
                  icon={<ArrowLeft className="w-5 h-5 text-white" />}
                  onClick={() => setCurrentView('menu')}
                  className="!w-9 !h-9 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-sm"
                />
                <h1 className="font-serif-title font-bold text-xl text-white">
                  {t.house_title}
                </h1>
              </div>

              <Button
                variant="filled"
                tint="#ffffff"
                onClick={() => setIsAddMemberOpen(true)}
                icon={<Plus className="w-3.5 h-3.5 text-[#B8381D]" />}
                className="!h-8 !px-3 !rounded-full !text-[#B8381D] !text-xs !font-bold shadow-sm"
              >
                <span className="text-[#B8381D] text-xs font-bold">Add</span>
              </Button>
            </div>
            <p className="text-xs text-white/80 pl-12 font-sans">
              {t.house_sub}
            </p>
          </section>

          <div className="px-4 pt-4 space-y-4">
            {/* Master Family Safety Shield */}
            <div className="bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-none flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isFamilyShieldEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-400'
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {t.house_shield_title}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {isFamilyShieldEnabled ? t.house_shield_active_desc : t.house_shield_inactive_desc}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsFamilyShieldEnabled(!isFamilyShieldEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative tap-spring shrink-0 ml-3 ${
                  isFamilyShieldEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  isFamilyShieldEnabled ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Members List - Unified Inset Grouped Container */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-2">
                {t.house_members_title.replace('{count}', String(householdMembers.length))}
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
                {householdMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-3.5 px-4 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{member.avatar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-sm text-stone-900">
                            {member.name}
                          </span>
                          <span className="text-[10px] bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded-md border border-stone-200">
                            {formatRelationship(member.relationship)}
                          </span>
                        </div>

                        {/* Allergens & Diets Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {member.allergens.length === 0 && member.dietaryRestrictions.length === 0 && (
                            <span className="text-[11px] text-stone-400 font-medium">
                              {t.house_no_restrictions}
                            </span>
                          )}
                          {member.allergens.map((al) => (
                            <span
                              key={al}
                              className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md flex items-center gap-1"
                            >
                              <AlertTriangle className="w-2.5 h-2.5" />
                              {formatRestrictionLabel(al)}
                            </span>
                          ))}
                          {member.dietaryRestrictions.map((dt) => (
                            <span
                              key={dt}
                              className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md"
                            >
                              {formatRestrictionLabel(dt)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Eating Today Switch & Delete */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleMemberEatingToday(member.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all tap-spring ${
                          member.isEatingToday
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-100 text-stone-400 border border-stone-200'
                        }`}
                      >
                        {member.isEatingToday ? t.house_eating_badge : t.house_not_eating_badge}
                      </button>
                      {member.id !== 'member-1' && (
                        <button
                          onClick={() => removeHouseholdMember(member.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 tap-spring"
                          title="Remove Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Member Quick Button */}
            <Button
              variant="glass"
              onClick={() => setIsAddMemberOpen(true)}
              icon={<Plus className="w-4 h-4 text-[#B8381D]" />}
              className="w-full !py-3 !rounded-xl border border-dashed !border-stone-300 hover:!border-[#B8381D] text-stone-600 hover:text-[#B8381D] text-xs font-bold !bg-white/70"
            >
              <span>{t.house_add_member_btn}</span>
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 4: PALENGKE & BUDGET PAGE                               */}
      {/* ============================================================ */}
      {currentView === 'palengke' && (
        <div className="animate-in slide-in-from-right duration-250">
          <section className="bg-[#B8381D] text-white px-5 pt-safe pb-5 rounded-b-[36px] shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="glass"
                icon={<ArrowLeft className="w-5 h-5 text-white" />}
                onClick={() => setCurrentView('menu')}
                className="!w-9 !h-9 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-sm"
              />
              <h1 className="font-serif-title font-bold text-xl text-white">
                {t.market_title}
              </h1>
            </div>
            <p className="text-xs text-white/80 pl-12 font-sans">
              {t.market_sub}
            </p>
          </section>

          <div className="px-4 pt-4 space-y-4">
            {/* Daily Budget & Pax Settings */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-none space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-xs text-stone-900">
                    {t.market_budget_title}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {t.market_budget_sub}
                  </p>
                </div>
                <Button
                  variant="glass"
                  onClick={() => {
                    setBudgetModalStep(1);
                    setIsBudgetModalOpen(true);
                  }}
                  className="!text-xs !font-bold !text-[#B8381D] !bg-[#FDECE8] !px-3 !py-1 !rounded-md"
                >
                  <span>{t.market_change_btn}</span>
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">{t.market_current_budget}</div>
                  <div className="text-lg font-bold text-stone-900">₱{budgetCap.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-stone-400">{t.market_serves_for}</div>
                  <div className="text-lg font-bold text-stone-900">{servingsPax} Pax</div>
                </div>
              </div>
            </div>

            {/* Primary Wet Market Picker */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-none space-y-3">
              <div>
                <h3 className="font-sans font-bold text-xs text-stone-900">
                  {t.market_primary_wet_title}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {t.market_primary_wet_sub}
                </p>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 'munoz',
                    name: 'Muñoz Public Wet Market',
                    dist: '1.2 km distance',
                    badge: 'DA Bantay Presyo NCR',
                  },
                  {
                    id: 'balintawak',
                    name: 'Balintawak Cloverleaf Market',
                    dist: '2.7 km distance',
                    badge: 'Wholesale Rates',
                  },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMarket(m.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer tap-spring flex items-center justify-between ${
                      selectedMarket === m.id
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">{m.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{m.dist}</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                      {m.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rice Toggle */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-none space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-xs text-stone-900">
                    {t.market_rice_title}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {t.market_rice_sub}
                  </p>
                </div>
                <button
                  onClick={() => setIncludeRice(!includeRice)}
                  className={`w-11 h-6 rounded-full transition-colors relative tap-spring shrink-0 ml-3 ${
                    includeRice ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    includeRice ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              {includeRice && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setRiceType('sinandomeng')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all tap-spring ${
                      riceType === 'sinandomeng'
                        ? 'bg-[#B8381D] text-white border-[#B8381D]'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    Sinandomeng (+₱28/half kg)
                  </button>
                  <button
                    onClick={() => setRiceType('dinorado')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all tap-spring ${
                      riceType === 'dinorado'
                        ? 'bg-[#B8381D] text-white border-[#B8381D]'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    Dinorado (+₱52/1 kg)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 5: SETTINGS PAGE (Clean Inset Grouped Style)             */}
      {/* ============================================================ */}
      {currentView === 'settings' && (
        <div className="animate-in slide-in-from-right duration-250">
          <section className="bg-[#B8381D] text-white px-5 pt-safe pb-5 rounded-b-[36px] shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="glass"
                icon={<ArrowLeft className="w-5 h-5 text-white" />}
                onClick={() => setCurrentView('menu')}
                className="!w-9 !h-9 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-sm"
              />
              <h1 className="font-serif-title font-bold text-xl text-white">
                {t.set_title}
              </h1>
            </div>
            <p className="text-xs text-white/80 pl-12 font-sans">
              {t.set_sub}
            </p>
          </section>

          <div className="px-4 pt-4 space-y-4">
            
            {/* Section 1: APPEARANCE & LANGUAGE */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-2 mb-1.5">
                {language === 'en' ? 'Appearance & Language' : 'Hitsura at Wika'}
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
                
                {/* 1. LANGUAGE ROW (Navigates to dedicated Language subpage) */}
                <div 
                  onClick={() => setCurrentView('language')}
                  className="px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-xs text-stone-900 group-hover:text-[#B8381D] transition-colors">
                        {t.set_lang_title}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {t.set_lang_sub}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
                      {language === 'en' ? 'English 🇬🇧' : 'Tagalog 🇵🇭'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0" />
                  </div>
                </div>

                {/* 2. CURRENCY ROW (Navigates to dedicated Currency subpage) */}
                <div 
                  onClick={() => setCurrentView('currency')}
                  className="px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-xs text-stone-900 group-hover:text-[#B8381D] transition-colors">
                        {t.set_currency_title}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {t.set_currency_sub}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <span>{SUPPORTED_CURRENCIES.find((c) => c.code === currency)?.flag || '🇵🇭'}</span>
                      <span>{currency} ({currencySymbol})</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0" />
                  </div>
                </div>

                {/* 3. THEME ROW (Dark mode: Light, Dark, System — UI ready, not implemented into CSS yet) */}
                <div className="px-4 py-3.5 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sans font-bold text-xs text-stone-900">
                        {t.set_theme_title}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {t.set_theme_sub}
                      </p>
                    </div>
                  </div>

                  {/* 3-way Segmented Control: Light, Dark, System */}
                  <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/70">
                    <button
                      type="button"
                      onClick={() => setThemeMode('light')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all tap-spring flex items-center justify-center gap-1.5 ${
                        themeMode === 'light'
                          ? 'bg-white text-stone-900 shadow-sm border border-stone-200/80'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t.theme_light}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setThemeMode('dark')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all tap-spring flex items-center justify-center gap-1.5 ${
                        themeMode === 'dark'
                          ? 'bg-stone-900 text-white shadow-sm border border-stone-800'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{t.theme_dark}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setThemeMode('system')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all tap-spring flex items-center justify-center gap-1.5 ${
                        themeMode === 'system'
                          ? 'bg-white text-[#B8381D] shadow-sm border border-stone-200/80 font-bold'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-stone-500" />
                      <span>{t.theme_system}</span>
                    </button>
                  </div>
                </div>

                {/* 4. DEVELOPER OPTIONS: PRIMARY COLOR THEME ROW */}
                <div 
                  onClick={() => setIsDevOptionsOpen(true)}
                  className="px-4 py-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer tap-spring transition-colors border-t border-stone-100 group"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      style={{ backgroundColor: colorTheme.accentSubtle, color: colorTheme.accentColor }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                    >
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-sans font-bold text-xs text-stone-900 group-hover:text-stone-950">
                          {language === 'en' ? 'Primary Color Theme' : 'Pangunahing Kulay'}
                        </h3>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                          DEV
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        {colorTheme.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span 
                      style={{ backgroundColor: colorTheme.badgeBg }}
                      className="w-4 h-4 rounded-full border border-black/10 shadow-xs shrink-0"
                    />
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 shrink-0" />
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: DATA & SOUNDS */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-2 mb-1.5">
                {language === 'en' ? 'Data & Preferences' : 'Data at Kagustuhan'}
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
                
                {/* Data-Saver Lite Mode */}
                <div className="px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <WifiOff className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-xs text-stone-900">
                        {t.set_datasaver_title}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {t.set_datasaver_sub}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDataSaver(!isDataSaver)}
                    className={`w-11 h-6 rounded-full transition-colors relative tap-spring shrink-0 ml-3 ${
                      isDataSaver ? 'bg-emerald-600' : 'bg-stone-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      isDataSaver ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>

                {/* Sound & Haptic Feedback */}
                <div className="px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-xs text-stone-900">
                        {t.set_haptics_title}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {t.set_haptics_sub}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsHapticFeedback(!isHapticFeedback)}
                    className={`w-11 h-6 rounded-full transition-colors relative tap-spring shrink-0 ml-3 ${
                      isHapticFeedback ? 'bg-emerald-600' : 'bg-stone-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      isHapticFeedback ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 6: LANGUAGE PAGE (Dedicated Subpage)                    */}
      {/* ============================================================ */}
      {currentView === 'language' && (
        <div className="animate-in slide-in-from-right duration-250">
          <section className="bg-[#B8381D] text-white px-5 pt-safe pb-5 rounded-b-[36px] shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="glass"
                icon={<ArrowLeft className="w-5 h-5 text-white" />}
                onClick={() => setCurrentView('settings')}
                className="!w-9 !h-9 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-sm"
              />
              <h1 className="font-serif-title font-bold text-xl text-white">
                {t.lang_page_title}
              </h1>
            </div>
            <p className="text-xs text-white/80 pl-12 font-sans">
              {t.lang_page_sub}
            </p>
          </section>

          <div className="px-4 pt-4 space-y-4">
            
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-2">
              {language === 'en' ? 'Choose Language' : 'Pumili ng Wika'}
            </div>

            {/* Apple Inset Grouped Language Options */}
            <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
              
              {/* Option 1: English */}
              <div
                onClick={() => setLanguage('en')}
                className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">🇬🇧</span>
                  <div>
                    <div className="text-sm font-bold text-stone-900">{t.lang_en_title}</div>
                    <div className="text-xs text-stone-500">{t.lang_en_sub}</div>
                  </div>
                </div>
                {language === 'en' && (
                  <div className="w-6 h-6 rounded-full bg-[#B8381D] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Option 2: Tagalog */}
              <div
                onClick={() => setLanguage('tl')}
                className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">🇵🇭</span>
                  <div>
                    <div className="text-sm font-bold text-stone-900">{t.lang_tl_title}</div>
                    <div className="text-xs text-stone-500">{t.lang_tl_sub}</div>
                  </div>
                </div>
                {language === 'tl' && (
                  <div className="w-6 h-6 rounded-full bg-[#B8381D] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

            </div>

            {/* Cultural Preservation Note */}
            <div className="px-2 pt-2 text-xs text-stone-500 leading-relaxed font-sans">
              {t.lang_cultural_note}
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 7: CURRENCY PAGE (Dedicated Subpage)                    */}
      {/* ============================================================ */}
      {currentView === 'currency' && (
        <div className="animate-in slide-in-from-right duration-250">
          <section className="bg-[#B8381D] text-white px-5 pt-safe pb-5 rounded-b-[36px] shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="glass"
                icon={<ArrowLeft className="w-5 h-5 text-white" />}
                onClick={() => setCurrentView('settings')}
                className="!w-9 !h-9 !rounded-full !p-0 lg-glass-clear flex items-center justify-center drop-shadow-sm"
              />
              <h1 className="font-serif-title font-bold text-xl text-white">
                {t.curr_page_title}
              </h1>
            </div>
            <p className="text-xs text-white/80 pl-12 font-sans">
              {t.curr_page_sub}
            </p>
          </section>

          <div className="px-4 pt-4 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-2">
              {language === 'en' ? 'Select Preferred Currency' : 'Pumili ng Salapi'}
            </div>

            {/* Apple Inset Grouped Currency Options */}
            <div className="bg-white rounded-2xl border border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-none">
              {SUPPORTED_CURRENCIES.map((curr) => {
                const isSelected = currency === curr.code;
                return (
                  <div
                    key={curr.code}
                    onClick={() => setCurrency(curr.code)}
                    className="px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-stone-50 tap-spring transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{curr.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-stone-900">
                            {curr.code} ({curr.symbol})
                          </span>
                          {curr.isOfficial && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                              {t.curr_official_badge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500">
                          {language === 'en' ? curr.name : curr.localName}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#B8381D] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Currency Information Note */}
            <div className="px-2 pt-1 text-xs text-stone-500 leading-relaxed font-sans">
              {language === 'en'
                ? 'Hain defaults to the official Philippine Peso (₱). Selecting a currency formats budget inputs, pantry calculations, and grocery estimates.'
                : 'Ang opisyal na salapi ng Hain ay Piso ng Pilipinas (₱). Ang pagpapalit ng salapi ay mag-aangkop sa budget, stock sa kusina, at presyo sa palengke.'}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD HOUSEHOLD MEMBER MODAL                                   */}
      {/* ============================================================ */}
      {isAddMemberOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddMemberOpen(false);
          }}
        >
          <div className="w-full sm:max-w-md bg-[#FFFBF2] rounded-t-[36px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border-t border-x border-[#F2ECE1] animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 rounded-full bg-stone-300/80 mx-auto mt-3 mb-1" />
            
            <div className="px-6 pt-2 pb-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-sans font-bold text-lg text-stone-900">
                  {t.house_add_title}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.house_add_sub}
                </p>
              </div>
              <Button
                variant="glass"
                icon={<X className="w-4 h-4 text-stone-700" />}
                onClick={() => setIsAddMemberOpen(false)}
                className="!w-8 !h-8 !rounded-full shadow-sm"
              />
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
              {/* Name & Avatar Picker */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  {t.house_name_label}
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={newMemberAvatar}
                    onChange={(e) => setNewMemberAvatar(e.target.value)}
                    className="w-12 h-11 rounded-xl bg-white border border-stone-200 text-lg flex items-center justify-center text-center shadow-sm"
                  >
                    <option value="🧒">🧒</option>
                    <option value="👧">👧</option>
                    <option value="👨‍💼">👨‍💼</option>
                    <option value="👩‍💼">👩‍💼</option>
                    <option value="👴">👴</option>
                    <option value="👵">👵</option>
                    <option value="👶">👶</option>
                  </select>
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="e.g. Bunso, Lola, Kuya John..."
                    className="flex-1 h-11 px-4 rounded-xl bg-white border border-stone-200 text-sm font-sans text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B8381D]/30"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  {t.house_role_label}
                </label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white border border-stone-200 text-xs font-sans text-stone-900 shadow-sm"
                >
                  <option value="Partner">{language === 'tl' ? 'Katuwang (Partner / Asawa)' : 'Partner (Spouse / Husband / Wife)'}</option>
                  <option value="Parent">{language === 'tl' ? 'Magulang' : 'Parent'}</option>
                  <option value="Child">{language === 'tl' ? 'Anak' : 'Child'}</option>
                  <option value="Grandparent">{language === 'tl' ? 'Lolo / Lola' : 'Grandparent'}</option>
                  <option value="Relative">{language === 'tl' ? 'Kamag-anak' : 'Relative'}</option>
                  <option value="Others">{language === 'tl' ? 'Iba pa (Housemate / Kasama)' : 'Others (Housemate / Guest)'}</option>
                </select>
              </div>

              {/* Allergens Checklist with Official Larger SVG Filter Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                  {t.house_allergies_label}
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {availableAllergens.map((al) => {
                    const active = isAllergenSelected(al);
                    return (
                      <button
                        key={al}
                        type="button"
                        onClick={() => toggleAllergen(al)}
                        className={`h-[44px] px-3.5 rounded-full text-xs sm:text-sm font-bold transition-all tap-spring border-2 flex items-center gap-2 shadow-xs shrink-0 ${
                          active
                            ? 'bg-[#FDF2F0] border-[#E57373] text-[#842A16] shadow-sm'
                            : 'bg-white border-[#EBE3D5] text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <AllergenIcon type={al} className="w-5 h-5 shrink-0" />
                        <span>{al}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Diets Checklist with Official Larger SVG Filter Pills */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                  {t.house_diets_label}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDiets.map((dt) => {
                    const active = isDietSelected(dt);
                    return (
                      <button
                        key={dt}
                        type="button"
                        onClick={() => toggleDiet(dt)}
                        className={`h-[44px] px-3.5 rounded-full text-xs sm:text-sm font-bold transition-all tap-spring border-2 flex items-center gap-2 shadow-xs shrink-0 ${
                          active
                            ? 'bg-[#F0F7F3] border-[#4E986B] text-[#1E4638] shadow-sm'
                            : 'bg-white border-[#EBE3D5] text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <DietaryIcon type={dt} className="w-5 h-5 shrink-0" />
                        <span>{dt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 px-6 border-t border-stone-100 bg-[#FFFBF2] flex gap-3 safe-bottom">
              <Button
                variant="glass"
                onClick={() => setIsAddMemberOpen(false)}
                className="flex-1 !h-11 !rounded-2xl !bg-stone-100 !text-stone-700 text-xs font-bold"
              >
                <span>{t.house_cancel_btn}</span>
              </Button>
              <Button
                variant="filled"
                tint="#B8381D"
                onClick={handleCreateMember}
                disabled={!newMemberName.trim()}
                className="flex-1 !h-11 !rounded-2xl !text-white text-xs font-bold shadow-md disabled:opacity-50"
              >
                <span>{t.house_save_member_btn}</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* LOGOUT CONFIRMATION DIALOG                                   */}
      {/* ============================================================ */}
      {isLogoutDialogOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLogoutDialogOpen(false)}
        >
          <div 
            className="w-full max-w-xs bg-white rounded-3xl p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-base text-stone-900">
                {t.logout_modal_title}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                {t.logout_modal_desc}
              </p>
            </div>
            <div className="flex gap-2.5 pt-1">
              <Button
                variant="glass"
                onClick={() => setIsLogoutDialogOpen(false)}
                className="flex-1 !py-2.5 !rounded-xl !bg-stone-100 !text-stone-700 text-xs font-bold"
              >
                <span>{t.logout_stay_btn}</span>
              </Button>
              <Button
                variant="filled"
                tint="#B8381D"
                onClick={() => setIsLogoutDialogOpen(false)}
                className="flex-1 !py-2.5 !rounded-xl !text-white text-xs font-bold shadow-sm"
              >
                <span>{t.logout_confirm_btn}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
