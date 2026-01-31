import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-abaya.jpg';
import { useTranslation } from '@/context/LanguageContext';

const About = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <img
          src={heroImage}
          alt="About"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-6xl text-background mb-4">{t.aboutUs}</h1>
          <p className="font-body text-background/80 text-lg">{t.aboutParagraph1}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent font-body text-sm uppercase tracking-[0.3em]">
                {t.aboutUs}
              </span>
              <h2 className="font-display text-4xl text-foreground mt-2 mb-6">
                {t.aboutParagraph2}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none font-body text-muted-foreground leading-relaxed space-y-6">
              <p>{t.aboutParagraph3}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { number: '50+', label: t.countriesShipped },
                { number: '10K+', label: t.happyCustomers },
                { number: '100%', label: t.qualityPromise },
              ].map((stat, index) => (
                <div key={index} className="text-center p-8 bg-sage-light rounded-lg">
                  <p className="font-display text-4xl text-primary mb-2">{stat.number}</p>
                  <p className="font-body text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link to="/shop">
                <Button className="btn-primary font-body uppercase tracking-wider px-8">
                  {t.exploreCollection}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
