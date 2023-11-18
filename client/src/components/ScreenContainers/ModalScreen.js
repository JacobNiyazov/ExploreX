import React, { useContext } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import { GlobalStoreContext } from '../../store';

const ModalScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  let open = store.modalOpen;



  const handleClose = () => {
    store.closeModal();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Open Modal
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-description">
            {store.modalMessage}
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalScreen;
