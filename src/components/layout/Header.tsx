import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTranslation } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { t } = useTranslation();

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.about, path: '/about' },
    { name: t.shop, path: '/shop' },
    { name: t.contact, path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm flex items-center justify-center gap-4">
        <p className="font-body">{t.freeShipping}</p>
        <LanguageSelector />
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - left */}
          <Link to="/" className="flex items-center mr-8">
            <h1 className="text-xl md:text-2xl font-display font-bold text-foreground tracking-wide">
              Gjilpera<span className="text-primary"> Magjike</span>
            </h1>
          </Link>

          {/* Desktop navigation - right */}
          <nav className="hidden lg:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="nav-link font-body text-sm uppercase tracking-wider">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions - right, after nav */}
          <div className="flex items-center gap-2 md:gap-4 ml-4">
            <Link to="/cart" className="p-2 hover:text-primary transition-colors relative" aria-label={t.cart}>
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-slide-up">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-body text-lg py-2 border-b border-border hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
