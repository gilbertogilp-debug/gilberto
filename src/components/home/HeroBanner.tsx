import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Play, CheckCircle2, Layers, Download, Star, Flame } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setCheckoutPlan, setIsDemoModalOpen, templates, setPreviewTemplate } = useApp();

  const showcaseTemplates = templates.slice(0, 4);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/20 via-purple-600/25 to-pink-600/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase shadow-inner">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
              <span>Biblioteca #1 de Templates para Canva</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Milhares de Templates{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Editáveis para Canva
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Economize tempo criando posts profissionais em poucos minutos. Aumente o engajamento do seu negócio com artes em formato Feed, Story, Reels e Carrossel.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setCheckoutPlan('Anual')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Assinar Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 flex items-center justify-center gap-2.5 transition-all cursor-pointer backdrop-blur-md"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span>Ver Demonstração</span>
              </button>
            </div>

            {/* Key Value Bullets */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> +1.480 Templates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Links Diretos no Canva
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Canva Grátis ou Pro
              </span>
            </div>
          </div>

          {/* Right Floating Showcase Grid */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              {showcaseTemplates.map((tpl, idx) => (
                <div
                  key={tpl.id}
                  onClick={() => setPreviewTemplate(tpl)}
                  className={`group relative overflow-hidden rounded-2xl bg-slate-800/60 border border-slate-700/60 p-2.5 shadow-2xl cursor-pointer hover:border-blue-500/50 transition-all duration-300 ${
                    idx % 2 === 1 ? 'translate-y-4 md:translate-y-6' : ''
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-900">
                    <img
                      src={tpl.imageUrl}
                      alt={tpl.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    
                    {/* Format Badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md">
                      {tpl.format}
                    </span>

                    {/* Quick hover trigger */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                      <span className="px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Ver
                      </span>
                    </div>
                  </div>

                  <div className="p-2 space-y-1">
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {tpl.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{tpl.categoryName}</span>
                      <span className="flex items-center gap-0.5 text-yellow-400 font-bold">
                        <Star className="w-3 h-3 fill-yellow-400" /> {tpl.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Banner Tag */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900/90 border border-purple-500/30 backdrop-blur-md p-3 rounded-2xl shadow-2xl hidden sm:flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Atualizações Semanalmente</p>
                <p className="text-[10px] text-slate-400">Novos templates adicionados toda semana</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
