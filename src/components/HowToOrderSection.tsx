import React from 'react';
import { ShoppingBag, Truck, CreditCard, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

interface HowToOrderSectionProps {
  onGoToCatalog: () => void;
}

export const HowToOrderSection: React.FC<HowToOrderSectionProps> = ({ onGoToCatalog }) => {
  return (
    <section id="cara-order-section" className="border-t border-[#E5E5E0] bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500">
            PANDUAN BELANJA RESMI
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">
            Cara Order Mudah & Pembayaran Aman
          </h2>
          <p className="text-sm text-neutral-600 mt-3 font-light leading-relaxed">
            Pengalaman belanja busana modern di MERE FASHION sepenuhnya otomatis, cepat, dan transparan dari keranjang hingga kurir tiba di pintu rumah Anda.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-6 bg-[#FAF8F5] border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-900 text-white rounded-none flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-editorial text-lg font-bold text-neutral-900 mb-2">
                Pilih Produk & Ukuran
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Jelajahi katalog, pilih pakaian favorit, dan tentukan ukuran yang sesuai (S, M, L, XL atau nomor sepatu). Cek ketersediaan stok real-time di tiap varian.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-200 text-[11px] text-neutral-500">
              Tersedia size chart akurat di setiap produk.
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-[#FAF8F5] border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-900 text-white rounded-none flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-editorial text-lg font-bold text-neutral-900 mb-2">
                Klaim Kupon Diskon
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Buka keranjang belanja (shopping bag) dan masukkan kode voucher diskon:
                <br />
                <strong className="text-emerald-800 font-mono text-[11px] block mt-1">
                  MEREFIRST (Diskon 10%)
                </strong>
                atau <strong className="text-emerald-800 font-mono text-[11px]">FREESHIP (Subsidi Ongkir)</strong>.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-200 text-[11px] text-neutral-500">
              Berlaku untuk seluruh metode pembayaran.
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-[#FAF8F5] border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-900 text-white rounded-none flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-editorial text-lg font-bold text-neutral-900 mb-2">
                Checkout & Pembayaran
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Isi alamat pengiriman dan pilih ekspedisi (SiCepat / JNE / J&T). Bayar secara instan via <strong>QRIS, GoPay, DANA, OVO, atau BCA Virtual Account</strong>.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-200 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi otomatis tanpa bukti manual.
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 bg-[#FAF8F5] border border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-900 text-white rounded-none flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h3 className="font-editorial text-lg font-bold text-neutral-900 mb-2">
                Update Resi WhatsApp
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Tim gudang melakukan QC jahitan, mengemas rapi dalam polybag premium MERE, dan nomor resi kurir akan otomatis dikirimkan ke WhatsApp Anda.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-neutral-700" /> Pengiriman cepat same-day &lt; 15:00 WIB.
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 p-8 bg-[#1A1A1A] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-amber-300 font-semibold tracking-wider uppercase block">
              SIAP MENEMUKAN SILUET TERBAIK ANDA?
            </span>
            <h3 className="font-editorial text-2xl font-bold mt-1">
              Jelajahi Koleksi Terbaru MERE FASHION Hari Ini
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Dapatkan gratis ongkir dan jaminan tukar ukuran 7 hari untuk setiap pembelian.
            </p>
          </div>
          <button
            onClick={onGoToCatalog}
            className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-black text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <span>Mulai Belanja Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
