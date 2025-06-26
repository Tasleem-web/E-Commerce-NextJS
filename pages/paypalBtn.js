import React, { useEffect, useRef } from 'react'
import { postData } from '../utils/fetchData';
import { ACTIONS } from '../store/Actions';

export default function PaypalBtn({ total, address, mobile, state, dispatch }) {
  const refPaypalBtn = useRef();
  const { cart, auth } = state;

  useEffect(() => {
    paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total
            }
          }]
        })
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          console.log("data", data)
          postData('order', { address, mobile, cart, total }, auth.token)
            .then(res => {
              if (res.error) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: res.error } } });

              dispatch({ type: ACTIONS.ADD_CART, payload: [] });
              return dispatch({ type: ACTIONS.NOTIFY, payload: { success: { message: res.message } } })
            });

        });
      }
    }).render(refPaypalBtn.current)
  }, [])

  return (
    <div ref={refPaypalBtn}></div>
  )
}
