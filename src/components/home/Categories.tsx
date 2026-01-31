import { Link } from 'react-router-dom';
import { useTranslation } from '@/context/LanguageContext';
import { useTranslatedCategories } from '@/data/products';

const Categories = () => {
  const { t } = useTranslation();
  const categories = useTranslatedCategories().filter((category) => !category.parent);

  return (
    <section className="py-16 md:py-20 bg-muted/30 px-2 sm:px-6 md:px-10">
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-accent font-body text-sm uppercase tracking-[0.3em]">
            {t.browseBy}
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mt-2">
            {t.categories}
          </h2>
        </div>

        {/* Mobile: Horizontal scroll carousel */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative flex-shrink-0 w-[calc(90vw-2rem)] sm:w-[180px] aspect-[3/4] overflow-hidden rounded-2xl snap-start shadow-md"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                <h3 className="font-display text-lg text-background">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl animate-fade-in shadow-md"
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
