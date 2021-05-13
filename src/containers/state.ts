import { atom } from "recoil";
import { CartState } from "../interfaces";

interface AccountState {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

const accountState = atom<AccountState>({
  key: "accountState",
  default: {
    id: -1,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  },
});

interface ShippingInfoState {
  name: string;
  address: string;
  phone: string;
}

const shippingInfoState = atom<ShippingInfoState>({
  key: "shippingInfoState",
  default: {
    name: "",
    address: "",
    phone: "",
  },
});

const cartState = atom<CartState>({
  key: "cart",
  default: {
    product: [],
    combo: [],
  },
});

interface SearchState {
  key: string;
  value: string;
}
const searchState = atom<SearchState>({
  key: "searchState",
  default: {
    key: "search",
    value: " ",
  },
});

const categoryState = atom<[]>({
  key: "categoryState",
  default: [],
});

interface AccountState1 {
  name: string;
  age: number;
}

export const Account = atom<AccountState1>({
  key: "accountState",
  default: {
    name: "",
    age: 0,
  },
});

export {
  accountState,
  cartState,
  searchState,
  categoryState,
  shippingInfoState,
};
export type { AccountState, SearchState };
