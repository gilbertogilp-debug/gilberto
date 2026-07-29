import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Sparkles, Layers, ArrowRight, Search } from 'lucide-react';

export const DemoModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, templates, setPreviewTemplate, setCheckoutPlan } = useApp();
  const [filter, setFilter] = useState('todos');

  if (!isDemoModalOpen) return null;

  const demoList = filter === 'todos'
    ? templates.slice(0, 6)
    : templates.filter((t) => t.format.toLowerCase() === filter.toLowerCase()).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Play className="w-5 h-5 fill-purple-600 dark:fill-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Demonstração Interativa do Catálogo
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Experimente como funciona a busca e o redirecionamento instantâneo para o Canva.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category / Format Filters */}
        <div className="my-4 flex items-center gap-2 overflow-x-auto pb-1">
          {['todos', 'feed', 'story', 'reels', 'carrossel'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Demo Templates Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-4 p-1">
          {demoList.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => {
                setIsDemoModalOpen(false);
                setPreviewTemplate(tpl);
              }}
              className="group relative rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all p-2"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-950">
                <img
                  src={tpl.imageUrl}
                  alt={tpl.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                  {tpl.format}
                </span>
              </div>
              <div className="p-2 space-y-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {tpl.title}
                </p>
                <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                  {tpl.categoryName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Gostou da demonstração? Assine e libere acesso a +1.480 modelos!
          </p>
          <button
            onClick={() => {
              setIsDemoModalOpen(false);
              setCheckoutPlan('Anual');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
          >
            <span>Liberar Acesso Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
