import { Category, Template, User, Coupon, Announcement, Subscriber, PaymentTransaction, AffiliateInfo, PlanConfig } from '../types';

export const DEFAULT_PLANS: PlanConfig[] = [
  {
    id: 'Mensal',
    name: 'Plano Mensal',
    price: 29.90,
    period: '/mês',
    description: 'Ideal para testar a plataforma e criar artes rapidamente.',
    popular: false,
    active: true,
    features: [
      'Acesso a todos os +1.400 templates',
      'Todos os formatos (Feed, Story, Reels, Carrossel)',
      'Links diretos para edição no Canva',
      'Novos templates semanalmente',
      'Suporte prioritário via WhatsApp'
    ],
    ctaText: 'Assinar Plano Mensal'
  },
  {
    id: 'Anual',
    name: 'Plano Anual',
    price: 19.90,
    period: '/mês (R$ 238,80/ano)',
    badge: 'MAIS POPULAR • ECONOMIZE 33%',
    description: 'O melhor custo-benefício para empreendedores e criadores.',
    popular: true,
    active: true,
    features: [
      'TUDO do Plano Mensal',
      '33% de Desconto em relação ao mensal',
      'Acesso VIP antecipado a novos pacotes',
      'Garantia incondicional de 7 dias',
      'Bônus: Guia de Cores e Tipografias para Canva',
      'Suporte VIP 24/7'
    ],
    ctaText: 'Garantir Desconto Anual'
  },
  {
    id: 'Vitalício',
    name: 'Plano Vitalício',
    price: 397.00,
    period: 'Pague uma única vez',
    badge: 'ACESSO PRA SEMPRE',
    description: 'Acesso perpétuo sem mensalidades nem anuidades.',
    popular: false,
    active: true,
    features: [
      'Acesso PERPÉTUO a toda a biblioteca',
      'Todas as futuras atualizações incluídas para sempre',
      'Download ilimitado de qualquer template',
      'Área de Afiliados exclusiva com 30% de comissão',
      'Grupo VIP de Networking',
      'Suporte Dedicado'
    ],
    ctaText: 'Garantir Acesso Vitalício'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-alimentacao', name: 'Alimentação', iconName: 'Utensils', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', description: 'Restaurantes, lanchonetes, delivery e hamburguerias', templateCount: 142 },
  { id: 'cat-barbearia', name: 'Barbearia', iconName: 'Scissors', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', description: 'Cortes, barba, agendamentos e promoções masculinas', templateCount: 98 },
  { id: 'cat-salao', name: 'Salão', iconName: 'Sparkles', color: 'bg-pink-500/10 text-pink-500 border-pink-500/20', description: 'Salões de beleza, manicures, cílios e estética', templateCount: 125 },
  { id: 'cat-clinica', name: 'Clínica', iconName: 'Stethoscope', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20', description: 'Consultórios médicos, dentistas e fisioterapia', templateCount: 86 },
  { id: 'cat-farmacia', name: 'Farmácia', iconName: 'Pill', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', description: 'Drogaria, medicamentos e produtos de cuidados pessoais', templateCount: 64 },
  { id: 'cat-academia', name: 'Academia', iconName: 'Dumbbell', color: 'bg-red-500/10 text-red-500 border-red-500/20', description: 'Fitness, treinos, suplementos e personal trainer', templateCount: 110 },
  { id: 'cat-loja', name: 'Loja', iconName: 'ShoppingBag', color: 'bg-violet-500/10 text-violet-500 border-violet-500/20', description: 'Moda, vestuário, eletrônicos e e-commerce', templateCount: 175 },
  { id: 'cat-imobiliaria', name: 'Imobiliária', iconName: 'Building2', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20', description: 'Venda, aluguel de imóveis, lançamentos e corretores', templateCount: 94 },
  { id: 'cat-agro', name: 'Agro', iconName: 'Wheat', color: 'bg-lime-500/10 text-lime-500 border-lime-500/20', description: 'Agronegócio, fazendas, insumos e pecuária', templateCount: 52 },
  { id: 'cat-petshop', name: 'Pet Shop', iconName: 'Dog', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20', description: 'Banho e tosa, rações, veterinária e cuidados', templateCount: 78 },
  { id: 'cat-igreja', name: 'Igreja', iconName: 'Church', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', description: 'Cultos, eventos evangélicos, jovens e ministérios', templateCount: 88 },
  { id: 'cat-automoveis', name: 'Automóveis', iconName: 'Car', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20', description: 'Concessionárias, oficinas, estática automotiva e seminovos', templateCount: 72 },
  { id: 'cat-supermercado', name: 'Supermercado', iconName: 'ShoppingCart', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', description: 'Encarte semanal, ofertas, hortifrúti e promoção do dia', templateCount: 96 },
  { id: 'cat-datas', name: 'Datas Comemorativas', iconName: 'Calendar', color: 'bg-teal-500/10 text-teal-500 border-teal-500/20', description: 'Feriados, datas festivas e celebrações do ano', templateCount: 130 },
  { id: 'cat-blackfriday', name: 'Black Friday', iconName: 'Tag', color: 'bg-stone-800/20 text-yellow-400 border-yellow-500/30', description: 'Campanhas de descontos agressivos e escassez', templateCount: 105 },
  { id: 'cat-natal', name: 'Natal', iconName: 'Gift', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20', description: 'Boas festas, ceias, presentes e ofertas de fim de ano', templateCount: 84 },
  { id: 'cat-diasmaes', name: 'Dia das Mães', iconName: 'Heart', color: 'bg-pink-600/10 text-pink-600 border-pink-600/20', description: 'Homenagens, kits de presentes e promoções carinhosas', templateCount: 68 },
  { id: 'cat-diaspais', name: 'Dia dos Pais', iconName: 'UserCheck', color: 'bg-blue-600/10 text-blue-600 border-blue-600/20', description: 'Kits masculinos, homenagens e ofertas especiais', templateCount: 60 }
];

export const INITIAL_TEMPLATES: Template[] = [
  {
    id: 'tpl-1',
    title: 'Hambúrguer Artesanal Promoção da Semana',
    categoryId: 'cat-alimentacao',
    categoryName: 'Alimentação',
    format: 'Feed',
    tags: ['hamburguer', 'artesanal', 'combo', 'delivery', 'promoção'],
    description: 'Template vibrante e moderno para hamburguerias destacarem o combo especial com foto suculenta e call-to-action.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 1240,
    isNew: true,
    isTrending: true,
    rating: 4.9,
    createdAt: '2026-07-20'
  },
  {
    id: 'tpl-2',
    title: 'Corte + Barba Combo Imperdível',
    categoryId: 'cat-barbearia',
    categoryName: 'Barbearia',
    format: 'Story',
    tags: ['barbearia', 'corte', 'barba', 'agendamento', 'estilo'],
    description: 'Design escuro e sofisticado com estilo vintage/moderno para divulgação de horários e tabela de preços em barbearias.',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 980,
    isNew: false,
    isTrending: true,
    rating: 4.8,
    createdAt: '2026-07-18'
  },
  {
    id: 'tpl-3',
    title: 'Carrossel 5 Dicas de Cuidados com o Cabelo',
    categoryId: 'cat-salao',
    categoryName: 'Salão',
    format: 'Carrossel',
    tags: ['salao', 'cabelo', 'dicas', 'carrossel', 'beleza'],
    description: 'Carrossel educativo em 5 etapas para aumentar engajamento de salões de beleza e profissionais da estética.',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 1850,
    isNew: true,
    isTrending: true,
    rating: 5.0,
    createdAt: '2026-07-25'
  },
  {
    id: 'tpl-4',
    title: 'Reels Apresentação da Clínica Médica',
    categoryId: 'cat-clinica',
    categoryName: 'Clínica',
    format: 'Reels',
    tags: ['clinica', 'medico', 'saude', 'atendimento', 'reels'],
    description: 'Template em vídeo vertical com animações limpas e typography profissional para médicos e especialistas.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 720,
    isNew: false,
    isTrending: false,
    rating: 4.7,
    createdAt: '2026-07-15'
  },
  {
    id: 'tpl-5',
    title: 'Treino Semanal e Desafio Fit',
    categoryId: 'cat-academia',
    categoryName: 'Academia',
    format: 'Feed',
    tags: ['academia', 'treino', 'fitness', 'motivação', 'suplementos'],
    description: 'Post de alta energia com contraste vibrante para academias e personal trainers motivarem seus alunos.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 1430,
    isNew: true,
    isTrending: true,
    rating: 4.9,
    createdAt: '2026-07-22'
  },
  {
    id: 'tpl-6',
    title: 'Nova Coleção Outono/Inverno Moda Feminina',
    categoryId: 'cat-loja',
    categoryName: 'Loja',
    format: 'Carrossel',
    tags: ['moda', 'loja', 'lookbook', 'colecao', 'feminino'],
    description: 'Layout minimalista e elegante para boutique de roupas apresentar looks em carrossel e vender no Instagram.',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 2100,
    isNew: false,
    isTrending: true,
    rating: 5.0,
    createdAt: '2026-07-10'
  },
  {
    id: 'tpl-7',
    title: 'Lançamento de Apartamento de Luxo',
    categoryId: 'cat-imobiliaria',
    categoryName: 'Imobiliária',
    format: 'Feed',
    tags: ['imobiliaria', 'imovel', 'apartamento', 'corretor', 'luxo'],
    description: 'Design premium para corretores e imobiliárias apresentarem plantas, localização e valores de empreendimentos.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 890,
    isNew: false,
    isTrending: false,
    rating: 4.8,
    createdAt: '2026-07-12'
  },
  {
    id: 'tpl-8',
    title: 'Black Friday Esquenta - Ofertas com até 70% Off',
    categoryId: 'cat-blackfriday',
    categoryName: 'Black Friday',
    format: 'Story',
    tags: ['blackfriday', 'oferta', 'desconto', 'escassez', 'stories'],
    description: 'Banner impactante com amarelo e preto, efeitos neon e gatilhos de urgência para estourar de vender na Black Friday.',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 3450,
    isNew: true,
    isTrending: true,
    rating: 5.0,
    createdAt: '2026-07-26'
  },
  {
    id: 'tpl-9',
    title: 'Banho e Tosa Especial para o Fim de Semana',
    categoryId: 'cat-petshop',
    categoryName: 'Pet Shop',
    format: 'Feed',
    tags: ['petshop', 'dog', 'banhoetosa', 'cuidados', 'fofo'],
    description: 'Post fofo e atrativo para petshops destacarem serviços de estática animal, vacinação e acessórios.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 670,
    isNew: false,
    isTrending: false,
    rating: 4.7,
    createdAt: '2026-07-14'
  },
  {
    id: 'tpl-10',
    title: 'Culto de Celebração e Família',
    categoryId: 'cat-igreja',
    categoryName: 'Igreja',
    format: 'Feed',
    tags: ['igreja', 'culto', 'louvor', 'evangelho', 'familia'],
    description: 'Arte sacra moderna para comunicação de cultos de domingo, conferências de jovens e grupos de oração.',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 1120,
    isNew: true,
    isTrending: false,
    rating: 4.9,
    createdAt: '2026-07-21'
  },
  {
    id: 'tpl-11',
    title: 'Seminovos com Garantia e IPVA Grátis',
    categoryId: 'cat-automoveis',
    categoryName: 'Automóveis',
    format: 'Reels',
    tags: ['carros', 'seminovos', 'veiculos', 'oficina', 'vendas'],
    description: 'Vídeo dinâmico para loja de veículos mostrar detalhes do carro, quilometragem e condições de financiamento.',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 810,
    isNew: false,
    isTrending: false,
    rating: 4.8,
    createdAt: '2026-07-08'
  },
  {
    id: 'tpl-12',
    title: 'Encarte de Ofertas Supermercado do Dia',
    categoryId: 'cat-supermercado',
    categoryName: 'Supermercado',
    format: 'Carrossel',
    tags: ['supermercado', 'encarte', 'ofertas', 'hortifruti', 'desconto'],
    description: 'Encarte completo estilo tabloide para divulgação de produtos da semana com tags de preço organizadas.',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 1620,
    isNew: true,
    isTrending: true,
    rating: 4.9,
    createdAt: '2026-07-24'
  },
  {
    id: 'tpl-13',
    title: 'Feliz Dia das Mães - Presentes Inesquecíveis',
    categoryId: 'cat-diasmaes',
    categoryName: 'Dia das Mães',
    format: 'Feed',
    tags: ['diasmaes', 'mae', 'presente', 'amor', 'homenagem'],
    description: 'Design delicado e emocionante com tons florais e dourados para homenagens e vendas de kits de Dia das Mães.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 2240,
    isNew: false,
    isTrending: true,
    rating: 5.0,
    createdAt: '2026-07-02'
  },
  {
    id: 'tpl-14',
    title: 'Especial Dia dos Pais - O Pai Merece o Melhor',
    categoryId: 'cat-diaspais',
    categoryName: 'Dia dos Pais',
    format: 'Story',
    tags: ['diaspais', 'pai', 'kitmasculino', 'presentes', 'story'],
    description: 'Layout elegante e marcante para divulgação de produtos e homenagens de Dia dos Pais.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 1540,
    isNew: false,
    isTrending: false,
    rating: 4.8,
    createdAt: '2026-07-05'
  },
  {
    id: 'tpl-15',
    title: 'Boas Festas e Ceia de Natal Especial',
    categoryId: 'cat-natal',
    categoryName: 'Natal',
    format: 'Feed',
    tags: ['natal', 'boasfestas', 'fimdeano', 'presentes', 'ceia'],
    description: 'Arte natalina em vermelho e dourado com luzes cintilantes para saudações e vendas de fim de ano.',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 2890,
    isNew: false,
    isTrending: true,
    rating: 5.0,
    createdAt: '2026-06-28'
  },
  {
    id: 'tpl-16',
    title: 'Lançamento de Produto e Insumos Agrícolas',
    categoryId: 'cat-agro',
    categoryName: 'Agro',
    format: 'Feed',
    tags: ['agro', 'fazenda', 'insumos', 'campo', 'colheita'],
    description: 'Post corporativo para empresas do agronegócio divulgarem sementes, maquinários e tecnologia do campo.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 510,
    isNew: false,
    isTrending: false,
    rating: 4.6,
    createdAt: '2026-07-01'
  },
  {
    id: 'tpl-17',
    title: 'Inauguração e Oferta de Medicamentos',
    categoryId: 'cat-farmacia',
    categoryName: 'Farmácia',
    format: 'Feed',
    tags: ['farmacia', 'remedios', 'drogaria', 'saude', 'desconto'],
    description: 'Layout profissional com verde e azul para encartes de medicamentos, higiene e perfumaria.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 630,
    isNew: false,
    isTrending: false,
    rating: 4.7,
    createdAt: '2026-07-09'
  },
  {
    id: 'tpl-18',
    title: 'Post de Boas-Vindas e Cronograma Mensal',
    categoryId: 'cat-datas',
    categoryName: 'Datas Comemorativas',
    format: 'Story',
    tags: ['calendario', 'planejamento', 'datas', 'engajamento'],
    description: 'Calendário editorial interativo para redes sociais organizarem postagens e avisos.',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    canvaUrl: 'https://share.google/wNVaBMf3Y0tsleg7f',
    downloadsCount: 1390,
    isNew: true,
    isTrending: true,
    rating: 4.9,
    createdAt: '2026-07-27'
  }
];

export const MOCK_USER: User = {
  id: 'usr-101',
  name: 'Lucas Silva',
  email: 'lucas.silva@exemplo.com.br',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  plan: 'Anual',
  role: 'user',
  memberSince: '2026-01-15',
  status: 'Ativo',
  favorites: ['tpl-1', 'tpl-3', 'tpl-8', 'tpl-13'],
  downloadsHistory: [
    { templateId: 'tpl-1', downloadedAt: '2026-07-27 14:30' },
    { templateId: 'tpl-3', downloadedAt: '2026-07-26 10:15' },
    { templateId: 'tpl-6', downloadedAt: '2026-07-25 18:00' },
    { templateId: 'tpl-8', downloadedAt: '2026-07-24 09:40' }
  ]
};

export const MOCK_ADMIN: User = {
  id: 'usr-admin',
  name: 'Gilberto Gil (Admin)',
  email: 'gilbertogilp@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  plan: 'Vitalício',
  role: 'admin',
  memberSince: '2025-08-01',
  status: 'Ativo',
  favorites: [],
  downloadsHistory: []
};

export const MOCK_COUPONS: Coupon[] = [
  { id: 'coup-1', code: 'IMPULSION10', discountPercent: 10, expiresAt: '2026-12-31', usageCount: 142, maxUsage: 500, active: true },
  { id: 'coup-2', code: 'BLACK30', discountPercent: 30, expiresAt: '2026-11-30', usageCount: 88, maxUsage: 200, active: true },
  { id: 'coup-3', code: 'LANCAMENTO50', discountPercent: 50, expiresAt: '2026-08-15', usageCount: 50, maxUsage: 50, active: false }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'ann-1', title: '🚀 50 Novos Templates de Black Friday Lançados!', content: 'Adicionamos um pacote exclusivo de artes de altíssima conversão para a Black Friday. Confira no catálogo!', date: 'Hoje às 09:00', read: false, category: 'Novidade' },
  { id: 'ann-2', title: '✨ Nova Categoria: Datas Comemorativas', content: 'Agora você pode filtrar artes de feriados e eventos do calendário com um único clique.', date: 'Ontem', read: false, category: 'Atualização' },
  { id: 'ann-3', title: '💎 Atualização do Link do Canva', content: 'Melhoramos o redirecionamento instantâneo para edições sem tela de espera.', date: '22 Jul', read: true, category: 'Aviso' }
];

export const MOCK_SUBSCRIBERS: Subscriber[] = [
  { id: 'sub-1', name: 'Lucas Silva', email: 'lucas.silva@exemplo.com.br', plan: 'Anual', status: 'Ativo', amount: 238.80, paymentMethod: 'Stripe', startDate: '2026-01-15', renewalDate: '2027-01-15' },
  { id: 'sub-2', name: 'Mariana Costa', email: 'mariana.costa@gmail.com', plan: 'Mensal', status: 'Ativo', amount: 29.90, paymentMethod: 'Mercado Pago', startDate: '2026-07-01', renewalDate: '2026-08-01' },
  { id: 'sub-3', name: 'Rafael Oliveira', email: 'rafael.design@agencia.com', plan: 'Vitalício', status: 'Ativo', amount: 397.00, paymentMethod: 'PIX', startDate: '2026-06-10', renewalDate: 'N/A' },
  { id: 'sub-4', name: 'Juliana Mendes', email: 'ju.mendes@estetica.com', plan: 'Mensal', status: 'Ativo', amount: 29.90, paymentMethod: 'Asaas', startDate: '2026-07-12', renewalDate: '2026-08-12' },
  { id: 'sub-5', name: 'Bruno Henrique', email: 'bruno.barber@hotmail.com', plan: 'Anual', status: 'Inativo', amount: 238.80, paymentMethod: 'Stripe', startDate: '2025-05-10', renewalDate: '2026-05-10' }
];

export const MOCK_TRANSACTIONS: PaymentTransaction[] = [
  { id: 'tx-901', clientName: 'Lucas Silva', clientEmail: 'lucas.silva@exemplo.com.br', amount: 238.80, gateway: 'Stripe', status: 'Aprovado', date: '2026-01-15 14:22', planName: 'Plano Anual Pro', invoiceUrl: '#' },
  { id: 'tx-902', clientName: 'Mariana Costa', clientEmail: 'mariana.costa@gmail.com', amount: 29.90, gateway: 'Mercado Pago', status: 'Aprovado', date: '2026-07-01 10:11', planName: 'Plano Mensal VIP', invoiceUrl: '#' },
  { id: 'tx-903', clientName: 'Rafael Oliveira', clientEmail: 'rafael.design@agencia.com', amount: 397.00, gateway: 'Asaas', status: 'Aprovado', date: '2026-06-10 16:45', planName: 'Plano Vitalício Premium', invoiceUrl: '#' },
  { id: 'tx-904', clientName: 'Carla Dias', clientEmail: 'carla.dias@yahoo.com', amount: 29.90, gateway: 'Mercado Pago', status: 'Pendente', date: '2026-07-28 08:30', planName: 'Plano Mensal VIP', invoiceUrl: '#' }
];

export const MOCK_AFFILIATE: AffiliateInfo = {
  referralCode: 'LUCASSILVA30',
  totalEarnings: 1240.50,
  pendingPayout: 380.00,
  totalReferrals: 18,
  conversionRate: 14.2,
  referralLink: 'https://impulsion.com.br/ref/LUCASSILVA30'
};
