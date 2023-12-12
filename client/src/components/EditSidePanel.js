import React from 'react';
import { useContext, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CreateButton, DeleteButton, PropertyDetails, NumberSelector, FontSelector, SidePanelGrid, ButtonContainer, Buttons, EditAccordion, ExpandMore, CustomList, CustomListItem, EditAccordionSummary, TitleTextField, TitleContainer, AccordianContainer, SelectAllCheck} from './StyleSheets/EditSidePanelStyles';
import Grid from '@mui/material/Grid';
import ColorSelector from './ColorSelector.js';
import MenuItem from '@mui/material/MenuItem';
//import PublishMapModal from './PublishMapModal.js'
//import FinishedEditingMapModal from './FinishedEditingMapModal.js'
import GlobalStoreContext from '../store/index.js';
import { ColorTextField } from './StyleSheets/ColorSelectorStyles';

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
    setPropertyData, 
    propertyData
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
        let newValue = parseFloat(event.target.value);
    
        if (!isNaN(newValue)) {
            newValue = Math.min(1, Math.max(0, newValue));
    
            setOpacities({
                ...opacities,
                [label]: newValue,
            });
        }
    };
    
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
    function alertModal(header, paragraph){
        store.displayModal(<div>
            <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>{header}</h4>
            <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}>{paragraph}</p>
        </div>, false);
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

    const handleDeleteProperty = (key) =>{
        let tempProperties = JSON.parse(JSON.stringify(propertyData.properties))
        delete tempProperties[key]
        setPropertyData(
            {
                properties: tempProperties,
                featureIndex: propertyData.featureIndex
            }
        ); 
    }

    const handleEditProperties = (key, value) => {
        let tempProperties = JSON.parse(JSON.stringify(propertyData.properties))
        tempProperties[key] = value
        setPropertyData(
            {
                properties: tempProperties,
                featureIndex: propertyData.featureIndex
            }
        ); 
    }
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')

    const handleCreateProperties = () => {
        let tempProperties = JSON.parse(JSON.stringify(propertyData.properties))

        if(key in tempProperties || key === ""){
            //handle error modal
            alertModal("Try Again", "Key was empty or already exists within the properties.");
        }
        else{
            tempProperties[key] = value
            setPropertyData(
                {
                    properties: tempProperties,
                    featureIndex: propertyData.featureIndex
                }
            ); 
            
        }
        setKey('')
        setValue('')
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
                        <Typography variant="inherit">Popup Text</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <Typography color='grey'>These changes will only be relected/visible on published maps</Typography>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
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

                {/* Edit Properties Options */}
                <EditAccordion disableGutters data-testid="edit-accordion" disabled={propertyData.featureIndex==null} expanded={propertyData.featureIndex!==null}>
                    <EditAccordionSummary >
                        <Typography variant="inherit">Properties</Typography>
                    </EditAccordionSummary>
                    <PropertyDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <ColorTextField label={"Key"} sx={{marginRight:'auto', input:{textAlign:'left'}}} variant="standard" value={key} onChange={(e) => {setKey(e.target.value)}}/>
                                <ColorTextField label={"Value"} variant="standard" value={value} onChange={(e) => {setValue(e.target.value)}}/>
                                <CreateButton variant="text" onClick={handleCreateProperties}>
                                        <Typography variant='inherit'>Create</Typography>
                                </CreateButton>
                                
                            </CustomListItem>
                            <Divider sx={{ borderColor: "white" }} />
                            {
                                propertyData.featureIndex !== null ?
                                Object.keys(propertyData.properties).map((k, index, array)=>{
                                    return (
                                        <div key={k}>
                                            <CustomListItem>
                                                <Typography sx={{ marginRight: 'auto' }}>{k + ':'}</Typography>
                                                <ColorTextField variant="standard" value={propertyData.properties[k]} onChange={(e) => {handleEditProperties(k, e.target.value)}}/>
                                                <DeleteButton variant="text" onClick={()=>{handleDeleteProperty(k)}}>
                                                        <Typography variant='inherit'>X</Typography>
                                                </DeleteButton>
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
                    store.currentMap.type !== "Choropleth Map" ?
                    <EditAccordion disableGutters data-testid="edit-accordion region" data->
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Region Fill</Typography>
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
                    
                    <EditAccordion disableGutters data-testid="edit-accordion region" data->
                        <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                            <Typography variant="inherit">Borders</Typography>
                        </EditAccordionSummary>
                        <AccordionDetails sx={{padding:0}}>
                            <CustomList>
                                <CustomListItem>
                                    <Typography>Hide Borders</Typography>
                                    <SelectAllCheck onChange={()=> {handleHideStroke()}}></SelectAllCheck>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Border Color</Typography>
                                    <ColorSelector colors={colors} setColors={setColors} anchors={anchors} setAnchors={setAnchors} label="StrokeColor"/>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Border Thickness</Typography>
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
                                    <Typography>Border Opacity</Typography>
                                    <NumberSelector
                                        data-testid="region-selector1"
                                        type="number"
                                        inputProps={{step: "0.1"}}
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
                    store.currentMap.type === "Dot Distribution Map" ?
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