import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

type SidebarProps = {
  open: boolean;
  drawerWidth: number
}

function Sidebar(sidebarProps: SidebarProps){

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
          <ListItemButton>
            <ListItemText primary="Dashboard"/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Orders"/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Products"/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Categories"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );

}

export default Sidebar;