import Drawer from '@mui/material/Drawer';
import { Box, Typography } from '@mui/material';

interface EditItemDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function EditItemDrawer({open, onClose}: EditItemDrawerProps) {

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor='right'
    >
      <Box>
        <Typography>CATEGORY EDIT:</Typography>
      </Box>
    </Drawer>
  );
}
