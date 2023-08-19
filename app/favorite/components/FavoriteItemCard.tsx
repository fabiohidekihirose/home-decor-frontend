import { RiDeleteBin5Line } from "react-icons/ri";
import { ItemCardProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { removeFavorite } from "@/redux/slicers/favoriteSlice";
import { addToCart } from "@/redux/slicers/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { ProductProps } from "@/types";

export default function FavoriteItemCard({ item }: ItemCardProps) {
  const [counterItem, setCounterItem] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const addToCartHandler = (product: ProductProps) => {
    dispatch(addToCart({ ...product, inCart: counterItem }));
    router.push("/cart");
  };

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
            onClick={() =>
              setCounterItem((curr) => (curr === 1 ? 1 : curr - 1))
            }
          >
            -
          </button>
          <div className="text-center border-y-[1px] border-[#000000] w-[20%] p-2">
            {counterItem}
          </div>
          <button
            className="border-[1px] border-[#000000] p-2 rounded-r-[10px] hover:bg-[#30628b] hover:text-[#ffffff]"
            onClick={() => setCounterItem((curr) => curr + 1)}
          >
            +
          </button>
        </div>
        <button
          className="flex items-center space-x-[5px] bg-[#30628B] text-[#ffffff] p-2 rounded-[10px] hover:bg-[#4186BE]"
          onClick={() => addToCartHandler(item)}
        >
          <BiCartAdd></BiCartAdd>
          <p>Add to cart</p>
        </button>
      </div>
      <div className="grow flex flex-col items-end space-y-[90px]">
        <div className="text-[30px]">
          ¥{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <button
          className="hover:underline hover:text-[#30628b] flex items-center"
          onClick={() => dispatch(removeFavorite({ id: item.id }))}
        >
          <RiDeleteBin5Line className="mr-[2px]"></RiDeleteBin5Line>Remove
        </button>
      </div>
    </div>
  );
}
