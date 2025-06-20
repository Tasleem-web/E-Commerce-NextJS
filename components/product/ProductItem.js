
import Link from 'next/link';
import React from 'react'
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Actions';

export default function ProductItem({ product }) {

  const { state, dispatch } = React.useContext(DataContext);
  const { cart } = state;


  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0].url} className="card-img-top" alt={product.images[0].url} />
        ) : (
          <div className="card-img-top" style={{ height: '180px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>No Image</span>
          </div>
        )}

        <div className="card-body">
          <h5 className="card-title text-capitalize">{product.title}</h5>

          <div className='row justify-content-between align-items-center mx-0'>
            <h6 className='text-danger'>${product.price}</h6>
            {
              product.inStock > 0 ?
                <span className='text-success'>In Stock {product.inStock}</span> :
                <span className='text-danger'>Out of Stock</span>
            }
          </div>
          <p className="card-text">{product.description}</p>

          <div className="row justify-content-between align-items-center mx-0">
            <Link href={`/product/${product._id}`} className="btn btn-info flex-fill mr-1">
              <i className="fas fa-eye"></i> View
            </Link>
            <button className="btn btn-success flex-fill ml-1" onClick={() => dispatch(addToCart(product, cart))}>
              <i className="fas fa-shopping-cart mr-1"></i>
              Buy
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
