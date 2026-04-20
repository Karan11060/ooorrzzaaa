import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Package, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/ProductCard';
import ImageGallery from '@/components/ImageGallery';

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

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-20 section-padding">
      <div className="container mx-auto">
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <ImageGallery images={product.images} productName={product.name} category={product.category} servingSize={product.servingSize} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
                {product.category}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {product.servingSize}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4 text-primary" />
                Serving: {product.servingSize}
              </div>
              <div className="flex items-center gap-1 text-sm text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating} / 5</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addItem({
                id: product.id,
                name: product.name,
                image_url: product.image_url,
              })}
              className="btn-saffron flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </motion.button>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading text-3xl text-foreground mb-8">More in {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
