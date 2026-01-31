import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';
import heroImage from '@/assets/hero-abaya.jpg';

const Hero = () => {
  const { t } = useTranslation();
//
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elegant modest fashion"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <span className="inline-block text-accent font-body text-sm uppercase tracking-[0.3em] mb-4">
            {t.newCollection}
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6">
            {t.heroTitle1}
            <br />
            <span className="text-primary">{t.heroTitle2}</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mb-8">
            {t.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop">
              <Button size="lg" className="btn-primary font-body uppercase tracking-wider px-8">
                {t.shopCollection}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="btn-outline font-body uppercase tracking-wider px-8">
                {t.ourStory}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
