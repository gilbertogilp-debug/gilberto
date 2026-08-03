import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Home, ChevronRight, LayoutDashboard, Folder, Heart, User, Sparkles, Download, HelpCircle, Share2 } from 'lucide-react';
import { ClientTab } from '../../types';

export const ClientTopBar: React.FC = () => {
  const {
    viewMode,
    clientTab,
    setClientTab,
    setViewMode,
    goBack,
    previousPageName
  } = useApp();

  const tabLabels: Record<ClientTab, string> = {
    presentation: 'Apresentação de Artes',
    dashboard: 'Logística da Conta',
    categories: 'Categorias',
    favorites: 'Meus Favoritos',
    downloads: 'Meus Downloads',
    profile: 'Meu Perfil & Foto',
    affiliates: 'Afiliados',
    support: 'Suporte VIP'
  };

  const currentTitle = tabLabels[clientTab] || 'Área do Cliente';

  return (
    <div className="mb-6 p-3.5 sm:p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
      {/* Left side: Back Button & Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Universal Back Button */}
        <button
          onClick={goBack}
          className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 text-slate-800 dark:text-slate-100 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:-translate-x-1 active:translate-x-0"
          title="Voltar para a página anterior"
        >
          <ArrowLeft className="w-4 h-4 text-purple-600 dark:text-purple-400 stroke-[2.5]" />
          <span>Voltar {previousPageName ? `(${previousPageName})` : ''}</span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-800" />

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <button
            onClick={() => setViewMode('home')}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1 cursor-pointer font-bold"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Início</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300 font-semibold">Área do Cliente</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-purple-600 dark:text-purple-400 font-extrabold">{currentTitle}</span>
        </div>
      </div>

      {/* Right side: Quick Jump Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          onClick={() => setClientTab('presentation')}
          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
            clientTab === 'presentation'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Apresentação</span>
        </button>

        <button
          onClick={() => setClientTab('dashboard')}
          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
            clientTab === 'dashboard'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Painel</span>
        </button>

        <button
          onClick={() => setClientTab('categories')}
          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
            clientTab === 'categories'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Folder className="w-3.5 h-3.5" />
          <span>Categorias</span>
        </button>

        <button
          onClick={() => setClientTab('favorites')}
          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
            clientTab === 'favorites'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Favoritos</span>
        </button>

        <button
          onClick={() => setClientTab('profile')}
          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
            clientTab === 'profile'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Perfil</span>
        </button>
      </div>
    </div>
  );
};
