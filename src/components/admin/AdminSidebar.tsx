import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTab } from '../../types';
import {
  LayoutDashboard, Users, Layers, Folder, CreditCard, DollarSign,
  BarChart3, Tag, Megaphone, Settings, ShieldAlert, LogOut, Sparkles, UserCheck
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { adminTab, setAdminTab, setViewMode, switchRole, logout } = useApp();

  const menuItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard SaaS', icon: LayoutDashboard },
    { id: 'clients' as AdminTab, label: 'Clientes', icon: Users },
    { id: 'templates' as AdminTab, label: 'Templates', icon: Layers },
    { id: 'categories' as AdminTab, label: 'Categorias', icon: Folder },
    { id: 'subscriptions' as AdminTab, label: 'Assinaturas', icon: CreditCard },
    { id: 'payments' as AdminTab, label: 'Pagamentos', icon: DollarSign },
    { id: 'reports' as AdminTab, label: 'Relatórios', icon: BarChart3 },
    { id: 'coupons' as AdminTab, label: 'Cupons', icon: Tag },
    { id: 'announcements' as AdminTab, label: 'Comunicados', icon: Megaphone },
    { id: 'settings' as AdminTab, label: 'Configurações', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Top Header Bar & Tab Navigation for Admin View */}
      <div className="md:hidden sticky top-0 z-30 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800">
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-800/60">
          <div 
            onClick={() => setViewMode('home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-black text-white">Impulsion Admin</span>
              <span className="text-[10px] block font-bold text-purple-400 -mt-1 uppercase">Edição Celular</span>
            </div>
          </div>

          <button
            onClick={switchRole}
            className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-extrabold flex items-center gap-1 cursor-pointer"
          >
            <UserCheck className="w-3 h-3" /> Modo Cliente
          </button>
        </div>

        {/* Mobile Horizontal Scrollable Admin Tool Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2 scrollbar-none text-xs">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap font-extrabold text-[11px] transition-all shrink-0 cursor-pointer ${
                  active
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-950/70 backdrop-blur-xl text-slate-300 border-r border-white/10 flex-col justify-between h-screen sticky top-0 shrink-0">
      <div>
        {/* Admin Brand */}
        <div
          onClick={() => setViewMode('home')}
          className="p-6 border-b border-slate-800/80 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-extrabold text-white">
              Impulsion <span className="text-purple-400">Admin</span>
            </span>
            <p className="text-[10px] font-semibold text-purple-400/80 uppercase tracking-wider -mt-1">
              PAINEL DE CONTROLE
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = adminTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={switchRole}
          className="w-full py-2 px-3 rounded-xl bg-blue-600/20 text-blue-400 text-xs font-bold hover:bg-blue-600/30 border border-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <UserCheck className="w-3.5 h-3.5" /> Ir para Modo Cliente
        </button>

        <button
          onClick={logout}
          className="w-full py-2 px-3 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sair
        </button>
      </div>
    </aside>
    </>
  );
};
