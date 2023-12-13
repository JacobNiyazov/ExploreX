import React from 'react';
import { useContext, useState, useRef } from 'react';
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
import { GlobalMapEditContext } from '../mapEdit'
import EditMap_Transaction from '../transactions/EditMap_Transaction.js';

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
    propertyData,
    originalStatesRef,
    setLegendTitle,
    setLegendFields
  }) => {  
    const { store } = useContext(GlobalStoreContext);
    const { mapEdit } = useContext(GlobalMapEditContext);
    let tps = store.currentTps
    function newTransaction(field, value){
        // instead of the mapEdit replace that with originalStatesRef.current
        let newMapData = {
            title: field === "title"? value:title,
            colors: {
                TextColor: originalStatesRef.current.colors.TextColor,
                FillColor: originalStatesRef.current.colors.FillColor,
                StrokeColor: originalStatesRef.current.colors.StrokeColor,
                DotMap: originalStatesRef.current.colors.DotMap,
                SpikeMap: originalStatesRef.current.colors.SpikeMap,
                lowGradient: originalStatesRef.current.colors.lowGradient,
                mediumGradient: originalStatesRef.current.colors.mediumGradient,
                highGradient: originalStatesRef.current.colors.highGradient
            },
            sizes:{
                TextSize: field === "TextSize"? value:sizes.TextSize,
                StrokeWeight: field==="StrokeWeight"?value:sizes.StrokeWeight,
            },
            opacities:{
                StrokeOpacity: field === "StrokeOpacity"?value:opacities.StrokeOpacity,
                FillOpacity: field === "FillOpacity"?value:opacities.FillOpacity,
            },
            hasStroke: field==="hasStroke"?value:hasStroke,
            hasFill: field === "hasFill"?value:hasFill,
            textFont: field === "textFont"? value:textFont,
            legendTitle: originalStatesRef.current.legendTitle,
            legendFields: originalStatesRef.current.legendFields,
            // focusing on the non-typespefic stuff first
            chloroData: mapEdit.chloroData, // not sure what to set this to rn
        }
        console.log("old data: ", originalStatesRef.current)
        console.log("new data: ", newMapData)
        let transaction = new EditMap_Transaction(originalStatesRef.current, 
            newMapData,
            setTitle, 
            setLegendTitle, 
            setLegendFields, 
            setColors, 
            setSizes,
            setOpacities,
            setAnchors,
            setTextFont,
            setHasStroke, 
            setHasFill,
            setHideLegend,)
        // add this transaction to the jsTPS stack
        console.log("old data: ", originalStatesRef.current)
        console.log("new data: ", newMapData)

        tps.addTransaction(transaction)
        console.log("tps in side panel: ", tps)
        // change the originalStatesRef to the newMapData
        originalStatesRef.current = {...newMapData}
        console.log("original state after the changes: ",originalStatesRef.current)
    }
    const handleFont = (event) => {
        //get the map before the setFont is done
        setTextFont(event.target.value)
        newTransaction("textFont", event.target.value)
    }
    
    const handleTitle = (event) => {
        setTitle(event.target.value)
        newTransaction("title", event.target.value)
    }
    
    const handleSize = (event, label) => {
        setSizes({
            ...sizes,
            [label]: event.target.value
        })
        newTransaction(label, event.target.value)
    }

    const handleOpacity = (event, label) => {
        let newValue = parseFloat(event.target.value);
    
        if (!isNaN(newValue)) {
            newValue = Math.min(1, Math.max(0, newValue));
    
            setOpacities({
                ...opacities,
                [label]: newValue,
            });
            newTransaction(label, newValue)
        }
    };

    const handleHideLegend = () => {
        // need to figure out what to do for this transaction
        setHideLegend(!hideLegend)
    }
    const handleHideFill = () => {
        setHasFill(!hasFill)
        newTransaction("hasFill", !hasFill)
    }
    const handleHideStroke = () => {
        setHasStroke(!hasStroke)
        newTransaction("hasStroke", !hasStroke)
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
        // might have to add a transaction for this after tonight 
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
                        <Typography variant="inherit">Text</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <Typography>Color</Typography>
                                <ColorSelector originalStatesRef = {originalStatesRef} 
                                colors={colors} 
                                setColors={setColors} 
                                anchors={anchors} 
                                setAnchors={setAnchors} 
                                label="TextColor"
                                setTitle={setTitle}
                                setSizes={setSizes}
                                setOpacities={setOpacities}
                                setTextFont={setTextFont}
                                setHasStroke={setHasStroke}
                                setHasFill={setHasFill}
                                setHideLegend={setHideLegend}
                                setLegendTitle = {setLegendTitle}
                                setLegendFields = {setLegendFields}
                                />
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
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="FillColor"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}/>
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
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="StrokeColor"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}
                                    />
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
                                    <Typography>Low Gradient</Typography>
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="lowGradient"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}/>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>Medium Gradient</Typography>
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="mediumGradient"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}/>
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
                                <CustomListItem>
                                    <Typography>High Gradient</Typography>
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="highGradient"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}
                                    />
                                </CustomListItem>
                                <Divider sx={{borderColor:"white"}} />
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
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="DotMap"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}
                                    />
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
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="SpikeMap"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}
                                    />
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
                                    <ColorSelector originalStatesRef = {originalStatesRef} 
                                    label="VoronoiMap"
                                    colors={colors} 
                                    setColors={setColors} 
                                    anchors={anchors} 
                                    setAnchors={setAnchors} 
                                    setTitle={setTitle}
                                    setSizes={setSizes}
                                    setOpacities={setOpacities}
                                    setTextFont={setTextFont}
                                    setHasStroke={setHasStroke}
                                    setHasFill={setHasFill}
                                    setHideLegend={setHideLegend}
                                    setLegendTitle = {setLegendTitle}
                                    setLegendFields = {setLegendFields}
                                    />
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