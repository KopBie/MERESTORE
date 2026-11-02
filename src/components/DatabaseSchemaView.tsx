import React, { useState } from 'react';
import { Database, Copy, Check, Key, Share2, Layers, Table, FileCode } from 'lucide-react';

export const DatabaseSchemaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'erd' | 'sql' | 'dictionary'>('erd');
  const [copied, setCopied] = useState(false);
  const [sqlDialect, setSqlDialect] = useState<'postgres' | 'mysql'>('postgres');

  const handleCopySQL = () => {
    navigator.clipboard?.writeText(POSTGRES_SQL_DDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-2">
          <Database className="w-4 h-4 text-neutral-800" />
          <span>ARSITEKTUR BASIS DATA RELASIONAL & ERD SCHEMA</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
          Skema Database SQL & Entity-Relationship Diagram (ERD)
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
          Dirancang untuk performa tinggi, integritas data referensial (ACID), dan dukungan penuh multi-varian produk fashion (Pakaian, Celana, Jaket, Tas, Sepatu, Aksesoris), multi-role users (Pelanggan, Admin, Staf Gudang), serta pelacakan status pengiriman (Picking, Packing, Resi).
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 mt-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('erd')}
            className={`pb-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
              activeTab === 'erd'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Visual ERD Diagram
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
              activeTab === 'sql'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Script SQL DDL (Production Ready)
          </button>
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`pb-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors cursor-pointer ${
              activeTab === 'dictionary'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Kamus Data (Data Dictionary)
          </button>
        </div>

        {activeTab === 'sql' && (
          <div className="flex items-center gap-2 pb-2">
            <select
              value={sqlDialect}
              onChange={(e) => setSqlDialect(e.target.value as any)}
              className="text-xs py-1 px-2 border border-neutral-300 bg-white"
            >
              <option value="postgres">PostgreSQL 15+ / Supabase</option>
              <option value="mysql">MySQL 8.0 / MariaDB</option>
            </select>
            <button
              onClick={handleCopySQL}
              className="px-3 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin SQL'}</span>
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: VISUAL ERD */}
      {activeTab === 'erd' && (
        <div className="my-8 space-y-8 animate-in fade-in duration-200">
          <div className="p-4 bg-[#FAF8F5] border border-neutral-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Share2 className="w-4 h-4 text-neutral-700" />
              <span>
                <strong>Relasi Inti:</strong> Users (1:N) Orders (1:N) Order Items (N:1) Product Variants (N:1) Products (N:1) Categories.
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">10 Relational Tables</span>
          </div>

          {/* Interactive ERD Diagram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Table 1: users */}
            <div className="bg-white border-2 border-neutral-800 shadow-sm overflow-hidden">
              <div className="bg-neutral-900 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">users</span>
                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded">Core Entity</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (UUID / BIGINT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1">
                  <span>name VARCHAR(150)</span>
                  <span className="text-neutral-400">NOT NULL</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>email VARCHAR(191)</span>
                  <span className="text-neutral-400">UNIQUE</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>phone VARCHAR(30)</span>
                  <span className="text-neutral-400">INDEX</span>
                </div>
                <div className="flex justify-between pt-1 text-purple-700 font-semibold">
                  <span>role ENUM('customer','admin','warehouse_staff')</span>
                </div>
                <div className="flex justify-between pt-1 text-neutral-400">
                  <span>created_at / updated_at TIMESTAMP</span>
                </div>
              </div>
            </div>

            {/* Table 2: categories */}
            <div className="bg-white border border-neutral-300 shadow-xs overflow-hidden">
              <div className="bg-neutral-800 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">categories</span>
                <span className="text-[10px] bg-neutral-700 px-1.5 py-0.5 rounded">Lookups</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (INT AUTO_INCREMENT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1">
                  <span>name VARCHAR(100)</span>
                  <span className="text-neutral-500">Pakaian, Celana, Jaket...</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>slug VARCHAR(120)</span>
                  <span className="text-neutral-400">UNIQUE</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>description TEXT</span>
                  <span className="text-neutral-400">NULLABLE</span>
                </div>
              </div>
            </div>

            {/* Table 3: products */}
            <div className="bg-white border-2 border-neutral-800 shadow-sm overflow-hidden">
              <div className="bg-neutral-900 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">products</span>
                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded">Catalog</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (BIGINT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK category_id -&gt; categories.id</span>
                  <span>INDEX</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>name VARCHAR(200)</span>
                  <span className="text-neutral-400">NOT NULL</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>slug VARCHAR(255)</span>
                  <span className="text-neutral-400">UNIQUE</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>base_price DECIMAL(12,2)</span>
                  <span className="text-neutral-400">INDEX</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>material VARCHAR(200)</span>
                  <span className="text-neutral-500">Wool, Cotton, etc.</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>is_active BOOLEAN</span>
                  <span className="text-neutral-400">DEFAULT true</span>
                </div>
              </div>
            </div>

            {/* Table 4: product_variants */}
            <div className="bg-white border-2 border-purple-800 shadow-sm overflow-hidden">
              <div className="bg-purple-900 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">product_variants</span>
                <span className="text-[10px] bg-purple-800 px-1.5 py-0.5 rounded">SKU & Inventory</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (BIGINT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK product_id -&gt; products.id</span>
                  <span>CASCADE</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-neutral-900">
                  <span>sku VARCHAR(100)</span>
                  <span className="text-neutral-400">UNIQUE</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>size VARCHAR(20)</span>
                  <span className="text-neutral-500">S, M, L, XL, 40-43</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>color VARCHAR(50)</span>
                  <span className="text-neutral-500">Charcoal, Sand...</span>
                </div>
                <div className="flex justify-between pt-1 text-emerald-800 font-bold">
                  <span>stock INT UNSIGNED</span>
                  <span className="text-neutral-400">CHECK &gt;= 0</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>bin_location VARCHAR(50)</span>
                  <span className="text-purple-700 font-semibold">RAK A-02</span>
                </div>
              </div>
            </div>

            {/* Table 5: orders */}
            <div className="bg-white border-2 border-emerald-800 shadow-sm overflow-hidden">
              <div className="bg-emerald-900 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">orders</span>
                <span className="text-[10px] bg-emerald-800 px-1.5 py-0.5 rounded">Transactions</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (UUID)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1 font-bold text-neutral-900">
                  <span>order_number VARCHAR(60)</span>
                  <span className="text-neutral-400">UNIQUE INDEX</span>
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK user_id -&gt; users.id</span>
                  <span>INDEX</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>total_amount DECIMAL(12,2)</span>
                  <span className="text-neutral-400">NOT NULL</span>
                </div>
                <div className="flex justify-between pt-1 text-indigo-700 font-semibold">
                  <span>status ENUM('PENDING','VERIFIED','PICKING','PACKING','SENT','DELIVERED')</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>shipping_address JSONB</span>
                  <span className="text-neutral-500">Kota, Alamat, Kodepos</span>
                </div>
                <div className="flex justify-between pt-1 text-neutral-400">
                  <span>created_at / updated_at TIMESTAMP</span>
                </div>
              </div>
            </div>

            {/* Table 6: order_items */}
            <div className="bg-white border border-neutral-300 shadow-xs overflow-hidden">
              <div className="bg-neutral-800 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">order_items</span>
                <span className="text-[10px] bg-neutral-700 px-1.5 py-0.5 rounded">Itemized</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (BIGINT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK order_id -&gt; orders.id</span>
                  <span>CASCADE</span>
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK variant_id -&gt; product_variants.id</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>quantity INT</span>
                  <span className="text-neutral-400">NOT NULL</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>unit_price DECIMAL(12,2)</span>
                  <span className="text-neutral-400">Historical Lock</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>subtotal DECIMAL(12,2)</span>
                  <span className="text-neutral-400">NOT NULL</span>
                </div>
              </div>
            </div>

            {/* Table 7: payments */}
            <div className="bg-white border border-neutral-300 shadow-xs overflow-hidden">
              <div className="bg-neutral-800 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">payments</span>
                <span className="text-[10px] bg-neutral-700 px-1.5 py-0.5 rounded">Midtrans Log</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (BIGINT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK order_id -&gt; orders.id</span>
                  <span>UNIQUE</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>transaction_id VARCHAR(100)</span>
                  <span className="text-neutral-400">INDEX</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>payment_type VARCHAR(50)</span>
                  <span className="text-neutral-500">qris, gopay, bca_va</span>
                </div>
                <div className="flex justify-between pt-1 text-emerald-700 font-semibold">
                  <span>status VARCHAR(50)</span>
                  <span className="text-neutral-500">settlement, expire</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>signature_hash VARCHAR(255)</span>
                  <span className="text-neutral-400">SHA512</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>payload_json JSONB</span>
                  <span className="text-neutral-400">Audit Trail</span>
                </div>
              </div>
            </div>

            {/* Table 8: shipments */}
            <div className="bg-white border-2 border-indigo-800 shadow-sm overflow-hidden">
              <div className="bg-indigo-900 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">shipments</span>
                <span className="text-[10px] bg-indigo-800 px-1.5 py-0.5 rounded">Warehouse & Courier</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (BIGINT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK order_id -&gt; orders.id</span>
                  <span>UNIQUE</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-indigo-900">
                  <span>tracking_number VARCHAR(100)</span>
                  <span className="text-neutral-400">UNIQUE INDEX</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>courier_code VARCHAR(50)</span>
                  <span className="text-neutral-500">sicepat, jne, jnt</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>courier_service VARCHAR(50)</span>
                  <span className="text-neutral-500">BEST, REG</span>
                </div>
                <div className="flex justify-between pt-1 text-purple-700 font-semibold">
                  <span>status ENUM('PICKING','PACKING','SENT','DELIVERED')</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>picker_staff_id -&gt; users.id</span>
                  <span className="text-neutral-400">NULLABLE</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>dispatched_at TIMESTAMP</span>
                  <span className="text-neutral-400">NULLABLE</span>
                </div>
              </div>
            </div>

            {/* Table 9: stock_movements */}
            <div className="bg-white border border-neutral-300 shadow-xs overflow-hidden">
              <div className="bg-neutral-800 text-white p-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs">stock_movements</span>
                <span className="text-[10px] bg-neutral-700 px-1.5 py-0.5 rounded">Audit & Opname</span>
              </div>
              <div className="p-3 font-mono text-[11px] space-y-1.5 divide-y divide-neutral-100">
                <div className="flex justify-between items-center text-amber-700 font-bold">
                  <span>PK id (BIGINT)</span>
                  <Key className="w-3 h-3" />
                </div>
                <div className="flex justify-between pt-1 text-blue-700">
                  <span>FK variant_id -&gt; product_variants.id</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>type ENUM('order_deduct','restock','return','adjustment')</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>delta_quantity INT</span>
                  <span className="text-neutral-500">-1, +50</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>balance_after INT</span>
                  <span className="text-neutral-400">Audit</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>reference_id VARCHAR(100)</span>
                  <span className="text-neutral-400">e.g. MERE-001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SQL DDL SCRIPT */}
      {activeTab === 'sql' && (
        <div className="my-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-3 bg-neutral-100 border border-neutral-200 text-xs text-neutral-600">
            <span>
              Format DDL lengkap dengan Foreign Keys, Check Constraints, Enums, dan B-Tree Indexes.
            </span>
            <span className="font-mono text-[11px]">Dialek: {sqlDialect === 'postgres' ? 'PostgreSQL' : 'MySQL 8.0'}</span>
          </div>

          <pre className="p-5 bg-[#18181B] text-[#F4F4F5] text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800 max-h-[600px] overflow-y-auto">
            {sqlDialect === 'postgres' ? POSTGRES_SQL_DDL : MYSQL_SQL_DDL}
          </pre>
        </div>
      )}

      {/* TAB 3: DATA DICTIONARY */}
      {activeTab === 'dictionary' && (
        <div className="my-6 space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-800">
                  <th className="p-3 font-bold uppercase">Nama Tabel</th>
                  <th className="p-3 font-bold uppercase">Deskripsi Entitas</th>
                  <th className="p-3 font-bold uppercase">Primary Key</th>
                  <th className="p-3 font-bold uppercase">Relasi Kunci (Foreign Key)</th>
                  <th className="p-3 font-bold uppercase">Indeks Kritis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700 font-mono text-[11px]">
                <tr>
                  <td className="p-3 font-bold text-neutral-900">users</td>
                  <td className="p-3 font-sans">Menampung data akun pelanggan, admin kantor, dan tim gudang.</td>
                  <td className="p-3 text-amber-700">id (UUID)</td>
                  <td className="p-3">-</td>
                  <td className="p-3">email, phone, role</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-neutral-900">categories</td>
                  <td className="p-3 font-sans">Klasifikasi produk (Pakaian, Celana, Jaket, Tas, Sepatu, Aksesoris).</td>
                  <td className="p-3 text-amber-700">id (INT)</td>
                  <td className="p-3">-</td>
                  <td className="p-3">slug</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-neutral-900">products</td>
                  <td className="p-3 font-sans">Entitas induk produk, foto utama, material, dan harga dasar.</td>
                  <td className="p-3 text-amber-700">id (BIGINT)</td>
                  <td className="p-3 text-blue-700">category_id -&gt; categories(id)</td>
                  <td className="p-3">slug, is_active, base_price</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-neutral-900">product_variants</td>
                  <td className="p-3 font-sans">Kombinasi SKU, ukuran (S/M/L/XL), warna, stok aktual, & lokasi rak.</td>
                  <td className="p-3 text-amber-700">id (BIGINT)</td>
                  <td className="p-3 text-blue-700">product_id -&gt; products(id)</td>
                  <td className="p-3">sku (UNIQUE), product_id</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-neutral-900">orders</td>
                  <td className="p-3 font-sans">Data transaksi pesanan, status alur, alamat JSON, total, dan kupon.</td>
                  <td className="p-3 text-amber-700">id (UUID)</td>
                  <td className="p-3 text-blue-700">user_id -&gt; users(id)</td>
                  <td className="p-3">order_number (UNIQUE), status, created_at</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-neutral-900">order_items</td>
                  <td className="p-3 font-sans">Rincian item per pesanan dengan snapshot harga saat transaksi.</td>
                  <td className="p-3 text-amber-700">id (BIGINT)</td>
                  <td className="p-3 text-blue-700">order_id, variant_id</td>
                  <td className="p-3">order_id, variant_id</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-neutral-900">shipments</td>
                  <td className="p-3 font-sans">Alur logistik gudang: Picking, Packing, Cetak Resi, Handover Kurir.</td>
                  <td className="p-3 text-amber-700">id (BIGINT)</td>
                  <td className="p-3 text-blue-700">order_id -&gt; orders(id)</td>
                  <td className="p-3">tracking_number (UNIQUE), status</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const POSTGRES_SQL_DDL = `-- ============================================================================
-- MERE FASHION DATABASE ARCHITECTURE (POSTGRESQL 15+)
-- Complete schema for Products, Multi-Variants, Carts, Orders, and Warehouse
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'warehouse_staff');
CREATE TYPE order_status AS ENUM (
  'PENDING_PAYMENT',
  'PAYMENT_VERIFIED',
  'PICKING',
  'PACKING',
  'SENT',
  'DELIVERED',
  'CANCELLED'
);
CREATE TYPE shipment_status AS ENUM ('READY_FOR_PICKING', 'PICKING', 'PACKING', 'SENT', 'DELIVERED');
CREATE TYPE stock_movement_type AS ENUM ('order_deduct', 'restock', 'return_restock', 'adjustment');

-- 2. USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  role user_role DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- 3. CATEGORIES TABLE
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL, -- Pakaian, Celana, Jaket, Tas, Sepatu, Aksesoris
  slug VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PRODUCTS TABLE
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  material VARCHAR(200) NOT NULL,
  base_price DECIMAL(12, 2) NOT NULL CHECK (base_price >= 0),
  compare_at_price DECIMAL(12, 2),
  featured_image VARCHAR(500) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);

-- 5. PRODUCT VARIANTS TABLE (Size, Color, Inventory & Bin Location)
CREATE TABLE product_variants (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) NOT NULL UNIQUE,
  size VARCHAR(30) NOT NULL, -- 'S', 'M', 'L', 'XL', '40', '41', etc.
  color VARCHAR(60) NOT NULL,
  color_hex VARCHAR(10) NOT NULL,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  bin_location VARCHAR(50) DEFAULT 'RAK-A-01', -- Lokasi fisik di gudang MERE
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_sku ON product_variants(sku);

-- 6. CARTS & CART ITEMS
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
  id BIGSERIAL PRIMARY KEY,
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  variant_id BIGINT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity INT NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(cart_id, variant_id)
);

-- 7. ORDERS TABLE
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(60) NOT NULL UNIQUE, -- e.g. MERE-20261102-001
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(30) NOT NULL,
  customer_email VARCHAR(191) NOT NULL,
  shipping_address JSONB NOT NULL, -- {province, city, address, postal_code}
  subtotal DECIMAL(12, 2) NOT NULL,
  discount DECIMAL(12, 2) DEFAULT 0,
  shipping_fee DECIMAL(12, 2) NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  status order_status DEFAULT 'PENDING_PAYMENT',
  payment_method VARCHAR(50) NOT NULL, -- 'qris', 'gopay', 'bca_va', etc.
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 8. ORDER ITEMS (Snapshot at checkout)
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id BIGINT NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
  product_name VARCHAR(200) NOT NULL,
  variant_sku VARCHAR(100) NOT NULL,
  variant_size VARCHAR(30) NOT NULL,
  variant_color VARCHAR(60) NOT NULL,
  unit_price DECIMAL(12, 2) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  subtotal DECIMAL(12, 2) NOT NULL
);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- 9. PAYMENTS (Gateway Webhooks Log)
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  transaction_id VARCHAR(120) NOT NULL UNIQUE,
  payment_type VARCHAR(50) NOT NULL,
  gross_amount DECIMAL(12, 2) NOT NULL,
  transaction_status VARCHAR(60) NOT NULL, -- 'settlement', 'pending', 'expire'
  signature_key VARCHAR(255) NOT NULL,
  payload_json JSONB,
  settled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. SHIPMENTS (Warehouse fulfillment & Courier dispatch)
CREATE TABLE shipments (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  tracking_number VARCHAR(100) UNIQUE, -- Resi (e.g. SICEPAT-MRF-891023412)
  courier_code VARCHAR(50) NOT NULL, -- sicepat, jne, jnt
  courier_service VARCHAR(50) NOT NULL,
  status shipment_status DEFAULT 'READY_FOR_PICKING',
  picking_staff_id UUID REFERENCES users(id),
  packing_staff_id UUID REFERENCES users(id),
  picked_at TIMESTAMP WITH TIME ZONE,
  packed_at TIMESTAMP WITH TIME ZONE,
  dispatched_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  thermal_label_printed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_shipments_tracking ON shipments(tracking_number);
CREATE INDEX idx_shipments_status ON shipments(status);

-- 11. STOCK MOVEMENTS (Audit Trail)
CREATE TABLE stock_movements (
  id BIGSERIAL PRIMARY KEY,
  variant_id BIGINT NOT NULL REFERENCES product_variants(id),
  movement_type stock_movement_type NOT NULL,
  quantity INT NOT NULL,
  balance_before INT NOT NULL,
  balance_after INT NOT NULL,
  reference_id VARCHAR(100), -- order_number or adjustment batch
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_stock_movements_variant ON stock_movements(variant_id);
`;

const MYSQL_SQL_DDL = `-- ============================================================================
-- MERE FASHION DATABASE ARCHITECTURE (MYSQL 8.0+)
-- Complete schema for Products, Multi-Variants, Carts, Orders, and Warehouse
-- ============================================================================

CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  role ENUM('customer', 'admin', 'warehouse_staff') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  material VARCHAR(200) NOT NULL,
  base_price DECIMAL(12, 2) NOT NULL,
  compare_at_price DECIMAL(12, 2),
  featured_image VARCHAR(500) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_products_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_variants (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  sku VARCHAR(100) NOT NULL UNIQUE,
  size VARCHAR(30) NOT NULL,
  color VARCHAR(60) NOT NULL,
  color_hex VARCHAR(10) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  bin_location VARCHAR(50) DEFAULT 'RAK-A-01',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_variants_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
  id CHAR(36) PRIMARY KEY,
  order_number VARCHAR(60) NOT NULL UNIQUE,
  user_id CHAR(36),
  customer_name VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(30) NOT NULL,
  customer_email VARCHAR(191) NOT NULL,
  shipping_address JSON NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  discount DECIMAL(12, 2) DEFAULT 0,
  shipping_fee DECIMAL(12, 2) NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  status ENUM('PENDING_PAYMENT', 'PAYMENT_VERIFIED', 'PICKING', 'PACKING', 'SENT', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING_PAYMENT',
  payment_method VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_orders_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
