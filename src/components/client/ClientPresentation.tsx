import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles, Eye, Download, ArrowRight, ShieldCheck, CheckCircle2,
  Layers, Palette, ExternalLink, Zap, Star, Filter, Heart, FileText, Check
} from 'lucide-react';
import { Template } from '../../types';

export const ClientPresentation: React.FC = () => {
  const { currentUser, setClientTab, templates, setPreviewTemplate, toggleFavorite, isFavorite } = useApp();
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'galeria' | 'beneficios' | 'guia'>('galeria');

  const filteredTemplates = templates.filter((t) => {
    if (selectedFormatFilter === 'all') return true;
    return t.format === selectedFormatFilter;
  });

  return (
    <div className="space-y-10 pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* WELCOME PRESENTATION BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 border border-purple-500/30 p-6 md:p-10 text-white shadow-2xl">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              Página de Apresentação das Artes
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">{currentUser?.name || 'Cliente Impulsion'}</span>!
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Bem-vindo(a) à sua vitrine exclusiva de artes. Navegue e visualize as amostras em alta definição de artes prontas para Canva antes de acessar a página de logística e downloads da sua conta.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-bold">Plano {currentUser?.plan || 'Ativo'}</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-bold">+1.480 Artes Liberadas</span>
              </div>
            </div>
          </div>

          {/* User Profile Card & Direct Account Logistics CTA */}
          <div className="w-full md:w-auto p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col items-center md:items-end text-center md:text-right gap-3 shrink-0 shadow-2xl">
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt={currentUser?.name || 'Foto do Cliente'}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 shadow-lg"
              />
              <div className="text-left">
                <p className="text-xs font-black text-white">{currentUser?.name}</p>
                <p className="text-[10px] text-purple-300 font-mono">{currentUser?.email}</p>
              </div>
            </div>

            <button
              onClick={() => setClientTab('dashboard')}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-purple-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <span>Acessar Logística da Conta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS FOR PRESENTATION PAGE */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/50 dark:border-slate-700/50">
          <button
            onClick={() => setActiveTab('galeria')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'galeria'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🎨 Vitrine de Artes ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('beneficios')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'beneficios'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ⭐ Vantagens do Plano
          </button>
          <button
            onClick={() => setActiveTab('guia')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'guia'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📖 Como Baixar no Canva
          </button>
        </div>

        {/* Action Button to Logistics */}
        <button
          onClick={() => setClientTab('dashboard')}
          className="py-2.5 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span>Ir para Logística da Conta</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* TAB 1: ARTWORKS GALLERY SHOWCASE */}
      {activeTab === 'galeria' && (
        <div className="space-y-6">
          {/* Format Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Formato:
            </span>
            {[
              { id: 'all', label: 'Todos os Formatos' },
              { id: 'Feed', label: 'Feed Quadrado (1080x1080)' },
              { id: 'Story', label: 'Story / Reels (1080x1920)' },
              { id: 'Carrossel', label: 'Carrossel Infinito' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormatFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedFormatFilter === f.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => {
              const fav = isFavorite(template.id);

              return (
                <div
                  key={template.id}
                  className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-square overflow-hidden bg-slate-950/20">
                    <img
                      src={template.imageUrl}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay Action Buttons */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="py-2.5 px-4 rounded-xl bg-white text-slate-900 text-xs font-black shadow-lg flex items-center gap-1.5 hover:bg-slate-100 transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-purple-600" /> Visualizar Arte
                      </button>

                      <button
                        onClick={() => setClientTab('dashboard')}
                        className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black shadow-lg hover:bg-emerald-400 transition-transform hover:scale-105 cursor-pointer"
                        title="Ir para logística de downloads"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Format Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                      {template.format}
                    </span>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                        fav
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-slate-900/60 text-white border-white/20 hover:bg-rose-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                        {template.categoryName}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {template.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% Editável no Canva
                      </span>

                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Ver Amostra
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PLAN BENEFITS */}
      {activeTab === 'beneficios' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Edição em 1-Clique no Canva',
              desc: 'Todas as artes são abertas diretamente na sua conta do Canva grátis ou pro.',
              icon: Zap,
              color: 'text-amber-500 bg-amber-500/10'
            },
            {
              title: 'Artes Profissionais em Alta Definição',
              desc: 'Imagens e vetores em resolução 4K prontos para redes sociais e impressão.',
              icon: Palette,
              color: 'text-blue-500 bg-blue-500/10'
            },
            {
              title: 'Logística de Downloads Descomplicada',
              desc: 'Histórico completo de downloads, busca rápida por categorias e suporte VIP.',
              icon: Layers,
              color: 'text-purple-500 bg-purple-500/10'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: CANVA QUICK GUIDE */}
      {activeTab === 'guia' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Passo a Passo Rápido para Editar suas Artes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Escolha a Arte', desc: 'Navegue pelas categorias na vitrine ou na área de logística.' },
              { num: '02', title: 'Clique em Abrir Canva', desc: 'Sua arte será aberta instantaneamente na sua conta do Canva.' },
              { num: '03', title: 'Personalize Textos e Fotos', desc: 'Troque cores, fontes e insira sua logo com facilidade.' },
              { num: '04', title: 'Baixe e Publique', desc: 'Exporte em PNG ou JPG e poste diretamente nas suas redes sociais.' }
            ].map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{step.num}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setClientTab('dashboard')}
              className="py-3 px-8 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Entendido! Ir para Logística da Minha Conta</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM CTA BANNER TO ACCESS ACCOUNT LOGISTICS */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-purple-950 text-white border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-extrabold text-white">
            Pronto para baixar e gerenciar sua conta?
          </h3>
          <p className="text-xs text-emerald-300">
            Acesse a área de logística para ver todos os seus downloads, favoritos e suporte técnico.
          </p>
        </div>

        <button
          onClick={() => setClientTab('dashboard')}
          className="py-4 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 shrink-0 cursor-pointer transition-all hover:scale-105"
        >
          <span>Acessar Logística da Minha Conta</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
