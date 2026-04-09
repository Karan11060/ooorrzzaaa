import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  shelf_life: string;
  price_inr: number;
  image_url: string;
}

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
          background: 'linear-gradient(135deg, hsl(var(--deep-green)), hsl(var(--saffron)))',
        }}
      />

      <Link to={`/products/${product.id}`}>
        <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex gap-2 mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
            {product.type}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {product.shelf_life}
          </span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading text-lg text-foreground mb-2 hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
