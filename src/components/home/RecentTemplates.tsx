import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart, Download, ExternalLink, Star, Layers } from 'lucide-react';

export const RecentTemplates: React.FC = () => {
  const { templates, setPreviewTemplate, isFavorite, toggleFavorite } = useApp();
  const [activeFormat, setActiveFormat] = useState<string>('todos');

  const filtered = activeFormat === 'todos'
    ? templates.slice(0, 8)
    : templates.filter((t) => t.format.toLowerCase() === activeFormat.toLowerCase()).slice(0, 8);

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Lançamentos Semanais
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Templates Recentes
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Confira os últimos modelos adicionados à nossa plataforma.
            </p>
          </div>

          {/* Format Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {['todos', 'feed', 'story', 'reels', 'carrossel'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveFormat(fmt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeFormat === fmt
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((tpl) => {
            const favorite = isFavorite(tpl.id);

            return (
              <div
                key={tpl.id}
                className="group relative rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Badges Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={tpl.imageUrl}
                    alt={tpl.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                      <Layers className="w-3 h-3" />
                      {tpl.format}
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
                      title={favorite ? 'Remover dos favoritos' : 'Favoritar'}
                    >
                      <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Hover Quick Edit Overlay */}
                  <div
                    onClick={() => setPreviewTemplate(tpl)}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-4"
                  >
                    <button className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4 text-blue-600" /> Editar no Canva
                    </button>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">
                      <span>{tpl.categoryName}</span>
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Download className="w-3 h-3" /> {tpl.downloadsCount}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {tpl.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setPreviewTemplate(tpl)}
                    className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-xs hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ver Detalhes</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
