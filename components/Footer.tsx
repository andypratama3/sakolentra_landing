import BrandLogo from './BrandLogo';
import { BRAND } from '@/lib/brand';

export default function Footer() {
  return (
    <footer className="site">
      <a className="logo" href="#hero" aria-label={`${BRAND.name} — beranda`}>
        <BrandLogo />
      </a>
      <span className="sp" />
      <nav aria-label="Navigasi bawah">
        <a href="#fit">Fitur</a>
        <a href="#flow">Alur</a>
        <a href="#mitra">Mitra</a>
        <a href="#tentang">Tentang</a>
        <a href="#cta">Kontak</a>
      </nav>
      <span className="mu">© 2026 {BRAND.name}</span>
    </footer>
  );
}
