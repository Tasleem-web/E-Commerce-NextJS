export const ACTIONS = {
  NOTIFY: 'NOTIFY',
  AUTH: 'AUTH',
  ADD_CART: 'ADD_CART',
  ADD_MODAL: 'ADD_MODAL'
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

export const decrease = (data, id) => {
  const newData = [...data];

  newData.forEach(item => {
    if (item._id === id, item.quantity != 0) item.quantity -= 1
  });

  return ({ type: ACTIONS.ADD_CART, payload: newData });
}

export const increase = (data, id) => {
  const newData = [...data];

  newData.forEach(item => {
    if (item._id === id) item.quantity += 1
  });

  return ({ type: ACTIONS.ADD_CART, payload: newData });
}

export const deleteItem = (data, id, type) => {
  const newData = data.filter(item => item._id !== id);
  return ({ type: type, payload: newData });
}