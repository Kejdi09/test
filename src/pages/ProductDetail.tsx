import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, ChevronLeft, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching product with ID:', id);
        console.log('API Client Base URL:', apiClient.baseUrl);
        console.log('API Client Base Image URL:', apiClient.baseImageUrl);
        
        const response = await apiClient.getProduct(id!);
        console.log('Product response:', response);
        
        if (response.data && response.data.product) {
          console.log('Setting product:', response.data.product);
          setProduct(response.data.product);
          setFetchError(null);
          // Scroll to top when product loads
          window.scrollTo(0, 0);
        } else {
          console.error('Unexpected response structure:', response);
          setProduct(null);
          setFetchError('Unexpected response from server');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
          setFetchError(error.message);
        }
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">This product doesn't exist or has been removed.</p>
          <Link to="/shop" className="text-primary hover:underline font-semibold">
            ← Back to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchRelated = async () => {
      if (product) {
        try {
          const response = await apiClient.getProducts({ category: product.category, limit: '5' });
          setRelatedProducts((response.data.products || []).filter((p: any) => p._id !== product._id).slice(0, 4));
        } catch (error) {
          console.error('Failed to fetch related products:', error);
        }
      }
    };
    fetchRelated();
  }, [product]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {isLoading && (
          <>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 font-body text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/shop" className="text-muted-foreground hover:text-primary">Shop</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">Loading...</span>
            </nav>
                      <div className="mt-12 text-center py-20 min-h-screen flex items-center justify-center">
                        <div>
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
                          <p className="mt-4 text-muted-foreground">Loading product...</p>
                        </div>
                      </div>
          </>
        )}
        
        {!isLoading && !product && (
          <div className="text-center py-20 min-h-screen flex items-center justify-center">
            <div>
              <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-2">This product doesn't exist or has been removed.</p>
              {fetchError && (
                <p className="text-sm text-destructive mb-4">{fetchError}</p>
              )}
              <Link to="/shop" className="text-primary hover:underline font-semibold">
                ← Back to Shop
              </Link>
            </div>
          </div>
        )}

        {product && (
          <>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 font-body text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/shop" className="text-muted-foreground hover:text-primary">Shop</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted flex items-center justify-center">
            <img
              src={apiClient.getImageUrl(product.images?.[0]?.url || product.image)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="lg:py-8">
            <div className="mb-2">
              <span className="text-accent font-body text-sm uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-3xl text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-accent text-accent-foreground text-sm px-2 py-1 rounded">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              {product.description || 'No description available'}
            </p>

            {/* Size selection */}
            <div className="mb-6">
              <h3 className="font-display text-lg mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {(product.sizes && product.sizes.length > 0) ? product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 px-4 py-2 border rounded font-body text-sm transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                )) : <p className="text-sm text-muted-foreground">One size fits all</p>}
              </div>
            </div>

            {/* Color selection */}
            <div className="mb-8">
              <h3 className="font-display text-lg mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {(product.colors && product.colors.length > 0) ? product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded font-body text-sm transition-all flex items-center gap-2 ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {selectedColor === color && <Check className="w-4 h-4" />}
                    {color}
                  </button>
                )) : <p className="text-sm text-muted-foreground">Standard color</p>}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-display text-lg mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-body">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 btn-primary font-body uppercase tracking-wider"
              >
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="btn-outline" aria-label="Add to wishlist">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-border pt-8 space-y-3 font-body text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Free shipping on orders over $150
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> 30-day easy returns
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Secure checkout
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p._id || p.id} to={`/product/${p._id || p.id}`} className="card-product group">
                  <div className="aspect-[3/4] overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={apiClient.getImageUrl(p.images?.[0]?.url || p.image)}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg text-foreground">{p.name}</h3>
                    <p className="font-body text-muted-foreground">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
