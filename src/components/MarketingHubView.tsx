import React, { useState } from 'react';
import {
  Sparkles,
  Video,
  Copy,
  Check,
  Instagram,
  Smartphone,
  Share2,
  TrendingUp,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  ExternalLink,
} from 'lucide-react';

export const MarketingHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tiktok_ads' | 'reels_editorial' | 'carousel_copy' | 'wa_broadcast' | 'campaign_plan'>('tiktok_ads');
  const [copied, setCopied] = useState(false);

  // Video Simulator Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulatedSecond, setSimulatedSecond] = useState(2);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-neutral-800" />
          <span>DIGITAL MARKETING CAMPAIGN & ADVERTISING BLUEPRINT</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
          Materi Iklan & Naskah Copywriting "MERE FASHION"
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
          Naskah iklan promosi terstruktur dengan formula <strong>Hook &gt; Problem &gt; Solution &gt; CTA</strong> bergaya kasual dan elegan untuk Instagram Reels, TikTok Ads, Carousel Feed, dan Broadcast WhatsApp yang langsung mengonversi audiens menjadi pembeli di website resmi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-neutral-200 mt-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'tiktok_ads', label: '1. TikTok / Reels Ads (Kasual & Konversi)' },
          { id: 'reels_editorial', label: '2. Naskah Video Editorial (Quiet Luxury)' },
          { id: 'carousel_copy', label: '3. Instagram Carousel Post & Feed' },
          { id: 'wa_broadcast', label: '4. WhatsApp Broadcast Templates' },
          { id: 'campaign_plan', label: '5. Strategi Iklan Meta / POAC Marketing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs font-semibold tracking-wider uppercase border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TIKTOK / REELS ADS */}
      {activeTab === 'tiktok_ads' && (
        <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          {/* Left: Interactive Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] aspect-[9/16] bg-black rounded-[36px] p-3 shadow-2xl border-4 border-neutral-800 relative overflow-hidden text-white flex flex-col justify-between">
              {/* Top status */}
              <div className="pt-2 px-3 flex justify-between items-center text-[10px] z-10 text-neutral-300 font-mono">
                <span>09:41</span>
                <span className="font-bold tracking-wider">MERE FASHION</span>
                <span>5G 100%</span>
              </div>

              {/* Video Simulated Background */}
              <div className="absolute inset-0 bg-neutral-900">
                <img
                  src="/src/assets/images/hero_mere_fashion_1793622512464.jpg"
                  alt="Video Ad Background"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
              </div>

              {/* Middle Play/Pause simulation */}
              <div className="relative z-10 my-auto text-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                </button>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-xs text-[10px] rounded-full border border-white/20">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>Audio: Lofi Jazz Neo-Soul Beat (Trending)</span>
                </div>
              </div>

              {/* Bottom Overlay & CTA */}
              <div className="relative z-10 p-3 space-y-2">
                <div className="text-[11px] font-bold text-amber-300 tracking-wide uppercase">
                  ⚡ 3-SEC HOOK: "Pernah ngerasa outfit kamu gitu-gitu aja?"
                </div>
                <p className="text-[11px] text-neutral-200 leading-snug">
                  Potongan boxy blazer & relaxed trousers dari <strong>@merefashion.id</strong>. Kain anti-lecek, adem seharian di Jakarta.
                </p>

                {/* Simulated Shop Now CTA button */}
                <div className="pt-1">
                  <div className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider text-center rounded-lg shadow-lg flex items-center justify-center gap-1.5">
                    <span>Belanja di Website (Diskon 10%)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span className="block text-center text-[9px] text-neutral-400 mt-1">
                    Gunakan kode kupon: MEREFIRST di checkout
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Script Breakdown & Shot List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 bg-white border border-neutral-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                    FORMAT: TIKTOK ADS & REELS 9:16 (DURASI: 25 DETIK)
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-neutral-900 mt-0.5">
                    Naskah Video 1: "The Clean Wardrobe Shift"
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(TIKTOK_SCRIPT_1)}
                  className="px-3 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Naskah</span>
                </button>
              </div>

              {/* Step by step script */}
              <div className="mt-4 space-y-4 text-xs">
                {/* 0-3s Hook */}
                <div className="p-3 bg-amber-50/60 border border-amber-200">
                  <div className="flex justify-between font-bold text-amber-900">
                    <span>[DETIK 00 - 03] THE VISUAL HOOK (STOP SCROLLING)</span>
                    <span className="font-mono">Penting: 3 Detik Pertama</span>
                  </div>
                  <p className="text-neutral-700 mt-1">
                    <strong>Visual:</strong> Talent berdiri di depan cermin, memegang kemeja kusut yang membosankan dengan ekspresi lelah, lalu transisi snap jari ke outfit boxy charcoal blazer + relaxed linen trousers MERE.
                  </p>
                  <p className="text-neutral-900 mt-1 italic font-sans">
                    <strong>Voiceover (Kasual & Akrab):</strong> "Stop buang waktu 20 menit tiap pagi cuma buat mikir: 'Hari ini pakai baju apa ya?'"
                  </p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">
                    <strong>Teks di Layar:</strong> "POV: Kamu nemu pakaian esensial yang gampang di-mix-and-match."
                  </p>
                </div>

                {/* 3-12s Problem & Transition */}
                <div className="p-3 bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between font-bold text-neutral-900">
                    <span>[DETIK 03 - 12] PROBLEM & PRODUCT HERO</span>
                  </div>
                  <p className="text-neutral-700 mt-1">
                    <strong>Visual:</strong> Close-up detail tekstur bahan (fabric zoom), kerapian jahitan kerah, dan drape kain yang jatuh natural saat talent berjalan di trotoar Sudirman/SCBD.
                  </p>
                  <p className="text-neutral-900 mt-1 italic font-sans">
                    <strong>Voiceover:</strong> "Kebanyakan baju modern itu kalau nggak bahannya panas, potongannya terlalu kaku. Tapi koleksi MERE ini beneran beda. Siluetnya relaxed boxy, serat katun dan poly-wool premium yang breathable, dan yang paling penting: nggak gampang lecek seharian."
                  </p>
                </div>

                {/* 12-20s Social Proof & Versatility */}
                <div className="p-3 bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between font-bold text-neutral-900">
                    <span>[DETIK 12 - 20] VERSATILITY (KANTOR KE NONGKRONG)</span>
                  </div>
                  <p className="text-neutral-700 mt-1">
                    <strong>Visual:</strong> Split-screen cepat: satu tampilan untuk meeting kantor kasual dengan sneakers, satu tampilan lagi untuk ngopi sore di café aesthetic.
                  </p>
                  <p className="text-neutral-900 mt-1 italic font-sans">
                    <strong>Voiceover:</strong> "Dari jam kerja di kantor sampai nongkrong malam hari, tinggal ganti tas atau lepas outer, look kamu langsung effortlessly elevated."
                  </p>
                </div>

                {/* 20-25s Strong CTA */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-300">
                  <div className="flex justify-between font-bold text-emerald-950">
                    <span>[DETIK 20 - 25] CALL TO ACTION (DIRECT TO WEBSITE)</span>
                  </div>
                  <p className="text-neutral-700 mt-1">
                    <strong>Visual:</strong> Talent membuka website MERE di handphone, menunjukkan proses checkout cepat 3 klik dan voucher aktif.
                  </p>
                  <p className="text-emerald-900 mt-1 italic font-sans font-bold">
                    <strong>Voiceover:</strong> "Koleksi Drop 01 jumlahnya terbatas. Klik link di bawah, gunakan kupon 'MEREFIRST' buat dapetin diskon 10% dan free ongkir sekarang!"
                  </p>
                  <p className="text-neutral-600 text-[11px] mt-0.5">
                    <strong>Overlay Button:</strong> "Belanja Sekarang &gt; merefashion.com"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REELS EDITORIAL (QUIET LUXURY) */}
      {activeTab === 'reels_editorial' && (
        <div className="my-8 space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
                  GAYA IKLAN: ELEGAN, MINIMALIS & EDITORIAL LOOKBOOK
                </span>
                <h3 className="font-editorial text-2xl font-bold text-neutral-900 mt-1">
                  Naskah Video 2: "The Art of Less" (Quiet Luxury Aesthetic)
                </h3>
              </div>
              <button
                onClick={() => handleCopy(EDITORIAL_REELS_SCRIPT)}
                className="px-3 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin Script</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-neutral-50 border leading-relaxed">
                <span className="font-bold text-neutral-900 block mb-1">Tone & Voice:</span>
                <p className="text-neutral-600">
                  Reflektif, elegan, berwibawa, tempo tenang (slow-paced cinematic). Musik latar: French piano jazz kontemporer atau ambient synth hangat.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border bg-white space-y-2">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    SHOT 01 (00:00 - 00:04):
                  </span>
                  <p className="text-neutral-600">
                    <strong>Kamera:</strong> Macro shot kain katun organik dan jahitan tangan. Cahaya matahari pagi alami menyentuh permukaan tekstur.
                  </p>
                  <p className="text-neutral-900 italic font-sans">
                    <strong>Voiceover:</strong> "Di tengah dunia yang serba bising dan penuh tren musiman..."
                  </p>
                </div>

                <div className="p-4 border bg-white space-y-2">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    SHOT 02 (00:04 - 00:09):
                  </span>
                  <p className="text-neutral-600">
                    <strong>Kamera:</strong> Model berjalan dengan santai mengenakan <em>Atelier Charcoal Blazer</em> di ruang arsitektur minimalis beton ekspos.
                  </p>
                  <p className="text-neutral-900 italic font-sans">
                    <strong>Voiceover:</strong> "...keanggunan sejati tidak pernah berteriak untuk mencari perhatian."
                  </p>
                </div>

                <div className="p-4 border bg-white space-y-2">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    SHOT 03 (00:09 - 00:15):
                  </span>
                  <p className="text-neutral-600">
                    <strong>Kamera:</strong> Medium shot model melipat kancing manset, mengenakan <em>Architect Day Tote</em> berbahan kulit vegan premium.
                  </p>
                  <p className="text-neutral-900 italic font-sans">
                    <strong>Voiceover:</strong> "MERE FASHION lahir dari satu prinsip sederhana: siluet esensial, material terbaik, dan kenyamanan tanpa kompromi."
                  </p>
                </div>

                <div className="p-4 border bg-white space-y-2">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    SHOT 04 (00:15 - 00:20):
                  </span>
                  <p className="text-neutral-600">
                    <strong>Kamera:</strong> Logo MERE FASHION muncul dengan tipografi serif elegan di atas latar belakang off-white bersih.
                  </p>
                  <p className="text-neutral-900 italic font-sans">
                    <strong>Voiceover:</strong> "Temukan esensi berpakaian Anda. Jelajahi katalog resmi kami di merefashion.com."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAROUSEL POST */}
      {activeTab === 'carousel_copy' && (
        <div className="my-8 space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
                  INSTAGRAM FEED CAROUSEL (5 SLIDES + CAPTION)
                </span>
                <h3 className="font-editorial text-2xl font-bold text-neutral-900 mt-1">
                  Konten Carousel Edukasi: "5 Essential Pieces for Capsule Wardrobe"
                </h3>
              </div>
              <button
                onClick={() => handleCopy(CAROUSEL_COPY_FULL)}
                className="px-3 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin Caption & Slides</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs mb-6">
              <div className="p-3 border bg-[#FAF8F5]">
                <span className="font-bold block text-neutral-900">Slide 1 (Cover)</span>
                <p className="text-neutral-600 mt-1">
                  "Kenapa lemari kamu penuh, tapi tetap ngerasa nggak punya baju?" (Tipografi serif bold + foto blazer)
                </p>
              </div>
              <div className="p-3 border bg-[#FAF8F5]">
                <span className="font-bold block text-neutral-900">Slide 2 (The Blazer)</span>
                <p className="text-neutral-600 mt-1">
                  "Atelier Charcoal Blazer": Konstruksi bahu presisi, cocok untuk meeting Zoom atau dinner santai.
                </p>
              </div>
              <div className="p-3 border bg-[#FAF8F5]">
                <span className="font-bold block text-neutral-900">Slide 3 (The Pants)</span>
                <p className="text-neutral-600 mt-1">
                  "Pleated Relaxed Wide Trousers": Drape flow alami yang bikin ilusi kaki jenjang dan anti-gerah.
                </p>
              </div>
              <div className="p-3 border bg-[#FAF8F5]">
                <span className="font-bold block text-neutral-900">Slide 4 (The Tote)</span>
                <p className="text-neutral-600 mt-1">
                  "Architect Day Tote": Muat laptop 15 inch, bahan kulit vegan tebal tahan banting.
                </p>
              </div>
              <div className="p-3 border bg-[#FAF8F5]">
                <span className="font-bold block text-neutral-900">Slide 5 (CTA)</span>
                <p className="text-neutral-600 mt-1">
                  "Bangun capsule wardrobe kamu sekarang di website merefashion.com. Gunakan kode: MEREFIRST."
                </p>
              </div>
            </div>

            {/* Ready to copy Caption */}
            <div className="p-4 bg-neutral-900 text-neutral-200 font-mono text-xs rounded-none space-y-2">
              <span className="text-neutral-400 block pb-1 border-b border-neutral-700">
                CAPTION INSTAGRAM RESMI:
              </span>
              <p className="text-emerald-400">
                Sering ngerasa lemari kepenuhan tapi ujung-ujungnya bingung mau pakai apa? 🤦‍♂️
              </p>
              <p>
                Kuncinya bukan beli lebih banyak pakaian, tapi punya <strong>few essential pieces</strong> yang gampang dipadupadankan (mix and match) tanpa mikir panjang.
              </p>
              <p>
                Koleksi Drop 01 dari MERE FASHION dirancang dengan potongan relaxed tailoring kontemporer, material poly-wool & katun organik yang adem untuk iklim tropis, dan jahitan presisi standar atelier.
              </p>
              <p>
                Koleksi terbatas sudah bisa diakses langsung via website kami!
                <br />
                🛒 Klik link di bio: <strong>merefashion.com</strong>
                <br />
                🎟️ Gunakan kupon <strong>MEREFIRST</strong> untuk diskon 10% pesanan pertamamu.
              </p>
              <p className="text-neutral-400 text-[11px] pt-2">
                #MereFashion #MinimalistFashion #CapsuleWardrobeIndonesia #OOTDIndo #QuietLuxury #TailoredBlazer #LocalBrandIndo
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WHATSAPP BROADCAST */}
      {activeTab === 'wa_broadcast' && (
        <div className="my-8 space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Template 1 */}
            <div className="p-5 bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  TEMPLATE 01: NOTIFIKASI INVOICE
                </span>
                <h4 className="font-editorial text-lg font-bold text-neutral-900 mt-2 mb-3">
                  Konfirmasi Pembayaran Lunas
                </h4>
                <div className="p-3 bg-neutral-50 border font-mono text-[11px] text-neutral-800 leading-relaxed space-y-2">
                  <p>Halo Kak <strong>[Nama Customer]</strong>! ✨</p>
                  <p>
                    Terima kasih telah berbelanja di MERE FASHION. Pembayaran sebesar <strong>Rp[Total]</strong> untuk Order <strong>#[Order_ID]</strong> telah kami terima melalui [Metode].
                  </p>
                  <p>
                    Tim Gudang kami sedang memproses pesanan Anda dengan pemeriksaan QC ketat. Resi pengiriman akan kami kirimkan begitu paket diserahkan ke kurir.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(WA_TEMPLATE_1)}
                className="mt-4 w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
              >
                Salin Template WA
              </button>
            </div>

            {/* Template 2 */}
            <div className="p-5 bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200">
                  TEMPLATE 02: UPDATE RESI
                </span>
                <h4 className="font-editorial text-lg font-bold text-neutral-900 mt-2 mb-3">
                  Paket Sudah di Kurir (Sent)
                </h4>
                <div className="p-3 bg-neutral-50 border font-mono text-[11px] text-neutral-800 leading-relaxed space-y-2">
                  <p>Kabar gembira Kak <strong>[Nama Customer]</strong>! 📦</p>
                  <p>
                    Paket MERE pesanan Anda (#[Order_ID]) telah selesai dikemas dan diserahkan ke <strong>[Ekspedisi]</strong>.
                  </p>
                  <p>
                    Nomor Resi Resmi: <strong>[NO_RESI]</strong>
                  </p>
                  <p>
                    Lacak perjalanan paket Anda secara real-time di: merefashion.com/track/[Order_ID]
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(WA_TEMPLATE_2)}
                className="mt-4 w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
              >
                Salin Template WA
              </button>
            </div>

            {/* Template 3 */}
            <div className="p-5 bg-white border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                  TEMPLATE 03: ABANDONED CART
                </span>
                <h4 className="font-editorial text-lg font-bold text-neutral-900 mt-2 mb-3">
                  Follow-Up Keranjang Tertinggal
                </h4>
                <div className="p-3 bg-neutral-50 border font-mono text-[11px] text-neutral-800 leading-relaxed space-y-2">
                  <p>Hai Kak <strong>[Nama]</strong>! 👋</p>
                  <p>
                    Kami melihat Anda meninggalkan <strong>[Nama Produk]</strong> di keranjang belanja MERE FASHION.
                  </p>
                  <p>
                    Khusus hari ini, stok ukuran Anda tinggal tersisa sedikit. Gunakan kupon rahasia: <strong>MEREFIRST</strong> untuk klaim diskon 10% + subsidi ongkir!
                  </p>
                  <p>Selesaikan checkout: merefashion.com/cart</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(WA_TEMPLATE_3)}
                className="mt-4 w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
              >
                Salin Template WA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CAMPAIGN PLAN & POAC MARKETING */}
      {activeTab === 'campaign_plan' && (
        <div className="my-8 space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200 p-6 sm:p-8">
            <h3 className="font-editorial text-2xl font-bold text-neutral-900 mb-2">
              Strategi Kampanye Peluncuran & POAC Digital Marketing
            </h3>
            <p className="text-xs text-neutral-600 mb-6">
              Rencana aksi pemasaran komprehensif untuk mencapai target omzet dan konversi website yang konsisten:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700">
              <div className="p-5 bg-[#FAF8F5] border border-neutral-200 space-y-3">
                <strong className="block text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                  1. TARGET AUDIENS META & TIKTOK ADS
                </strong>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-600 leading-relaxed">
                  <li><strong>Usia:</strong> 22 - 38 tahun (Young Urban Professionals, Content Creators, Founders).</li>
                  <li><strong>Lokasi:</strong> DKI Jakarta, Tangerang Selatan, Bandung, Surabaya, Medan, Makassar.</li>
                  <li><strong>Interest Targeting:</strong> COS Stores, Uniqlo U, Massimo Dutti, Minimalist Interior, Architecture Digest, Kinfolk Magazine.</li>
                  <li><strong>Optimasi Pixel:</strong> Conversion Event 'Purchase' dengan Value Optimization.</li>
                </ul>
              </div>

              <div className="p-5 bg-[#FAF8F5] border border-neutral-200 space-y-3">
                <strong className="block text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                  2. SEEDING STRATEGY (KOL & KOC INFLUENCER)
                </strong>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-600 leading-relaxed">
                  <li><strong>Micro-Influencer (15k - 70k followers):</strong> Kirim 20 set outfit Atelier Blazer & Wide Trousers ke fashion stylists & creative agency directors.</li>
                  <li><strong>Format Review:</strong> "Get Ready With Me (GRWM)" dan "1 Blazer 3 Outfits Challenge".</li>
                  <li><strong>Affiliate Voucher:</strong> Setiap influencer diberikan kode referral unik (komisi 8%) untuk mengukur konversi riil.</li>
                </ul>
              </div>

              <div className="p-5 bg-[#FAF8F5] border border-neutral-200 space-y-3">
                <strong className="block text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                  3. RETARGETING FUNNEL (ABANDONED CHECKOUT)
                </strong>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-600 leading-relaxed">
                  <li><strong>Custom Audience:</strong> Pengunjung website yang menambahkan barang ke keranjang (Add to Cart) tapi belum bayar dalam 48 jam.</li>
                  <li><strong>Iklan Retargeting:</strong> Tampilkan testimonial pembeli puas, garansi 7 hari tukar ukuran, dan pengingat kupon diskon.</li>
                  <li><strong>WhatsApp Automated Drip:</strong> Kirim reminder pesan ramah 2 jam setelah drop-off keranjang.</li>
                </ul>
              </div>

              <div className="p-5 bg-[#FAF8F5] border border-neutral-200 space-y-3">
                <strong className="block text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                  4. KPI & ESTIMASI BUDGET PEMASARAN
                </strong>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-600 leading-relaxed">
                  <li><strong>Target ROAS:</strong> 4.5x (Setiap Rp100.000 belanja iklan menghasilkan omzet Rp450.000).</li>
                  <li><strong>Alokasi Budget Awal:</strong> 60% TikTok/Meta Conversion Ads, 25% Seeding Produk Influencer, 15% Retargeting & WA Gateway.</li>
                  <li><strong>Average Order Value (AOV):</strong> Rp550.000 - Rp750.000 per transaksi checkout.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TIKTOK_SCRIPT_1 = `[MERE FASHION - TIKTOK & REELS ADS SCRIPT]
DURASI: 25 DETIK
GAYA: CASUAL, RELATABLE, ELEGAN
GOAL: DRIVE TRAFFIC TO MEREFASHION.COM

[00:00 - 00:03] THE VISUAL HOOK:
Visual: Talent di depan cermin, pegang baju kusut, ekspresi lelah -> Snap transisi ke Atelier Charcoal Blazer MERE.
VO: "Stop buang waktu 20 menit tiap pagi cuma buat mikir: 'Hari ini pakai baju apa ya?'"
Text on screen: "POV: Kamu nemu pakaian esensial yang gampang di-mix-and-match."

[00:03 - 00:12] PROBLEM & PRODUCT HERO:
Visual: Zoom in serat kain poly-wool, kerapian jahitan atelier, drape kain jatuh rapi saat talent jalan di SCBD.
VO: "Kebanyakan baju modern kalau nggak panas, bahannya kaku banget. Tapi koleksi MERE ini beneran beda. Siluetnya relaxed boxy, adem seharian, dan nggak gampang lecek."

[00:12 - 00:20] VERSATILITY:
Visual: Split screen cepat (meeting kantor vs nongkrong cafe).
VO: "Dari jam kerja di kantor sampai nongkrong malam hari, tinggal ganti tas atau lepas outer, look kamu langsung effortlessly elevated."

[00:20 - 00:25] CTA (CALL TO ACTION):
Visual: Buka website merefashion.com di HP.
VO: "Koleksi terbatas. Klik link di bawah, pakai kode 'MEREFIRST' buat diskon 10% dan subsidi ongkir sekarang!"
`;

const EDITORIAL_REELS_SCRIPT = `[MERE FASHION - QUIET LUXURY EDITORIAL SCRIPT]
DURASI: 20 DETIK
TONE: REFLEKTIF, ELEGAN, MINIMALIS
MUSIK: AMBIENT PIANO SYNTH HANGAT

[00:00 - 00:04] Macro shot serat kain alami & detail jahitan di bawah sinar matahari.
VO: "Di tengah dunia yang serba bising dan penuh tren musiman..."

[00:04 - 00:09] Model berjalan di ruang arsitektur minimalis mengenakan Atelier Charcoal Blazer.
VO: "...keanggunan sejati tidak pernah berteriak untuk mencari perhatian."

[00:09 - 00:15] Model menyematkan kancing dan menjinjing Architect Leather Day Tote.
VO: "MERE FASHION lahir dari satu prinsip sederhana: siluet esensial, material terbaik, dan kenyamanan tanpa kompromi."

[00:15 - 00:20] Logo serif MERE FASHION muncul di layar.
VO: "Temukan esensi berpakaian Anda di website resmi: merefashion.com."
`;

const CAROUSEL_COPY_FULL = `Sering ngerasa lemari kepenuhan tapi ujung-ujungnya bingung mau pakai apa? 🤦‍♂️

Kuncinya bukan beli lebih banyak pakaian, tapi punya few essential pieces yang gampang dipadupadankan (mix and match) tanpa mikir panjang.

Koleksi Drop 01 dari MERE FASHION dirancang dengan potongan relaxed tailoring kontemporer, material poly-wool & katun organik yang adem untuk iklim tropis, dan jahitan presisi standar atelier.

Koleksi terbatas sudah bisa diakses langsung via website kami!
🛒 Klik link di bio: merefashion.com
🎟️ Gunakan kupon MEREFIRST untuk diskon 10% pesanan pertamamu.

#MereFashion #MinimalistFashion #CapsuleWardrobeIndonesia #OOTDIndo #QuietLuxury #TailoredBlazer #LocalBrandIndo
`;

const WA_TEMPLATE_1 = `Halo Kak *[Nama Customer]*! ✨

Terima kasih telah berbelanja di MERE FASHION. Pembayaran sebesar *Rp[Total]* untuk pesanan *#[Order_ID]* telah KAMI TERIMA melalui *[Metode]*.

Tim Gudang kami sedang memproses pesanan Anda dengan standar QC ketat. Resi pengiriman akan kami kirimkan begitu paket diserahkan ke kurir.

Lacak live status: https://merefashion.com/track/[Order_ID]`;

const WA_TEMPLATE_2 = `Kabar gembira Kak *[Nama Customer]*! 📦

Paket MERE pesanan Anda (#[Order_ID]) telah selesai dikemas dan diserahkan ke kurir *[Ekspedisi]*.

Nomor Resi Resmi: *[NO_RESI]*

Paket sedang dalam perjalanan menuju alamat Anda. Terima kasih telah memilih MERE FASHION! 🖤`;

const WA_TEMPLATE_3 = `Hai Kak *[Nama]*! 👋

Kami melihat Anda meninggalkan *[Nama Produk]* di keranjang belanja MERE FASHION.

Khusus hari ini, stok ukuran Anda tinggal tersisa sedikit. Gunakan kupon rahasia: *MEREFIRST* untuk klaim diskon 10% + subsidi ongkir!

Selesaikan checkout sekarang: https://merefashion.com/cart`;
