import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, CheckCircle2, Share2, Sparkles, Chrome, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AndroidInstallModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'tutorial'>('prompt');

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Sucesso! App Impulsio instalado no seu Android 🚀');
        setDeferredPrompt(null);
        onClose();
      } else {
        showToast('Instalação cancelada.');
      }
    } else {
      setActiveTab('tutorial');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-900 uppercase tracking-wide">
                Modo Nativo Android
              </span>
              <h3 className="text-xl font-black mt-1">App Impulsio no Android</h3>
            </div>
          </div>
          <p className="text-xs text-blue-100 leading-relaxed font-medium">
            Rode a plataforma como um aplicativo nativo no seu celular, sem barra de navegação, mais rápido e com acesso offline!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isStandalone ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Você já está rodando no modo App Nativo!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                O Impulsio está instalado e sincronizado perfeitamente com seu dispositivo Android.
              </p>
            </div>
          ) : (
            <>
              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Tela Cheia & Sem Barras</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Navegue em tela inteira sem distração do Chrome.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">1 Clique para o Canva</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Abra os templates editáveis direto no app do Canva Android.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Chrome className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Sem ocupação de memória</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">PWA ultra leve de 2MB com atualizações instantâneas.</p>
                  </div>
                </div>
              </div>

              {/* Install Tutorial Box if prompt not directly triggered */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Chrome className="w-4 h-4 text-blue-500" /> Como instalar manualmente no Chrome Android:
                </p>
                <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-decimal font-medium">
                  <li>Toque no menu de <span className="font-bold text-slate-900 dark:text-white">3 pontos (⋮)</span> no canto superior direito do Chrome.</li>
                  <li>Selecione a opção <span className="font-bold text-blue-600 dark:text-blue-400">"Adicionar à tela inicial"</span> ou <span className="font-bold text-blue-600 dark:text-blue-400">"Instalar aplicativo"</span>.</li>
                  <li>Confirme em <span className="font-bold text-slate-900 dark:text-white">"Adicionar"</span> e o ícone do Impulsio aparecerá na sua lista de apps!</li>
                </ol>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-2">
          {!isStandalone && (
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Instalar App no Celular Android
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Continuar pelo navegador
          </button>
        </div>

      </div>
    </div>
  );
};
