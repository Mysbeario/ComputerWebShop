interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  amount: number;
  image: string;
}

interface Combo {
  id: number;
  name: string;
  discount: number;
  price: number;
  originPrice: number;
  details: Product[];
}
interface ProductInCart {
  product: Product;
  amount: number;
}
interface ComboInCart {
  combo: Combo;
  amount: number;
}
interface CartState {
  product: ProductInCart[];
  combo: ComboInCart[];
}

export type { Product, CartState, Combo };
