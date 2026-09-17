type Variant = "light" | "reversed";

const RAMP: Record<Variant, { fill: string; op: [number, number, number] }> = {
  light: { fill: "#4C5CC9", op: [0.32, 0.56, 0.86] },
  reversed: { fill: "#8E9BEA", op: [0.5, 0.72, 1] },
};

const GOLD = "#F0C24A";

/**
 * Primary mark. Nine dots narrowing into one gold brief.
 * Below 24px tall, pass reduced so the dot count drops from 9 to 5.
 */
export function MondayBriefsMark({
  size = 34,
  variant = "light",
  reduced,
  title = "Monday Briefs",
}: {
  size?: number;
  variant?: Variant;
  reduced?: boolean;
  title?: string;
}) {
  const { fill, op } = RAMP[variant];
  const small = reduced ?? size < 24;

  if (small) {
    return (
      <svg viewBox="0 0 31 24" height={size} width={(size * 31) / 24} role="img" aria-label={title}>
        <g fill={fill}>
          <circle cx="2" cy="2" r="2" opacity={op[0] + 0.08} />
          <circle cx="2" cy="12" r="2" opacity={op[0] + 0.08} />
          <circle cx="2" cy="22" r="2" opacity={op[0] + 0.08} />
          <circle cx="12" cy="7" r="2" opacity={op[1] + 0.16} />
          <circle cx="12" cy="17" r="2" opacity={op[1] + 0.16} />
        </g>
        <rect x="21" y="5" width="10" height="14" rx="2.5" fill={GOLD} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 42 34" height={size} width={(size * 42) / 34} role="img" aria-label={title}>
      <g fill={fill}>
        {[2, 12, 22, 32].map((cy) => (
          <circle key={cy} cx="2" cy={cy} r="2" opacity={op[0]} />
        ))}
        {[7, 17, 27].map((cy) => (
          <circle key={cy} cx="12" cy={cy} r="2" opacity={op[1]} />
        ))}
        {[12, 22].map((cy) => (
          <circle key={cy} cx="22" cy={cy} r="2" opacity={op[2]} />
        ))}
      </g>
      <rect x="31" y="10" width="11" height="14" rx="2.5" fill={GOLD} />
    </svg>
  );
}

/** App icon / favicon: indigo tile, white dots, gold brief. */
export function MondayBriefsIcon({ size = 48, radius = 11 }: { size?: number; radius?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role="img" aria-label="Monday Briefs">
      <rect width="48" height="48" rx={radius} fill="#4C5CC9" />
      <g fill="#FFFFFF">
        {[15, 24, 33].map((cy) => (
          <circle key={cy} cx="13" cy={cy} r="2.4" opacity={0.55} />
        ))}
        {[19.5, 28.5].map((cy) => (
          <circle key={cy} cx="23" cy={cy} r="2.4" opacity={0.85} />
        ))}
      </g>
      <rect x="31" y="19" width="8" height="10" rx="2" fill={GOLD} />
    </svg>
  );
}

/**
 * Canonical horizontal lockup. The wordmark is live text, not outlines,
 * so it inherits Instrument Sans from the page and stays selectable.
 */
export function MondayBriefsLockup({
  size = 26,
  variant = "light",
}: {
  size?: number;
  variant?: Variant;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.5,
        color: variant === "reversed" ? "#FFFFFF" : "#1E2536",
      }}
    >
      <MondayBriefsMark size={size * 1.15} variant={variant} />
      <span
        style={{
          fontFamily: '"Instrument Sans", system-ui, sans-serif',
          fontSize: size,
          fontWeight: 600,
          letterSpacing: "-0.024em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Monday Briefs
      </span>
    </span>
  );
}
