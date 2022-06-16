import { useContext, useEffect, useState } from 'react';
import { formatter } from '../utils/helpers';
import ProductOptions from './ProductOptions';
import { CartContext } from '../context/shopContext';
import useSWR from 'swr';
import axios from 'axios';

// Data Fetching
const fetcher = (url, id) =>
  axios
    .get(url, {
      params: {
        id,
      },
    })
    .then((res) => res.data);

export default function ProductForm({ product }) {
  // SWR hook
  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetcher(url, id),
    { errorRetryCount: 3 }
  );

  const [available, setAvailable] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(
        (item) => item.node.id === selectedVariant.id
      );
      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
  });

  // Dynamic variant based on option
  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions = {};
    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  // 1st option as default value for initial state
  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  // Initial States
  const [selectedVariant, setSelectedVariant] = useState(
    allVariantOptions[0]
  );
  const [selectedOptions, setSelectedOptions] =
    useState(defaultValues);

  // Onchange
  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (
        JSON.stringify(item.options) === JSON.stringify(selection)
      ) {
        setSelectedVariant(item);
      }
    });
  }

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-4xl font-bold">{product.title}</h2>
      <span className="pb-6">
        {formatter.format(
          product.variants.edges[0].node.priceV2.amount
        )}
      </span>
      {product.options.map(({ name, values }) => (
        <ProductOptions
          key={`key=${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
      ))}
      {available ? (
        <button
          className="bg-black rounded-lg text-white px-2 py-3 mt-3 hover:bg-gray-800"
          onClick={() => addToCart(selectedVariant)}
        >
          Add to Cart
        </button>
      ) : (
        <button className="rounded-lg text-white px-2 py-3 mt-3 bg-red-800 cursor-not-allowed">
          Sold out!
        </button>
      )}
    </div>
  );
}
