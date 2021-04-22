import React, { useEffect, useState } from "react";
import { Account } from "../state";
import { useRecoilState } from "recoil";
const Test = () => {
  const [product, setProduct] = useState(0);
  const [video, setVideo] = useState(0);
  const [currentAccount, setCurrentAccount] = useRecoilState(Account);
  useEffect(() => {
    console.log("Product thay đôi");
  });

  return (
    <div>
      <input
        type="button"
        value="Thêm sản phẩm"
        onClick={() => {
          setProduct(product + 1);
        }}
      ></input>
      {product}
      <div>
        <button
          onClick={() => {
            setCurrentAccount({ name: "ai vay", age: 12 });
          }}
        >
          Change account
        </button>
        <div>
          Tên {currentAccount.name}- tuổi:{currentAccount.age}
        </div>
      </div>
    </div>
  );
};
export default Test;
