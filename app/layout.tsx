import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import { BRAND } from '@/lib/brand';
import {
  INDEXABLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  jsonLd,
} from '@/lib/seo';
import { SOCIAL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  category: 'education',
  authors: [{ name: 'Andy Pratama', url: SOCIAL.portfolio }],
  creator: 'Andy Pratama',
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  formatDetection: { email: false, address: false, telephone: false },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: '@andypratama3_',
    creator: '@andypratama3_',
  },
  robots: INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : { index: false, follow: false },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GSC_VERIFICATION ||
      'XShhQ1RuY_570n6Lv4mG5Dk38o62_KeZmWjhlSswwMg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: BRAND.colors.bgLight },
    { media: '(prefers-color-scheme: dark)', color: BRAND.colors.bgDark },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="me" href={SOCIAL.portfolio} />
        <link rel="me" href={SOCIAL.github} />
        <link rel="me" href={SOCIAL.linkedin} />
        <link rel="me" href={SOCIAL.jobstreet} />
        <link rel="me" href={SOCIAL.instagram} />
        <link rel="me" href={SOCIAL.x} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('sk-theme')||localStorage.getItem('ps-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
        <JsonLd data={jsonLd} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Lewati ke konten utama
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
