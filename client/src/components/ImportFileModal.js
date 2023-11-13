import {Modal} from '@mui/material';
import {Box} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import {Grid} from '@mui/material';
import { StyledButton, StyledCloud, DescriptionText, StyledFormLabel, StyledRadio} from './StyleSheets/ImportFileModalStyles';

function ImportFileModal({open,onClose}){
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
    return (     
        <Modal
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
                        <Grid container spacing={2}>
                            <Grid item xs = {4}>
                                <Button>
                                    <StyledCloud></StyledCloud>
                                </Button>
                            </Grid>
                            <Grid item xs = {8}>
                                <DescriptionText sx= {{ paddingTop: "5vh"}}>name_of_file.json</DescriptionText>
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
                                <FormControlLabel sx = {{color:"white"}}value = "Spike" control={<StyledRadio/>} label="Spike Map" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs = {12} sx = {center}>
                        <StyledButton >
                            Create Map
                        </StyledButton>
                    </Grid>
                </Grid>
          </Box>
        </Modal>           
        )

}
export default ImportFileModal;