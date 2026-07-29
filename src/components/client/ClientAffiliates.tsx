import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Share2, DollarSign, Users, Copy, Check, TrendingUp, Sparkles, Wallet } from 'lucide-react';

export const ClientAffiliates: React.FC = () => {
  const { affiliateInfo, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [requestedPayout, setRequestedPayout] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateInfo.referralLink);
    setCopied(true);
    showToast('Link de afiliado copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePayoutRequest = () => {
    setRequestedPayout(true);
    showToast('Solicitação de saque via PIX efetuada com sucesso!');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Programa de Indicação Impulsio
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Área de Afiliados (Comissão de 30%)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Indique o Impulsio Templates para seus amigos e clientes e ganhe 30% em todas as assinaturas geradas pelo seu link.
          </p>
        </div>

        <button
          onClick={handleCopyLink}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Link Copiado!' : 'Copiar Meu Link Exclusivo'}</span>
        </button>
      </div>

      {/* Referral Link Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Seu Link de Afiliado Exclusivo:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={affiliateInfo.referralLink}
            className="flex-1 p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800"
          >
            Copiar
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Ganhos Totais</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            R$ {affiliateInfo.totalEarnings.toFixed(2).replace('.', ',')}
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            +30% por assinatura
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Saldo a Sacar</span>
            <Wallet className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            R$ {requestedPayout ? '0,00' : affiliateInfo.pendingPayout.toFixed(2).replace('.', ',')}
          </p>
          <button
            onClick={handlePayoutRequest}
            disabled={requestedPayout || affiliateInfo.pendingPayout <= 0}
            className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {requestedPayout ? 'Solicitação em Processamento (PIX)' : 'Solicitar Saque via PIX →'}
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Indicações</span>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {affiliateInfo.totalReferrals}
          </p>
          <span className="text-[10px] text-slate-400">Assinantes convertidos</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Taxa de Conversão</span>
            <TrendingUp className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {affiliateInfo.conversionRate}%
          </p>
          <span className="text-[10px] text-slate-400">Acima da média de mercado</span>
        </div>
      </div>
    </div>
  );
};
