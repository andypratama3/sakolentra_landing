import { categories } from '@/data/categories';
import { inventory } from '@/data/inventory';
import { partners } from '@/data/partners';
import { BRAND } from '@/lib/brand';
import { SOCIAL } from '@/lib/site';

const PRODUCTION_URL = 'https://sakolentra.vercel.app';
const RAW = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_URL;

export const SITE_URL = RAW.replace(/\/+$/, '');
export const SITE_NAME = BRAND.name;
export const SITE_SHORT_NAME = BRAND.name;
export const SITE_TITLE = `${BRAND.name} — ${BRAND.shortTagline}`;

const partnerNames = partners.map((p) => p.name);
const partnerSummary = partnerNames.join(' & ');

/** Meta description — keep roughly ≤160 chars for SERP snippets. */
export const SITE_DESCRIPTION = `${BRAND.name}: sistem sekolah terintegrasi dengan mitra ${partnerSummary}. ${inventory.features} fitur · ${inventory.flows} alur interaktif.`;

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
  'Bank Kaltim Tara',
  'Bank Kaltimtara',
  'virtual account sekolah',
  'VA Bankaltimtara',
  'SPP Virtual Account',
  'SD Muhammadiyah 3 Samarinda',
  'Sekolah Kreatif SD Muhammadiyah 3',
  'sistem sekolah Samarinda',
  'kerja sama sekolah bank daerah',
];

/**
 * Indexable hanya bila build produksi dan NOINDEX tidak diaktifkan.
 * Domain default sudah diketahui; NEXT_PUBLIC_SITE_URL menimpa bila diisi.
 */
export const INDEXABLE =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_NOINDEX !== 'true';

const CONTACT_EMAIL = SOCIAL.email.replace(/^mailto:/, '');

const partnerNodes = partners.map((p) => {
  const isSchool = p.id.includes('sd-') || p.roleIcon === 'school';
  return {
    '@type': isSchool ? ('ElementarySchool' as const) : ('BankOrCreditUnion' as const),
    '@id': `${SITE_URL}/#partner-${p.id}`,
    name: p.name,
    url: p.href,
    description: p.blurb,
    logo: {
      '@type': 'ImageObject' as const,
      url: `${SITE_URL}${p.logo}`,
      width: p.logoWidth,
      height: p.logoHeight,
    },
    ...(isSchool
      ? {
          address: {
            '@type': 'PostalAddress' as const,
            addressLocality: 'Samarinda',
            addressRegion: 'Kalimantan Timur',
            addressCountry: 'ID',
          },
        }
      : {
          areaServed: [
            { '@type': 'AdministrativeArea' as const, name: 'Kalimantan Timur' },
            { '@type': 'AdministrativeArea' as const, name: 'Kalimantan Utara' },
          ],
        }),
  };
});

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
      knowsAbout: [
        'Sistem informasi sekolah',
        'Virtual Account sekolah',
        'Administrasi akademik',
        ...partnerNames,
      ],
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
      mentions: partnerNodes.map((p) => ({ '@id': p['@id'] })),
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
      hasPart: [
        {
          '@type': 'WebPageElement',
          '@id': `${SITE_URL}/#mitra`,
          name: 'Mitra kerja sama',
          url: `${SITE_URL}/#mitra`,
          description: `Kerja sama Sakolentra dengan ${partnerSummary}.`,
        },
      ],
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
      featureList: [
        ...categories.map((c) => c.label),
        'Virtual Account Bankaltimtara',
        'Integrasi pembayaran sekolah',
      ],
      publisher: { '@id': `${SITE_URL}/#org` },
      author: { '@id': `${SITE_URL}/#person` },
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'administrator',
        audienceType: 'Sekolah dan yayasan pendidikan',
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Andy Pratama',
      url: SOCIAL.cal,
      sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.cal],
      jobTitle: 'Fullstack Software Engineer',
      email: CONTACT_EMAIL,
      homeLocation: {
        '@type': 'Place',
        name: 'Samarinda, Kalimantan Timur',
      },
    },
    ...partnerNodes,
  ],
};
