import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  image_url: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product) => {
        const items = get().items;
        const existing = items.find(i => i.id === product.id);
        if (existing) {
          set({ items: items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      updateQty: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return; }
        set({ items: get().items.map(i => i.id === id ? { ...i, quantity: qty } : i) });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'ooorrrzzzaaa-cart' }
  )
);
