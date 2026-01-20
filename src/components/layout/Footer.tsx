import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-3xl text-primary-foreground mb-2">{t.joinCommunity}</h3>
          <p className="text-primary-foreground/80 mb-6 font-body">
            {t.subscribeMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t.yourEmailAddress}
              className="bg-primary-foreground text-foreground border-0 placeholder:text-muted-foreground"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
              {t.subscribe}
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl mb-4">
              Gjilpera<span className="text-accent"> Magjike</span>
            </h2>
            <p className="text-background/70 font-body text-sm leading-relaxed mb-6">
              {t.footerDescription}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-accent transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/shop" className="text-background/70 hover:text-accent transition-colors">{t.shopAll}</Link></li>
              <li><Link to="/shop?category=apparel" className="text-background/70 hover:text-accent transition-colors">{t.apparel}</Link></li>
              <li><Link to="/shop?category=home-decor" className="text-background/70 hover:text-accent transition-colors">{t.homeDecor}</Link></li>
              <li><Link to="/shop?category=business-embroidery" className="text-background/70 hover:text-accent transition-colors">{t.businessEmbroidery}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display text-lg mb-4">{t.customerService}</h3>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/contact" className="text-background/70 hover:text-accent transition-colors">{t.contactUs}</Link></li>
              <li><Link to="/shipping" className="text-background/70 hover:text-accent transition-colors">{t.shippingReturns}</Link></li>
              <li><Link to="/faq" className="text-background/70 hover:text-accent transition-colors">{t.faq}</Link></li>
              <li><Link to="/size-guide" className="text-background/70 hover:text-accent transition-colors">{t.sizeGuide}</Link></li>
              <li><Link to="/track-order" className="text-background/70 hover:text-accent transition-colors">{t.trackOrder}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4">{t.contactUs}</h3>
            <ul className="space-y-4 font-body text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-background/70">Prishtinë, Kosovë</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-background/70">+383 44 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-background/70">info@gjilperamagjike.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60 font-body">
            <p>© 2024 Gjilpera Magjike. {t.allRightsReserved}</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-accent transition-colors">{t.privacyPolicy}</Link>
              <Link to="/terms" className="hover:text-accent transition-colors">{t.termsService}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
