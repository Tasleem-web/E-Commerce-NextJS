export const ACTIONS = {
  NOTIFY: 'NOTIFY',
  AUTH: 'AUTH',
  ADD_CART: 'ADD_CART'
}

export const addToCart = (product, cart) => {
  if (!product.inStock) return ({ type: ACTIONS.NOTIFY, payload: { error: { message: 'This product is out of stock.' } } });

  const check = cart.every(item => item._id !== product._id);

  if (!check) {
    return ({ type: ACTIONS.NOTIFY, payload: { error: { message: 'This product has been added to cart.' } } });
  }
  return {
    type: ACTIONS.ADD_CART,
    payload: [...cart, { ...product, quantity: 1 }]
  };

}