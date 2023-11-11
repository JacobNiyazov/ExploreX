import React from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { NumberSelector, FontSelector, SidePanelGrid, ButtonContainer, Buttons, EditAccordion, ExpandMore, CustomList, CustomListItem, EditAccordionSummary, TitleTextField, TitleContainer, AccordianContainer, SelectAllCheck} from './StyleSheets/EditSidePanelStyles';
import Grid from '@mui/material/Grid';
import ColorSelector from './ColorSelector.js';
import MenuItem from '@mui/material/MenuItem';

const EditSidePanel = () => {  
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
    })

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

    const handleFont= (event, label) => {
        setFont(event.target.value)
    }

    const [title, setTitle] = React.useState("")

    const handleTitle= (event) => {
        setTitle(event.target.value)
    }

    const [size, setSize] = React.useState({
        Text: 12,
        Region: 12,
        DotMap: 12,
        SpikeMap: 12,
        VoronoiMap: 12
    })

    const handleSize= (event, label) => {
        setSize({
            ...size,
            [label]: event.target.value
        })
    }

    const [range, setRange] = React.useState(5)

    const handleRange= (event) => {
        setRange(event.target.value)
    }

    const [borderWidth, setBorderWidth] = React.useState({
        Region: 1,
        Legend: 1,
    })

    const handleBorderWidth= (event, label) => {
        setBorderWidth({
            ...borderWidth,
            [label]: event.target.value
        })
    }

    const [selectAll, setSelectAll] = React.useState({
        DotMap: false,
        SpikeMap: false,
        VoronoiMap: false
    })
    
    const handleSelectAll= (label) => {
        setSelectAll({
            ...selectAll,
            [label]: !selectAll[label]
        })
    }

    const [hideLegend, setHideLegend] = React.useState(false)

    const handleHideLegend= () => {
        setHideLegend(!hideLegend)
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
                    <TitleTextField label="Title" value={title} onChange={handleTitle}/>
                </TitleContainer>
                {/* Edit Text Options */}
                <EditAccordion disableGutters>
                    <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                        <Typography variant="inherit">Text</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <Typography>Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="Text"/>
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
                                    onChange={(e) =>{handleFont(e, "Text")}}
                                    value={font}
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
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={size.Text}
                                    onChange={(event)=>{handleSize(event, "Text")}}
                                    error={size.Text == ""}
                                />
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>

                {/* Edit Heat Map options */}
                <EditAccordion disableGutters>
                    <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                        <Typography variant="inherit">Heat Map Options</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                    <CustomList>
                            <CustomListItem>
                                <Typography>Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="HeatMap"/>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Range</Typography>
                                <NumberSelector
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={range}
                                    onChange={(event)=>{handleRange(event)}}
                                    error={range == ""}
                                />
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>

                {/* Edit Legend Options */}
                <EditAccordion disableGutters>
                    <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                        <Typography variant="inherit">Legend</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <Typography>Hide Legend</Typography>
                                <SelectAllCheck onChange={()=> {handleHideLegend()}}></SelectAllCheck>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Fill Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="LegendFill"/>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Border Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="LegendBorder"/>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Border Width</Typography>
                                <NumberSelector
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={borderWidth.Legend}
                                    onChange={(event)=>{handleBorderWidth(event, "Legend")}}
                                    error={borderWidth.Legend == ""}
                                />
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>

                {/* Edit Region Options */}
                <EditAccordion disableGutters>
                    <EditAccordionSummary expandIcon={<ExpandMore fontSize="large"/>}>
                        <Typography variant="inherit">Region</Typography>
                    </EditAccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                        <CustomList>
                            <CustomListItem>
                                <Typography>Fill Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="RegionFill"/>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Size</Typography>
                                <NumberSelector
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={size.Region}
                                    onChange={(event)=>{handleSize(event, "Region")}}
                                    error={size.Region == ""}
                                />
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Border Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="RegionBorder"/>
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Border Width</Typography>
                                <NumberSelector
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={borderWidth.Region}
                                    onChange={(event)=>{handleBorderWidth(event, "Region")}}
                                    error={borderWidth.Region == ""}
                                />
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>


                {/* Edit Dot Map Options */}
                <EditAccordion disableGutters>
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
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={size.DotMap}
                                    onChange={(event)=>{handleSize(event, "DotMap")}}
                                    error={size.DotMap == ""}
                                />
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Dot Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="DotMap"/>
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>


                {/* Edit Dot Map Options */}
                <EditAccordion disableGutters>
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
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={size.SpikeMap}
                                    onChange={(event)=>{handleSize(event, "SpikeMap")}}
                                    error={size.SpikeMap == ""}
                                />
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Spike Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="SpikeMap"/>
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>
                

                {/* Edit Voronoi Map Options */}
                <EditAccordion disableGutters>
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
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    value={size.VoronoiMap}
                                    onChange={(event)=>{handleSize(event, "VoronoiMap")}}
                                    error={size.VoronoiMap == ""}
                                />
                            </CustomListItem>
                            <Divider sx={{borderColor:"white"}} />
                            <CustomListItem>
                                <Typography>Dot Color</Typography>
                                <ColorSelector colors={colors} setColors={setColors} colorPicker={colorPicker} setColorPicker={setColorPicker} anchors={anchors} setAnchors={setAnchors} label="VoronoiMap"/>
                            </CustomListItem>
                        </CustomList>
                    </AccordionDetails>
                </EditAccordion>

            </AccordianContainer>


            <ButtonContainer item>
                <Grid container columns={17} alignItems="center" sx={{height:"100%"}}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons>
                            <Typography variant='inherit'>Submit</Typography>
                        </Buttons>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={7}>
                        <Buttons>
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