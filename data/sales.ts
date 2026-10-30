import type { Audience, Stat, StackItem } from '@/lib/types';
import { features } from '@/data/features';
import { categories } from '@/data/categories';
import { flows } from '@/data/flows';

export const stats: Stat[] = [
  { value: String(features.length), label: 'Fitur' },
  { value: String(categories.length), label: 'Kategori inti' },
  { value: String(flows.length), label: 'Alur interaktif' },
  { value: '188', label: 'Route API' },
  { value: '292', label: 'Permission RBAC' },
];

export const audiences: Audience[] = [
  {
    icon: 'code-2',
    title: 'Source code milik Anda',
    body: 'Laravel + React, tanpa vendor lock-in. Kode dibuka, dimodifikasi, dan di-deploy sesuai kebutuhan.',
  },
  {
    icon: 'shield',
    title: 'Keamanan berlapis',
    body: 'Sanctum auth, 37 policy, 292 permission unik, data scoping per kelas, dan audit trail.',
  },
  {
    icon: 'network',
    title: 'API-first',
    body: '188 endpoint REST API — siap untuk aplikasi mobile, portal orang tua, dan integrasi pihak ketiga.',
  },
];

export const stack: StackItem[] = [
  'Laravel 12 (PHP 8.3)',
  'Blade + Vite + React 19',
  'MySQL 8',
  'Midtrans Snap & Core API',
  'WhatsApp Cloud API',
  'Leaflet/OpenStreetMap & KML geofence',
  'Spatie Permission (RBAC)',
  'Laravel Sanctum',
  'Laravel Reverb (realtime)',
  'Queue workers (jobs terjadwal)',
];
