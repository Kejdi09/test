import { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { apiClient } from '@/lib/api';

type OrderItem = {
  name: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  price?: number;
};

type OrderRequest = {
  _id: string;
  email: string;
  createdAt: string;
  items: OrderItem[];
  totals?: { total?: number; subtotal?: number; shipping?: number };
};

const Admin = () => {
  const [orders, setOrders] = useState<OrderRequest[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  const fetchOrders = async () => {
    setOrdersError('');
    setOrdersLoading(true);
    try {
      const res = await apiClient.getOrderRequests(100);
      setOrders(res.data?.orders || []);
    } catch (error: any) {
      setOrdersError(error.message || 'Failed to load order requests');
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formattedOrders = useMemo(() => {
    return orders.map((order) => {
      const total = order.totals?.total ?? order.totals?.subtotal ?? 0;
      const created = new Date(order.createdAt).toLocaleString();
      return { ...order, total, created };
    });
  }, [orders]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Order Requests</h1>
            <button
              type="button"
              onClick={fetchOrders}
              className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
              disabled={ordersLoading}
            >
              {ordersLoading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {ordersError && <p className="text-sm text-destructive mb-4">{ordersError}</p>}
          {!ordersError && formattedOrders.length === 0 && !ordersLoading && (
            <p className="text-sm text-muted-foreground">No order requests yet.</p>
          )}

          <div className="overflow-x-auto bg-muted/40 border border-border rounded-lg">
            <table className="min-w-full text-sm font-body">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Items</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {formattedOrders.map((order) => (
                  <tr key={order._id} className="border-b border-border last:border-0">
                    <td className="py-2 px-4 text-foreground align-top">{order.email}</td>
                    <td className="py-2 px-4 text-foreground align-top">
                      {order.items.map((item) => (
                        <div
                          key={`${order._id}-${item.name}-${item.selectedSize}-${item.selectedColor}`}
                          className="text-xs text-muted-foreground"
                        >
                          {item.name} · x{item.quantity}
                          {item.selectedSize ? ` · ${item.selectedSize}` : ''}
                          {item.selectedColor ? ` · ${item.selectedColor}` : ''}
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 text-foreground align-top">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-4 text-muted-foreground align-top whitespace-nowrap">{order.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
