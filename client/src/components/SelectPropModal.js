import React, { useState } from 'react';
import { Modal, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';

function SelectPropModal({ open, onClose }) {
    const [selectedProperty, setSelectedProperty] = useState('');

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
        borderRadius: "5vh",
        color: 'white',
    };
    const dropdownStyle = {
        color: '#FF76D6',
        borderColor: 'white',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
        },
        '& .MuiPaper-root': { // This styles the paper of the dropdown menu
            backgroundColor: 'black', // Menu Paper background color
            color: 'white',
            maxHeight: 200, // Adjust this value for the maximum height before scroll
        },
        '& .MuiMenuItem-root': {
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
        },
    };


    const handlePropertyChange = (event) => {
        setSelectedProperty(event.target.value);
    };

    const handleCreateMap = () => {
        // onCreate(selectedProperty);
        onClose();
    };
    const properties = ['Population', 'Temperature', 'Elevation', 'Start with empty map'];


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="select-property-modal-title"
            aria-describedby="select-property-modal-description"
        >
            <Box sx={style}>
                <Typography id="select-property-modal-title" variant="h6">
                    Select a property to visualize
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="select-property-label" sx={{ color: 'white' }}>Property</InputLabel>
                    <Select
                        labelId="select-property-label"
                        id="select-property"
                        value={selectedProperty}
                        label="Property"
                        onChange={handlePropertyChange}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxHeight: '20vh', // Sets the max height for the dropdown menu
                                    overflow: 'auto', // Adds a scrollbar if the content is larger than the max height
                                    '& .MuiMenu-list': {
                                        padding: 0, // Removes padding around the menu list
                                        backgroundColor: 'black', // Ensures the background of the menu list is black
                                    },
                                }
                            }
                        }}
                        sx={dropdownStyle}
                    >
                        {properties.map((property, index) => (
                            <MenuItem key={index} value={property} sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                {property}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="contained" onClick={handleCreateMap} sx={{ mt: 2, bgcolor: '#FF76D6', '&:hover': { bgcolor: 'rgba(255, 118, 214, 0.9)' } }}>
                            Create Map
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default SelectPropModal;