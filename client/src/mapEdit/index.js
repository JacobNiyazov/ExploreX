import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../auth'
import GlobalStoreContext from '../store/index.js';

export const GlobalMapEditContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalMapEditActionType = {
    EDIT: "Edit",
    LOAD: "Load",
    EDIT_PROPERTY: "EDIT_PROPERTY"
}


function GlobalMapEditContextProvider(props) {
    const [mapEdit, setMapEdit] = useState({
        title: '',
        hasStroke: true,
        strokeColor: '',
        strokeWeight: '',
        strokeOpacity: '',
        hasFill: true,
        fillColor: '',
        fillOpacity: '',
        textColor: '',
        textSize: '',
        textFont: '',
        // legendFillColor: '',
        // legendBorderColor: '',
        legendTitle: '',
        // legendBorderWidth: '',
        legendFields: [],
        currProperties: {},
        featureIndex: null,
    });

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const mapEditReducer = (action) => {
        const { type, payload } = action;
        console.log(type, payload)
        switch (type) {
            // GETS ALL THE LISTINGS FROM DATABASE
            case GlobalMapEditActionType.EDIT: {
                return setMapEdit({
                  title: payload.title,
                  hasStroke: payload.hasStroke,
                  strokeColor: payload.strokeColor,
                  strokeWeight: payload.strokeWeight,
                  strokeOpacity: payload.strokeOpacity,
                  hasFill: payload.hasFill,
                  fillColor: payload.fillColor,
                  fillOpacity: payload.fillOpacity,
                  textColor: payload.textColor,
                  textSize: payload.textSize,
                  textFont: payload.textFont,
                  // legendFillColor: payload.legendFillColor,
                  // legendBorderColor: payload.legendBorderColor,
                  legendTitle: payload.legendTitle,
                  // legendBorderWidth: payload.legendBorderWidth,
                  legendFields: payload.legendFields,
                  currProperties: mapEdit.currProperties,
                  featureIndex: mapEdit.featureIndex,
                });
            }
            case GlobalMapEditActionType.LOAD: {
                return setMapEdit({
                  title: payload.title,
                  hasStroke: payload.hasStroke,
                  strokeColor: payload.strokeColor,
                  strokeWeight: payload.strokeWeight,
                  strokeOpacity: payload.strokeOpacity,
                  hasFill: payload.hasFill,
                  fillColor: payload.fillColor,
                  fillOpacity: payload.fillOpacity,
                  textColor: payload.textColor,
                  textSize: payload.textSize,
                  textFont: payload.textFont,
                  // legendFillColor: payload.legendFillColor,
                  // legendBorderColor: payload.legendBorderColor,
                  legendTitle: payload.legendTitle,
                  // legendBorderWidth: payload.legendBorderWidth,
                  legendFields: payload.legendFields,
                  currProperties: {},
                  featureIndex: null,
                });
            }
            case GlobalMapEditActionType.EDIT_PROPERTY: {
              return setMapEdit({
                title: mapEdit.title,
                hasStroke: mapEdit.hasStroke,
                strokeColor: mapEdit.strokeColor,
                strokeWeight: mapEdit.strokeWeight,
                strokeOpacity: mapEdit.strokeOpacity,
                hasFill: mapEdit.hasFill,
                fillColor: mapEdit.fillColor,
                fillOpacity: mapEdit.fillOpacity,
                textColor: mapEdit.textColor,
                textSize: mapEdit.textSize,
                textFont: mapEdit.textFont,
                // legendFillColor: payload.legendFillColor,
                // legendBorderColor: payload.legendBorderColor,
                legendTitle: mapEdit.legendTitle,
                // legendBorderWidth: payload.legendBorderWidth,
                legendFields: mapEdit.legendFields,
                currProperties: payload.currProperties,
                featureIndex: payload.featureIndex,
              });
          }
            default: {
                return setMapEdit({
                  title: '',
                  hasStroke: true,
                  strokeColor: '',
                  strokeWeight: '',
                  strokeOpacity: '',
                  hasFill: true,
                  fillColor: '',
                  fillOpacity: '',
                  textColor: '',
                  textSize: '',
                  textFont: '',
                  // legendFillColor: '',
                  // legendBorderColor: '',
                  legendTitle: '',
                  // legendBorderWidth: '',
                  legendFields: [],
                  currProperties: {},
                  featureIndex: null,
                });
            }

        }
    }

    mapEdit.editStyles = async (styles) => {
      mapEditReducer({
        type: GlobalMapEditActionType.EDIT,
        payload: styles
      }); 
    };

    mapEdit.loadStyles = async (styles) => {
      console.log("STYLES", styles)
      mapEditReducer({
        type: GlobalMapEditActionType.LOAD,
        payload: styles
      }); 
    }

    mapEdit.loadProperties = (featureIndex) => {
      /*
        1st part -> dont bother changing if we are at the same index
        2nd part -> changing from one feature to another then save
        3rd part -> changing from a feature to no feature (clicking outside geojson) then save
      */
      console.log(mapEdit)
      if(mapEdit.featureIndex !== featureIndex && ((mapEdit.featureIndex !== null && featureIndex !== null) || (mapEdit.featureIndex !== null && featureIndex === null))){
        store.editProperties(mapEdit.featureIndex, mapEdit.currProperties)
      }

      if(featureIndex === null){
        mapEditReducer({
          type: GlobalMapEditActionType.EDIT_PROPERTY,
          payload:{
            featureIndex: null,
            currProperties: {}
          } 
        }); 
      }
      else {
        mapEditReducer({
          type: GlobalMapEditActionType.EDIT_PROPERTY,
          payload:{
            featureIndex: featureIndex,
            currProperties: store.currentMap.graphics.geojson.features[featureIndex].properties
          } 
        }); 
      }
    }

    mapEdit.editProperties = (propertyKey, value) => {
      console.log(mapEdit)
      let tempProperties = JSON.parse(JSON.stringify(mapEdit.currProperties))
      tempProperties[propertyKey] = value

      mapEditReducer({
        type: GlobalMapEditActionType.EDIT_PROPERTY,
        payload:{
          featureIndex: mapEdit.featureIndex,
          currProperties: tempProperties
        } 
      }); 
    }


   return (
    <GlobalMapEditContext.Provider value={{
        mapEdit
    }}>
        {props.children}
    </GlobalMapEditContext.Provider>
)};


export default GlobalMapEditContext;
export { GlobalMapEditContextProvider };
