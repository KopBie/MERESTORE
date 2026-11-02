import React, { useState } from 'react';
import { Navbar, StoreNavSection } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AboutUsSection } from './components/AboutUsSection';
import { HowToOrderSection } from './components/HowToOrderSection';
import { ContactSection } from './components/ContactSection';
import { POACDashboard } from './components/POACDashboard';
import { WarehousePortal } from './components/WarehousePortal';
import { DatabaseSchemaView } from './components/DatabaseSchemaView';
import { LaravelApiDocsView } from './components/LaravelApiDocsView';
import { DeploymentGuideView } from './components/DeploymentGuideView';
import { MarketingHubView } from './components/MarketingHubView';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/mockData';
import { Product, ProductVariant, CartItem, Order, OrderStatus } from './utils/commerce';
import { X, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      variant: INITIAL_PRODUCTS[0].variants[0],
      quantity: 1,
    },
  ]);
  const [voucherCode, setVoucherCode] = useState<string>('MEREFIRST');

  // Customer Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingDefaultId, setTrackingDefaultId] = useState<string | undefined>(undefined);

  // Optional Technical Blueprint Modal (accessible from footer)
  const [technicalDocTab, setTechnicalDocTab] = useState<
    'poac' | 'warehouse' | 'database' | 'api' | 'marketing' | 'deployment' | null
  >(null);

  // Cart operations
  const handleAddToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variant?.id === variant.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.variant.id === variantId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  // Order Placement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    // Atomic decrement of catalog stock
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const matchingOrderItems = newOrder.items.filter((i) => i.product.id === p.id);
        if (matchingOrderItems.length === 0) return p;

        const updatedVariants = p.variants.map((v) => {
          const orderedItem = matchingOrderItems.find((i) => i.variant.id === v.id);
          if (!orderedItem) return v;
          return {
            ...v,
            stock: Math.max(0, v.stock - orderedItem.quantity),
          };
        });

        return { ...p, variants: updatedVariants };
      })
    );

    setCartItems([]);
  };

  // Warehouse status update
  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus, trackingNo?: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;

        const nowStr = new Date().toLocaleString('id-ID', { timeZoneName: 'short' });
        const updated: Order = {
          ...order,
          status: nextStatus,
        };

        if (nextStatus === 'PICKING' && !updated.pickingStartedAt) {
          updated.pickingStartedAt = nowStr;
        } else if (nextStatus === 'PACKING' && !updated.packedAt) {
          updated.packedAt = nowStr;
        } else if (nextStatus === 'SENT') {
          updated.sentAt = nowStr;
          if (trackingNo) {
            updated.trackingNumber = trackingNo;
          }
        }

        return updated;
      })
    );
  };

  // Smooth scroll navigation
  const handleNavigateSection = (section: StoreNavSection) => {
    if (section === 'katalog') {
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'tentang-kami') {
      const el = document.getElementById('tentang-kami-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'cara-order') {
      const el = document.getElementById('cara-order-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'kontak') {
      const el = document.getElementById('kontak-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1A1A1A]">
      {/* Pure E-Commerce Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => {
          setTrackingDefaultId(undefined);
          setIsTrackingOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
      />

      {/* 100% Focused Storefront Main Page */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExplore={() => handleNavigateSection('katalog')}
          onOpenFlowchart={() => handleNavigateSection('cara-order')}
        />

        {/* 2. Interactive Product Catalog */}
        <ProductCatalog
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* 3. Tentang Kami (About Us) Section */}
        <AboutUsSection />

        {/* 4. Cara Order & Panduan Pengiriman Section */}
        <HowToOrderSection onGoToCatalog={() => handleNavigateSection('katalog')} />

        {/* 5. Kontak & Layanan Pelanggan Section */}
        <ContactSection />
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        key={selectedProduct?.id}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        voucherCode={voucherCode}
        setVoucherCode={setVoucherCode}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        voucherCode={voucherCode}
        onOrderPlaced={handleOrderPlaced}
        onNavigateToWarehouse={() => setTechnicalDocTab('warehouse')}
        onNavigateToTracking={(orderId) => {
          setTrackingDefaultId(orderId);
          setIsTrackingOpen(true);
        }}
      />

      {/* Live Customer Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        defaultOrderId={trackingDefaultId}
      />

      {/* Optional Technical Architecture Blueprint Modal (Accessible only if clicked in footer) */}
      {technicalDocTab && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setTechnicalDocTab(null)}
        >
          <div
            className="relative w-full max-w-6xl bg-white shadow-2xl border border-neutral-300 h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-neutral-700">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span className="font-editorial text-lg font-bold">
                  Dokumentasi Sistem & Operasional MERE FASHION
                </span>
              </div>

              {/* Subtabs inside modal */}
              <div className="hidden lg:flex items-center gap-1 text-xs">
                {[
                  { id: 'poac', label: 'Alur POAC' },
                  { id: 'warehouse', label: 'Tim Gudang' },
                  { id: 'database', label: 'Database & ERD' },
                  { id: 'api', label: 'API Laravel' },
                  { id: 'marketing', label: 'Materi Iklan' },
                  { id: 'deployment', label: 'Git & Deploy' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTechnicalDocTab(t.id as any)}
                    className={`px-3 py-1.5 transition-colors cursor-pointer ${
                      technicalDocTab === t.id
                        ? 'bg-white text-black font-semibold'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setTechnicalDocTab(null)}
                aria-label="Tutup Dokumentasi"
                className="p-1 hover:bg-neutral-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-neutral-300 hover:text-white" />
              </button>
            </div>

            {/* Mobile Tab Select */}
            <div className="lg:hidden p-2 bg-neutral-900 overflow-x-auto flex gap-1">
              {[
                { id: 'poac', label: 'POAC' },
                { id: 'warehouse', label: 'Gudang' },
                { id: 'database', label: 'Database' },
                { id: 'api', label: 'API' },
                { id: 'marketing', label: 'Iklan' },
                { id: 'deployment', label: 'Deploy' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTechnicalDocTab(t.id as any)}
                  className={`px-2.5 py-1 text-xs whitespace-nowrap ${
                    technicalDocTab === t.id ? 'bg-white text-black font-bold' : 'text-neutral-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto">
              {technicalDocTab === 'poac' && (
                <POACDashboard
                  onGoToCatalog={() => {
                    setTechnicalDocTab(null);
                    handleNavigateSection('katalog');
                  }}
                  onGoToWarehouse={() => setTechnicalDocTab('warehouse')}
                  onGoToAPI={() => setTechnicalDocTab('api')}
                />
              )}
              {technicalDocTab === 'warehouse' && (
                <WarehousePortal
                  orders={orders}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              )}
              {technicalDocTab === 'database' && <DatabaseSchemaView />}
              {technicalDocTab === 'api' && <LaravelApiDocsView />}
              {technicalDocTab === 'marketing' && <MarketingHubView />}
              {technicalDocTab === 'deployment' && <DeploymentGuideView />}
            </div>
          </div>
        </div>
      )}

      {/* Production E-Commerce Footer */}
      <footer className="border-t border-[#E5E5E0] bg-white text-neutral-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200">
            {/* Col 1: Brand Ethos */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-editorial text-2xl font-bold tracking-tight uppercase">
                MERE FASHION
              </span>
              <p className="text-xs text-neutral-600 max-w-sm leading-relaxed">
                Brand busana kontemporer Indonesia dengan dedikasi pada siluet esensial, kenyamanan material serat alami, dan standar penjahitan berkualitas atelier.
              </p>
              <div className="text-xs text-neutral-500 space-y-1">
                <p>📍 Studio & Fulfillment Center: TB Simatupang, Cilandak, Jakarta Selatan</p>
                <p>✉️ Layanan Pelanggan: care@merefashion.com</p>
                <p>💬 WhatsApp Concierge: +62 811-9920-881</p>
              </div>
            </div>

            {/* Col 2: Store Navigation */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Menu Toko
              </span>
              <ul className="text-xs space-y-2 text-neutral-600">
                <li>
                  <button
                    onClick={() => handleNavigateSection('katalog')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Koleksi Pakaian
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateSection('tentang-kami')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Tentang Kami (About Us)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateSection('cara-order')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Cara Order & Pengiriman
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateSection('kontak')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Kontak & FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTrackingDefaultId(undefined);
                      setIsTrackingOpen(true);
                    }}
                    className="hover:text-black transition-colors cursor-pointer font-semibold text-neutral-900"
                  >
                    Lacak Pengiriman Pesanan
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Customer Assurance & Technical Documentation Access */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Jaminan Belanja & Pembayaran
              </span>
              <div className="text-xs text-neutral-600 space-y-1.5">
                <p>✓ Garansi 7 Hari Penukaran Ukuran</p>
                <p>✓ Pengiriman Cepat Same-Day &lt; 15:00 WIB</p>
                <p>✓ QC 3 Tahap Sebelum Serah Terima Kurir</p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-neutral-500 block">
                  Metode Pembayaran Terverifikasi Otomatis:
                </span>
                <div className="text-[11px] font-mono text-neutral-800 mt-1">
                  QRIS · GoPay · DANA · OVO · BCA Virtual Account
                </div>
              </div>

              {/* Discreet Architecture Blueprint trigger */}
              <div className="pt-4 border-t border-neutral-100">
                <button
                  onClick={() => setTechnicalDocTab('poac')}
                  className="text-[11px] text-neutral-400 hover:text-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>⚙️ Buka Dokumen Teknis & WMS Gudang (POAC / ERD / API)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <p>© 2026 MERE FASHION INDONESIA. Seluruh hak cipta dilindungi.</p>
            <p className="font-mono text-[11px]">
              Jakarta Atelier Studio · Essential Silhouettes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
