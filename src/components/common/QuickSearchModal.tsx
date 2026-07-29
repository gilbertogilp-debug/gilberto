import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Layers, ExternalLink, Sparkles, Tag } from 'lucide-react';

export const QuickSearchModal: React.FC = () => {
  const { isQuickSearchOpen, setIsQuickSearchOpen, templates, setPreviewTemplate } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen(!isQuickSearchOpen);
      }
      if (e.key === 'Escape' && isQuickSearchOpen) {
        setIsQuickSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickSearchOpen, setIsQuickSearchOpen]);

  if (!isQuickSearchOpen) return null;

  const filtered = query.trim()
    ? templates.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          t.format.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : templates.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all">
        {/* Search Input bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Pesquisar por título, categoria ou tag... (ex: Hamburguer, Black Friday, Stories)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none placeholder-slate-400"
          />
          <button
            onClick={() => setIsQuickSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {query.trim() ? `Resultados (${filtered.length})` : 'Templates Sugeridos'}
          </p>

          {filtered.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-6">Nenhum template encontrado para "{query}".</p>
          ) : (
            filtered.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => {
                  setPreviewTemplate(tpl);
                  setIsQuickSearchOpen(false);
                }}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={tpl.imageUrl}
                    alt={tpl.title}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {tpl.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        {tpl.categoryName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
                        {tpl.format}
                      </span>
                    </div>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Pressione <strong>ESC</strong> para fechar</span>
          <span>Dica: Use palavras como "Reels" ou "Feed"</span>
        </div>
      </div>
    </div>
  );
};
