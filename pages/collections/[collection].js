import { getProductsInCollection, getAllCollections } from '../../lib/shopify';
import ProductList from '../../components/ProductList';

export default function CollectionPage({ products, pageTitle }) {
  return (
    <div className="">
      <h2 className="text-center uppercase text-2xl font-extrabold text-gray-900 my-6">
        {pageTitle}
      </h2>
    <ProductList products={products} />
  </div>
  );
}

export async function getStaticPaths() {
  const collections = await getAllCollections();

  const paths = collections.map((item) => {
    const collection = String(item.node.handle);

    return {
      params: { collection },
    };
  });
  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({params}) {
    const products = await getProductsInCollection(params.collection);
    return {
      props: {
        products,
        pageTitle: params.collection
      },
    };
};

