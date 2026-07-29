import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles, Search, Sun, Moon, Bell, User, LayoutDashboard,
  ShieldAlert, Menu, X, ArrowRight, LogOut, CheckCircle2, Smartphone
} from 'lucide-react';

export const Navbar: React.FC<{
  onOpenAndroidInstall?: () => void;
}> = ({ onOpenAndroidInstall }) => {
  const {
    viewMode,
    setViewMode,
    isDarkMode,
    toggleDarkMode,
    currentUser,
    switchRole,
    logout,
    setIsQuickSearchOpen,
    setIsNotificationDrawerOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    setCheckoutPlan,
    announcements,
    setSelectedCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = announcements.filter((a) => !a.read).length;

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (viewMode !== 'home') {
      setViewMode('home');
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick()}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Impulsio <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Templates</span>
            </span>
            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
              BIBLIOTECA CANVA PRO
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => handleNavClick()}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            Início
          </button>
          <button
            onClick={() => {
              setSelectedCategory('all');
              handleNavClick('categorias');
            }}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            Categorias
          </button>
          <button
            onClick={() => handleNavClick('planos')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            Planos
          </button>
          <button
            onClick={() => handleNavClick('suporte')}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            Suporte
          </button>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Android App Badge Button */}
          {onOpenAndroidInstall && (
            <button
              onClick={onOpenAndroidInstall}
              className="px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Baixar ou Instalar o App para Celular Android"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              <span>App Android</span>
            </button>
          )}

          {/* Quick Search Trigger */}
          <button
            onClick={() => setIsQuickSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
            title="Pesquisa rápida (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Buscar...</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            title="Alternar Modo Claro / Escuro"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            title="Notificações e Avisos"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Account / Role / Login Options */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              {/* Role Toggle shortcut */}
              <button
                onClick={switchRole}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                title={`Alternar para ${currentUser.role === 'admin' ? 'Área do Cliente' : 'Painel Admin'}`}
              >
                {currentUser.role === 'admin' ? (
                  <>
                    <User className="w-3.5 h-3.5" /> Modo Cliente
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5" /> Painel Admin
                  </>
                )}
              </button>

              {/* Go to Dashboard button */}
              <button
                onClick={() => setViewMode(currentUser.role === 'admin' ? 'admin' : 'client')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={() => setCheckoutPlan('Anual')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Assinar Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {onOpenAndroidInstall && (
            <button
              onClick={onOpenAndroidInstall}
              className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold"
              title="App Android"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick()}
              className="text-left py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Início
            </button>
            <button
              onClick={() => handleNavClick('categorias')}
              className="text-left py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Categorias
            </button>
            <button
              onClick={() => handleNavClick('planos')}
              className="text-left py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Planos
            </button>
            <button
              onClick={() => handleNavClick('suporte')}
              className="text-left py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              Suporte
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            {onOpenAndroidInstall && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAndroidInstall();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" /> Instalar App no Celular Android
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsQuickSearchOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Pesquisar Templates...</span>
            </button>

            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setViewMode(currentUser.role === 'admin' ? 'admin' : 'client');
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Ir para Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    switchRole();
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-xs border border-purple-500/20"
                >
                  Alternar modo Admin / Cliente
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCheckoutPlan('Anual');
                  }}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Assinar Agora
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
