import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Heart, Instagram, Youtube, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { categories, setSelectedCategory, setViewMode, switchRole, isLoggedIn, setClientTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Impulsion <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Templates</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A maior e mais completa biblioteca de templates editáveis para o Canva do Brasil. Crie artes profissionais para o seu negócio em minutos e impulsione suas vendas.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Pagamento 100% Seguro
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                SSL Encriptado
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setViewMode('home')} className="hover:text-blue-400 transition-colors">
                  Início
                </button>
              </li>
              <li>
                <a href="#categorias" className="hover:text-blue-400 transition-colors">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-blue-400 transition-colors">
                  Planos de Assinatura
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-blue-400 transition-colors">
                  Vantagens
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => switchRole()}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Painel Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categorias Populares</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      if (isLoggedIn) {
                        setViewMode('client');
                        setClientTab('categories');
                      } else {
                        setViewMode('home');
                        const el = document.getElementById('recentes');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-purple-400 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Support & Gateways */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Formas de Pagamento</h4>
            <p className="text-xs text-slate-400 mb-3">
              Processamento seguro via Stripe, Mercado Pago e Asaas com PIX instantâneo.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Stripe</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Mercado Pago</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Asaas</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">PIX</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Impulsion Templates. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para criadores e empreendedores.
          </p>
        </div>
      </div>
    </footer>
  );
};
