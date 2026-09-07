import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  open: boolean;
  drawerWidth: number;
}

function Sidebar(sidebarProps: SidebarProps){

  const navigate = useNavigate();

  return(
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarProps.open}
      sx={{
        width: sidebarProps.open ? sidebarProps.drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarProps.drawerWidth,
          boxSizing: 'border-box',

          top:{
            xs:56,
            sm: 64
          },

          height:{
            xs: 'calc(100% - 56px)',
            sm: 'calc(100% - 64px)'
          }
        }
      }}
    >
      <List sx={{display: 'flex', flexDirection: 'column', gap: 3}}>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemText primary="Dashboard"/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/orders")}>
            <ListItemText primary="Orders"/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/products")}>
            <ListItemText primary="Products"/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/categories")}>
            <ListItemText primary="Categories"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );

}

export default Sidebar;