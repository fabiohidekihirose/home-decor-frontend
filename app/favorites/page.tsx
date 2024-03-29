"use client";

import { useAppSelector } from "@/redux/hooks";
import { ProductProps } from "@/types";
import FavoriteItemCard from "./components/FavoriteItemCard";

export default function Favorite() {
  const favoriteItems = useAppSelector(
    (state) => state.favoriteReducer.favorite
  );

  return (
    <div className="flex max-lg:p-6 p-24 max-lg:pt-40 lg:pt-44 xl:pt-36 lg:space-x-[2%] text-[#000000] shadow-[0_4px_30px_rgba(157,157,157,0.25)] max-lg:space-y-[30px] w-full">
      <div className="space-y-[30px] w-full">
        <h2 className="text-[40px] font-[500]">Favorite Items</h2>
        <div className="space-y-[20px] w-full">
          {favoriteItems.length
            ? favoriteItems.map((favoriteItem: ProductProps) => (
                <FavoriteItemCard item={favoriteItem} key={favoriteItem.id} />
              ))
            : "No favorite items yet"}
        </div>
      </div>
    </div>
  );
}
