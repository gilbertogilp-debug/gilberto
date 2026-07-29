import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Subscriber } from '../../types';
import {
  Users, Search, UserPlus, Trash2, ShieldCheck, XCircle,
  CheckCircle2, AlertCircle, Filter, DollarSign, Calendar,
  CreditCard, QrCode, Mail, User, X
} from 'lucide-react';

export const AdminClients: React.FC = () => {
  const { subscribers, deleteSubscriber, addSubscriber, updateSubscriberStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Ativo' | 'Inativo' | 'Pendente'>('Todos');
  const [planFilter, setPlanFilter] = useState<'Todos' | 'Mensal' | 'Anual' | 'Vitalício'>('Todos');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<Subscriber | null>(null);

  // New Client Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPlan, setNewPlan] = useState<'Mensal' | 'Anual' | 'Vitalício'>('Mensal');
  const [newStatus, setNewStatus] = useState<'Ativo' | 'Inativo' | 'Pendente'>('Ativo');
  const [newPaymentMethod, setNewPaymentMethod] = useState<'Stripe' | 'Mercado Pago' | 'Asaas' | 'PIX'>('PIX');
  const [newAmount, setNewAmount] = useState('29.90');

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || sub.status === statusFilter;
    const matchesPlan = planFilter === 'Todos' || sub.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Calculate Metrics
  const totalClients = subscribers.length;
  const activeClients = subscribers.filter((s) => s.status === 'Ativo').length;
  const pendingClients = subscribers.filter((s) => s.status === 'Pendente').length;
  const totalRevenue = subscribers
    .filter((s) => s.status === 'Ativo')
    .reduce((acc, s) => acc + (s.amount || 29.9), 0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const today = new Date().toLocaleDateString('pt-BR');
    const renewalYear = new Date().getFullYear() + 1;
    const renewal = `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${renewalYear}`;

    addSubscriber({
      name: newName,
      email: newEmail,
      plan: newPlan,
      status: newStatus,
      amount: parseFloat(newAmount) || 29.9,
      paymentMethod: newPaymentMethod,
      startDate: today,
      renewalDate: newPlan === 'Vitalício' ? 'Acesso Perpétuo' : renewal
    });

    // Reset Form
    setNewName('');
    setNewEmail('');
    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (subscriberToDelete) {
      deleteSubscriber(subscriberToDelete.id);
      setSubscriberToDelete(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            Gerenciamento de Clientes <Users className="w-6 h-6 text-purple-500" />
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gerencie acessos, adicione assinantes e exclua/remova clientes da plataforma.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" /> Adicionar Novo Cliente
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total de Clientes</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalClients}</p>
          <span className="text-[10px] text-purple-500 font-semibold">Cadastrados na base</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assinantes Ativos</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{activeClients}</p>
          <span className="text-[10px] text-emerald-500 font-semibold">Acesso liberado</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pendentes / Inativos</p>
          <p className="text-2xl font-black text-amber-500">{pendingClients}</p>
          <span className="text-[10px] text-amber-500 font-semibold">Aguardando confirmação</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receita Ativa Est.</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            R$ {totalRevenue.toFixed(2).replace('.', ',')}
          </p>
          <span className="text-[10px] text-indigo-400 font-semibold">Faturamento de ativos</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Ativo">Apenas Ativos</option>
            <option value="Inativo">Inativos</option>
            <option value="Pendente">Pendentes</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
          >
            <option value="Todos">Todos os Planos</option>
            <option value="Mensal">Plano Mensal</option>
            <option value="Anual">Plano Anual</option>
            <option value="Vitalício">Plano Vitalício</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Plano</th>
                <th className="py-3.5 px-4">Pagamento</th>
                <th className="py-3.5 px-4">Início</th>
                <th className="py-3.5 px-4">Renovação</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações (Excluir / Editar)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Nenhum cliente encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    {/* Name & Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                          {s.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-xs">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="py-3.5 px-4 font-semibold">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold text-[11px]">
                        {s.plan}
                      </span>
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full ${
                        s.paymentMethod === 'PIX'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                      }`}>
                        {s.paymentMethod === 'PIX' ? <QrCode className="w-3 h-3 text-emerald-500" /> : <CreditCard className="w-3 h-3 text-blue-500" />}
                        {s.paymentMethod}
                      </span>
                    </td>

                    {/* Start Date */}
                    <td className="py-3.5 px-4 text-slate-500">{s.startDate}</td>

                    {/* Renewal Date */}
                    <td className="py-3.5 px-4 text-slate-500">{s.renewalDate}</td>

                    {/* Status Dropdown / Badge */}
                    <td className="py-3.5 px-4">
                      <select
                        value={s.status}
                        onChange={(e) => updateSubscriberStatus(s.id, e.target.value as any)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border focus:outline-none cursor-pointer ${
                          s.status === 'Ativo'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : s.status === 'Pendente'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                        }`}
                      >
                        <option value="Ativo">🟢 Ativo</option>
                        <option value="Pendente">🟡 Pendente</option>
                        <option value="Inativo">🔴 Inativo</option>
                      </select>
                    </td>

                    {/* Actions: Delete Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSubscriberToDelete(s)}
                        className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                        title="Excluir / Remover Cliente da Base"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Excluir</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Adicionar Novo Cliente */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-500" /> Adicionar Cliente Manualmente
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Cadastre um cliente diretamente no painel para conceder acesso imediato.
              </p>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Maria Eduarda Santos"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">E-mail do Cliente</label>
                <input
                  type="email"
                  required
                  placeholder="ex: maria@exemplo.com.br"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Plano Escolhido</label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value as any)}
                    className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white"
                  >
                    <option value="Mensal">Plano Mensal (R$ 29,90)</option>
                    <option value="Anual">Plano Anual (R$ 238,80)</option>
                    <option value="Vitalício">Plano Vitalício (R$ 397,00)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Forma de Pagamento</label>
                  <select
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value as any)}
                    className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white"
                  >
                    <option value="PIX">PIX Direto</option>
                    <option value="Stripe">Stripe</option>
                    <option value="Mercado Pago">Mercado Pago</option>
                    <option value="Asaas">Asaas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Status do Acesso</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white"
                  >
                    <option value="Ativo">🟢 Ativo (Liberado)</option>
                    <option value="Pendente">🟡 Pendente</option>
                    <option value="Inativo">🔴 Inativo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Valor Cobrado (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Exclusão de Cliente */}
      {subscriberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Excluir e Remover Cliente?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Tem certeza que deseja remover permanentemente o cliente{' '}
                <strong className="text-slate-900 dark:text-white font-bold">{subscriberToDelete.name}</strong> ({subscriberToDelete.email})?
                Esta ação revogará o acesso do assinante.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSubscriberToDelete(null)}
                className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                Sim, Excluir Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
