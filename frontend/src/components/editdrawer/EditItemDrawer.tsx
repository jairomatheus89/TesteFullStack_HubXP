import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/material';

interface EditItemDrawerProps {
  open: boolean;
  renderItem: () => React.ReactNode;
  onClose: () => void;
}

export default function EditItemDrawer({open, onClose, renderItem}: EditItemDrawerProps) {

  console.log("DRAWER RENDERIZOU!");

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor='right'
      slotProps={{
        paper:{
          sx:{
            width: 500,
            top:{
              xs:56,
              sm: 64
            },
            height:{
              xs: 'calc(100% - 56px)',
              sm: 'calc(100% - 64px)'
            },
            fontSize: 50,

          }
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          fontSize: 100,
        }}
      >
        {renderItem()}
      </Box>
    </Drawer>
  );
}
