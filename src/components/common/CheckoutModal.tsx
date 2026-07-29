import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, ShieldCheck, CreditCard, QrCode, Lock, Sparkles, Tag, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { checkoutPlan, setCheckoutPlan, coupons, currentUser, login, setViewMode, showToast, pixConfig } = useApp();
  const [gateway, setGateway] = useState<'Stripe' | 'Mercado Pago' | 'Asaas'>('Mercado Pago');
  const [paymentType, setPaymentType] = useState<'pix' | 'card'>('pix');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!checkoutPlan) return null;

  const planPrices = {
    'Mensal': 29.90,
    'Anual': 238.80,
    'Vitalício': 397.00
  };

  const basePrice = planPrices[checkoutPlan];
  const finalPrice = discountPercent > 0 ? basePrice * (1 - discountPercent / 100) : basePrice;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const found = coupons.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
    if (found) {
      setDiscountPercent(found.discountPercent);
      setAppliedCoupon(found.code);
      showToast(`Cupom ${found.code} aplicado! ${found.discountPercent}% de desconto.`);
    } else {
      showToast('Cupom inválido ou expirado.');
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixConfig.pixKey);
    setCopiedPix(true);
    showToast('Chave PIX copiada para a área de transferência!');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutPlan(null);
      
      if (!currentUser) {
        login('cliente@impulsio.com.br');
      } else {
        setViewMode('client');
      }

      showToast(`🎉 Parabéns! Sua assinatura do Plano ${checkoutPlan} está ativa!`);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={() => setCheckoutPlan(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" /> Checkout Seguro Impulsio
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Assinar Plano <span className="text-blue-600 dark:text-blue-400">{checkoutPlan}</span>
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Acesso ilimitado a todos os milhares de templates e atualizações semanais.
        </p>

        {/* Plan summary box */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total do Plano</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              R$ {finalPrice.toFixed(2).replace('.', ',')}
              {checkoutPlan === 'Mensal' && <span className="text-xs font-normal text-slate-500"> /mês</span>}
              {checkoutPlan === 'Anual' && <span className="text-xs font-normal text-slate-500"> /ano</span>}
            </p>
            {discountPercent > 0 && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Desconto de {discountPercent}% aplicado ({appliedCoupon})
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> 7 Dias de Garantia
            </span>
          </div>
        </div>

        {/* Coupon input */}
        <form onSubmit={handleApplyCoupon} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cupom de desconto (ex: IMPULSIO10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600"
          >
            Aplicar
          </button>
        </form>

        {/* Gateway Selection */}
        <div className="mt-6 space-y-3">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Escolha o Gateway de Pagamento:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'Mercado Pago', label: 'Mercado Pago', desc: 'PIX ou Cartão' },
              { id: 'Stripe', label: 'Stripe', desc: 'Cartão de Crédito' },
              { id: 'Asaas', label: 'Asaas', desc: 'Boleto ou PIX' }
            ].map((gw) => (
              <button
                key={gw.id}
                type="button"
                onClick={() => setGateway(gw.id as any)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  gateway === gw.id
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <p className="text-sm">{gw.label}</p>
                <p className="text-[10px] text-slate-400 font-normal">{gw.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Type Switch (PIX vs Card) */}
        <div className="mt-5 flex border-b border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setPaymentType('pix')}
            className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              paymentType === 'pix'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <QrCode className="w-4 h-4" /> PIX (Aprovação Instantânea)
          </button>
          <button
            type="button"
            onClick={() => setPaymentType('card')}
            className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              paymentType === 'card'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Cartão de Crédito
          </button>
        </div>

        {/* Card or PIX Simulated Box */}
        <div className="mt-4">
          {paymentType === 'card' ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Número do Cartão (ex: 4532 •••• •••• 8890)"
                defaultValue="4532 8900 1234 8890"
                className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/AA"
                  defaultValue="12/29"
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  defaultValue="888"
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">
                  Beneficiário: <span className="text-emerald-600 dark:text-emerald-400">{pixConfig.recipientName}</span>
                </p>
                <p className="text-slate-500 dark:text-slate-400 font-mono">
                  Chave ({pixConfig.pixKeyType}): <strong className="text-slate-800 dark:text-slate-200">{pixConfig.pixKey}</strong>
                </p>
                <p className="text-[11px] text-slate-400">
                  {pixConfig.bankName}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyPix}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {copiedPix ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPix ? 'Chave Copiada!' : 'Copiar Chave PIX'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Checkout CTA */}
        <button
          onClick={handleCompletePayment}
          disabled={isProcessing}
          className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-purple-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Confirmando pagamento via {gateway}...</span>
            </div>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Ativar Assinatura Instantânea — R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Criptografia de ponta a ponta. Cancelamento a qualquer momento.
        </p>
      </div>
    </div>
  );
};
