import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { StyledButton, StyledFormLabel, StyledRadio} from './StyleSheets/ImportFileModalStyles';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ExportMapModal({map,open,onClose}){
    const [exportType, setExportType] = useState("Native File (JSON)")
    async function handleExportClick () {
        const link = document.createElement("a");
        let title = map.title.replace(/\s+/g, '_');
        if(exportType === "Native File (JSON)"){
            let tempMap = {...map}
            delete tempMap.imageBuffer
            delete tempMap.ownerUsername
            delete tempMap.publishDate
            delete tempMap.isPublic
            delete tempMap.reactions
            delete tempMap._id
            delete tempMap.graphics._id
            delete tempMap.graphics.publishDate
            delete tempMap.graphics.ownerUsername
            if(tempMap.graphics.legend && tempMap.graphics.legend.fields){
                tempMap.graphics.legend.fields.forEach((elem)=>{
                    delete elem._id
                })
            }
            
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tempMap));
            link.download = title + "_native_file.json";
            link.href = dataStr;
        }
        else if(exportType === "Image (PNG)"){
            link.download = title + "_image.png";
            link.href = map.imageBuffer;
        }
        else{
            link.download = title + "_image.jpg";
            link.href = map.imageBuffer;
        }
        link.click();
        onClose()
        
      }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        height:130,
        bgcolor: '#242526',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius:"5vh"
      };

    const closeButtonStyle = {
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'white',
    };
    return(
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <IconButton onClick={onClose} sx={closeButtonStyle}>
                        <CloseIcon />
                </IconButton>
                <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                    <StyledButton sx={{marginTop: '0px'}}
                        data-testid="confirm-export-button"
                        onClick = {handleExportClick}
                    >
                        Download
                    </StyledButton>
                    
                    <FormControl>
                        <StyledFormLabel id="demo-radio-buttons-group-label" >Select a Export Type:
                        </StyledFormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Native File (JSON)"
                            name="radio-buttons-group"
                            value = {exportType}
                            onChange = {(e) => setExportType(e.target.value)}
                        >
                            <FormControlLabel sx = {{color:"white"}} value = "Native File (JSON)" control={<StyledRadio/>} label="Native File (JSON)" />
                            <FormControlLabel sx = {{color:"white"}} value = "Image (PNG)"control={<StyledRadio/>} label="Image (PNG)" />
                            <FormControlLabel sx = {{color:"white"}} value = "Image (JPG)"control={<StyledRadio/>} label="Image (JPG)" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                
            </Box>
        </Modal>
    )
}
export default ExportMapModal;