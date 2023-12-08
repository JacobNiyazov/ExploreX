import React from 'react';
import { useContext, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PropertyDetails, NumberSelector, FontSelector, SidePanelGrid, ButtonContainer, Buttons, EditAccordion, ExpandMore, CustomList, CustomListItem, EditAccordionSummary, TitleTextField, TitleContainer, AccordianContainer, SelectAllCheck} from './StyleSheets/EditSidePanelStyles';
import Grid from '@mui/material/Grid';
import ColorSelector from './ColorSelector.js';
import MenuItem from '@mui/material/MenuItem';
import { ColorTextField } from './StyleSheets/ColorSelectorStyles';
//import PublishMapModal from './PublishMapModal.js'
//import FinishedEditingMapModal from './FinishedEditingMapModal.js'
import GlobalStoreContext from '../store/index.js';

const EditSidePanel = ({
    title,
    setTitle,
    colors,
    setColors,
    anchors,
    setAnchors,
    sizes,
    setSizes,
    opacities,
    setOpacities,
    textFont,
    setTextFont,
    hasStroke,
    setHasStroke,
    hasFill,
    setHasFill,
    range,
    setRange,
    hideLegend,
    setHideLegend,
    propertyIndex
  }) => {  
    const { store } = useContext(GlobalStoreContext);
    
    const handleFont = (event) => {
        setTextFont(event.target.value)
    }
    
    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    
    const handleSize = (event, label) => {
        setSizes({
            ...sizes,
            [label]: event.target.value
        })
    }

    const handleOpacity = (event, label) => {
        setOpacities({
            ...opacities,
            [label]: event.target.value
        })
    }

    const handleProperty = (e, key, propertyIndex) =>{
        // Here we update the change store.currentMap
        // function would change value at store.currentMap.graphics.geojson.features[propertyIndex].properties[key]
        store.editProperties(propertyIndex, key, e.target.value)
    }

    const handleRange = (event) => {
        setRange(event.target.value)
    }

    const handleHideLegend = () => {
        setHideLegend(!hideLegend)
    }
    const handleHideFill = () => {
        setHasFill(!hasFill)
    }
    const handleHideStroke = () => {
        setHasStroke(!hasStroke)
    }

    const handleOpenPublish = () => {
        let publishMessage = (
            <div>
                <span style={{ fontWeight: 'bold', fontStyle: 'italic',textDecoration: 'underline' }}>
                Ready to Publish?</span><br></br>Once your map is published, it cannot be edited.
            </div>
        )
        store.displayModal(publishMessage, true, store.modalActionTypes.publish);
    }

    const handleOpenSave= () => {
        let saveMessage = (
            <div>
                <span style={{ fontWeight: 'bold', fontStyle: 'italic',textDecoration: 'underline' }}>
                Save Edits?</span><br></br>They'll be there forever...
            </div>
        )
        store.displayModal(saveMessage, true);
    }

    const commonFonts = [
        'Arial',
        'Helvetica',
        'Times New Roman',
        'Georgia',
        'Verdana',
        'Courier New',
        'Impact',
        'Comic Sans MS',
        'Arial Narrow',
        'Trebuchet MS',
        'Tahoma',
        'Courier',
        'Lucida Console',
        'Lucida Sans Unicode',
        'Palatino Linotype',
        'Book Antiqua',
        'Palatino',
        'Garamond',
        'Century Gothic',
        'Lucida Grande',
        'Geneva',
        'Monaco',
        'Optima',
        'Hoefler Text',
        'Consolas',
        'Andale Mono',
        'Copperplate',
        'Papyrus',
        'Brush Script MT',
        'Nova Square', 
      ];

    return (
        <SidePanelGrid container direction="column" item xs={4}>
            <AccordianContainer item xs>
                <TitleContainer item>  
                    <TitleTextField label="Title" value={title} onChange={handleTitle} data-testid="title-input"/>
                </TitleContainer>
                {/* Edit Text Options */}
                <EditAccordion disableGutters data-testid="edit-accordion">
                    <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                        <Typography variant="inherit">Text</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <Typography>Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="TextColor"/>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Font</Typography>
                                <FontSelector
                                    select
                                    defaultValue="Nova Square"
                                    variant="standard"
                                    SelectProps={{
                                        MenuProps: {
                                            sx: { height: "300px"},
                                        },
                                    }}
                                    onChange={(e) =>{handleFont(e, "TextFont")}}
                                    value={textFont}
                                    data-testid="font-selector"
                                    >
                                        {commonFonts.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                </FontSelector>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Size</Typography>
                                <NumberSelector
                                    data-testid="text-selector"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={sizes.TextSize}
                                    onChange={(event)=>{handleSize(event, "TextSize")}}
                                    error={sizes.TextSize === ""}
                                />
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>

                {/* Edit Text Options */}
                {console.log(propertyIndex)}
                <EditAccordion disableGutters data-testid="edit-accordion" disabled={propertyIndex==null}>
                    <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                        <Typography variant="inherit">Properties</Typography>
                    </EditAccordionSummary>
                    <PropertyDetails sx={{padding:0}}>
                        <CustomList>
                            {
                                propertyIndex !== null ?
                                Object.keys(store.currentMap.graphics.geojson.features[propertyIndex].properties).map((k, index, array)=>{
                                    return (
                                        <div key={k}>
                                            <CustomListItem>
                                                <Typography sx={{ marginRight: 'auto' }}>{k + ':'}</Typography>
                                                <ColorTextField variant="standard" value={store.currentMap.graphics.geojson.features[propertyIndex].properties[k]} onChange={(e) => {handleProperty(e, k, propertyIndex)}}/>
                                            </CustomListItem>
                                            {index !== array.length - 1 && <Divider sx={{ borderColor: "white" }} />}
                                        </div>
                                    );
                                }) : null
                            }
                        </CustomList>
                    </PropertyDetails>
                </EditAccordion>
                
                {/* Edit Legend Options */}
                <EditAccordion disableGutters data-testid="edit-accordion">
                    <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                        <Typography variant="inherit">Legend</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <Typography>Hide Legend</Typography>
                                <SelectAllCheck onChange={()=> {handleHideLegend()}}></SelectAllCheck>
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>

                {/* Edit Fill Options */}
                {console.log(store.currentMap)}{
                    store.currentMap.type !== "Heat Map" ?
                    <EditAccordion disableGutters data-testid="edit-accordion region" data->
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Fill</Typography>
                        </EditAccordionSummary>
                        <AccordionDetails sx={{padding:0}}>
                            <CustomList>
                                <CustomListItem>
                                    <Typography>Hide Fill</Typography>
                                    <SelectAllCheck onChange={()=> {handleHideFill()}}></SelectAllCheck>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Fill Color</Typography>
                                    <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="FillColor"/>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Fill Opacity</Typography>
                                    <NumberSelector
                                        data-testid="region-selector1"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={opacities.FillOpacity}
                                        onChange={(event)=>{handleOpacity(event, "FillOpacity")}}
                                        error={opacities.FillOpacity === ""}
                                    />
                                </CustomListItem>
                            </CustomList>
                        </AccordionDetails>
                    </EditAccordion>
                    : null
                }

                {/* Edit Stroke Options */}
                {
                    store.currentMap.type !== "Heat Map" ?
                    <EditAccordion disableGutters data-testid="edit-accordion region" data->
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Stroke</Typography>
                        </EditAccordionSummary>
                        <AccordionDetails sx={{padding:0}}>
                            <CustomList>
                                <CustomListItem>
                                    <Typography>Hide Stroke</Typography>
                                    <SelectAllCheck onChange={()=> {handleHideStroke()}}></SelectAllCheck>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Stroke Color</Typography>
                                    <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="StrokeColor"/>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Stroke Size</Typography>
                                    <NumberSelector
                                        data-testid="region-selector1"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={sizes.StrokeWeight}
                                        onChange={(event)=>{handleSize(event, "StrokeWeight")}}
                                        error={sizes.StrokeWeight === ""}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Stroke Opacity</Typography>
                                    <NumberSelector
                                        data-testid="region-selector1"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={opacities.StrokeOpacity}
                                        onChange={(event)=>{handleOpacity(event, "StrokeOpacity")}}
                                        error={opacities.StrokeOpacity === ""}
                                    />
                                </CustomListItem>
                            </CustomList>
                        </AccordionDetails>
                    </EditAccordion>
                    : null
                }

                {/* Edit Heat Map options */}
                {
                    store.currentMap.type === "Heat Map" ?
                    <EditAccordion disableGutters data-testid="edit-accordion heat-map">
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Heat Map Options</Typography>
                        </EditAccordionSummary>
                        <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                                <CustomListItem>
                                    <Typography>Color</Typography>
                                    <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="HeatMap"/>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Range</Typography>
                                    <NumberSelector
                                        data-testid="heat-map-selector"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={range}
                                        onChange={(event)=>{handleRange(event)}}
                                        error={range === ""}
                                    />
                                </CustomListItem>
                            </CustomList>
                        </AccordionDetails>
                    </EditAccordion>
                    : null
                }

                {/* Edit Dot Map Options */}
                {
                    store.currentMap.type === "Dot Map" ?
                    <EditAccordion disableGutters data-testid="edit-accordion dot-map">
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Dot Map Options</Typography>
                        </EditAccordionSummary>
                        <AccordionDetails sx={{padding:0}}>
                            <CustomList>
                                {/* <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Size</Typography>
                                    <NumberSelector
                                        data-testid="dot-map-selector"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={size.DotMap}
                                        onChange={(event)=>{handleSize(event, "DotMap")}}
                                        error={size.DotMap === ""}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} /> */}
                                <CustomListItem>
                                    <Typography>Dot Color</Typography>
                                    <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="DotMap"/>
                                </CustomListItem>
                            </CustomList>
                        </AccordionDetails>
                    </EditAccordion>
                    : null
                }

                {/* Edit Spike Map Options */}
                {
                    store.currentMap.type === "Spike Map" ?
                    <EditAccordion disableGutters data-testid="edit-accordion spike-map">
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Spike Map Options</Typography>
                        </EditAccordionSummary>
                        <AccordionDetails sx={{padding:0}}>
                            <CustomList>
                                {/* <CustomListItem>
                                    <Typography>Select All</Typography>
                                    <SelectAllCheck onChange={()=> {handleSelectAll("SpikeMap")}}></SelectAllCheck>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Size</Typography>
                                    <NumberSelector
                                        data-testid="spike-map-selector"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={size.SpikeMap}
                                        onChange={(event)=>{handleSize(event, "SpikeMap")}}
                                        error={size.SpikeMap === ""}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} /> */}
                                <CustomListItem>
                                    <Typography>Spike Color</Typography>
                                    <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="SpikeMap"/>
                                </CustomListItem>
                            </CustomList>
                        </AccordionDetails>
                    </EditAccordion>
                    : null
                }
                

                {/* Edit Voronoi Map Options */}
                {
                    store.currentMap.type === "Voronoi Map" ?
                    <EditAccordion disableGutters data-testid="edit-accordion voronoi-map">
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Voronoi Map Options</Typography>
                        </EditAccordionSummary>
                        <AccordionDetails sx={{padding:0}}>
                            <CustomList>
                                {/* <CustomListItem>
                                    <Typography>Select All</Typography>
                                    <SelectAllCheck onChange={()=> {handleSelectAll("VoronoiMap")}}></SelectAllCheck>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Size</Typography>
                                    <NumberSelector
                                        data-testid="voronoi-map-selector"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={size.VoronoiMap}
                                        onChange={(event)=>{handleSize(event, "VoronoiMap")}}
                                        error={size.VoronoiMap === ""}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} /> */}
                                <CustomListItem>
                                    <Typography>Dot Color</Typography>
                                    <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="VoronoiMap"/>
                                </CustomListItem>
                            </CustomList>
                        </AccordionDetails>
                    </EditAccordion>
                    : null
                }

            </AccordianContainer>


            <ButtonContainer item>
                <Grid container columns={17} alignItems="center" sx={{height:"100%"}}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons onClick={handleOpenSave}>
                            <Typography variant='inherit'>Save</Typography>
                        </Buttons>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons onClick={handleOpenPublish} data-testid="map-publish-button">
                            <Typography variant='inherit'>Publish</Typography>
                        </Buttons>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

            </ButtonContainer>
        </SidePanelGrid>
    );
}

export default EditSidePanel