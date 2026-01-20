import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import { useTranslatedCategories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { apiClient } from '@/lib/api';

const Shop = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categories = useTranslatedCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('featured');

  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getProducts({ limit: '100' });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'newest': filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()); break;
      default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return filtered;
  }, [selectedCategory, priceRange, sortBy, products]);

  if (isLoading) {
    return (
      <Layout>
        <section className="bg-sage-light py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{t.shopAll}</h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleCategoryChange = (category: string) => {
    if (category === 'all') { searchParams.delete('category'); } else { searchParams.set('category', category); }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <section className="bg-sage-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name : t.shopAll}
          </h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">{t.shopDescription}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-display text-lg mb-4">{t.categories}</h3>
                <div className="space-y-2">
                  <button onClick={() => handleCategoryChange('all')} className={`block w-full text-left py-2 px-3 rounded font-body text-sm transition-colors ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{t.allProducts}</button>
                  {categories.map((category) => (
                    <button key={category.id} onClick={() => handleCategoryChange(category.id)} className={`block w-full text-left py-2 px-3 rounded font-body text-sm transition-colors ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{category.name}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg mb-4">{t.priceRange}</h3>
                <Slider value={priceRange} onValueChange={setPriceRange} max={300} step={10} className="mb-4" />
                <div className="flex justify-between font-body text-sm text-muted-foreground"><span>€{priceRange[0]}</span><span>€{priceRange[1]}</span></div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <p className="font-body text-sm text-muted-foreground">{t.showingProducts.replace('{count}', String(filteredProducts.length))}</p>
              <div className="flex items-center gap-4">
                <button className="lg:hidden flex items-center gap-2 font-body text-sm" onClick={() => setShowFilters(true)}><Filter className="w-4 h-4" />{t.filters}</button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t.featured}</SelectItem>
                    <SelectItem value="newest">{t.newest}</SelectItem>
                    <SelectItem value="price-low">{t.priceLowHigh}</SelectItem>
                    <SelectItem value="price-high">{t.priceHighLow}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (<div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}><ProductCard product={product} /></div>))}
              </div>
            ) : (
              <div className="text-center py-16"><p className="font-display text-2xl text-foreground mb-2">{t.noProductsFound}</p><p className="font-body text-muted-foreground">{t.tryAdjustingFilters}</p></div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6"><h2 className="font-display text-xl">{t.filters}</h2><button onClick={() => setShowFilters(false)}><X className="w-6 h-6" /></button></div>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg mb-4">{t.categories}</h3>
                <div className="space-y-2">
                  <button onClick={() => { handleCategoryChange('all'); setShowFilters(false); }} className={`block w-full text-left py-2 px-3 rounded font-body text-sm transition-colors ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{t.allProducts}</button>
                  {categories.map((category) => (<button key={category.id} onClick={() => { handleCategoryChange(category.id); setShowFilters(false); }} className={`block w-full text-left py-2 px-3 rounded font-body text-sm transition-colors ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{category.name}</button>))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg mb-4">{t.priceRange}</h3>
                <Slider value={priceRange} onValueChange={setPriceRange} max={300} step={10} className="mb-4" />
                <div className="flex justify-between font-body text-sm text-muted-foreground"><span>€{priceRange[0]}</span><span>€{priceRange[1]}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Shop;
