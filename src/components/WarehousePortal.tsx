import React, { useState } from 'react';
import {
  Boxes,
  CheckCircle,
  Clock,
  Printer,
  Truck,
  ArrowRight,
  Search,
  Package,
  Layers,
  FileCheck,
  Send,
} from 'lucide-react';
import { Order, OrderStatus, formatIDR, generateTrackingNumber } from '../utils/commerce';
import { ThermalLabelModal } from './ThermalLabelModal';

interface WarehousePortalProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus, trackingNo?: string) => void;
}

export const WarehousePortal: React.FC<WarehousePortalProps> = ({
  orders,
  onUpdateOrderStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForLabel, setSelectedOrderForLabel] = useState<Order | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Status mapping for Indonesian labels
  const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
    PENDING_PAYMENT: { label: 'Menunggu Bayar', color: 'bg-amber-100 text-amber-800' },
    PAYMENT_VERIFIED: { label: 'Siap Picking', color: 'bg-blue-100 text-blue-800' },
    PICKING: { label: 'Sedang Picking', color: 'bg-purple-100 text-purple-800' },
    PACKING: { label: 'Sedang Packing', color: 'bg-indigo-100 text-indigo-800' },
    SENT: { label: 'Diserahkan Kurir', color: 'bg-emerald-100 text-emerald-800' },
    DELIVERED: { label: 'Terkirim', color: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' },
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'ALL' || o.status === filterStatus;
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.trackingNumber && o.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const countByStatus = (status: OrderStatus) =>
    orders.filter((o) => o.status === status).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 shadow-xl border border-neutral-700 flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <Send className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{notificationToast}</span>
        </div>
      )}

      {/* Header and KPI cards */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-2">
              <Boxes className="w-4 h-4 text-neutral-800" />
              <span>SISTEM OPERASIONAL TIM GUDANG (WMS & FULFILLMENT)</span>
            </div>
            <h1 className="font-editorial text-3xl font-bold text-neutral-900 mt-1">
              Antrean Eksekusi Pesanan (POAC Actuating)
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Alur kerja terpadu: Pesanan Lunas &gt; Ambil Barang (Picking) &gt; Kemas (Packing) &gt; Cetak Resi &gt; Serahkan ke Kurir
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Live Status Gudang:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Online (DC Jakarta)
            </span>
          </div>
        </div>

        {/* 4 Step Operational Stage Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div
            onClick={() => setFilterStatus('PAYMENT_VERIFIED')}
            className={`p-4 border cursor-pointer transition-all ${
              filterStatus === 'PAYMENT_VERIFIED'
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">1. Siap Picking</span>
              <Clock className="w-4 h-4 opacity-75" />
            </div>
            <div className="font-editorial text-3xl font-bold mt-2 tabular-nums">
              {countByStatus('PAYMENT_VERIFIED')}
            </div>
            <div className="text-[11px] opacity-75 mt-1">Verifikasi pembayaran sukses</div>
          </div>

          <div
            onClick={() => setFilterStatus('PICKING')}
            className={`p-4 border cursor-pointer transition-all ${
              filterStatus === 'PICKING'
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">2. Sedang Picking</span>
              <Layers className="w-4 h-4 opacity-75" />
            </div>
            <div className="font-editorial text-3xl font-bold mt-2 tabular-nums">
              {countByStatus('PICKING')}
            </div>
            <div className="text-[11px] opacity-75 mt-1">Staf sedang mengambil dari rak</div>
          </div>

          <div
            onClick={() => setFilterStatus('PACKING')}
            className={`p-4 border cursor-pointer transition-all ${
              filterStatus === 'PACKING'
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">3. Sedang Packing</span>
              <Package className="w-4 h-4 opacity-75" />
            </div>
            <div className="font-editorial text-3xl font-bold mt-2 tabular-nums">
              {countByStatus('PACKING')}
            </div>
            <div className="text-[11px] opacity-75 mt-1">QC & kemas polybag MERE</div>
          </div>

          <div
            onClick={() => setFilterStatus('SENT')}
            className={`p-4 border cursor-pointer transition-all ${
              filterStatus === 'SENT'
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">4. Diserahkan Kurir</span>
              <Truck className="w-4 h-4 opacity-75" />
            </div>
            <div className="font-editorial text-3xl font-bold mt-2 tabular-nums">
              {countByStatus('SENT')}
            </div>
            <div className="text-[11px] opacity-75 mt-1">Resi aktif & dalam perjalanan</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PAYMENT_VERIFIED', 'PICKING', 'PACKING', 'SENT'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                filterStatus === st
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {st === 'ALL' ? 'Semua Pesanan' : STATUS_CONFIG[st as OrderStatus]?.label || st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari Order ID, Nama, No. Resi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900"
          />
        </div>
      </div>

      {/* Orders Operational Table / Card List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-neutral-300 p-8">
            <p className="font-editorial text-lg text-neutral-700">Tidak ada pesanan di kategori ini</p>
            <p className="text-xs text-neutral-500 mt-1">
              Pesanan baru dari checkout pelanggan akan otomatis masuk ke tahap "Siap Picking".
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusMeta = STATUS_CONFIG[order.status];

            return (
              <div
                key={order.id}
                className="bg-white border border-neutral-200 p-5 hover:border-neutral-400 transition-all shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono font-bold text-sm text-neutral-900">
                      {order.id}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-semibold ${statusMeta.color}`}>
                      {statusMeta.label}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {order.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500">Ekspedisi:</span>
                    <span className="text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5">
                      {order.courier.name} ({order.courier.service.split(' ')[0]})
                    </span>
                    {order.trackingNumber && (
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5">
                        Resi: {order.trackingNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Items & Customer Address */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-4">
                  {/* Left: Items to pick/pack */}
                  <div className="md:col-span-7 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                      Daftar Barang & Lokasi Rak Gudang:
                    </span>
                    <div className="space-y-1.5">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-[#FAF8F5] border border-neutral-200 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-800">
                              {item.quantity}x
                            </span>
                            <span className="font-medium text-neutral-900">
                              {item.product.name}
                            </span>
                            <span className="text-neutral-500">
                              ({item.variant.size} / {item.variant.color})
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] text-neutral-600 bg-white px-1.5 py-0.5 border">
                              SKU: {item.variant.sku}
                            </span>
                            <span className="font-mono font-bold text-[10px] text-purple-800 bg-purple-50 px-2 py-0.5 border border-purple-200">
                              RAK {item.product.category === 'Jaket' ? 'A-02' : item.product.category === 'Pakaian' ? 'B-01' : item.product.category === 'Celana' ? 'C-04' : 'D-03'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Recipient & SLA */}
                  <div className="md:col-span-5 text-xs space-y-2 border-l border-neutral-100 pl-0 md:pl-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                      Detail Penerima & Total:
                    </span>
                    <div>
                      <strong className="text-neutral-900">{order.customerName}</strong> (
                      <span className="text-neutral-600">{order.customerPhone}</span>)
                    </div>
                    <div className="text-neutral-600 leading-tight">
                      {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.province} {order.shippingAddress.postalCode}
                    </div>
                    <div className="pt-1 text-neutral-800 font-semibold flex justify-between">
                      <span>Total Nilai Pesanan:</span>
                      <span className="font-code">{formatIDR(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Warehouse Action Buttons Bar */}
                <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrderForLabel(order)}
                      className="px-3 py-1.5 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cetak Label Thermal A6</span>
                    </button>
                  </div>

                  {/* Flow Action triggers */}
                  <div className="flex items-center gap-2">
                    {order.status === 'PAYMENT_VERIFIED' && (
                      <button
                        onClick={() => {
                          onUpdateOrderStatus(order.id, 'PICKING');
                          showToast(`Pesanan ${order.id} masuk status PICKING. Staf ditugaskan mengambil barang.`);
                        }}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Mulai Picking (Ambil Barang)</span>
                      </button>
                    )}

                    {order.status === 'PICKING' && (
                      <button
                        onClick={() => {
                          onUpdateOrderStatus(order.id, 'PACKING');
                          showToast(`Barang pesanan ${order.id} selesai diambil. Memulai proses PACKING & QC.`);
                        }}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Selesai Ambil &gt; Mulai Packing</span>
                      </button>
                    )}

                    {order.status === 'PACKING' && (
                      <button
                        onClick={() => {
                          const resi = generateTrackingNumber(order.courier.code);
                          onUpdateOrderStatus(order.id, 'SENT', resi);
                          showToast(
                            `Resi ${resi} diterbitkan! Pesanan ${order.id} diserahkan ke ${order.courier.name}. WhatsApp otomatis dikirim ke ${order.customerPhone}!`
                          );
                        }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Kemas Selesai &gt; Serahkan ke Kurir</span>
                      </button>
                    )}

                    {order.status === 'SENT' && (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Paket Sudah di Kurir (Resi Aktif)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Printable Thermal Label Modal */}
      <ThermalLabelModal
        order={selectedOrderForLabel}
        onClose={() => setSelectedOrderForLabel(null)}
      />
    </div>
  );
};
