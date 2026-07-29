import React from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, Users, Layers, TrendingUp, Plus, Tag, Megaphone, ArrowUpRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { templates, subscribers, transactions, setAdminTab } = useApp();

  const totalMRR = subscribers
    .filter((s) => s.status === 'Ativo')
    .reduce((acc, s) => acc + (s.plan === 'Mensal' ? s.amount : s.amount / 12), 0);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Visão Geral do SaaS
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Acompanhe a receita, crescimento de clientes e métricas da plataforma em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminTab('templates')}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Novo Template
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">MRR (Receita Mensal)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            R$ 18.450,00
          </p>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +14% comparado ao mês anterior
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Assinantes Ativos</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            620 Clientes
          </p>
          <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 98,2% retenção
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Total de Templates</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {templates.length} Artes
          </p>
          <span className="text-[10px] text-purple-500 font-bold">
            18 Categorias ativas
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Taxa de Conversão</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            8,4%
          </p>
          <span className="text-[10px] text-amber-500 font-bold">
            Garantia 7 dias
          </span>
        </div>
      </div>

      {/* Recent Subscribers Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Assinaturas Recentes
          </h2>
          <button
            onClick={() => setAdminTab('subscriptions')}
            className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Ver Todas →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-2">Cliente</th>
                <th className="py-3 px-2">Plano</th>
                <th className="py-3 px-2">Gateway</th>
                <th className="py-3 px-2">Valor</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {subscribers.map((sub) => (
                <tr key={sub.id}>
                  <td className="py-3.5 px-2">
                    <p className="font-bold text-slate-900 dark:text-white">{sub.name}</p>
                    <p className="text-[10px] text-slate-400">{sub.email}</p>
                  </td>
                  <td className="py-3.5 px-2 font-semibold">{sub.plan}</td>
                  <td className="py-3.5 px-2">{sub.paymentMethod}</td>
                  <td className="py-3.5 px-2 font-bold">R$ {sub.amount.toFixed(2).replace('.', ',')}</td>
                  <td className="py-3.5 px-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
