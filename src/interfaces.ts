interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
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
  quantity: number;
}
interface ComboInCart {
  combo: Combo;
  quantity: number;
}
interface CartState {
  product: ProductInCart[];
  combo: ComboInCart[];
}

export type { Product, CartState, Combo };
