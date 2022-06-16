import { getProductsInCollection } from '../lib/shopify';
import ProductList from '../components/ProductList';
import Hero from '../components/Hero';
import Head from 'next/head';

export default function Home({ products }) {
  return (
    <div className="">
      <Head>
        <title>Headless Shopify</title>
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=utf-8"
        />
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=ISO-8859-1"
        />
      </Head>
      <Hero />
      <ProductList products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: { products },
  };
}
