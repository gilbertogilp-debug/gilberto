import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ExternalLink, Heart, Download, Tag, Sparkles, CheckCircle2, ShieldCheck, Layers, Lock, CreditCard, ArrowLeft } from 'lucide-react';

export const CanvaModal: React.FC = () => {
  const { previewTemplate, setPreviewTemplate, isFavorite, toggleFavorite, recordDownload, isLoggedIn, setCheckoutPlan, showToast, demoDownloadsCount, viewMode, setViewMode } = useApp();

  if (!previewTemplate) return null;

  const handleEditOnCanva = () => {
    const success = recordDownload(previewTemplate);
    if (success) {
      window.open(previewTemplate.canvaUrl, '_blank', 'noopener,noreferrer');
      setPreviewTemplate(null);
    }
  };

  const handleClose = () => {
    setPreviewTemplate(null);
  };

  const favorite = isFavorite(previewTemplate.id);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all my-8">
        
        {/* Top Navigation Bar with Back Button */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80">
          <button
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer border border-slate-200 dark:border-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Página Anterior</span>
          </button>

          <button
            onClick={handleClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Fechar e voltar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image preview area */}
          <div className="relative bg-slate-950 flex items-center justify-center p-6 min-h-[300px] md:min-h-[420px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none" />
            <img
              src={previewTemplate.imageUrl}
              alt={previewTemplate.title}
              className="max-h-[360px] w-auto object-contain rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Format Tag */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-lg flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              {previewTemplate.format}
            </div>

            {/* Lock / Unlocked Status Badge */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
              {isLoggedIn ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Download Liberado</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">Amostra de Demonstração</span>
                </>
              )}
            </div>
          </div>

          {/* Details area */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  {previewTemplate.categoryName}
                </span>

                <button
                  onClick={() => toggleFavorite(previewTemplate.id)}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    favorite
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 border-slate-200 dark:border-slate-700'
                  }`}
                  title={favorite ? 'Remover dos favoritos' : 'Favoritar'}
                >
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {previewTemplate.title}
              </h2>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {previewTemplate.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {previewTemplate.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <Tag className="w-3 h-3 text-slate-400" />
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Access Condition Box */}
              {!isLoggedIn ? (
                <div className="mt-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700 dark:text-blue-300">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>Modelo Editável no Canva</span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-600 dark:text-blue-300">
                      Link Direto
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Ao clicar no botão abaixo, a página editável deste modelo será aberta em uma nova aba no Canva para você personalizar.
                  </p>
                </div>
              ) : (
                <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Seu plano está ativo e o download está liberado!</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Clique no botão abaixo para abrir a cópia editável desta arte diretamente na sua conta do Canva.
                  </p>
                </div>
              )}
            </div>

            {/* Primary Action & Return Buttons */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleEditOnCanva}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-purple-500/25 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span>Abrir e Editar no Canva</span>
                <ExternalLink className="w-5 h-5 text-white/80" />
              </button>

              {/* Secondary Return Button */}
              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500" />
                <span>Voltar para a Página Anterior</span>
              </button>
              
              <p className="text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Funciona em contas do Canva Grátis e Canva Pro
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

