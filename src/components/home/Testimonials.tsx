import { Star } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Fatima Ahmed',
      location: 'Prishtinë, Kosovë',
      rating: 5,
      text: t.testimonial1,
    },
    {
      name: 'Sarah Hassan',
      location: 'Tiranë, Shqipëri',
      rating: 5,
      text: t.testimonial2,
    },
    {
      name: 'Amina Mohamed',
      location: 'Shkup, Maqedoni',
      rating: 5,
      text: t.testimonial3,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-accent font-body text-sm uppercase tracking-[0.3em]">
            {t.whatCustomersSay}
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mt-2">
            {t.testimonials}
          </h2>
        </div>

        {/* Mobile: Horizontal scroll carousel */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[280px] bg-card p-6 rounded-lg shadow-soft snap-start"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-display text-base text-foreground">
                  {testimonial.name}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-display text-lg text-foreground">
                  {testimonial.name}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
