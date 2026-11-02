import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenFlowchart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenFlowchart }) => {
  return (
    <section className="relative border-b border-[#E5E5E0] bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-3">
              MERE FASHION · EDITORIAL COLLECTION 2026
            </div>
            
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.08] mb-6 text-balance">
              Modern Silhouettes & Timeless Tailoring.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-8 max-w-lg">
              Eksplorasi gaya berpakaian kontemporer dengan potongan rileks, material serat alami berkualitas tinggi, serta ketelitian konstruksi busana khas MERE.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Jelajahi Katalog</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenFlowchart}
                className="px-5 py-3.5 border border-neutral-300 hover:border-neutral-900 bg-white/70 hover:bg-white text-neutral-800 text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                Panduan Cara Order
              </button>
            </div>

            {/* Quick Proof Metrics adjacent to hero */}
            <div className="mt-10 pt-8 border-t border-neutral-200 grid grid-cols-3 gap-4">
              <div>
                <p className="font-editorial text-2xl font-bold text-[#1A1A1A] tabular-nums">100%</p>
                <p className="text-xs text-neutral-500 mt-0.5">Katun & Wool Pilihan</p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-bold text-[#1A1A1A] tabular-nums">&lt;45m</p>
                <p className="text-xs text-neutral-500 mt-0.5">Picking & Kemas Gudang</p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-bold text-[#1A1A1A] tabular-nums">4.9/5</p>
                <p className="text-xs text-neutral-500 mt-0.5">Kepuasan Pelanggan</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Lookbook Visual */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] rounded-none overflow-hidden bg-neutral-200">
            <img
              src="/src/assets/images/hero_mere_fashion_1793622512464.jpg"
              alt="MERE FASHION Campaign Lookbook 2026"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle caption bottom overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-300 block">Look 01 & 02</span>
                <span className="font-editorial text-lg text-white">Atelier Charcoal Blazer & Relaxed Linen Trousers</span>
              </div>
              <span className="text-xs text-neutral-300 hidden sm:inline">Jakarta Studio Production</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Trust Marker Strip */}
      <div className="border-t border-[#E5E5E0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-neutral-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>Pengiriman Cepat (SiCepat / JNE / J&T)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>Pembayaran Aman Midtrans & Otomatis</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>Garansi Tukar Ukuran 7 Hari</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>QC 3 Tahap Sebelum Serah Kurir</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
