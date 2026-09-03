export interface CartItem {
  id: string;
  name: string;
  japaneseTitle?: string;
  price: number;
  size: string;
  imageFront: string;
  quantity: number;
  printType?: string;
  gsmRating?: string;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, delta: number) => void;
  setQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCartDrawer: (open?: boolean) => void;
  totalItems: () => number;
  subtotal: () => number;
}
