import React, { useState } from 'react';
import {
  GitBranch,
  FolderTree,
  Cloud,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const DeploymentGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'repo_tree' | 'ci_cd' | 'docker' | 'hosting_steps'>('repo_tree');
  const [copied, setCopied] = useState(false);

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
          <GitBranch className="w-4 h-4 text-neutral-800" />
          <span>GIT VERSION CONTROL & SERVER DEPLOYMENT ARCHITECTURE</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
          Panduan Struktur Repositori Git & Strategi Hosting
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
          Standar industri untuk pengelolaan source code MERE FASHION menggunakan <strong>Git Flow</strong>, otomatisasi <strong>CI/CD GitHub Actions</strong>, kontainerisasi <strong>Docker</strong>, serta panduan deployment ke VPS (Ubuntu/Nginx) atau GitHub Pages.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-neutral-200 mt-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'repo_tree', label: '1. Struktur Monorepo GitHub' },
          { id: 'ci_cd', label: '2. GitHub Actions CI/CD (.yml)' },
          { id: 'docker', label: '3. Docker & Nginx Config' },
          { id: 'hosting_steps', label: '4. Panduan Terminal Deployment' },
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

      {/* TAB 1: REPOSITORY TREE & GIT FLOW */}
      {activeTab === 'repo_tree' && (
        <div className="my-8 space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Visual Tree */}
            <div className="lg:col-span-6 bg-[#18181B] text-neutral-200 p-6 font-mono text-xs overflow-x-auto border border-neutral-800">
              <div className="text-neutral-400 mb-4 pb-2 border-b border-neutral-700 flex justify-between">
                <span>mere-fashion-platform/</span>
                <span className="text-[10px] text-emerald-400">git-branch: main</span>
              </div>
              <pre className="leading-relaxed text-[11px]">
{`├── .github/
│   └── workflows/
│       ├── test.yml            # Otomatis unit test & lint saat Pull Request
│       └── deploy.yml          # Otomatis deploy ke production saat push to main
├── backend-api/                # Laravel 11 Restful API & Workers
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── CheckoutController.php
│   │   │   ├── MidtransWebhookController.php
│   │   │   └── WarehouseController.php
│   │   ├── Models/
│   │   │   ├── Order.php, Product.php, ProductVariant.php
│   │   │   └── Shipment.php
│   │   └── Services/
│   │       ├── WhatsAppService.php
│   │       └── WarehouseStockService.php
│   ├── database/
│   │   └── migrations/         # Skema database & seeder produk
│   ├── routes/
│   │   └── api.php
│   └── Dockerfile.api
├── frontend-store/             # React 19 + Tailwind CSS + Vite
│   ├── src/
│   │   ├── components/         # Hero, Catalog, Cart, Checkout, Tracking
│   │   ├── utils/              # State machine & Midtrans math
│   │   └── assets/             # Lookbook photography & icons
│   ├── package.json
│   └── vite.config.ts
├── docker/
│   ├── nginx/
│   │   └── conf.d/mere.conf    # Reverse proxy & SSL Let's Encrypt
│   └── supervisord.conf        # Background queue worker untuk notif WA
├── docker-compose.yml          # Local & Production orchestration
├── .env.example
└── README.md`}
              </pre>
            </div>

            {/* Right: Git Branching Strategy */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 bg-white border border-neutral-200">
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                  STRATEGI PERCABANGAN (GIT FLOW)
                </span>
                <h3 className="font-editorial text-xl font-bold text-neutral-900 mb-3">
                  Standar Cabang (Branching Discipline)
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-neutral-50 border-l-2 border-neutral-900">
                    <strong className="block text-neutral-900 font-mono">main (Production)</strong>
                    <p className="text-neutral-600 mt-0.5">
                      Cabang stabil. Setiap push ke <code>main</code> akan otomatis mentrigger deployment tanpa downtime ke server live.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 border-l-2 border-blue-600">
                    <strong className="block text-neutral-900 font-mono">staging (Pre-Production)</strong>
                    <p className="text-neutral-600 mt-0.5">
                      Digunakan untuk verifikasi tim internal (QA, testing pembayaran Midtrans Sandbox, dan uji coba SOP gudang).
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 border-l-2 border-emerald-600">
                    <strong className="block text-neutral-900 font-mono">feature/* (Fitur Baru)</strong>
                    <p className="text-neutral-600 mt-0.5">
                      Contoh: <code>feature/add-qris-simulator</code> atau <code>feature/thermal-label-print</code>. Dibuat dari staging dan digabung via Pull Request.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">
                  Praktik Terbaik Keamanan Git (.gitignore):
                </span>
                <p className="text-emerald-800 leading-relaxed">
                  Pastikan file <code>.env</code>, <code>node_modules/</code>, <code>vendor/</code>, dan credentials API (Midtrans Server Key, Fonnte Token) <strong>TIDAK PERNAH</strong> dicommit ke repositori publik. Simpan di GitHub Repository Secrets.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CI/CD GITHUB ACTIONS */}
      {activeTab === 'ci_cd' && (
        <div className="my-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-3 bg-neutral-100 border border-neutral-200 text-xs text-neutral-600">
            <span>
              File: <code className="font-mono bg-white px-1.5 py-0.5 border">.github/workflows/deploy.yml</code> — Otomasi build, test, dan zero-downtime deploy.
            </span>
            <button
              onClick={() => handleCopy(GITHUB_ACTIONS_YAML)}
              className="px-3 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin YAML'}</span>
            </button>
          </div>

          <pre className="p-5 bg-[#18181B] text-[#F4F4F5] font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800 max-h-[550px] overflow-y-auto">
            {GITHUB_ACTIONS_YAML}
          </pre>
        </div>
      )}

      {/* TAB 3: DOCKER & NGINX */}
      {activeTab === 'docker' && (
        <div className="my-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-3 bg-neutral-100 border border-neutral-200 text-xs text-neutral-600">
            <span>
              File: <code className="font-mono bg-white px-1.5 py-0.5 border">docker-compose.yml</code> — Menjalankan Nginx, PHP-FPM, PostgreSQL, dan Redis Worker.
            </span>
            <button
              onClick={() => handleCopy(DOCKER_COMPOSE_YML)}
              className="px-3 py-1 bg-neutral-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Docker Compose'}</span>
            </button>
          </div>

          <pre className="p-5 bg-[#18181B] text-[#F4F4F5] font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800 max-h-[550px] overflow-y-auto">
            {DOCKER_COMPOSE_YML}
          </pre>
        </div>
      )}

      {/* TAB 4: STEP-BY-STEP HOSTING GUIDE */}
      {activeTab === 'hosting_steps' && (
        <div className="my-6 space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option A: VPS Server (Ubuntu + Nginx + Docker) */}
            <div className="p-6 bg-white border border-neutral-200 space-y-4">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block">
                OPSI 1: SERVER VPS (DIGITALOCEAN / AWS EC2 / BIZNET GIO)
              </span>
              <h3 className="font-editorial text-xl font-bold text-neutral-900">
                Langkah Setup Server Production
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Rekomendasi untuk sistem produksi penuh dengan database PostgreSQL dan antrean WhatsApp background worker.
              </p>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 1. Update OS & Install Docker</span>
                  <p className="text-emerald-400 mt-1">sudo apt update && sudo apt upgrade -y</p>
                  <p className="text-emerald-400">curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh</p>
                </div>

                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 2. Clone Repository & Konfigurasi .env</span>
                  <p className="text-emerald-400 mt-1">git clone git@github.com:mere-fashion/platform.git /var/www/mere</p>
                  <p className="text-emerald-400">cd /var/www/mere && cp .env.example .env</p>
                  <p className="text-neutral-400">nano .env  # Isi MIDTRANS_SERVER_KEY & DB_PASSWORD</p>
                </div>

                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 3. Jalankan Container & Database Migration</span>
                  <p className="text-emerald-400 mt-1">docker compose up -d --build</p>
                  <p className="text-emerald-400">docker compose exec backend php artisan migrate --seed</p>
                </div>

                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 4. Pasang SSL Gratis (Certbot Let's Encrypt)</span>
                  <p className="text-emerald-400 mt-1">sudo certbot --nginx -d merefashion.com -d www.merefashion.com</p>
                </div>
              </div>
            </div>

            {/* Option B: GitHub Pages / Vercel (Frontend Only) */}
            <div className="p-6 bg-white border border-neutral-200 space-y-4">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block">
                OPSI 2: GITHUB PAGES / VERCEL (FRONTEND ONLY)
              </span>
              <h3 className="font-editorial text-xl font-bold text-neutral-900">
                Hosting Katalog Statis ke GitHub Pages
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Jika Anda ingin meng-host website katalog frontend secara gratis di GitHub Pages dengan backend API terpisah di cloud.
              </p>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 1. Tambahkan gh-pages ke package.json</span>
                  <p className="text-emerald-400 mt-1">npm install --save-dev gh-pages</p>
                </div>

                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 2. Atur base path di vite.config.ts</span>
                  <p className="text-neutral-400 mt-1">// vite.config.ts</p>
                  <p className="text-emerald-400">export default defineConfig(&#123; base: '/mere-fashion/' &#125;)</p>
                </div>

                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 3. Tambahkan script deploy di package.json</span>
                  <p className="text-emerald-400 mt-1">"predeploy": "npm run build",</p>
                  <p className="text-emerald-400">"deploy": "gh-pages -d dist"</p>
                </div>

                <div className="p-3 bg-neutral-900 text-neutral-200">
                  <span className="text-neutral-500"># 4. Eksekusi Deploy ke GitHub Pages</span>
                  <p className="text-emerald-400 mt-1">npm run deploy</p>
                  <p className="text-neutral-400 mt-1"># Website aktif di https://username.github.io/mere-fashion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GITHUB_ACTIONS_YAML = `name: MERE FASHION CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main", "staging" ]

jobs:
  test:
    name: Run Automated Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: mere_test
          POSTGRES_USER: root
          POSTGRES_PASSWORD: secret_password
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup PHP 8.3
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, pdo_pgsql, bcmath, redis

      - name: Install Composer Dependencies
        run: |
          cd backend-api
          composer install --prefer-dist --no-interaction

      - name: Run Pest & PHPUnit Tests
        env:
          DB_CONNECTION: pgsql
          DB_HOST: 127.0.0.1
          DB_PORT: 5432
          DB_DATABASE: mere_test
          DB_USERNAME: root
          DB_PASSWORD: secret_password
        run: |
          cd backend-api
          php artisan test

      - name: Setup Node.js & Test Frontend
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: |
          cd frontend-store
          npm ci
          npm run build

  deploy:
    name: Zero-Downtime VPS Deployment
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest

    steps:
      - name: Trigger Deployment via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: \${{ secrets.PROD_SERVER_IP }}
          username: \${{ secrets.PROD_SSH_USER }}
          key: \${{ secrets.PROD_SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/mere
            git pull origin main
            docker compose build --pull
            docker compose up -d --remove-orphans
            docker compose exec -T backend php artisan migrate --force
            docker compose exec -T backend php artisan config:cache
            docker compose exec -T backend php artisan route:cache
            docker compose exec -T backend php artisan queue:restart
            echo "Deployment of MERE FASHION completed successfully!"
`;

const DOCKER_COMPOSE_YML = `version: '3.8'

services:
  # 1. Reverse Proxy & Frontend Static File Server
  nginx:
    image: nginx:alpine
    container_name: mere_nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/conf.d:/etc/nginx/conf.d
      - ./frontend-store/dist:/usr/share/nginx/html
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - backend

  # 2. Backend Laravel PHP 8.3-FPM
  backend:
    build:
      context: ./backend-api
      dockerfile: Dockerfile.api
    container_name: mere_backend
    restart: always
    environment:
      APP_ENV: production
      APP_KEY: \${APP_KEY}
      DB_HOST: postgres
      DB_DATABASE: mere_fashion_db
      DB_USERNAME: mere_user
      DB_PASSWORD: \${DB_PASSWORD}
      REDIS_HOST: redis
      MIDTRANS_SERVER_KEY: \${MIDTRANS_SERVER_KEY}
      FONNTE_API_KEY: \${FONNTE_API_KEY}
    volumes:
      - ./backend-api/storage:/var/www/html/storage
    depends_on:
      - postgres
      - redis

  # 3. PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: mere_postgres
    restart: always
    environment:
      POSTGRES_DB: mere_fashion_db
      POSTGRES_USER: mere_user
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # 4. Redis for Queue & Cache (WhatsApp Dispatcher)
  redis:
    image: redis:alpine
    container_name: mere_redis
    restart: always

volumes:
  postgres_data:
`;
