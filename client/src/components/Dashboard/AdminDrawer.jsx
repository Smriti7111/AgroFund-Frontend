import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { Tooltip } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  Link,
} from "react-router-dom";
import Farmer from "../../pages/dashboard/admin/farmer";
import axios from "axios";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#06a120 !important",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  logoutButton: {
    justifySelf: "flex-end",
    marginLeft: "auto",
  },
}));

export default function DashboardDrawer(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let usertype = sessionStorage.getItem("usertype");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.clear();
    history.push("/login");
  };

  const directTo = (link, title) => {
    if ((title = "Verify")) {
      handleVerify();
    }
    history.push(link);
  };

  const handleTitle = (title) => {
    if (title == "Verify") {
      return handleVerificationStatus();
    } else {
      return title;
    }
  };

  const handleVerificationStatus = () => {
    let user = JSON.parse(sessionStorage.getItem("userdata"));
    const conditionArray = [
      user.hasPhoneVerified,
      user.citizenshipNo != "",
      user.citizenship != "",
      user.panNo != "",
      user.pan != "",
    ];
    if (usertype != 0) {
      if (user.hasProject) {
        return "View my Project";
      } else if (!user.hasProject && user.isVerified) {
        return "Create a Project";
      } else if (
        conditionArray.indexOf(false) == -1 &&
        user.isVerified == false &&
        user.requestedForVerification
      ) {
        return "Pending Verification";
      } else {
        return "Verify";
      }
    }
  };

  const handleVerify = () => {
    let user = JSON.parse(sessionStorage.getItem("userdata"));
    const conditionArray = [
      user.hasPhoneVerified,
      user.citizenshipNo != "",
      user.citizenship != "",
      user.panNo != "",
      user.pan != "",
    ];
    if (usertype != 0) {
      if (user.hasProject) {
        history.push("/dashboard/farmer/allFarmerProjects");
      } else if (!user.hasProject && user.isVerified) {
        history.push("/dashboard/farmer/createProject");
      } else if (
        conditionArray.indexOf(false) == -1 &&
        user.isVerified == false &&
        user.requestedForVerification
      ) {
        return;
      } else {
        history.push("/verificationForm");
      }
    }
    sendVerificationCode();
  };

  const sendVerificationCode = async () => {
    let id = JSON.parse(sessionStorage.getItem("userdata"))._id;
    if (usertype == 1) {
      await axios({
        method: "GET",
        url: `/api/farmer/getVerificationCode/${id}`,
      });
    } else if (usertype == 2) {
      await axios({
        method: "GET",
        url: `/api/investor/getVerificationCode/${id}`,
      });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Icon className="fas fa-bars"></Icon>
          </IconButton>

          <Typography variant="h6" noWrap>
            {props.title}
          </Typography>

          <Tooltip title="Log Out">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              className={clsx(classes.menuButton, classes.logoutButton)}
              onClick={handleLogout}
            >
              <Icon className="fas fa-sign-out-alt"></Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {props.menu
            ? props.menu.map((menu, index) => (
                <Tooltip title={menu.title}>
                  <ListItem
                    button
                    key={index}
                    onClick={() => directTo(menu.link, menu.title)}
                  >
                    <ListItemIcon>
                      <Icon className={menu.icon}></Icon>
                    </ListItemIcon>

                    {/* <ListItemText primary={menu.title} /> */}
                    <ListItemText primary={handleTitle(menu.title)} />
                  </ListItem>
                </Tooltip>
              ))
            : null}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
