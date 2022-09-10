import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from 'react';
import { CartContext } from '../context/shopContext';
import MiniCart from './MiniCart';

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);
  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });
  return (
    <header className="border-b sticky top-0 z-20 bg-white px-5">
      <div className="flex items center justify-between max-w-6xl py-6 pb-4 px-4 mx-auto lg:max-w-screen-xl">
        {/* Logo */}
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="text-xl pt-1 font-bold">
              Next Shopify
            </span>
          </a>
        </Link>
        
        {/* Nav */}
        <nav className='flex gap-6'>
        <Link href="/collections/men" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-semibold">
              Mens
            </span>
          </a>
        </Link>
        <Link href="/collections/women" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-semibold">
              Womens
            </span>
          </a>
        </Link>
        </nav>

        {/* Cart */}
        <a
          className="text-md font-bold cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
        >
          <Image 
            src="/icons/cart.svg"
            height="25"
            width="25"
            className='relative'
          /> <span className='absolute bottom-[15px] right-[25px] border rounded-full px-[6px] bg-blue-400 text-sm text-white'>{cartQuantity}</span>
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  );
}
