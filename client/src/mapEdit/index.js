import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import api from '../store/index'
import { AuthContext } from '../auth'
import maps from '../store/map-request-api';
import EditMap_Transaction from '../transactions/EditMap_Transaction';
import jsTPS from '../transactions/jsTPS';
import GlobalStoreContext from '../store/index'

export const GlobalMapEditContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalMapEditActionType = {
    EDIT: "Edit",
    LOAD: "Load",

}

function GlobalMapEditContextProvider(props) {
    const [mapEdit, setMapEdit] = useState({
        id: '',
        title: 'Map Example',
        hasStroke: true,
        strokeColor: "#B9B0B0",
        strokeWeight: 3.0,
        strokeOpacity: 1.0,
        hasFill: true,
        fillColor: "#B9B0B0",
        fillOpacity: '',
        textColor: "#B9B0B0",
        textSize: 12,
        textFont: '',
        // legendFillColor: '',
        // legendBorderColor: '',
        legendTitle: '',
        // legendBorderWidth: '',
        legendFields: [],
        dotColor: "#ff24bd",
        spikeColor: "#ff24bd",
        voronoiColor:'',
        chloroData: {},
        lowGradient:'#0000FF',
        mediumGradient: '#FEEA00',
        highGradient: '#FF0000',
        voronoiValue:'',
        screenShot: '',
    });
    console.log("NEW ", mapEdit)

    const { auth } = useContext(AuthContext);
    const {store} = useContext(GlobalStoreContext)
    const mapEditReducer = (action) => {
        const { type, payload } = action;
        console.log("CALLIGN REDUCCER WITH ", payload)
        switch (type) {
            // GETS ALL THE LISTINGS FROM DATABASE
            case GlobalMapEditActionType.EDIT: {
                return setMapEdit({
                  id: payload.id,
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
                  chloroData: payload.chloroData,
                  dotColor: payload.dotColor,
                  voronoiColor: payload.voronoiColor,
                  spikeColor: payload.spikeColor,
                  lowGradient:payload.lowGradient,
                  mediumGradient: payload.mediumGradient,
                  highGradient: payload.highGradient,
                  voronoiValue: payload.voronoiValue,
                  screenShot : ''
                });
            }
            case GlobalMapEditActionType.LOAD: {
                return setMapEdit({
                  id: payload.id,
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
                  chloroData: payload.chloroData,
                  dotColor: payload.dotColor,
                  voronoiColor: payload.voronoiColor,
                  spikeColor: payload.spikeColor,
                  lowGradient:payload.lowGradient,
                  mediumGradient: payload.mediumGradient,
                  highGradient: payload.highGradient,
                  voronoiValue: payload.voronoiValue,
                  screenShot: payload.screenShot
                });
            }
            default: {
                return setMapEdit({
                  id: '',
                  title: 'Map Example',
                  hasStroke: true,
                  strokeColor: "#B9B0B0",
                  strokeWeight: 3.0,
                  strokeOpacity: 1.0,
                  hasFill: true,
                  fillColor: "#B9B0B0",
                  fillOpacity: '',
                  textColor:"#B9B0B0",
                  textSize: 12,
                  textFont: '',
                  // legendFillColor: '',
                  // legendBorderColor: '',
                  legendTitle: '',
                  // legendBorderWidth: '',
                  legendFields: [],
                  chloroData: {},
                  dotColor: "#ff24bd",
                  spikeColor: "#ff24bd",
                  lowGradient:'#0000FF',
                  mediumGradient: '#FEEA00',
                  highGradient: '#FF0000',
                  voronoiColor: '',
                  voronoiValue: '',
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
      mapEditReducer({
        type: GlobalMapEditActionType.LOAD,
        payload: styles
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
