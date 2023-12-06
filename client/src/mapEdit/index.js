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

const tps = new jsTPS();

function GlobalMapEditContextProvider(props) {
    const { store } = useContext(GlobalStoreContext);
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
    // update map edit
    mapEdit.addUpdateMapTransaction = function(newMapData){
        let oldMapData = {
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
            legendFillColor: mapEdit.legendFillColor,
            legendBorderColor: mapEdit.legendBorderColor,
            legendTitle: mapEdit.legendTitle,
            legendBorderWidth: mapEdit.legendBorderWidth,
            legendFields: mapEdit.legendFields
        }
        let transaction = new EditMap_Transaction(this, oldMapData, newMapData)
        tps.addTransaction(transaction)
    }
    mapEdit.updateMap = function(mapData){
        // get the current map by id
        // we have the map id, we can update map
        mapEditReducer({
            type: GlobalMapEditActionType.EDIT,
            payload: {
                hasStroke: mapData.hasStroke,
                strokeColor: mapData.strokeColor,
                strokeWeight: mapData.strokeWeight,
                strokeOpacity: mapData.strokeOpacity,
                hasFill: mapData.hasFill,
                fillColor: mapData.fillColor,
                fillOpacity: mapData.fillOpacity,
                textColor: mapData.textColor,
                textSize: mapData.textSize,
                textFont: mapData.textFont,
                legendFillColor: mapData.legendFillColor,
                legendBorderColor: mapData.legendBorderColor,
                legendTitle: mapData.legendTitle,
                legendBorderWidth: mapData.legendBorderWidth,
                legendFields: mapData.legendFields
            },
        });
    }
    mapEdit.undo = function(){
        if(!store.modalOpen){
            tps.undoTransaction();
        }
    }
    mapEdit.redo = function(){
        if(!store.modalOpen){
            tps.doTransaction();
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
