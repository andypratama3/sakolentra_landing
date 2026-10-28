import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { features } from '@/data/features';
import { flows } from '@/data/flows';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const alt = `${SITE_NAME} — Sistem Sekolah Terintegrasi`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const mark = await readFile(
    join(process.cwd(), 'public/brand/mark-s-wisuda-256.png'),
  );
  const logoSrc = `data:image/png;base64,${mark.toString('base64')}`;
  const host = new URL(SITE_URL).host;

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
          background: 'linear-gradient(135deg, #0a0b0a 0%, #101a11 100%)',
          color: '#f2f4f0',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={88}
            height={88}
            style={{ borderRadius: 18 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
              {SITE_NAME}
            </div>
            <div style={{ display: 'flex', fontSize: 22, color: '#97a096' }}>
              Sistem Sekolah Terintegrasi
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -2,
            maxWidth: 1020,
          }}
        >
          Semua kebutuhan sekolah, terhubung dalam satu sistem.
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#97a096',
          }}
        >
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex' }}>{features.length} fitur</div>
            <div style={{ display: 'flex' }}>·</div>
            <div style={{ display: 'flex' }}>{flows.length} alur</div>
          </div>
          <div style={{ display: 'flex', color: '#5ce70b' }}>{host}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
