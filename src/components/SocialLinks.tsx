import Link from "next/link";

// Placeholder hrefs — swap in the real profile URLs once the accounts exist.
const socials = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Facebook", href: "#" },
];

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="2.5" width="15" height="15" rx="4" />
      <circle cx="10" cy="10" r="3.4" />
      <circle cx="14.3" cy="5.7" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 3v9.6a2.6 2.6 0 11-2.1-2.55" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 3c.3 1.9 1.8 3.4 3.6 3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="2.5" width="15" height="15" rx="4" />
      <path d="M11.6 7.3h-1.1c-.75 0-1.35.6-1.35 1.35v1.15h2.3l-.3 2.1h-2v4.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const icons = { Instagram: InstagramIcon, TikTok: TikTokIcon, Facebook: FacebookIcon };

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socials.map(({ label, href }) => {
        const Icon = icons[label as keyof typeof icons];
        return (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className="text-foreground/60 transition-colors hover:text-accent"
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
}
