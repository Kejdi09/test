import express from 'express';
import Analytics from '../models/Analytics.js';
import Product from '../models/Product.js';
import Message from '../models/Message.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard stats (admin only)
router.get('/dashboard', authenticate, isAdmin, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date(today);
    last30Days.setDate(last30Days.getDate() - 30);

    // Get analytics for different periods
    const todayAnalytics = await Analytics.findOne({ date: today });
    const last7DaysAnalytics = await Analytics.find({ 
      date: { $gte: last7Days } 
    }).sort({ date: 1 });
    const last30DaysAnalytics = await Analytics.find({ 
      date: { $gte: last30Days } 
    }).sort({ date: 1 });

    // Calculate totals
    const totalProducts = await Product.countDocuments();
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ isRead: false });

    // Calculate last 7 days totals
    const last7DaysTotals = last7DaysAnalytics.reduce((acc, day) => ({
      pageViews: acc.pageViews + day.pageViews,
      uniqueVisitors: acc.uniqueVisitors + day.uniqueVisitors,
      sales: acc.sales + day.sales,
      revenue: acc.revenue + day.revenue
    }), { pageViews: 0, uniqueVisitors: 0, sales: 0, revenue: 0 });

    // Get top products
    const topProducts = await Product.find()
      .sort({ sales: -1 })
      .limit(5)
      .select('name sales views price images');

    // Get recent messages
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt isRead');

    res.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalMessages,
          unreadMessages,
          todayViews: todayAnalytics?.pageViews || 0,
          todayRevenue: todayAnalytics?.revenue || 0
        },
        last7Days: {
          ...last7DaysTotals,
          chartData: last7DaysAnalytics.map(day => ({
            date: day.date,
            pageViews: day.pageViews,
            sales: day.sales,
            revenue: day.revenue
          }))
        },
        last30Days: {
          chartData: last30DaysAnalytics.map(day => ({
            date: day.date,
            pageViews: day.pageViews,
            sales: day.sales,
            revenue: day.revenue
          }))
        },
        topProducts,
        recentMessages
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch dashboard stats' 
    });
  }
});

// Get sales analytics (admin only)
router.get('/sales', authenticate, isAdmin, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let startDate = new Date(today);
    if (period === '7d') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === '30d') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === '90d') {
      startDate.setDate(startDate.getDate() - 90);
    }

    const analytics = await Analytics.find({ 
      date: { $gte: startDate } 
    }).sort({ date: 1 });

    const totalSales = analytics.reduce((sum, day) => sum + day.sales, 0);
    const totalRevenue = analytics.reduce((sum, day) => sum + day.revenue, 0);
    const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

    res.json({
      success: true,
      data: {
        totalSales,
        totalRevenue,
        avgOrderValue,
        chartData: analytics.map(day => ({
          date: day.date,
          sales: day.sales,
          revenue: day.revenue
        }))
      }
    });
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch sales analytics' 
    });
  }
});

// Get product analytics (admin only)
router.get('/products', authenticate, isAdmin, async (req, res) => {
  try {
    const products = await Product.find()
      .select('name category views sales revenue')
      .sort({ views: -1 });

    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalSales: { $sum: '$sales' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        products,
        categoryStats
      }
    });
  } catch (error) {
    console.error('Get product analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch product analytics' 
    });
  }
});

// Record analytics event (internal use)
router.post('/event', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let analytics = await Analytics.findOne({ date: today });
    
    if (!analytics) {
      analytics = new Analytics({ date: today });
    }

    switch (type) {
      case 'pageView':
        analytics.pageViews += 1;
        break;
      case 'productView':
        analytics.productViews.set(data.productId, 
          (analytics.productViews.get(data.productId) || 0) + 1);
        break;
      case 'sale':
        analytics.sales += 1;
        analytics.revenue += data.amount || 0;
        break;
      default:
        break;
    }

    await analytics.save();

    res.json({
      success: true,
      message: 'Event recorded'
    });
  } catch (error) {
    console.error('Record event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to record event' 
    });
  }
});

export default router;
