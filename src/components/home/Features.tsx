import { Truck, DollarSign, Zap, Clock } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Truck,
      title: t.freeShippingTitle,
      description: t.freeShippingDesc,
    },
    {
      icon: DollarSign,
      title: t.payOnDelivery,
      description: t.payOnDeliveryDesc,
    },
    {
      icon: Zap,
      title: t.premiumQuality,
      description: t.premiumQualityDesc,
    },
    {
      icon: Clock,
      title: t.response24h,
      description: t.response24hDesc,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-sage-light">
      <div className="container mx-auto px-4">
        {/* Mobile: Compact horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[280px] flex flex-col items-center text-center p-4 bg-background rounded-lg snap-start"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-base text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="font-body text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
