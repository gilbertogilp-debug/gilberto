import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClientTab } from '../../types';
import {
  LayoutDashboard, Folder, Heart, Download, User, HelpCircle,
  Share2, LogOut, Sparkles, ShieldAlert, Sun, Moon
} from 'lucide-react';

export const ClientSidebar: React.FC = () => {
  const {
    clientTab,
    setClientTab,
    currentUser,
    logout,
    switchRole,
    setViewMode,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  const menuItems = [
    { id: 'presentation' as ClientTab, label: 'Apresentação de Artes', icon: Sparkles, badge: 'Novo' },
    { id: 'dashboard' as ClientTab, label: 'Logística da Conta', icon: LayoutDashboard },
    { id: 'categories' as ClientTab, label: 'Categorias', icon: Folder },
    { id: 'favorites' as ClientTab, label: 'Favoritos', icon: Heart },
    { id: 'downloads' as ClientTab, label: 'Downloads', icon: Download },
    { id: 'profile' as ClientTab, label: 'Meu Perfil & Foto', icon: User },
    { id: 'affiliates' as ClientTab, label: 'Afiliados', icon: Share2, badge: '30%' },
    { id: 'support' as ClientTab, label: 'Suporte VIP', icon: HelpCircle }
  ];

  return (
    <>
      {/* Mobile Top Header Bar for Client View */}
      <div className="md:hidden sticky top-0 z-30 w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div 
          onClick={() => setViewMode('home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-black text-white">Impulsion</span>
            <span className="text-[10px] block font-bold text-blue-400 -mt-1 uppercase">Área do Cliente</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {currentUser?.plan || 'Pro'}
          </span>
          <button
            onClick={() => setClientTab('profile')}
            className="w-8 h-8 rounded-full overflow-hidden border border-blue-400/40 shadow-md flex items-center justify-center cursor-pointer"
          >
            {currentUser?.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              <span className="w-full h-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                {currentUser?.name?.charAt(0) || 'U'}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-r border-white/40 dark:border-white/10 flex-col justify-between h-screen sticky top-0 shrink-0 transition-colors">
      <div>
        {/* Sidebar Brand */}
        <div
          onClick={() => setViewMode('home')}
          className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              Impulsion <span className="text-blue-600 dark:text-blue-400">Templates</span>
            </span>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider -mt-1">
              Área do Cliente
            </p>
          </div>
        </div>

        {/* Current Plan Badge */}
        <div className="p-4 mx-4 my-3 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Seu Plano</p>
            <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
              Plano {currentUser?.plan || 'Pro Anual'}
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Ativo
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = clientTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setClientTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    active ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Controls */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {/* Admin Switch */}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setViewMode('admin')}
            className="w-full py-2 px-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold hover:bg-purple-500/20 border border-purple-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Painel Admin
          </button>
        )}

        <button
          onClick={toggleDarkMode}
          className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-yellow-400" /> Modo Claro
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" /> Modo Escuro
            </>
          )}
        </button>

        <button
          onClick={logout}
          className="w-full py-2 px-3 rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sair
        </button>
      </div>
    </aside>
    </>
  );
};
