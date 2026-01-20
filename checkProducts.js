import axios from 'axios';

const API_URL = 'https://test-ikgy.onrender.com/api';

async function checkAndFixProducts() {
  try {
    console.log('Fetching all products...\n');
    
    const response = await axios.get(`${API_URL}/products?limit=100`);
    const products = response.data.data.products;
    
    console.log(`Total products: ${products.length}\n`);
    
    // Categorize products
    const validCategories = [
      'apparel', 't-shirts', 'hoodies', 'workwear-uniforms', 'baby-kids-bodysuits',
      'home-decor', 'embroidered-frames', 'kids-frames', 'cushions', 'wall-decor',
      'towels', 'napkins', 'business-embroidery', 'business-logo-embroidery'
    ];
    
    const corruptedProducts = [];
    const validProducts = [];
    const invalidCategoryProducts = [];
    
    products.forEach(p => {
      if (p.description && p.description.includes('"success":true')) {
        corruptedProducts.push(p);
      } else if (!validCategories.includes(p.category)) {
        invalidCategoryProducts.push(p);
      } else {
        validProducts.push(p);
      }
    });
    
    console.log(`✅ Valid products: ${validProducts.length}`);
    validProducts.forEach(p => {
      console.log(`   - ${p.name} (${p.category}) [Featured: ${p.featured}, Stock: ${p.stock}]`);
    });
    
    if (corruptedProducts.length > 0) {
      console.log(`\n⚠️  Corrupted products: ${corruptedProducts.length}`);
      corruptedProducts.forEach(p => {
        console.log(`   - ${p.name} (${p.category}) [Description length: ${p.description.length}]`);
      });
    }
    
    if (invalidCategoryProducts.length > 0) {
      console.log(`\n❌ Invalid category products: ${invalidCategoryProducts.length}`);
      invalidCategoryProducts.forEach(p => {
        console.log(`   - ${p.name} (Category: "${p.category}" - INVALID)`);
      });
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   Valid: ${validProducts.length}`);
    console.log(`   Corrupted: ${corruptedProducts.length}`);
    console.log(`   Invalid Category: ${invalidCategoryProducts.length}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkAndFixProducts();
