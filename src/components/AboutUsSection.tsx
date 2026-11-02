import React from 'react';
import { Sparkles, Scissors, Leaf, ShieldCheck } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="tentang-kami-section" className="border-t border-[#E5E5E0] bg-[#FAF8F5] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500">
              TENTANG KAMI · THE MERE ATELIER
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight text-balance">
              Esensi Berpakaian Modern Tanpa Kompromi Kenyamanan.
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              <strong>MERE FASHION</strong> lahir di Jakarta dari sebuah refleksi sederhana: pakaian pria dan wanita modern seharusnya mampu mengekspresikan ketegasan siluet tanpa mengorbankan kenyamanan gerak di iklim tropis perkotaan.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              Kami menolak siklus tren kilat atau fast fashion. Setiap helai blazer, celana pleats, jaket utilitas, tas kulit vegan, dan sepatu kets kami dikembangkan dengan pola potong tailoring atelier, serat katun combed berkepadatan tinggi, serta wol draping yang tidak mudah kusut.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-neutral-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                  <Scissors className="w-4 h-4 text-neutral-800" />
                  <span>Tailored Fit</span>
                </div>
                <p className="text-xs text-neutral-500">Konstruksi bahu presisi dengan drape jatuh alami.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                  <Leaf className="w-4 h-4 text-neutral-800" />
                  <span>Kain Bernapas</span>
                </div>
                <p className="text-xs text-neutral-500">Serat alami combed cotton & poly-wool sejuk.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-neutral-800" />
                  <span>Garansi 7 Hari</span>
                </div>
                <p className="text-xs text-neutral-500">Jaminan tukar ukuran jika ukuran kurang pas.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-neutral-200 overflow-hidden shadow-lg border border-neutral-300">
              <img
                src="/src/assets/images/product_mere_blazer_1793622513253.jpg"
                alt="MERE Fashion Atelier Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Float badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 shadow-xl border border-neutral-200 max-w-xs hidden sm:block">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
                DEDIKASI KUALITAS
              </span>
              <p className="font-editorial text-sm font-bold text-neutral-900 mt-1">
                "Pakaian yang Anda kenakan adalah bahasa pertama yang Anda sampaikan kepada dunia."
              </p>
              <span className="text-[11px] text-neutral-500 mt-2 block font-mono">
                — Tim Desain MERE Jakarta
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
