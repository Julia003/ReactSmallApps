import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      state.totalQuantity++;
      state.changed = true;

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.items.push({
          id: item.id,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
          name: item.title,
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);

      state.totalQuantity--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
