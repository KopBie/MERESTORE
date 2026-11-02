import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { Product, formatIDR } from '../utils/commerce';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const CATEGORIES = [
  'Semua',
  'Pakaian',
  'Celana',
  'Jaket',
  'Tas',
  'Sepatu',
  'Aksesoris',
] as const;

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'Semua' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
            Katalog Produk Resmi
          </span>
          <h2 className="font-editorial text-3xl font-bold text-[#1A1A1A] mt-1">
            Koleksi Esensial MERE
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Menampilkan <span className="font-semibold text-neutral-800">{filteredProducts.length}</span> produk terkurasi
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk atau bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 text-xs bg-white border border-neutral-200 rounded-none focus:outline-none focus:border-neutral-900 transition-colors text-neutral-700"
            >
              <option value="featured">Paling Populer</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Segmented Tabs (Functional Buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-150 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-neutral-300 p-8">
          <p className="font-editorial text-xl text-neutral-700 mb-2">Tidak ada produk ditemukan</p>
          <p className="text-xs text-neutral-500 mb-4">Coba ganti kata kunci pencarian atau pilih kategori lain.</p>
          <button
            onClick={() => {
              setSelectedCategory('Semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col bg-white border border-neutral-200 hover:border-neutral-900 transition-all duration-200 cursor-pointer overflow-hidden"
              >
                {/* Product Image Slot */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />

                  {/* Top Subtle Tags (Unboxed text / discrete status) */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/95 backdrop-blur-xs text-[11px] font-semibold uppercase tracking-wider text-neutral-800 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stock Alert if low */}
                  {totalStock <= 15 && (
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-amber-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                        Sisa {totalStock} unit
                      </span>
                    </div>
                  )}

                  {/* Quick View Button on hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="w-full py-2.5 bg-neutral-900/95 hover:bg-neutral-900 text-white text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Pilih Ukuran & Beli</span>
                    </button>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Category & Materials */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-1">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate max-w-[160px]">{product.material.split(',')[0]}</span>
                    </div>

                    <h3 className="font-editorial text-lg font-bold text-neutral-900 group-hover:text-black line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Variant Pill Preview */}
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-neutral-900 font-code tabular-nums">
                          {formatIDR(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-neutral-400 line-through font-code tabular-nums">
                            {formatIDR(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Variant indicator */}
                    <div className="flex items-center gap-1">
                      {product.variants.map((v) => (
                        <span
                          key={v.id}
                          className="text-[10px] border border-neutral-200 px-1 py-0.5 text-neutral-600 font-mono"
                        >
                          {v.size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
