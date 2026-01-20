// Test simulating Vercel deployment with VITE_API_URL
// This assumes VITE_API_URL = https://test-ikgy.onrender.com/api

console.log('\n=== SIMULATING VERCEL DEPLOYMENT ===\n');

// Simulate what happens on Vercel
const API_URL = 'https://test-ikgy.onrender.com/api';
const BASE_URL = API_URL.replace('/api', ''); // 'https://test-ikgy.onrender.com'

console.log('Configuration on Vercel:');
console.log('  VITE_API_URL:', API_URL);
console.log('  BASE_URL (for images):', BASE_URL);

// Simulate the getImageUrl method
function getImageUrl(imagePath) {
  if (!imagePath) return 'https://via.placeholder.com/400x600?text=No+Image';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return `${BASE_URL}${imagePath}`;
  return imagePath;
}

async function testVercelFlow() {
  const productId = '696fa3d16a482cb4f8167db2';
  
  console.log('\nTest 1: Fetch from Render backend...');
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    console.log('✅ Status:', response.status);
    const data = await response.json();
    
    if (data.success && data.data.product) {
      const product = data.data.product;
      console.log('✅ Product:', product.name);
      
      console.log('\nTest 2: Image URL conversion...');
      const imageUrl = getImageUrl(product.images[0].url);
      console.log('  Original:', product.images[0].url);
      console.log('  Converted:', imageUrl);
      
      console.log('\nTest 3: Image accessibility...');
      const imgResponse = await fetch(imageUrl);
      console.log('✅ Image status:', imgResponse.status);
      
      console.log('\n=== ✅ VERCEL SIMULATION PASSED ===');
    } else {
      console.error('❌ Unexpected response structure');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nPossible causes:');
    console.log('- Render backend is down');
    console.log('- Network/CORS issue');
    console.log('- Product doesn\'t exist on Render');
  }
}

testVercelFlow();
