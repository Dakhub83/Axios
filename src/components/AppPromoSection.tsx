import QRCode from "qrcode";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://axios.example";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-5 w-5 shrink-0" aria-hidden="true" fill="currentColor">
      <path d="M8.6 3.4c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.8.7.1 1.3-.3 1.7-.8Z" />
      <path d="M11 8.4c0-1.6 1.3-2.4 1.4-2.5-.7-1.1-1.9-1.2-2.3-1.2-1-.1-1.9.6-2.4.6-.5 0-1.3-.6-2.1-.5-1.1 0-2.1.6-2.6 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.2 1.7 2 1.6.8 0 1.1-.5 2.1-.5.9 0 1.2.5 2.1.5.9 0 1.4-.8 2-1.6.6-.9.9-1.7.9-1.8 0 0-1.9-.7-1.9-2.7Z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-5 w-5 shrink-0" aria-hidden="true" fill="none">
      <path d="M3 3l7 5-7 5V3Z" fill="currentColor" />
      <path d="M10 8l3-1.8L10.5 4 10 8Z" fill="currentColor" opacity="0.7" />
      <path d="M10 8l3 1.8-2.5 2.2L10 8Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function StoreBadge({ glyph, name }: { glyph: React.ReactNode; name: string }) {
  return (
    <div
      aria-disabled="true"
      className="relative flex items-center gap-3 rounded-xl border border-border py-3 pl-4 pr-5 pt-4 text-foreground/50"
    >
      <span className="absolute -top-2 right-3 rounded-full border border-accent bg-background px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent">
        Coming Soon
      </span>
      {glyph}
      <p className="text-sm font-semibold text-foreground/70">{name}</p>
    </div>
  );
}

export default async function AppPromoSection() {
  const qrSvg = await QRCode.toString(SITE_URL, {
    type: "svg",
    margin: 0,
    color: { dark: "#c9a24b", light: "#00000000" },
  });

  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(201,162,75,0.12),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(201,162,75,0.08),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 py-24 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">Axios App</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            Axios in Your Pocket.
            <br />
            Speed. Access. Performance.
          </h2>
          <p className="mt-5 max-w-md text-foreground/70 leading-relaxed">
            Download the Axios app for exclusive early access to drops, instant biometric fit
            tracking, and lightning-fast checkout.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <StoreBadge glyph={<AppleGlyph />} name="App Store" />
            <StoreBadge glyph={<GoogleGlyph />} name="Google Play" />
          </div>

          <div className="mt-10 hidden sm:flex items-center gap-4 rounded-xl border border-border p-4 w-fit">
            <div
              className="h-20 w-20 shrink-0 [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <div>
              <p className="text-xs uppercase tracking-widest text-foreground/50">Scan to Visit</p>
              <p className="mt-1 text-sm text-foreground/70">Open Axios on your phone.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 scale-110 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="animate-[float_6s_ease-in-out_infinite] w-64 rounded-[2.5rem] border border-border bg-muted p-3 shadow-2xl shadow-black/50 sm:w-72">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-background aspect-[9/19]">
                <div className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-border" />

                <div className="flex h-full flex-col px-4 pt-10 pb-4">
                  <p className="font-serif text-xs tracking-[0.2em] uppercase text-center">Axios</p>

                  <div className="mt-6 rounded-lg bg-linear-to-br from-muted via-muted to-background aspect-square" />

                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-3/4 rounded-full bg-border" />
                    <div className="h-2 w-1/2 rounded-full bg-border" />
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-linear-to-br from-muted via-muted to-background aspect-[4/5]" />
                    <div className="rounded-md bg-linear-to-br from-muted via-muted to-background aspect-[4/5]" />
                  </div>

                  <div className="mt-3 rounded-full bg-accent py-2 text-center text-[10px] font-semibold uppercase tracking-widest text-black">
                    Quick Add
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
