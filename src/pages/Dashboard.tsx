import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Phone, Save, Loader2, CheckCircle, Truck, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const statusSteps = [
  { key: 'processing', label: 'Processing', icon: Clock },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const StatusStepper = ({ status }: { status: string }) => {
  const currentIdx = statusSteps.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center gap-1">
      {statusSteps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i <= currentIdx;
        return (
          <div key={step.key} className="flex items-center gap-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <Icon className="w-3 h-3" />
            </div>
            {i < statusSteps.length - 1 && (
              <div className={`w-6 h-0.5 ${i < currentIdx ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<'profile' | 'orders'>('orders');
  const [profile, setProfile] = useState({ full_name: '', phone: '', address: '', city: '', pincode: '' });
  const [orders, setOrders] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        const addr = (profileData.address as any) || {};
        setProfile({
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          address: addr.address || '',
          city: addr.city || '',
          pincode: addr.pincode || '',
        });
      }

      // Fetch orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersData) setOrders(ordersData);
      setLoadingData(false);
    };

    fetchData();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        address: { address: profile.address, city: profile.city, pincode: profile.pincode },
      })
      .eq('id', user.id);

    if (error) {
      toast({ title: 'Failed to save', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Profile updated! ✨' });
    }
    setSaving(false);
  };

  if (authLoading || loadingData) {
    return (
      <div className="pt-20 section-padding flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="pt-20 section-padding">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground mb-8">My Dashboard</h1>

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1 mb-8 w-fit">
          {(['orders', 'profile'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                tab === t ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {t === 'orders' ? <Package className="w-4 h-4" /> : <User className="w-4 h-4" />}
              {t === 'orders' ? 'Orders' : 'Profile'}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const items = (order.items as any[]) || [];
                  return (
                    <div key={order.id} className="glass-card p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Order ID</p>
                          <p className="font-mono text-sm">{order.id.slice(0, 8)}...</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Items</p>
                          <p className="text-sm">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="text-sm font-bold">₹{order.total_inr}</p>
                        </div>
                        <StatusStepper status={order.status || 'processing'} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {tab === 'profile' && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSaveProfile}
            className="max-w-lg space-y-5"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={profile.full_name} onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Address</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={profile.address} onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">City</label>
                <input value={profile.city} onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Pincode</label>
                <input value={profile.pincode} onChange={(e) => setProfile((p) => ({ ...p, pincode: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-saffron flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
