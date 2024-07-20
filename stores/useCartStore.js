import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart: (product) => {
        const cart = get().cart;
        const cartItem = cart.find(item => item._id === product._id);

        if (cartItem) {
          const updatedCart = cart.map(item =>
            item._id === product._id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          );
          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },

      updateQuantity: (product, quantity) => {
        const cart = get().cart;
        const cartItem = cart.find(item => item._id === product._id);

        if (quantity > 0) {
          if (cartItem) {
            const updatedCart = cart.map(item =>
              item._id === product._id
                ? { ...item, quantity }
                : item
            );
            const oldQuantity = cartItem.quantity || 0;
            set(state => ({
              cart: updatedCart,
              totalItems: state.totalItems + (quantity - oldQuantity),
              totalPrice: state.totalPrice + (product.price * (quantity - oldQuantity)),
            }));
          } else {
            const updatedCart = [...cart, { ...product, quantity }];
            set(state => ({
              cart: updatedCart,
              totalItems: state.totalItems + quantity,
              totalPrice: state.totalPrice + (product.price * quantity),
            }));
          }
        }
      },

      removeQuantity: (product) => {
        const cart = get().cart;
        const cartItem = cart.find(item => item._id === product._id);

        if (cartItem && cartItem.quantity > 1) {
          const updatedCart = cart.map(item =>
            item._id === product._id
              ? { ...item, quantity: (item.quantity || 0) - 1 }
              : item
          );
          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
          }));
        } else {
          // Remove item if quantity is 1 or less
          const updatedCart = cart.filter(item => item._id !== product._id);
          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
          }));
        }
      },

      removeFromCart: (product) => {
        const cart = get().cart;
        const cartItem = cart.find(item => item._id === product._id);

        if (cartItem) {
          const quantity = cartItem.quantity || 0;
          const updatedCart = cart.filter(item => item._id !== product._id);
          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems - quantity,
            totalPrice: state.totalPrice - (product.price * quantity),
          }));
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
