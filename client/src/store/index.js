import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import api from './store-request-api'
import { AuthContext } from '../auth'
import { GlobalMapEditContext } from '../mapEdit'
import maps from '../store/map-request-api';

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
   CREATE_MAP: "CREATE_MAP",
   UPDATE_MAP_GRAPHICS: "UPDATE_MAP_GRAPHICS",
   FORK_MAP: "FORK_MAP",
   EDIT_MAP: "EDIT_MAP",
}


function GlobalStoreContextProvider(props) {
   const [store, setStore] = useState({
       currentPage: "Login",
       modalMessage: "Blah",
       modalOpen: false,
       modalConfirmButton: false,
       modalAction: "",
       currentMap: null,
       currentMaps: [],
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

   store.modalActionTypes = {
        publish: "Publish",
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
    const { mapEdit } = useContext(GlobalMapEditContext);
    const navigate = useNavigate();


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
                    modalAction: "",
                    currentMap: payload.currentMap,
                    currentMaps: payload.currentMaps,
                });
            }
            case GlobalStoreActionType.SET_EDIT_SCREEN_MAP:{
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });  
            }
            case GlobalStoreActionType.DISPLAY_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    modalConfirmButton: payload.confirmButton,
                    modalAction: payload.modalAction,
                    currentMap: store.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.SET_MODAL: {
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: payload.modalMessage,
                    modalOpen: true,
                    modalConfirmButton: payload.confirmButton,
                    modalAction: payload.modalAction,
                    currentMap: store.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.CLOSE_MODAL: {
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: store.modalMessage,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
                    currentMap: store.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.DELETE_MAP: {       
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
                    currentMap: null,
                    currentMaps: payload.currentMaps,
                });
            }
            case GlobalStoreActionType.UPDATE_MAP_REACTION: {       
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.UPDATE_MAP_GRAPHICS: {       
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.CREATE_MAP:{
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.FORK_MAP:{
                return setStore({
                    currentPage: payload.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
                    currentMap: payload.currentMap,
                    currentMaps: store.currentMaps,
                });
            }
            case GlobalStoreActionType.EDIT_MAP:{
                return setStore({
                    currentPage: store.currentPage,
                    modalMessage: null,
                    modalOpen: false,
                    modalConfirmButton: false,
                    modalAction: "",
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
                    modalAction: "",
                    currentMap: store.currentMap,
                    currentMaps: store.currentMaps,
                });
            }

        }
    }

   store.setCurrentPage = (currentPage, map=null) => {
        if(currentPage === "PublicMapView"){
            async function getMap(){
                try{
                    let response = await maps.getMapById(map._id)
                    console.log("ATTEMPTING GET MAP")
                    if(response.data.success){
                        console.log("response: ", response.data)
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: currentPage,
                                currentMaps: store.currentMaps,
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
        else if(currentPage === "ProfileScreen"){
            async function getMap(){
                try{
                    let response = await maps.getUserMapIdPairs()
                    console.log("ATTEMPTING GET MAP PUBLIC PAIRS")
                    if(response.data.success){
                        console.log("response: ", response.data)
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
        }
        else if(currentPage === "MapFeed"){
            async function getMapPairs(){
                try{
                    let mapList = await maps.getPublicMapIdPairs();
                    if(mapList.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: currentPage,
                                currentMaps: mapList.data.idNamePairs,
                                currentMap: null
                            },
                        });
                    }
                }
                catch (err){
                    console.log(err)
                }
            }
            getMapPairs();
        }
        else if(currentPage === "EditMapScreen"){
            async function getMap(){
                try{
                    async function setCurrentMapToEdit(){
                        let response = await maps.getMapById(map._id);
                        console.log("map: ",response.data.map);
                        if(response.data.success){
                            let tempMap = response.data.map;
                            let styles = {
                                title: tempMap.title,
                                hasStroke: tempMap.graphics.stroke.hasStroke,
                                strokeColor: tempMap.graphics.stroke.strokeColor,
                                strokeWeight: tempMap.graphics.stroke.strokeWeight,
                                strokeOpacity: tempMap.graphics.stroke.strokeOpacity,
                                hasFill: tempMap.graphics.fill.hasFill,
                                fillColor: tempMap.graphics.fill.fillColor,
                                fillOpacity: tempMap.graphics.fill.fillOpacity,
                                textColor: tempMap.graphics.text.textColor,
                                textSize: tempMap.graphics.text.textSize,
                                textFont: tempMap.graphics.text.textFont,
                                // legendFillColor: '',
                                // legendBorderColor: '',
                                legendTitle: tempMap.graphics.legend.legendTitle,
                                // legendBorderWidth: '',
                                legendFields: []
                            }
                            mapEdit.loadStyles(styles);

                            storeReducer({
                                type: GlobalStoreActionType.SET_EDIT_SCREEN_MAP,
                                payload: {
                                    currentPage: currentPage,
                                    currentMap: response.data.map,
                                    currentMaps: store.currentMaps
                                }
                            })
                        }
                    }
                    setCurrentMapToEdit();
                }
                catch(err){
                    console.log("error: ", err)
                }
            }
            getMap()
        }
        else{
            console.log("set page map: ", store.currentMap, currentPage)
            storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_PAGE,
                    payload: {
                        currentPage: currentPage,
                        currentMaps: store.currentMaps,
                        currentMap: store.currentMap
                    }
                }
            );
        }
        
        
    }

    store.updatePageLink = (pageURL, id) => {
        if(dict[pageURL] === "PublicMapView"){
            async function getMap(){
                try{
                    let response = await maps.getMapById(id);
                    if(response.data.success){
                        console.log("response: ", response.data)
                        if(response.data.map.isPublic){
                            storeReducer({
                                type: GlobalStoreActionType.SET_CURRENT_PAGE,
                                payload: {
                                    currentPage: dict[pageURL],
                                    currentMaps: store.currentMaps,
                                    currentMap: response.data.map
                                }
                            }
                            ); 
                        }
                        else{
                            store.setCurrentPage(store.currentPageType.mapFeed);
                            navigate("/feed");
                        }
                    }
                }
                catch(error){
                    console.log("error: ", error )
                }
            }
            getMap()
        }
        else if(dict[pageURL] === "ProfileScreen"){
            async function getMap(){
                try{
                    let response = await maps.getUserMapIdPairs()
                    console.log("ATTEMPTING GET MAP PUBLIC PAIRS")
                    if(response.data.success){
                        console.log("response: ", response.data)
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: dict[pageURL],
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
        }
        else if(dict[pageURL] === "MapFeed"){
            async function getMapPairs(){
                try{
                    let mapList = await maps.getPublicMapIdPairs();
                    if(mapList.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PAGE,
                            payload: {
                                currentPage: dict[pageURL],
                                currentMaps: mapList.data.idNamePairs,
                                currentMap: null
                            },
                        });
                    }
                }
                catch (err){
                    console.log(err)
                }
            }
            getMapPairs();
        }
        else if(dict[pageURL] === "EditMapScreen"){
            async function getMap(){
                try{
                    async function setCurrentMapToEdit(){
                        let response = await maps.getMapById(id);
                        console.log("map: ",response.data.map);
                        if(response.data.success){
                            storeReducer({
                                type: GlobalStoreActionType.SET_EDIT_SCREEN_MAP,
                                payload: {
                                    currentPage: dict[pageURL],
                                    currentMaps: store.currentMaps,
                                    currentMap: response.data.map
                                }
                            })
                        }
                    }
                    await setCurrentMapToEdit();
                }
                catch(err){
                    console.log("error: ", err)
                }
            }
            getMap()
        }
        else{
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_PAGE,
                payload: {
                    currentPage: dict[pageURL],
                    currentMaps: store.currentMaps,
                    currentMap: store.currentMap

                }
            });
        }
    }

    const storeRef = useRef(store);

    useEffect(() => {
    const updateCurrentPage = () => {
          const currentPage = window.location.pathname;
          const queryParams = new URLSearchParams(window.location.search);
          const id = queryParams.get('id');
          storeRef.current.updatePageLink(currentPage, id);
        };
    
        window.addEventListener('popstate', updateCurrentPage);
        window.addEventListener('DOMContentLoaded', updateCurrentPage);
    
        updateCurrentPage();
    
        return () => {
          window.removeEventListener('popstate', updateCurrentPage);
          window.removeEventListener('DOMContentLoaded', updateCurrentPage);
        };
      }, [storeRef]);
    //   useEffect(() => {
    //     if(store.currentPage === store.currentPageType.editAccScreen){
    //         let tempMap = store.currentMap;
    //         let styles = {
    //             title: tempMap.title,
    //             hasStroke: tempMap.graphics.stroke.hasStroke,
    //             strokeColor: tempMap.graphics.stroke.strokeColor,
    //             strokeWeight: tempMap.graphics.stroke.strokeWeight,
    //             strokeOpacity: tempMap.graphics.stroke.strokeOpacity,
    //             hasFill: tempMap.graphics.fill.hasFill,
    //             fillColor: tempMap.graphics.fill.fillColor,
    //             fillOpacity: tempMap.graphics.fill.fillOpacity,
    //             textColor: tempMap.graphics.text.textColor,
    //             textSize: tempMap.graphics.text.textSize,
    //             textFont: tempMap.graphics.text.textFont,
    //             // legendFillColor: '',
    //             // legendBorderColor: '',
    //             legendTitle: tempMap.graphics.legend.legendTitle,
    //             // legendBorderWidth: '',
    //             legendFields: []
    //         }
    //         console.log(styles)
    //         mapEdit.loadStyles(styles);
    //     }
        
    //     }, [store.currentMap]);

    store.setCurrentEditMap = (currentPage) =>{
        console.log("current Page: ", currentPage);
        try{
            async function setCurrentMapToEdit(){
                let response = await maps.getMapById("6563af3209aa5b8bd7ed0806");
                console.log("map: ",response.data.map);
                if(response.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.SET_EDIT_SCREEN_MAP,
                        payload: {
                            currentPage: dict["/editMap"],
                            currentMap: response.data.map
                        }
                    })
                }
            }
            setCurrentMapToEdit();
        }
        catch(err){
            console.log("error: ", err)
        }
    }

    store.createMap = async (files, mapType, fileType, property) =>{
        // We will instantiate data in the backend, so only fields that already have values are sent through
        let ownerUsername = auth.user.username;
        let publishDate = Date.now();
        // No need to create graphics create map takes care of this
        let response = await maps.createMap(ownerUsername, files, mapType, publishDate, fileType, property);
        if(response.data.success){
            storeReducer({
                type: GlobalStoreActionType.CREATE_MAP,
                payload: {
                    currentPage: dict["/editMap"],
                    currentMap: response.data.map
                }
            })
        }

        return response.data.map
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

    store.displayModal = (modalMessage, confirmButton=true, modalAction="") => {
        storeReducer({
                type: GlobalStoreActionType.DISPLAY_MODAL,
                payload: {
                    modalMessage: modalMessage,
                    confirmButton: confirmButton,
                    modalAction: modalAction
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

    store.searchSubmit = async (searchInput, searchType) => {
        try{
            let mapList = await maps.getPublicMapIdPairs();
            if(mapList.data.success){
                let filteredMaps;
                if(searchInput === ""){
                    filteredMaps = mapList.data.idNamePairs;
                }
                else{
                    let field = 'ownerUsername';
                    if(searchType === 'map') field = 'title';
                    if(searchType === 'type') field = 'type';
                    filteredMaps = mapList.data.idNamePairs.filter(map => map[field].trim().toLowerCase() === searchInput.trim().toLowerCase());
                }
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_PAGE,
                    payload: {
                        currentPage: store.currentPageType.mapFeed,
                        currentMaps: filteredMaps
                    },
                });
                navigate('/feed');
            }
        }
        catch (err){
            console.log(err)
        }
    }

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

    store.handleFork = async () => {
        let id = store.currentMap._id;
        try{
            let response = await maps.forkMap(id);
            if(response.data.success)
            {
                await storeReducer({
                    type: GlobalStoreActionType.FORK_MAP,
                    payload: {
                        currentPage: store.currentPageType.editMapScreen,
                        currentMap: response.data.map
                    },
                });

            }
        }
        catch (err){
            console.log(err)
        }
    }

    store.deleteMap = (currentMap, currentPage) => {
        //get the id of the map we are removing 

    //     let mapValues = Object.values(store.currentMaps)
    //     let mapList = (
    //     mapValues.filter((map) => (
    //         map._id !== currentMap._id
    //       ))
    //   );
    //   storeReducer({
    //                 type: GlobalStoreActionType.DELETE_MAP,
    //                 payload: {
    //                     currentPage: currentPage,
    //                     currentMaps: mapList
    //                 },
    //             });
      
      let id = currentMap._id;
      //let userId = currentMap.author;
      async function processDelete(){
        let response = await maps.deleteMap(id);
        console.log(response)
        if(response.data.success){
            console.log("we are making it in delete")
            // the return will be different depending on page
            if(store.currentPage === "ProfileScreen"){
                // let mapList = await maps.getUserMapIdPairs(userId);
                // if(mapList.data.success)
                // //mapList data may have to change later
                // storeReducer({
                //     type: GlobalStoreActionType.DELETE_MAP,
                //     payload: {
                //         currentPage: currentPage,
                //         currentMaps: mapList.data
                //     },
                // });
                let mapValues = Object.values(store.currentMaps)
                let mapList = (
                mapValues.filter((map) => (
                    map._id !== id
                ))
                );
                storeReducer({
                                type: GlobalStoreActionType.DELETE_MAP,
                                payload: {
                                    currentPage: currentPage,
                                    currentMaps: mapList
                                },
                            });
            }
            else if(store.currentPage === "MapFeed" || store.currentPage === "PublicMapView"){
                try{
                    let mapList = await maps.getPublicMapIdPairs();
                    if(mapList.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.DELETE_MAP,
                            payload: {
                                currentPage: currentPage,
                                currentMaps: mapList.data.idNamePairs
                            },
                        });
                    }
                }
                catch (err){
                    console.log(err)
                }
                
            }
        }
      }
      processDelete();
    };

    store.updateMapReaction = (map, like, dislike, comment, data) =>{
        let currentMap = map._id;
        console.log("this is map were updating: ",map)
        console.log("this is likes: ",like)
        let author = auth.user.username;
        async function reactToMap(){
            // get all the maps based on page
            try{
                let map = await maps.getMapById(currentMap);
                if(map.data.success){
                    let tempMap = {...map.data.map}
                    tempMap.reactions.likes = like;
                    tempMap.reactions.dislikes = dislike;
                    if (comment){
                        tempMap.reactions.comments.push({authorUsername: author, comment: data.comment})
                    }
                    let update = await maps.updateMapById(currentMap,tempMap);
                    if(update.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.UPDATE_MAP_REACTION,
                            payload: {
                                currentMap: tempMap
                            }})
                        
                    }
                }
            }
            catch(err){
                console.log("update reactions failed: ",err)
            }
        }
        reactToMap()
    }
    store.updateMapGraphics = async (property=null, imageBuffer = null, dotPoints=null, dotScale=null, spikeData=null, spikeLegend=null, chloroLegend = null) =>{
        let currentMap = store.currentMap;
        if(imageBuffer !== null){
            store.currentMap.imageBuffer = imageBuffer;
            
        }

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
        if(spikeData !== null){
            graphics['typeSpecific']['spikeData'] = spikeData;
        }
        if(spikeLegend !== null){
            graphics['typeSpecific']['spikeLegend'] = spikeLegend;
        }
        if(chloroLegend !== null){
            currentMap.graphics.typeSpecific.chloroLegend = chloroLegend;
        }
        try {
            chloroLegend = currentMap.graphics.typeSpecific.chloroLegend
            let res = await maps.updateMapById(currentMap._id, currentMap, chloroLegend);
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
    store.publishMap = async (map) =>{
        console.log(map)

        if(!map){
            if(!store.currentMap) return;
            else map = store.currentMap;
        }
        try {
            map.isPublic = true;
            map.publishDate = Date.now();
            let res = await maps.updateMapById(map._id, map);
            if(res.data.success){
                let mapList = await maps.getPublicMapIdPairs();
                if(mapList.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_PAGE,
                        payload: {
                            currentPage: store.currentPageType.publicMapView,
                            currentMaps: mapList.data.idNamePairs,
                            currentMap: res.data.map
                        }
                    }
                    ); 
                    navigate(`/map?id=${res.data.map._id}`);
                }
            }
        }
        catch (err) {
            console.log(err)
        }
            
    }

    store.editProperties = (featureIndex, properties) =>{
        console.log("WE IN HERE", featureIndex, properties)
        let tempMap = JSON.parse(JSON.stringify(store.currentMap))
        tempMap.graphics.geojson.features[featureIndex].properties = JSON.parse(JSON.stringify(properties))
        storeReducer({
            type: GlobalStoreActionType.EDIT_MAP,
            payload: {
                currentMap: tempMap
            }
        }
        ); 
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
