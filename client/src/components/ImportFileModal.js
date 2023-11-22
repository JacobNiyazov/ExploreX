import React, { useState, useContext } from 'react';
import {Modal, Typography} from '@mui/material';
import {Box} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import {Grid} from '@mui/material';
import { StyledButton, StyledImportButton, DescriptionText, StyledFormLabel, StyledRadio} from './StyleSheets/ImportFileModalStyles';
import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GlobalStoreContext from '../store';

function ImportFileModal({open,onClose}){
    const { store } = useContext(GlobalStoreContext);
    const [fileNames, setFileNames] = useState([]);
    const [fileType, setFileType] = useState('');
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: '#242526',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius:"5vh"
      };
    const line = {
        borderRight: '1px solid #ccc',
        margin: '0 10px',
    };
    const center = {
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }
    const VisuallyHiddenInput = styled('input')({
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
    function getFileExtension(filename){
        return filename.split(".").pop().toLowerCase();
    }
    function alertModal(header, paragraph){
        store.displayModal(<div>
            <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>{header}</h4>
            <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}>{paragraph}</p>
          </div>, false);
    }
    function handleLoadNewMap(){
        //have to make a create new map here, passes the file (?)
        // how does choosing the 
        //let newMap = store.createMap(fileType);
        //store.setCurrentEditMap(newMap,"EditMapScreen");
    }
    function handleFileSelect(event){
        let selectedFiles = event.target.files;
        console.log(selectedFiles)
        if(selectedFiles.length === 1){
            // check extension for json or kml
            // set the file name if its either
            const fileName = selectedFiles[0].name;
            const extension = getFileExtension(fileName);
            // i have to pass the map type to mapEdit
            // also have to handle setting the page to editMapScreen
            if (extension === 'json') {
                setFileNames([fileName]);
                setFileType("geojson");
            }
            else if (extension === 'kml') {
                setFileNames([fileName]);
                setFileType("kml");
            }
            else {
                alertModal("Try Again","Invalid file format! Please select one of the accepted types.")
            }
        }
        else if (selectedFiles.length === 2) {
            // they must check to see if they are 
            //shp and dbf in here and if they are then display the file names
            const newFileNames = Array.from(selectedFiles).map(file => file.name);
            const file1 = newFileNames[0];
            const file2 = newFileNames[1];
            const extension1 = getFileExtension(file1);
            const extension2 = getFileExtension(file2);
            if((extension1 === "shp" && extension2 === "dbf") || 
            (extension1 === "dbf" && extension2 === "shp")){
                setFileNames([...fileNames, ...newFileNames]);
                setFileType("shapefile");
            }
            else{
                alertModal("Try Again","Invalid file format! Please select one of the accepted types.")
            }
        }
        else{
            alertModal("Try Again","Invalid file format! Please select one of the accepted types.")
        }
    }
    return (     
        <Modal
            data-testid="import-modal"
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Grid container spacing = {2}>
                    <Grid item xs = {5}>
                        <DescriptionText id="modal-modal-title" variant="h6" component="h2">
                            Import a vector file below!
                        </DescriptionText>
                        <DescriptionText id = "modal-modal-description">
                            Accepted files:
                        </DescriptionText>
                        <DescriptionText id = "modal-modal-description">
                            - Shapefile/DBF
                        </DescriptionText>
                        <DescriptionText id = "modal-modal-description">
                            - KML
                        </DescriptionText>
                        <DescriptionText id = "modal-modal-description">
                            - GeoJSON
                        </DescriptionText>
                        <DescriptionText id = "modal-modal-description">
                            - Native File Type
                        </DescriptionText>
                        <Grid container spacing={2}>
                            <Grid item xs = {12}>
                                <StyledImportButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    upload
                                    <VisuallyHiddenInput type="file" onChange={handleFileSelect} multiple/>
                                </StyledImportButton>
                                {fileNames.length > 0 && (
                                    <div>
                                        {fileNames.map((fileName, index) => (
                                            <Typography key={index} sx={{color: "white" }}>
                                                {fileName}
                                            </Typography>
                                        ))}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {1} sx = {line}></Grid>
                    <Grid item xs = {5}>
                        <FormControl>
                        <StyledFormLabel id="demo-radio-buttons-group-label" >Select a type of map:
                        </StyledFormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Heat"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel sx = {{color:"white"}} value = "Heat" control={<StyledRadio/>} label="Heat Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Dot"control={<StyledRadio/>} label="Dot Distribution Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Chloropleth"control={<StyledRadio/>} label="Chloropleth Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Voronoi" control={<StyledRadio/>} label="Voronoi Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Spike" control={<StyledRadio/>} label="Spike Map" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs = {12} sx = {center}>
                        <StyledButton onClick={handleLoadNewMap}>
                            Create Map
                        </StyledButton>
                    </Grid>
                </Grid>
          </Box>
        </Modal>           
        )

}
export default ImportFileModal;