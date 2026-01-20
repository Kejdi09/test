import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/context/LanguageContext';
import { apiClient } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();

  const productImage = apiClient.getImageUrl(product.images?.[0]?.url || product.image);
  const productId = product._id || product.id;

  return (
    <div className="group card-product">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted flex items-center justify-center">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">{t.newBadge}</Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-accent text-accent-foreground">{t.saleBadge}</Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-4 right-4 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
          aria-label={t.wishlist}
        >
          <Heart className="w-5 h-5" />
        </button>

        {/* Quick view overlay */}
        <Link
          to={`/product/${productId}`}
          className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <span className="bg-background text-foreground px-6 py-3 font-body text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
            {t.quickView}
          </span>
        </Link>
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-body">
          {product.category}
        </p>
        <Link to={`/product/${productId}`}>
          <h3 className="font-display text-lg text-foreground hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-body font-semibold text-foreground">
            €{product.price}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm text-muted-foreground line-through">
              €{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
