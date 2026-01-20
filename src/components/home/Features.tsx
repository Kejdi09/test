import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
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
      icon: Shield,
      title: t.securePayment,
      description: t.securePaymentDesc,
    },
    {
      icon: RefreshCw,
      title: t.easyReturns,
      description: t.easyReturnsDesc,
    },
    {
      icon: Headphones,
      title: t.support24,
      description: t.supportDesc,
    },
  ];

  return (
    <section className="py-16 bg-sage-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
