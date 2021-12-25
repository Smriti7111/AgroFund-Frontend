import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  let usertype = sessionStorage.getItem("usertype");
  const [cookies, setCookie] = useCookies(["user"]);

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.clear();
    history.push("/login");
  };

  const createProject = () => {
    history.push("/createProject");
  };

  const showVerificationForm = () => {
    sendVerificationCode();
    history.push("/verificationForm");
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

  const viewProjects = () => {
    history.push("/allFarmerProjects");
  };

  const showButton = () => {
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
        return <Button color="inherit">View my Project</Button>;
      } else if (!user.hasProject && user.isVerified) {
        return (
          <Button onClick={createProject} color="inherit">
            Create a Project
          </Button>
        );
      } else if (
        conditionArray.indexOf(false) == -1 &&
        user.isVerified == false &&
        user.requestedForVerification
      ) {
        return (
          <>
            <Button color="inherit">PENDING VERIFICATION</Button>
          </>
        );
      } else {
        return (
          <>
            <Button color="inherit" onClick={showVerificationForm}>
              Verify
            </Button>
          </>
        );
      }
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#06a120" }}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Agro Fund
          </Typography>
          <Button onClick={viewProjects} color="inherit">
            Show Projects
          </Button>
          {showButton()}
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
