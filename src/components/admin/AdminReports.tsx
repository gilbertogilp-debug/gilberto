import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Download, Eye, Layers } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { templates, categories } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Relatórios & Performance
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Métricas de engajamento, formatos mais populares e uso de templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Downloaded Categories */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Categorias Mais Populares
          </h3>
          <div className="space-y-3">
            {categories.slice(0, 5).map((cat, idx) => (
              <div key={cat.id} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{cat.name}</span>
                  <span className="text-purple-500 font-bold">{cat.templateCount} artes</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    style={{ width: `${Math.min(100, (cat.templateCount / 180) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Format Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Distribuição por Formato
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">Feed</p>
              <p className="text-xs text-slate-400">45% do catálogo</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400">Story</p>
              <p className="text-xs text-slate-400">30% do catálogo</p>
            </div>
            <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20">
              <p className="text-2xl font-black text-pink-600 dark:text-pink-400">Carrossel</p>
              <p className="text-xs text-slate-400">15% do catálogo</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Reels</p>
              <p className="text-xs text-slate-400">10% do catálogo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
