import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { inventory } from '@/data/inventory';
import { partners } from '@/data/partners';
import { BRAND } from '@/lib/brand';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const alt = `${SITE_NAME} — mitra ${partners.map((p) => p.name).join(' & ')}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const mark = await readFile(
    join(process.cwd(), 'public/brand/mark-s-wisuda-256.png'),
  );
  const logoSrc = `data:image/png;base64,${mark.toString('base64')}`;
  const host = new URL(SITE_URL).host;
  const partnerLine = partners.map((p) => p.name).join('  ·  ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(135deg, #050910 0%, #063066 48%, #026b48 100%)',
          color: '#f2f7ff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={96}
            height={96}
            style={{ background: 'transparent' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
              <span style={{ color: BRAND.colors.blueBright }}>SAKO</span>
              <span style={{ color: BRAND.colors.greenBright }}>LENTRA</span>
            </div>
            <div style={{ display: 'flex', fontSize: 20, color: '#93a8c2', maxWidth: 720 }}>
              {BRAND.shortTagline}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 1040,
          }}
        >
          Mitra bank & sekolah yang sudah berjalan di lapangan.
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            fontSize: 24,
            color: '#8fa0b5',
          }}
        >
          <div style={{ display: 'flex', color: '#c5d4e8' }}>{partnerLine}</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex' }}>{inventory.features} fitur</div>
              <div style={{ display: 'flex' }}>·</div>
              <div style={{ display: 'flex' }}>{inventory.flows} alur</div>
            </div>
            <div style={{ display: 'flex', color: '#1af0a0' }}>{host}</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
