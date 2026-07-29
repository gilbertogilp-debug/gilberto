import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, Check, X } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, toggleCouponActive } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [expiresAt, setExpiresAt] = useState('2026-12-31');
  const [maxUsage, setMaxUsage] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      expiresAt,
      maxUsage: Number(maxUsage),
      active: true
    });
    setCode('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Cupons de Desconto ({coupons.length})
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Crie e gerencie cupons para campanhas de marketing.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Criar Novo Cupom
        </button>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Desconto</th>
                <th className="py-3 px-4">Usos</th>
                <th className="py-3 px-4">Validade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td className="py-3.5 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                    {c.code}
                  </td>
                  <td className="py-3.5 px-4 font-bold">{c.discountPercent}% OFF</td>
                  <td className="py-3.5 px-4">{c.usageCount} / {c.maxUsage}</td>
                  <td className="py-3.5 px-4">{c.expiresAt}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.active ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {c.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleCouponActive(c.id)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
                    >
                      {c.active ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Criar Cupom de Desconto</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Código do Cupom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: IMPULSIO20"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border uppercase font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Porcentagem de Desconto (%)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Data de Expiração</label>
                <input
                  type="date"
                  required
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Gerar Cupom
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
