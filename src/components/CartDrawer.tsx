import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Tag, ShoppingBag } from 'lucide-react';
import { CartItem, formatIDR, calculateOrderSummary } from '../utils/commerce';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveItem: (variantId: string) => void;
  onProceedToCheckout: () => void;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  voucherCode,
  setVoucherCode,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState(voucherCode);
  const summary = calculateOrderSummary(items, 18000, voucherCode);

  const applyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherCode(inputCode);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keranjang Belanja"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-800" />
            <h2 className="font-editorial text-xl font-bold text-neutral-900">
              Keranjang Belanja ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Keranjang"
            className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-24 text-neutral-500">
              <ShoppingBag className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
              <p className="font-editorial text-lg text-neutral-700">Keranjang masih kosong</p>
              <p className="text-xs text-neutral-400 mt-1">
                Silakan pilih pakaian atau aksesoris favorit Anda di katalog.
              </p>
            </div>
          ) : (
            items.map(({ product, variant, quantity }) => (
              <div
                key={variant.id}
                className="flex gap-4 p-3 bg-[#FAF8F5] border border-neutral-200"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-neutral-200 shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-editorial text-sm font-bold text-neutral-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(variant.id)}
                        aria-label={`Hapus ${product.name} ukuran ${variant.size}`}
                        className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Ukuran: <span className="font-semibold text-neutral-700">{variant.size}</span> · {variant.color}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono">SKU: {variant.sku}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-300 bg-white">
                      <button
                        onClick={() => onUpdateQuantity(variant.id, quantity - 1)}
                        className="px-2 py-0.5 text-xs hover:bg-neutral-100 cursor-pointer"
                        aria-label="Kurangi jumlah"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 text-xs font-bold font-mono tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(variant.id, quantity + 1)}
                        disabled={quantity >= variant.stock}
                        className="px-2 py-0.5 text-xs hover:bg-neutral-100 cursor-pointer disabled:opacity-30"
                        aria-label="Tambah jumlah"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-neutral-900 font-code tabular-nums">
                      {formatIDR(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-[#FAFAF8] space-y-4">
            {/* Voucher form */}
            <form onSubmit={applyVoucher} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Kode Kupon: MEREFIRST / FREESHIP"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-white border border-neutral-300 rounded-none focus:outline-none focus:border-neutral-900"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-800 hover:bg-black text-white text-xs font-medium cursor-pointer"
              >
                Gunakan
              </button>
            </form>

            {summary.voucherMessage && (
              <p
                className={`text-[11px] ${
                  summary.discount > 0 ? 'text-emerald-700 font-medium' : 'text-neutral-500'
                }`}
              >
                {summary.voucherMessage}
              </p>
            )}

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Subtotal Barang:</span>
                <span className="font-mono tabular-nums">{formatIDR(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Potongan Promo:</span>
                  <span className="font-mono tabular-nums">-{formatIDR(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-500">
                <span>Estimasi Ongkir (Jawa/Jakarta):</span>
                <span className="font-mono tabular-nums">{formatIDR(summary.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Pembayaran:</span>
                <span className="font-code tabular-nums">{formatIDR(summary.total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Lanjut ke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
