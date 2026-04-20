import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '@/data/products';

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative glass-card overflow-hidden hover:animate-shimmer-gold"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--cream)) 100%)',
        border: '1px solid transparent',
        backgroundClip: 'padding-box',
      }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-[1px] -z-10"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--deep-green)), hsl(var(--cream)))',
        }}
      />

      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-2xl relative bg-white flex items-center justify-center p-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
            {product.category}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {product.servingSize}
          </span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading text-lg text-foreground mb-2 hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-green-900 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-end">
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
