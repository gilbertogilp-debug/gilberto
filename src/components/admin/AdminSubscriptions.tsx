import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminPlanSettings } from './AdminPlanSettings';
import { CreditCard, Users, ShieldCheck, Zap } from 'lucide-react';

export const AdminSubscriptions: React.FC = () => {
  const { subscribers, plans } = useApp();

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          Gestão de Assinaturas & Configuração de Planos <CreditCard className="w-6 h-6 text-purple-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Acompanhe estatísticas de assinantes e edite preços, valores e características dos planos de pagamento.
        </p>
      </div>

      {/* Dynamic Summary Cards for each active plan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const subCount = subscribers.filter((s) => s.plan.toLowerCase() === p.name.toLowerCase() || s.plan.toLowerCase() === p.id.toLowerCase()).length;
          const formattedPrice = p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

          return (
            <div key={p.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {p.name} (R$ {formattedPrice} {p.period})
              </span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{subCount} Assinantes</p>
              <p className="text-xs text-purple-500 font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> {p.popular ? 'Plano Principal / Mais Popular' : 'Ativo e disponível no site'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Plan Management Section */}
      <div className="pt-4">
        <AdminPlanSettings />
      </div>
    </div>
  );
};
