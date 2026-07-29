import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home, Folder, Heart, Download, User, LayoutDashboard,
  Search, Menu, X, Smartphone, ShieldAlert, Sparkles, LogOut,
  Sun, Moon, Share2, HelpCircle, ChevronRight, Wrench
} from 'lucide-react';
import { ClientTab, AdminTab } from '../../types';

export const MobileBottomNav: React.FC<{
  onOpenAndroidInstall: () => void;
}> = ({ onOpenAndroidInstall }) => {
  const {
    viewMode, setViewMode,
    clientTab, setClientTab,
    adminTab, setAdminTab,
    enterAdminMode, setIsSideToolbarOpen,
    isLoggedIn, currentUser, logout,
    setIsAuthModalOpen, setIsQuickSearchOpen,
    isDarkMode, toggleDarkMode
  } = useApp();

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <>
      {/* 1. MOBILE DRAWER OVERLAY (Triggers from 'Menu' tab on mobile) */}
      {isMobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-4/5 max-w-xs h-full bg-slate-900 border-l border-slate-800 text-slate-100 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 shadow-2xl">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm">Impulsio App</h4>
                    <p className="text-[10px] text-slate-400">Versão Android PWA</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Card */}
              {isLoggedIn ? (
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-400/40 shadow-md flex items-center justify-center shrink-0">
                    {currentUser?.avatarUrl ? (
                      <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="w-full h-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-sm">
                        {currentUser?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-white">{currentUser?.name}</p>
                    <p className="text-[10px] text-blue-400 truncate font-semibold">{currentUser?.email}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3 mb-6 rounded-2xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                >
                  <User className="w-4 h-4" /> Entrar ou Criar Conta
                </button>
              )}

              {/* Navigation Items in Drawer */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider px-2 mb-1">Menu Principal</p>

                <button
                  onClick={() => {
                    setViewMode('home');
                    setIsMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
                    viewMode === 'home' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-blue-400" />
                    <span>Início / Loja</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => {
                    setViewMode('client');
                    setClientTab('dashboard');
                    setIsMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
                    viewMode === 'client' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span>Área do Cliente</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Admin Direct Mobile Editing Shortcut */}
                {currentUser?.role === 'admin' && (
                  <>
                    <button
                      onClick={() => {
                        setIsMobileDrawerOpen(false);
                        enterAdminMode('dashboard');
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/30 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="w-4 h-4 text-emerald-300" />
                        <span>Editar no Celular (Admin)</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileDrawerOpen(false);
                        setIsSideToolbarOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/40 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Wrench className="w-4 h-4 text-purple-400" />
                        <span>Barra de Ferramentas Admin</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                    </button>
                  </>
                )}

                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => {
                      setViewMode('admin');
                      setAdminTab('dashboard');
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold ${
                      viewMode === 'admin' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-4 h-4 text-purple-400" />
                      <span>Painel Admin</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                )}

                {/* Extended Client Links */}
                {viewMode === 'client' && (
                  <>
                    <div className="pt-3 pb-1">
                      <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider px-2">Recursos da Conta</p>
                    </div>

                    <button
                      onClick={() => { setClientTab('affiliates'); setIsMobileDrawerOpen(false); }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <Share2 className="w-4 h-4 text-purple-400" />
                        <span>Programa de Afiliados (30%)</span>
                      </div>
                    </button>

                    <button
                      onClick={() => { setClientTab('support'); setIsMobileDrawerOpen(false); }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-blue-400" />
                        <span>Suporte VIP WhatsApp</span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Controls in Drawer */}
            <div className="pt-6 border-t border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  onOpenAndroidInstall();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" /> Instalar App no Android
              </button>

              <button
                onClick={toggleDarkMode}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 font-medium text-xs flex items-center justify-center gap-2"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-yellow-400" /> Tema Claro
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-blue-400" /> Tema Escuro
                  </>
                )}
              </button>

              {isLoggedIn && (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileDrawerOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-rose-400 hover:bg-rose-500/10 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sair da Conta
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2. FIXED STICKY BOTTOM NAVIGATION BAR FOR MOBILE ANDROID */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 pt-2 pb-safe shadow-2xl transition-all">
        <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
          
          {/* HOME VIEW BOTTOM NAV */}
          {viewMode === 'home' && (
            <>
              <button
                onClick={() => setViewMode('home')}
                className="flex flex-col items-center gap-1 py-1 px-2 text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] font-extrabold tracking-tight">Início</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('client');
                  setClientTab('categories');
                }}
                className="flex flex-col items-center gap-1 py-1 px-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                <Folder className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-tight">Categorias</span>
              </button>

              <button
                onClick={() => setIsQuickSearchOpen(true)}
                className="flex flex-col items-center gap-1 -mt-5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-white dark:border-slate-900 active:scale-95 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Busca</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('client');
                  setClientTab('favorites');
                }}
                className="flex flex-col items-center gap-1 py-1 px-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                <Heart className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-tight">Favoritos</span>
              </button>

              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="flex flex-col items-center gap-1 py-1 px-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-tight">Menu</span>
              </button>
            </>
          )}

          {/* CLIENT VIEW BOTTOM NAV */}
          {viewMode === 'client' && (
            <>
              <button
                onClick={() => setClientTab('dashboard')}
                className={`flex flex-col items-center gap-1 py-1 px-2 cursor-pointer ${
                  clientTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-[10px] tracking-tight">Painel</span>
              </button>

              <button
                onClick={() => setClientTab('categories')}
                className={`flex flex-col items-center gap-1 py-1 px-2 cursor-pointer ${
                  clientTab === 'categories' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Folder className="w-5 h-5" />
                <span className="text-[10px] tracking-tight">Catálogo</span>
              </button>

              <button
                onClick={() => setClientTab('downloads')}
                className="flex flex-col items-center gap-1 -mt-5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-white dark:border-slate-900 active:scale-95 transition-transform">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Downloads</span>
              </button>

              <button
                onClick={() => setClientTab('favorites')}
                className={`flex flex-col items-center gap-1 py-1 px-2 cursor-pointer ${
                  clientTab === 'favorites' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="text-[10px] tracking-tight">Favoritos</span>
              </button>

              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="flex flex-col items-center gap-1 py-1 px-2 text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
                <span className="text-[10px] tracking-tight">Mais</span>
              </button>
            </>
          )}

          {/* ADMIN VIEW BOTTOM NAV */}
          {viewMode === 'admin' && (
            <>
              <button
                onClick={() => setAdminTab('dashboard')}
                className={`flex flex-col items-center gap-1 py-1 px-2 cursor-pointer ${
                  adminTab === 'dashboard' ? 'text-purple-500 font-bold' : 'text-slate-400'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-[10px]">Painel</span>
              </button>

              <button
                onClick={() => setAdminTab('templates')}
                className={`flex flex-col items-center gap-1 py-1 px-2 cursor-pointer ${
                  adminTab === 'templates' ? 'text-purple-500 font-bold' : 'text-slate-400'
                }`}
              >
                <Folder className="w-5 h-5" />
                <span className="text-[10px]">Templates</span>
              </button>

              <button
                onClick={() => setAdminTab('clients')}
                className="flex flex-col items-center gap-1 -mt-5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 border-2 border-slate-900 active:scale-95 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-300">Clientes</span>
              </button>

              <button
                onClick={() => setAdminTab('payments')}
                className={`flex flex-col items-center gap-1 py-1 px-2 cursor-pointer ${
                  adminTab === 'payments' ? 'text-purple-500 font-bold' : 'text-slate-400'
                }`}
              >
                <Download className="w-5 h-5" />
                <span className="text-[10px]">Vendas</span>
              </button>

              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="flex flex-col items-center gap-1 py-1 px-2 text-slate-400 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
                <span className="text-[10px]">Menu</span>
              </button>
            </>
          )}

        </div>
      </nav>
    </>
  );
};
