import React, { useState } from 'react';
import {
  Server,
  Code2,
  Terminal,
  Play,
  Copy,
  Check,
  Zap,
  Lock,
  MessageSquare,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const LaravelApiDocsView: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<
    'routes' | 'checkout_ctrl' | 'webhook_ctrl' | 'wa_service' | 'stock_service'
  >('checkout_ctrl');
  const [copied, setCopied] = useState(false);

  // Interactive Endpoint Simulator
  const [simulatorEndpoint, setSimulatorEndpoint] = useState<
    'checkout' | 'webhook' | 'tracking' | 'warehouse_status'
  >('checkout');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulatedResponse(null);

    setTimeout(() => {
      setIsSimulating(false);
      if (simulatorEndpoint === 'checkout') {
        setSimulatedResponse(
          JSON.stringify(
            {
              success: true,
              message: 'Order created successfully. Stock reserved.',
              data: {
                order_id: 'MERE-20261102-882',
                gross_amount: 689000,
                payment_gateway: {
                  provider: 'midtrans',
                  snap_token: 'snap-token-mrf-98231019a-99',
                  redirect_url: 'https://app.sandbox.midtrans.com/snap/v2/vtweb/98231019a-99',
                  qris_url: 'https://api.sandbox.midtrans.com/v2/qris/98231019a-99/qr-code',
                  expiry_time: '2026-11-02 08:45:00 WIB',
                },
              },
            },
            null,
            2
          )
        );
      } else if (simulatorEndpoint === 'webhook') {
        setSimulatedResponse(
          JSON.stringify(
            {
              status: 'success',
              message: 'Midtrans Webhook verified & processed',
              order_number: 'MERE-20261102-882',
              payment_status: 'settlement',
              actions_triggered: [
                'Database transaction committed',
                'Stock permanently decremented (stock_movements logged)',
                'WhatsApp confirmation sent to customer via Fonnte API',
                'Shipment ticket created with status READY_FOR_PICKING',
              ],
            },
            null,
            2
          )
        );
      } else if (simulatorEndpoint === 'tracking') {
        setSimulatedResponse(
          JSON.stringify(
            {
              success: true,
              data: {
                order_number: 'MERE-20261102-089',
                status: 'SENT',
                courier: {
                  code: 'sicepat',
                  name: 'SiCepat Ekspres',
                  service: 'BEST',
                  tracking_number: 'SICEPAT-MRF-891023412',
                },
                timeline: [
                  { status: 'PAYMENT_VERIFIED', timestamp: '2026-11-01 14:20:10 WIB' },
                  { status: 'PICKING', timestamp: '2026-11-01 15:00:00 WIB' },
                  { status: 'PACKING', timestamp: '2026-11-01 15:30:00 WIB' },
                  { status: 'SENT', timestamp: '2026-11-01 17:00:00 WIB' },
                ],
              },
            },
            null,
            2
          )
        );
      } else {
        setSimulatedResponse(
          JSON.stringify(
            {
              success: true,
              message: 'Warehouse fulfillment status updated',
              order_id: 'MERE-20261102-001',
              new_status: 'PACKING',
              staff_id: 'usr-wh-04',
              qc_passed: true,
            },
            null,
            2
          )
        );
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-2">
          <Server className="w-4 h-4 text-neutral-800" />
          <span>BACKEND LARAVEL 11 & RESTFUL API ARCHITECTURE</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
          Arsitektur API, Midtrans Gateway & Notifikasi Otomatis
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
          Kode backend modular Laravel 11/12 yang mengutamakan keamanan transaksi ACID, verifikasi signature SHA512 Midtrans, concurrency lock <code>lockForUpdate()</code> untuk mencegah overselling, dan integrasi WhatsApp Gateway.
        </p>
      </div>

      {/* Grid: Simulator & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
        {/* Left Col: Interactive API Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-white border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-neutral-700" />
                <span>Live API Endpoint Tester</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                200 OK Live
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-xs font-medium text-neutral-700">
                Pilih API Endpoint untuk Disimulasikan:
              </label>

              <div className="space-y-1.5">
                {[
                  { id: 'checkout', method: 'POST', path: '/api/v1/checkout', label: '1. Checkout & Stock Lock' },
                  { id: 'webhook', method: 'POST', path: '/api/v1/payment/midtrans-webhook', label: '2. Midtrans Webhook (Settlement)' },
                  { id: 'tracking', method: 'GET', path: '/api/v1/orders/{order_id}/track', label: '3. Customer Tracking Status' },
                  { id: 'warehouse_status', method: 'POST', path: '/api/v1/warehouse/orders/{id}/status', label: '4. Update Gudang (Picking/Packing)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSimulatorEndpoint(item.id as any);
                      setSimulatedResponse(null);
                    }}
                    className={`w-full p-2.5 text-left border text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      simulatorEndpoint === item.id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-[#FAF8F5] text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <div>
                      <span className="font-bold mr-2 text-emerald-400">{item.method}</span>
                      <span>{item.path}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full mt-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSimulating ? 'Memproses Request...' : 'Kirim Request & Lihat Response'}</span>
              </button>
            </div>

            {/* Response Box */}
            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase text-neutral-500 block mb-1">
                JSON Response Output:
              </span>
              <pre className="p-3 bg-[#18181B] text-emerald-400 font-mono text-[11px] leading-tight overflow-x-auto min-h-[140px] max-h-[220px] overflow-y-auto border border-neutral-800">
                {simulatedResponse || '// Klik "Kirim Request & Lihat Response" untuk menjalankan test.'}
              </pre>
            </div>
          </div>

            {/* Quick architectural notes */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs space-y-2">
              <span className="font-bold text-neutral-800 block text-[11px] uppercase tracking-wider">
                Keamanan & Pola Desain Laravel:
              </span>
              <div className="flex items-start gap-2 text-neutral-600">
                <Lock className="w-3.5 h-3.5 text-neutral-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Idempotency Key:</strong> Mencegah tagihan ganda atau double-order saat pelanggan menekan tombol checkout berulang kali.
                </span>
              </div>
              <div className="flex items-start gap-2 text-neutral-600">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-800 shrink-0 mt-0.5" />
                <span>
                  <strong>SHA512 Signature Hash:</strong> Menolak webhook palsu yang tidak berasal langsung dari IP server Midtrans.
                </span>
              </div>
            </div>
        </div>

        {/* Right Col: Production Code Viewer */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'checkout_ctrl', label: 'CheckoutController.php' },
                { id: 'webhook_ctrl', label: 'MidtransWebhookController.php' },
                { id: 'wa_service', label: 'WhatsAppService.php' },
                { id: 'stock_service', label: 'WarehouseStockService.php' },
                { id: 'routes', label: 'routes/api.php' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCodeTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-none border transition-colors cursor-pointer ${
                    activeCodeTab === tab.id
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleCopy(LARAVEL_SNIPPETS[activeCodeTab])}
              className="px-3 py-1 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Kode'}</span>
            </button>
          </div>

          {/* Code display block */}
          <pre className="p-5 bg-[#18181B] text-[#F4F4F5] font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800 max-h-[580px] overflow-y-auto">
            {LARAVEL_SNIPPETS[activeCodeTab]}
          </pre>
        </div>
      </div>
    </div>
  );
};

const LARAVEL_SNIPPETS = {
  routes: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\CheckoutController;
use App\\Http\\Controllers\\Api\\MidtransWebhookController;
use App\\Http\\Controllers\\Api\\OrderTrackingController;
use App\\Http\\Controllers\\Api\\WarehouseController;

/*
|--------------------------------------------------------------------------
| MERE FASHION REST API V1 ROUTES
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // 1. Checkout & Pembayaran
    Route::post('/checkout', [CheckoutController::class, 'store']);
    Route::get('/checkout/{orderNumber}', [CheckoutController::class, 'show']);

    // 2. Midtrans Webhook Receiver (Exclude from CSRF)
    Route::post('/payment/midtrans-webhook', [MidtransWebhookController::class, 'handle']);

    // 3. Pelacakan Pesanan Pelanggan
    Route::get('/orders/{orderNumber}/track', [OrderTrackingController::class, 'track']);

    // 4. Tim Gudang (Warehouse Management System) - Protected by auth:sanctum
    Route::middleware(['auth:sanctum', 'role:admin,warehouse_staff'])->prefix('warehouse')->group(function () {
        Route::get('/orders', [WarehouseController::class, 'index']);
        Route::post('/orders/{id}/picking', [WarehouseController::class, 'startPicking']);
        Route::post('/orders/{id}/packing', [WarehouseController::class, 'completePacking']);
        Route::post('/orders/{id}/dispatch-courier', [WarehouseController::class, 'dispatchToCourier']);
        Route::get('/orders/{id}/thermal-label', [WarehouseController::class, 'generateThermalLabel']);
    });
});
`,

  checkout_ctrl: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Order;
use App\\Models\\OrderItem;
use App\\Models\\ProductVariant;
use App\\Services\\WarehouseStockService;
use App\\Services\\MidtransPaymentService;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Str;

class CheckoutController extends Controller
{
    protected WarehouseStockService $stockService;
    protected MidtransPaymentService $midtransService;

    public function __construct(
        WarehouseStockService $stockService,
        MidtransPaymentService $midtransService
    ) {
        $this->stockService = $stockService;
        $this->midtransService = $midtransService;
    }

    /**
     * Memproses pesanan checkout baru dengan atomic lock.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name'  => 'required|string|max:150',
            'customer_phone' => 'required|string|max:30',
            'customer_email' => 'required|email|max:191',
            'province'       => 'required|string',
            'city'           => 'required|string',
            'address'        => 'required|string',
            'postal_code'    => 'required|string',
            'courier_code'   => 'required|in:sicepat,jne,jnt',
            'payment_method' => 'required|in:qris,gopay,dana,ovo,bca_va',
            'items'          => 'required|array|min:1',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $orderNumber = 'MERE-' . date('Ymd') . '-' . strtoupper(Str::random(5));
            $subtotal = 0;
            $orderItemsData = [];

            // 1. Kunci stok baris per baris dengan lockForUpdate()
            foreach ($validated['items'] as $item) {
                $variant = ProductVariant::where('id', $item['variant_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($variant->stock < $item['quantity']) {
                    return response()->json([
                        'success' => false,
                        'message' => "Stok SKU {$variant->sku} ({$variant->product->name}) tidak mencukupi."
                    ], 422);
                }

                // Kurangi stok reservasi secara aman
                $this->stockService->reserveStock($variant, $item['quantity'], $orderNumber);

                $itemSubtotal = $variant->product->base_price * $item['quantity'];
                $subtotal += $itemSubtotal;

                $orderItemsData[] = [
                    'variant_id'    => $variant->id,
                    'product_name'  => $variant->product->name,
                    'variant_sku'   => $variant->sku,
                    'variant_size'  => $variant->size,
                    'variant_color' => $variant->color,
                    'unit_price'    => $variant->product->base_price,
                    'quantity'      => $item['quantity'],
                    'subtotal'      => $itemSubtotal,
                ];
            }

            // 2. Hitung ongkir & diskon
            $shippingFee = ($validated['courier_code'] === 'sicepat') ? 18000 : 15000;
            $discount = 0;
            $totalAmount = $subtotal - $discount + $shippingFee;

            // 3. Simpan Pesanan ke Database
            $order = Order::create([
                'id'               => Str::uuid(),
                'order_number'     => $orderNumber,
                'customer_name'    => $validated['customer_name'],
                'customer_phone'   => $validated['customer_phone'],
                'customer_email'   => $validated['customer_email'],
                'shipping_address' => [
                    'province'    => $validated['province'],
                    'city'        => $validated['city'],
                    'address'     => $validated['address'],
                    'postal_code' => $validated['postal_code'],
                ],
                'subtotal'         => $subtotal,
                'discount'         => $discount,
                'shipping_fee'     => $shippingFee,
                'total_amount'     => $totalAmount,
                'payment_method'   => $validated['payment_method'],
                'status'           => 'PENDING_PAYMENT',
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            // 4. Request Token Snap / QRIS ke Midtrans
            $midtransPayload = $this->midtransService->createTransaction($order);

            return response()->json([
                'success' => true,
                'message' => 'Pesanan berhasil dibuat. Menunggu pembayaran.',
                'data' => [
                    'order_number'  => $order->order_number,
                    'total_amount'  => $order->total_amount,
                    'payment'       => $midtransPayload,
                ]
            ], 201);
        });
    }
}
`,

  webhook_ctrl: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Order;
use App\\Models\\Payment;
use App\\Models\\Shipment;
use App\\Services\\WhatsAppService;
use App\\Mail\\OrderConfirmedMail;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Mail;

class MidtransWebhookController extends Controller
{
    protected WhatsAppService $waService;

    public function __construct(WhatsAppService $waService)
    {
        $this->waService = $waService;
    }

    /**
     * Menangani callback notifikasi HTTP POST dari Midtrans.
     */
    public function handle(Request $request)
    {
        $serverKey = config('services.midtrans.server_key');
        
        $orderId          = $request->input('order_id');
        $statusCode       = $request->input('status_code');
        $grossAmount      = $request->input('gross_amount');
        $signatureKey     = $request->input('signature_key');
        $transactionStatus= $request->input('transaction_status');
        $paymentType      = $request->input('payment_type');
        $transactionId    = $request->input('transaction_id');

        // 1. Verifikasi Signature Hash SHA-512
        $expectedSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);
        if ($expectedSignature !== $signatureKey) {
            return response()->json(['error' => 'Invalid signature hash'], 403);
        }

        return DB::transaction(function () use ($request, $orderId, $transactionStatus, $paymentType, $transactionId, $grossAmount, $signatureKey) {
            $order = Order::where('order_number', $orderId)->lockForUpdate()->firstOrFail();

            // 2. Cek apakah status pembayaran sukses (settlement atau capture)
            if (in_array($transactionStatus, ['capture', 'settlement'])) {
                // Update Order Status
                $order->update(['status' => 'PAYMENT_VERIFIED']);

                // Catat Log Payment
                Payment::updateOrCreate(
                    ['order_id' => $order->id],
                    [
                        'transaction_id'     => $transactionId,
                        'payment_type'       => $paymentType,
                        'gross_amount'       => $grossAmount,
                        'transaction_status' => $transactionStatus,
                        'signature_key'      => $signatureKey,
                        'payload_json'       => $request->all(),
                        'settled_at'         => now(),
                    ]
                );

                // Buat Tiket Pengiriman Gudang
                Shipment::create([
                    'order_id'        => $order->id,
                    'courier_code'    => 'sicepat',
                    'courier_service' => 'BEST',
                    'status'          => 'READY_FOR_PICKING',
                ]);

                // 3. Notifikasi Pesan Otomatis (WhatsApp & Email)
                $this->waService->sendOrderConfirmation($order);
                Mail::to($order->customer_email)->queue(new OrderConfirmedMail($order));
            } elseif (in_array($transactionStatus, ['expire', 'cancel', 'deny'])) {
                // Batalkan order & kembalikan stok
                $order->update(['status' => 'CANCELLED']);
                app(\\App\\Services\\WarehouseStockService::class)->rollbackStock($order);
            }

            return response()->json(['status' => 'ok']);
        });
    }
}
`,

  wa_service: `<?php

namespace App\\Services;

use App\\Models\\Order;
use Illuminate\\Support\\Facades\\Http;
use Illuminate\\Support\\Facades\\Log;

class WhatsAppService
{
    protected string $apiKey;
    protected string $apiUrl;

    public function __construct()
    {
        $this->apiKey = config('services.fonnte.api_key', env('FONNTE_API_KEY'));
        $this->apiUrl = 'https://api.fonnte.com/send';
    }

    /**
     * Kirim konfirmasi pembayaran & rincian pesanan.
     */
    public function sendOrderConfirmation(Order $order): bool
    {
        $itemsText = "";
        foreach ($order->items as $item) {
            $itemsText .= "• {$item->quantity}x {$item->product_name} ({$item->variant_size}/{$item->variant_color})\\n";
        }

        $formattedTotal = number_format($order->total_amount, 0, ',', '.');

        $message = "Halo Kak *{$order->customer_name}*, terima kasih! ✨\\n\\n"
                 . "Pembayaran untuk pesanan *#{$order->order_number}* sebesar *Rp{$formattedTotal}* telah KAMI TERIMA.\\n\\n"
                 . "*Rincian Pesanan:*\\n"
                 . $itemsText . "\\n"
                 . "Tim Gudang MERE FASHION saat ini sedang memproses (Picking & Packing) pakaian Anda dengan standar QC ketat.\\n\\n"
                 . "Nomor Resi pengiriman akan kami kirimkan begitu paket diserahkan ke kurir.\\n\\n"
                 . "Lacak status pesanan: https://merefashion.com/track/{$order->order_number}";

        return $this->sendMessage($order->customer_phone, $message);
    }

    /**
     * Kirim update nomor resi pengiriman ke pembeli.
     */
    public function sendShipmentTracking(Order $order, string $trackingNumber): bool
    {
        $message = "Kabar gembira Kak *{$order->customer_name}*! 📦\\n\\n"
                 . "Pesanan *#{$order->order_number}* telah selesai dikemas dan diserahkan ke kurir *SiCepat Ekspres*.\\n\\n"
                 . "Nomor Resi: *{$trackingNumber}*\\n\\n"
                 . "Paket sedang dalam perjalanan menuju alamat Anda. Terima kasih telah memilih MERE FASHION! 🖤";

        return $this->sendMessage($order->customer_phone, $message);
    }

    protected function sendMessage(string $targetPhone, string $message): bool
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => $this->apiKey,
            ])->post($this->apiUrl, [
                'target'  => $targetPhone,
                'message' => $message,
                'countryCode' => '62',
            ]);

            return $response->successful();
        } catch (\\Exception $e) {
            Log::error("WhatsApp Notification Failed: " . $e->getMessage());
            return false;
        }
    }
}
`,

  stock_service: `<?php

