export type PartnerHighlight = {
  icon: 'receipt' | 'check' | 'shield' | 'banknote' | 'school' | 'users';
  title: string;
  body: string;
};

export type Partner = {
  id: string;
  name: string;
  /** Short label under the logo */
  role: string;
  roleIcon: PartnerHighlight['icon'];
  blurb: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  href: string;
  /** Portrait logos need taller plates */
  orientation?: 'landscape' | 'portrait';
  highlights?: PartnerHighlight[];
};

export const partners: Partner[] = [
  {
    id: 'bankaltimtara',
    name: 'Bankaltimtara',
    role: 'Mitra Virtual Account',
    roleIcon: 'banknote',
    blurb:
      'Pembayaran SPP dan tagihan sekolah lewat Virtual Account — konfirmasi otomatis ke bendahara.',
    logo: '/partners/bankaltimtara.png',
    logoWidth: 938,
    logoHeight: 470,
    href: 'https://www.bankaltimtara.co.id',
    orientation: 'landscape',
    highlights: [
      {
        icon: 'banknote',
        title: 'Virtual Account per tagihan',
        body: 'Setiap tagihan SPP punya nomor VA unik, tanpa cek transfer manual.',
      },
      {
        icon: 'check',
        title: 'Konfirmasi otomatis',
        body: 'Status lunas masuk ke sistem saat pembayaran berhasil.',
      },
      {
        icon: 'receipt',
        title: 'Rekonsiliasi rapi',
        body: 'Riwayat tersambung ke siswa dan periode tagihan.',
      },
      {
        icon: 'shield',
        title: 'Bank daerah terpercaya',
        body: 'Bank Pembangunan Daerah Kalimantan Timur dan Utara.',
      },
    ],
  },
  {
    id: 'sd-muhammadiyah-3-samarinda',
    name: 'SD Muhammadiyah 3 Samarinda',
    role: 'Sekolah mitra',
    roleIcon: 'school',
    blurb:
      'Sekolah Kreatif Islam di Samarinda Seberang — mitra yang menjalankan operasional akademik dan keuangan di Sakolentra.',
    logo: '/partners/sd-muhammadiyah-3-samarinda.png',
    logoWidth: 512,
    logoHeight: 749,
    href: 'https://sdmuhammadiyah3smd.com',
    orientation: 'portrait',
    highlights: [
      {
        icon: 'school',
        title: 'Operasional harian',
        body: 'Akademik, kehadiran, dan komunikasi orang tua dalam satu sistem.',
      },
      {
        icon: 'receipt',
        title: 'Tagihan & SPP',
        body: 'Tagihan bulanan tersambung ke Virtual Account Bankaltimtara.',
      },
      {
        icon: 'users',
        title: '619+ siswa',
        body: 'Skala nyata di lapangan, bukan demo kosong.',
      },
      {
        icon: 'shield',
        title: 'Akreditasi Unggul',
        body: 'Sekolah Penggerak dengan predikat Unggul (A).',
      },
    ],
  },
];
