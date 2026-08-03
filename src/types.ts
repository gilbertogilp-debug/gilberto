export type TemplateFormat = 'Feed' | 'Story' | 'Reels' | 'Carrossel';

export interface Template {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  format: TemplateFormat;
  tags: string[];
  description: string;
  imageUrl: string;
  canvaUrl: string;
  downloadsCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  rating?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  color: string;
  description: string;
  templateCount: number;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  accessKey?: string; // Chave de acesso / Senha criada pelo cliente
  avatarUrl: string;
  plan: 'Gratuito' | 'Mensal' | 'Anual' | 'Vitalício';
  role: 'user' | 'admin';
  memberSince: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  favorites: string[]; // Template IDs
  downloadsHistory: {
    templateId: string;
    downloadedAt: string;
  }[];
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  expiresAt: string;
  usageCount: number;
  maxUsage: number;
  active: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
  category: 'Novidade' | 'Atualização' | 'Aviso' | 'Promoção';
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  plan: 'Mensal' | 'Anual' | 'Vitalício';
  status: 'Ativo' | 'Inativo' | 'Pendente';
  amount: number;
  paymentMethod: 'Stripe' | 'Mercado Pago' | 'Asaas' | 'PIX';
  startDate: string;
  renewalDate: string;
}

export interface PaymentTransaction {
  id: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  gateway: 'Stripe' | 'Mercado Pago' | 'Asaas' | 'PagSeguro' | 'Efí Gerencianet';
  status: 'Aprovado' | 'Pendente' | 'Recusado' | 'Expirado' | 'Cancelado';
  date: string;
  planName: string;
  invoiceUrl: string;
  cpf?: string;
  clientPhone?: string;
  pixPayload?: string;
}

export interface AffiliateInfo {
  referralCode: string;
  totalEarnings: number;
  pendingPayout: number;
  totalReferrals: number;
  conversionRate: number;
  referralLink: string;
}

export interface PixConfig {
  pixKey: string;
  pixKeyType: 'CNPJ' | 'E-mail' | 'Telefone' | 'Chave Aleatória';
  recipientName: string;
  bankName: string;
  city: string;
  instructions: string;
}

export interface PlanConfig {
  id: string; // e.g. 'Mensal', 'Anual', 'Vitalício' or custom
  name: string;
  price: number; // numeric price, e.g. 29.90
  period: string; // display string e.g. '/mês' or 'Pague uma única vez'
  badge?: string; // e.g. 'MAIS POPULAR • ECONOMIZE 33%'
  description: string;
  popular: boolean;
  active: boolean;
  features: string[];
  ctaText: string;
}

export type ViewMode = 'home' | 'client' | 'admin' | 'auth';
export type ClientTab = 'presentation' | 'dashboard' | 'categories' | 'favorites' | 'downloads' | 'profile' | 'support' | 'affiliates';
export type AdminTab = 'dashboard' | 'clients' | 'templates' | 'categories' | 'subscriptions' | 'payments' | 'reports' | 'coupons' | 'announcements' | 'settings';

export interface NavHistoryItem {
  viewMode: ViewMode;
  clientTab?: ClientTab;
  adminTab?: AdminTab;
  label: string;
}
