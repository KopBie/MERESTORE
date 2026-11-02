import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, HelpCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setContact('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="kontak-section" className="border-t border-[#E5E5E0] bg-[#FAF8F5] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500">
            HUBUNGI KAMI · CUSTOMER CONCIERGE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">
            Layanan Pelanggan & Konsultasi Ukuran
          </h2>
          <p className="text-sm text-neutral-600 mt-3 font-light leading-relaxed">
            Butuh saran padu-padan outfit, konfirmasi ketersediaan stok, atau bantuan mengenai status pesanan Anda? Tim kami siap melayani Anda setiap hari.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Channels & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white border border-neutral-200 space-y-4">
              <h3 className="font-editorial text-xl font-bold text-neutral-900">
                Saluran Bantuan Resmi MERE
              </h3>

              <div className="space-y-3.5 text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 text-neutral-900 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">WhatsApp Concierge (Respon Cepat)</strong>
                    <span className="text-neutral-600 font-mono">+62 811-9920-881</span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Untuk konsultasi ukuran badan dan verifikasi resi pengiriman.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 text-neutral-900 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">Email Customer Support</strong>
                    <span className="text-neutral-600 font-mono">care@merefashion.com</span>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Klaim garansi tukar ukuran dan kerjasama resmi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 text-neutral-900 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">Studio & Fulfillment Center</strong>
                    <span className="text-neutral-600">
                      Jl. TB Simatupang No. 88, Cilandak, Jakarta Selatan 12430
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 text-neutral-900 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">Jam Operasional Layanan</strong>
                    <span className="text-neutral-600">
                      Senin – Minggu: 08:00 – 21:00 WIB (Termasuk Libur Nasional)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Mini */}
            <div className="p-6 bg-white border border-neutral-200 space-y-3 text-xs">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-neutral-700" />
                Pertanyaan yang Sering Diajukan (FAQ):
              </span>
              <div className="border-t border-neutral-100 pt-2 space-y-2">
                <div>
                  <strong className="text-neutral-800 block">Q: Apakah produk yang tampil di website ready stock?</strong>
                  <p className="text-neutral-500 text-[11px] mt-0.5">
                    Ya, seluruh varian dan ukuran yang dapat dipilih di website tersinkronisasi langsung dengan stok fisik di gudang.
                  </p>
                </div>
                <div>
                  <strong className="text-neutral-800 block">Q: Bagaimana jika ukuran baju yang saya beli kurang pas?</strong>
                  <p className="text-neutral-500 text-[11px] mt-0.5">
                    MERE memberikan garansi 7 hari tukar ukuran dengan syarat hangtag masih terpasang dan pakaian belum dicuci.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8">
            <h3 className="font-editorial text-2xl font-bold text-neutral-900 mb-1">
              Kirim Pesan ke Tim MERE
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Isi formulir di bawah ini dan konsultan busana kami akan membalas pertanyaan Anda dalam waktu kurang dari 30 menit.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="font-editorial text-lg font-bold text-emerald-900">
                  Pesan Anda Berhasil Terkirim!
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Terima kasih, Kak. Tim concierge MERE Fashion akan segera menghubungi nomor atau email Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rian Pramana"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Nomor WhatsApp atau Email Aktif
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0812xxxxxxxx atau email@domain.com"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Pesan atau Pertanyaan Anda (Konsultasi Ukuran / Info Order)
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan seputar ukuran, bahan kain, atau konfirmasi pesanan Anda..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan ke Konsultan MERE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
