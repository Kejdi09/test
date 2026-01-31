import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './backend/models/Product.js';

dotenv.config();

const fixProducts = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gjilper-magjike');
    
    console.log('Fixing corrupted product descriptions...');
    
    // Find products with corrupted descriptions (JSON objects)
    const products = await Product.find({});
    let fixedCount = 0;
    
    for (const product of products) {
      if (typeof product.description === 'string' && product.description.includes('"success":true')) {
        console.log(`Fixing product: ${product.name}`);
        
        // Extract original description or set a default
        let newDescription = `Beautiful ${product.name.toLowerCase()} product`;
        
        // Try to extract meaningful text from the corrupted data
        if (product.description.includes('also creat')) {
          newDescription = product.description.substring(
            product.description.indexOf('also creat'),
            product.description.indexOf('also creat') + 100
          );
        }
        
        product.description = newDescription;
        await product.save();
        fixedCount++;
        console.log(`  ✓ Fixed: ${product.name}`);
      }
    }
    
    console.log(`\n✅ Fixed ${fixedCount} products`);
    
    // Also delete the first corrupted product (erererre) if it exists
    const erererre = await Product.findOne({ name: 'erererre' });
    if (erererre) {
      console.log('Removing corrupted product "erererre"...');
      await Product.deleteOne({ _id: erererre._id });
      console.log('✓ Removed erererre');
    }
    
    console.log('\nUpdated products:');
    const updatedProducts = await Product.find({}).select('name description featured category');
    updatedProducts.forEach(p => {
      console.log(`- ${p.name} (${p.category}) [Featured: ${p.featured}]`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};

fixProducts();
