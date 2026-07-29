import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ExternalLink, Heart, Download, Tag, Sparkles, CheckCircle2, ShieldCheck, Layers } from 'lucide-react';

export const CanvaModal: React.FC = () => {
  const { previewTemplate, setPreviewTemplate, isFavorite, toggleFavorite, recordDownload } = useApp();

  if (!previewTemplate) return null;

  const handleEditOnCanva = () => {
    recordDownload(previewTemplate);
    window.open(previewTemplate.canvaUrl, '_blank', 'noopener,noreferrer');
  };

  const favorite = isFavorite(previewTemplate.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all">
        {/* Close button */}
        <button
          onClick={() => setPreviewTemplate(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900/90 transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

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

            {/* Downloads count */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>{previewTemplate.downloadsCount} downloads</span>
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
                  className={`p-2 rounded-full border transition-colors ${
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

              {/* Instructions */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>Como usar este template:</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pl-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    1. Clique em "Editar no Canva" abaixo.
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    2. O Canva abrirá e solicitará cópia para sua conta.
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    3. Altere imagens, cores e textos livremente.
                  </li>
                </ul>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                onClick={handleEditOnCanva}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span>Editar no Canva</span>
                <ExternalLink className="w-5 h-5 text-white/80" />
              </button>
              
              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-center gap-1">
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
