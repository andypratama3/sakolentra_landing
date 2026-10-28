'use client';

import { useEffect } from 'react';
import { Icon } from '@/lib/icons';
import { CAL_EVENTS, CAL_PROFILE_URL, CAL_USERNAME } from '@/lib/site';

declare global {
  interface Window {
    Cal?: ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[];
    };
    __calStarted?: boolean;
  }
}

const CAL_SCRIPT = 'https://app.cal.com/embed/embed.js';

function initCal() {
  if (typeof window === 'undefined' || window.__calStarted) return;
  window.__calStarted = true;

  if (!window.Cal) {
    const cal = ((...args: unknown[]) => {
      (cal.q = cal.q ?? []).push(args);
    }) as NonNullable<Window['Cal']>;
    cal.q = [];
    cal.ns = {};
    window.Cal = cal;

    const script = document.createElement('script');
    script.src = CAL_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }

  window.Cal('init', { origin: 'https://cal.com' });
  window.Cal('ui', {
    hideEventTypeDetails: false,
    layout: 'month_view',
    theme: 'light',
  });
}

type Props = {
  /** Compact row of booking CTAs, or a single primary button. */
  variant?: 'buttons' | 'cards';
  className?: string;
};

export default function CalBook({ variant = 'buttons', className }: Props) {
  useEffect(() => {
    initCal();
  }, []);

  if (variant === 'cards') {
    return (
      <div className={className}>
        <div className="cal-cards">
          {CAL_EVENTS.map((ev) => (
            <a
              key={ev.id}
              className="cal-card"
              href={ev.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cal-link={`${CAL_USERNAME}/${ev.slug}`}
              data-cal-config='{"layout":"month_view"}'
              aria-label={`Jadwalkan ${ev.label}: ${ev.desc}`}
            >
              <span className="cal-card-icon" aria-hidden="true">
                <Icon name="calendar-check" />
              </span>
              <strong>{ev.label}</strong>
              <span className="mu">{ev.desc}</span>
            </a>
          ))}
          <a
            className="cal-card cal-card-all"
            href={CAL_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cal-link={CAL_USERNAME}
            data-cal-config='{"layout":"month_view"}'
            aria-label="Lihat semua slot di Cal.com"
          >
            <span className="cal-card-icon" aria-hidden="true">
              <Icon name="calendar-days" />
            </span>
            <strong>Semua slot</strong>
            <span className="mu">Buka halaman Cal.com</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`row ${className ?? ''}`} style={{ justifyContent: 'center' }}>
      <a
        className="btn p"
        href={CAL_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cal-link={CAL_USERNAME}
        data-cal-config='{"layout":"month_view"}'
        aria-label="Jadwalkan panggilan di Cal.com"
      >
        <Icon name="calendar-check" />
        Jadwalkan panggilan
      </a>
      {CAL_EVENTS.map((ev) => (
        <a
          key={ev.id}
          className="btn"
          href={ev.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cal-link={`${CAL_USERNAME}/${ev.slug}`}
          data-cal-config='{"layout":"month_view"}'
          aria-label={`Booking ${ev.label}`}
        >
          {ev.label}
        </a>
      ))}
    </div>
  );
}
