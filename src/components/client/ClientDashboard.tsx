import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search, Filter, Heart, Download, Sparkles, Layers, Star,
  TrendingUp, Clock, Grid, ChevronRight, ExternalLink
} from 'lucide-react';
import { getCategoryIcon } from '../../utils/iconHelper';

export const ClientDashboard: React.FC = () => {
  const {
    templates,
    categories,
    favorites,
    currentUser,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedFormat,
    setSelectedFormat,
    setPreviewTemplate,
    isFavorite,
    toggleFavorite,
    setClientTab
  } = useApp();

  const [activeTab, setActiveTab] = useState<'todos' | 'favoritos' | 'populares' | 'novos'>('todos');

  // Filter logic
  let filtered = templates.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchCategory = selectedCategory === 'all' || t.categoryId === selectedCategory;
    const matchFormat = selectedFormat === 'all' || t.format === selectedFormat;

    if (activeTab === 'favoritos') {
      return matchSearch && matchCategory && matchFormat && favorites.includes(t.id);
    }
    return matchSearch && matchCategory && matchFormat;
  });

  if (activeTab === 'populares') {
    filtered = [...filtered].sort((a, b) => b.downloadsCount - a.downloadsCount);
  } else if (activeTab === 'novos') {
    filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const mostDownloaded = [...templates].sort((a, b) => b.downloadsCount - a.downloadsCount).slice(0, 4);
  const latestAdded = [...templates].filter((t) => t.isNew).slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Olá, {currentUser?.name || 'Cliente Impulsio'}!
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sua Biblioteca Completa de Templates
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 opacity-90">
            Pesquise por nicho, escolha o formato e edite instantaneamente no Canva.
          </p>
        </div>

        {/* User Stats Quick Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <p className="text-[10px] uppercase font-bold text-blue-200">Favoritos</p>
            <p className="text-lg font-black">{favorites.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <p className="text-[10px] uppercase font-bold text-blue-200">Downloads</p>
            <p className="text-lg font-black">{currentUser?.downloadsHistory?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Smart Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquise por nome, palavra-chave ou nicho... (ex: Hamburguer, Black Friday, Stories)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Format Selector Dropdown */}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full md:w-48 py-3 px-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:outline-none"
          >
            <option value="all">Todos os Formatos</option>
            <option value="Feed">Feed (1080x1080)</option>
            <option value="Story">Story (1080x1920)</option>
            <option value="Reels">Reels (Vídeo)</option>
            <option value="Carrossel">Carrossel (Slides)</option>
          </select>
        </div>

        {/* Category Filter Pills horizontal bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Todas as Categorias
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog View with Sub-tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'todos', label: 'Todos os Templates' },
              { id: 'favoritos', label: `Favoritos (${favorites.length})` },
              { id: 'populares', label: 'Mais Baixados' },
              { id: 'novos', label: 'Últimos Adicionados' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-semibold hidden md:inline">
            Exibindo {filtered.length} templates
          </span>
        </div>

        {/* Templates Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Nenhum template encontrado com os filtros selecionados
            </h3>
            <p className="text-xs text-slate-500">
              Tente redefinir a busca ou mudar a categoria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedFormat('all');
                setActiveTab('todos');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((tpl) => {
              const favorite = isFavorite(tpl.id);

              return (
                <div
                  key={tpl.id}
                  className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-950">
                    <img
                      src={tpl.imageUrl}
                      alt={tpl.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Format Tag & Favorite Button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md shadow-md flex items-center gap-1">
                        <Layers className="w-3 h-3" /> {tpl.format}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tpl.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          favorite
                            ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                            : 'bg-slate-950/60 text-slate-300 hover:text-rose-500 border border-slate-700/50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>

                    {/* Quick Edit Overlay */}
                    <div
                      onClick={() => setPreviewTemplate(tpl)}
                      className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-4"
                    >
                      <button className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                        <Sparkles className="w-4 h-4 text-blue-600" /> Editar no Canva
                      </button>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                        <span>{tpl.categoryName}</span>
                        <span className="flex items-center gap-1 text-slate-400 text-[10px]">
                          <Download className="w-3 h-3" /> {tpl.downloadsCount}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                        {tpl.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setPreviewTemplate(tpl)}
                      className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-xs hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Editar no Canva</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
