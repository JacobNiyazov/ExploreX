import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EditSidePanel from '../EditSidePanel.js';
import MapEdit from '../MapEdit.js';


const EditScreen = () => {
    const [colors, setColors] = React.useState({
        Text: '#FFFFFF',
        HeatMap: '#FFFFFF',
        LegendFill: '#FFFFFF',
        LegendBorder: '#FFFFFF',
        RegionFill: '#FFFFFF',
        RegionBorder: '#FFFFFF',
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
        Text: 12,
        Region: 12,
        DotMap: 12,
        SpikeMap: 12,
        VoronoiMap: 12
    })

    const [range, setRange] = React.useState(5)

    const [borderWidth, setBorderWidth] = React.useState({
        Region: 1,
        Legend: 1,
    })

    const [selectAll, setSelectAll] = React.useState({
        DotMap: false,
        SpikeMap: false,
        VoronoiMap: false
    })

    const [hideLegend, setHideLegend] = React.useState(false)


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

export default EditScreen