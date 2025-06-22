import { createContext, useReducer } from "react";
import reducers from "./Reducer";
import { useEffect } from "react";
import { getData } from "../utils/fetchData";
import { ACTIONS } from "./Actions";

export const DataContext = createContext();


export const DataProvider = ({ children }) => {

  const initialState = {
    nofity: { loading: false, success: false, error: false },
    auth: {},
    cart: [],
    modal: { show: false, data: {} },
    categories: [],
    products: [],
    orders: []
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      getData('auth/accessToken')
        .then((res) => {
          if (res.error) localStorage.removeItem('firstLogin');

          dispatch({
            type: 'AUTH', payload: {
              token: res.access_token,
              user: res.user
            }
          });
        }).catch((err) => {
          console.error("Error fetching access token:", err);
        });
    }
  }, []);

  useEffect(() => {
    const __next_cart01__js = JSON.parse(localStorage.getItem('__next_cart01__js'));
    if (__next_cart01__js) return dispatch({ type: ACTIONS.ADD_CART, payload: __next_cart01__js });
  }, [])

  useEffect(() => {
    localStorage.setItem('__next_cart01__js', JSON.stringify(cart))
  }, [cart])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );

}