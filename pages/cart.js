import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getData } from '../utils/fetchData';
import { ACTIONS } from '../store/Actions';

export default function cart() {

  const { state, dispatch } = React.useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => (prev + (item.quantity * item.price)), 0);
      console.log('res', res)
      setTotal(res);
    }
    getTotal();
  }, [cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next_cart01__js'));
    if (cartLocal && cartLocal.length) {
      let newArr = [];

      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`/product/${item._id}`)
          console.log(res)
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock) {
            newArr.push({
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock - sold ? 1 : item.quantity
            })
          }
        }

        dispatch({ type: ACTIONS.ADD_CART, payload: newArr })
      }

      updateCart();

    }
  }, [])

  if (!cart.length) return <img className='empty-cart' src="/empty_cart.jpg" alt="Cart is empty" />

  return (
    <div className='cart_page row mx-auto'>
      <Head><title>Cart Page</title></Head>

      <div className='col-md-8 text-secondary table-responsive my-3'>
        <h1 className='text-uppercase'>Shopping Cart</h1>

        <table className='table my-3'>
          <tbody>
            {
              cart.map(item => (
                <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
              ))
            }
          </tbody>
        </table>

      </div>
      <div className='col-md-4 text-right text-uppercase text-secondary my-3'>
        <form>
          <h2>Shipping</h2>
          <label htmlFor='address'>Address</label>
          <input id='address' name='address' type='text' className='form-control' />

          <label htmlFor='mobile'>Mobile</label>
          <input id='mobile' name='mobile' type='text' className='form-control' />
        </form>

        <h3>Total: <span className='text-info'>${total}</span></h3>

        <Link href={auth.user ? "#" : "/signin"} className='w-100 btn btn-dark'>
          Proceed with payment
        </Link>
      </div>
    </div>
  )
}
