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
interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  image: string;
}
const addToCart = (cart: any, item: Item, quantity: number): any => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex((x: { id: number }) => x.id === item.id);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + quantity,
    };
    return newCart;
  }

  // Add new item
  newCart.push({
    id: item.id,
    product: item,
    quantity: 1,
  });
  return newCart;
};

const removeFromCart = (cart: any, item: Item): any => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex((x: { id: number }) => x.id === item.id);

  // Increase quantity if existing
  if (foundIndex >= 0 && newCart[foundIndex].quantity > 1) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity - 1,
    };
    return newCart;
  }

  return newCart;
};

const dropItem = (cart: any, item: Item): any => {
  let newCart = [...cart];
  const foundIndex = cart.findIndex((x: { id: number }) => x.id === item.id);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart.splice(foundIndex, 1);
  }
  return newCart;
};

export { moneyFormater, formatString, addToCart, removeFromCart, dropItem };
