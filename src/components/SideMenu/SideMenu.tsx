import * as React from 'react';
import { useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useMediaQuery } from '@mui/material';
import scss from '../../pages/Home.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import Person2Icon from '@mui/icons-material/Person2';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const menuRouteList = ["analytics", "profile", "settings", ""];
const menuListTransitions = ["Analytics", "Profile", "Settings", "Sign Out"];
const menuListIcons = [<EqualizerIcon/>, <Person2Icon/>, <SettingsIcon/>, <ExitToAppIcon/>];

const SideMenu = () => {
  const theme = useTheme();
  const mobileCheck = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleListItemButtonClick = (text: string) => {
    text === "Sign Out" ? signOut() : setOpen(false);
  }

  const drawerStyles = open ? openedMixin(theme) : closedMixin(theme);

  return (
    <MuiDrawer
      variant="permanent"
      open={open}
      anchor="left"
      sx={{
        left: 0,
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        [`& .MuiDrawer-paper`]: {
          top: mobileCheck ? 64 : 57,
          ...drawerStyles,
        },
      }}
    >
      <div className={scss.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
     
      <Divider />
      <List>
        {menuListTransitions.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <NextLink
              className={scss.link}
              href={`/dashboard/${menuRouteList[index]}`}>
            <ListItemButton
            onClick={()=> handleListItemButtonClick(text)}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                {menuListIcons[index]}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 'bold',
                  opacity: open ? 1 : 0,
                }}
              />
            </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default SideMenu;
