import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_PLANS } from '../../data/mockData';
import { X, Mail, Key, User, Phone, Sparkles, ArrowRight, ShieldAlert, CheckCircle2, Send, RefreshCw, AlertCircle, FileText, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, registerCustomerAccess, setCheckoutPlan, subscribers, showToast, plans } = useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'resend'>('login');
  const [email, setEmail] = useState('cliente@impulsion.com.br');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('(11) 99888-7766');
  const [selectedPlan, setSelectedPlan] = useState<string>('Anual');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentEmailData, setSentEmailData] = useState<{
    toName: string;
    toEmail: string;
    key: string;
    plan: string;
    date: string;
  } | null>(null);

  if (!isAuthModalOpen) return null;

  const activePlans = (plans && plans.length > 0 ? plans : DEFAULT_PLANS).filter(p => p.active !== false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (activeTab === 'register') {
      if (!email.trim() || !name.trim()) {
        setErrorMessage('Por favor, informe seu nome e e-mail para criar o acesso.');
        return;
      }
      const chosenPlan = selectedPlan || 'Anual';
      // Prepare registration confirmation email display
      setSentEmailData({
        toName: name.trim() || 'Cliente VIP',
        toEmail: email.trim().toLowerCase(),
        key: password || '123456',
        plan: chosenPlan,
        date: new Date().toLocaleDateString('pt-BR')
      });
      // Register customer access in context
      registerCustomerAccess(name || 'Cliente VIP', email, phone, password, chosenPlan);
      showToast(`🎉 Cadastro efetuado com sucesso no Plano ${chosenPlan}! E-mail de confirmação enviado para ${email}`);
    } else if (activeTab === 'login') {
      const res = login(email, 'user', password);
      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setIsAuthModalOpen(false);
      }
    } else if (activeTab === 'resend') {
      handleResendEmail();
    }
  };

  const handleResendEmail = () => {
    setErrorMessage(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage('Informe seu e-mail para verificar o envio da confirmação.');
      return;
    }

    const subscriber = subscribers.find(s => s.email.toLowerCase() === cleanEmail) ||
      (cleanEmail === 'cliente@impulsion.com.br' ? { name: 'Cliente VIP', email: 'cliente@impulsion.com.br', plan: 'Mensal', status: 'Ativo' } : null);

    if (!subscriber) {
      setErrorMessage('Este e-mail ainda não está cadastrado ou não possui um plano ativo. Escolha um plano para liberar o seu acesso.');
      return;
    }

    if (subscriber.status !== 'Ativo') {
      setErrorMessage('O e-mail foi localizado, mas o plano encontra-se inativo ou pendente de confirmação do pagamento.');
      return;
    }

    // Successfully resend email simulation and show email receipt preview
    setSentEmailData({
      toName: subscriber.name || 'Cliente Impulsion',
      toEmail: subscriber.email,
      key: password || '123456',
      plan: subscriber.plan || 'Mensal',
      date: new Date().toLocaleDateString('pt-BR')
    });

    showToast(`📧 E-mail de confirmação reenviado para ${subscriber.email}!`);
  };

  const handleQuickClientDemo = () => {
    setErrorMessage(null);
    const res = login('cliente@impulsion.com.br', 'user', '123456');
    if (res.success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleQuickDemoAdmin = () => {
    setErrorMessage(null);
    const res = login('gilbertogilp@gmail.com', 'admin', 'admin123');
    if (res.success) {
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-8">
        
        <button
          onClick={() => {
            setErrorMessage(null);
            setSentEmailData(null);
            setIsAuthModalOpen(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg mx-auto">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {activeTab === 'register' ? 'Criar Acesso do Cliente' : activeTab === 'resend' ? 'Reenviar E-mail de Acesso' : 'Acessar Área do Cliente'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            {activeTab === 'register'
              ? 'Cadastre seu e-mail e chave de acesso para liberar a área VIP de membros'
              : activeTab === 'resend'
              ? 'Consulte o envio do e-mail de confirmação ou reenvie os dados para sua caixa de entrada'
              : 'Digite seu e-mail e a chave de acesso cadastrados no momento da assinatura'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-5 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage(null);
              setSentEmailData(null);
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Entrar no Site
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('resend');
              setErrorMessage(null);
              setSentEmailData(null);
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'resend'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📩 Não recebi o e-mail
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMessage(null);
              setSentEmailData(null);
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Criar Acesso
          </button>
        </div>

        {/* E-mail Preview Card after Registration or Resend */}
        {sentEmailData ? (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-emerald-500/40 space-y-4 animate-fade-in text-left">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm border-b border-slate-200 dark:border-slate-700/80 pb-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              <span>
                {activeTab === 'register' 
                  ? '🎉 Cadastro Concluído & E-mail de Confirmação Enviado!' 
                  : '📩 E-mail de Acesso Localizado & Reenviado com Sucesso!'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                <p><strong className="text-slate-900 dark:text-white">De:</strong> Impulsion Design VIP &lt;boasvindas@impulsion.com.br&gt;</p>
                <p><strong className="text-slate-900 dark:text-white">Para:</strong> {sentEmailData.toName} &lt;{sentEmailData.toEmail}&gt;</p>
                <p><strong className="text-slate-900 dark:text-white">Assunto:</strong> [CONFIRMAÇÃO DE CADASTRO] Seja bem-vindo(a) ao Impulsion Design!</p>
                
                <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2.5 space-y-1.5 font-sans text-xs">
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm">Olá, {sentEmailData.toName}!</p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Parabéns por realizar seu primeiro cadastro! Seu plano <strong className="text-emerald-600 dark:text-emerald-400">{sentEmailData.plan}</strong> foi ativado com sucesso em <strong>{sentEmailData.date}</strong>.
                  </p>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 my-2 space-y-1 font-mono text-[11px]">
                    <p><strong>E-mail Registrado:</strong> {sentEmailData.toEmail}</p>
                    <p><strong>Chave de Acesso (Senha):</strong> {sentEmailData.key}</p>
                    <p><strong>Status da Conta:</strong> <span className="text-emerald-600 font-bold">ATIVO E LIBERADO</span></p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                <Send className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Confirmação Despachada:</strong> Enviamos uma cópia deste comprovante para sua caixa de e-mail. Seu acesso à plataforma já está pronto para uso!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                login(sentEmailData.toEmail, 'user', sentEmailData.key);
                setSentEmailData(null);
                setIsAuthModalOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Acessar o Painel do Cliente Agora</span>
            </button>
          </div>
        ) : (
          <>
            {/* Error Alert Box */}
            {errorMessage && (
              <div className="mb-5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 space-y-3 animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed font-medium">
                    {errorMessage}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setCheckoutPlan('Mensal');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Escolher um Plano e Assinar Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick Demo Access Credentials */}
            <div className="mb-5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-center space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                🔑 Contas Ativas para Teste Direto
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleQuickClientDemo}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition-all shadow"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cliente Demonstração</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoAdmin}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition-all shadow"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Entrar como Administrador</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Seu Nome Completo</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Telefone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-8888"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Plan Options Selector */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                        <span>Escolha seu Plano Desejado</span>
                      </span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-extrabold uppercase">
                        Liberação Instantânea
                      </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {activePlans.map((plan) => {
                        const isSelected = selectedPlan === plan.id;
                        return (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`relative p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 border-purple-500 text-slate-900 dark:text-white shadow-md ring-2 ring-purple-500/30'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700'
                            }`}
                          >
                            {plan.popular && (
                              <span className="absolute -top-2 right-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                                POPULAR
                              </span>
                            )}
                            {plan.id === 'Vitalício' && (
                              <span className="absolute -top-2 right-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
                                1x ÚNICA
                              </span>
                            )}

                            <div>
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="font-extrabold text-[11px] text-slate-900 dark:text-white truncate">
                                  {plan.id}
                                </span>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300 dark:border-slate-600'
                                }`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                              </div>

                              <div className="flex items-baseline gap-0.5">
                                <span className="text-xs font-black text-slate-900 dark:text-white">
                                  R$ {plan.price.toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                                  {plan.id === 'Vitalício' ? '' : '/mês'}
                                </span>
                              </div>
                            </div>

                            <p className="text-[9px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 leading-tight">
                              {plan.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {activeTab === 'resend' ? 'Digite o E-mail Utilizado na Compra' : 'E-mail de Acesso'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {activeTab !== 'resend' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {activeTab === 'register' ? 'Crie sua Chave de Acesso (Senha)' : 'Sua Chave de Acesso (Senha)'}
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Informe sua chave de acesso"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    * Chave definida no momento da assinatura do plano.
                  </p>
                </div>
              )}

              {activeTab === 'resend' && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs leading-relaxed space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Como funciona o reenvio?
                  </p>
                  <p className="text-[11px] opacity-90">
                    O sistema buscará sua assinatura ativa. Se seu e-mail já estiver cadastrado com plano pago, exibiremos o comprovante e você poderá acessar instantaneamente!
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {activeTab === 'resend' ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Verificar e Reenviar E-mail de Confirmação</span>
                  </>
                ) : activeTab === 'register' ? (
                  <>
                    <User className="w-4 h-4" />
                    <span>Registrar Acesso e Entrar</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Autenticar e Entrar no Site</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

