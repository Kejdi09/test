// Test script to verify API returns correct product format
import fetch from 'node-fetch';

async function testAPI() {
  try {
    console.log('Testing Render API...\n');
    
    const response = await fetch('https://test-ikgy.onrender.com/api/products?featured=true&limit=8');
    const data = await response.json();
    
    console.log('✅ Response received');
    console.log('Status:', response.status);
    console.log('Total products:', data.data.pagination.total);
    console.log('Returned products:', data.data.products.length);
    
    console.log('\n📦 Product Details:');
    data.data.products.forEach(product => {
      console.log(`\n- ${product.name}`);
      console.log(`  Category: ${product.category}`);
      console.log(`  Featured: ${product.featured}`);
      console.log(`  Description length: ${product.description.length} chars`);
      if (product.description.includes('{') && product.description.includes('}')) {
        console.log(`  ⚠️  WARNING: Contains JSON-like content`);
      }
      console.log(`  Image: ${product.images[0]?.url || 'None'}`);
      console.log(`  Stock: ${product.stock}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
