import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatIDR,
  calculateOrderSummary,
  canTransitionOrder,
  generateTrackingNumber,
  CartItem,
  Product,
  ProductVariant,
} from './commerce';

const mockVariant: ProductVariant = {
  id: 'var-1',
  sku: 'MRF-BLZ-BLK-L',
  size: 'L',
  color: 'Charcoal Black',
  colorHex: '#1A1A1A',
  stock: 12,
};

const mockProduct: Product = {
  id: 'prod-1',
  name: 'Tailored Minimalist Blazer',
  slug: 'tailored-minimalist-blazer',
  category: 'Jaket',
  price: 489000,
  description: 'Structured modern blazer',
  material: 'Wool Blend',
  image: '/src/assets/images/product_mere_blazer_1793622513253.jpg',
  tags: ['Bestseller', 'Tailored'],
  variants: [mockVariant],
};

const mockCartItem: CartItem = {
  product: mockProduct,
  variant: mockVariant,
  quantity: 1,
};

test('formatIDR formats currency in Rupiah', () => {
  const formatted = formatIDR(489000);
  assert.ok(formatted.includes('489.000') || formatted.includes('489,000'));
  assert.ok(formatted.includes('Rp'));
});

test('calculateOrderSummary calculates subtotal, shipping and total', () => {
  const result = calculateOrderSummary([mockCartItem], 18000);
  assert.equal(result.subtotal, 489000);
  assert.equal(result.discount, 0);
  assert.equal(result.shippingFee, 18000);
  assert.equal(result.total, 507000);
});

test('calculateOrderSummary applies MEREFIRST coupon with 10% capped at 50k', () => {
  const result = calculateOrderSummary([mockCartItem], 18000, 'MEREFIRST');
  assert.equal(result.subtotal, 489000);
  // 10% of 489,000 is 48,900
  assert.equal(result.discount, 48900);
  assert.equal(result.total, 489000 - 48900 + 18000);
  assert.ok(result.voucherMessage?.includes('MEREFIRST aktif'));
});

test('calculateOrderSummary applies FREESHIP voucher for shipping discount', () => {
  const result = calculateOrderSummary([mockCartItem], 18000, 'FREESHIP');
  assert.equal(result.discount, 15000);
  assert.equal(result.total, 489000 - 15000 + 18000);
});

test('POAC state machine transitions enforce warehouse workflow', () => {
  assert.equal(canTransitionOrder('PENDING_PAYMENT', 'PAYMENT_VERIFIED'), true);
  assert.equal(canTransitionOrder('PAYMENT_VERIFIED', 'PICKING'), true);
  assert.equal(canTransitionOrder('PICKING', 'PACKING'), true);
  assert.equal(canTransitionOrder('PACKING', 'SENT'), true);
  assert.equal(canTransitionOrder('SENT', 'DELIVERED'), true);

  // Invalid jumps
  assert.equal(canTransitionOrder('PENDING_PAYMENT', 'SENT'), false);
  assert.equal(canTransitionOrder('PICKING', 'DELIVERED'), false);
  assert.equal(canTransitionOrder('DELIVERED', 'PICKING'), false);
});

test('generateTrackingNumber produces valid courier tracking format', () => {
  const resi = generateTrackingNumber('sicepat');
  assert.ok(resi.startsWith('SICEPAT-MRF-'));
  assert.ok(resi.length > 15);
});
