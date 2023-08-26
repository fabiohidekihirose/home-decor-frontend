import Link from "next/link";
import Image from "next/image";
import { BiCartAdd } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { addToFavorite, removeFavorite } from "@/redux/slicers/favoriteSlice";
import DiscountPrice from "@/components/DiscountPrice";
import { ProductProps } from "@/types";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slicers/cartSlice";
import { useState } from "react";

interface ProductCard {
  product: ProductProps;
}

export default function ProductCard({ product }: ProductCard) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(
    (state) => state.favoriteReducer.favorite
  );
  const [isFavorited, setIsFavorited] = useState(
    !!favoriteList.filter((favorite) => favorite.id === product.id).length
  );

  const addToCartHandler = (product: ProductProps) => {
    dispatch(addToCart({ ...product, inCart: 1 }));
    router.push("/cart");
  };

  const favoriteButtonHandler = () => {
    if (isFavorited) {
      setIsFavorited(false);
      dispatch(removeFavorite(product));
    } else {
      setIsFavorited(true);
      dispatch(addToFavorite(product));
    }
  };

  return (
    <div
      key={product.id}
      className="xl:w-[33.3%] md:w-1/2 h-auto border-[1px] p-4 rounded-[10px] border-[#ffffff] hover:border-[#9d9e9f] mb-[20px] hover:shadow-[0_4px_30px_rgba(157,157,157,0.25)]"
    >
      <Link href={`products/${product.id}`}>
        <Image
          alt={product.name}
          src={product.image}
          width="0"
          height="0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 15vw"
          className="rounded-[10px] w-full h-auto"
        ></Image>
        <div className="pt-[10px] text-[#000000]">
          <p className="text-[18px]">{product.name}</p>
          {product.discount > 0 ? (
            <DiscountPrice
              price={product.price}
              discount={product.discount}
              textSize={24}
            />
          ) : (
            <p className="text-[24px]">
              ¥{product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-[10px] mt-[10px]">
        <button
          className="flex items-center space-x-[5px] bg-[#30628B] text-[#ffffff] p-2 rounded-[10px] hover:bg-[#4186BE]"
          onClick={() => addToCartHandler(product)}
        >
          <BiCartAdd></BiCartAdd>
          <p>Add to cart</p>
        </button>
        <button
          onClick={favoriteButtonHandler}
          className={`${
            isFavorited && "bg-[#30628B] text-[#FFFFFF]"
          } hover:bg-[#4186BE] hover:text-[#FFFFFF] rounded-[50%] p-2`}
        >
          <MdOutlineFavoriteBorder size={30} />
        </button>
      </div>
    </div>
  );
}
