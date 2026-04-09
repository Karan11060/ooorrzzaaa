import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error) {
      toast({ title: 'Already subscribed or invalid email', variant: 'destructive' });
    } else {
      toast({ title: 'Subscribed! 🎉', description: 'Welcome to the Ooorrrzzzaaa family.' });
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="indian-top-border" />
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1200 40" className="w-full h-10" preserveAspectRatio="none">
          <path d="M0,40 C150,0 300,40 450,20 C600,0 750,40 900,20 C1050,0 1200,40 1200,40 L1200,0 L0,0 Z"
            fill="hsl(var(--background))" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img src={logo} alt="Ooorrrzzzaaa Logo" className="h-12 rounded-lg mb-3" />
            <p className="text-primary-foreground/70 text-sm">For Your Brighter Health</p>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {['Products', 'About', 'Contact'].map((link) => (
                <Link key={link} to={`/${link.toLowerCase()}`} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <span key={link} className="text-primary-foreground/70 text-sm cursor-pointer hover:text-accent transition-colors">
                  {link}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Newsletter</h4>
            <p className="text-primary-foreground/70 text-sm mb-3">Get health tips & exclusive offers</p>
            <form onSubmit={handleNewsletter} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-accent"
                required
              />
              <button type="submit" className="px-4 py-2 bg-accent text-accent-foreground rounded-r-lg font-medium text-sm hover:bg-accent/80 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="gold-divider !bg-gradient-to-r !from-transparent !via-accent/50 !to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            {[Instagram, Facebook, Linkedin, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent/20 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-primary-foreground/60">
            Made with <span className="text-secondary">❤️</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
