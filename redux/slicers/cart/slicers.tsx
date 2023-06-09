import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: number;
}

interface Product {
  id: number;
  department_name: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
  inCart: number;
}

interface ItemInCart {
  inCart: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [] as Product[],
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item: ItemInCart | undefined = state.cart.find(
        (item: Item) => item.id === action.payload.id
      );

      if (item) {
        item.inCart++;
      } else {
        state.cart.push({ ...action.payload, inCart: 1 });
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
      const item: ItemInCart | undefined = state.cart.find((item: Item) => {
        item.id === action.payload.id;
      });

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
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
