import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTab, ClientTab } from '../../types';
import {
  Wrench, X, ShieldAlert, LayoutDashboard, Layers, Folder,
  CreditCard, DollarSign, Tag, Megaphone, Settings, Users,
  BarChart3, Home, Sparkles, Heart, Download, Share2, HelpCircle,
  Search, Sun, Moon, Smartphone, Bell, ChevronRight, User, UserCheck,
  Zap, ArrowRight
} from 'lucide-react';

export const SideToolbarDrawer: React.FC<{
  onOpenAndroidInstall?: () => void;
}> = ({ onOpenAndroidInstall }) => {
  const {
    isSideToolbarOpen,
    setIsSideToolbarOpen,
    viewMode,
    setViewMode,
    clientTab,
    setClientTab,
    adminTab,
    setAdminTab,
    enterAdminMode,
    currentUser,
    switchRole,
    isDarkMode,
    toggleDarkMode,
    setIsQuickSearchOpen,
    setIsNotificationDrawerOpen,
    announcements,
    setSelectedCategory
  } = useApp();

  const unreadCount = announcements.filter((a) => !a.read).length;

  const handleAdminJump = (tab: AdminTab) => {
    enterAdminMode(tab);
    setIsSideToolbarOpen(false);
  };

  const handleClientJump = (tab: ClientTab) => {
    setViewMode('client');
    setClientTab(tab);
    setIsSideToolbarOpen(false);
  };

  const handleHomeJump = (sectionId?: string) => {
    setViewMode('home');
    setIsSideToolbarOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* FLOATING SIDE TAB TRIGGER BUTTON (Pinned to left edge - Visible ONLY for Admin) */}
      {currentUser?.role === 'admin' && (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
          <button
            onClick={() => setIsSideToolbarOpen(!isSideToolbarOpen)}
            className={`group flex items-center gap-2 py-3 px-2.5 rounded-r-2xl font-extrabold text-xs shadow-2xl transition-all duration-300 border-y border-r cursor-pointer ${
              isSideToolbarOpen
                ? 'bg-purple-600 text-white border-purple-400 translate-x-0'
                : 'bg-slate-900/90 hover:bg-purple-600 text-slate-100 hover:text-white border-purple-500/30 backdrop-blur-md shadow-purple-500/20'
            }`}
            title="Abrir Barra de Ferramentas e Atalhos do Painel Admin"
          >
            <div className="relative">
              <Wrench className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="hidden sm:inline-block [writing-mode:vertical-lr] rotate-180 text-[11px] tracking-wider uppercase font-black py-1">
              Admin
            </span>
          </button>
        </div>
      )}

      {/* BACKDROP OVERLAY */}
      {isSideToolbarOpen && (
        <div
          onClick={() => setIsSideToolbarOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        />
      )}

      {/* SLIDE-OUT SIDEBAR TOOLBAR DRAWER */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 sm:w-96 bg-slate-950 text-slate-100 border-r border-slate-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSideToolbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white tracking-tight flex items-center gap-1.5">
                Barra de Ferramentas
              </h3>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                Acesso Rápido a Todas as Funções
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSideToolbarOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE TOOLBOX BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          
          {/* CATEGORY 1: MOBILE ADMIN EDITING SECTION (ADMIN ONLY) */}
          {currentUser?.role === 'admin' && (
            <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-950/50 to-slate-900 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-300 font-black text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                  <span>Painel Admin & Edição Celular</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  ADMIN
                </span>
              </div>

              <p className="text-[11px] text-slate-300">
                Gerencie templates, categorias, valores dos planos e configurações direto do smartphone.
              </p>

              <button
                onClick={() => handleAdminJump('dashboard')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-300" />
                  <span>📱 Modo Editar no Celular</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Quick Admin Action Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleAdminJump('templates')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-900/40 text-slate-200 hover:text-white text-left transition-colors border border-slate-700/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-bold">Templates</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Criar & Editar Artes</p>
                </button>

                <button
                  onClick={() => handleAdminJump('subscriptions')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-900/40 text-slate-200 hover:text-white text-left transition-colors border border-slate-700/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] font-bold">Planos & Preços</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Editar Valores</p>
                </button>

                <button
                  onClick={() => handleAdminJump('categories')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-900/40 text-slate-200 hover:text-white text-left transition-colors border border-slate-700/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Folder className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-bold">Categorias</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Criar & Ordenar</p>
                </button>

                <button
                  onClick={() => handleAdminJump('coupons')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-900/40 text-slate-200 hover:text-white text-left transition-colors border border-slate-700/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Tag className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[11px] font-bold">Cupons</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Descontos %</p>
                </button>

                <button
                  onClick={() => handleAdminJump('settings')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-900/40 text-slate-200 hover:text-white text-left transition-colors border border-slate-700/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-[11px] font-bold">Dados PIX</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Chave & Nome</p>
                </button>

                <button
                  onClick={() => handleAdminJump('clients')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-900/40 text-slate-200 hover:text-white text-left transition-colors border border-slate-700/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] font-bold">Assinantes</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Lista e Status</p>
                </button>
              </div>
            </div>
          )}

          {/* CATEGORY 2: PUBLIC SITE NAVIGATION */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-1">
              Funções Comerciais do Site
            </p>

            <div className="space-y-1">
              <button
                onClick={() => handleHomeJump()}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-blue-400" />
                  <span>Início / Página Principal</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  handleHomeJump('categorias');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Catálogo Completo de Templates</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => handleHomeJump('planos')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Planos de Assinatura</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => handleHomeJump('suporte')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-teal-400" />
                  <span>Atendimento & Suporte VIP</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* CATEGORY 3: CLIENT / MEMBER AREA */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-1">
              Área do Cliente & Membros
            </p>

            <div className="space-y-1">
              <button
                onClick={() => handleClientJump('dashboard')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Meu Painel do Cliente</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => handleClientJump('favorites')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Meus Templates Favoritos</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => handleClientJump('downloads')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Histórico de Downloads</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => handleClientJump('affiliates')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="w-4 h-4 text-purple-400" />
                  <span>Programa de Afiliados (30% Comissão)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* CATEGORY 4: QUICK UTILITIES */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-1">
              Atalhos & Utilitários
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setIsSideToolbarOpen(false);
                  setIsQuickSearchOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-blue-400" />
                  <span>Pesquisa Rápida (Cmd + K)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                  ⌘K
                </span>
              </button>

              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Modo Claro</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-blue-400" />
                      <span>Modo Escuro</span>
                    </>
                  )}
                </div>
              </button>

              {onOpenAndroidInstall && (
                <button
                  onClick={() => {
                    setIsSideToolbarOpen(false);
                    onOpenAndroidInstall();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>Instalar App Android</span>
                  </div>
                  <span className="text-[10px] uppercase font-black text-emerald-400">PWA</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsSideToolbarOpen(false);
                  setIsNotificationDrawerOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Avisos e Notificações</span>
                </div>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                    {unreadCount} novos
                  </span>
                )}
              </button>

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => {
                    switchRole();
                    setIsSideToolbarOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-purple-950/30 text-purple-300 border border-purple-500/20 hover:bg-purple-900/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-purple-400" />
                    <span>Alternar Perfil (Admin / Cliente)</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DRAWER FOOTER */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-300">
              {currentUser?.role === 'admin' ? 'Sessão Admin Ativa' : 'Sessão Usuário'}
            </span>
          </div>

          <span className="text-[10px] font-mono text-slate-500">v2.5 Pro</span>
        </div>
      </aside>
    </>
  );
};
