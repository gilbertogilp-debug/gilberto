import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white shadow-2xl border border-blue-500/30 backdrop-blur-md">
        <div className="p-1.5 rounded-xl bg-blue-600/20 text-blue-400">
          <CheckCircle2 className="w-5 h-5 text-blue-400" />
        </div>
        <p className="text-sm font-medium pr-2 text-slate-100">{toastMessage}</p>
      </div>
    </div>
  );
};
