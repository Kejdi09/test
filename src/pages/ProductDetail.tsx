import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Check, Instagram, Facebook, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';
import { useTranslation } from '@/context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductDetail = () => {
  const { t } = useTranslation();
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
          <p className="mt-4 text-muted-foreground">{t.loadingProduct}</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-display mb-4">{t.productNotFoundTitle}</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link to="/shop" className="text-primary font-semibold hover:underline">
            {t.backToShopLink}
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
      toast.error(t.pleaseSelectSizeAndColor);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }

    toast.success(`${product.name} ${t.productAddedToCart}`);
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <Layout>
      <section className="bg-gray-50 md:rounded-xl shadow-sm px-2 sm:px-6 md:px-10 py-8 max-w-4xl mx-auto my-6">

        {/* Breadcrumb */}
        <nav className="text-sm mb-8 flex gap-2">
          <Link to="/" className="text-muted-foreground hover:text-primary">{t.home}</Link>
          <span>/</span>
          <Link to="/shop" className="text-muted-foreground hover:text-primary">{t.shop}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Swiper */}
          <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
            {product.images && product.images.length > 1 ? (
              <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
                {product.images.map((img: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img.url ? apiClient.getImageUrl(img.url) : '/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={product.images?.[0]?.url ? apiClient.getImageUrl(product.images[0].url) : '/placeholder.png'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Details */}
          <div>
            <span className="uppercase text-sm text-accent">{product.category}</span>
            <h1 className="text-4xl font-display mt-2 mb-4">{product.name}</h1>

            <p className="text-2xl mb-6">${product.price}</p>

            <p className="text-muted-foreground mb-8">
              {product.description || t.noDescriptionAvailable}
            </p>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="mb-2">{t.sizeLabel}</h3>
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
                  : <p className="text-sm text-muted-foreground">{t.oneSize}</p>}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="mb-2">{t.colorLabel}</h3>
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
                  : <p className="text-sm text-muted-foreground">{t.standardColor}</p>}
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
                {t.addToCartBtn}
              </Button>
              <Link to="/contact" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  {t.contactUsToBuy}
                </Button>
              </Link>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">Contact us for more information:</p>
              <div className="flex items-center gap-3">
                <a href="mailto:example@email.com" className="inline-flex items-center gap-2 text-sm hover:text-primary"><Mail className="w-4 h-4" /> Email</a>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-display mb-8">{t.youMayAlsoLikeTitle}</h2>
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
      </section>
    </Layout>
  );
};

export default ProductDetail;
