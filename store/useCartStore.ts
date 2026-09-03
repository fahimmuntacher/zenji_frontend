import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { CartItem, CartStore } from "@/types/cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.id === item.id && i.size === item.size
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems, isOpen: true };
          }

          return {
            items: [...state.items, { ...item, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        }));
      },

      updateQuantity: (id, size, delta) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id && item.size === size) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { items: updatedItems };
        });
      },

      setQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCartDrawer: (open) =>
        set((state) => ({
          isOpen: typeof open === "boolean" ? open : !state.isOpen,
        })),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "zenji-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
