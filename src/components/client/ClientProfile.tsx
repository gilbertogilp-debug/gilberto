import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User as UserIcon, Mail, ShieldCheck, Key, Sparkles, Check, CreditCard,
  QrCode, Copy, CheckCircle2, Building2, Upload, Camera, Image, Trash2
} from 'lucide-react';

export const ClientProfile: React.FC = () => {
  const { currentUser, updateUserProfile, showToast, setCheckoutPlan, pixConfig } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState(currentUser?.accessKey || '');
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  );
  const [isCopied, setIsCopied] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);

  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('A imagem deve ter no máximo 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarUrl(base64);
        showToast('Nova foto carregada! Clique em "Salvar Alterações" para aplicar no seu perfil.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(name, email, avatarUrl, password);
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
          Gerencie sua foto de perfil, dados pessoais de acesso e a conta de pagamento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form: Personal Data & Photo Upload */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-500" /> Dados Cadastrais e Foto do Cliente
            </h2>

            {/* Profile Picture Uploader Section */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Sua Foto de Perfil
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group">
                  <img
                    src={avatarUrl}
                    alt={name || 'Foto do Cliente'}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                  />
                  <label
                    htmlFor="avatar-file-input"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white shadow-lg cursor-pointer hover:bg-blue-500 transition-transform group-hover:scale-110"
                    title="Enviar foto do seu dispositivo"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                  <input
                    id="avatar-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Selecione uma foto do seu dispositivo ou escolha um avatar abaixo:
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                    <label
                      htmlFor="avatar-file-input"
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" /> Enviar Foto do PC / Celular
                    </label>

                    {avatarUrl !== currentUser?.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setAvatarUrl(currentUser?.avatarUrl || AVATAR_PRESETS[0])}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 transition-colors cursor-pointer"
                      >
                        Restaurar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Avatar Presets Grid */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Ou escolha um dos avatares prontos:
                </p>
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarUrl(preset)}
                      className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        avatarUrl === preset
                          ? 'border-blue-600 ring-2 ring-blue-500/40 scale-105'
                          : 'border-slate-300 dark:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      {avatarUrl === preset && (
                        <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white font-bold" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">E-mail de Acesso</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Sua Chave de Acesso (Senha Secreta)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Esta é a sua chave pessoal de acesso criada na escolha do plano.
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                Salvar Alterações e Atualizar Foto
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
                Oficial Impulsion
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

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <button
                onClick={() => setCheckoutPlan('Vitalício')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" /> Upgrade para Vitalício
              </button>

              <button
                onClick={() => {
                  showToast(`📧 E-mail de confirmação reenviado para ${currentUser?.email}!`);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Mail className="w-4 h-4 text-blue-400" /> Reenviar E-mail de Boas-Vindas & Acesso
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
