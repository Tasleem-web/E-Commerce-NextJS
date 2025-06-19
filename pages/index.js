import React, { useState } from 'react'
import { getData } from '../utils/fetchData';
import Head from 'next/head';
import ProductItem from '../components/product/ProductItem';

export default function Home(props) {

  const [productList, setProductList] = useState(props.products || []);

  return (
    <div className='products'>
      <Head><title> Home Page</title></Head>

      {productList.map(product => (
        <ProductItem key={product._id} product={product} />
      ))}
      {productList.length === 0 && <p className="text-center">No products available</p>}
    </div>
  )
}


export async function getServerSideProps() {
  const res = await getData('product');

  return {
    props: {
      products: res.products || [], // Ensure products is an array
      result: res.result || 0, // Ensure result is a number
    },
  };
}