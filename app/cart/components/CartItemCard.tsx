"use client";

import { useAppDispatch } from "@/redux/hooks";
import {
  incrementInCart,
  decrementInCart,
  removeItem,
} from "@/redux/slicers/cartSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ItemCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CartItemCard({ item }: ItemCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-[210px] space-x-[20px] p-[20px] rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="w-[230px]">
        <Image
          src={item.image}
          alt={item.name}
          className="rounded-[10px] w-full h-auto"
          width="0"
          height="0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 15vw"
        ></Image>
      </div>
      <div className="space-y-[20px]">
        <Link
          href={`/products/${item.id}`}
          className="text-[20px] hover:text-[#30628b]"
        >
          {item.name}
        </Link>
        <div className="flex">
          <button
            className="border-[1px] border-[#000000] p-2 rounded-l-[10px] hover:bg-[#30628b] hover:text-[#ffffff]"
            onClick={() => dispatch(decrementInCart({ id: item.id }))}
          >
            -
          </button>
          <div className="text-center border-y-[1px] border-[#000000] w-[20%] p-2">
            {item.inCart}
          </div>
          <button
            className="border-[1px] border-[#000000] p-2 rounded-r-[10px] hover:bg-[#30628b] hover:text-[#ffffff]"
            onClick={() => dispatch(incrementInCart({ id: item.id }))}
          >
            +
          </button>
        </div>
      </div>
      <div className="grow flex flex-col items-end space-y-[90px]">
        <div className="text-[30px]">
          ¥{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <button
          className="hover:underline hover:text-[#30628b] flex items-center"
          onClick={() => dispatch(removeItem({ id: item.id }))}
        >
          <RiDeleteBin5Line className="mr-[2px]"></RiDeleteBin5Line>Remove
        </button>
      </div>
    </div>
  );
}
