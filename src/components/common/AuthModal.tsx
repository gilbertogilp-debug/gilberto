import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mail, Lock, User, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, showToast, setViewMode } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('cliente@impulsio.com.br');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, isRegister ? name : undefined);
    setIsAuthModalOpen(false);
  };

  const handleQuickDemoAdmin = () => {
    login('admin@impulsio.com.br', 'Admin Master');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-8">
        
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg mx-auto">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isRegister ? 'Criar sua Conta Impulsio' : 'Acessar Plataforma'}
          </h2>
          <p className="text-xs text-slate-500">
            {isRegister ? 'Cadastre-se para liberar o catálogo' : 'Digite seus dados para entrar na sua área de membros'}
          </p>
        </div>

        {/* Quick Admin Access Demo Button */}
        <div className="mb-6 p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center space-y-1">
          <p className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">
            Acesso Rápido para Teste
          </p>
          <div className="flex gap-2 justify-center pt-1">
            <button
              onClick={() => {
                login('cliente@impulsio.com.br', 'Cliente VIP');
                setIsAuthModalOpen(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-[11px]"
            >
              Entrar como Cliente
            </button>
            <button
              onClick={handleQuickDemoAdmin}
              className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-[11px]"
            >
              Entrar como Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
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
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isRegister ? 'Criar Conta e Continuar' : 'Entrar na Conta'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            {isRegister ? 'Já possui uma conta? Faça Login' : 'Ainda não tem conta? Assine Agora'}
          </button>
        </div>

      </div>
    </div>
  );
};
