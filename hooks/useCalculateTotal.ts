// src/hooks/useCalculateTotal.ts
import { useEffect } from 'react';
import  {useCartStore}  from '../stores/useCartStore';

type Callback = (total: number) => void;

const useCalculateTotal = (callback: Callback) => {
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    let total = 0;
    if (cart) {
      total = cart.reduce((acc, product) => acc + product.price * (product.quantity || 0), 0);
    }

    if (callback) {
      callback(total);
    }
  }, [cart, callback]);
};

export default useCalculateTotal;
