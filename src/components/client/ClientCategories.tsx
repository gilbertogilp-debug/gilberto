import React from 'react';
import { useApp } from '../../context/AppContext';
import { getCategoryIcon } from '../../utils/iconHelper';
import { ArrowRight, Sparkles } from 'lucide-react';

export const ClientCategories: React.FC = () => {
  const { categories, setSelectedCategory, setClientTab } = useApp();

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setClientTab('dashboard');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Todas as Categorias ({categories.length})
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selecione um segmento para filtrar os templates diretamente na sua biblioteca.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3.5 rounded-2xl border ${cat.color}`}>
                {getCategoryIcon(cat.iconName, 'w-6 h-6')}
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {cat.templateCount} artes
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Ver Templates da Categoria</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
