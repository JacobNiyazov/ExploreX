import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../auth'

export const GlobalMapEditContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalMapEditActionType = {
    EDIT: "Edit",
    LOAD: "Load",

}


function GlobalMapEditContextProvider(props) {
    const [mapEdit, setMapEdit] = useState({
        id: '',
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
        dotColor: '',
        spikeColor: '',
        chloroData: {}
    });
    console.log("NEW ", mapEdit)

    const { auth } = useContext(AuthContext);

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
                  spikeColor: payload.spikeColor,
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
                  spikeColor: payload.spikeColor,
                });
            }
            default: {
                return setMapEdit({
                  id: '',
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
                  chloroData: {},
                  dotColor: '',
                  spikeColor: '',
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
      console.log("LOADINGSSS")
      console.log(styles)
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
