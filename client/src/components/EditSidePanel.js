import React from 'react';
import { useContext, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { NumberSelector, FontSelector, SidePanelGrid, ButtonContainer, Buttons, EditAccordion, ExpandMore, CustomList, CustomListItem, EditAccordionSummary, TitleTextField, TitleContainer, AccordianContainer, SelectAllCheck} from './StyleSheets/EditSidePanelStyles';
import Grid from '@mui/material/Grid';
import ColorSelector from './ColorSelector.js';
import MenuItem from '@mui/material/MenuItem';
//import PublishMapModal from './PublishMapModal.js'
//import FinishedEditingMapModal from './FinishedEditingMapModal.js'
import GlobalStoreContext from '../store/index.js';

const EditSidePanel = ({
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
  }) => {  
    const { store } = useContext(GlobalStoreContext);
    // need to update this when i have map edit store

    const [title, setTitle] = useState("Example Map")
    
    function handleEditMap(){
        let newMapData = {
            hasStroke: this.hasStroke,
            strokeColor: this.colors.strokeColor,
            strokeWeight: this.strole.Weight,
            strokeOpacity: this.opacities.strokeOpacity,
            hasFill: this.hasFill,
            fillColor: this.colors.fillColor,
            fillOpacity: this.opacities.fillOpacity,
            textColor: this.colors.textColor,
            textSize: this.sizes.textSize,
            textFont: this.textFont,
            legendFillColor: this.colors.legendFillColor,
            legendBorderColor: this.colors.borderColor,
            legendTitle: this.title,
            legendBorderWidth: this.legendBorderWidth,
            legendFields: this.legendFields
        }
        //store.addUpdateMapTransaction(newMapData); 
    }
    const handleTitle= (event) => {
        setTitle(event.target.value)
        handleEditMap()
    }

    const handleFont= (event, label) => {
        setTextFont(event.target.value)
        handleEditMap() 
    }

    const handleSize= (event, label) => {
        setSizes({
            ...sizes,
            [label]: event.target.value
        })
        handleEditMap() 
    }

    const handleOpacity = (event, label) => {
        setOpacities({
            ...opacities,
            [label]: event.target.value
        })
        handleEditMap() 
    }

    const handleRange = (event) => {
        setRange(event.target.value)
    }

    const handleHideLegend = () => {
        setHideLegend(!hideLegend)
        handleEditMap() 
    }
    const handleHideStroke = () => {
        setHasStroke(!hasStroke)
    }
    const handleHideFill = () => {
        setHasFill(!hasFill)
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
                                    value={sizes.Text}
                                    onChange={(event)=>{handleSize(event, "Text")}}
                                    error={sizes.Text === ""}
                                />
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
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
                                        value={sizes.Region}
                                        onChange={(event)=>{handleOpacity(event, "FillOpacity")}}
                                        error={sizes.Region === ""}
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
                                        value={sizes.Region}
                                        onChange={(event)=>{handleSize(event, "StrokeSize")}}
                                        error={sizes.Region === ""}
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
                                        value={sizes.Region}
                                        onChange={(event)=>{handleOpacity(event, "StrokeOpacity")}}
                                        error={sizes.Region === ""}
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
                                <CustomListItem>
                                    <Typography>Select All</Typography>
                                    <SelectAllCheck onChange={()=> {handleSelectAll("DotMap")}}></SelectAllCheck>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Size</Typography>
                                    <NumberSelector
                                        data-testid="dot-map-selector"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        value={sizes.DotMap}
                                        onChange={(event)=>{handleSize(event, "DotMap")}}
                                        error={sizes.DotMap === ""}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
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
                                <CustomListItem>
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
                                        value={sizes.SpikeMap}
                                        onChange={(event)=>{handleSize(event, "SpikeMap")}}
                                        error={sizes.SpikeMap === ""}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
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
                                <CustomListItem>
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
                                        value={sizes.VoronoiMap}
                                        onChange={(event)=>{handleSize(event, "VoronoiMap")}}
                                        error={sizes.VoronoiMap === ""}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
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
                            <Typography variant='inherit'>Submit</Typography>
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