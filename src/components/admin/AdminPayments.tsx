import React from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

export const AdminPayments: React.FC = () => {
  const { transactions } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Histórico de Pagamentos & Gateways
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Logs de transações processadas via Stripe, Mercado Pago e Asaas.
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="py-3 px-4">ID Transação</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Gateway</th>
                <th className="py-3 px-4">Valor</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">{t.id}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold">{t.clientName}</p>
                    <p className="text-[10px] text-slate-400">{t.clientEmail}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{t.gateway}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    R$ {t.amount.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-3.5 px-4">{t.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-yellow-500/10 text-yellow-600'
                    }`}>
                      {t.status}
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
