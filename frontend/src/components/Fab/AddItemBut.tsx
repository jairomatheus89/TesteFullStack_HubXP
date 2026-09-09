import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { useTheme } from "@mui/material/styles";

interface AddItemButProps {
  openCreateModal: () => void;
}

export default function AddItemBut({openCreateModal}: AddItemButProps){

  const theme = useTheme();

  return(
    <Fab
      onClick={openCreateModal}
      sx={{
        position: 'absolute',
        top: '88%',
        right: '4%',
        bgcolor: 'primary.main',
        "&:hover":{
          "& > .but":{
            color: theme.palette.mode === "dark" ? 'rgba(0, 0, 0, 1.0)' : 'inherit'
          }
        }
      }}
    >
      <AddIcon className='but' sx={{
          color: 'text.primary',
        }}/>
    </Fab>
  );

}