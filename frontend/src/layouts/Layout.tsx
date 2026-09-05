import React, { useState } from 'react';

import { Box } from '@mui/material';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const drawerWidth = 240;

function Layout({children, setdarkmode}: {children: React.ReactNode, setdarkmode: React.Dispatch<React.SetStateAction<boolean>>}){

  const [ open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((previousOpen) => !previousOpen);
  }

  return(
    <Box sx={{display: 'flex'}}>
      <Header onMenuClick={handleDrawerToggle} setDarkmode={setdarkmode}/>
      <Sidebar open={open} drawerWidth={drawerWidth}/>

      <Box 
        component="main" 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          //background: colors.green[400],
          justifyContent: 'center',
          p: 3,
          height: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)',
          },
          mt: {
            xs: '56px',
            sm: '64px',
          },
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;