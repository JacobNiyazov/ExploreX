import React, { useContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

import EditSidePanel from '../EditSidePanel.js';
import MapEdit from '../MapEdit.js';
import { GlobalStoreContext } from '../../store'
import { GlobalMapEditContext } from '../../mapEdit'
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom';

const EditScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { mapEdit } = useContext(GlobalMapEditContext);
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState(mapEdit.title);
    const [legendTitle, setLegendTitle] = useState(mapEdit.legendTitle);
    const [legendFields, setLegendFields] = useState([])
    
    console.log("MAP EDIT FIELDS")
    console.log(mapEdit.legendFields)
    const [colors,setColors] = useState({
        TextColor: mapEdit.textColor,
        HeatMap: '#FFFFFF',
        // LegendFill: mapEdit.legendFillColor,
        // LegendBorder: mapEdit.legendBorderColor,
        FillColor: mapEdit.fillColor,
        StrokeColor: mapEdit.strokeColor,
        DotMap: '#FFFFFF',
        SpikeMap: '#FFFFFF',
        VoronoiMap: '#FFFFFF'
    })
    const [sizes,setSizes] = useState({
        TextSize: mapEdit.textSize,
        StrokeWeight: mapEdit.strokeWeight,
    })
    const [opacities,setOpacities] = useState({
        StrokeOpacity: mapEdit.strokeOpacity,
        FillOpacity: mapEdit.fillOpacity,
    })
    const [anchors, setAnchors] = React.useState({
        Text: null,
        HeatMap: null,
        // LegendFill: null,
        // LegendBorder: null,
        RegionFill: null,
        RegionBorder: null,
        DotMap: null,
        SpikeMap: null,
        VoronoiMap: null
    })
    const [textFont, setTextFont] = React.useState(mapEdit.textFont)
    const [hasStroke, setHasStroke] = React.useState(mapEdit.hasStroke)
    const [hasFill, setHasFill] = React.useState(mapEdit.hasFill)
    const [hideLegend, setHideLegend] = React.useState(false)

    const [range, setRange] = React.useState(5)

    const navigate = useNavigate();
    useEffect(() => {
      const waitForAuthCheck = async () => {
        if (auth.loggedIn === undefined || store.currentMap === null || (store.currentMap && store.currentMap.title !== mapEdit.title)) {
          // Wait until authentication check is completed
          await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
          waitForAuthCheck(); // Re-check status
        } else {
            if (!auth.loggedIn) {
                store.setCurrentPage(store.currentPageType.login);
                navigate('/login');
            }
            if(store.currentMap.ownerUsername !== auth.user.username || store.currentMap.isPublic){
                store.setCurrentPage(store.currentPageType.profileScreen);
                navigate('/profile');
            }
            setLoading(false);
            setTitle(mapEdit.title);
            setColors({
                TextColor: mapEdit.textColor,
                HeatMap: '#FFFFFF',
                // LegendFill: mapEdit.legendFillColor,
                // LegendBorder: mapEdit.legendBorderColor,
                FillColor: mapEdit.fillColor,
                StrokeColor: mapEdit.strokeColor,
                DotMap: '#FFFFFF',
                SpikeMap: '#FFFFFF',
                VoronoiMap: '#FFFFFF'
            });
            setSizes({
                TextSize: mapEdit.textSize,
                StrokeWeight: mapEdit.strokeWeight,
            });
            setOpacities({
                StrokeOpacity: mapEdit.strokeOpacity,
                FillOpacity: mapEdit.fillOpacity,
            });
            setAnchors({
                Text: null,
                HeatMap: null,
                // LegendFill: null,
                // LegendBorder: null,
                RegionFill: null,
                RegionBorder: null,
                DotMap: null,
                SpikeMap: null,
                VoronoiMap: null
            });
            setTextFont(mapEdit.textFont);
            setHasStroke(mapEdit.hasStroke);
            setHasFill(mapEdit.hasFill);
            setLegendTitle(mapEdit.legendTitle)
            if(mapEdit.legendFields){
                setLegendFields([legendFields])
            }
            if(mapEdit.chloroData){
                let chloroInfo = mapEdit.chloroData.isString
                let flag = true;
                let previous = ""
                const keys = Object.keys(mapEdit.chloroData)
                    .filter(key => key !== "isString")
                    .reverse();
                const temp = keys.map(key => {
                    if (chloroInfo) {
                        return {
                            fieldColor: mapEdit.chloroData[key],
                            fieldText: key,
                        };
                    } else {
                        if(flag){
                            flag = false;
                            previous = key;
                            return {
                                fieldColor: mapEdit.chloroData[key],
                                fieldText: ">" + key,
                            };
                        }
                        let temp = previous;
                        previous = key;
                
                        return {
                            fieldColor: mapEdit.chloroData[key],
                            fieldText: "(" + key + "," + temp + "]",
                        };
                    }
                });
                setLegendFields(temp)

            }
        }
      };
  
      waitForAuthCheck();
    }, [auth, navigate, store]);
    useEffect(() => {
        const waitForCurrentMap = async () => {
            while (loading) {
                // Wait until currentMap is available
                await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
            }
        };

        waitForCurrentMap();
    }, [store, store.currentMap, loading]);

    

    
    if (store.currentPage === store.currentPageType.editMapScreen){
        return (
            <Grid container sx={{height:"100%"}}>
                <EditSidePanel 
                    title={title}
                    setTitle={setTitle}
                    colors={colors}
                    setColors={setColors}
                    anchors={anchors}
                    setAnchors={setAnchors}
                    sizes={sizes}
                    setSizes={setSizes}
                    opacities={opacities}
                    setOpacities={setOpacities}
                    textFont={textFont}
                    setTextFont={setTextFont}
                    hasStroke={hasStroke}
                    setHasStroke={setHasStroke}
                    hasFill={hasFill}
                    setHasFill={setHasFill}
                    range={range}
                    setRange={setRange}
                    // borderWidth={borderWidth}
                    // setBorderWidth={setBorderWidth}
                    hideLegend={hideLegend}
                    setHideLegend={setHideLegend}

                    />

                <MapEdit 
                    colors={colors}
                    sizes={sizes}
                    opacities={opacities}
                    hasStroke={hasStroke}
                    hasFill={hasFill}
                    range={range}
                    hideLegend={hideLegend}
                    legendTitle = {legendTitle}
                    setLegendTitle = {setLegendTitle}
                    legendFields = {legendFields}
                    setLegendFields = {setLegendFields}
                    />
            </Grid>
        );
    }
    else{
        return <div>Loading...</div>
    }
   
}

export default EditScreen