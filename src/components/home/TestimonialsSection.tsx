import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Camila Fernandes',
      role: 'Social Media Manager & Criadora',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      text: 'O Impulsio Templates mudou o fluxo de trabalho da minha agência. Reduzi o tempo de produção de posts em 70% e meus clientes adoram os layouts!',
      rating: 5,
      niche: 'Agência Digital'
    },
    {
      name: 'Dr. Fernando Mello',
      role: 'Cirurgião Dentista',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      text: 'A categoria de Clínicas é fantástica! Consigo postar sobre procedimentos e dicas para meus pacientes sem precisar gastar fortunas com designer.',
      rating: 5,
      niche: 'Odontologia'
    },
    {
      name: 'Rodrigo Barbosa',
      role: 'Dono de Barbearia & Empreendedor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      text: 'Os templates de barbearia são muito estilosos e modernos. A facilidade de clicar e abrir direto no Canva no celular é o ponto forte!',
      rating: 5,
      niche: 'Barbearia'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Prova Social
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            O que Dizem Nossos Assinantes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mais de 12.000 profissionais e empreendedores economizam tempo com o Impulsio.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-lg relative space-y-4 flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-blue-500/20 absolute top-6 right-6" />

              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-blue-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
