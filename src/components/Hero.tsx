import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MandalaBackground from './MandalaBackground';
import ThreeScene from './ThreeScene';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MandalaBackground />

      {/* 3D Scene - hidden on mobile */}
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      {/* Decorative gradient orbs with Indian colors */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-shimmer-gold" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-orbit" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-secondary font-semibold tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            For Your Brighter Health
          </motion.p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6 drop-shadow-sm">
            Pure. Wholesome.{' '}
            <span className="text-secondary">Indian.</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Globally loved healthy foods, crafted with ancient wisdom. From India's heartland to your table.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-saffron text-center">
              Explore Products
            </Link>
            <Link to="/about" className="btn-green-outline text-center">
              Our Story
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
