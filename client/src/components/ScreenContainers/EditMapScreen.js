import React, { useContext, useState, useEffect, useCallback } from 'react';
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
    
    const [colors,setColors] = useState({
        TextColor: mapEdit.textColor,
        HeatMap: '#FFFFFF',
        // LegendFill: mapEdit.legendFillColor,
        // LegendBorder: mapEdit.legendBorderColor,
        FillColor: mapEdit.fillColor,
        StrokeColor: mapEdit.strokeColor,
        DotMap: mapEdit.dotColor,
        SpikeMap: mapEdit.spikeColor,
        VoronoiMap: mapEdit.voronoiColor,
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
        if (auth.loggedIn === undefined || store.currentMap === null || (store.currentMap && store.currentMap._id !== mapEdit.id)) {
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

            console.log(mapEdit)
            setLoading(false);
            setTitle(mapEdit.title);
            setColors({
                TextColor: mapEdit.textColor,
                HeatMap: '#FFFFFF',
                // LegendFill: mapEdit.legendFillColor,
                // LegendBorder: mapEdit.legendBorderColor,
                FillColor: mapEdit.fillColor,
                StrokeColor: mapEdit.strokeColor,
                DotMap: mapEdit.dotColor,
                SpikeMap: mapEdit.spikeColor,
                VoronoiMap: mapEdit.voronoiColor,
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
                setLegendFields([...legendFields])
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

    

    const [propertyData, setPropertyData] = React.useState({properties: {}, featureIndex: null})

    const handlePropertyDataLoad = (featureIndex) =>{
        setPropertyData(propertyData =>{
            console.log(featureIndex, propertyData)
            if(propertyData.featureIndex !== featureIndex && ((propertyData.featureIndex !== null && featureIndex !== null) || (propertyData.featureIndex !== null && featureIndex === null))){
                store.editProperties(propertyData.featureIndex, propertyData.properties)
            }

            if(featureIndex !== null){
                return(
                    {
                        properties: JSON.parse(JSON.stringify(store.currentMap.graphics.geojson.features[featureIndex].properties)),
                        featureIndex: featureIndex
                    }
                ); 
            }
            else{
                return(
                    {
                        properties: {},
                        featureIndex: featureIndex
                    }
                ); 
            }
        })
        
        /*
            1st part -> dont bother changing if we are at the same index
            2nd part -> changing from one feature to another then save
            3rd part -> changing from a feature to no feature (clicking outside geojson) then save
        */
        
    }
    
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
                    setPropertyData={setPropertyData}
                    propertyData = {propertyData}/>
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
                    handlePropertyDataLoad = {handlePropertyDataLoad}
                    propertyData={propertyData}/>
            </Grid>
        );
    }
    else{
        return <div>Loading...</div>
    }
   
}

export default EditScreen