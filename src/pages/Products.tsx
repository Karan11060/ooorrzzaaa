import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Products = () => {
  const { products, loading } = useProducts();

  return (
    <div className="pt-20 section-padding indian-section-bg relative indian-paisley-left indian-paisley-right">
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
            Each product is crafted with care, using 100% natural ingredients and ancient Indian recipes
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
