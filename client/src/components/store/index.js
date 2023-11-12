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

const exampleMaps = {
    Map1: {
        title: 'Map 1',
        author: 'Author 1',
        likes: 10,
        dislikes: 2,
        type: "Voronoi Map"
      },
    Map2: {
        title: 'Map 2',
        author: 'Author 2',
        likes: 20,
        dislikes: 8,
        type: "Heat Map"
      },
    Map3: {
        title: 'Map 2',
        author: 'Author 2',
        likes: 20,
        dislikes: 8,
        type: "Dot Map"
      },
    Map4: {
        title: 'Map 2',
        author: 'Author 2',
        likes: 20,
        dislikes: 8,
        type: "Spike Map"
      },
}

function GlobalStoreContextProvider(props) {
   const [store, setStore] = useState({
       currentPage: CurrentPage.LOGIN,
       currentMap: exampleMaps.Map1
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