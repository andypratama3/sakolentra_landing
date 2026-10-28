import { BRAND } from '@/lib/brand';

type Props = {
  /** `full` = wordmark PNG; `mark` = icon only; `lockup` = mark + colored text (best for dark/light, no plate). */
  variant?: 'full' | 'mark' | 'lockup';
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  variant = 'lockup',
  className,
  priority = false,
}: Props) {
  if (variant === 'lockup') {
    return (
      <span className={`brand-lockup ${className ?? ''}`.trim()}>
        <img
          src={BRAND.logo.mark}
          alt=""
          width={256}
          height={256}
          className="brand-lockup-mark"
          decoding="async"
          {...(priority
            ? { fetchPriority: 'high' as const }
            : { loading: 'lazy' as const })}
        />
        <span className="brand-lockup-text" aria-hidden="true">
          <span className="brand-sako">SAKO</span>
          <span className="brand-lentra">LENTRA</span>
        </span>
        <span className="sr-only">{BRAND.name}</span>
      </span>
    );
  }

  const src = variant === 'mark' ? BRAND.logo.mark : BRAND.logo.full;
  const alt = `${BRAND.name} — ${BRAND.shortTagline}`;

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={variant === 'mark' ? 256 : BRAND.logo.fullWidth}
      height={variant === 'mark' ? 256 : BRAND.logo.fullHeight}
      decoding="async"
      {...(priority
        ? { fetchPriority: 'high' as const }
        : { loading: 'lazy' as const })}
    />
  );
}
