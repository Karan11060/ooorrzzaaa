import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Globe, Clock, Users, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const addItem = useCartStore((s) => s.addItem);

  if (loading) {
    return (
      <div className="pt-20 section-padding flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="font-heading text-3xl mb-4">Product Not Found</h1>
        <Link to="/products" className="btn-green-outline">Back to Products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-20 section-padding">
      <div className="container mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl overflow-hidden">
            <img src={product.image_url} alt={product.name} className="w-full aspect-square object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium w-fit mb-3">
              {product.type}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-4">{product.name}</h1>
            <p className="text-muted-foreground text-lg mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Shelf Life: {product.shelf_life}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                Age: {product.age_group}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Globe className="w-4 h-4 text-primary" /> Available in:
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.markets || []).map((m: string) => (
                  <span key={m} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{m}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-foreground">₹{product.price_inr}</span>
              <span className="text-lg text-muted-foreground">${product.price_usd}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addItem({
                id: product.id,
                name: product.name,
                price_inr: product.price_inr,
                image_url: product.image_url,
              })}
              className="btn-saffron flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-20">
          <h2 className="font-heading text-3xl text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
