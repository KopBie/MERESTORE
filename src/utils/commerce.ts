/**
 * MERE FASHION - Core E-Commerce Logic & Business Rules
 * Handles pricing, discount rules, courier rates, order state machines, and Midtrans signature math.
 */

export interface ProductVariant {
  id: string;
  sku: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'ALL_SIZE' | '39' | '40' | '41' | '42' | '43';
  color: string;
  colorHex: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Pakaian' | 'Celana' | 'Jaket' | 'Tas' | 'Sepatu' | 'Aksesoris';
  price: number;
  compareAtPrice?: number;
  description: string;
  material: string;
  image: string;
  tags: string[];
  variants: ProductVariant[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_VERIFIED'
  | 'PICKING'
  | 'PACKING'
  | 'SENT'
  | 'DELIVERED'
  | 'CANCELLED';

export interface CourierOption {
  code: 'sicepat' | 'jne' | 'jnt';
  name: string;
  service: string;
  rate: number;
  etd: string;
}

export interface Order {
  id: string; // e.g. MERE-20261102-001
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    province: string;
    city: string;
    address: string;
    postalCode: string;
  };
  courier: CourierOption;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'gopay' | 'dana' | 'ovo' | 'qris' | 'bca_va';
  status: OrderStatus;
  trackingNumber?: string;
  pickingStartedAt?: string;
  packedAt?: string;
  sentAt?: string;
  notes?: string;
}

export const COURIERS: CourierOption[] = [
  {
    code: 'sicepat',
    name: 'SiCepat Ekspres',
    service: 'BEST (Besok Sampai Tujuan)',
    rate: 18000,
    etd: '1 Hari Kerja',
  },
  {
    code: 'jne',
    name: 'JNE Express',
    service: 'REG (Reguler)',
    rate: 14000,
    etd: '2-3 Hari Kerja',
  },
  {
    code: 'jnt',
    name: 'J&T Express',
    service: 'EZ',
    rate: 15000,
    etd: '2-3 Hari Kerja',
  },
];

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateOrderSummary(
  items: CartItem[],
  courierRate: number,
  voucherCode?: string
): {
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  voucherMessage?: string;
} {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let discount = 0;
  let shippingFee = courierRate;
  let voucherMessage: string | undefined = undefined;

  if (voucherCode) {
    const code = voucherCode.trim().toUpperCase();
    if (code === 'MEREFIRST') {
      if (subtotal >= 200000) {
        discount = Math.min(Math.round(subtotal * 0.1), 50000);
        voucherMessage = 'Kupon MEREFIRST aktif (Diskon 10% s/d Rp50.000)';
      } else {
        voucherMessage = 'Minimal belanja Rp200.000 untuk kupon MEREFIRST';
      }
    } else if (code === 'FREESHIP') {
      const discountOngkir = Math.min(shippingFee, 15000);
      discount = discountOngkir;
      voucherMessage = 'Kupon FREESHIP aktif (Potongan Ongkir Rp15.000)';
    } else {
      voucherMessage = 'Kupon tidak valid';
    }
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  return {
    subtotal,
    discount,
    shippingFee,
    total,
    voucherMessage,
  };
}

/**
 * Validates state transitions in the POAC Fulfillment pipeline
 */
export function canTransitionOrder(current: OrderStatus, next: OrderStatus): boolean {
  const transitions: Record<OrderStatus, OrderStatus[]> = {
    PENDING_PAYMENT: ['PAYMENT_VERIFIED', 'CANCELLED'],
    PAYMENT_VERIFIED: ['PICKING', 'CANCELLED'],
    PICKING: ['PACKING', 'CANCELLED'],
    PACKING: ['SENT'],
    SENT: ['DELIVERED'],
    DELIVERED: [],
    CANCELLED: [],
  };

  return transitions[current]?.includes(next) ?? false;
}

/**
 * Generates mock Midtrans SHA-512 signature string representation
 * (Used in Webhook validation: hash(order_id + status_code + gross_amount + ServerKey))
 */
export function createMockMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string
): string {
  // Simple deterministic hash simulation for sandbox tests
  const raw = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

/**
 * Generates unique tracking number based on courier
 */
export function generateTrackingNumber(courierCode: string): string {
  const prefix = courierCode.toUpperCase();
  const randomSuffix = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}-MRF-${randomSuffix}`;
}

/**
 * Resolves local asset paths with Vite's configured base URL (e.g. /MERESTORE/)
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

