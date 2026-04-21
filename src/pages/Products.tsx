import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Sparkles, MapPin, Heart, Truck, ArrowRight } from 'lucide-react';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const benefits = [
  { icon: Leaf, text: '100% Natural' },
  { icon: ShieldCheck, text: 'No Preservatives' },
  { icon: Sparkles, text: 'FSSAI Certified' },
  { icon: MapPin, text: 'Made in India' },
];

const productHighlights = [
  {
    icon: Heart,
    title: 'Crafted with Love',
    desc: 'Every product is carefully prepared using traditional recipes from Rajasthani kitchens, blending heritage flavors with modern nutrition.',
  },
  {
    icon: Leaf,
    title: 'Farm-Fresh Ingredients',
    desc: 'We source directly from trusted Indian farms — no middlemen, no compromise. Just pure, fresh, natural goodness in every bite.',
  },
  {
    icon: Truck,
    title: 'Delivered Worldwide',
    desc: 'From Jaipur to your doorstep, anywhere in the world. We ship across 11+ countries with care and freshness guaranteed.',
  },
];

const Products = () => {
  const { products } = useProducts();

  return (
    <div className="pt-20">
      {/* Products Header & Grid */}
      <section className="section-padding indian-section-bg relative indian-paisley-left indian-paisley-right">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
              Our <span className="text-secondary">Products</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our range of healthy, natural food products across 5 wholesome categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="indian-divider" />

      {/* Benefits Strip */}
      <section className="py-10 bg-primary">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {benefits.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="font-heading text-primary-foreground text-lg">{b.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="indian-divider" />

      {/* Why Our Products Stand Out */}
      <section className="section-padding indian-section-bg relative">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-secondary font-semibold tracking-widest uppercase text-sm mb-3">
              The Ooorrrzzzaaa Promise
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
              Why Our Products <span className="text-secondary">Stand Out</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {productHighlights.map((item) => (
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
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[40px] border-accent/30" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-3xl text-center relative z-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl text-primary-foreground mb-4">
            Looking for Bulk Orders?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            We offer special pricing for bulk and wholesale orders. Perfect for retailers, gifting, and corporate wellness programs.
          </p>
          <Link to="/contact" className="btn-saffron inline-flex items-center gap-2 justify-center">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Products;
