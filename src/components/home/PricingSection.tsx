import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, ShieldCheck, Zap, ArrowRight, Lock } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { setCheckoutPlan } = useApp();

  const plans = [
    {
      id: 'Mensal',
      name: 'Plano Mensal',
      price: '29,90',
      period: '/mês',
      description: 'Ideal para testar a plataforma e criar artes rapidamente.',
      popular: false,
      features: [
        'Acesso a todos os +1.400 templates',
        'Todos os formatos (Feed, Story, Reels, Carrossel)',
        'Links diretos para edição no Canva',
        'Novos templates semanalmente',
        'Suporte prioritário via WhatsApp'
      ],
      ctaText: 'Assinar Plano Mensal'
    },
    {
      id: 'Anual',
      name: 'Plano Anual',
      price: '19,90',
      period: '/mês (R$ 238,80/ano)',
      badge: 'MAIS POPULAR • ECONOMIZE 33%',
      description: 'O melhor custo-benefício para empreendedores e criadores.',
      popular: true,
      features: [
        'TUDO do Plano Mensal',
        '33% de Desconto em relação ao mensal',
        'Acesso VIP antecipado a novos pacotes',
        'Garantia incondicional de 7 dias',
        'Bônus: Guia de Cores e Tipografias para Canva',
        'Suporte VIP 24/7'
      ],
      ctaText: 'Garantir Desconto Anual'
    },
    {
      id: 'Vitalício',
      name: 'Plano Vitalício',
      price: '397,00',
      period: 'Pague uma única vez',
      badge: 'ACESSO PRA SEMPRE',
      description: 'Acesso perpétuo sem mensalidades nem anuidades.',
      popular: false,
      features: [
        'Acesso PERPÉTUO a toda a biblioteca',
        'Todas as futuras atualizações incluídas para sempre',
        'Download ilimitado de qualquer template',
        'Área de Afiliados exclusiva com 30% de comissão',
        'Grupo VIP de Networking',
        'Suporte Dedicado'
      ],
      ctaText: 'Garantir Acesso Vitalício'
    }
  ];

  return (
    <section id="planos" className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Investimento Inteligente
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Escolha o Plano Ideal para Você
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Cancele quando quiser. Sem fidelidade. Satisfação garantida em 7 dias.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                p.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-2 border-blue-500 shadow-2xl scale-105 z-10'
                  : 'bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-lg'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-black tracking-widest uppercase shadow-md">
                  {p.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                  {p.description}
                </p>

                <div className="my-6">
                  <span className="text-xs text-slate-400 font-medium">R$</span>
                  <span className="text-4xl font-black ml-1">{p.price}</span>
                  <span className="text-xs text-slate-400 ml-1">{p.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 ${p.popular ? 'text-blue-400' : 'text-emerald-500'}`} />
                      <span className={p.popular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setCheckoutPlan(p.id as any)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    p.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/30'
                      : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gateways Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" /> Processamento de Pagamentos Integrado
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-slate-700">
              💳 Stripe
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-slate-700">
              🛒 Mercado Pago
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-slate-700">
              ⚡ Asaas (PIX & Boleto)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
