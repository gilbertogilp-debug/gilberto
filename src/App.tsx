import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Home Landing Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategorySection } from './components/home/CategorySection';
import { RecentTemplates } from './components/home/RecentTemplates';
import { BenefitsSection } from './components/home/BenefitsSection';
import { PricingSection } from './components/home/PricingSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FaqSection } from './components/home/FaqSection';
import { DemoModal } from './components/home/DemoModal';

// Common Modals & Overlays & Mobile Controls
import { AuthModal } from './components/common/AuthModal';
import { CanvaModal } from './components/common/CanvaModal';
import { CheckoutModal } from './components/common/CheckoutModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { Toast } from './components/common/Toast';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { AndroidInstallModal } from './components/common/AndroidInstallModal';
import { SideToolbarDrawer } from './components/common/SideToolbarDrawer';

// Client Area Components
import { ClientSidebar } from './components/client/ClientSidebar';
import { ClientPresentation } from './components/client/ClientPresentation';
import { ClientDashboard } from './components/client/ClientDashboard';
import { ClientCategories } from './components/client/ClientCategories';
import { ClientFavorites } from './components/client/ClientFavorites';
import { ClientDownloads } from './components/client/ClientDownloads';
import { ClientProfile } from './components/client/ClientProfile';
import { ClientAffiliates } from './components/client/ClientAffiliates';
import { ClientSupport } from './components/client/ClientSupport';

// Admin Panel Components
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminClients } from './components/admin/AdminClients';
import { AdminTemplates } from './components/admin/AdminTemplates';
import { AdminCategories } from './components/admin/AdminCategories';
import { AdminSubscriptions } from './components/admin/AdminSubscriptions';
import { AdminPayments } from './components/admin/AdminPayments';
import { AdminReports } from './components/admin/AdminReports';
import { AdminCoupons } from './components/admin/AdminCoupons';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';
import { AdminSettings } from './components/admin/AdminSettings';

const MainLayout: React.FC = () => {
  const { viewMode, clientTab, adminTab } = useApp();
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 overflow-x-hidden">
      
      {/* Background Ambient Glowing Orbs for Frosted Glass Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-purple-500/20 dark:bg-purple-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />
      </div>

      <div className="relative z-10 pb-20 md:pb-0">
        {/* 1. PUBLIC LANDING PAGE */}
        {viewMode === 'home' && (
          <div className="flex flex-col min-h-screen">
            <Navbar onOpenAndroidInstall={() => setIsAndroidModalOpen(true)} />
            <main className="flex-1 pb-16 md:pb-0">
              <HeroBanner />
              <CategorySection />
              <RecentTemplates />
              <BenefitsSection />
              <PricingSection />
              <TestimonialsSection />
              <FaqSection />
            </main>
            <Footer />
          </div>
        )}

        {/* 2. CLIENT AREA DASHBOARD */}
        {viewMode === 'client' && (
          <div className="flex flex-col md:flex-row min-h-screen">
            <ClientSidebar />
            <main className="flex-1 p-4 md:p-10 pb-28 md:pb-10 overflow-y-auto max-w-7xl mx-auto w-full">
              {clientTab === 'presentation' && <ClientPresentation />}
              {clientTab === 'dashboard' && <ClientDashboard />}
              {clientTab === 'categories' && <ClientCategories />}
              {clientTab === 'favorites' && <ClientFavorites />}
              {clientTab === 'downloads' && <ClientDownloads />}
              {clientTab === 'profile' && <ClientProfile />}
              {clientTab === 'affiliates' && <ClientAffiliates />}
              {clientTab === 'support' && <ClientSupport />}
            </main>
          </div>
        )}

        {/* 3. ADMIN PANEL */}
        {viewMode === 'admin' && (
          <div className="flex flex-col md:flex-row min-h-screen bg-slate-950/80 text-slate-100 backdrop-blur-md">
            <AdminSidebar />
            <main className="flex-1 p-4 md:p-10 pb-28 md:pb-10 overflow-y-auto max-w-7xl mx-auto w-full">
              {adminTab === 'dashboard' && <AdminDashboard />}
              {adminTab === 'clients' && <AdminClients />}
              {adminTab === 'templates' && <AdminTemplates />}
              {adminTab === 'categories' && <AdminCategories />}
              {adminTab === 'subscriptions' && <AdminSubscriptions />}
              {adminTab === 'payments' && <AdminPayments />}
              {adminTab === 'reports' && <AdminReports />}
              {adminTab === 'coupons' && <AdminCoupons />}
              {adminTab === 'announcements' && <AdminAnnouncements />}
              {adminTab === 'settings' && <AdminSettings />}
            </main>
          </div>
        )}

        {/* Fixed Mobile Bottom Navigation Bar for Android */}
        <MobileBottomNav onOpenAndroidInstall={() => setIsAndroidModalOpen(true)} />

        {/* Side Toolbar Drawer (Floating Side Tab Bar for All Functions) */}
        <SideToolbarDrawer onOpenAndroidInstall={() => setIsAndroidModalOpen(true)} />

        {/* Global Modals & Overlays */}
        <AndroidInstallModal
          isOpen={isAndroidModalOpen}
          onClose={() => setIsAndroidModalOpen(false)}
        />
        <AuthModal />
        <CanvaModal />
        <CheckoutModal />
        <NotificationDrawer />
        <QuickSearchModal />
        <DemoModal />
        <Toast />
      </div>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
