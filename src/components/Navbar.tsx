import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import logo from '@/assets/logo.jpeg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const { user, signOut } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Ooorrzzaaa Logo" className="h-14 w-auto rounded-lg" />
              <span className="hidden sm:inline font-heading font-bold text-primary text-2xl">Ooorrzzaaa</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.to ? 'text-secondary' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold">
                  {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <button onClick={signOut} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Sign out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <User className="w-5 h-5" />
              </button>
            )}
            <button onClick={toggleCart} className="p-2 rounded-lg hover:bg-muted transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems()}
                </span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="indian-top-border" />
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-background z-50 shadow-2xl p-6"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4">
                <X className="w-6 h-6" />
              </button>
              <div className="mt-12 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-heading text-foreground hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
