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

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt: string;
};

const Admin = () => {
  const [orders, setOrders] = useState<OrderRequest[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

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

  const fetchMessages = async () => {
    setMessagesError('');
    setMessagesLoading(true);
    try {
      const res = await apiClient.getMessages({ limit: 100 });
      setMessages(res.data?.messages || []);
      setUnreadCount(res.data?.unreadCount || 0);
    } catch (error: any) {
      setMessagesError(error.message || 'Failed to load contact messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMessages();
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
        <div className="max-w-6xl mx-auto space-y-12">
          <section>
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
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Contact Messages</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                )}
              </div>
              <button
                type="button"
                onClick={fetchMessages}
                className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
                disabled={messagesLoading}
              >
                {messagesLoading ? 'Refreshing…' : 'Refresh'}
              </button>
            </div>

            {messagesError && <p className="text-sm text-destructive mb-4">{messagesError}</p>}
            {!messagesError && messages.length === 0 && !messagesLoading && (
              <p className="text-sm text-muted-foreground">No contact messages yet.</p>
            )}

            <div className="overflow-x-auto bg-muted/40 border border-border rounded-lg">
              <table className="min-w-full text-sm font-body">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-2 px-4">From</th>
                    <th className="py-2 px-4">Subject</th>
                    <th className="py-2 px-4">Message</th>
                    <th className="py-2 px-4">Created</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg._id} className="border-b border-border last:border-0">
                      <td className="py-2 px-4 text-foreground align-top">
                        <div className="font-medium">{msg.name}</div>
                        <div className="text-xs text-muted-foreground">{msg.email}</div>
                      </td>
                      <td className="py-2 px-4 text-foreground align-top whitespace-nowrap">{msg.subject}</td>
                      <td className="py-2 px-4 text-muted-foreground align-top max-w-xs">
                        {msg.message.length > 120 ? `${msg.message.slice(0, 120)}…` : msg.message}
                      </td>
                      <td className="py-2 px-4 text-muted-foreground align-top whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-foreground align-top">
                        {msg.isRead ? 'Read' : 'Unread'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
