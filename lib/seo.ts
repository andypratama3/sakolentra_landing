import { categories } from '@/data/categories';
import { inventory, ALL_TIERS } from '@/data/pricing';
import { SOCIAL } from '@/lib/site';

const PRODUCTION_URL = 'https://sakolentra.vercel.app';
const RAW = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_URL;

export const SITE_URL = RAW.replace(/\/+$/, '');
export const SITE_NAME = 'Sakolentra';
export const SITE_SHORT_NAME = 'Sakolentra';
export const SITE_TITLE = 'Sakolentra — Sistem Sekolah Terintegrasi';
export const SITE_DESCRIPTION = `Sakolentra menyatukan akademik, keuangan, kehadiran, komunikasi, dan CMS sekolah dalam satu sistem. Jelajahi ${inventory.features} fitur dan ${inventory.flows} alur interaktif.`;
export const SITE_KEYWORDS = [
  'sistem informasi sekolah',
  'aplikasi sekolah terintegrasi',
  'sistem akademik sekolah',
  'administrasi sekolah digital',
  'keuangan sekolah',
  'SPP online',
  'PPDB online',
  'absensi GPS sekolah',
  'rapor digital',
  'CMS sekolah',
  'payroll sekolah',
  'source code sistem sekolah',
];

/**
 * Indexable hanya bila build produksi dan NOINDEX tidak diaktifkan.
 * Domain default sudah diketahui; NEXT_PUBLIC_SITE_URL menimpa bila diisi.
 */
export const INDEXABLE =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_NOINDEX !== 'true';

const CONTACT_EMAIL = SOCIAL.email.replace(/^mailto:/, '');

const pricedOffers = ALL_TIERS.filter((t) => t.amountIdr != null).map((t) => ({
  '@type': 'Offer' as const,
  name: `${SITE_NAME} ${t.name}`,
  price: String(t.amountIdr),
  priceCurrency: 'IDR',
  availability: 'https://schema.org/InStock',
  url: `${SITE_URL}/?paket=${t.id}#harga`,
  ...(t.billing === 'MONTH'
    ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: t.amountIdr, priceCurrency: 'IDR', billingDuration: 'P1M' } }
    : {}),
}));

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
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
      },
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
      offers: pricedOffers,
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
