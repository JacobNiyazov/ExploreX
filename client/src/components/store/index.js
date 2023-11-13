import { stepperClasses } from '@mui/material';
import { createContext, useState } from 'react'
import React from 'react';

export const GlobalStoreContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalStoreActionType = {
   CREATE_NEW_MAP: "CREATE_NEW_MAP",
   SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
   DISPLAY_MODAL: "DISPLAY_MODAL",
   SET_MODAL: "SET_MODAL",
   CLOSE_MODAL: "CLOSE_MODAL",
   SET_CURRENT_MAP:"SET_CURRENT_MAP"
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
    Map5:{
        title: 'Map 2',
        author: 'Author 2',
        likes: 20,
        dislikes: 8,
        type: "Choropleth Map"
    }
}

function GlobalStoreContextProvider(props) {
   const [store, setStore] = useState({
       currentPage: "Login",
       modalMessage: "Blah",
       modalOpen: false,
       currentMap: exampleMaps.Map1
   });

   store.currentPageType = {
        login: "Login",
        mapFeed: "MapFeed",
        publicMapView: "PublicMapView",
        faqScreen: "FAQScreen",
        forgotPassScreen: "ForgotPasswordScreen",
        registerScreen: "RegisterScreen",
        editMapScreen: "EditMapScreen",
        editAccScreen: "EditAccountScreen",
        profileScreen: "ProfileScreen"
    }

   const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // GETS ALL THE LISTINGS FROM DATABASE
            case GlobalStoreActionType.SET_CURRENT_PAGE: {
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    currentMap: store.currentMap
                });
            }
            case GlobalStoreActionType.SET_CURRENT_MAP:{
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    currentMap: payload.currentMap
                });  
            }
            case GlobalStoreActionType.DISPLAY_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    currentMap: store.currentMap
                });
            }
            case GlobalStoreActionType.SET_MODAL: {
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    currentMap: store.currentMap
                });
            }
            case GlobalStoreActionType.CLOSE_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    currentMap: store.currentMap
                });
            }
            default: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    currentMap: store.currentMap
                });
            }

        }
    }


   store.setCurrentPage = (currentPage) => {
        storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_PAGE,
                payload: {
                    currentPage: currentPage,
                }
            }
        );
    }

    store.setCurrentMap = (currentMap) =>{
        console.log(currentMap)
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_MAP,
            payload: {
                currentMap: exampleMaps.currentMap,
            }
        });
    }

    store.displayModal = (modalMessage) => {
        storeReducer({
                type: GlobalStoreActionType.DISPLAY_MODAL,
                payload: {
                    modalMessage: modalMessage,
                }
            }
        );
    }

    store.setModal = (modalMessage, currentPage) => {
        storeReducer({
                type: GlobalStoreActionType.SET_MODAL,
                payload: {
                    modalMessage: modalMessage,
                    currentPage: currentPage,
                }
            }
        );
    }

    store.closeModal = () => {
        storeReducer({
                type: GlobalStoreActionType.CLOSE_MODAL,
            }
        );
    };
   
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