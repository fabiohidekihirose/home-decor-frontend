"use client";

import { useAppSelector } from "@/redux/hooks";
import { ProductProps } from "@/types";
import CartItem from "./components/CartItemCard";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cart);
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const getTotal = () => {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      totalItems += cartItem.inCart;
      totalPrice += cartItem.inCart * cartItem.price;
    });

    return { totalItems, totalPrice };
  };

  const checkoutHandler = async () => {
    try {
      const url = await axios.post(baseURL + "/products/checkout", cartItems);
      router.push(url.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex max-lg:flex-col max-lg:p-6 p-24 max-lg:pt-36 lg:pt-44 xl:pt-36 lg:space-x-[2%] text-[#000000] shadow-[0_4px_30px_rgba(157,157,157,0.25)] max-lg:space-y-[30px]">
      <div className="lg:w-[64%] space-y-[30px]">
        <h2 className="text-[40px] font-[500]">My Cart</h2>
        <div className="space-y-[20px]">
          {cartItems.length
            ? cartItems.map((cartItem: ProductProps) => (
                <CartItem item={cartItem} key={cartItem.id} />
              ))
            : "No items in Cart"}
        </div>
      </div>
      <div className="lg:w-[34%] p-6 rounded-[10px] space-y-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)] h-min">
        <h2 className="text-[20px]">Order Summary</h2>

        <p className="font-[600] text-[25px]">
          Total ({getTotal().totalItems} items): ¥{" "}
          {getTotal()
            .totalPrice.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <button
          className="bg-[#30628b] text-[#ffffff] p-4 rounded-[10px] hover:bg-[#4186BE] w-full"
          onClick={checkoutHandler}
        >
          Procedure to checkout
        </button>
      </div>
    </div>
  );
}
