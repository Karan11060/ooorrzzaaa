import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { motion } from 'framer-motion';

const Products = () => {
  const { products } = useProducts();

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
            Explore our range of healthy, natural food products across 5 wholesome categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
