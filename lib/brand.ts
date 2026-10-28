/** Sakolentra brand constants — keep UI, SEO, and assets in sync. */

export const BRAND = {
  name: 'Sakolentra',
  /** Official positioning line from the wordmark. */
  tagline:
    'Sistem Administrasi dan Keuangan Operasional Lembaga Pendidikan Terintegrasi',
  shortTagline: 'Sistem Sekolah Terintegrasi',
  logo: {
    full: '/brand/logo-sakolentra.png',
    mark: '/brand/mark-s-wisuda-256.png',
    /** Intrinsic size of transparent logo-sakolentra.png */
    fullWidth: 1000,
    fullHeight: 320,
  },
  /** Hex tokens mirrored in app/globals.css — punchy blue ↔ emerald */
  colors: {
    blue: '#0066e0',
    green: '#00d084',
    /** Readable green for text on light backgrounds */
    greenText: '#007a4e',
    blueBright: '#1a9fff',
    greenBright: '#12f095',
    textLight: '#0b2f5c',
    bgLight: '#f3f7fc',
    bgDark: '#050910',
  },
} as const;
