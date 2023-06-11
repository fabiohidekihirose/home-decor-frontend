"use client";

import { useAppSelector } from "@/redux/hooks";
import { ProductProps } from "@/types";
import CartItem from "./components/CartItemCard";

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cart);

  const getTotal = () => {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      totalItems += cartItem.inCart;
      totalPrice += cartItem.inCart * cartItem.price;
    });

    return { totalItems, totalPrice };
  };

  return (
    <div className="flex p-24 pt-36 space-x-[2%] text-[#000000] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="w-[64%] space-y-[30px]">
        <h2 className="text-[40px] font-[500]">My Cart</h2>
        <div className="space-y-[20px]">
          {cartItems.length
            ? cartItems.map((cartItem: ProductProps) => (
                <CartItem cartItem={cartItem} key={cartItem.id} />
              ))
            : "No items in Cart"}
        </div>
      </div>
      <div className="w-[34%] p-6 rounded-[10px] space-y-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)] h-min">
        <h2 className="text-[20px]">Order Summary</h2>

        <p className="font-[600] text-[25px]">
          Total ({getTotal().totalItems} items): ¥{" "}
          {getTotal()
            .totalPrice.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <button className="bg-[#30628b] text-[#ffffff] p-4 rounded-[10px] hover:bg-[#4186BE] w-full">
          Procedure to checkout
        </button>
      </div>
    </div>
  );
}
