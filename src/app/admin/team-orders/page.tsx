import { listTeamOrderInquiries } from "@/lib/teamOrders";

export const dynamic = "force-dynamic";

export default function AdminTeamOrdersPage() {
  const inquiries = listTeamOrderInquiries();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Team Order Inquiries ({inquiries.length})</h2>
      {inquiries.length === 0 ? (
        <p className="text-foreground/60">
          No inquiries yet. Submit the form on the Team Orders page to test it.
        </p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between text-sm text-foreground/60">
                <span>{new Date(inq.createdAt).toLocaleString()}</span>
                <span>{inq.sport}</span>
              </div>
              <p className="font-semibold mt-1">{inq.organization}</p>
              <p className="text-sm text-foreground/70">
                {inq.contactName} &mdash; {inq.email} {inq.phone && `— ${inq.phone}`}
              </p>
              <p className="text-sm mt-2">Roster / quantity: {inq.rosterSize}</p>
              {inq.targetDate && <p className="text-sm">Target date: {inq.targetDate}</p>}
              {inq.currentSupplier && <p className="text-sm">Current supplier: {inq.currentSupplier}</p>}
              {inq.message && <p className="text-sm mt-2 text-foreground/80">{inq.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
