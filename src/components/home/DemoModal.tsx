import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Sparkles, Layers, ArrowRight, Search, ArrowLeft } from 'lucide-react';

export const DemoModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, templates, setPreviewTemplate, setCheckoutPlan, demoDownloadsCount, isLoggedIn, viewMode, setViewMode } = useApp();
  const [filter, setFilter] = useState('todos');

  if (!isDemoModalOpen) return null;

  const handleClose = () => {
    setIsDemoModalOpen(false);
  };

  const demoList = filter === 'todos'
    ? templates.slice(0, 6)
    : templates.filter((t) => t.format.toLowerCase() === filter.toLowerCase()).slice(0, 6);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-6 md:p-8 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white text-xs font-bold flex items-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Play className="w-5 h-5 fill-purple-600 dark:fill-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Área de Teste de Demonstração (3 Artes)
                  </h2>
                  {!isLoggedIn && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      demoDownloadsCount >= 3
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/30'
                    }`}>
                      {demoDownloadsCount >= 3 ? 'Limite Atingido: 3/3 Artes' : `Teste: ${demoDownloadsCount}/3 Artes Usadas`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Como visitante, você pode testar a edição no Canva para até 3 artes antes de assinar.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner for visitors */}
        {!isLoggedIn && (
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span>
                {demoDownloadsCount >= 3
                  ? 'Você concluiu os 3 testes de demonstração. Escolha um plano para ter acesso ilimitado a +1.480 artes!'
                  : `Você tem ${3 - demoDownloadsCount} teste(s) de edição no Canva restante(s). Clique em qualquer arte abaixo para testar!`
                }
              </span>
            </div>
            {demoDownloadsCount >= 3 && (
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  setCheckoutPlan('Anual');
                }}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex-shrink-0 cursor-pointer"
              >
                Assinar Agora
              </button>
            )}
          </div>
        )}

        {/* Category / Format Filters */}
        <div className="my-4 flex items-center gap-2 overflow-x-auto pb-1">
          {['todos', 'feed', 'story', 'reels', 'carrossel'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
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
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Página Anterior</span>
          </button>

          <button
            onClick={() => {
              setIsDemoModalOpen(false);
              setCheckoutPlan('Anual');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Liberar Acesso Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

