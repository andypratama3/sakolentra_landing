import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${BRAND.shortTagline}`,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: BRAND.colors.bgLight,
    theme_color: BRAND.colors.bgDark,
    lang: 'id',
    dir: 'ltr',
    categories: ['education', 'business'],
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: BRAND.logo.mark, sizes: '256x256', type: 'image/png' },
    ],
  };
}
