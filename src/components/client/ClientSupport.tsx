import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, MessageSquare, Send, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';

export const ClientSupport: React.FC = () => {
  const { showToast } = useApp();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Chamado de suporte enviado! Responderemos em até 2 horas.');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          Suporte VIP & Atendimento <HelpCircle className="w-6 h-6 text-blue-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Precisa de ajuda com algum template ou conta? Estamos prontos para te atender.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Ticket Form */}
        <div className="md:col-span-2 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" /> Abrir Chamado de Suporte
          </h2>

          {sent ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                Sua mensagem foi recebida!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Nossa equipe de suporte técnico já recebeu sua solicitação e responderá no seu e-mail cadastrado.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold"
              >
                Enviar Outra Mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dúvida sobre como salvar o modelo no Canva"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mensagem Detalhada
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Descreva o que está acontecendo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Enviar Chamado
              </button>
            </form>
          )}
        </div>

        {/* Right Direct WhatsApp Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-600 to-teal-700 text-white shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Atendimento via WhatsApp</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Assinantes dos planos Anual e Vitalício possuem acesso direto ao WhatsApp da equipe Impulsion de Segunda a Sábado das 08h às 20h.
            </p>
          </div>

          <button
            onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            className="w-full py-3 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-50 transition-colors"
          >
            <span>Falar no WhatsApp Agora</span>
          </button>
        </div>

      </div>
    </div>
  );
};
