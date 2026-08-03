import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Template } from '../../types';
import { AdminTemplateModal } from './AdminTemplateModal';
import { Plus, Search, Edit2, Trash2, ExternalLink, Download, Layers } from 'lucide-react';
import { extractMediaUrl } from '../../utils/mediaHelper';

export const AdminTemplates: React.FC = () => {
  const { templates, deleteTemplate } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [query, setQuery] = useState('');

  const handleCreate = () => {
    setEditingTemplate(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tpl: Template) => {
    setEditingTemplate(tpl);
    setIsModalOpen(true);
  };

  const filtered = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      t.format.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Gerenciamento de Templates ({templates.length})
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cadastre, edite ou remova artes da biblioteca dos assinantes.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Cadastrar Novo Template
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filtrar por nome, categoria ou formato..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="py-3 px-4">Capa</th>
                <th className="py-3 px-4">Título</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Formato</th>
                <th className="py-3 px-4">Downloads</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filtered.map((tpl) => (
                <tr key={tpl.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4">
                    <img
                      src={extractMediaUrl(tpl.imageUrl)}
                      alt={tpl.title}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {tpl.title}
                  </td>
                  <td className="py-3 px-4 font-semibold text-purple-600 dark:text-purple-400">
                    {tpl.categoryName}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {tpl.format}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">{tpl.downloadsCount}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(tpl)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTemplate(tpl.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminTemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTemplate={editingTemplate}
      />
    </div>
  );
};
