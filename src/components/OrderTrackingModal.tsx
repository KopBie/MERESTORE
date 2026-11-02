import React, { useState } from 'react';
import {
  X,
  Search,
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  MapPin,
  Check,
} from 'lucide-react';
import { Order, OrderStatus, formatIDR } from '../utils/commerce';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  defaultOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  defaultOrderId,
}) => {
  if (!isOpen) return null;

  const [searchKey, setSearchKey] = useState<string>(defaultOrderId || orders[0]?.id || '');
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    orders.find((o) => o.id === searchKey) || orders[0]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === searchKey.trim().toLowerCase() ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === searchKey.trim().toLowerCase())
    );
    setSelectedOrder(found);
  };

  const getTimelineStepState = (stepIndex: number, currentStatus: OrderStatus): 'COMPLETED' | 'CURRENT' | 'UPCOMING' => {
    switch (currentStatus) {
      case 'PENDING_PAYMENT':
        return stepIndex === 1 ? 'CURRENT' : 'UPCOMING';
      case 'PAYMENT_VERIFIED':
        if (stepIndex === 1) return 'CURRENT';
        return 'UPCOMING';
      case 'PICKING':
        if (stepIndex < 2) return 'COMPLETED';
        if (stepIndex === 2) return 'CURRENT';
        return 'UPCOMING';
      case 'PACKING':
        if (stepIndex < 3) return 'COMPLETED';
        if (stepIndex === 3) return 'CURRENT';
        return 'UPCOMING';
      case 'SENT':
        if (stepIndex <= 4) return 'COMPLETED';
        if (stepIndex === 5) return 'CURRENT'; // Kurir sedang mengantar paket
        return 'UPCOMING';
      case 'DELIVERED':
        return 'COMPLETED'; // Semua tahap 1-6 selesai!
      default:
        return 'UPCOMING';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Lacak Status Pesanan MERE"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-neutral-800" />
            <h2 className="font-editorial text-xl font-bold text-neutral-900">
              Lacak Pesanan Pelanggan (Live Tracking)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Masukkan Nomor Order (e.g. MERE-20261030-042) atau No. Resi..."
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-900"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Cari
            </button>
          </form>

          {/* Quick suggestions of available mock orders including DELIVERED */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-500">
            <span>Pilih Sampel Pesanan:</span>
            {orders.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchKey(o.id);
                  setSelectedOrder(o);
                }}
                className={`px-2 py-0.5 border font-mono transition-colors cursor-pointer ${
                  selectedOrder?.id === o.id
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                {o.id.slice(-7)} ({o.status})
              </button>
            ))}
          </div>

          {!selectedOrder ? (
            <div className="text-center py-12 text-neutral-500">
              <p className="font-editorial text-lg">Pesanan tidak ditemukan</p>
              <p className="text-xs text-neutral-400 mt-1">
                Pastikan nomor order diawali dengan MERE- atau nomor resi kurir.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Meta Header */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    NOMOR ORDER RESMI
                  </div>
                  <div className="font-mono text-base font-bold text-neutral-900">
                    {selectedOrder.id}
                  </div>
                  <div className="text-neutral-500 text-[11px] mt-0.5">
                    Dibuat pada: {selectedOrder.createdAt}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    KURIR & NOMOR RESI
                  </div>
                  <div className="font-bold text-neutral-900">
                    {selectedOrder.courier.name} ({selectedOrder.courier.service})
                  </div>
                  {selectedOrder.trackingNumber ? (
                    <div className="font-mono font-bold text-emerald-700 text-xs mt-0.5 bg-emerald-50 px-2 py-0.5 inline-block border border-emerald-200">
                      Resi: {selectedOrder.trackingNumber}
                    </div>
                  ) : (
                    <div className="text-[11px] text-amber-700 italic">
                      Resi diterbitkan setelah proses Packing selesai
                    </div>
                  )}
                </div>
              </div>

              {/* Status Header Badge */}
              {selectedOrder.status === 'DELIVERED' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <strong className="block font-bold">STATUS: PESANAN TELAH DITERIMA (DELIVERED)</strong>
                      <span>Paket telah sukses diterima oleh pelanggan. Pengiriman selesai.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Vertical Timeline with all 6 Steps */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
                  Tahapan Pemrosesan Sistem, Gudang & Pengiriman (Lengkap):
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-200">
                  {[
                    {
                      stepNumber: 1,
                      title: '1. Pembayaran Diverifikasi Otomatis',
                      desc: `Midtrans menerima transaksi via ${selectedOrder.paymentMethod.toUpperCase()}. WhatsApp & Email konfirmasi otomatis dikirimkan ke pelanggan.`,
                      time: selectedOrder.createdAt,
                    },
                    {
                      stepNumber: 2,
                      title: '2. Tim Gudang: Preparing & Picking Barang',
                      desc: `Staf gudang mencetak picking list dan mengambil ${selectedOrder.items.length} item pakaian dari rak penyimpanan.`,
                      time: selectedOrder.pickingStartedAt || (selectedOrder.status === 'PAYMENT_VERIFIED' ? 'Sedang ditugaskan' : '-'),
                    },
                    {
                      stepNumber: 3,
                      title: '3. Tim Gudang: Quality Control & Packing',
                      desc: 'Pengecekan jahitan, kemas polybag premium MERE, semprot aroma signature, dan penempelan label thermal A6.',
                      time: selectedOrder.packedAt || (selectedOrder.status === 'PICKING' ? 'Menunggu selesai ambil' : '-'),
                    },
                    {
                      stepNumber: 4,
                      title: '4. Paket Diserahkan ke Ekspedisi (Resi Terbit)',
                      desc: selectedOrder.trackingNumber
                        ? `Nomor resi ${selectedOrder.trackingNumber} terbit. Paket diserahkan ke ${selectedOrder.courier.name}.`
                        : 'Menunggu serah terima kurir pickup.',
                      time: selectedOrder.sentAt || (selectedOrder.status === 'PACKING' ? 'Menunggu pickup kurir' : '-'),
                    },
                    {
                      stepNumber: 5,
                      title: '5. Paket Dalam Pengiriman oleh Kurir',
                      desc: `Kurir ${selectedOrder.courier.name} sedang membawa paket menuju alamat tujuan pelanggan di ${selectedOrder.shippingAddress.city}.`,
                      time: selectedOrder.status === 'DELIVERED'
                        ? 'Selesai diantar'
                        : selectedOrder.status === 'SENT'
                        ? 'Sedang Dalam Perjalanan'
                        : 'Menunggu penjemputan',
                    },
                    {
                      stepNumber: 6,
                      title: '6. Pesanan Diterima oleh Pembeli (DELIVERED)',
                      desc: `Paket telah sukses diterima oleh pelanggan (${selectedOrder.customerName} / Yang Bersangkutan). Status pesanan selesai.`,
                      time: selectedOrder.status === 'DELIVERED' ? 'Diterima dengan Baik' : 'Estimasi sesuai jadwal kurir',
                    },
                  ].map((step) => {
                    const state = getTimelineStepState(step.stepNumber, selectedOrder.status);

                    return (
                      <div key={step.stepNumber} className="relative">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            state === 'COMPLETED'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : state === 'CURRENT'
                              ? 'bg-neutral-900 border-neutral-900 text-white animate-pulse'
                              : 'bg-white border-neutral-300 text-neutral-400'
                          }`}
                        >
                          {state === 'COMPLETED' ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <span className="text-[10px] font-bold">{step.stepNumber}</span>
                          )}
                        </div>

                        <div className="text-xs">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-bold ${
                                state === 'CURRENT'
                                  ? 'text-neutral-900'
                                  : state === 'COMPLETED'
                                  ? 'text-emerald-800'
                                  : 'text-neutral-400'
                              }`}
                            >
                              {step.title}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-neutral-500 mt-1 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in order */}
              <div className="pt-4 border-t border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2">
                  Item dalam Pesanan:
                </span>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2.5 bg-neutral-50 border border-neutral-200"
                    >
                      <div>
                        <span className="font-bold text-neutral-900">
                          {item.quantity}x {item.product.name}
                        </span>
                        <div className="text-[11px] text-neutral-500">
                          Ukuran: {item.variant.size} · Warna: {item.variant.color} · SKU: {item.variant.sku}
                        </div>
                      </div>
                      <div className="font-code font-semibold tabular-nums text-neutral-800">
                        {formatIDR(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Customer WhatsApp Message Preview */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold mb-1">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Notifikasi WhatsApp yang Dikirim ke {selectedOrder.customerPhone}:</span>
                </div>
                <div className="p-3 bg-white border border-emerald-100 font-mono text-[11px] text-neutral-800 rounded space-y-1">
                  <p>Halo Kak <strong>{selectedOrder.customerName}</strong>! 👋</p>
                  <p>
                    {selectedOrder.status === 'DELIVERED'
                      ? `Kabar gembira! Paket MERE Fashion pesananmu (#${selectedOrder.id}) telah SUKSES DITERIMA oleh yang bersangkutan. Semoga suka dengan pakaian barumu! Jika butuh konsultasi atau ingin tukar ukuran (garansi 7 hari), silakan hubungi tim kami kapan saja.`
                      : selectedOrder.status === 'SENT'
                      ? `Kabar baik! Paket MERE Fashion pesananmu (#${selectedOrder.id}) telah diserahkan ke kurir ${selectedOrder.courier.name} dengan Nomor Resi: *${selectedOrder.trackingNumber}* dan saat ini sedang dalam perjalanan menuju alamatmu.`
                      : `Pesananmu (#${selectedOrder.id}) sedang dipersiapkan oleh Tim Gudang MERE. Kami pastikan produk melalui QC ketat sebelum diserahkan ke kurir.`}
                  </p>
                  <p className="text-neutral-500 text-[10px] pt-1">
                    Cek live status pengiriman kapan saja di website resmi MERE FASHION. Terima kasih! ✨
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
