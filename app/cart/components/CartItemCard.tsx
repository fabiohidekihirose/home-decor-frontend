"use client";

import { useAppDispatch } from "@/redux/hooks";
import {
  incrementInCart,
  decrementInCart,
  removeItem,
} from "@/redux/slicers/cart/slicers";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CartItemCardProps } from "@/types";

export default function CartItemCard({ cartItem }: CartItemCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-[210px] space-x-[20px] p-[20px] rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="w-[30%]">
        <img src={cartItem.image} className="rounded-[10px]"></img>
      </div>
      <div className="space-y-[20px]">
        <h3 className="text-[20px]">{cartItem.name}</h3>
        <div className="flex">
          <button
            className="border-[1px] border-[#000000] p-2 rounded-l-[10px] hover:bg-[#30628b] hover:text-[#ffffff]"
            onClick={() => dispatch(decrementInCart({ id: cartItem.id }))}
          >
            -
          </button>
          <div className="text-center border-y-[1px] border-[#000000] w-[20%] p-2">
            {cartItem.inCart}
          </div>
          <button
            className="border-[1px] border-[#000000] p-2 rounded-r-[10px] hover:bg-[#30628b] hover:text-[#ffffff]"
            onClick={() => dispatch(incrementInCart({ id: cartItem.id }))}
          >
            +
          </button>
        </div>
      </div>
      <div className="grow flex flex-col items-end space-y-[90px]">
        <div className="text-[30px]">
          ¥{cartItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <button
          className="hover:underline hover:text-[#30628b] flex items-center"
          onClick={() => dispatch(removeItem({ id: cartItem.id }))}
        >
          <RiDeleteBin5Line className="mr-[2px]"></RiDeleteBin5Line>Remove
        </button>
      </div>
    </div>
  );
}
