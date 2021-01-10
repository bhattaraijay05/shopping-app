import {createSlice} from '@reduxjs/toolkit';

export const shoppingCartSlice = createSlice({
  name: 'shoppingcart',
  initialState: {
    products: [],
    basket: [],
    added: false,
    user: [],
  },
  reducers: {
    addItemToBasket: (state, action) => {
      // state.basket = [...state.basket, action.payload];
      const item = state.products.find(
        (product) => product.id === action.payload.id,
      );
      // Check if Item is in cart already
      const inCart = state.basket.find((item) =>
        item.id === action.payload.id ? true : false,
      );

      return {
        ...state,
        basket: inCart
          ? state.basket.map((item) =>
              item.id === action.payload.id
                ? {...item, qty: item.qty + 1}
                : item,
            )
          : [...state.basket, {...item, qty: 1}],
      };
    },
    deleteItemFromBasket: (state = initialState, action) => {
      //   let newTODOS = [...state.basket];
      //   const index = state.basket.findIndex((td) => td.id === action.payload.id);
      //   if (index >= 0) {
      //     newTODOS.splice(index, 1);
      //   } else {
      //     console.warn('Cant do this');
      //   }
      //   return {...state, basket: newTODOS};
      // },
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload.id),
      };
    },
    increaseBasketItemQuantity: (state, action) => {
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.payload.id
            ? {...item, qty: action.payload.qty + 1}
            : item,
        ),
      };
    },
    decreaseBasketItemQuantity: (state, action) => {
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.payload.id
            ? {...item, qty: action.payload.qty - 1}
            : item,
        ),
      };
    },
    fetchUser: (state, action) => {
      state.user = action.payload;
    },
    fetchProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  addItemToBasket,
  deleteItemFromBasket,
  fetchUser,
  fetchProduct,
  adjustQuantity,
  increaseBasketItemQuantity,
  decreaseBasketItemQuantity,
} = shoppingCartSlice.actions;

export const selectUsers = (state) => state.shoppingcart.user;
export const selectProducts = (state) => state.shoppingcart.products;
export const selectBasket = (state) => state.shoppingcart.basket;
export default shoppingCartSlice.reducer;
