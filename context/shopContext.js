import { createContext, useEffect, useState } from 'react';
import { createCheckout, updateCheckout } from '../lib/shopify';

const CartContext = createContext();

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id);
      // console.log(cartObject);
      // Check if cart has any items.
      if (cartObject[0].id) {
        setCart([cartObject[0]]);
      } else if (cartObject[0].length > 0) {
        setCart(...[cartObject[0]]);
      }

      setCheckoutId(cartObject[1].id);
      setCheckoutUrl(cartObject[1].webUrl);
    }
  }, []);

  async function addToCart(newItem) {
    setCartOpen(true);
    // Check if empty cart. Add the new item to cart with checkout id and url
    if (cart.length === 0) {
      setCart([newItem]);

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );

      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);

      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newItem, checkout])
      );
    } else {
      // Check if id is the same, increase the qty by 1 or add new variant to cart.
      let newCart = [];
      let added = false;

      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++;
          newCart = [...cart];
          added = true;
        }
      });

      if (!added) {
        newCart = [...cart, newItem];
      }

      setCart(newCart);
      const newCheckout = await updateCheckout(checkoutId, newCart);
      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newCart, newCheckout])
      );
    }
    console.log('CART: ', cart);
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter(
      (item) => item.id !== itemToRemove
    );

    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);

    localStorage.setItem(
      'checkout_id',
      JSON.stringify([updatedCart, newCheckout])
    );

    if (cart.length === 1) {
      setCartOpen(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;
export { ShopConsumer, CartContext };
