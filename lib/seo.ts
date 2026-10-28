import { categories } from '@/data/categories';
import { inventory } from '@/data/inventory';
import { BRAND } from '@/lib/brand';
import { SOCIAL } from '@/lib/site';

const PRODUCTION_URL = 'https://sakolentra.vercel.app';
const RAW = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_URL;

export const SITE_URL = RAW.replace(/\/+$/, '');
export const SITE_NAME = BRAND.name;
export const SITE_SHORT_NAME = BRAND.name;
export const SITE_TITLE = `${BRAND.name} — ${BRAND.shortTagline}`;
export const SITE_DESCRIPTION = `${BRAND.name} — ${BRAND.tagline}. Jelajahi ${inventory.features} fitur dan ${inventory.flows} alur interaktif.`;
export const SITE_KEYWORDS = [
  'Sakolentra',
  'sistem informasi sekolah',
  'aplikasi sekolah terintegrasi',
  'sistem akademik sekolah',
  'administrasi sekolah digital',
  'keuangan operasional sekolah',
  'keuangan sekolah',
  'SPP online',
  'PPDB online',
  'absensi GPS sekolah',
  'rapor digital',
  'CMS sekolah',
  'payroll sekolah',
  'source code sistem sekolah',
  'Bankaltimtara',
  'virtual account sekolah',
];

/**
 * Indexable hanya bila build produksi dan NOINDEX tidak diaktifkan.
 * Domain default sudah diketahui; NEXT_PUBLIC_SITE_URL menimpa bila diisi.
 */
export const INDEXABLE =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_NOINDEX !== 'true';

const CONTACT_EMAIL = SOCIAL.email.replace(/^mailto:/, '');

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${BRAND.logo.mark}`,
        width: 256,
        height: 256,
      },
      slogan: BRAND.tagline,
      email: CONTACT_EMAIL,
      sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.cal],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: CONTACT_EMAIL,
          contactType: 'sales',
          availableLanguage: ['id'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'id-ID',
      publisher: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#app` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'School Management System',
      operatingSystem: 'Web',
      inLanguage: 'id-ID',
      screenshot: `${SITE_URL}/opengraph-image`,
      featureList: categories.map((c) => c.label),
      publisher: { '@id': `${SITE_URL}/#org` },
      author: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Andy Pratama',
      url: SOCIAL.cal,
      sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.cal],
      jobTitle: 'Fullstack Software Engineer',
      email: CONTACT_EMAIL,
    },
  ],
};
