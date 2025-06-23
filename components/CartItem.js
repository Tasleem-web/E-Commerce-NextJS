import Link from 'next/link'
import React from 'react'
import { ACTIONS, decrease, increase } from '../store/Actions'

export default function CartItem({ item, dispatch, cart }) {
  return (
    <tr className='cart_item-tr'>
      <td className='cart_item-td'>
        <img src={item.images[0].url} alt={item.images[0].url} className='img-thumbnail' />
      </td>

      <td className='align-middle' style={{ minWidth: '200px' }}>
        <h5 className='text-capitalize text-secondary'>
          <Link href={`/product/${item._id}`}>{item.title}</Link>
        </h5>

        <h6 className='text-success'>${item.quantity * item.price}</h6>
        {
          item.inStock > 0
            ? <p className='mb-1 text-success'>In Stock: {item.inStock}</p>
            : <p className='mb-1 text-danger'>Out Stock</p>
        }
      </td>
      <td className='align-middle'>
        <button className='btn btn-outline-secondary'
          onClick={() => dispatch(decrease(cart, item._id))}
          disabled={item.quantity === 1}
        > - </button>
        <span className='px-3'>{item.quantity}</span>
        <button disabled={item.quantity === item.inStock} className='btn btn-outline-secondary' onClick={() => dispatch(increase(cart, item._id))}> + </button>
      </td>
      <td className='align-middle text-danger' style={{ cursor: 'pointer' }}>
        <button className='btn btn-danger'
          data-toggle="modal" data-target="#exampleModal"
          onClick={() => dispatch({ type: ACTIONS.ADD_MODAL, payload: { data: cart, title: item.title, id: item._id } })}>
          <i className="fas fa-trash-alt mr-1" ></i>
        </button>
      </td>
    </tr>
  )
}
