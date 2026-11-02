import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Smartphone,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  CartItem,
  COURIERS,
  CourierOption,
  Order,
  formatIDR,
  calculateOrderSummary,
} from '../utils/commerce';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  voucherCode: string;
  onOrderPlaced: (order: Order) => void;
  onNavigateToWarehouse: () => void;
  onNavigateToTracking: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  voucherCode,
  onOrderPlaced,
  onNavigateToWarehouse,
  onNavigateToTracking,
}) => {
  if (!isOpen || items.length === 0) return null;

  // Form State
  const [customerName, setCustomerName] = useState('Ananda Putri Pratama');
  const [customerPhone, setCustomerPhone] = useState('081289110293');
  const [customerEmail, setCustomerEmail] = useState('ananda.putri@gmail.com');
  const [province, setProvince] = useState('DKI Jakarta');
  const [city, setCity] = useState('Jakarta Selatan');
  const [address, setAddress] = useState('Apartemen Senopati Suites Tower 2 Lt. 14, Senayan');
  const [postalCode, setPostalCode] = useState('12190');
  const [selectedCourier, setSelectedCourier] = useState<CourierOption>(COURIERS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'gopay' | 'dana' | 'ovo' | 'bca_va'>('qris');

  // Checkout Steps: 'FORM' | 'PAYMENT_PENDING' | 'SUCCESS'
  const [checkoutStep, setCheckoutStep] = useState<'FORM' | 'PAYMENT_PENDING' | 'SUCCESS'>('FORM');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);

  const summary = calculateOrderSummary(items, selectedCourier.rate, voucherCode);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `MERE-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toLocaleString('id-ID', { timeZoneName: 'short' }),
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress: {
        province,
        city,
        address,
        postalCode,
      },
      courier: selectedCourier,
      items: [...items],
      subtotal: summary.subtotal,
      discount: summary.discount,
      shippingFee: summary.shippingFee,
      total: summary.total,
      paymentMethod,
      status: 'PENDING_PAYMENT',
      notes: 'Customer order via checkout flow',
    };

    setCreatedOrder(newOrder);
    setCheckoutStep('PAYMENT_PENDING');
  };

  const handleSimulateWebhookSuccess = () => {
    if (!createdOrder) return;
    setIsSimulatingPayment(true);

    setTimeout(() => {
      const verifiedOrder: Order = {
        ...createdOrder,
        status: 'PAYMENT_VERIFIED',
      };
      setCreatedOrder(verifiedOrder);
      onOrderPlaced(verifiedOrder);
      setIsSimulatingPayment(false);
      setCheckoutStep('SUCCESS');
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout MERE FASHION"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white shadow-2xl border border-neutral-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-neutral-200 bg-[#FAF8F5] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
              MERE FASHION · SECURE CHECKOUT
            </span>
            <h2 className="font-editorial text-xl font-bold text-neutral-900">
              {checkoutStep === 'FORM' && 'Informasi Pengiriman & Pembayaran'}
              {checkoutStep === 'PAYMENT_PENDING' && 'Simulasi Payment Gateway (Midtrans/Xendit)'}
              {checkoutStep === 'SUCCESS' && 'Pesanan Berhasil & Pembayaran Terverifikasi!'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Checkout"
            className="p-1.5 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* STEP 1: FORM */}
        {checkoutStep === 'FORM' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Customer Details */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                <span>01. Data Penerima & Kontak</span>
                <span className="text-neutral-400 font-normal lowercase">(Notifikasi WA & Email otomatis)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-600 mb-1">Nama Lengkap Penerima</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Nomor WhatsApp Aktif (Notifikasi Resi)</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-neutral-600 mb-1">Email Konfirmasi Invoice</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                02. Alamat Pengiriman
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-600 mb-1">Provinsi</label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Kota / Kabupaten</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Kode Pos</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-neutral-600 mb-1">Alamat Lengkap & Patokan</label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Couriers */}
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-800" />
                <span>03. Pilih Ekspedisi & Layanan</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COURIERS.map((c) => {
                  const isSelected = selectedCourier.code === c.code;
                  return (
                    <div
                      key={c.code}
                      onClick={() => setSelectedCourier(c)}
                      className={`p-3 border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <div className="font-bold">{c.name}</div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {c.service} ({c.etd})
                      </div>
                      <div className="mt-2 font-mono font-semibold tabular-nums">{formatIDR(c.rate)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-neutral-800" />
                <span>04. Metode Pembayaran Otomatis (Midtrans / Xendit)</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  { id: 'qris', name: 'QRIS', sub: 'Semua E-Wallet', icon: QrCode },
                  { id: 'gopay', name: 'GoPay', sub: 'Instant Pay', icon: Smartphone },
                  { id: 'dana', name: 'DANA', sub: 'Direct Debit', icon: Smartphone },
                  { id: 'ovo', name: 'OVO', sub: 'Push Notif', icon: Smartphone },
                  { id: 'bca_va', name: 'BCA VA', sub: 'Virtual Account', icon: Building2 },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-2.5 border text-center transition-all cursor-pointer ${
                      paymentMethod === m.id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-center gap-1">
                      {m.name}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${paymentMethod === m.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {m.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total breakdown */}
            <div className="p-4 bg-[#FAF8F5] border border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} item):</span>
                <span className="font-mono tabular-nums">{formatIDR(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Potongan Kupon ({voucherCode}):</span>
                  <span className="font-mono tabular-nums">-{formatIDR(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Ongkir ({selectedCourier.name}):</span>
                <span className="font-mono tabular-nums">{formatIDR(summary.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Pembayaran:</span>
                <span className="font-code tabular-nums">{formatIDR(summary.total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-neutral-900 hover:bg-black text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Lanjut ke Pembayaran · {formatIDR(summary.total)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT PENDING (MIDTRANS SIMULATOR) */}
        {checkoutStep === 'PAYMENT_PENDING' && createdOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold">STATUS: MENUNGGU PEMBAYARAN</span>
                <p className="mt-0.5">Order ID: <span className="font-mono font-semibold">{createdOrder.id}</span></p>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold">{formatIDR(createdOrder.total)}</span>
              </div>
            </div>

            {/* Gateway UI Simulation */}
            <div className="p-6 border border-neutral-300 bg-white text-center space-y-4">
              {paymentMethod === 'qris' && (
                <div className="flex flex-col items-center">
                  <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                    SCAN QRIS DENGAN GOPAY / OVO / DANA / BCA MOBILE
                  </div>
                  {/* Visual SVG QR Simulator */}
                  <div className="p-4 bg-white border-2 border-neutral-900 inline-block shadow-xs">
                    <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                      <rect width="30" height="30" x="5" y="5" />
                      <rect width="20" height="20" x="10" y="10" fill="white" />
                      <rect width="10" height="10" x="15" y="15" />
                      <rect width="30" height="30" x="65" y="5" />
                      <rect width="20" height="20" x="70" y="10" fill="white" />
                      <rect width="10" height="10" x="75" y="15" />
                      <rect width="30" height="30" x="5" y="65" />
                      <rect width="20" height="20" x="10" y="70" fill="white" />
                      <rect width="10" height="10" x="15" y="75" />
                      {/* Pattern dots */}
                      <rect width="5" height="5" x="42" y="15" />
                      <rect width="5" height="5" x="50" y="25" />
                      <rect width="5" height="5" x="42" y="45" />
                      <rect width="5" height="5" x="55" y="55" />
                      <rect width="5" height="5" x="42" y="75" />
                      <rect width="5" height="5" x="75" y="45" />
                      <rect width="5" height="5" x="85" y="65" />
                    </svg>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-2">
                    NMID: ID1020261102998 · Merchant: MERE FASHION INDONESIA
                  </span>
                </div>
              )}

              {paymentMethod === 'bca_va' && (
                <div className="space-y-3">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block">
                    NOMOR VIRTUAL ACCOUNT BCA
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-mono text-2xl font-bold tracking-widest text-neutral-900 bg-neutral-100 px-4 py-2 border">
                      80777 081289110293
                    </span>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText('80777081289110293')}
                      className="p-2 border border-neutral-300 hover:bg-neutral-100 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" /> Salin
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Buka m-BCA &gt; m-Transfer &gt; BCA Virtual Account &gt; Masukkan nomor di atas.
                  </p>
                </div>
              )}

              {(paymentMethod === 'gopay' || paymentMethod === 'dana' || paymentMethod === 'ovo') && (
                <div className="space-y-3 py-2">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block">
                    DEEP-LINK E-WALLET {paymentMethod.toUpperCase()}
                  </span>
                  <p className="text-sm font-semibold text-neutral-800">
                    Notifikasi push verifikasi telah dikirimkan ke aplikasi {paymentMethod.toUpperCase()} pada nomor {customerPhone}.
                  </p>
                </div>
              )}
            </div>

            {/* Test Simulation Button */}
            <div className="p-4 bg-emerald-50 border border-emerald-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-emerald-900 block font-semibold">
                    Simulasi Webhook Pembayaran Otomatis Midtrans:
                  </strong>
                  <p className="text-emerald-800 mt-0.5">
                    Di sistem produksi, Midtrans akan mengirimkan HTTP POST webhook ke{' '}
                    <code className="font-mono text-[11px] bg-emerald-100 px-1 py-0.5">/api/v1/payment/midtrans-webhook</code>.
                    Klik tombol di bawah ini untuk mensimulasikan pembayaran berhasil secara instan!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSimulateWebhookSuccess}
                disabled={isSimulatingPayment}
                className="mt-4 w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {isSimulatingPayment ? (
                  <span>Memverifikasi Signature SHA512 Midtrans...</span>
                ) : (
                  <>
                    <span>Simulasi: Pembeli Selesai Bayar (Triggers Webhook)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {checkoutStep === 'SUCCESS' && createdOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-neutral-900">
                Pembayaran Berhasil Diverifikasi!
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Pesanan <span className="font-mono font-bold text-neutral-900">{createdOrder.id}</span> telah diteruskan secara otomatis ke sistem Gudang MERE.
              </p>
            </div>

            {/* Automated Dispatch Actions Log */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs space-y-2">
              <span className="font-bold text-neutral-800 block text-[11px] uppercase tracking-wider">
                Otomasi Sistem yang Baru Saja Berjalan:
              </span>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Notifikasi WhatsApp terkirim ke {createdOrder.customerPhone} (Invoice & Konfirmasi)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Notifikasi Email konfirmasi terkirim ke {createdOrder.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Stok varian produk dikunci & dikurangi secara atomik di database</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tiket antrean Picking diteruskan ke Tim Gudang (Status: PAYMENT_VERIFIED)</span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToTracking(createdOrder.id);
                }}
                className="py-3 px-4 border border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lacak Pesanan Pelanggan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToWarehouse();
                }}
                className="py-3 px-4 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Buka Dashboard Tim Gudang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
