import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Template, Category, User, ViewMode, ClientTab, AdminTab,
  Coupon, Announcement, Subscriber, PaymentTransaction, AffiliateInfo, TemplateFormat, PixConfig
} from '../types';
import {
  INITIAL_CATEGORIES, INITIAL_TEMPLATES, MOCK_USER, MOCK_ADMIN,
  MOCK_COUPONS, MOCK_ANNOUNCEMENTS, MOCK_SUBSCRIBERS, MOCK_TRANSACTIONS, MOCK_AFFILIATE
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
  login: (email: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  switchRole: () => void;
  updateUserProfile: (name: string, email: string) => void;

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

  // Subscriber Management
  deleteSubscriber: (id: string) => void;
  addSubscriber: (subscriber: Omit<Subscriber, 'id'>) => void;
  updateSubscriberStatus: (id: string, status: Subscriber['status']) => void;

  // PIX Config
  pixConfig: PixConfig;
  updatePixConfig: (config: PixConfig) => void;

  // Modals
  previewTemplate: Template | null;
  setPreviewTemplate: (template: Template | null) => void;
  checkoutPlan: 'Mensal' | 'Anual' | 'Vitalício' | null;
  setCheckoutPlan: (plan: 'Mensal' | 'Anual' | 'Vitalício' | null) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isQuickSearchOpen: boolean;
  setIsQuickSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  
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
    return saved ? JSON.parse(saved) : MOCK_USER; // Logged in by default as Lucas Silva for fast rich experience
  });

  // Data Collections
  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem('impulsio_templates');
    return saved ? JSON.parse(saved) : INITIAL_TEMPLATES;
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
      recipientName: 'Impulsio Digital Ltda',
      bankName: 'Banco Inter S.A.',
      city: 'São Paulo - SP',
      instructions: 'Realize o PIX e a liberação da conta será realizada instantaneamente. Se desejar, envie o comprovante no suporte.'
    };
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(MOCK_TRANSACTIONS);
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
  const [checkoutPlan, setCheckoutPlan] = useState<'Mensal' | 'Anual' | 'Vitalício' | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

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

  const login = (email: string, role: 'user' | 'admin' = 'user') => {
    if (role === 'admin' || email.includes('admin')) {
      setCurrentUser(MOCK_ADMIN);
      setViewMode('admin');
      showToast('Bem-vindo de volta, Administrador!');
    } else {
      const user: User = {
        ...MOCK_USER,
        email: email || MOCK_USER.email,
        name: email ? email.split('@')[0].toUpperCase() : MOCK_USER.name
      };
      setCurrentUser(user);
      setViewMode('client');
      showToast(`Login realizado com sucesso! Bem-vindo(a), ${user.name}`);
    }
    setIsAuthModalOpen(false);
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
      showToast('Modo de exibição alterado para Cliente.');
    } else {
      setCurrentUser(MOCK_ADMIN);
      setViewMode('admin');
      showToast('Modo de exibição alterado para Painel Administrativo.');
    }
  };

  const updateUserProfile = (name: string, email: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, name, email };
    setCurrentUser(updated);
    showToast('Perfil atualizado com sucesso!');
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

  const recordDownload = (template: Template) => {
    // Increment download counter
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

    showToast(`Redirecionando para abrir "${template.title}" no Canva...`);
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
        login,
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
        pixConfig,
        updatePixConfig,
        previewTemplate,
        setPreviewTemplate,
        checkoutPlan,
        setCheckoutPlan,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isQuickSearchOpen,
        setIsQuickSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isDemoModalOpen,
        setIsDemoModalOpen,
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
