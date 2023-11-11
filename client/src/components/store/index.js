import { createContext, useContext, useState } from 'react'
import React from 'react';

export const GlobalStoreContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalStoreActionType = {
   CREATE_NEW_MAP: "CREATE_NEW_MAP",
}

const CurrentPage = {
    LOGIN: "LOGIN",
    HOME_FEED: "HOME_FEED",
    EDIT_MAP: "EDIT_MAP",
    REGISTER: "REGISTER",
    ACCOUNT_MANAGEMENT: "ACCOUNT_MANAGEMENT",
    PROFILE_SCREEN: "PROFILE_SCREEN",
    PUBLIC_FEED: "PUBLIC_FEED",
    FORGOTTEN_PASSWORD: "FORGOTTEN_PASSWORD",
    FAQ: "FAQ"
}

function GlobalStoreContextProvider(props) {
   const [store, setStore] = useState({
       currentPage: CurrentPage.EDIT_MAP,
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