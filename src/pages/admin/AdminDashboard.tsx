import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StatCard } from '../../components/admin/StatCard';
import { DataTable } from '../../components/admin/DataTable';
import { Package, MessageSquare, Eye, DollarSign, TrendingUp, Users } from 'lucide-react';
import { apiClient } from '../../lib/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardStats {
  overview: {
    totalProducts: number;
    totalMessages: number;
    unreadMessages: number;
    todayViews: number;
    todayRevenue: number;
  };
  last7Days: {
    pageViews: number;
    sales: number;
    revenue: number;
    chartData: Array<{
      date: string;
      pageViews: number;
      sales: number;
      revenue: number;
    }>;
  };
  topProducts: Array<any>;
  recentMessages: Array<any>;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await apiClient.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const chartData = {
    labels: stats.last7Days.chartData.map(d => 
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Page Views',
        data: stats.last7Days.chartData.map(d => d.pageViews),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Sales',
        data: stats.last7Days.chartData.map(d => d.sales),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  const revenueChartData = {
    labels: stats.last7Days.chartData.map(d => 
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Revenue ($)',
        data: stats.last7Days.chartData.map(d => d.revenue),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      }
    ]
  };

  const productColumns = [
    {
      key: 'name',
      label: 'Product',
      render: (product: any) => (
        <div className="flex items-center gap-3">
          {product.images?.[0] && (
            <img 
              src={product.images[0].url} 
              alt={product.name}
              className="w-10 h-10 object-cover rounded"
            />
          )}
          <span className="font-medium">{product.name}</span>
        </div>
      )
    },
    {
      key: 'views',
      label: 'Views',
      render: (product: any) => product.views.toLocaleString()
    },
    {
      key: 'sales',
      label: 'Sales',
      render: (product: any) => product.sales.toLocaleString()
    },
    {
      key: 'price',
      label: 'Price',
      render: (product: any) => `$${product.price.toFixed(2)}`
    }
  ];

  const messageColumns = [
    {
      key: 'name',
      label: 'From'
    },
    {
      key: 'subject',
      label: 'Subject'
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (message: any) => new Date(message.createdAt).toLocaleDateString()
    },
    {
      key: 'isRead',
      label: 'Status',
      render: (message: any) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          message.isRead 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {message.isRead ? 'Read' : 'Unread'}
        </span>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats.overview.totalProducts}
            icon={<Package className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Unread Messages"
            value={stats.overview.unreadMessages}
            icon={<MessageSquare className="w-6 h-6" />}
            color="orange"
          />
          <StatCard
            title="Today's Views"
            value={stats.overview.todayViews.toLocaleString()}
            icon={<Eye className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Today's Revenue"
            value={`$${stats.overview.todayRevenue.toFixed(2)}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
          />
        </div>

        {/* Last 7 Days Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last 7 Days Views</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.last7Days.pageViews.toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last 7 Days Sales</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.last7Days.sales.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last 7 Days Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${stats.last7Days.revenue.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Views & Sales Trend</h3>
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  }
                }
              }} 
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <Bar 
              data={revenueChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Top Products */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <DataTable
            data={stats.topProducts}
            columns={productColumns}
          />
        </div>

        {/* Recent Messages */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <DataTable
            data={stats.recentMessages}
            columns={messageColumns}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
