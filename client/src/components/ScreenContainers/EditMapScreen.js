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
    
    const [colors,setColors] = useState({
        TextColor: mapEdit.textColor,
        HeatMap: '#FFFFFF',
        // LegendFill: mapEdit.legendFillColor,
        // LegendBorder: mapEdit.legendBorderColor,
        FillColor: mapEdit.fillColor,
        StrokeColor: mapEdit.strokeColor,
        DotMap: mapEdit.dotColor,
        SpikeMap: mapEdit.spikeColor,
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
    /*const [colors, setColors] = React.useState({
        Text: store.currentGraphics.typeSpecific.color,
        HeatMap: '#FFFFFF',
        LegendFill: store.currentMap.graphics.legend.fillColor,
        LegendBorder: store.currentMap.graphics.legend.borderColor,
        RegionFill: store.currentMap.graphics.fillColor,
        RegionBorder: store.currentMap.graphics.region.borderColor,
        DotMap: '#FFFFFF',
        SpikeMap: '#FFFFFF',
        VoronoiMap: '#FFFFFF'
    });

    const [colorPicker, setColorPicker] = React.useState({
        Text: false,
        HeatMap: false,
        LegendFill: false,
        LegendBorder: false,
        RegionFill: false,
        RegionBorder: false,
        DotMap: false,
        SpikeMap: false,
        VoronoiMap: false
    })

    const [anchors, setAnchors] = React.useState({
        Text: null,
        HeatMap: null,
        LegendFill: null,
        LegendBorder: null,
        RegionFill: null,
        RegionBorder: null,
        DotMap: null,
        SpikeMap: null,
        VoronoiMap: null
    })

    const [font, setFont] = React.useState("Nova Square")

    const [size, setSize] = React.useState({
        Text: store.currentMap.graphics.text.size,
        Region: store.currentMap.graphics.region.size,
        DotMap: 12,
        SpikeMap: 12,
        VoronoiMap: 12
    })

    const [range, setRange] = React.useState(5)*/

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
                SpikeMap: mapEdit.dotColor,
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

    

    
    console.log(store.currentPage)
    console.log(mapEdit.title)
    console.log(title)
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
                    //range={range}
                    //setRange={setRange}
                    // borderWidth={borderWidth}
                    // setBorderWidth={setBorderWidth}
                    hideLegend={hideLegend}
                    setHideLegend={setHideLegend}/>
                <MapEdit 
                    colors={colors}
                    sizes={sizes}
                    opacities={opacities}
                    hasStroke={hasStroke}
                    hasFill={hasFill}
                    //range={range}
                    hideLegend={hideLegend}/>
            </Grid>
        );
    }
    else{
        return <div>Loading...</div>
    }
   
}

export default EditScreen