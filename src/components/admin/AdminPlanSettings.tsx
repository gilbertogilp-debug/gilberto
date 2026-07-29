import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlanConfig } from '../../types';
import { 
  CreditCard, Plus, Trash2, Edit3, Save, Check, Sparkles, 
  RotateCcw, Eye, Zap, ShieldCheck, ArrowRight, ToggleLeft, ToggleRight, AlertCircle, X
} from 'lucide-react';

export const AdminPlanSettings: React.FC = () => {
  const { plans, updatePlan, addPlan, deletePlan, resetPlansToDefault, showToast } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Form State for edit or create
  const [formData, setFormData] = useState<Omit<PlanConfig, 'id'>>({
    name: '',
    price: 29.90,
    period: '/mês',
    badge: '',
    description: '',
    popular: false,
    active: true,
    features: ['Acesso ilimitado a todos os templates', 'Suporte prioritário via WhatsApp'],
    ctaText: 'Assinar Agora'
  });

  const [newFeatureText, setNewFeatureText] = useState('');

  const handleStartEdit = (plan: PlanConfig) => {
    setEditingId(plan.id);
    setIsCreating(false);
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      badge: plan.badge || '',
      description: plan.description,
      popular: plan.popular,
      active: plan.active !== false,
      features: [...plan.features],
      ctaText: plan.ctaText
    });
    setNewFeatureText('');
  };

  const handleStartCreate = () => {
    setEditingId(null);
    setIsCreating(true);
    setFormData({
      name: 'Plano Semestral',
      price: 149.90,
      period: 'a cada 6 meses',
      badge: 'OFERTA ESPECIAL',
      description: 'Ótima opção intermediária para criar artes o ano todo.',
      popular: false,
      active: true,
      features: [
        'Acesso a todos os +1.400 templates',
        'Todos os formatos (Feed, Story, Reels, Carrossel)',
        'Links diretos no Canva',
        'Suporte VIP'
      ],
      ctaText: 'Garantir Plano Semestral'
    });
    setNewFeatureText('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setNewFeatureText('');
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeatureText.trim()]
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Por favor, informe o nome do plano.');
      return;
    }

    if (isCreating) {
      addPlan(formData);
      setIsCreating(false);
    } else if (editingId) {
      updatePlan(editingId, {
        id: editingId,
        ...formData
      });
      setEditingId(null);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o plano "${name}"?`)) {
      deletePlan(id);
      if (editingId === id) {
        setEditingId(null);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-xs uppercase tracking-wider border border-purple-500/30">
            <CreditCard className="w-3.5 h-3.5" /> Gestão de Planos & Preços
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Configuração dos Planos de Pagamento
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Personalize nomes, valores, períodos de cobrança, benefícios e selos dos planos exibidos no site e no checkout.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={resetPlansToDefault}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Restaurar Padrões</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novo Plano</span>
          </button>
        </div>
      </div>

      {/* Editor Modal/Card if Editing or Creating */}
      {(editingId || isCreating) && (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-500/40 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {isCreating ? 'Cadastrar Novo Plano de Pagamento' : `Editar Plano: ${formData.name}`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ajuste os valores e parâmetros deste plano comercial.
                </p>
              </div>
            </div>

            <button
              onClick={handleCancel}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Nome */}
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Nome do Plano *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Plano Mensal Pro"
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              {/* Preço */}
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Preço em Reais (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="29.90"
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              {/* Período */}
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Período / Rótulo de Frequência *
                </label>
                <input
                  type="text"
                  required
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="ex: /mês ou Pague uma única vez"
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Selo de Destaque / Badge (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="ex: MAIS POPULAR • ECONOMIZE 33%"
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              {/* CTA Text */}
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Texto do Botão (CTA) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="ex: Assinar Plano Mensal"
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              {/* Switches */}
              <div className="flex items-center gap-6 pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                    Plano Mais Popular / Destacado
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    Plano Ativo no Site
                  </span>
                </label>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                Descrição do Plano
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explicativo curto do público-alvo ou principal vantagem deste plano"
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              />
            </div>

            {/* Features Editor */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <label className="block text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                <span>Benefícios & Vantagens Inclusas ({formData.features.length})</span>
                <span className="text-[10px] text-slate-400 font-normal normal-case">
                  Serão exibidas com ícones de checagem no card
                </span>
              </label>

              <div className="space-y-2">
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="flex-1 font-medium text-slate-800 dark:text-slate-200">{feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Remover vantagem"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="Digite uma nova vantagem (ex: Suporte VIP 24/7)..."
                  className="flex-1 p-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? 'Criar e Ativar Plano' : 'Salvar Alterações'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plan Cards Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isBeingEdited = editingId === p.id;
          const formattedPrice = p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

          return (
            <div
              key={p.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all border ${
                p.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-purple-500 shadow-xl'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 shadow-sm'
              } ${!p.active ? 'opacity-60 border-dashed' : ''}`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    p.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  }`}>
                    {p.active ? '● Ativo no Site' : '○ Oculto/Inativo'}
                  </span>

                  {p.popular && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500 text-white uppercase tracking-wider">
                      ★ Destaque
                    </span>
                  )}
                </div>

                {p.badge && (
                  <div className="mb-3 inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black tracking-wider uppercase shadow-sm">
                    {p.badge}
                  </div>
                )}

                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                  {p.description}
                </p>

                <div className="my-5">
                  <span className="text-xs text-slate-400">R$</span>
                  <span className="text-3xl font-black ml-1">{formattedPrice}</span>
                  <span className="text-xs text-slate-400 ml-1">{p.period}</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                  <p className="font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                    {p.features.length} Benefícios Incluídos:
                  </p>
                  {p.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${p.popular ? 'text-purple-400' : 'text-emerald-500'}`} />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                  {p.features.length > 4 && (
                    <p className="text-[11px] font-bold text-purple-500">
                      +{p.features.length - 4} outros benefícios...
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleStartEdit(p)}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-purple-600/20"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar Plano</span>
                </button>

                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition-all cursor-pointer"
                  title="Excluir Plano"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
