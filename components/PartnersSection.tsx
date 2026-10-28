import Image from 'next/image';
import { Icon } from '@/lib/icons';
import { partners } from '@/data/partners';

export default function PartnersSection() {
  return (
    <section className="s partners" id="mitra" aria-label="Mitra kerja sama">
      <div className="partner-glow" aria-hidden="true" />

      <p className="eyebrow rv">Kerja sama</p>
      <h2 className="rv partner-heading">Mitra bank dan sekolah yang sudah berjalan.</h2>
      <p className="lead mu rv">
        Sakolentra dipakai di lapangan bersama mitra pembayaran daerah dan sekolah kreatif di
        Samarinda — Virtual Account masuk, operasional sekolah ikut rapi.
      </p>

      <ul className="partner-logos rv">
        {partners.map((p) => (
          <li key={p.id}>
            <a
              className={`partner-tile partner-tile--${p.orientation ?? 'landscape'}`}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} — ${p.role}`}
            >
              <span className="partner-tile-logo">
                <Image
                  src={p.logo}
                  alt={`Logo ${p.name}`}
                  width={p.logoWidth}
                  height={p.logoHeight}
                  sizes="(max-width: 520px) 88vw, (max-width: 820px) 62vw, 360px"
                  className="partner-img"
                />
              </span>
              <span className="partner-tile-meta">
                <span className="partner-role-line">
                  <Icon name={p.roleIcon} />
                  {p.role}
                </span>
                <span className="partner-tile-name">{p.name}</span>
                <span className="partner-tile-blurb mu">{p.blurb}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="partner-detail-grid rv">
        {partners.map((p) =>
          p.highlights?.length ? (
            <div className="partner-detail" key={`${p.id}-detail`}>
              <h3>{p.name}</h3>
              <ul className="partner-points">
                {p.highlights.map((h) => (
                  <li key={h.title}>
                    <span className="partner-point-ic" aria-hidden="true">
                      <Icon name={h.icon} />
                    </span>
                    <span>
                      <strong>{h.title}</strong>
                      <span className="mu">{h.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null,
        )}
      </div>

      <div className="row rv" style={{ marginTop: 28 }}>
        <a className="btn p" href="#cta">
          <Icon name="calendar-check" />
          Diskusikan kerja sama
        </a>
        <a className="btn" href="#fit">
          <Icon name="layout-grid" />
          Lihat fitur
        </a>
      </div>
    </section>
  );
}