namespace App\\Services;

use App\\Models\\Order;
use App\\Models\\ProductVariant;
use App\\Models\\StockMovement;
use Illuminate\\Support\\Facades\\DB;

class WarehouseStockService
{
    /**
     * Mengunci dan mengurangi stok saat pesanan dibuat.
     */
    public function reserveStock(ProductVariant $variant, int $quantity, string $orderNumber): void
    {
        $balanceBefore = $variant->stock;
        $variant->decrement('stock', $quantity);
        $balanceAfter = $variant->fresh()->stock;

        StockMovement::create([
            'variant_id'      => $variant->id,
            'movement_type'   => 'order_deduct',
            'quantity'        => -$quantity,
            'balance_before'  => $balanceBefore,
            'balance_after'   => $balanceAfter,
            'reference_id'    => $orderNumber,
        ]);
    }

    /**
     * Mengembalikan stok jika transaksi timeout atau dibatalkan.
     */
    public function rollbackStock(Order $order): void
    {
        foreach ($order->items as $item) {
            $variant = ProductVariant::find($item->variant_id);
            if ($variant) {
                $balanceBefore = $variant->stock;
                $variant->increment('stock', $item->quantity);
                $balanceAfter = $variant->fresh()->stock;

                StockMovement::create([
                    'variant_id'      => $variant->id,
                    'movement_type'   => 'adjustment',
                    'quantity'        => $item->quantity,
                    'balance_before'  => $balanceBefore,
                    'balance_after'   => $balanceAfter,
                    'reference_id'    => "CANCEL-{$order->order_number}",
                ]);
            }
        }
    }
}
`,
};
