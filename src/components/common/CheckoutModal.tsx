import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_PLANS } from '../../data/mockData';
import {
  X, Check, ShieldCheck, CreditCard, QrCode, Lock, Sparkles, Tag,
  ArrowRight, Copy, CheckCircle2, User, Mail, Key, Phone, RefreshCw,
  Clock, AlertCircle, Radio, ExternalLink, Zap
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutPlan, setCheckoutPlan, plans, coupons, currentUser,
    recordPaymentTransaction, setViewMode, showToast, pixConfig
  } = useApp();

  const [gateway, setGateway] = useState<'Mercado Pago' | 'Asaas' | 'PagSeguro' | 'Efí Gerencianet' | 'Stripe'>('Mercado Pago');
  const [paymentType, setPaymentType] = useState<'pix' | 'card'>('pix');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Steps: 'form' | 'pix_active' | 'pix_expired' | 'completed'
  const [step, setStep] = useState<'form' | 'pix_active' | 'pix_expired' | 'completed'>('form');

  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer Account Access Inputs
  const [clientName, setClientName] = useState(currentUser?.name || '');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [clientKey, setClientKey] = useState(currentUser?.accessKey || '123456');
  const [clientCpf, setClientCpf] = useState('123.456.789-00');

  // PIX Timer State (10 minutes = 600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);
  const [pollAttempt, setPollAttempt] = useState(1);
  const [transactionRecord, setTransactionRecord] = useState<any>(null);

  // Timer Countdown Effect
  useEffect(() => {
    let timer: any;
    if (step === 'pix_active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setStep('pix_expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // Polling Simulation Effect (Increments attempt every 4 seconds)
  useEffect(() => {
    let pollInterval: any;
    if (step === 'pix_active') {
      pollInterval = setInterval(() => {
        setPollAttempt((prev) => prev + 1);
      }, 4000);
    }
    return () => clearInterval(pollInterval);
  }, [step]);

  if (!checkoutPlan) return null;

  const activePlans = (plans && plans.length > 0 ? plans : DEFAULT_PLANS).filter((p) => p.active !== false);
  const currentPlanObj = activePlans.find((p) => p.id === checkoutPlan || p.name === checkoutPlan) || activePlans[0];
  const planNameDisplay = currentPlanObj ? currentPlanObj.name : checkoutPlan;
  const basePrice = currentPlanObj ? currentPlanObj.price : 29.90;
  const finalPrice = discountPercent > 0 ? basePrice * (1 - discountPercent / 100) : basePrice;

  // Formatted PIX Copia e Cola Payload String
  const generatePixPayload = () => {
    const formattedPrice = finalPrice.toFixed(2);
    const cleanKey = pixConfig.pixKey.replace(/[^a-zA-Z0-9]/g, '');
    const cleanName = pixConfig.recipientName.substring(0, 25).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cleanCity = pixConfig.city.substring(0, 15).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    return `00020126580014br.gov.bcb.pix0136${cleanKey}520400005303986540${formattedPrice}5802BR59${cleanName}60${cleanCity}62070503***63048E3F`;
  };

  const pixPayloadStr = generatePixPayload();

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    navigator.clipboard.writeText(pixPayloadStr);
    setCopiedPix(true);
    showToast('Código PIX Copia e Cola copiado com sucesso!');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleGeneratePixSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientEmail.trim()) {
      showToast('Por favor, informe seu e-mail de acesso.');
      return;
    }
    if (!clientPhone.trim()) {
      showToast('Por favor, informe seu telefone / WhatsApp.');
      return;
    }
    if (!clientKey.trim()) {
      showToast('Por favor, crie uma chave de acesso (senha).');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentType === 'pix') {
        setStep('pix_active');
        setTimeLeft(600); // 10 minutes
        setPollAttempt(1);
        showToast('QR Code PIX gerado! Aguardando confirmação do pagamento no banco...');
      } else {
        // Direct Card Approval
        completeAndApproveAccess();
      }
    }, 1200);
  };

  const completeAndApproveAccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const tx = recordPaymentTransaction({
        clientName: clientName || 'Cliente VIP',
        clientEmail,
        amount: finalPrice,
        gateway,
        planName: planNameDisplay,
        clientPhone,
        clientKey,
        cpf: clientCpf,
        status: 'Aprovado'
      });

      setTransactionRecord(tx);
      setIsProcessing(false);
      setStep('completed');
      showToast(`⚡ PAGAMENTO CONFIRMADO VIA API ${gateway}! Acesso VIP Liberado.`);
    }, 1200);
  };

  const handleRestartPix = () => {
    setStep('pix_active');
    setTimeLeft(600);
    setPollAttempt(1);
    showToast('Novo QR Code PIX gerado com sucesso!');
  };

  const handleAccessPlatformNow = () => {
    setCheckoutPlan(null);
    setViewMode('client');
  };

  const calculateExpirationDisplay = () => {
    if (planNameDisplay.includes('Vitalício')) return 'Acesso Vitalício (Sem Expiração)';
    if (planNameDisplay.includes('Anual')) {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      return d.toLocaleDateString('pt-BR');
    }
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString('pt-BR');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={() => {
            if (step === 'completed') handleAccessPlatformNow();
            else setCheckoutPlan(null);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: COMPLETED (AUTOMATIC APPROVAL SCREEN) */}
        {step === 'completed' && (
          <div className="space-y-6 animate-fade-in text-left py-2">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                🎉 Pagamento PIX Confirmado Instantaneamente!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Sua transação foi validada com sucesso via API oficial do <strong>{gateway}</strong>. Seu acesso VIP foi ativado no sistema e o e-mail de confirmação foi enviado.
              </p>
            </div>

            {/* Payment & Access Details Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block uppercase">ID Transação</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{transactionRecord?.id || 'PIX-MP-984102'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block uppercase">Status da Conta</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" /> ATIVO
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block uppercase">Valor Pago</span>
                <span className="font-extrabold text-slate-900 dark:text-white">R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block uppercase">Expiração do Acesso</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{calculateExpirationDisplay()}</span>
              </div>
            </div>

            {/* Confirmation Email Dispatch Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-emerald-500/30 space-y-3 text-[11px]">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-sans text-xs">
                  <Mail className="w-4 h-4" /> E-mail de Confirmação Despachado Automaticamente
                </span>
                <span className="text-slate-400 font-sans text-[10px]">
                  {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="space-y-1 text-slate-700 dark:text-slate-300 font-sans">
                <p><strong className="text-slate-900 dark:text-white font-mono">De:</strong> Impulsion VIP &lt;suporte@impulsion.com.br&gt;</p>
                <p><strong className="text-slate-900 dark:text-white font-mono">Para:</strong> {clientName || 'Cliente VIP'} &lt;{clientEmail}&gt;</p>
                <p><strong className="text-slate-900 dark:text-white font-mono">Assunto:</strong> [CONFIRMAÇÃO DE ACESSO] Seja bem-vindo(a) ao Impulsion Design!</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-sans text-xs space-y-2">
                <p className="font-bold text-slate-900 dark:text-white">Olá, {clientName || 'Cliente VIP'}!</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  Seu pagamento foi confirmado com sucesso no plano <strong>{planNameDisplay}</strong>. Seu acesso total aos milhares de templates e arquivos editáveis no Canva está liberado!
                </p>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 font-mono text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
                  <p><strong>E-mail de Login:</strong> {clientEmail}</p>
                  <p><strong>Sua Senha / Chave:</strong> {clientKey}</p>
                  <p><strong>Data de Validade do Acesso:</strong> {calculateExpirationDisplay()}</p>
                  <p><strong>Status do Pagamento:</strong> <span className="text-emerald-600 font-bold">CONCLUÍDO VIA PIX</span></p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAccessPlatformNow}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Acessar Área Exclusiva do Cliente Agora</span>
            </button>
          </div>
        )}

        {/* STEP 2: PIX ACTIVE WAITING SCREEN */}
        {step === 'pix_active' && (
          <div className="space-y-6 animate-fade-in text-center py-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-left">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Aguardando Confirmação do PIX
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Sincronizando via API oficial do {gateway}
                  </p>
                </div>
              </div>

              {/* Countdown Timer Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Expira em: {formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* QR Code Container with Scanning Laser Animation */}
            <div className="relative w-56 h-56 mx-auto bg-white p-3 rounded-2xl shadow-xl border-2 border-emerald-500/30 flex flex-col items-center justify-center group overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                  <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z" />
                  <path d="M35,5 h10 v10 h-10 z M50,5 h10 v5 h-10 z M40,20 h15 v10 h-15 z M5,35 h15 v10 h-15 z M25,35 h10 v20 h-10 z M40,35 h20 v10 h-20 z M65,35 h10 v10 h-10 z M80,35 h15 v20 h-15 z" />
                  <path d="M35,65 h10 v10 h-10 z M50,60 h20 v10 h-20 z M35,80 h15 v15 h-15 z M55,80 h15 v10 h-15 z M75,70 h20 v10 h-20 z M75,85 h20 v15 h-20 z" />
                </svg>

                {/* PIX Logo Overlay Center */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center font-black text-[10px] shadow-md border-2 border-white">
                  PIX
                </div>
              </div>

              {/* Scanning Laser Line Effect */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#10b981] animate-pulse top-2" />
            </div>

            {/* Instructions & Recipient Info */}
            <div className="space-y-1 text-xs max-w-md mx-auto">
              <p className="font-extrabold text-slate-900 dark:text-white">
                Valor: <span className="text-emerald-600 dark:text-emerald-400 text-sm">R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Beneficiário: <strong className="text-slate-800 dark:text-slate-200">{pixConfig.recipientName}</strong> ({pixConfig.bankName})
              </p>
              <p className="text-[11px] text-slate-400">
                Abra o app do seu banco, escolha <strong>PIX &gt; Ler QR Code</strong> ou cole o código abaixo.
              </p>
            </div>

            {/* PIX Copia e Cola Payload Input & Copy Button */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">
                Código PIX Copia e Cola
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={pixPayloadStr}
                  className="flex-1 p-2 rounded-xl text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 truncate focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap"
                >
                  {copiedPix ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? 'Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>
            </div>

            {/* Real-time API Polling Ticker */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="text-[11px]">Sincronizando com API do {gateway}... (Checagem #{pollAttempt})</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">POLLING ATIVO</span>
            </div>

            {/* Instant Simulation Action Buttons for Testing */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Simulação de Teste em Tempo Real
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={completeAndApproveAccess}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-yellow-300" />
                      <span>Simular Pagamento no Banco (Webhook)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('pix_expired')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Simular Expiração / Cancelamento</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PIX EXPIRED / CANCELLED SCREEN */}
        {step === 'pix_expired' && (
          <div className="space-y-5 animate-fade-in text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                QR Code PIX Expirado ou Cancelado
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                O tempo de validade de 10 minutos para o pagamento deste PIX expirou sem a confirmação da API do banco. Seu acesso continua temporariamente bloqueado.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left space-y-2 text-xs">
              <p className="font-bold text-amber-800 dark:text-amber-300">O que você pode fazer?</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1 text-[11px]">
                <li>Clique no botão abaixo para gerar um <strong>novo QR Code PIX</strong> com validade renovada.</li>
                <li>Certifique-se de concluir a transferência dentro do tempo no aplicativo do seu banco.</li>
                <li>Caso tenha efetuado o pagamento e o saldo tenha saído da conta, entre em contato com nosso suporte.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleRestartPix}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Gerar Novo QR Code PIX Agora</span>
            </button>
          </div>
        )}

        {/* STEP 4: CHECKOUT FORM SCREEN */}
        {step === 'form' && (
          <form onSubmit={handleGeneratePixSubmit} className="space-y-6">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" /> Checkout Seguro Impulsion
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Assinar <span className="text-blue-600 dark:text-blue-400">{planNameDisplay}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Acesso ilimitado aos milhares de templates, atualizações e downloads diretos no Canva.
              </p>
            </div>

            {/* Plan Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total do Plano Selecionado</p>
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

            {/* Coupon Form */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cupom de desconto (ex: IMPULSION10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer"
              >
                Aplicar
              </button>
            </div>

            {/* Account Registration Form Inputs */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-blue-500/15 pb-2">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-extrabold text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                    Criar Cadastro e Dados de Acesso
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-300">
                  Liberação Automática
                </span>
              </div>

              {/* Plan Options Selector in Registration Form */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Selecione seu Plano Desejado:</span>
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold uppercase">
                    Acesso Ilimitado ao Canva
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activePlans.map((plan) => {
                    const isSelected = checkoutPlan === plan.id || checkoutPlan === plan.name;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setCheckoutPlan(plan.id)}
                        className={`relative p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white dark:bg-slate-800 border-blue-500 text-slate-900 dark:text-white shadow-md ring-2 ring-blue-500/30'
                            : 'bg-white/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 hover:border-blue-300'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full text-[8px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                            RECOMENDADO
                          </span>
                        )}
                        <div>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-extrabold text-[11px] text-slate-900 dark:text-white truncate">
                              {plan.name || plan.id}
                            </span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xs font-black text-slate-900 dark:text-white">
                              R$ {plan.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400">
                              {plan.period || (plan.id === 'Vitalício' ? '' : '/mês')}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Seu Nome Completo</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Nome e sobrenome"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">E-mail para Acesso e Confirmação</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp com DDD</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-8888"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Criar Chave / Senha de Acesso</label>
                  <div className="relative">
                    <Key className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Crie sua senha de acesso"
                      value={clientKey}
                      onChange={(e) => setClientKey(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gateway Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Provedor de Pagamento (API Oficial):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Mercado Pago', label: 'Mercado Pago', desc: 'PIX Instantâneo' },
                  { id: 'Asaas', label: 'Asaas', desc: 'PIX e Boleto' },
                  { id: 'Efí Gerencianet', label: 'Efí Gerencianet', desc: 'API Oficial PIX' },
                  { id: 'PagSeguro', label: 'PagSeguro', desc: 'PagBank PIX' }
                ].map((gw) => (
                  <button
                    key={gw.id}
                    type="button"
                    onClick={() => setGateway(gw.id as any)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      gateway === gw.id
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold">{gw.label}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{gw.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Switch */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPaymentType('pix')}
                className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  paymentType === 'pix'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <QrCode className="w-4 h-4" /> PIX (Aprovação e Liberação Automática)
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('card')}
                className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  paymentType === 'card'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Cartão de Crédito
              </button>
            </div>

            {/* Card Simulation Inputs */}
            {paymentType === 'card' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <input
                  type="text"
                  placeholder="Número do Cartão (ex: 4532 •••• •••• 8890)"
                  defaultValue="4532 8900 1234 8890"
                  className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    defaultValue="12/29"
                    className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue="888"
                    className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-purple-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Gerando PIX via {gateway}...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Gerar PIX e Ativar Acesso — R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Criptografia SSL 256 bits. Liberação instantânea após confirmação bancária.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
