import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Heart, Sparkles, ArrowRight, Star, Globe, Truck, Award } from 'lucide-react';
import { useRef } from 'react';
import MandalaBackground from '@/components/MandalaBackground';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const features = [
  { icon: Leaf, title: '100% Natural', desc: 'No preservatives, no artificial colors — just pure ingredients from nature.' },
  { icon: ShieldCheck, title: 'FSSAI Certified', desc: 'Meets the highest food safety and quality standards.' },
  { icon: Heart, title: 'Ancient Wisdom', desc: 'Recipes rooted in Ayurveda and traditional Indian nutrition.' },
  { icon: Sparkles, title: 'Ready to Eat', desc: 'Wholesome meals prepared in minutes — no cooking required.' },
  { icon: Star, title: 'Family Approved', desc: 'Loved by kids and adults alike for taste and nutrition.' },
];

const whyChooseUs = [
  { icon: Award, title: 'Trusted Quality', desc: 'Every product undergoes rigorous quality checks and is certified by FSSAI for your peace of mind.' },
  { icon: Globe, title: 'Worldwide Delivery', desc: 'From India to your doorstep — we ship globally so you never miss the taste of home.' },
  { icon: Truck, title: 'Farm-Fresh Promise', desc: 'Sourced directly from Indian farms with zero middlemen, ensuring maximum freshness and fair trade.' },
];

const processSteps = [
  { step: '01', title: 'Source', desc: 'Hand-picked ingredients from trusted Indian farms' },
  { step: '02', title: 'Craft', desc: 'Traditional recipes perfected over generations' },
  { step: '03', title: 'Pack', desc: 'Sealed fresh with zero preservatives' },
  { step: '04', title: 'Deliver', desc: 'Shipped with care to your doorstep worldwide' },
];

const Home = () => {
  const { products } = useProducts();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div className="overflow-hidden">
      <Hero />
      <div className="indian-divider" />

      {/* Why Choose Us */}
      <section className="section-padding relative indian-section-bg indian-paisley-left indian-paisley-right">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-secondary font-semibold tracking-widest uppercase text-sm mb-3">
              Why Ooorrrzzzaaa
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
              Goodness You Can <span className="text-secondary">Trust</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-fit"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -8, boxShadow: '0 20px 40px -15px hsl(var(--deep-green) / 0.15)' }}
                className="glass-card p-8 text-center group cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/20 transition-colors duration-300">
                  <f.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="indian-divider" />

      {/* Products Section */}
      <section className="section-padding indian-lotus-border" ref={parallaxRef}>
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-secondary font-semibold tracking-widest uppercase text-sm mb-3">
              Our Collection
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
              5 Types of <span className="text-secondary">Healthy Food</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              Handcrafted health foods — Nuts & Bars, Dry Fruits, Seeds, High-Protein Oats, and Natural Shakes
            </motion.p>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-accent mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Product Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-14"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link to="/products" className="btn-green-outline inline-flex items-center gap-2 group">
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <MandalaBackground />
        </div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">
              Our Process
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-primary-foreground mb-4">
              From Farm to <span className="text-accent">Your Table</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                className="text-center relative"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-full border-2 border-accent/40 flex items-center justify-center mx-auto mb-5"
                >
                  <span className="font-heading text-3xl text-accent">{s.step}</span>
                </motion.div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-accent/20" />
                )}
                <h3 className="font-heading text-xl text-primary-foreground mb-2">{s.title}</h3>
                <p className="text-primary-foreground/60 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="indian-divider" />

      {/* Stats with parallax */}
      <section className="section-padding relative indian-section-bg">
        <motion.div style={{ y: parallaxY }} className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="flex justify-center gap-8 text-center">
            {[
              { value: '5', label: 'Health Products', suffix: '' },
              { value: '100', label: 'Natural Ingredients', suffix: '%' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                className="glass-card p-10 min-w-[250px]"
              >
                <p className="font-heading text-5xl sm:text-7xl text-secondary mb-2">
                  {stat.value}<span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="indian-divider" />

      {/* Why Choose Us */}
      <section className="section-padding bg-card/50 relative indian-paisley-left indian-paisley-right">
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-secondary font-semibold tracking-widest uppercase text-sm mb-3">
              Why Choose Us
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
              The <span className="text-secondary">Ooorrrzzzaaa</span> Difference
            </motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="glass-card p-8 text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5"
                >
                  <item.icon className="w-8 h-8 text-secondary" />
                </motion.div>
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="indian-divider" />

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden indian-section-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-3xl text-center relative z-10"
        >
          <div className="glass-card p-12 sm:p-16 relative overflow-hidden indian-corner-frame">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
              Born in India, Loved by the <span className="text-secondary">World</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
              Join thousands of health-conscious families choosing Ooorrrzzzaaa for wholesome, authentic Indian nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-saffron inline-flex items-center gap-2 justify-center">
                Explore Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-green-outline inline-flex items-center gap-2 justify-center">
                Learn Our Story
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
