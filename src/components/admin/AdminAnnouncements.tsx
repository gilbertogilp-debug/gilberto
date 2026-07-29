import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, Send, Sparkles } from 'lucide-react';

export const AdminAnnouncements: React.FC = () => {
  const { announcements, addAnnouncement } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Novidade' | 'Atualização' | 'Aviso' | 'Promoção'>('Novidade');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement(title, content, category);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          Enviar Comunicado aos Clientes <Megaphone className="w-6 h-6 text-purple-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Notifique todos os clientes na central de avisos sobre lançamentos, novas artes e atualizações.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold mb-1">Título do Comunicado</label>
          <input
            type="text"
            required
            placeholder="Ex: 50 Novos Templates de Black Friday Lançados!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border"
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">Categoria do Aviso</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border font-semibold"
          >
            <option value="Novidade">🚀 Novidade</option>
            <option value="Atualização">✨ Atualização</option>
            <option value="Aviso">🔔 Aviso</option>
            <option value="Promoção">💎 Promoção</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">Conteúdo da Notificação</label>
          <textarea
            rows={4}
            required
            placeholder="Escreva a mensagem para os assinantes..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" /> Disparar Comunicado
        </button>
      </form>

      {/* History */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Histórico de Envios ({announcements.length})
        </h3>
        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-purple-600 dark:text-purple-400">{ann.category}</span>
                <span className="text-slate-400 text-[10px]">{ann.date}</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{ann.title}</p>
              <p className="text-xs text-slate-500">{ann.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
