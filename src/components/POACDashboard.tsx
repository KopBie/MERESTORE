import React, { useState } from 'react';
import {
  Workflow,
  Target,
  Users,
  PlayCircle,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Boxes,
  Truck,
  CreditCard,
  Bell,
  Package,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface POACDashboardProps {
  onGoToCatalog: () => void;
  onGoToWarehouse: () => void;
  onGoToAPI: () => void;
}

export const POACDashboard: React.FC<POACDashboardProps> = ({
  onGoToCatalog,
  onGoToWarehouse,
  onGoToAPI,
}) => {
  const [activeStage, setActiveStage] = useState<'planning' | 'organizing' | 'actuating' | 'controlling'>('actuating');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-2">
          <Workflow className="w-4 h-4 text-neutral-800" />
          <span>RANCANGAN MANAJEMEN OPERASIONAL & SISTEM E-COMMERCE</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
          Alur Bisnis POAC & Flowchart Sistem "MERE FASHION"
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
          Penerapan pilar manajemen modern <strong>Planning, Organizing, Actuating, Controlling (POAC)</strong> yang mengintegrasikan alur pelanggan, otomasi payment gateway Midtrans, notifikasi WhatsApp, serta eksekusi logistik gudang secara presisi.
        </p>
      </div>

      {/* POAC 4 Tab Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
        {[
          {
            id: 'planning',
            title: '1. PLANNING',
            subtitle: 'Perencanaan Strategis',
            icon: Target,
            desc: 'Forecasting stok, target SLA & strategi peluncuran produk',
          },
          {
            id: 'organizing',
            title: '2. ORGANIZING',
            subtitle: 'Pengorganisasian',
            icon: Users,
            desc: 'Struktur peran tim, tata letak rak & integrasi sistem',
          },
          {
            id: 'actuating',
            title: '3. ACTUATING',
            subtitle: 'Pelaksanaan Alur (Flowchart)',
            icon: PlayCircle,
            desc: 'Eksekusi transaksi live, picking, packing, hingga resi kurir',
          },
          {
            id: 'controlling',
            title: '4. CONTROLLING',
            subtitle: 'Pengendalian & KPI',
            icon: BarChart3,
            desc: 'Evaluasi lead time, akurasi stok & kepuasan pembeli',
          },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeStage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveStage(item.id as any)}
              className={`p-4 text-left border transition-all cursor-pointer ${
                isActive
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider">{item.title}</span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
              </div>
              <div className="font-editorial text-base font-bold mt-1">{item.subtitle}</div>
              <div
                className={`text-[11px] mt-2 leading-relaxed ${
                  isActive ? 'text-neutral-300' : 'text-neutral-500'
                }`}
              >
                {item.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* STAGE 1: PLANNING */}
      {activeStage === 'planning' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-neutral-200">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                A. Perencanaan Produk & Stok (Inventory Forecasting)
              </span>
              <h3 className="font-editorial text-lg font-bold text-neutral-900 mb-3">
                Kategori & Rasio Ukuran Ideal
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                MERE Fashion menetapkan 6 pilar kategori esensial: Pakaian, Celana, Jaket, Tas, Sepatu, dan Aksesoris. Rasio ukuran mengacu pada data demografis urban Indonesia:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b pb-1">
                  <span>Ukuran S & M:</span>
                  <span className="font-mono font-bold">50% dari total batch produksi</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Ukuran L:</span>
                  <span className="font-mono font-bold">35% dari total batch produksi</span>
                </div>
                <div className="flex justify-between">
                  <span>Ukuran XL / Sepatu 42-43:</span>
                  <span className="font-mono font-bold">15% dari total batch produksi</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-neutral-200">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                B. Perencanaan SLA Operasional Gudang
              </span>
              <h3 className="font-editorial text-lg font-bold text-neutral-900 mb-3">
                Kecepatan Layanan & Cutoff Kurir
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Menjamin kepuasan pelanggan dengan standar penanganan pesanan (SLA) ketat:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b pb-1">
                  <span>Target Waktu Picking:</span>
                  <span className="font-mono font-bold">&lt; 15 menit setelah bayar</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Target Waktu Packing & QC:</span>
                  <span className="font-mono font-bold">&lt; 20 menit</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Cut-off Pengiriman Same-Day:</span>
                  <span className="font-mono font-bold">15:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Jadwal Handover Kurir:</span>
                  <span className="font-mono font-bold">17:00 WIB Setiap Hari</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-neutral-200">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                C. Perencanaan Digital Marketing & Promo
              </span>
              <h3 className="font-editorial text-lg font-bold text-neutral-900 mb-3">
                Kupon & Strategi Akuisisi
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Peluncuran awal difokuskan pada konversi tinggi dan loyalitas pelanggan:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b pb-1">
                  <span>Kupon First Buyer:</span>
                  <span className="font-mono font-bold text-emerald-800">MEREFIRST (Diskon 10%)</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Subsidi Ongkir:</span>
                  <span className="font-mono font-bold text-emerald-800">FREESHIP (Diskon Rp15rb)</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Return on Ad Spend (ROAS):</span>
                  <span className="font-mono font-bold">4.2x - 5.0x pada Meta & TikTok Ads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: ORGANIZING */}
      {activeStage === 'organizing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200 p-6 sm:p-8">
            <h3 className="font-editorial text-2xl font-bold text-neutral-900 mb-2">
              Struktur Organisasi & Pembagian Tugas (Role & Responsibility)
            </h3>
            <p className="text-xs text-neutral-600 mb-6">
              Setiap komponen memiliki wewenang jelas yang terhubung ke database dan API secara real time:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#FAF8F5] border border-neutral-200">
                <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-neutral-900">01. Front Office & Pelanggan</h4>
                <ul className="text-xs text-neutral-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Eksplorasi lookbook & katalog</li>
                  <li>Pemilihan varian (size/warna)</li>
                  <li>Pengisian alamat & checkout</li>
                  <li>Melakukan pembayaran Midtrans</li>
                </ul>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-neutral-200">
                <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-neutral-900">02. Sistem Otomasi & Gateway</h4>
                <ul className="text-xs text-neutral-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Verifikasi webhook SHA512</li>
                  <li>Pengurangan stok atomik</li>
                  <li>WhatsApp API dispatch (Fonnte)</li>
                  <li>Kirim email invoice SMTP</li>
                </ul>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-neutral-200">
                <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <Boxes className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-neutral-900">03. Tim Gudang (Warehouse)</h4>
                <ul className="text-xs text-neutral-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Penerimaan tiket order di WMS</li>
                  <li>Pengambilan barang di rak A/B/C/D</li>
                  <li>Quality Control jahitan & noda</li>
                  <li>Packing & cetak thermal A6</li>
                </ul>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-neutral-200">
                <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center mb-3">
                  <Truck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase text-neutral-900">04. Mitra Logistik & Kurir</h4>
                <ul className="text-xs text-neutral-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Penjemputan paket harian</li>
                  <li>Scan barcode manifest resi</li>
                  <li>Pengiriman jalur darat / udara</li>
                  <li>Update status 'Delivered'</li>
                </ul>
              </div>
            </div>

            {/* Warehouse Rack Topology */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h4 className="text-xs font-bold uppercase text-neutral-900 mb-3">
                Tata Letak Penyimpanan Rak Gudang (Bin Location Topology):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="p-3 bg-neutral-50 border">
                  <strong className="block text-purple-900">RAK A: JAKET & BLAZER</strong>
                  <span className="text-[11px] text-neutral-500">Gantungan padded hanger anti kusut</span>
                </div>
                <div className="p-3 bg-neutral-50 border">
                  <strong className="block text-purple-900">RAK B: ATASAN / TEES</strong>
                  <span className="text-[11px] text-neutral-500">Box plastik kedap debu per ukuran</span>
                </div>
                <div className="p-3 bg-neutral-50 border">
                  <strong className="block text-purple-900">RAK C: CELANA / TROUSERS</strong>
                  <span className="text-[11px] text-neutral-500">Susun lipat rapi dengan divider</span>
                </div>
                <div className="p-3 bg-neutral-50 border">
                  <strong className="block text-purple-900">RAK D: TAS & SEPATU</strong>
                  <span className="text-[11px] text-neutral-500">Dustbag & silica gel gel protection</span>
                </div>
                <div className="p-3 bg-neutral-50 border">
                  <strong className="block text-purple-900">RAK E: AKSESORIS</strong>
                  <span className="text-[11px] text-neutral-500">Laci bersekat mikro untuk sabuk/perhiasan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: ACTUATING (INTERACTIVE FLOWCHART) */}
      {activeStage === 'actuating' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Main Visual Flowchart */}
          <div className="bg-white border border-neutral-200 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
                  DIAGRAM ALUR EKSEKUSI TERPADU (END-TO-END FLOWCHART)
                </span>
                <h3 className="font-editorial text-2xl font-bold text-neutral-900 mt-1">
                  Interaksi 3 Entitas: Pelanggan · Sistem Otomasi · Tim Gudang
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onGoToCatalog}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold cursor-pointer"
                >
                  Uji Alur Pelanggan
                </button>
                <button
                  onClick={onGoToWarehouse}
                  className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
                >
                  Buka Portal Gudang
                </button>
              </div>
            </div>

            {/* Swimlane 1: Pelanggan */}
            <div className="p-4 bg-sky-50/50 border border-sky-200 mb-4">
              <div className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                <span>SWIMLANE 1: ALUR PELANGGAN (CUSTOMER JOURNEY)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white border border-sky-200">
                  <div className="font-bold text-neutral-900">1. Jelajahi Produk</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Kunjungi website MERE FASHION, filter kategori, baca komposisi kain & size chart.
                  </p>
                </div>
                <div className="p-3 bg-white border border-sky-200">
                  <div className="font-bold text-neutral-900">2. Pilih Varian & Tambah Bag</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Pilih ukuran (S/M/L/XL), cek stok real-time, masukkan kupon promo <code>MEREFIRST</code>.
                  </p>
                </div>
                <div className="p-3 bg-white border border-sky-200">
                  <div className="font-bold text-neutral-900">3. Checkout & Pilih Kurir</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Isi data nama & WA, pilih ekspedisi (SiCepat / JNE / J&T) dengan ongkir otomatis.
                  </p>
                </div>
                <div className="p-3 bg-white border border-sky-200">
                  <div className="font-bold text-neutral-900">4. Pembayaran (Midtrans)</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Scan QRIS atau bayar via GoPay / DANA / OVO / Virtual Account dalam batas waktu 15 menit.
                  </p>
                </div>
              </div>
            </div>

            {/* Transition arrow */}
            <div className="flex justify-center my-2">
              <div className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-mono flex items-center gap-2 border">
                <span>Webhook Trigger (POST /api/v1/payment/midtrans-webhook)</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-800" />
              </div>
            </div>

            {/* Swimlane 2: Sistem Otomasi */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 mb-4">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>SWIMLANE 2: ALUR SISTEM OTOMASI (BACKEND ENGINE)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white border border-emerald-200">
                  <div className="font-bold text-neutral-900">1. Verifikasi Signature</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Sistem memvalidasi hash SHA512: <code>order_id + status_code + gross_amount + server_key</code>.
                  </p>
                </div>
                <div className="p-3 bg-white border border-emerald-200">
                  <div className="font-bold text-neutral-900">2. Kunci & Potong Stok</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Jalankan database transaction dengan <code>lockForUpdate()</code> agar terhindar dari overselling.
                  </p>
                </div>
                <div className="p-3 bg-white border border-emerald-200">
                  <div className="font-bold text-neutral-900">3. Kirim Notif WhatsApp/Email</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Otomatis kirim pesan konfirmasi invoice ke nomor WhatsApp pembeli melalui Fonnte Gateway.
                  </p>
                </div>
                <div className="p-3 bg-white border border-emerald-200">
                  <div className="font-bold text-neutral-900">4. Push Antrean ke WMS</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Ubah status pesanan menjadi <code>PAYMENT_VERIFIED</code> dan masukkan ke antrean picking gudang.
                  </p>
                </div>
              </div>
            </div>

            {/* Transition arrow */}
            <div className="flex justify-center my-2">
              <div className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-mono flex items-center gap-2 border">
                <span>Tim Gudang Menerima Notifikasi Layar WMS</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-800" />
              </div>
            </div>

            {/* Swimlane 3: Tim Gudang */}
            <div className="p-4 bg-purple-50/50 border border-purple-200">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <span>SWIMLANE 3: ALUR TIM GUDANG (FULFILLMENT & DISPATCH)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white border border-purple-200">
                  <div className="font-bold text-neutral-900">1. Preparing / Picking</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Staf menuju lokasi rak (contoh: Rak A-02), mengambil varian sesuai SKU, lalu klik status <strong>PICKING</strong>.
                  </p>
                </div>
                <div className="p-3 bg-white border border-purple-200">
                  <div className="font-bold text-neutral-900">2. Packing & QC SOP</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Periksa kerapian jahitan, bungkus polybag MERE, semprot signature perfume, masukkan thank you card.
                  </p>
                </div>
                <div className="p-3 bg-white border border-purple-200">
                  <div className="font-bold text-neutral-900">3. Cetak Resi Thermal A6</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Cetak label pengiriman barcode 100x150mm dan tempelkan rapi di bagian depan paket.
                  </p>
                </div>
                <div className="p-3 bg-white border border-purple-200">
                  <div className="font-bold text-neutral-900">4. Serah Kurir & Resi Aktif</div>
                  <p className="text-neutral-500 mt-1 text-[11px]">
                    Serahkan ke kurir SiCepat/JNE. Status berubah menjadi <strong>SENT</strong> & WhatsApp resi terkirim ke pelanggan!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: CONTROLLING */}
      {activeStage === 'controlling' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-500">KPI 01: FULFILLMENT LEAD TIME</span>
              <div className="font-editorial text-3xl font-bold text-neutral-900 mt-2 tabular-nums">
                32 Menit
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1">Target SLA: &lt; 45 menit (Tercapai)</p>
              <p className="text-[11px] text-neutral-500 mt-2">
                Rata-rata waktu dari pembayaran terverifikasi sampai paket selesai dikemas dan ditempel resi.
              </p>
            </div>

            <div className="p-5 bg-white border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-500">KPI 02: AKURASI STOK GUDANG</span>
              <div className="font-editorial text-3xl font-bold text-neutral-900 mt-2 tabular-nums">
                99.8%
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1">Discrepancy: &lt; 0.2%</p>
              <p className="text-[11px] text-neutral-500 mt-2">
                Dicapai melalui stock opname mingguan dan integrasi pemotongan stok otomatis saat checkout.
              </p>
            </div>

            <div className="p-5 bg-white border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-500">KPI 03: PAYMENT SUCCESS RATE</span>
              <div className="font-editorial text-3xl font-bold text-neutral-900 mt-2 tabular-nums">
                94.3%
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1">Midtrans Instant Gateway</p>
              <p className="text-[11px] text-neutral-500 mt-2">
                Tingkat keberhasilan pembayaran via QRIS dan e-wallet (GoPay/DANA/OVO/BCA VA).
              </p>
            </div>

            <div className="p-5 bg-white border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-500">KPI 04: ON-TIME DELIVERY (OTD)</span>
              <div className="font-editorial text-3xl font-bold text-neutral-900 mt-2 tabular-nums">
                98.6%
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1">Mitra SiCepat & JNE</p>
              <p className="text-[11px] text-neutral-500 mt-2">
                Paket sampai di tangan pelanggan sesuai estimasi waktu pengiriman tanpa komplain keterlambatan.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-neutral-200">
            <h3 className="font-editorial text-xl font-bold text-neutral-900 mb-2">
              Mekanisme Kontrol Kualitas & Mitigasi Risiko (Quality Control & Risk SOP)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-700 mt-4">
              <div className="p-4 bg-[#FAF8F5] border border-neutral-200">
                <strong className="block text-neutral-900 mb-1">1. Pemeriksaan Fisik 3 Titik</strong>
                <p className="text-neutral-500 leading-relaxed">
                  Pemeriksa wajib memeriksa: (a) jahitan obras kerah dan keliman, (b) fungsi ritsleting/kancing, (c) kebersihan kain dari serat debu atau noda sebelum masuk polybag.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5] border border-neutral-200">
                <strong className="block text-neutral-900 mb-1">2. Penanganan Retur & Tukar Ukuran</strong>
                <p className="text-neutral-500 leading-relaxed">
                  Pelanggan diberi garansi 7 hari tukar ukuran dengan syarat hangtag masih terpasang dan pakaian belum dicuci. Customer Service menyediakan form klaim cepat.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5] border border-neutral-200">
                <strong className="block text-neutral-900 mb-1">3. Rollback Stok Otomatis (Timeout)</strong>
                <p className="text-neutral-500 leading-relaxed">
                  Jika pembeli tidak menyelesaikan pembayaran dalam 15 menit, sistem Cron Job Laravel secara otomatis membatalkan pesanan dan mengembalikan stok ke katalog.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
