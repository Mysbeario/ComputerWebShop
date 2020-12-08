import { CartState, Product, Combo } from "../interfaces";

const moneyFormater = (number: any): any => {
  var formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(number);
};
const formatString = (number: any): any => {
  var formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(number);
};

const addToCart = (
  cart: CartState,
  item: Product,
  quantity: number
): CartState => {
  const foundItem = cart.product.find((x) => x.product.id === item.id);

  // Increase quantity if existing
  if (foundItem) {
    const data = [...cart.product];
    const index = data.indexOf(foundItem);
    data[index] = {
      ...foundItem,
      quantity: foundItem.quantity + quantity,
    };
    return {
      ...cart,
      product: data,
    };
  }

  // Add new item
  return {
    ...cart,
    product: [
      ...cart.product,
      {
        product: item,
        quantity: 1,
      },
    ],
  };
};

const addComboToCart = (
  cart: CartState,
  combo: Combo,
  quantity: number
): CartState => {
  const foundItem = cart.combo.find((x) => x.combo.id === combo.id);

  // Increase quantity if existing
  if (foundItem) {
    const data = [...cart.combo];
    const index = data.indexOf(foundItem);
    data[index] = {
      ...foundItem,
      quantity: foundItem.quantity + quantity,
    };
    return {
      ...cart,
      combo: data,
    };
  }

  // Add new item
  return {
    ...cart,
    combo: [
      ...cart.combo,
      {
        combo: combo,
        quantity: 1,
      },
    ],
  };
};

const removeComboFromCart = (
  cart: CartState,
  combo: Combo,
  quantity: number
): CartState => {
  const foundItem = cart.combo.find((x) => x.combo.id === combo.id);

  // Increase quantity if existing
  if (foundItem && foundItem.quantity > 1) {
    const data = [...cart.combo];
    const index = data.indexOf(foundItem);
    data[index] = {
      ...foundItem,
      quantity: foundItem.quantity - quantity,
    };
    return {
      ...cart,
      combo: data,
    };
  }
  return {
    ...cart,
  };
};

const removeFromCart = (cart: CartState, item: Product): CartState => {
  const foundItem = cart.product.find((x) => x.product.id === item.id);

  // Increase quantity if existing
  if (foundItem && foundItem.quantity > 1) {
    const data = [...cart.product];
    const index = data.indexOf(foundItem);
    data[index] = {
      ...foundItem,
      quantity: foundItem.quantity - 1,
    };
    return {
      ...cart,
      product: data,
    };
  }

  return {
    ...cart,
  };
};

const dropCombo = (cart: any, item: Combo): any => {
  const foundItem = cart.combo.find((x: any) => x.combo.id === item.id);

  if (foundItem && foundItem.quantity >= 1) {
    const data = [...cart.product];
    const index = data.indexOf(foundItem);
    data.splice(index, 1);
    return {
      ...cart,
      combo: data,
    };
  }

  return {
    ...cart,
  };
};
const dropItem = (cart: any, item: Product): any => {
  const foundItem = cart.product.find((x: any) => x.product.id === item.id);

  if (foundItem && foundItem.quantity >= 1) {
    const data = [...cart.product];
    const index = data.indexOf(foundItem);
    data.splice(index, 1);
    return {
      ...cart,
      product: data,
    };
  }
};

export {
  moneyFormater,
  formatString,
  addToCart,
  removeFromCart,
  dropItem,
  addComboToCart,
  removeComboFromCart,
  dropCombo,
};
