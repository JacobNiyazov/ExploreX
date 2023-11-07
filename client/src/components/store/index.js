import { createContext, useContext, useState } from 'react'
import React from 'react';

export const GlobalStoreContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalStoreActionType = {
   CREATE_NEW_MAP: "CREATE_NEW_MAP",
}

function GlobalStoreContextProvider(props) {
   const [store, setStore] = useState({
       currentPage: "Login",
   });
   
   return (
    <GlobalStoreContext.Provider value={{
        store
    }}>
        {props.children}
    </GlobalStoreContext.Provider>
);
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };