import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';
import { apiClient } from '@/lib/api';

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.getProducts({ featured: 'true', limit: '8' });
        console.log('Featured products fetched:', response.data.products);
        setFeaturedProducts(response.data.products || []);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="text-accent font-body text-sm uppercase tracking-[0.3em]">
              {t.curatedForYou}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mt-2">
              {t.featuredCollection}
            </h2>
          </div>
          <Link to="/shop" className="mt-4 md:mt-0">
            <Button variant="outline" className="btn-outline font-body uppercase tracking-wider text-sm md:text-base">
              {t.viewAll}
            </Button>
          </Link>
        </div>

        {/* Mobile: Horizontal scroll carousel */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {featuredProducts.map((product) => (
            <div
              key={product._id || product.id}
              className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[220px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product._id || product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
