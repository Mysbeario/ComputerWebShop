import { atom, selector } from "recoil";
import { CartState, Product } from "../interfaces";

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

export { accountState, cartState, searchState };
export type { AccountState, SearchState };
