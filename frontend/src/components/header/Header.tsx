import { AppBar, Typography, Toolbar, IconButton, Avatar, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { Nightlight, LightMode } from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

type HeaderProps = {
  onMenuClick: () => void;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ onMenuClick, setDarkmode }: HeaderProps){

  const theme = useTheme();

  return(
    <>
      <AppBar 
        position="fixed"
        sx={{
          backgroundColor: theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{color: 'white'}}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>

          <Typography variant="h5">
            HubXP
          </Typography>

          <Box sx={{flexGrow: 1}}/>

          <IconButton color="inherit" onClick={() => setDarkmode((previous) => !previous)}>
            <Avatar sx={{width: 32, height: 32, background: "#121212", color: 'white'}}>
              {
                theme.palette.mode === 'light' ? <Nightlight/> : <LightMode/> 
              }
            </Avatar>
          </IconButton>

        </Toolbar>
      </AppBar>
    </>
  );

}

export default Header;