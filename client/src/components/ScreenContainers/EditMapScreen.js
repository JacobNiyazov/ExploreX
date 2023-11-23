import React, { useContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

import EditSidePanel from '../EditSidePanel.js';
import MapEdit from '../MapEdit.js';
import { GlobalStoreContext } from '../../store'
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom';

const EditScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      const waitForAuthCheck = async () => {
          if (auth.loggedIn === undefined) {
              // Wait until authentication check is completed
              await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
              waitForAuthCheck(); // Re-check status
          } else {
              if(!auth.loggedIn){
                  store.setCurrentPage(store.currentPageType.login)
                  navigate("/login");
              }   
              setLoading(false);
              
          }
      };
  
      waitForAuthCheck();
    }, [auth, navigate, store]);
    const [colors, setColors] = React.useState({
        Text: store.currentMap.graphics.typeSpecific.color,
        HeatMap: '#FFFFFF',
        LegendFill: store.currentMap.graphics.legend.fillColor,
        LegendBorder: store.currentMap.graphics.legend.borderColor,
        RegionFill: store.currentMap.graphics.region.fillColor,
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

    const [range, setRange] = React.useState(5)

    const [borderWidth, setBorderWidth] = React.useState({
        Region: store.currentMap.graphics.region.borderWidth,
        Legend: store.currentMap.graphics.legend.borderWidth,
    })

    const [selectAll, setSelectAll] = React.useState({
        DotMap: false,
        SpikeMap: false,
        VoronoiMap: false
    })

    const [hideLegend, setHideLegend] = React.useState(false)

    if (loading) {
        return <div>Loading...</div>;
    }
    if (store.currentPage === store.currentPageType.editMapScreen){
        return (
            <Grid container sx={{height:"100%"}}>
                <EditSidePanel 
                    colors={colors}
                    setColors={setColors}
                    colorPicker={colorPicker}
                    setColorPicker={setColorPicker}
                    anchors={anchors}
                    setAnchors={setAnchors}
                    font={font}
                    setFont={setFont}
                    size={size}
                    setSize={setSize}
                    range={range}
                    setRange={setRange}
                    borderWidth={borderWidth}
                    setBorderWidth={setBorderWidth}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    hideLegend={hideLegend}
                    setHideLegend={setHideLegend}/>
                <MapEdit 
                    colors={colors}
                    font={font}
                    size={size}
                    range={range}
                    borderWidth={borderWidth}
                    selectAll={selectAll}
                    hideLegend={hideLegend}/>
            </Grid>
        );
    }
    else{
        return <div></div>
    }
   
}

export default EditScreen