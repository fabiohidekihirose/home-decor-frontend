import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "@/types";

export interface Item {
  id: number;
}

interface ItemInCart {
  inCart: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [] as ProductProps[],
  },
  reducers: {
    addToCart: (state, action: PayloadAction<ProductProps>) => {
      const item: ItemInCart | undefined = state.cart.find(
        (item: Item) => item.id === action.payload.id
      );

      if (item) {
        item.inCart += action.payload.inCart;
      } else {
        state.cart.push({ ...action.payload, inCart: action.payload.inCart });
      }
    },

    incrementInCart: (state, action) => {
      const item: ItemInCart | undefined = state.cart.find(
        (item: Item) => item.id === action.payload.id
      );

      if (item) {
        item.inCart++;
      }
    },

    decrementInCart: (state, action) => {
      const item: ItemInCart | undefined = state.cart.find(
        (item: Item) => item.id === action.payload.id
      );

      if (item) {
        if (item.inCart === 1) {
          item.inCart = 1;
        } else {
          item.inCart--;
        }
      }
    },

    removeItem: (state, action) => {
      const newCart = state.cart.filter(
        (item: Item) => item.id !== action.payload.id
      );

      state.cart = newCart;
    },

    removeAllItens: (state, action) => {
      const newCart = [] as ProductProps[];

      state.cart = newCart;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementInCart,
  decrementInCart,
  removeItem,
  removeAllItens,
} = cartSlice.actions;
