import { Box, Typography } from "@mui/material";
//import DeleteIcon from '@mui/icons-material/Delete';

import { useTheme } from "@mui/material/styles";

interface TableItem {
  _id: string;
}

interface TableProps<T extends TableItem> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  openEditDrawer: (item: T) => void;
}

function Table<T extends TableItem>({data, renderItem, openEditDrawer}: TableProps<T>){

  const theme = useTheme();

  return(
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 2fr))',
        gap: 2,
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        //border: '3px solid red',
        padding: 1,

        '&::-webkit-scrollbar': {
          width: '4px',
        },

        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },

        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },

        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}
    >
      {
        data
        ?
          data.map((item) => (
            <div key={item._id} onClick={() => openEditDrawer(item)}>
              <Box
                sx={{
                  display:'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: theme.palette.primary.main,
                  padding: 2,
                  borderRadius: 2,
                  userSelect: 'none',
                  transition: 'all 0.2s ease',

                  '&:hover':{
                    cursor: 'pointer',
                    transform: 'scale(1.02)'
                  }
                }}
              >
                {
                  renderItem(item)         
                }
              </Box>
            </div>
          ))
        : 
          <Typography>Não há Dados</Typography>
      }
    </Box>
  );
}

export default Table;