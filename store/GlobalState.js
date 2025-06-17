import { createContext, useReducer } from "react";
import reducers from "./Reducer";


export const DataContext = createContext();


export const DataProvider = ({ children }) => {

  const initialState = { nofity: { loading: false, success: false, error: false }, auth: {} };

  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );

}