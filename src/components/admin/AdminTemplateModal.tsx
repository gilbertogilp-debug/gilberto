import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Template, TemplateFormat } from '../../types';
import { X, Plus, Image, Link, Sparkles, Layers, Tag } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editingTemplate?: Template | null;
}

export const AdminTemplateModal: React.FC<Props> = ({ isOpen, onClose, editingTemplate }) => {
  const { categories, addTemplate, updateTemplate } = useApp();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [format, setFormat] = useState<TemplateFormat>('Feed');
  const [tagsInput, setTagsInput] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [canvaUrl, setCanvaUrl] = useState('');

  useEffect(() => {
    if (editingTemplate) {
      setTitle(editingTemplate.title);
      setCategoryId(editingTemplate.categoryId);
      setFormat(editingTemplate.format);
      setTagsInput(editingTemplate.tags.join(', '));
      setDescription(editingTemplate.description);
      setImageUrl(editingTemplate.imageUrl);
      setCanvaUrl(editingTemplate.canvaUrl);
    } else {
      setTitle('');
      setCategoryId(categories[0]?.id || 'cat-alimentacao');
      setFormat('Feed');
      setTagsInput('canva, instagram, artes, redes sociais');
      setDescription('');
      setImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
      setCanvaUrl('https://www.canva.com/design/DAF1234585/view');
    }
  }, [editingTemplate, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingTemplate) {
      updateTemplate({
        ...editingTemplate,
        title,
        categoryId,
        categoryName: categories.find((c) => c.id === categoryId)?.name || 'Geral',
        format,
        tags,
        description,
        imageUrl,
        canvaUrl
      });
    } else {
      addTemplate({
        title,
        categoryId,
        categoryName: categories.find((c) => c.id === categoryId)?.name || 'Geral',
        format,
        tags,
        description,
        imageUrl,
        canvaUrl
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {editingTemplate ? 'Editar Template' : 'Cadastrar Novo Template'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Preencha os dados abaixo para disponibilizar a arte no catálogo dos assinantes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Título do Template
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Hambúrguer Promoção da Semana"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Formato da Arte
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as TemplateFormat)}
                className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              >
                <option value="Feed">Feed (1080x1080)</option>
                <option value="Story">Story (1080x1920)</option>
                <option value="Reels">Reels (Vídeo Vertical)</option>
                <option value="Carrossel">Carrossel (Múltiplos Slides)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Link do Canva (Link do Modelo/Design)
            </label>
            <input
              type="url"
              required
              placeholder="https://www.canva.com/design/..."
              value={canvaUrl}
              onChange={(e) => setCanvaUrl(e.target.value)}
              className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              URL da Imagem de Capa (Preview)
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              placeholder="hamburguer, artesanal, promoção, combo"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Descrição do Template
            </label>
            <textarea
              rows={3}
              placeholder="Descreva para quem serve este template..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{editingTemplate ? 'Atualizar Template' : 'Salvar Template'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
