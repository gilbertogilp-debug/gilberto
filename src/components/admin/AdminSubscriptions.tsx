import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Zap, ShieldCheck } from 'lucide-react';

export const AdminSubscriptions: React.FC = () => {
  const { subscribers } = useApp();

  const mensalCount = subscribers.filter((s) => s.plan === 'Mensal').length;
  const anualCount = subscribers.filter((s) => s.plan === 'Anual').length;
  const vitalicioCount = subscribers.filter((s) => s.plan === 'Vitalício').length;

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Gestão de Assinaturas & Planos
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Distribuição de assinantes por categoria de plano.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Plano Mensal (R$ 29,90/mês)</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mensalCount} Assinantes</p>
          <p className="text-xs text-blue-500 font-bold">Faturamento mensal recorrente</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Plano Anual (R$ 238,80/ano)</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{anualCount} Assinantes</p>
          <p className="text-xs text-purple-500 font-bold">LTV elevado com renovação anual</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Plano Vitalício (R$ 397,00)</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{vitalicioCount} Assinantes</p>
          <p className="text-xs text-emerald-500 font-bold">Acesso perpétuo sem mensalidades</p>
        </div>
      </div>
    </div>
  );
};
