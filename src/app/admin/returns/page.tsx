import { listReturnRequests } from "@/lib/returns";

export const dynamic = "force-dynamic";

const resolutionLabel: Record<string, string> = {
  refund: "Refund",
  exchange: "Exchange",
  store_credit: "Store credit",
};

export default function AdminReturnsPage() {
  const requests = listReturnRequests();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Return Requests ({requests.length})</h2>
      {requests.length === 0 ? (
        <p className="text-foreground/60">
          No return requests yet. Submit the form on the Return an Item page to test it.
        </p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between text-sm text-foreground/60">
                <span>{new Date(r.createdAt).toLocaleString()}</span>
                <span>{resolutionLabel[r.resolution] ?? r.resolution}</span>
              </div>
              <p className="font-semibold mt-1">{r.itemDescription}</p>
              <p className="text-sm text-foreground/70">
                {r.orderEmail} {r.orderNumber && `— Order #${r.orderNumber}`}
              </p>
              <p className="text-sm mt-2">Reason: {r.reason}</p>
              {r.details && <p className="text-sm mt-2 text-foreground/80">{r.details}</p>}
              <p className="text-xs uppercase tracking-widest text-foreground/50 mt-2">{r.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
