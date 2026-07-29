import React from 'react';
import { Zap, ShieldCheck, Layers, RefreshCw, Sparkles, Clock, LayoutGrid, CheckCircle } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Economize Horas de Design',
      description: 'Crie artes incríveis em menos de 3 minutos sem precisar começar do zero nem contratar designers caros.'
    },
    {
      icon: ShieldCheck,
      title: 'Funciona no Canva Grátis e Pro',
      description: 'Todos os templates utilizam elementos 100% gratuitos do Canva, sem cobranças surpresas por fotos Pro.'
    },
    {
      icon: Layers,
      title: 'Todos os Formatos Necessários',
      description: 'Posts para Feed (1080x1080), Stories/Reels (1080x1920) e Carrosséis contínuos prontos para engajar.'
    },
    {
      icon: RefreshCw,
      title: 'Novos Templates Toda Semana',
      description: 'Nossa equipe publica semanalmente novos pacotes acompanhando datas comemorativas e tendências.'
    },
    {
      icon: LayoutGrid,
      title: '18+ Nichos Catalogados',
      description: 'Alimentação, Barbearia, Saúde, Imobiliária, Lojas e dezenas de áreas organizadas com busca rápida.'
    },
    {
      icon: Sparkles,
      title: 'Acesso Instantâneo e Ilimitado',
      description: 'Abra os links direto no seu Canva em um clique e salve seus templates favoritos para reusar quando quiser.'
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-wider border border-blue-500/20">
            <Zap className="w-3.5 h-3.5" /> Por que a Impulsion?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tudo o que Você Precisa para se Destacar nas Redes Sociais
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Design de alto padrão estruturado para aumentar sua autoridade e multiplicar suas vendas.
          </p>
        </div>

        {/* 6 Grid Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-800/60 border border-slate-700/60 shadow-xl hover:border-blue-500/50 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{b.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
