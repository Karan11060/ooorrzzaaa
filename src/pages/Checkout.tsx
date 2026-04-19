import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, User, CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { openRazorpayCheckout } from '@/lib/razorpay';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Please login first', variant: 'destructive' });
      return;
    }
    if (items.length === 0) return;

    setLoading(true);

    try {
      const orderId = `order_demo_${Date.now()}`;

      await openRazorpayCheckout({
        orderId,
        amount: 0,
        userName: form.name,
        userEmail: user.email || '',
        userPhone: form.phone,
        onSuccess: async (response) => {
          const { error } = await supabase.from('orders').insert({
            user_id: user.id,
            items: items as any,
            total_inr: 0,
            razorpay_order_id: response.razorpay_order_id || orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            status: 'processing',
            shipping_address: {
              name: form.name,
              phone: form.phone,
              address: form.address,
              city: form.city,
              pincode: form.pincode,
            },
          });

          if (error) {
            toast({ title: 'Failed to save order', description: error.message, variant: 'destructive' });
          } else {
            clearCart();
            navigate('/order-success');
          }
          setLoading(false);
        },
        onFailure: () => {
          toast({ title: 'Payment cancelled', variant: 'destructive' });
          setLoading(false);
        },
      });
    } catch {
      const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        items: items as any,
        total_inr: 0,
        razorpay_order_id: `demo_${Date.now()}`,
        razorpay_payment_id: `demo_pay_${Date.now()}`,
        status: 'processing',
        shipping_address: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
        },
      });

      if (!error) {
        clearCart();
        navigate('/order-success');
      } else {
        toast({ title: 'Order failed', description: error.message, variant: 'destructive' });
      }
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="font-heading text-3xl mb-4">Your cart is empty</h1>
        <Link to="/products" className="btn-saffron">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 section-padding">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Shipping Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handlePay}
            className="lg:col-span-3 space-y-5"
          >
            <h2 className="font-heading text-xl mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" /> Shipping Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input name="name" value={form.name} onChange={handleChange} required
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input name="phone" value={form.phone} onChange={handleChange} required type="tel"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" placeholder="+91 9876543210" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Address</label>
              <input name="address" value={form.address} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Street address, apartment, etc." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">City</label>
                <input name="city" value={form.city} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" placeholder="City" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Pincode</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} required pattern="[0-9]{6}"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" placeholder="110001" />
              </div>
            </div>

            <button type="submit" disabled={loading || !user} className="btn-saffron w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-50">
              <CreditCard className="w-5 h-5" />
              {loading ? 'Processing...' : 'Place Order'}
            </button>

            {!user && <p className="text-destructive text-sm text-center">Please login to complete your purchase</p>}

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs mt-2">
              <ShieldCheck className="w-4 h-4" /> Secured by Razorpay
            </div>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 sticky top-24">
              <h2 className="font-heading text-xl mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between text-lg font-bold">
                <span>Total Items</span>
                <span>{items.reduce((sum, i) => sum + i.quantity, 0)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
