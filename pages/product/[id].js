import Head from 'next/head'
import React, { useState } from 'react'
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { getData } from '../../utils/fetchData';

export default function ProductDetails({ product }) {
  const [productItem, setProductItem] = useState(product);
  const [productIndex, setProductIndex] = useState(0);

  const { state, dispatch } = React.useContext(DataContext);
  const { cart } = state;

  return (
    <div className='product_details'>
      <div className='row detail_page mt-4'>
        <Head><title>Product Details Page</title></Head>
        <div className='col-md-6'>
          <img tabIndex="0" src={productItem.images[productIndex].url} alt={productItem.title}
            className='d-block rounded img-thumbnail w-100' style={{ height: '500px' }} />

          <div className='row mx-0 mt-2 small-img'>
            {
              productItem.images.map((img, index) => (
                <img
                  tabIndex="0"
                  key={img.url}
                  src={img.url}
                  alt={productItem.title}
                  style={{
                    height: '80px',
                    width: '20%',
                    cursor: 'pointer',
                    border: productIndex === index ? '4px solid #dc3545' : undefined
                  }}
                  onClick={() => setProductIndex(index)}
                  className="img-thumbnail rounded mr-1"
                />
              ))
            }
          </div>
        </div>
        <div className='col-md-6'>
          <h2 className='text-uppercase text-secondary'>{productItem.title}</h2>
          <h5 className='text-danger'>${productItem.price}</h5>
          <p>{productItem.description}</p>
          <div className='row justify-content-between align-items-center mx-0'>
            <p className={`${productItem.inStock > 0 ? 'text-success' : 'text-danger'}`}>In Stock: {productItem.inStock}</p>
            <p className='text-danger'>Sold: {productItem.sold}</p>
          </div>
          <div className='row justify-content-between mx-0'>
            <button className='btn btn-dark mr-2' style={{ width: '48%' }} onClick={() => dispatch(addToCart(product, cart))}
              disabled={product.inStock === 0}>
              <i className="fas fa-cart-plus mr-2"></i>
              Add to Cart
            </button>
            <button className='btn btn-dark' style={{ width: '48%' }}
              onClick={() => dispatch(addToCart(product, cart))}
              disabled={product.inStock === 0}>
              <i className="fas fa-shopping-cart mr-1"></i>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}

export async function getServerSideProps({ params: { id } }) {

  const res = await getData(`product/${id}`);
  return {
    props: {
      product: res.product,
    },
  };
}