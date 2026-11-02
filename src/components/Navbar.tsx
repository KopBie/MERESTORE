import React from 'react';
import { ShoppingBag, PackageCheck, Menu, X } from 'lucide-react';

export type StoreNavSection = 'katalog' | 'tentang-kami' | 'cara-order' | 'kontak';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onNavigateSection: (section: StoreNavSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracking,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (section: StoreNavSection) => {
    onNavigateSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E0] transition-all">
      {/* Main Nav Bar: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('katalog')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] uppercase">
            MERE FASHION
          </span>
        </button>

        {/* Zone 2: Pure E-Commerce Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
          <button
            onClick={() => handleNavClick('katalog')}
            className="whitespace-nowrap transition-colors hover:text-black py-1 cursor-pointer"
          >
            Katalog
          </button>
          <button
            onClick={() => handleNavClick('tentang-kami')}
            className="whitespace-nowrap transition-colors hover:text-black py-1 cursor-pointer"
          >
            Tentang Kami
          </button>
          <button
            onClick={() => handleNavClick('cara-order')}
            className="whitespace-nowrap transition-colors hover:text-black py-1 cursor-pointer"
          >
            Cara Order
          </button>
          <button
            onClick={() => handleNavClick('kontak')}
            className="whitespace-nowrap transition-colors hover:text-black py-1 cursor-pointer"
          >
            Kontak
          </button>
        </nav>

        {/* Zone 3: Actions (Lacak Pesanan + Shopping Bag) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTracking}
            title="Lacak Status Pengiriman Pesanan"
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-3 py-2 rounded-none transition-colors whitespace-nowrap cursor-pointer"
          >
            <PackageCheck className="w-4 h-4 text-neutral-900" />
            <span className="hidden sm:inline">Lacak Pesanan</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Buka Keranjang Belanja"
            className="relative p-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-none transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu Navigasi Mobile"
            className="md:hidden p-1.5 text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('katalog')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-800 border-b border-neutral-100"
          >
            Katalog Produk
          </button>
          <button
            onClick={() => handleNavClick('tentang-kami')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-800 border-b border-neutral-100"
          >
            Tentang Kami (About Us)
          </button>
          <button
            onClick={() => handleNavClick('cara-order')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-800 border-b border-neutral-100"
          >
            Cara Order & Pengiriman
          </button>
          <button
            onClick={() => handleNavClick('kontak')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-800"
          >
            Kontak & Customer Care
          </button>
        </div>
      )}
    </header>
  );
};
