import Link from 'next/link'

const ShopButton = ({url = "/products" }) => {
  return (
    <Link href={url}>
        <a className="text-[18px] font-bold inline-flex items-center justify-center h-12 px-6 py-3 border-transparent rounded-md text-white bg-gray-900 hover:bg-gray-800">
        Shop
        </a>
    </Link>
  )
}

export default ShopButton