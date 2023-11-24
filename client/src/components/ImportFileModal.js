import React, { useState, useContext } from 'react';
import {Modal, Typography} from '@mui/material';
import {Box} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {Grid} from '@mui/material';
import { StyledButton, StyledFormLabel, StyledRadio} from './StyleSheets/ImportFileModalStyles';
import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GlobalStoreContext from '../store';
import { useNavigate } from 'react-router-dom';

function ImportFileModal({open,onClose,openSelectPropModal,files,setFiles,fileType,setFileType,mapType,setMapType}){
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [fileType, setFileType] = useState('');
    const [mapType, setMapType] = useState('');
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
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
      
    const fileTypesStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        color: 'white',
        backgroundColor: 'rgba(255, 118, 214, 0.8)',
        fontSize: '1.2rem',
        border: '2px dashed black',
        borderRadius: '10px',
        cursor: 'pointer',
        margin: '20px 0',
        '&:hover': {
            backgroundColor: 'rgba(255, 118, 214, 0.7)',
        },
        width: '100%',
        maxWidth: '500px',
        boxSizing: 'border-box',
    };
    const uploadIconStyle = {
        marginRight: '10px',
      };
    const headerTextStyle = {
        color: 'white',
        marginBottom: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '1.25rem',
      };
    function getFileExtension(filename){
        return filename.split(".").pop().toLowerCase();
    }
    function alertModal(header, paragraph){
        store.displayModal(<div>
            <h4 style={{ color: '#f44336', margin: '0', fontSize: '1.1rem' }}>{header}</h4>
            <p style={{ margin: '5px 0', fontSize: '1rem', width:'120%' }}>{paragraph}</p>
          </div>, false);
    }
    const handleNextPage = async () => {
        if(files.length === 0){
            alertModal("Try Again", "There were no files uploaded.");
        }
        else if(mapType === ""){
            alertModal("Try Again", "There were no map type set.");
        }
        else{
            await store.createMap(files, mapType, fileType)
                .then(()=> {
                    onClose();
                    openSelectPropModal();
                })
                .catch((err) => alertModal("Try Again!", err.response.data.errorMessage));
        }
    }

        //
    function handleFileSelect(event){
        const selectedFiles = event.target.files;
        if(selectedFiles.length === 1){
            const formData = new FormData();
            formData.append('file', selectedFiles[0]);
            setFiles(formData)
            setFileNames([selectedFiles[0].name])
            // check extension for json or kml
            // set the file name if its either
            const fileName = selectedFiles[0].name;
            const extension = getFileExtension(fileName);

            
            // i have to pass the map type to mapEdit
            // also have to handle setting the page to editMapScreen
            if (extension === 'json') {
                setFileType("geojson");
            }
            else if (extension === 'kml') {
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
                setFileType("shapefile");
            }
            else{
                alertModal("Try Again","Invalid file format! Please select one of the accepted types.")
            }
            const formData = new FormData();
            
            // Accounting for selection ordering
            setFiles(formData);
            if (extension1 == "shp"){
                setFileNames([file1, file2])
                formData.append('file', selectedFiles[0]);
                formData.append('file', selectedFiles[1]);
            }
            else{
                setFileNames([file2, file1])
                formData.append('file', selectedFiles[1]);
                formData.append('file', selectedFiles[0]);
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
                    <Grid item xs = {6}>
                        {/* File upload section */}
                        <Typography variant="h6" component="h2" sx={headerTextStyle}>
                        Import a vector file below!
                        </Typography>
                        {/* File types label */}
                        <Box sx={fileTypesStyle} component="label">
                        <CloudUploadIcon sx={uploadIconStyle} /> {/* Upload icon */}
                        Click to upload
                        <Typography variant="body2" component="div" sx={{ marginTop: '10px' }}>
                        .JSON, .SHP/.DBF, .KML
                        </Typography>
                        <VisuallyHiddenInput accept=".json,.shp,.dbf,.kml" type="file" onChange={handleFileSelect} multiple />
                        </Box>
                        {/* Display selected files */}
                        {fileNames.length > 0 && (
                        <Box sx={{ color: 'white' }}>
                            {fileNames.map((file, index) => (
                            <Typography key={index}>
                                {file}
                            </Typography>
                            ))}
                        </Box>
                        )}
                    </Grid>
                    <Grid item xs = {1} sx = {line}></Grid>
                    <Grid item xs = {4}>
                        <FormControl>
                        <StyledFormLabel id="demo-radio-buttons-group-label" >Select a map type:
                        </StyledFormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Heat"
                                name="radio-buttons-group"
                                value = {mapType}
                                onChange = {(e) => setMapType(e.target.value)}
                            >
                                <FormControlLabel sx = {{color:"white"}} value = "Heat Map" control={<StyledRadio/>} label="Heat Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Dot Distribution Map"control={<StyledRadio/>} label="Dot Distribution Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Chloropleth Map"control={<StyledRadio/>} label="Chloropleth Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Voronoi Map" control={<StyledRadio/>} label="Voronoi Map" />
                                <FormControlLabel sx = {{color:"white"}} value = "Spike Map" control={<StyledRadio/>} label="Spike Map" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs = {12} sx = {center}>
                        <StyledButton onClick={() => handleNextPage()}>
                            Next
                        </StyledButton>
                    </Grid>
                </Grid>
          </Box>
        </Modal>           
        )

}
export default ImportFileModal;