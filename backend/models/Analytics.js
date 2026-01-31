import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  pageViews: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  revenue: {
    type: Number,
    default: 0
  },
  newUsers: {
    type: Number,
    default: 0
  },
  productViews: {
    type: Map,
    of: Number,
    default: {}
  },
  categoryViews: {
    type: Map,
    of: Number,
    default: {}
  }
});

export default mongoose.model('Analytics', analyticsSchema);
