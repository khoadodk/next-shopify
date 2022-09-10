import ProductList from "../../components/ProductList"
import { getProductsInCollection } from '../../lib/shopify';

const Products = ({ products }) => {
  return (
    <div><ProductList products={products} /></div>
  )
}

export default Products

export async function getStaticProps() {
    const products = await getProductsInCollection();
    return {
      props: { products },
    };
}