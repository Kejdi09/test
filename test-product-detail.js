// Test ProductDetail logic
const API_URL = 'http://localhost:3001/api';

async function testProductFetch() {
  const productId = '696fa3d16a482cb4f8167db2';
  
  try {
    console.log('1. Testing API fetch for product:', productId);
    const response = await fetch(`${API_URL}/products/${productId}`);
    console.log('2. Response status:', response.status);
    
    const data = await response.json();
    console.log('3. Response data:', data);
    
    if (response.ok) {
      if (data.data && data.data.product) {
        console.log('4. ✅ Product found:', data.data.product.name);
        console.log('5. Product images:', data.data.product.images);
        console.log('6. Product._id:', data.data.product._id);
        return true;
      } else {
        console.error('4. ❌ Unexpected response structure:', data);
        return false;
      }
    } else {
      console.error('4. ❌ API error:', data.message || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    return false;
  }
}

testProductFetch().then(success => {
  console.log('\n=== TEST RESULT ===');
  console.log(success ? '✅ PASS' : '❌ FAIL');
});
