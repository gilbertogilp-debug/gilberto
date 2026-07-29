import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Sparkles, ExternalLink, Layers, Download } from 'lucide-react';

export const ClientFavorites: React.FC = () => {
  const { templates, favorites, isFavorite, toggleFavorite, setPreviewTemplate, setClientTab } = useApp();

  const favoriteTemplates = templates.filter((t) => favorites.includes(t.id));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            Meus Templates Favoritos <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Acesse rapidamente os modelos que você salvou para usar com frequência.
          </p>
        </div>
        <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
          {favoriteTemplates.length} Salvos
        </span>
      </div>

      {favoriteTemplates.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Nenhum template favoritado ainda
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Clique no ícone de coração nos cards dos templates para salvá-los aqui nesta lista rápida.
          </p>
          <button
            onClick={() => setClientTab('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Explorar Biblioteca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-950">
                <img
                  src={tpl.imageUrl}
                  alt={tpl.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md">
                    {tpl.format}
                  </span>

                  <button
                    onClick={() => toggleFavorite(tpl.id)}
                    className="p-2 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/40 backdrop-blur-md"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                    {tpl.categoryName}
                  </p>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    {tpl.title}
                  </h3>
                </div>

                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Editar no Canva
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
