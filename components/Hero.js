
import Image from 'next/image'
import ShopButton from './ShopButton';

export default function Hero() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 h-[80vh] max-w-7xl">
        {/* Col 1 */}
        <div className='my-auto text-center'>
            <h1 className="font-extrabold text-gray-900">
            <p className="text-xl sm:text-4xl md:text-3xl">
              Headless Shopify with Next.js
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-4xl sm:text-4xl md:text-5xl">
              Modern eCommerce
            </p>
          </h1>
          <h2 className="mt-3 max-w-md mx-auto text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-x-3xl">
            Build the eCommerce Revolution.
          </h2>
          <div className="mt-5 max-w-md mx-auto flex justify-center items-center md:mt-8">
            <ShopButton />
          </div>
        </div>
        {/* Col-2 */}
        <div className='relative'>
          <Image
            src="/images/hero.png"
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
  );
}
