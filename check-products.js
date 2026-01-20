import axios from 'axios';

async function checkProducts() {
  try {
    const response = await axios.get('http://localhost:3001/api/products?limit=3');
    const products = response.data.data.products;
    
    console.log('\n=== PRODUCTS IN DATABASE ===\n');
    products.forEach((p, i) => {
      console.log(`[${i}] ID: ${p._id}`);
      console.log(`    Name: ${p.name}`);
      console.log(`    Images: ${p.images ? p.images.length : 0} images`);
      console.log(`    Featured: ${p.featured}`);
      console.log(`    Has image field: ${!!p.image}`);
      console.log('');
    });

    if (products.length > 0) {
      console.log('=== FIRST PRODUCT FULL DETAILS ===\n');
      console.log(JSON.stringify(products[0], null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkProducts();
