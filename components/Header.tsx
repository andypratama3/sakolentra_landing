'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/lib/icons';
import BrandLogo from './BrandLogo';
import SearchDialog from './SearchDialog';

const THEME_KEY = 'sk-theme';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mac, setMac] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
    const root = document.documentElement;
    const initial =
      root.dataset.theme ??
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial === 'dark' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
      // Migrate away from legacy key.
      localStorage.removeItem('ps-theme');
    } catch {}
  };

  return (
    <>
      <header className="site">
        <a className="logo" href="#hero" aria-label="Sakolentra — beranda">
          <BrandLogo priority />
        </a>
        <span className="sp" />
        <button type="button" className="ib" onClick={() => setSearchOpen(true)} aria-label="Cari">
          <Icon name="search" />
          <span className="lbl">Cari</span>
          <kbd>{mac ? '⌘K' : 'Ctrl K'}</kbd>
        </button>
        <button
          type="button"
          className="ib"
          onClick={toggleTheme}
          aria-label="Ganti tema"
          aria-pressed={theme === 'dark'}
          title={theme === 'dark' ? 'Mode gelap aktif' : 'Mode terang aktif'}
        >
          <Icon name="sun-moon" />
        </button>
        <a className="btn p" href="#cta" aria-label="Hubungi atau book call" style={{ padding: '8px 14px' }}>
          <Icon name="calendar-check" />
          <span className="lbl">Kontak</span>
        </a>
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
