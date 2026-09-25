function CardGlyph() {
  return (
    <svg viewBox="0 0 20 14" className="h-3.5 w-5 shrink-0" aria-hidden="true" fill="none">
      <rect x="0.5" y="0.5" width="19" height="13" rx="2" stroke="currentColor" />
      <rect x="0.5" y="3.5" width="19" height="2.5" fill="currentColor" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="currentColor">
      <path d="M8.6 3.4c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.8.7.1 1.3-.3 1.7-.8Z" />
      <path d="M11 8.4c0-1.6 1.3-2.4 1.4-2.5-.7-1.1-1.9-1.2-2.3-1.2-1-.1-1.9.6-2.4.6-.5 0-1.3-.6-2.1-.5-1.1 0-2.1.6-2.6 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.2 1.7 2 1.6.8 0 1.1-.5 2.1-.5.9 0 1.2.5 2.1.5.9 0 1.4-.8 2-1.6.6-.9.9-1.7.9-1.8 0 0-1.9-.7-1.9-2.7Z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" />
      <path d="M8 8h4.2" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function PaypalGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="none">
      <path
        d="M5 3h3.5a2.5 2.5 0 0 1 0 5H6l-1 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 5h3.5a2.5 2.5 0 0 1 0 5H8l-1 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

function InstallmentGlyph() {
  return (
    <svg viewBox="0 0 16 10" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="none" stroke="currentColor">
      <rect x="0.5" y="5.5" width="3" height="4" rx="0.5" />
      <rect x="4.5" y="3.5" width="3" height="6" rx="0.5" opacity="0.8" />
      <rect x="8.5" y="1.5" width="3" height="8" rx="0.5" opacity="0.55" />
      <rect x="12.5" y="0.5" width="3" height="9" rx="0.5" opacity="0.3" />
    </svg>
  );
}

const paymentChips = [
  { label: "Visa", glyph: <CardGlyph /> },
  { label: "Mastercard", glyph: <CardGlyph /> },
  { label: "Amex", glyph: <CardGlyph /> },
  { label: "Discover", glyph: <CardGlyph /> },
  { label: "Apple Pay", glyph: <AppleGlyph /> },
  { label: "Google Pay", glyph: <GoogleGlyph /> },
  { label: "PayPal", glyph: <PaypalGlyph /> },
  { label: "Klarna", glyph: <InstallmentGlyph /> },
  { label: "Afterpay", glyph: <InstallmentGlyph /> },
  { label: "Sezzle", glyph: <InstallmentGlyph /> },
];

export default function PaymentIcons() {
  return (
    <ul aria-label="Accepted payment methods" className="flex flex-wrap justify-center gap-2 lg:justify-end">
      {paymentChips.map((chip) => (
        <li
          key={chip.label}
          className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-foreground/70 transition-colors hover:border-accent hover:text-accent"
        >
          {chip.glyph}
          <span className="text-[10px] font-semibold uppercase tracking-wider">{chip.label}</span>
        </li>
      ))}
    </ul>
  );
}
