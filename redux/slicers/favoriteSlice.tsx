import { createSlice } from "@reduxjs/toolkit";
import { Item } from "./cartSlice";
import { ProductProps } from "@/types";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [] as ProductProps[],
  },
  reducers: {
    addToFavorite: (state, action) => {
      state.favorite.push(action.payload);
    },

    removeItem: (state, action) => {
      const newFavList = state.favorite.filter(
        (item: Item) => item.id !== action.payload.id
      );

      state.favorite = newFavList;
    },

    removeAllItems: (state, action) => {
      const newFavList = [] as ProductProps[];

      state.favorite = newFavList;
    },
  },
});
