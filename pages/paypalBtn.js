import React, { useEffect, useRef } from 'react'

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
          alert("Transaction completed by " + details.payer.name.given_name)
        });
      }
    }).render(refPaypalBtn.current)
  }, [])

  return (
    <div ref={refPaypalBtn}></div>
  )
}
