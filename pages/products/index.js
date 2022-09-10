import ProductList from "../../components/ProductList"
import { getProductsInCollection } from '../../lib/shopify';

const Products = ({ products }) => {
  return (
    
    <div className="">
      <h2 className="text-center text-2xl font-extrabold text-gray-900 my-6">
        Featured Products
      </h2>
      <ProductList products={products} />
    </div>
  )
}

export default Products

export async function getStaticProps() {
    const products = await getProductsInCollection("frontpage");
    return {
      props: { products },
    };
}