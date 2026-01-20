import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/User.js';
import Product from './backend/models/Product.js';
import Message from './backend/models/Message.js';
import WebsiteImage from './backend/models/WebsiteImage.js';
import Analytics from './backend/models/Analytics.js';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please create a .env file with your MongoDB connection string.');
  process.exit(1);
}

const sampleProducts = [
  {
    name: 'Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer occasions. Made with breathable fabric.',
    price: 49.99,
    category: 'dresses',
    images: [
      { url: '/images/products/dress1.jpg', alt: 'Floral Summer Dress', isPrimary: true }
    ],
    colors: ['Red', 'Blue', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    featured: true,
    rating: 4.5,
    reviews: 23,
    views: 150,
    sales: 35
  },
  {
    name: 'Elegant Evening Gown',
    description: 'Sophisticated evening gown for special occasions. Features elegant draping and premium fabric.',
    price: 89.99,
    category: 'dresses',
    images: [
      { url: '/images/products/dress2.jpg', alt: 'Evening Gown', isPrimary: true }
    ],
    colors: ['Black', 'Navy', 'Burgundy'],
    sizes: ['S', 'M', 'L'],
    stock: 30,
    featured: true,
    rating: 4.8,
    reviews: 45,
    views: 280,
    sales: 52
  },
  {
    name: 'Casual Cotton Top',
    description: 'Comfortable cotton top for everyday wear. Breathable and easy to style.',
    price: 24.99,
    category: 'tops',
    images: [
      { url: '/images/products/top1.jpg', alt: 'Cotton Top', isPrimary: true }
    ],
    colors: ['White', 'Black', 'Grey'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 100,
    featured: false,
    rating: 4.3,
    reviews: 67,
    views: 420,
    sales: 89
  },
  {
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse with elegant button details. Perfect for office or evening wear.',
    price: 54.99,
    category: 'tops',
    images: [
      { url: '/images/products/top2.jpg', alt: 'Silk Blouse', isPrimary: true }
    ],
    colors: ['Ivory', 'Rose', 'Sage'],
    sizes: ['S', 'M', 'L'],
    stock: 45,
    featured: true,
    rating: 4.6,
    reviews: 31,
    views: 190,
    sales: 41
  },
  {
    name: 'Pleated Midi Skirt',
    description: 'Classic pleated midi skirt in premium fabric. Versatile piece for any wardrobe.',
    price: 39.99,
    category: 'skirts',
    images: [
      { url: '/images/products/skirt1.jpg', alt: 'Pleated Skirt', isPrimary: true }
    ],
    colors: ['Black', 'Navy', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 60,
    featured: false,
    rating: 4.4,
    reviews: 54,
    views: 230,
    sales: 67
  },
  {
    name: 'Leather Jacket',
    description: 'Premium leather jacket with modern cut. Timeless style and exceptional quality.',
    price: 129.99,
    category: 'jackets',
    images: [
      { url: '/images/products/jacket1.jpg', alt: 'Leather Jacket', isPrimary: true }
    ],
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    featured: true,
    rating: 4.9,
    reviews: 78,
    views: 520,
    sales: 92
  },
  {
    name: 'Denim Jacket',
    description: 'Classic denim jacket for casual styling. Durable and versatile.',
    price: 59.99,
    category: 'jackets',
    images: [
      { url: '/images/products/jacket2.jpg', alt: 'Denim Jacket', isPrimary: true }
    ],
    colors: ['Light Blue', 'Dark Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 80,
    featured: false,
    rating: 4.5,
    reviews: 103,
    views: 610,
    sales: 134
  },
  {
    name: 'A-Line Mini Skirt',
    description: 'Trendy A-line mini skirt perfect for casual outings. Comfortable and stylish.',
    price: 29.99,
    category: 'skirts',
    images: [
      { url: '/images/products/skirt2.jpg', alt: 'Mini Skirt', isPrimary: true }
    ],
    colors: ['Red', 'Black', 'Khaki'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 70,
    featured: false,
    rating: 4.2,
    reviews: 42,
    views: 310,
    sales: 58
  }
];

const sampleMessages = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    subject: 'Question about product availability',
    message: 'Hi, I\'m interested in the Floral Summer Dress. Do you have it in size L and in red color? Also, what\'s the estimated delivery time?',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    name: 'Michael Chen',
    email: 'mchen@email.com',
    subject: 'Order Issue',
    message: 'I received my order but the size is incorrect. I ordered size M but received size S. Can I exchange it?',
    isRead: true,
    reply: 'We apologize for the inconvenience. We will arrange an exchange immediately. Please check your email for return instructions.',
    repliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Emma Davis',
    email: 'emma.d@email.com',
    subject: 'Wholesale Inquiry',
    message: 'Hello, I own a boutique and I\'m interested in purchasing your products wholesale. Could you please send me information about your wholesale program?',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  },
  {
    name: 'James Wilson',
    email: 'jwilson@email.com',
    subject: 'Great products!',
    message: 'Just wanted to say I\'m very happy with my recent purchase. The quality is excellent and shipping was fast. Will definitely order again!',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    subject: 'Return Policy Question',
    message: 'What is your return policy? I want to order a dress but I\'m not sure about the size.',
    isRead: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
  }
];

const sampleWebsiteImages = [
  {
    section: 'hero',
    title: 'Summer Collection 2026',
    subtitle: 'Discover the latest trends in women\'s fashion',
    imageUrl: '/images/hero-banner.jpg',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    isActive: true
  },
  {
    section: 'banner',
    title: 'Special Offer',
    subtitle: 'Get 20% off on all dresses',
    imageUrl: '/images/promo-banner.jpg',
    ctaText: 'View Deals',
    ctaLink: '/shop?category=dresses',
    isActive: true
  },
  {
    section: 'promotion',
    title: 'New Arrivals',
    subtitle: 'Check out our newest collection',
    imageUrl: '/images/new-arrivals.jpg',
    ctaText: 'Explore',
    ctaLink: '/shop?sort=newest',
    isActive: true
  }
];

async function populateDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('\nClearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Message.deleteMany({});
    await WebsiteImage.deleteMany({});
    await Analytics.deleteMany({});
    console.log('Existing data cleared');

    // Create admin user
    console.log('\nCreating admin user...');
    const adminUser = new User({
      email: 'admin@gjilper-magjike.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created:');
    console.log('  Email: admin@gjilper-magjike.com');
    console.log('  Password: admin123');

    // Create products
    console.log('\nCreating sample products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products created`);

    // Create messages
    console.log('\nCreating sample messages...');
    const messages = await Message.insertMany(sampleMessages);
    console.log(`${messages.length} messages created`);

    // Create website images
    console.log('\nCreating website images...');
    const websiteImages = await WebsiteImage.insertMany(sampleWebsiteImages);
    console.log(`${websiteImages.length} website images created`);

    // Create analytics data for the last 30 days
    console.log('\nCreating analytics data...');
    const analyticsData = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      analyticsData.push({
        date,
        pageViews: Math.floor(Math.random() * 500) + 200,
        uniqueVisitors: Math.floor(Math.random() * 200) + 100,
        sales: Math.floor(Math.random() * 20) + 5,
        revenue: (Math.random() * 1000 + 200).toFixed(2),
        newUsers: Math.floor(Math.random() * 10) + 2
      });
    }
    await Analytics.insertMany(analyticsData);
    console.log('Analytics data created for the last 30 days');

    console.log('\n✅ Database populated successfully!');
    console.log('\nYou can now:');
    console.log('1. Start the server: npm run dev (or node server.js)');
    console.log('2. Login to admin dashboard with:');
    console.log('   Email: admin@gjilper-magjike.com');
    console.log('   Password: admin123');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

populateDatabase();
