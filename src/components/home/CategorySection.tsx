import React from 'react';
import { useApp } from '../../context/AppContext';
import { getCategoryIcon } from '../../utils/iconHelper';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { categories, setSelectedCategory, setViewMode, isLoggedIn, setClientTab } = useApp();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    if (isLoggedIn) {
      setViewMode('client');
      setClientTab('categories');
    } else {
      setViewMode('home');
      const el = document.getElementById('recentes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Nichos Diversificados
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Navegue por Categorias
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Encontre o estilo perfeito de post, storie ou carrossel feito sob medida para o seu segmento.
          </p>
        </div>

        {/* 18 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between"
            >
              {cat.imageUrl ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-3 transition-transform group-hover:scale-110 shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className={`p-3.5 rounded-2xl border mb-3 transition-transform group-hover:scale-110 ${cat.color}`}>
                  {getCategoryIcon(cat.iconName, 'w-6 h-6')}
                </div>
              )}

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  {cat.templateCount} artes
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              if (isLoggedIn) {
                setViewMode('client');
                setClientTab('categories');
              } else {
                setViewMode('home');
                const el = document.getElementById('recentes');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <span>Explorar Todas as Categorias</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
