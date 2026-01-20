import express from 'express';
import jwt from 'jsonwebtoken';
import OrderRequest from '../models/OrderRequest.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is required');
  }
  return secret;
};

router.post('/request', async (req, res) => {
  try {
    const { token, email, items = [], totals = {}, note = '' } = req.body || {};
    if (!token || !email) {
      return res.status(400).json({ success: false, message: 'Email and verification token are required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, getJwtSecret());
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    if (decoded.email?.toLowerCase() !== email.toLowerCase() || decoded.scope !== 'email-verified') {
      return res.status(401).json({ success: false, message: 'Token does not match email' });
    }

    const cleanItems = Array.isArray(items)
      ? items.map((item) => ({
          productId: item.id || item.productId || '',
          name: item.name,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
          image: item.image,
        }))
      : [];

    const cleanTotals = {
      subtotal: Number(totals.subtotal) || 0,
      shipping: Number(totals.shipping) || 0,
      total: Number(totals.total) || 0,
    };

    const order = new OrderRequest({
      email,
      items: cleanItems,
      totals: cleanTotals,
      note,
      source: 'cart',
    });

    await order.save();

    res.status(201).json({ success: true, message: 'Order request saved', data: { orderId: order._id } });
  } catch (error) {
    console.error('order request error:', error);
    res.status(500).json({ success: false, message: 'Failed to save order request' });
  }
});

// Admin: list saved order requests
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { limit = 100 } = req.query;
    const orders = await OrderRequest.find()
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(limit) || 100, 500));

    res.json({ success: true, data: { orders } });
  } catch (error) {
    console.error('list order requests error:', error);
    res.status(500).json({ success: false, message: 'Failed to load order requests' });
  }
});

export default router;
