import { GlobalStyles } from "@mui/material";

export default function GlobalStyleConfig(){
  return(
    <GlobalStyles
      styles={{
        '*::-webkit-scrollbar': {
          width: '4px',
        },

        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },

        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },

        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}
    />
  );
}