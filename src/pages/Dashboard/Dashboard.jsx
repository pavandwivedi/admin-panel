import React, { useState } from "react";
import {
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Menu from "../../components/layout/Menu";
import logo from "../../assets/Logo.png";
import DashboardCard from "./DashboardCard";
import AllUser from "../User/AllUser";
import CreateUser from "../User/CreateUser";
import Fun from "../Category/Fun";
import Sports from "../Category/Sports";
import Music from "../Category/Music";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDashboard = () => {
    window.location.reload(false);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "All User":
        return <AllUser />;
      case "Create User":
        return <CreateUser />;
      case "Fun":
        return <Fun />;
        case "Sports":
        return <Sports />;
        case "Music":
        return <Music />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#051e34" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={handleDashboard}
            sx={{ cursor: "pointer" }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          // height: "100vh",
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ bgcolor: "#051e34" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <img src={logo} alt="logo" height="40px" width="50px" />
          </Box>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? <ArrowRight /> : <ArrowRight />}
          </IconButton>
        </DrawerHeader>

        <Menu setActiveComponent={setActiveComponent} />
        <Divider />
      </Drawer>

      <Main open={open} sx={{ bgcolor: "#0dbbdb54", height: "130vh" }}>
        <DrawerHeader />
        <Box sx={{m: 6}}>
        {!activeComponent ? <DashboardCard /> : renderActiveComponent()}
      </Box>
      </Main>
    </Box>
  );
};

export default Dashboard;
