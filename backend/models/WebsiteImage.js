import mongoose from 'mongoose';

const websiteImageSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['hero', 'banner', 'promotion', 'category', 'about'],
    unique: true
  },
  title: {
    type: String,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  ctaText: {
    type: String,
    trim: true
  },
  ctaLink: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
websiteImageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('WebsiteImage', websiteImageSchema);
