export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price_cents: number;
  original_price_cents?: number;
  discount_percent?: number;
  rating: number;
  reviews_count: number;
  sold_count: number;
  video_url?: string;
  cover_url: string; // Main image
  images: string[]; // Gallery
  stock: number;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'CREDIT_CARD' | 'PIX';

export interface CheckoutState {
  step: 'SHIPPING' | 'PAYMENT' | 'PROCESSING' | 'SUCCESS';
  cep: string;
  shippingCost: number;
  paymentMethod: PaymentMethod;
  cardData: {
    number: string;
    holder: string;
    expiry: string;
    cvv: string; // Stored in memory only, never persisted
  };
  pixData: {
    code: string;
    expiresAt: number;
  } | null;
  orderId: string | null;
}

export interface VaultEntry {
  id: string;
  customer_email: string;
  cc_last4: string;
  cc_hash: string; // Simulated encrypted hash
  brand: string;
  created_at: string;
}