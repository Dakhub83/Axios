import { listOrders } from "@/lib/orders";
import { paymentMethodLabel } from "@/lib/payments";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  const orders = listOrders();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Test Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <p className="text-foreground/60">
          No orders yet. Add a product, then walk through Shop &rarr; Cart &rarr; Checkout to test the flow.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between text-sm text-foreground/60">
                <span>{new Date(order.createdAt).toLocaleString()}</span>
                <span>{order.status}</span>
              </div>
              <p className="font-semibold mt-1">
                {order.customerName} &mdash; {order.email}
              </p>
              <p className="text-sm text-foreground/70">{order.address}</p>
              <p className="text-sm text-foreground/60 mt-1">Payment: {paymentMethodLabel(order.paymentMethod)}</p>
              <ul className="mt-3 text-sm space-y-1">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.productTitle} ({item.size}) &times; {item.quantity} &mdash; $
                    {(item.unitPrice * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
