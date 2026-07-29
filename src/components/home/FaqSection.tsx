import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Preciso ter o Canva Pro pago para usar os templates?',
      a: 'Não! Todos os nossos templates são cuidadosamente desenhados com fontes, fotos e elementos 100% gratuitos do Canva. Você pode editar no celular ou computador usando uma conta grátis do Canva.'
    },
    {
      q: 'Como recebo o acesso aos templates após assinar?',
      a: 'O acesso é imediato! Assim que seu pagamento for aprovado (no PIX e Cartão é instantâneo), você faz login na plataforma Impulsio e já pode navegar pelas categorias e abrir os links direto no seu Canva.'
    },
    {
      q: 'Posso alterar textos, fotos e cores dos modelos?',
      a: 'Com certeza! Ao clicar em "Editar no Canva", o modelo se torna sua cópia privada. Você pode alterar tudo: texto, logo, cores da marca, fontes, fotos e adicionar seus dados de contato.'
    },
    {
      q: 'Com que frequência são adicionados novos templates?',
      a: 'Adicionamos semanalmente novos pacotes de artes focando em sazonalidade (como datas comemorativas, Natal, Black Friday) e novidades nas áreas de saúde, alimentação, beleza e comércio.'
    },
    {
      q: 'Como funciona a garantia de 7 dias?',
      a: 'Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar 100% satisfeito, basta solicitar o reembolso na área de suporte ou e-mail que devolvemos todo o seu dinheiro sem burocracia.'
    },
    {
      q: 'Quais formas de pagamento vocês aceitam?',
      a: 'Aceitamos PIX (aprovação em segundos), Cartões de Crédito (com parcelamento) e Boleto Bancário via Stripe, Mercado Pago e Asaas.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Tira-Dúvidas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ficou com alguma dúvida? Confira as respostas rápidas abaixo.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/40 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
