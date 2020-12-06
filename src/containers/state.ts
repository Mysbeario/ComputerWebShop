import { atom, selector } from "recoil";

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

const cartState = atom<any>({
  key: "cart",
  default: [],
});

export { accountState, cartState };
export type { AccountState };
