import { AppBar, Typography, Toolbar, IconButton, Avatar, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

type HeaderProps = {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps){

  return(
    <>
      <AppBar 
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
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

          <IconButton color="inherit">
            <Avatar sx={{width: 32, height: 32}}>
              J
            </Avatar>
          </IconButton>

        </Toolbar>
      </AppBar>
    </>
  );

}

export default Header;