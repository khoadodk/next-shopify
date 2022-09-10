import { getProductsInCollection } from '../lib/shopify';
import ProductList from '../components/ProductList';
import Hero from '../components/Hero';
import Head from 'next/head';
import Banner from '../components/Banner';
import TwoColBanner from '../components/TwoColBanner';

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
      <Banner title="STEP UP IN APEX" subtitle="The collection that keeps you cool, now with Gymshark ESNCETM anti-odour technology fabric" bgImg={"/images/banner1.webp"}  />
      <div className='pt-[50px]'>
        <Banner title="DO IT ALL IN VITAL" subtitle="New colors, new styles. Because you can do it all, and so can Vital." bgImg={"/images/banner3.webp"}  />
      </div>
      <div className='pt-[50px]'>
        <Banner title="NEW TO THE ADAPT FAMILY" subtitle="Brand new Adapt Camo & Adapt Marl patterns, shades andshapes for you to feel good, and perform better." bgImg={"/images/banner2.webp"}  />
      </div>
      <div className='pt-[50px]'>
        <TwoColBanner title1="shop womens" title2="shop mens" bgImg1={"/images/women.webp"} bgImg2={"/images/men.webp"}/>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: { products },
  };
}
