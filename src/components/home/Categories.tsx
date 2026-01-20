import { Link } from 'react-router-dom';
import { useTranslation } from '@/context/LanguageContext';
import { useTranslatedCategories } from '@/data/products';

const Categories = () => {
  const { t } = useTranslation();
  const categories = useTranslatedCategories();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-body text-sm uppercase tracking-[0.3em]">
            {t.browseBy}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2">
            {t.categories}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                <h3 className="font-display text-2xl md:text-3xl text-background mb-2">
                  {category.name}
                </h3>
                <p className="font-body text-sm text-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
