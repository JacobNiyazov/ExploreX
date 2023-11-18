import { createContext, useState } from 'react'
import React from 'react';
import api from './map-request-api';
import graphics from './graphics-request-api';
import sampleComments from '../CommentList'

export const GlobalStoreContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalStoreActionType = {
   CREATE_NEW_MAP: "CREATE_NEW_MAP",
   SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
   DISPLAY_MODAL: "DISPLAY_MODAL",
   SET_MODAL: "SET_MODAL",
   CLOSE_MODAL: "CLOSE_MODAL",
   SET_EDIT_SCREEN_MAP:"SET_EDIT_SCREEN_MAP",
   DELETE_MAP: "DELETE_MAP",
   UPDATE_MAP_REACTION:"UPDATE_MAP_REACTION"
}

let exampleMaps = {
    Map1: {
        title: 'Voronoi Map Example',
        author: 'Author 1',
        reactions:{
            likes: 10,
            dislikes: 2,
            comments: {sampleComments},
        },
        type: "Voronoi Map",
        isPublic: true,
        imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
      },
    Map2: {
        title: 'Heat Map Example',
        author: 'Author 2',
        reactions:{
            likes: 34,
            dislikes: 55,
            comments: {sampleComments},
        },
        type: "Heat Map",
        isPublic: true,
        imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
      },
    Map3: {
        title: 'Dot Map Example',
        author: 'Author 2',
        reactions:{
            likes: 0,
            dislikes: 8,
            comments: {sampleComments},
        },
        type: "Dot Map",
        isPublic: true,
        imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
      },
    Map4: {
        title: 'Spike Map Example',
        author: 'Author 2',
        reactions:{
            likes: 2,
            dislikes: 100,
            comments: {sampleComments},
        },
        type: "Spike Map",
        isPublic: true,
        imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
      },
    Map5:{
        title: 'Choropleth Map Example',
        author: 'Author 2',
        reactions:{
            likes: 20,
            dislikes: 8,
            comments: {sampleComments},
        },
        isPublic: true,
        type: "Choropleth Map"
    }
}

function GlobalStoreContextProvider(props) {
   const [store, setStore] = useState({
       currentPage: "Login",
       modalMessage: "Blah",
       modalOpen: false,
       currentMap: exampleMaps.Map1,
       currentMaps: exampleMaps
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
                    currentMap: store.currentMap,
                    currentMaps: exampleMaps
                });
            }
            case GlobalStoreActionType.SET_EDIT_SCREEN_MAP:{
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    currentMap: payload.currentMap,
                    currentMaps: exampleMaps
                });  
            }
            case GlobalStoreActionType.DISPLAY_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    currentMap: store.currentMap,
                    currentMaps: exampleMaps
                });
            }
            case GlobalStoreActionType.SET_MODAL: {
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    currentMap: store.currentMap,
                    currentMaps: exampleMaps
                });
            }
            case GlobalStoreActionType.CLOSE_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    currentMap: store.currentMap,
                    currentMaps: exampleMaps
                });
            }
            case GlobalStoreActionType.DELETE_MAP: {       
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    currentMap: null,
                    currentMaps: payload.currentMaps,
                });
            }
            case GlobalStoreActionType.UPDATE_MAP_REACTION: {       
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    currentMap: null,
                    currentMaps: payload.currentMaps,
                });
            }
            default: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    currentMap: store.currentMap,
                    currentMaps: exampleMaps
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

    store.setCurrentEditMap = (currentMap, currentPage) =>{
        storeReducer({
            type: GlobalStoreActionType.SET_EDIT_SCREEN_MAP,
            payload: {
                currentMap: currentMap,
                currentPage: currentPage,
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
    }
    store.deleteMap = (currentMap, currentPage) => {
        // some of the values in this will need to change
        // when the map in the db is created
        let mapValues = Object.values(store.currentMaps)
        let mapList = (
        mapValues.filter((map) => (
            map.title !== currentMap.title
          ))
      );
        storeReducer({
            type: GlobalStoreActionType.DELETE_MAP,
            payload: {
                currentPage: currentPage,
                currentMaps: mapList
            },
        });
    };
    store.updateMapReaction = (map, like, dislike, comment, data) =>{
        let mapList = Object.keys(exampleMaps).map((key) => {
            const currentMap = exampleMaps[key];
            if (currentMap.title === map.title) {
                map.reactions.likes = like;
                map.reactions.dislikes = dislike;
                if (comment) {
                    map.reactions.comments.push(data);
                }
                return map;
            }
            return currentMap;
        });
        
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_REACTION,
            payload: {
                currentMaps: mapList
            }})
    }
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
