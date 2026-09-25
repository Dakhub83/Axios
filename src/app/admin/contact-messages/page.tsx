import { listContactMessages } from "@/lib/contact";

export const dynamic = "force-dynamic";

export default function AdminContactMessagesPage() {
  const messages = listContactMessages();
  const emailNotConfigured = messages.length > 0 && messages.every((m) => !m.emailed);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Contact Messages ({messages.length})</h2>
      {emailNotConfigured && (
        <p className="text-sm text-foreground/60 mb-6">
          SMTP isn&apos;t configured yet, so these are captured here only — set SMTP_HOST /
          SMTP_USER / SMTP_PASS / CONTACT_TO_EMAIL in your env to also email them to you.
        </p>
      )}
      {messages.length === 0 ? (
        <p className="text-foreground/60">
          No messages yet. Submit the form on the Contact Us page to test it.
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between text-sm text-foreground/60">
                <span>{new Date(m.createdAt).toLocaleString()}</span>
                <span className="text-xs uppercase tracking-widest">
                  {m.emailed ? "Emailed" : "Not emailed"}
                </span>
              </div>
              <p className="font-semibold mt-1">{m.subject || "(no subject)"}</p>
              <p className="text-sm text-foreground/70">
                {m.name} &mdash; {m.email}
              </p>
              <p className="text-sm mt-2 whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
