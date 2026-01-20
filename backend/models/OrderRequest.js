import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    selectedSize: String,
    selectedColor: String,
    quantity: Number,
    price: Number,
    image: String,
  },
  { _id: false }
);

const totalsSchema = new mongoose.Schema(
  {
    subtotal: Number,
    shipping: Number,
    total: Number,
  },
  { _id: false }
);

const orderRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  items: {
    type: [itemSchema],
    default: [],
  },
  totals: {
    type: totalsSchema,
    default: { subtotal: 0, shipping: 0, total: 0 },
  },
  note: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: 'cart',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('OrderRequest', orderRequestSchema);
