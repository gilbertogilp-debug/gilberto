import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Template, Category, User, ViewMode, ClientTab, AdminTab,
  Coupon, Announcement, Subscriber, PaymentTransaction, AffiliateInfo, TemplateFormat, PixConfig, PlanConfig
} from '../types';
import {
  INITIAL_CATEGORIES, INITIAL_TEMPLATES, MOCK_USER, MOCK_ADMIN,
  MOCK_COUPONS, MOCK_ANNOUNCEMENTS, MOCK_SUBSCRIBERS, MOCK_TRANSACTIONS, MOCK_AFFILIATE, DEFAULT_PLANS
} from '../data/mockData';

interface AppContextType {
  // Navigation & Theme
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  clientTab: ClientTab;
  setClientTab: (tab: ClientTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // User State
  currentUser: User | null;
  isLoggedIn: boolean;
  demoDownloadsCount: number;
  resetDemoDownloadsCount: () => void;
  login: (email: string, role?: 'user' | 'admin', accessKey?: string) => { success: boolean; message: string };
  registerCustomerAccess: (name: string, email: string, phone: string, accessKey: string, planName?: string) => void;
  logout: () => void;
  switchRole: () => void;
  updateUserProfile: (name: string, email: string, avatarUrl?: string, accessKey?: string) => void;

  // Data Collections
  templates: Template[];
  categories: Category[];
  coupons: Coupon[];
  announcements: Announcement[];
  subscribers: Subscriber[];
  transactions: PaymentTransaction[];
  affiliateInfo: AffiliateInfo;

  // Filter & Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string; // 'all' or categoryId
  setSelectedCategory: (catId: string) => void;
  selectedFormat: string; // 'all' or TemplateFormat
  setSelectedFormat: (fmt: string) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (fav: boolean) => void;

  // Actions
  favorites: string[];
  toggleFavorite: (templateId: string) => void;
  isFavorite: (templateId: string) => boolean;
  recordDownload: (template: Template) => void;

  // Admin Actions
  addTemplate: (template: Omit<Template, 'id' | 'downloadsCount' | 'createdAt'>) => void;
  updateTemplate: (template: Template) => void;
  deleteTemplate: (id: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'templateCount'>) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  toggleCouponActive: (id: string) => void;
  addAnnouncement: (title: string, content: string, category: Announcement['category']) => void;

  // Subscriber & Payment Management
  deleteSubscriber: (id: string) => void;
  addSubscriber: (subscriber: Omit<Subscriber, 'id'>) => void;
  updateSubscriberStatus: (id: string, status: Subscriber['status']) => void;
  recordPaymentTransaction: (data: {
    clientName: string;
    clientEmail: string;
    amount: number;
    gateway: 'Stripe' | 'Mercado Pago' | 'Asaas' | 'PagSeguro' | 'Efí Gerencianet';
    planName: string;
    clientPhone?: string;
    clientKey?: string;
    cpf?: string;
    status?: PaymentTransaction['status'];
  }) => PaymentTransaction;
  updateTransactionStatus: (id: string, newStatus: PaymentTransaction['status']) => void;

  // PIX Config
  pixConfig: PixConfig;
  updatePixConfig: (config: PixConfig) => void;

  // Plans Config
  plans: PlanConfig[];
  updatePlan: (id: string, updatedPlan: PlanConfig) => void;
  addPlan: (plan: Omit<PlanConfig, 'id'>) => void;
  deletePlan: (id: string) => void;
  resetPlansToDefault: () => void;

  // Modals
  previewTemplate: Template | null;
  setPreviewTemplate: (template: Template | null) => void;
  checkoutPlan: string | null;
  setCheckoutPlan: (plan: string | null) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isSideToolbarOpen: boolean;
  setIsSideToolbarOpen: (open: boolean) => void;
  isQuickSearchOpen: boolean;
  setIsQuickSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  enterAdminMode: (tabTarget?: AdminTab) => void;
  
  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('impulsio_theme');
    return saved ? saved === 'dark' : true; // Default dark/modern aesthetic
  });

  // Navigation
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [clientTab, setClientTab] = useState<ClientTab>('dashboard');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('impulsio_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Registered Users list for authentication and subscription validation
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('impulsion_registered_users');
    if (saved) return JSON.parse(saved);
    return [
      MOCK_USER,
      MOCK_ADMIN,
      {
        id: 'usr-102',
        name: 'Cliente VIP',
        email: 'cliente@impulsion.com.br',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        plan: 'Mensal',
        role: 'user',
        memberSince: '2026-07-01',
        status: 'Ativo',
        accessKey: '123456',
        favorites: [],
        downloadsHistory: []
      },
      {
        id: 'usr-103',
        name: 'Mariana Costa',
        email: 'mariana.costa@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        plan: 'Mensal',
        role: 'user',
        memberSince: '2026-07-01',
        status: 'Ativo',
        accessKey: '123456',
        favorites: [],
        downloadsHistory: []
      },
      {
        id: 'usr-104',
        name: 'Rafael Oliveira',
        email: 'rafael.design@agencia.com',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        plan: 'Vitalício',
        role: 'user',
        memberSince: '2026-06-10',
        status: 'Ativo',
        accessKey: '123456',
        favorites: [],
        downloadsHistory: []
      },
      {
        id: 'usr-105',
        name: 'Bruno Henrique',
        email: 'bruno.barber@hotmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
        plan: 'Anual',
        role: 'user',
        memberSince: '2025-05-10',
        status: 'Inativo',
        accessKey: '123456',
        favorites: [],
        downloadsHistory: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('impulsion_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Route Protection Guard
  useEffect(() => {
    if ((viewMode === 'client' || viewMode === 'admin') && (!currentUser || (currentUser.role !== 'admin' && currentUser.status !== 'Ativo'))) {
      setViewMode('home');
      showToast('🔒 Área restrita: É necessário estar autenticado com um e-mail de plano ativo.');
      setIsAuthModalOpen(true);
    }
  }, [viewMode, currentUser]);

  // Data Collections
  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem('impulsio_templates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((t: Template) => ({
          ...t,
          canvaUrl: !t.canvaUrl || t.canvaUrl.includes('canva.com/design/DAF') ? 'https://share.google/wNVaBMf3Y0tsleg7f' : t.canvaUrl
        }));
      } catch (e) {
        return INITIAL_TEMPLATES;
      }
    }
    return INITIAL_TEMPLATES;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('impulsio_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    const saved = localStorage.getItem('impulsio_subscribers');
    return saved ? JSON.parse(saved) : MOCK_SUBSCRIBERS;
  });

  const [pixConfig, setPixConfig] = useState<PixConfig>(() => {
    const saved = localStorage.getItem('impulsio_pix');
    return saved ? JSON.parse(saved) : {
      pixKey: '48.912.384/0001-90',
      pixKeyType: 'CNPJ',
      recipientName: 'Impulsion Digital Ltda',
      bankName: 'Banco Inter S.A.',
      city: 'São Paulo - SP',
      instructions: 'Realize o PIX e a liberação da conta será realizada instantaneamente. Se desejar, envie o comprovante no suporte.'
    };
  });

  const [plans, setPlans] = useState<PlanConfig[]>(() => {
    const saved = localStorage.getItem('impulsion_plans');
    return saved ? JSON.parse(saved) : DEFAULT_PLANS;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('impulsio_transactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('impulsio_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('impulsio_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Demo Mode downloads tracking (limited to 3 downloads for non-subscribed visitors)
  const [demoDownloadsCount, setDemoDownloadsCount] = useState<number>(() => {
    const saved = localStorage.getItem('impulsion_demo_downloads_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const resetDemoDownloadsCount = () => {
    setDemoDownloadsCount(0);
    localStorage.removeItem('impulsion_demo_downloads_count');
  };
  const [affiliateInfo] = useState<AffiliateInfo>(MOCK_AFFILIATE);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    return currentUser?.favorites || ['tpl-1', 'tpl-3', 'tpl-8', 'tpl-13'];
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // Modals & UI Controls
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isSideToolbarOpen, setIsSideToolbarOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const enterAdminMode = (tabTarget?: AdminTab) => {
    setCurrentUser(MOCK_ADMIN);
    setViewMode('admin');
    if (tabTarget) {
      setAdminTab(tabTarget);
    }
    showToast('Modo Admin Ativado! Edite o site diretamente no celular 📱');
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  useEffect(() => {
    // Check URL parameters or hash for admin shortcut
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode') || params.get('view') || params.get('role');
    const hasAdminParam = params.has('admin') || modeParam === 'admin' || window.location.hash.includes('admin');

    if (hasAdminParam) {
      setCurrentUser(MOCK_ADMIN);
      setViewMode('admin');
      setAdminTab('dashboard');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('impulsio_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('impulsio_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('impulsio_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('impulsio_templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('impulsio_categories', JSON.stringify(categories));
  }, [categories]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const login = (email: string, role: 'user' | 'admin' = 'user', accessKey?: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      const msg = 'Por favor, informe um e-mail válido para acessar.';
      showToast(`⚠️ ${msg}`);
      return { success: false, message: msg };
    }

    // Admin Access
    if (role === 'admin' || cleanEmail === 'admin@impulsion.com.br') {
      setCurrentUser(MOCK_ADMIN);
      setViewMode('admin');
      showToast('Bem-vindo de volta, Administrador!');
      setIsAuthModalOpen(false);
      return { success: true, message: 'Sucesso' };
    }

    // Search in registered users / subscribers database
    const foundUser = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail)
      || (cleanEmail === MOCK_USER.email.toLowerCase() ? MOCK_USER : null);

    const subscriberRecord = subscribers.find(s => s.email.toLowerCase() === cleanEmail);

    // If NOT registered or no subscription found
    if (!foundUser && !subscriberRecord) {
      const msg = 'E-mail não cadastrado na plataforma ou sem plano pago ativo. Por favor, assine um plano para liberar seu acesso.';
      showToast('❌ E-mail sem plano ativo.');
      return { success: false, message: msg };
    }

    // Check status
    const currentStatus = foundUser ? foundUser.status : subscriberRecord?.status;

    if (currentStatus !== 'Ativo') {
      const msg = 'Acesso bloqueado: O seu e-mail possui uma assinatura inativa ou pendente de pagamento. Por favor, assine um plano para regularizar seu acesso.';
      showToast('🔒 Plano inativo ou pendente.');
      return { success: false, message: msg };
    }

    // Authenticated active subscriber
    const loggedUser: User = foundUser || {
      id: `usr_${Date.now()}`,
      name: subscriberRecord?.name || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: '',
      accessKey: accessKey || '123456',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      plan: (subscriberRecord?.plan as any) || 'Mensal',
      role: 'user',
      memberSince: subscriberRecord?.startDate || new Date().toLocaleDateString('pt-BR'),
      status: 'Ativo',
      favorites: [],
      downloadsHistory: []
    };

    setCurrentUser(loggedUser);
    setViewMode('client');
    setClientTab('presentation');
    showToast(`Acesso autenticado com sucesso! Bem-vindo(a), ${loggedUser.name} 🎉`);
    setIsAuthModalOpen(false);
    return { success: true, message: 'Sucesso' };
  };

  const registerCustomerAccess = (
    name: string,
    email: string,
    phone: string = '',
    accessKey: string = '123456',
    planName: string = 'Mensal',
    customRenewalDate?: string
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Calculate expiration / renewal date
    let renewal = customRenewalDate;
    if (!renewal) {
      const d = new Date();
      if (planName.includes('Vitalício')) {
        renewal = 'Acesso Vitalício (Sem Expiração)';
      } else if (planName.includes('Anual')) {
        d.setFullYear(d.getFullYear() + 1);
        renewal = d.toLocaleDateString('pt-BR');
      } else {
        d.setDate(d.getDate() + 30);
        renewal = d.toLocaleDateString('pt-BR');
      }
    }

    const dateStr = new Date().toLocaleDateString('pt-BR');
    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const fullDate = `${dateStr} às ${timeStr}`;

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: phone.trim(),
      accessKey: accessKey.trim() || '123456',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`,
      plan: (planName as any) || 'Mensal',
      role: 'user',
      memberSince: fullDate,
      status: 'Ativo',
      favorites: [],
      downloadsHistory: []
    };

    setRegisteredUsers(prev => [newUser, ...prev.filter(u => u.email.toLowerCase() !== cleanEmail)]);
    
    const amountVal = planName.includes('Vitalício') ? 397.00 : planName.includes('Anual') ? 238.80 : 29.90;

    setSubscribers(prev => [
      {
        id: `sub_${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        plan: newUser.plan as any,
        status: 'Ativo',
        amount: amountVal,
        paymentMethod: 'PIX',
        startDate: fullDate,
        renewalDate: renewal
      },
      ...prev.filter(s => s.email.toLowerCase() !== cleanEmail)
    ]);

    setCurrentUser(newUser);
    setViewMode('client');
    setClientTab('presentation');
    showToast(`📧 Pagamento Confirmado! Acesso Liberado no Plano ${newUser.plan} 🔥`);
  };

  const recordPaymentTransaction = (data: {
    clientName: string;
    clientEmail: string;
    amount: number;
    gateway: 'Stripe' | 'Mercado Pago' | 'Asaas' | 'PagSeguro' | 'Efí Gerencianet';
    planName: string;
    clientPhone?: string;
    clientKey?: string;
    cpf?: string;
    status?: PaymentTransaction['status'];
  }): PaymentTransaction => {
    const gwCode = data.gateway === 'Mercado Pago' ? 'MP' : data.gateway === 'Asaas' ? 'ASA' : data.gateway === 'PagSeguro' ? 'PAG' : data.gateway === 'Efí Gerencianet' ? 'EFI' : 'ST';
    const txId = `PIX-${gwCode}-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = `${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const newTx: PaymentTransaction = {
      id: txId,
      clientName: data.clientName || 'Cliente VIP',
      clientEmail: data.clientEmail,
      amount: data.amount,
      gateway: data.gateway,
      status: data.status || 'Aprovado',
      date: nowStr,
      planName: data.planName,
      invoiceUrl: `https://impulsion.com.br/fatura/${txId}`,
      cpf: data.cpf || '123.456.789-00',
      clientPhone: data.clientPhone
    };

    setTransactions(prev => [newTx, ...prev]);

    if (newTx.status === 'Aprovado') {
      registerCustomerAccess(
        data.clientName,
        data.clientEmail,
        data.clientPhone || '',
        data.clientKey || '123456',
        data.planName
      );
    }

    return newTx;
  };

  const updateTransactionStatus = (id: string, newStatus: PaymentTransaction['status']) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    showToast(`Status da transação ${id} atualizado para ${newStatus}.`);
  };

  const logout = () => {
    setCurrentUser(null);
    setViewMode('home');
    showToast('Você saiu da sua conta.');
  };

  const switchRole = () => {
    if (currentUser?.role === 'admin') {
      setCurrentUser(MOCK_USER);
      setViewMode('client');
      setClientTab('presentation');
      showToast('Modo de exibição alterado para Cliente.');
    } else {
      setCurrentUser(MOCK_ADMIN);
      setViewMode('admin');
      showToast('Modo de exibição alterado para Painel Administrativo.');
    }
  };

  const updateUserProfile = (name: string, email: string, avatarUrl?: string, accessKey?: string) => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      name,
      email,
      ...(avatarUrl ? { avatarUrl } : {}),
      ...(accessKey ? { accessKey } : {})
    };
    setCurrentUser(updated);
    showToast('Perfil e Foto atualizados com sucesso! 📷');
  };

  const toggleFavorite = (templateId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(templateId);
      const updated = exists ? prev.filter((id) => id !== templateId) : [...prev, templateId];
      if (currentUser) {
        setCurrentUser({ ...currentUser, favorites: updated });
      }
      showToast(exists ? 'Template removido dos favoritos' : 'Template adicionado aos favoritos ❤️');
      return updated;
    });
  };

  const isFavorite = (templateId: string) => favorites.includes(templateId);

  const recordDownload = (template: Template): boolean => {
    // Active paying subscriber or admin has unlimited access
    const isSubscriber = currentUser && (currentUser.role === 'admin' || currentUser.plan !== 'Gratuito');

    if (isSubscriber) {
      setTemplates((prev) =>
        prev.map((t) => (t.id === template.id ? { ...t, downloadsCount: t.downloadsCount + 1 } : t))
      );

      if (currentUser) {
        const history = currentUser.downloadsHistory || [];
        const newEntry = { templateId: template.id, downloadedAt: new Date().toLocaleString('pt-BR') };
        setCurrentUser({
          ...currentUser,
          downloadsHistory: [newEntry, ...history.filter((h) => h.templateId !== template.id)]
        });
      }

      showToast(`Redirecionando para abrir "${template.title}" no Canva... 🎨`);
      return true;
    }

    // Non-subscriber visitor / demo user logic (allows seamless Canva testing)
    const nextCount = demoDownloadsCount + 1;
    setDemoDownloadsCount(nextCount);
    localStorage.setItem('impulsion_demo_downloads_count', nextCount.toString());

    setTemplates((prev) =>
      prev.map((t) => (t.id === template.id ? { ...t, downloadsCount: t.downloadsCount + 1 } : t))
    );

    showToast(`🎨 Redirecionando para abrir "${template.title}" no Canva...`);
    return true;
  };

  const addTemplate = (newTplData: Omit<Template, 'id' | 'downloadsCount' | 'createdAt'>) => {
    const category = categories.find((c) => c.id === newTplData.categoryId);
    const newTemplate: Template = {
      ...newTplData,
      id: `tpl-${Date.now()}`,
      categoryName: category ? category.name : 'Geral',
      downloadsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isNew: true,
      rating: 5.0
    };

    setTemplates((prev) => [newTemplate, ...prev]);

    // Update category template count
    if (newTplData.categoryId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === newTplData.categoryId ? { ...c, templateCount: c.templateCount + 1 } : c))
      );
    }

    showToast('Novo template cadastrado com sucesso!');
  };

  const updateTemplate = (updated: Template) => {
    setTemplates((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    showToast('Template atualizado com sucesso!');
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    showToast('Template excluído do sistema.');
  };

  const addCategory = (catData: Omit<Category, 'id' | 'templateCount'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
      templateCount: 0
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Categoria "${newCat.name}" criada com sucesso!`);
  };

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newC: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usageCount: 0
    };
    setCoupons((prev) => [newC, ...prev]);
    showToast(`Cupom ${newC.code} gerado!`);
  };

  const toggleCouponActive = (id: string) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
    showToast('Status do cupom atualizado.');
  };

  const addAnnouncement = (title: string, content: string, category: Announcement['category']) => {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      date: 'Agora mesmo',
      read: false,
      category
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast('Comunicado enviado a todos os clientes!');
  };

  const deleteSubscriber = (id: string) => {
    setSubscribers((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem('impulsio_subscribers', JSON.stringify(updated));
      return updated;
    });
    showToast('Cliente removido com sucesso!');
  };

  const addSubscriber = (newSub: Omit<Subscriber, 'id'>) => {
    const subscriber: Subscriber = {
      ...newSub,
      id: `sub-${Date.now()}`
    };
    setSubscribers((prev) => {
      const updated = [subscriber, ...prev];
      localStorage.setItem('impulsio_subscribers', JSON.stringify(updated));
      return updated;
    });
    showToast(`Cliente ${subscriber.name} cadastrado com sucesso!`);
  };

  const updateSubscriberStatus = (id: string, status: Subscriber['status']) => {
    setSubscribers((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, status } : s));
      localStorage.setItem('impulsio_subscribers', JSON.stringify(updated));
      return updated;
    });
    showToast('Status do cliente atualizado com sucesso!');
  };

  const updatePixConfig = (newConfig: PixConfig) => {
    setPixConfig(newConfig);
    localStorage.setItem('impulsio_pix', JSON.stringify(newConfig));
    showToast('Configurações da Conta PIX atualizadas com sucesso!');
  };

  const updatePlan = (id: string, updatedPlan: PlanConfig) => {
    setPlans((prev) => {
      const updated = prev.map((p) => (p.id === id ? updatedPlan : p));
      localStorage.setItem('impulsion_plans', JSON.stringify(updated));
      return updated;
    });
    showToast(`Plano "${updatedPlan.name}" atualizado com sucesso!`);
  };

  const addPlan = (newPlanData: Omit<PlanConfig, 'id'>) => {
    const id = newPlanData.name.replace(/\s+/g, '-').toLowerCase() || `plan-${Date.now()}`;
    const newPlan: PlanConfig = { ...newPlanData, id };
    setPlans((prev) => {
      const updated = [...prev, newPlan];
      localStorage.setItem('impulsion_plans', JSON.stringify(updated));
      return updated;
    });
    showToast(`Novo plano "${newPlan.name}" criado com sucesso!`);
  };

  const deletePlan = (id: string) => {
    setPlans((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('impulsion_plans', JSON.stringify(updated));
      return updated;
    });
    showToast('Plano removido com sucesso!');
  };

  const resetPlansToDefault = () => {
    setPlans(DEFAULT_PLANS);
    localStorage.setItem('impulsion_plans', JSON.stringify(DEFAULT_PLANS));
    showToast('Planos restaurados para o padrão original!');
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        clientTab,
        setClientTab,
        adminTab,
        setAdminTab,
        isDarkMode,
        toggleDarkMode,
        currentUser,
        isLoggedIn: !!currentUser,
        demoDownloadsCount,
        resetDemoDownloadsCount,
        login,
        registerCustomerAccess,
        logout,
        switchRole,
        updateUserProfile,
        templates,
        categories,
        coupons,
        announcements,
        subscribers,
        transactions,
        affiliateInfo,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedFormat,
        setSelectedFormat,
        showOnlyFavorites,
        setShowOnlyFavorites,
        favorites,
        toggleFavorite,
        isFavorite,
        recordDownload,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        addCategory,
        addCoupon,
        toggleCouponActive,
        addAnnouncement,
        deleteSubscriber,
        addSubscriber,
        updateSubscriberStatus,
        recordPaymentTransaction,
        updateTransactionStatus,
        pixConfig,
        updatePixConfig,
        plans,
        updatePlan,
        addPlan,
        deletePlan,
        resetPlansToDefault,
        previewTemplate,
        setPreviewTemplate,
        checkoutPlan,
        setCheckoutPlan,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isSideToolbarOpen,
        setIsSideToolbarOpen,
        isQuickSearchOpen,
        setIsQuickSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isDemoModalOpen,
        setIsDemoModalOpen,
        enterAdminMode,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
