import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User as UserIcon, Mail, ShieldCheck, Key, Sparkles, Check, CreditCard,
  QrCode, Copy, CheckCircle2, Building2, Upload, AlertCircle
} from 'lucide-react';

export const ClientProfile: React.FC = () => {
  const { currentUser, updateUserProfile, showToast, setCheckoutPlan, pixConfig } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(name, email);
    if (password) {
      showToast('Senha alterada com sucesso!');
      setPassword('');
    }
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixConfig.pixKey);
    setIsCopied(true);
    showToast('Chave PIX copiada para a área de transferência! 📋');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSimulateProofUpload = () => {
    setProofUploaded(true);
    showToast('Comprovante enviado com sucesso! Nosso sistema validará o PIX em poucos instantes.');
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          Meu Perfil & Formas de Pagamento <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Gerencie seus dados pessoais, plano ativo e a conta oficial para pagamentos via PIX.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form: Personal Data */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-500" /> Dados Cadastrais
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nova Senha (deixe em branco para manter a atual)</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                Salvar Alterações
              </button>
            </form>
          </div>

          {/* PIX Payment Official Box */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-500/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Conta PIX Oficial da Plataforma</h2>
                  <p className="text-xs text-emerald-400 font-semibold">Chave de pagamento direta e liberação rápida</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Oficial Impulsio
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {pixConfig.instructions}
            </p>

            {/* Pix Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Chave PIX ({pixConfig.pixKeyType})</span>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-mono font-bold text-emerald-400 break-all">{pixConfig.pixKey}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Beneficiário</span>
                <p className="text-sm font-bold text-white">{pixConfig.recipientName}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Instituição Financeira / Banco</span>
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  {pixConfig.bankName}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cidade do Titular</span>
                <p className="text-sm font-bold text-white">{pixConfig.city || 'São Paulo - SP'}</p>
              </div>
            </div>

            {/* Action Buttons: Copy Key & QR Code */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCopyPixKey}
                className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Chave Copiada!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copiar Chave PIX ({pixConfig.pixKeyType})
                  </>
                )}
              </button>

              <button
                onClick={handleSimulateProofUpload}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>{proofUploaded ? 'Comprovante Enviado ✓' : 'Enviar Comprovante PIX'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Active Plan & Billing */}
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  Plano do Cliente
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ativo
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">
                Plano {currentUser?.plan || 'Mensal'}
              </h3>

              <p className="text-xs text-slate-400">
                Membro desde: {currentUser?.memberSince || '15/01/2026'}
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Acesso ilimitado a +1.480 templates
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Links de edição direta no Canva
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Suporte VIP via WhatsApp
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-2">
              <button
                onClick={() => setCheckoutPlan('Vitalício')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" /> Upgrade para Vitalício
              </button>
            </div>
          </div>

          {/* Quick Payment History Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-500" /> Histórico de Cobrança
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Assinatura Mensal</p>
                  <p className="text-[10px] text-slate-400">Pago via PIX em 15/01/2026</p>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">R$ 29,90</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Assinatura Anterior</p>
                  <p className="text-[10px] text-slate-400">Pago via Cartão em 15/12/2025</p>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">R$ 29,90</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
