import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import Grid from '@mui/material/Grid';
import domtoimage from 'dom-to-image';

import EditSidePanel from '../EditSidePanel.js';
import MapEdit from '../MapEdit.js';
import { GlobalStoreContext } from '../../store'
import { GlobalMapEditContext } from '../../mapEdit'
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const EditScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { mapEdit } = useContext(GlobalMapEditContext);
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState(mapEdit.title);
    const [legendTitle, setLegendTitle] = useState(mapEdit.legendTitle);
    const [legendFields, setLegendFields] = useState([])
    const [chloroData, setChloroData] = useState(null);

    const [screenShot, setScreenShot] = useState (null);
    const [photo, setPhoto] = useState(false)

    const handleNewColors = (newData) => {
        let chloroInfo = newData.isString
        let flag = true;
        let previous = ""
        let keys;
        if(chloroInfo){
            keys = Object.keys(newData)
            .filter(key => key !== "isString")
            .reverse();
        }
        else{
            keys = Object.keys(newData)
            .filter(key => key !== "isString")
            .map(Number) // Convert string keys to numbers
            .sort((a, b) => b - a) // Sort in descending numerical order
            .map(String); // Convert back to strings if needed
        }

        const temp = keys.map(key => {
            if (chloroInfo) {
                return {
                    fieldColor: newData[key],
                    fieldText: key,
                };
            } else {
                if(flag){
                    flag = false;
                    previous = key;
                    return {
                        fieldColor: newData[key],
                        fieldText: ">" + key,
                    };
                }
                let temp = previous;
                previous = key;
        
                return {
                    fieldColor: newData[key],
                    fieldText: "(" + key + "," + temp + "]",
                };
            }
        });
        setLegendFields(temp)
        setChloroData(newData)
        
    };

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

    const [voronoiValue, setVoronoiValue] = React.useState(mapEdit.voronoiValue)

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
            if(store.currentMap.ownerUsername !== auth.user.username){
                store.setCurrentPage(store.currentPageType.profileScreen);
                navigate('/profile');
            }
            else if(store.currentMap.isPublic){
                store.setCurrentPage(store.currentPageType.publicMapView, store.currentMap);
                navigate('/map?id=${store.currentMap._id}');
            }
            
            if(loading === true && (store.currentMap.graphics.typeSpecific.dotPoints!==null || store.currentMap.graphics.typeSpecific.dotScale!==null || store.currentMap.graphics.typeSpecific.spikeData!==null || store.currentMap.graphics.typeSpecific.spikeLegend!==null || (store.currentMap.graphics.typeSpecific.chloroLegend!==null && mapEdit.legendFields !== null && mapEdit.legendFields.length !== 0) || store.currentMap.graphics.typeSpecific.voronoiBound!==null)){
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
                setLegendTitle(mapEdit.legendTitle);
                setVoronoiValue(mapEdit.voronoiValue);

                if(!legendFields && mapEdit.legendFields){
                    setLegendFields([...mapEdit.legendFields])
                }
                if(!chloroData && mapEdit.chloroData){
                    handleNewColors(mapEdit.chloroData)
                }
                setLoading(false);
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
    
    const [voronoiPointToggle, setVoronoiPointToggle] = React.useState(false)

    const captureMapAsImage = async () => {        
        const mapContainer = document.getElementById('map-container'); // Replace 'map-container' with the actual ID or use another method to get the element
            console.log("map container: ",mapContainer)
            if (mapContainer) {
            // Use dom-to-image to convert the MapContainer element to an image
            domtoimage.toPng(mapContainer, {
                width: mapContainer.clientWidth * 1,
                height: mapContainer.clientHeight * 1,
            })
                .then(async function (dataUrl) {
                    if(screenShot == null){
                        store.updateMapGraphics(null, dataUrl)
                        setScreenShot(dataUrl)
                    }
                    else{
                        setScreenShot(dataUrl)
                        console.log("BADSHB")
                        store.updateScreenShot(dataUrl)

                    }
                    console.log("DONE")
                })
                .catch(function (error) {
                // Handle any errors that occurred during image conversion
                console.error('Error capturing screenshot:', error);
                });
            } else {
            console.error('MapContainer element not found');
            }
            //console.log("set photo")
            setPhoto(true);

        }

    const handleOpenPublishSave = (isPublish) => {
        setPhoto(false);
        console.log(">>>")
       
        let publishMessage = (
            <div>
                <span style={{ fontWeight: 'bold', fontStyle: 'italic',textDecoration: 'underline' }}>
                Ready to Publish?</span><br></br>Once your map is published, it cannot be edited.
            </div>
        )
        let saveMessage = (
            <div>
                <span style={{ fontWeight: 'bold', fontStyle: 'italic',textDecoration: 'underline' }}>
                Save Edits?</span><br></br>They'll be there forever...
            </div>
        )

        let styles = {
            id: store.currentMap._id,
            title: title,
            hasStroke: hasStroke,
            strokeColor: colors.StrokeColor,
            strokeWeight: sizes.StrokeWeight,
            strokeOpacity: opacities.StrokeOpacity,
            hasFill: hasFill,
            fillColor: colors.FillColor,
            fillOpacity: opacities.FillOpacity,
            textColor: colors.TextColor,
            textSize: sizes.TextSize,
            textFont: textFont,
            legendTitle: legendTitle,
            legendFields: legendFields,
            chloroData: chloroData,
            dotColor: colors.DotMap,
            spikeColor: colors.SpikeMap,
            voronoiColor: colors.VoronoiMap,
            screenShot : screenShot,
            voronoiValue: voronoiValue,
        }
        mapEdit.loadStyles(styles);
        if(isPublish){
            store.displayModal(publishMessage, true, store.modalActionTypes.publish);
        }
        else{
            store.displayModal(saveMessage, true, store.modalActionTypes.save);
        }
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
                    propertyData = {propertyData}
                    handleOpenPublishSave={handleOpenPublishSave}
                    setVoronoiPointToggle={setVoronoiPointToggle}/>
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
                    propertyData={propertyData}
                    chloroData = {chloroData}
                    setChloroData = {setChloroData}
                    handleNewColors = {handleNewColors}
                    photo = {photo}
                    setPhoto= {setPhoto}
                    captureMapAsImage = {captureMapAsImage}
                    voronoiPointToggle={voronoiPointToggle}
                    voronoiValue={voronoiValue}
                    setVoronoiValue={setVoronoiValue}/>
            </Grid>
        );
    }
    else{
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
              <CircularProgress style={{'color':'#ff24bd'}}/>
              Loading...
            </Box>
          );
    }
   
}

export default EditScreen