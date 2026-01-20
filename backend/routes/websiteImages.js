import express from 'express';
import WebsiteImage from '../models/WebsiteImage.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Get all website images (public)
router.get('/', async (req, res) => {
  try {
    const images = await WebsiteImage.find({ isActive: true });
    
    res.json({
      success: true,
      data: { images }
    });
  } catch (error) {
    console.error('Get website images error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch website images' 
    });
  }
});

// Get website image by section (public)
router.get('/:section', async (req, res) => {
  try {
    const image = await WebsiteImage.findOne({ section: req.params.section });
    
    if (!image) {
      return res.status(404).json({ 
        success: false, 
        message: 'Image not found' 
      });
    }

    res.json({
      success: true,
      data: { image }
    });
  } catch (error) {
    console.error('Get website image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch website image' 
    });
  }
});

// Create or update website image (admin only)
router.post('/', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { section, title, subtitle, ctaText, ctaLink, isActive } = req.body;
    
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Check if image exists for this section
    let websiteImage = await WebsiteImage.findOne({ section });

    if (websiteImage) {
      // Update existing
      websiteImage.title = title;
      websiteImage.subtitle = subtitle;
      websiteImage.ctaText = ctaText;
      websiteImage.ctaLink = ctaLink;
      websiteImage.isActive = isActive !== undefined ? isActive : websiteImage.isActive;
      if (imageUrl) websiteImage.imageUrl = imageUrl;
      
      await websiteImage.save();
    } else {
      // Create new
      websiteImage = new WebsiteImage({
        section,
        title,
        subtitle,
        imageUrl,
        ctaText,
        ctaLink,
        isActive: isActive !== undefined ? isActive : true
      });
      
      await websiteImage.save();
    }

    res.json({
      success: true,
      message: 'Website image updated successfully',
      data: { image: websiteImage }
    });
  } catch (error) {
    console.error('Update website image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update website image' 
    });
  }
});

// Delete website image (admin only)
router.delete('/:section', authenticate, isAdmin, async (req, res) => {
  try {
    const image = await WebsiteImage.findOneAndDelete({ section: req.params.section });
    
    if (!image) {
      return res.status(404).json({ 
        success: false, 
        message: 'Image not found' 
      });
    }

    res.json({
      success: true,
      message: 'Website image deleted successfully'
    });
  } catch (error) {
    console.error('Delete website image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete website image' 
    });
  }
});

export default router;
