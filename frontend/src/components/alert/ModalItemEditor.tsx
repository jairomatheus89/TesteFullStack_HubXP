import { Modal, Box } from "@mui/material";
import * as React from 'react';

interface alertEditModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  actionRender: () => React.ReactNode;
}

export default function AlertEditModal({openModal, handleCloseModal, actionRender}: alertEditModalProps){

  return(
    <Modal
        open={openModal}
        onClose={handleCloseModal}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 400,
          display:'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          padding: 3,

          "& .actionModalBox":{
            display:'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          },

          "& .titleModal":{
            fontSize: 20,
            fontWeight: 'bold'
          },

          "& .butAction":{
            fontSize: 16,
            fontWeight: 'bold'
          },

          "& .butBox":{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around'
          }

        }}
      >
        {actionRender()}
      </Box>
    </Modal>
  );
}