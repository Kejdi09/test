import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';

const CustomOrders = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            {t.customEmbroideryTitle}
          </h2>
          
          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            {t.customEmbroideryDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-background p-6 rounded-lg shadow-soft">
              <Palette className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">{t.yourDesign}</h3>
              <p className="font-body text-sm text-muted-foreground">
                {t.yourDesignDesc}
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-soft">
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">{t.weCollaborate}</h3>
              <p className="font-body text-sm text-muted-foreground">
                {t.weCollaborateDesc}
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-soft">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">{t.weCreate}</h3>
              <p className="font-body text-sm text-muted-foreground">
                {t.weCreateDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-primary px-8 py-6 text-base">
                {t.requestCustomOrder}
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" className="btn-outline px-8 py-6 text-base">
                {t.browseCatalog}
              </Button>
            </Link>
          </div>

          <p className="font-body text-sm text-muted-foreground mt-6">
            {t.perfectForEvents}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomOrders;
