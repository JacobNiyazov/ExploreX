import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import api from './store-request-api'
import { AuthContext } from '../auth'
import maps from '../store/map-request-api';

export const GlobalMapEditContext = createContext({});
// TO USE STORE IN A COMPONENT CALL THIS -> const { store } = useContext(GlobalStoreContext);

export const GlobalMapEditActionType = {
    EDIT: "Edit",
    LOAD: "Load",

}


function GlobalMapEditContextProvider(props) {
    const [mapEdit, setMapEdit] = useState({
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
        legendFillColor: '',
        legendBorderColor: '',
        legendTitle: '',
        legendBorderWidth: '',
        legendFields: []
    });

    const { auth } = useContext(AuthContext);

    const mapEditReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // GETS ALL THE LISTINGS FROM DATABASE
            case GlobalMapEditActionType.EDIT: {
                return setMapEdit({
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
                  legendFillColor: payload.legendFillColor,
                  legendBorderColor: payload.legendBorderColor,
                  legendTitle: payload.legendTitle,
                  legendBorderWidth: payload.legendBorderWidth,
                  legendFields: payload.legendFields
                });
            }
            default: {
                return setMapEdit({
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
                  legendFillColor: '',
                  legendBorderColor: '',
                  legendTitle: '',
                  legendBorderWidth: '',
                  legendFields: []
                });
            }

        }
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
