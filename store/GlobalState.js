import { createContext, useReducer } from "react";
import reducers from "./Reducer";
import { useEffect } from "react";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();


export const DataProvider = ({ children }) => {

  const initialState = { nofity: { loading: false, success: false, error: false }, auth: {} };

  const [state, dispatch] = useReducer(reducers, initialState);

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



  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );

}