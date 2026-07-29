import React from 'react';
import { useApp } from '../../context/AppContext';
import { Download, ExternalLink, Sparkles, Clock } from 'lucide-react';

export const ClientDownloads: React.FC = () => {
  const { currentUser, templates, setPreviewTemplate, recordDownload } = useApp();

  const history = currentUser?.downloadsHistory || [];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          Histórico de Acessos ao Canva <Download className="w-6 h-6 text-blue-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Reabra rapidamente os templates que você abriu recentemente no seu Canva.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Download className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Nenhum histórico registrado ainda
          </h3>
          <p className="text-xs text-slate-500">
            Ao clicar em "Editar no Canva", o histórico do template fica gravado aqui.
          </p>
        </div>
      ) : (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.map((item, idx) => {
              const tpl = templates.find((t) => t.id === item.templateId);
              if (!tpl) return null;

              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={tpl.imageUrl}
                      alt={tpl.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {tpl.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">{tpl.categoryName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.downloadedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      recordDownload(tpl);
                      window.open(tpl.canvaUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>Reabrir no Canva</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
