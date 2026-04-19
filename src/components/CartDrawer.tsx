import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';

const CartDrawer = () => {
  const { items, isOpen, toggleCart, updateQty, removeItem } = useCartStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 z-50"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-background z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-2xl flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-secondary" />
                Your Cart
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-muted/50">
                      <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-background flex items-center justify-center border border-border">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-background flex items-center justify-center border border-border">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="self-start p-1 hover:bg-destructive/10 rounded">
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Items</span>
                  <span>{items.reduce((sum, i) => sum + i.quantity, 0)}</span>
                </div>
                <button onClick={() => { toggleCart(); navigate('/checkout'); }} className="btn-saffron w-full text-center">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
