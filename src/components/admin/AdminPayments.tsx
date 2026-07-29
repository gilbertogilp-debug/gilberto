import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign, ShieldCheck, Download, CheckCircle2, Search, Filter,
  Eye, RefreshCw, X, AlertCircle, FileText, Check, Clock, UserCheck
} from 'lucide-react';
import { PaymentTransaction } from '../../types';

export const AdminPayments: React.FC = () => {
  const { transactions, updateTransactionStatus, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [gatewayFilter, setGatewayFilter] = useState<string>('Todos');
  const [selectedTx, setSelectedTx] = useState<PaymentTransaction | null>(null);

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesQuery =
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.cpf && t.cpf.includes(searchQuery));

    const matchesStatus = statusFilter === 'Todos' || t.status === statusFilter;
    const matchesGateway = gatewayFilter === 'Todos' || t.gateway === gatewayFilter;

    return matchesQuery && matchesStatus && matchesGateway;
  });

  const totalAmountApproved = transactions
    .filter((t) => t.status === 'Aprovado')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingCount = transactions.filter((t) => t.status === 'Pendente').length;
  const approvedCount = transactions.filter((t) => t.status === 'Aprovado').length;

  const handleExportCSV = () => {
    const headers = ['ID', 'Cliente', 'E-mail', 'Plano', 'Valor', 'Gateway', 'Status', 'Data'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      `"${t.clientName}"`,
      t.clientEmail,
      t.planName,
      t.amount.toFixed(2),
      t.gateway,
      t.status,
      `"${t.date}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_transacoes_pix_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📊 Relatório CSV exportado com sucesso!');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header & Metrics Overview */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            Gestão de Pagamentos PIX & Webhooks <DollarSign className="w-6 h-6 text-emerald-500" />
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Acompanhe a liberação automática de acessos, status do PIX e integração com gateways.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto"
        >
          <Download className="w-4 h-4" /> Exportar Relatório CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Aprovado via PIX</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            R$ {totalAmountApproved.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-xs text-slate-500">{approvedCount} transações confirmadas</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">PIX Pendentes / Aguardando</span>
          <p className="text-2xl font-black text-amber-500">
            {pendingCount} Transações
          </p>
          <p className="text-xs text-slate-500">Aguardando Webhook do Banco</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Taxa de Liberação Automática</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
            100% On-line
          </p>
          <p className="text-xs text-slate-500">Sincronização imediata via API</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 md:space-y-0 md:flex md:items-center md:justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail, CPF ou ID da transação..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold cursor-pointer"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Pendente">Pendente</option>
            <option value="Expirado">Expirado</option>
            <option value="Recusado">Recusado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <select
            value={gatewayFilter}
            onChange={(e) => setGatewayFilter(e.target.value)}
            className="py-2 px-3 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold cursor-pointer"
          >
            <option value="Todos">Todos os Gateways</option>
            <option value="Mercado Pago">Mercado Pago</option>
            <option value="Asaas">Asaas</option>
            <option value="Efí Gerencianet">Efí Gerencianet</option>
            <option value="PagSeguro">PagSeguro</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="py-3 px-4">ID Transação</th>
                <th className="py-3 px-4">Cliente / E-mail</th>
                <th className="py-3 px-4">Plano</th>
                <th className="py-3 px-4">Gateway</th>
                <th className="py-3 px-4">Valor</th>
                <th className="py-3 px-4">Data/Hora</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">
                    Nenhuma transação encontrada para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">{t.id}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-white">{t.clientName}</p>
                      <p className="text-[10px] text-slate-400">{t.clientEmail}</p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-purple-600 dark:text-purple-400">{t.planName}</td>
                    <td className="py-3.5 px-4 font-semibold">{t.gateway}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      R$ {t.amount.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3.5 px-4 text-[11px]">{t.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        t.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        t.status === 'Pendente' ? 'bg-amber-500/10 text-amber-600' :
                        t.status === 'Expirado' ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-500/10 text-slate-500'
                      }`}>
                        {t.status === 'Aprovado' && <CheckCircle2 className="w-3 h-3" />}
                        {t.status === 'Pendente' && <Clock className="w-3 h-3" />}
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedTx(t)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-300 text-[11px] font-bold cursor-pointer transition-all inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details & Manual Webhook Action Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 text-left">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                Detalhes do Pagamento PIX #{selectedTx.id}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Transação via {selectedTx.gateway}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[10px] block">Nome do Cliente</span>
                  <strong className="text-slate-900 dark:text-white">{selectedTx.clientName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">E-mail</span>
                  <strong className="text-slate-900 dark:text-white">{selectedTx.clientEmail}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Plano</span>
                  <strong className="text-purple-600 dark:text-purple-400">{selectedTx.planName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Valor Processado</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">R$ {selectedTx.amount.toFixed(2).replace('.', ',')}</strong>
                </div>
              </div>
            </div>

            {/* Change Status Control Panel */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Alterar Status do Pagamento / Liberação Manual:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { status: 'Aprovado', color: 'bg-emerald-600 text-white' },
                  { status: 'Pendente', color: 'bg-amber-500 text-white' },
                  { status: 'Expirado', color: 'bg-rose-500 text-white' },
                  { status: 'Cancelado', color: 'bg-slate-600 text-white' }
                ].map((item) => (
                  <button
                    key={item.status}
                    onClick={() => {
                      updateTransactionStatus(selectedTx.id, item.status as any);
                      setSelectedTx({ ...selectedTx, status: item.status as any });
                    }}
                    className={`py-2 px-3 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                      selectedTx.status === item.status ? item.color + ' shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.status}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
