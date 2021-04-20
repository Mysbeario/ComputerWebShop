import { useRecoilState } from "recoil";
import { cartState } from "../containers/state";
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
  amount: number
): CartState => {
  const foundItem = cart.product.find((x) => x.product.id === item.id);
  console.log(cart);
  // Increase amount if existing
  if (foundItem) {
    if (foundItem.amount + amount <= foundItem.product.amount) {
      const data = [...cart.product];
      const index = data.indexOf(foundItem);

      data[index] = {
        ...foundItem,
        amount: foundItem.amount + amount,
      };
      return {
        ...cart,
        product: data,
      };
    }
  }
  if (item.amount >= 1 && foundItem == undefined) {
    // Add new item
    return {
      ...cart,
      product: [
        ...cart.product,
        {
          product: item,
          amount: 1,
        },
      ],
    };
  }
  return { ...cart };
};

const addComboToCart = (
  cart: CartState,
  combo: Combo,
  amount: number
): CartState => {
  for (const detail of combo.details) {
    if (detail.amount === 0) return cart;
  }

  const foundItem = cart.combo.find((x) => x.combo.id === combo.id);

  // Increase amount if existing
  if (foundItem) {
    const data = [...cart.combo];
    const index = data.indexOf(foundItem);
    data[index] = {
      ...foundItem,
      amount: foundItem.amount + amount,
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
        amount: 1,
      },
    ],
  };
};

const getReceiptState = (state: number) => {
  switch (state) {
    case 0:
      return "Processing";
    case 1:
      return "Procceded";
    case 2:
      return "Canceled";
    default:
      return "";
  }
};
const removeComboFromCart = (
  cart: CartState,
  combo: Combo,
  amount: number
): CartState => {
  const foundItem = cart.combo.find((x) => x.combo.id === combo.id);

  // Increase amount if existing
  if (foundItem && foundItem.amount > 1) {
    const data = [...cart.combo];
    const index = data.indexOf(foundItem);
    data[index] = {
      ...foundItem,
      amount: foundItem.amount - amount,
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

  // Increase amount if existing
  if (foundItem && foundItem.amount > 1) {
    const data = [...cart.product];
    const index = data.indexOf(foundItem);
    data[index] = {
      ...foundItem,
      amount: foundItem.amount - 1,
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

  if (foundItem && foundItem.amount >= 1) {
    const data = [...cart.combo];
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

  if (foundItem && foundItem.amount >= 1) {
    const data = [...cart.product];
    const index = data.indexOf(foundItem);
    data.splice(index, 1);
    return {
      ...cart,
      product: data,
    };
  }
};
const getTotal = () => {
  const [cart] = useRecoilState(cartState);
  let total = 0;
  cart.product.forEach((item: any) => {
    total = item.product.price * item.amount + total;
  });
  cart.combo.forEach((item: any) => {
    total = item.combo.originPrice * item.amount + total;
  });
  return total;
};
const getDiscount = () => {
  const [cart] = useRecoilState(cartState);
  let total = 0;
  cart.combo.forEach((item: any) => {
    total = (item.combo.originPrice - item.combo.price) * item.amount + total;
  });
  return total;
};

// const cartQuantityState= (cart:CartState)=>
// {
//   cart.combo.forEach(c => {
//     c.
//   });
// }

export {
  moneyFormater,
  formatString,
  addToCart,
  removeFromCart,
  dropItem,
  addComboToCart,
  removeComboFromCart,
  dropCombo,
  getTotal,
  getDiscount,
  getReceiptState,
};
