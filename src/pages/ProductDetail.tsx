import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Check, Instagram, Facebook, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  /* =======================
     FETCH PRODUCT
  ======================= */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.getProduct(id);

        // 🔴 SAFE RESPONSE HANDLING
        const productData = response?.data?.product || response?.data;

        if (!productData) throw new Error('Product not found');

        setProduct(productData);
        window.scrollTo(0, 0);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load product');
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* =======================
     FETCH RELATED PRODUCTS
  ======================= */
  useEffect(() => {
    if (!product?.category) return;

    const fetchRelated = async () => {
      try {
        const res = await apiClient.getProducts({
          category: product.category,
          limit: '5',
        });

        const products = res?.data?.products || [];
        setRelatedProducts(
          products.filter((p: any) => p._id !== product._id).slice(0, 4)
        );
      } catch (err) {
        console.error('Related products error', err);
      }
    };

    fetchRelated();
  }, [product]);

  /* =======================
     EARLY RETURNS (CLEAN)
  ======================= */
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-accent rounded-full" />
          <p className="mt-4 text-muted-foreground">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-display mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link to="/shop" className="text-primary font-semibold hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  /* =======================
     ADD TO CART
  ======================= */
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }

    toast.success(`${product.name} added to cart`);
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm mb-8 flex gap-2">
          <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="text-muted-foreground hover:text-primary">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image */}
          <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
            <img
              src={
                product.images?.[0]?.url
                  ? apiClient.getImageUrl(product.images[0].url)
                  : '/placeholder.png'
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <span className="uppercase text-sm text-accent">{product.category}</span>
            <h1 className="text-4xl font-display mt-2 mb-4">{product.name}</h1>

            <p className="text-2xl mb-6">${product.price}</p>

            <p className="text-muted-foreground mb-8">
              {product.description || 'No description available'}
            </p>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes?.length
                  ? product.sizes.map((s: string) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 border rounded ${
                          selectedSize === s ? 'bg-primary text-white' : ''
                        }`}
                      >
                        {s}
                      </button>
                    ))
                  : <p className="text-sm text-muted-foreground">One size</p>}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors?.length
                  ? product.colors.map((c: string) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-4 py-2 border rounded flex items-center gap-1 ${
                          selectedColor === c ? 'bg-primary text-white' : ''
                        }`}
                      >
                        {selectedColor === c && <Check size={14} />}
                        {c}
                      </button>
                    ))
                  : <p className="text-sm text-muted-foreground">Standard</p>}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus />
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Link to="/contact" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  Contact us to buy
                </Button>
              </Link>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">Prefer socials? Reach out directly:</p>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-primary"><Instagram className="w-4 h-4" /> Instagram</a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-primary"><Facebook className="w-4 h-4" /> Facebook</a>
                <a href="mailto:info@gjilperamagjike.com" className="inline-flex items-center gap-2 text-sm hover:text-primary"><Mail className="w-4 h-4" /> Email</a>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-display mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p._id} to={`/product/${p._id}`}>
                  <img
                    src={apiClient.getImageUrl(p.images?.[0]?.url)}
                    alt={p.name}
                    className="aspect-[3/4] object-cover mb-2"
                  />
                  <p>{p.name}</p>
                  <p className="text-muted-foreground">${p.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
