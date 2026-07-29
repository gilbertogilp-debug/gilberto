import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getCategoryIcon } from '../../utils/iconHelper';
import { Plus, Folder, X } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [iconName, setIconName] = useState('Folder');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory({
      name,
      iconName,
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      description
    });
    setName('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Categorias ({categories.length})
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gerencie as categorias de nichos disponíveis na plataforma.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl border ${cat.color}`}>
                {getCategoryIcon(cat.iconName, 'w-5 h-5')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="text-xs text-slate-400">{cat.templateCount} templates</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Criar Categoria</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Nome da Categoria</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Odontologia"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Descrição</label>
                <input
                  type="text"
                  placeholder="Descrição rápida..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Salvar Categoria
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
