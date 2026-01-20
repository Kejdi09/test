import express from 'express';
import Message from '../models/Message.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create message (public - from contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { message: newMessage }
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message' 
    });
  }
});

// Get all messages (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { isRead, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Message.countDocuments(query);
    const unreadCount = await Message.countDocuments({ isRead: false });

    res.json({
      success: true,
      data: {
        messages,
        unreadCount,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch messages' 
    });
  }
});

// Get single message (admin only)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    // Mark as read when viewing
    if (!message.isRead) {
      message.isRead = true;
      await message.save();
    }

    res.json({
      success: true,
      data: { message }
    });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch message' 
    });
  }
});

// Mark message as read/unread (admin only)
router.patch('/:id/read', authenticate, isAdmin, async (req, res) => {
  try {
    const { isRead } = req.body;
    
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    message.isRead = isRead;
    await message.save();

    res.json({
      success: true,
      message: 'Message status updated',
      data: { message }
    });
  } catch (error) {
    console.error('Update message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update message' 
    });
  }
});

// Reply to message (admin only)
router.post('/:id/reply', authenticate, isAdmin, async (req, res) => {
  try {
    const { reply } = req.body;
    
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    message.reply = reply;
    message.repliedAt = new Date();
    message.isRead = true;
    await message.save();

    // Here you would typically send an email to the user
    // For now, we'll just return success

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: { message }
    });
  } catch (error) {
    console.error('Reply error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send reply' 
    });
  }
});

// Delete message (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete message' 
    });
  }
});

export default router;
