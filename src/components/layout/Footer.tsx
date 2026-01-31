import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background">
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
              <a href="https://instagram.com/gjilpera_magjike" className="p-2 bg-background/10 rounded-full hover:bg-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
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
              <li><Link to="/contact" className="text-background/70 hover:text-accent transition-colors">{t.contactUs}</Link></li>
            </ul>
          </div>

          {/* Customer Service 
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
          */}
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4">{t.contactUs}</h3>
            <ul className="space-y-4 font-body text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-background/70">Albania</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-background/70">+355 00 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-background/70">example@email.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60 font-body">
            <p>© 2026 Gjilpera Magjike. {t.allRightsReserved}</p>
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
