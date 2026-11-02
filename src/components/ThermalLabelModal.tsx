import React from 'react';
import { X, Printer, PackageCheck } from 'lucide-react';
import { Order, formatIDR } from '../utils/commerce';

interface ThermalLabelModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ThermalLabelModal: React.FC<ThermalLabelModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const trackingNo = order.trackingNumber || `MRF-DRAFT-${order.id.slice(-6)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cetak Label Pengiriman Thermal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white shadow-2xl border border-neutral-300 w-full max-w-lg p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-neutral-800" />
            <h3 className="font-editorial text-lg font-bold text-neutral-900">
              Preview Resi Thermal A6 (100x150mm)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Printable Label Area */}
        <div
          id="thermal-print-area"
          className="border-2 border-black p-4 font-mono text-[11px] bg-white text-black space-y-3"
        >
          {/* Header Bar: Courier & Drop Type */}
          <div className="flex justify-between items-center border-b-2 border-black pb-2">
            <div className="font-sans font-black text-xl tracking-tight uppercase">
              {order.courier.name}
            </div>
            <div className="text-right">
              <span className="inline-block bg-black text-white font-bold px-2 py-0.5 text-xs uppercase">
                {order.courier.service.split(' ')[0]}
              </span>
              <div className="text-[10px] font-sans">NON-COD / LUNAS</div>
            </div>
          </div>

          {/* Barcode Simulation */}
          <div className="text-center py-2 border-b-2 border-black">
            <div className="font-sans font-bold text-base tracking-widest mb-1">
              {trackingNo}
            </div>
            {/* Visual Barcode Bars */}
            <div className="h-12 w-full flex items-center justify-center gap-[2px] bg-white px-2">
              {[4, 2, 6, 1, 3, 5, 2, 4, 1, 3, 5, 2, 6, 1, 4, 2, 5, 3, 2, 6, 1, 4, 3, 5, 2, 4, 1, 6, 2, 3, 5, 1, 4, 2].map(
                (w, idx) => (
                  <div
                    key={idx}
                    className="h-full bg-black"
                    style={{ width: `${w}px` }}
                  />
                )
              )}
            </div>
            <div className="text-[9px] mt-1 text-neutral-600">
              ORDER REF: {order.id} · TGL: {order.createdAt.slice(0, 10)}
            </div>
          </div>

          {/* Destination & Origin Address Grid */}
          <div className="grid grid-cols-2 gap-3 border-b-2 border-black pb-3">
            <div>
              <div className="font-bold text-[9px] text-neutral-600 uppercase">PENERIMA:</div>
              <div className="font-bold text-xs font-sans">{order.customerName}</div>
              <div>{order.customerPhone}</div>
              <div className="text-[10px] mt-1 leading-tight">
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.province} {order.shippingAddress.postalCode}
              </div>
            </div>
            <div className="border-l border-neutral-300 pl-3">
              <div className="font-bold text-[9px] text-neutral-600 uppercase">PENGIRIM:</div>
              <div className="font-bold text-xs font-sans">MERE FASHION OFFICIAL</div>
              <div>+62 811-9920-881</div>
              <div className="text-[10px] mt-1 leading-tight">
                Warehouse DC Cilandak, Jakarta Selatan 12430
              </div>
            </div>
          </div>

          {/* Itemized packing contents */}
          <div className="border-b border-black pb-2">
            <div className="font-bold text-[9px] uppercase mb-1">ISI PAKET ({order.items.length} SKU):</div>
            <ul className="space-y-1 text-[10px]">
              {order.items.map((i, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {i.quantity}x {i.product.name} ({i.variant.size}/{i.variant.color})
                  </span>
                  <span className="font-bold font-mono">[{i.variant.sku}]</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Dispatch Signoff */}
          <div className="flex justify-between items-end pt-1 text-[9px]">
            <div>
              <span>Berat: <strong>0.85 Kg</strong></span> · <span>Asuransi: <strong>YA</strong></span>
              <div className="text-neutral-500">QC Passed: Checker #04</div>
            </div>
            <div className="text-right">
              <span className="border border-black px-1.5 py-0.5 text-[8px] font-bold uppercase">
                FRAGILE / JANGAN DIBANTING
              </span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-medium cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Thermal Label</span>
          </button>
        </div>
      </div>
    </div>
  );
};
