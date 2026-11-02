import React, { useState } from 'react';
import { X, Check, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import { Product, ProductVariant, formatIDR, getAssetUrl } from '../utils/commerce';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  React.useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      setShowSizeGuide(false);
    }
  }, [product?.id]);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup Detail Produk"
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-neutral-100 text-neutral-800 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="w-full md:w-1/2 bg-neutral-100 relative min-h-[280px] md:min-h-full">
          <img
            src={getAssetUrl(product.image)}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            {product.tags.map((t) => (
              <span
                key={t}
                className="bg-neutral-900 text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Purchase Module */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-1">
              MERE FASHION · {product.category}
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900">
              {product.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-xl font-bold text-neutral-900 font-code tabular-nums">
                {formatIDR(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-neutral-400 line-through font-code tabular-nums">
                  {formatIDR(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Material breakdown */}
            <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 text-xs">
              <span className="font-semibold text-neutral-800 block mb-0.5">Komposisi Kain:</span>
              <span className="text-neutral-600">{product.material}</span>
            </div>

            {/* Size & Variant Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-800 mb-2">
                <span className="font-semibold tracking-wider text-neutral-900">
                  PILIH UKURAN ({product.variants.length} TERSEDIA):
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-neutral-500 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{showSizeGuide ? 'Tutup Panduan' : 'Panduan Ukuran'}</span>
                </button>
              </div>

              {/* Collapsible Size Guide */}
              {showSizeGuide && (
                <div className="mb-3 p-3 bg-neutral-100 border border-neutral-300 text-xs animate-in fade-in duration-150">
                  <div className="font-semibold text-neutral-900 mb-1.5 flex items-center justify-between">
                    <span>Panduan Standar Ukuran MERE (cm)</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Toleransi ±1-2 cm</span>
                  </div>
                  {product.category === 'Celana' ? (
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                      <div className="bg-white p-1 border border-neutral-200"><strong>S:</strong> Pinggang 76-80</div>
                      <div className="bg-white p-1 border border-neutral-200"><strong>M:</strong> Pinggang 81-85</div>
                      <div className="bg-white p-1 border border-neutral-200"><strong>L:</strong> Pinggang 86-90</div>
                      <div className="bg-white p-1 border border-neutral-200"><strong>XL:</strong> Pinggang 91-95</div>
                    </div>
                  ) : product.category === 'Aksesoris' ? (
                    <p className="text-[11px] text-neutral-600">
                      Dimensi ALL_SIZE: Panjang 50cm × Lebar 24cm × Tinggi 28cm (Kapasitas ~32 Liter).
                    </p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                      <div className="bg-white p-1 border border-neutral-200"><strong>S:</strong> Dada 52, Pjg 68</div>
                      <div className="bg-white p-1 border border-neutral-200"><strong>M:</strong> Dada 55, Pjg 71</div>
                      <div className="bg-white p-1 border border-neutral-200"><strong>L:</strong> Dada 58, Pjg 73</div>
                      <div className="bg-white p-1 border border-neutral-200"><strong>XL:</strong> Dada 62, Pjg 76</div>
                    </div>
                  )}
                </div>
              )}

              <div className={`grid gap-2.5 ${product.variants.length === 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-4'}`}>
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  const isOutOfStock = v.stock <= 0;

                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setSelectedVariant(v)}
                      className={`py-2.5 px-3 text-xs font-semibold border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900'
                          : isOutOfStock
                          ? 'border-neutral-200 bg-neutral-100 text-neutral-400 line-through cursor-not-allowed'
                          : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="text-sm font-bold block">{v.size}</span>
                      <span className={`block text-[10px] font-normal mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {v.stock} stok
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected variant details */}
              <div className="mt-3 text-xs text-neutral-600 flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                  style={{ backgroundColor: selectedVariant.colorHex }}
                />
                <span>
                  Warna: <strong className="text-neutral-800">{selectedVariant.color}</strong> · SKU:{' '}
                  <span className="font-mono">{selectedVariant.sku}</span>
                </span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-6 flex items-center gap-4">
              <div className="text-xs font-medium text-neutral-800">JUMLAH:</div>
              <div className="flex items-center border border-neutral-300">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm hover:bg-neutral-100 cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold font-mono tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(selectedVariant.stock, q + 1))
                  }
                  className="px-3 py-1.5 text-sm hover:bg-neutral-100 cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-neutral-500">
                (Maks. {selectedVariant.stock} per pesanan)
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 pt-4 border-t border-neutral-200">
            <button
              onClick={handleAdd}
              disabled={selectedVariant.stock <= 0}
              className={`w-full py-3.5 px-6 text-sm font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                addedNotice
                  ? 'bg-emerald-700 text-white'
                  : selectedVariant.stock <= 0
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-black text-white shadow-md'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dimasukkan ke Keranjang!</span>
                </>
              ) : (
                <>
                  <span>Tambah ke Keranjang · {formatIDR(product.price * quantity)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                Original Guaranteed
              </span>
              <span>·</span>
              <span>Pengiriman Seluruh Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
