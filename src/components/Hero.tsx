import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import MandalaBackground from './MandalaBackground';
import ThreeScene from './ThreeScene';

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MandalaBackground />

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 pointer-events-none z-[1]" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/15 blur-3xl animate-shimmer-gold pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/8 blur-3xl animate-orbit pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tagline pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary font-semibold tracking-widest uppercase text-xs sm:text-sm">
              For Your Brighter Health
            </span>
          </motion.div>

          {/* Headline with per-word 3D reveal */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6 perspective-[800px]">
            {['Pure.', 'Wholesome.'].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              custom={2}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block text-secondary drop-shadow-[0_2px_12px_hsl(24_100%_45%/0.3)]"
            >
              Indian.
            </motion.span>
          </h1>

          <motion.p
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Globally loved healthy foods, crafted with ancient wisdom. From India's heartland to your table.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link to="/products" className="btn-saffron text-center">
              Explore Products
            </Link>
            <Link to="/about" className="btn-green-outline text-center">
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-secondary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
