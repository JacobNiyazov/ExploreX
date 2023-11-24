import { createContext, useState, useContext, useEffect, useRef } from 'react'
import React from 'react';
import api from './store-request-api'
import { AuthContext } from '../auth'
import maps from '../store/map-request-api';
import graphicsApi from '../store/graphics-request-api';
import sampleComments from '../components/CommentList'

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
   UPDATE_MAP_REACTION:"UPDATE_MAP_REACTION",
   CREATE_MAP: "CREATE_MAP"
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
        isPublic: false,
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
        isPublic: false,
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
       modalConfirmButton: false,
       currentMap: exampleMaps.Map1,
       currentMaps: exampleMaps
   });
   const dict = {
    "/login": "Login",
    "/register": "RegisterScreen",
    "/faq" : "FAQScreen",
    "/forgotPassword" : "ForgotPasswordScreen",
    "/passwordReset" : "ResetPasswordScreen",
    "/feed" : "MapFeed",
    "/map" : "PublicMapView",
    "/profile" : "ProfileScreen",
    "/editAccount" : "EditAccountScreen",
    "/editMap": "EditMapScreen"
   }


   store.currentPageType = {
        login: "Login",
        mapFeed: "MapFeed",
        publicMapView: "PublicMapView",
        faqScreen: "FAQScreen",
        forgotPassScreen: "ForgotPasswordScreen",
        registerScreen: "RegisterScreen",
        resetPasswordScreen: "ResetPasswordScreen",
        editMapScreen: "EditMapScreen",
        editAccScreen: "EditAccountScreen",
        profileScreen: "ProfileScreen"
    }

    const { auth } = useContext(AuthContext);

    const storeReducer = (action) => {
        const { type, payload } = action;
        console.log(type)
        switch (type) {
            // GETS ALL THE LISTINGS FROM DATABASE
            case GlobalStoreActionType.SET_CURRENT_PAGE: {
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    modalConfirmButton: false,
                    currentMap: payload.currentMap,
                    currentMaps: payload.currentMaps
                });
            }
            case GlobalStoreActionType.SET_EDIT_SCREEN_MAP:{
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    modalConfirmButton: false,
                    currentMap: payload.currentMap,
                    currentMaps: exampleMaps
                });  
            }
            case GlobalStoreActionType.DISPLAY_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    modalConfirmButton: payload.confirmButton,
                    currentMap: store.currentMap,
                    currentMaps: exampleMaps
                });
            }
            case GlobalStoreActionType.SET_MODAL: {
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    modalConfirmButton: payload.confirmButton,
                    currentMap: store.currentMap,
                    currentMaps: exampleMaps
                });
            }
            case GlobalStoreActionType.CLOSE_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    modalConfirmButton: false,
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
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.UPDATE_MAP_GRAPHICS: {       
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.CREATE_MAP:{
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            default: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    modalConfirmButton: false,
                    currentMap: store.currentMap,
                    currentMaps: store.currentMaps
                });
            }

        }
    }


   store.setCurrentPage = (currentPage) => {
       /*if(currentPage === "MapFeed"){
            async function getMap(){
                try{
                    let response = await maps.getPublicMapPairs()
                    if(response.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: currentPage,
                                currentMaps: response.data.idNamePairs,
                                currentMap: null
                            }
                        }
                        ); 
                    }
                }
                catch(error){
                    console.log("error: ", error )
                }
            }
            getMap()
        }*/
        if(currentPage === "PublicMapView"){
            async function getMap(){
                try{
                    let response = await maps.getMapById("65605143b27302f331e6e009")
                    if(response.data.success){
                        console.log("response: ", response.data)
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: currentPage,
                                currentMaps: null,
                                currentMap: response.data.map
                            }
                        }
                        ); 
                    }
                }
                catch(error){
                    console.log("error: ", error )
                }
            }
            getMap()
        }
       /* else if(currentPage === "ProfileScreen"){
            async function getMap(){
                try{
                    let response = await maps.getUserMapIdPairs(auth.user._id)
                    if(response.data.success){
                        console.log("profile!!!")
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: currentPage,
                                currentMaps: response.data.idNamePairs,
                                currentMap: null
                            }
                        }
                        ); 
                    }
                }
                catch(error){
                    console.log("error: ", error )
                }
            }
            getMap()
        }*/
        // switch (currentPage) {
        //     case store.currentPageType.login:
        //         navigate("/login");
        //         break
        //     case store.currentPageType.mapFeed:
        //     //   return (<MapFeed maps/>)
        //         navigate("/feed")
        //         break
        //     case store.currentPageType.publicMapView:
        //         navigate("/map")
        //         break
        //     //   return (<PublicMapView map={Map1} likes = {Map1.reactions.likes} dislikes = {Map1.reactions.dislikes} comments = {Map1.reactions.comments}/>)
        //     case store.currentPageType.forgotPassScreen:
        //         navigate("/forgotPassword");
        //         break
        //     case store.currentPageType.registerScreen:
        //         navigate("/register");
        //         break
        //     case store.currentPageType.resetPasswordScreen:
        //         navigate("/recover");
        //         break
        //     case store.currentPageType.faqScreen:
        //         navigate("/FAQ");
        //         break
        //     case store.currentPageType.editMapScreen:
        //         navigate("/editMap/")
        //         break
        //     case store.currentPageType.editAccScreen:
        //         navigate("/editAccount");
        //         break
        //     case store.currentPageType.profileScreen:
        //         navigate("/profile");
        //         break
        //     default:
        //         navigate("/login");
        // }
        
        storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_PAGE,
                payload: {
                    currentPage: currentPage,
                    currentMaps: exampleMaps,
                    currentMap: store.currentMap
                }
            }
        );
    }

    store.updatePageLink = (pageURL) => {
        if(dict[pageURL] === "PublicMapView"){
            async function getMap(){
                try{
                    let response = await maps.getMapById("65605143b27302f331e6e009")
                    if(response.data.success){
                        console.log("response: ", response.data)
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: dict[pageURL],
                                currentMaps: null,
                                currentMap: response.data.map
                            }
                        }
                        ); 
                    }
                }
                catch(error){
                    console.log("error: ", error )
                }
            }
            getMap()
        }
        else{
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_PAGE,
                payload: {
                    currentPage: dict[pageURL],
                    currentMaps: exampleMaps
                }
            });
        }
    }

    const storeRef = useRef(store);

    useEffect(() => {
        const updateCurrentPage = () => {
          const currentPage = window.location.pathname;
          storeRef.current.updatePageLink(currentPage)
        };
    
        window.addEventListener('popstate', updateCurrentPage);
        window.addEventListener('DOMContentLoaded', updateCurrentPage);
    
        updateCurrentPage();
    
        return () => {
          window.removeEventListener('popstate', updateCurrentPage);
          window.removeEventListener('DOMContentLoaded', updateCurrentPage);
        };
      }, [storeRef]);

    store.setCurrentEditMap = (currentMap, currentPage) =>{
        storeReducer({
            type: GlobalStoreActionType.SET_EDIT_SCREEN_MAP,
            payload: {
                currentMap: currentMap,
                currentPage: currentPage,
            }
        });
    }

    store.createMap = async (files, mapType, fileType, property) =>{
        // We will instantiate data in the backend, so only fields that already have values are sent through
        let ownerUsername = auth.user.username;
        let publishDate = Date.now();
        // No need to create graphics create map takes care of this
        let response = await maps.createMap(ownerUsername, files, mapType, publishDate, fileType, property);
        console.log(response.data)
        if(response.data.success){
            storeReducer({
                type: GlobalStoreActionType.CREATE_MAP,
                payload: {
                    currentPage: dict["/editMap"],
                    currentMap: response.data.map
                }
            })
        }
    }
    store.createMapTemp = async (files, mapType, fileType) =>{
        // We will instantiate data in the backend, so only fields that already have values are sent through
        let ownerUsername = auth.user.username;
        let publishDate = Date.now();
        // No need to create graphics create map takes care of this
        let property = null;
        let response = await maps.createMap(ownerUsername, files, mapType, publishDate, fileType, property);
        console.log(response.data)
        if(response.data.success){
            storeReducer({
                type: GlobalStoreActionType.CREATE_MAP,
                payload: {
                    currentPage: store.currentPage,
                    currentMap: response.data.map
                }
            })
        }
    }

    store.displayModal = (modalMessage, confirmButton=true) => {
        storeReducer({
                type: GlobalStoreActionType.DISPLAY_MODAL,
                payload: {
                    modalMessage: modalMessage,
                    confirmButton: confirmButton,
                }
            }
        );
    }

    store.setModal = (modalMessage, currentPage, confirmButton=true) => {
        storeReducer({
                type: GlobalStoreActionType.SET_MODAL,
                payload: {
                    modalMessage: modalMessage,
                    currentPage: currentPage,
                    confirmButton: confirmButton,
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

    store.updateUserInfo = function (username, email, bio, password) {
        async function asyncUpdateUser(username, email, bio, password) {
            try {
                const response = await api.editUserInfo(auth.user._id, username, email, bio, password);
                if (response.data.success) {
                    const successMessage = (
                        <div>
                            <h4 style={{ color: 'green', margin: '0', fontSize: '1.1rem' }}>Success</h4>
                            <p style={{ margin: '5px 0', fontSize: '1rem' }}>Your account details have been updated.</p>
                        </div>
                    );
                    store.displayModal(successMessage, false);
                }
                auth.user = response.data.user;
            }
            catch (error){
                if (error.response.data.errorMessage === "An account with this email address already exists." || error.response.data.errorMessage === "An account with this username already exists."){
                    const failMessage = (
                        <div>
                            <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>Oops</h4>
                            <p style={{ margin: '5px 0', fontSize: '1rem' }}>{error.response.data.errorMessage}</p>
                        </div>
                    );
                    store.displayModal(failMessage, false);
                }

            }
        }
        asyncUpdateUser(username, email, bio, password);
    }
    store.deleteMap = (currentMap, currentPage) => {
        //get the id of the map we are removing 

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
      
      /*let id = currentMap._id;
      let userId = currentMap.author;
      async function processDelete(){
        let response = await maps.deleteMap(id);
        if(response.data.success){
            console.log("we are making it in delete")
            // the return will be different depending on page
            if(store.currentPage === "ProfileScreen"){
                let mapList = await maps.getUserMapIdPairs(userId);
                if(mapList.data.success)
                //mapList data may have to change later
                storeReducer({
                    type: GlobalStoreActionType.DELETE_MAP,
                    payload: {
                        currentPage: currentPage,
                        currentMaps: mapList.data
                    },
                });
            }
            else if(store.currentPage === "MapFeed"){
                let mapList = await maps.getPublicMapIdPairs();
                if(mapList.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.DELETE_MAP,
                        payload: {
                            currentPage: currentPage,
                            currentMaps: mapList.data
                        },
                    });
                }
            }
        }
      }
      processDelete();*/
    };

    store.updateMapReaction = (map, like, dislike, comment, data) =>{
        //let currentMap = map._id;
        //make the current map id a static value
        let currentMap = "655fe27a63706d4925d1340b"; 
        let author = auth.user.username;
        //console.log("curr and author: ", currentMap, author)
        async function reactToMap(){
            // get all the maps based on page
            let map = await maps.getMapById(currentMap);
            if(map.data.success){
                console.log("RAHHHHHHH")
                let tempMap = {...map.data.map}
                console.log("map: ",tempMap)
                tempMap.reactions.likes = like;
                tempMap.reactions.dislikes = dislike;
                if (comment){
                    tempMap.reactions.comments.push({authorUsername: author, comment: data.comment})
                }
                console.log("map reactions: ",tempMap.reactions)
                let update = await maps.updateMapById(currentMap,tempMap);
                console.log("update: ", update.data)
                if(update.data.success){
                    console.log("yay!")
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_MAP_REACTION,
                        payload: {
                            currentMap: tempMap
                        }})
                    
                }
            }
        }
        reactToMap()
        /*let mapList = Object.keys(exampleMaps).map((key) => {
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
            }})*/
    }
    store.updateMapGraphics = (property=null, dotPoints=null, dotScale=null) =>{
        async function updateGraphics(property=null, dotPoints=null, dotScale=null){
            let currentMap = store.currentMap;
            let graphics = currentMap.graphics;
            if(dotPoints !== null){
                graphics['typeSpecific']['dotPoints'] = dotPoints;
            }
            if(dotScale !== null){
                graphics['typeSpecific']['dotScale'] = dotScale;
            }
            if(property !== null){
                graphics['typeSpecific']['property'] = property;
            }
            try {
                let res = await maps.updateMapById(currentMap._id, currentMap);
                if(res.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.UPDATE_MAP_GRAPHICS,
                        payload: {
                            currentMap: res.data.map
                        }});
                }
            }
            catch (err) {
                console.log(err)
            }
            
        }
        updateGraphics(property, dotPoints, dotScale);
    }
   return (
    <GlobalStoreContext.Provider value={{
        store
    }}>
        {props.children}
    </GlobalStoreContext.Provider>
)};


export default GlobalStoreContext;
export { GlobalStoreContextProvider };
