import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Lock, QrCode, Building2, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showToast, pixConfig, updatePixConfig } = useApp();
  const [appName, setAppName] = useState('Impulsio Templates');
  const [supportEmail, setSupportEmail] = useState('suporte@impulsio.com.br');
  const [stripeKey, setStripeKey] = useState('sk_live_51M...X98A');
  const [mercadoPagoKey, setMercadoPagoKey] = useState('APP_USR-8923...102');
  const [asaasKey, setAsaasKey] = useState('$aact_Y3...990');

  // Pix Local State
  const [pixKey, setPixKey] = useState(pixConfig.pixKey);
  const [pixKeyType, setPixKeyType] = useState(pixConfig.pixKeyType);
  const [recipientName, setRecipientName] = useState(pixConfig.recipientName);
  const [bankName, setBankName] = useState(pixConfig.bankName);
  const [city, setCity] = useState(pixConfig.city || 'São Paulo - SP');
  const [instructions, setInstructions] = useState(pixConfig.instructions);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePixConfig({
      pixKey,
      pixKeyType,
      recipientName,
      bankName,
      city,
      instructions
    });
    showToast('Configurações da Plataforma e Conta PIX salvas com sucesso!');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          Configurações da Plataforma <Settings className="w-6 h-6 text-purple-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Gerencie a conta PIX oficial, gateways de pagamento e preferências da plataforma.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* PIX Configuration Section */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-500" /> Conta PIX Oficial da Plataforma
            </h2>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Exibido para Clientes
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Estes dados de pagamento PIX serão exibidos diretamente na Área do Cliente e no Checkout para pagamento direto do plano.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                Tipo de Chave PIX
              </label>
              <select
                value={pixKeyType}
                onChange={(e) => setPixKeyType(e.target.value as any)}
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              >
                <option value="CNPJ">CNPJ (Pessoa Jurídica)</option>
                <option value="E-mail">E-mail Comercial</option>
                <option value="Telefone">Telefone Celular</option>
                <option value="Chave Aleatória">Chave Aleatória (EVP)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                Chave PIX
              </label>
              <input
                type="text"
                required
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder="ex: 48.912.384/0001-90 ou pix@empresa.com"
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                Nome do Titular / Beneficiário
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="ex: Impulsio Digital Ltda"
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                Banco do Titular
              </label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="ex: Banco Inter / Nubank"
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                Instruções de Pagamento aos Clientes
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* General */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Geral & Identidade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Nome da Plataforma SaaS</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">E-mail Oficial de Suporte</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Gateways */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-500" /> Chaves de API dos Gateways de Pagamento
          </h2>

          <div>
            <label className="block text-xs font-bold mb-1">Stripe Secret Key (sk_live_...)</label>
            <input
              type="password"
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
              className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Mercado Pago Access Token (APP_USR-...)</label>
            <input
              type="password"
              value={mercadoPagoKey}
              onChange={(e) => setMercadoPagoKey(e.target.value)}
              className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Asaas API Key ($aact_...)</label>
            <input
              type="password"
              value={asaasKey}
              onChange={(e) => setAsaasKey(e.target.value)}
              className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Save className="w-5 h-5" /> Salvar Todas as Configurações
        </button>
      </form>
    </div>
  );
};
