import { CSSObject } from "@mui/system";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Settings } from "@mui/icons-material";
import NextLink from "next/link";
import scss from "./SideMenu.module.scss";
import { Dashboard } from "@mui/icons-material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useSession } from "next-auth/react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const menuRouteList = [
  ".",
  "analytics",
  "createticket",
  "questions",
  "settings",
  "",
];
const menuListTranslations = [
  "Home",
  "Analytics",
  "Create Ticket",
  "Questions",
  "Settings",
  "Sign Out",
];
const menuListIcons = [
  <Dashboard key="dashboard" />,
  <ConfirmationNumberIcon key="ticket" />,
  <EditCalendarIcon key="calendar" />,
  <QuestionAnswerIcon key="questions" />,
  <Settings key="settings" />,
  <ExitToAppIcon key="signout" />,
];

interface SideMenuProps {
  onOpenChange?: (isOpen: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onOpenChange }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const mobileCheck = useMediaQuery("(min-width: 600px)");
  const { data: session } = useSession();
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => axios.get("http://localhost:5000/users"),
  });
  React.useEffect(() => {
    if (data?.data?.data && session?.user?.email) {
      const loggedInUser = data.data.data.find(
        (user: any) => user.email === session?.user?.email
      );
      if (loggedInUser?.id) {
        setCurrentUserId(loggedInUser.id);
      }
    }
  }, [data, session]);

  const handleDrawerToggle = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    if (onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  const handleListItemButtonClick = (text: string) => {
    text === "Sign Out" ? signOut() : null;
    setOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subjects</div>;
  if (!currentUserId) return <div>Loading user data...</div>;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      className={scss.sideMenu}
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          left: 0,
          top: mobileCheck ? 64 : 57,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
          }),
        },
      }}
    >
      <div className={scss.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <MenuOpenIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuListTranslations.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <NextLink
              className={scss.link}
              href={
                menuRouteList[index] === ""
                  ? `/dashboard/${currentUserId}`
                  : `/dashboard/${currentUserId}/${menuRouteList[index]}`
              }
            >
              <ListItemButton
                onClick={() => handleListItemButtonClick(text)}
                title={text}
                aria-label={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menuListIcons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    color: theme.palette.text.primary,
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
