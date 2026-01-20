import express from 'express';
import Product from '../models/Product.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, page = 1, limit = 12, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch products' 
    });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch product' 
    });
  }
});

// Create product (admin only)
router.post('/', authenticate, isAdmin, upload.array('images', 5), async (req, res) => {
  try {
    console.log('Create product request received');
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    
    const productData = JSON.parse(req.body.data || '{}');
    
    // Process uploaded images
    const images = req.files?.map((file, index) => ({
      url: `/uploads/${file.filename}`,
      alt: productData.name,
      isPrimary: index === 0
    })) || [];

    const product = new Product({
      ...productData,
      images
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Create product error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create product'
    });
  }
});

// Update product (admin only)
router.put('/:id', authenticate, isAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    const productData = JSON.parse(req.body.data || '{}');
    
    // Process new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        alt: productData.name || product.name,
        isPrimary: product.images.length === 0 && index === 0
      }));
      productData.images = [...(product.images || []), ...newImages];
    }

    Object.assign(product, productData);
    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update product' 
    });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete product' 
    });
  }
});

// Delete product image (admin only)
router.delete('/:id/images/:imageIndex', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    const imageIndex = Number(req.params.imageIndex);
    if (imageIndex < 0 || imageIndex >= product.images.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid image index' 
      });
    }

    product.images.splice(imageIndex, 1);
    await product.save();

    res.json({
      success: true,
      message: 'Image deleted successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete image' 
    });
  }
});

export default router;
