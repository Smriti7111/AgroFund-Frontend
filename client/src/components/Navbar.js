import React from "react";
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
import CreateProject from "./CreateProject";

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
  const [cookies, setCookie] = useCookies(["user"]);

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.clear();
    history.push("/login");
  };

  const createProject = () => {
    history.push("/createProject", { usertype: 1 });
  };

  const sendVerificationCode = async () => {
    let id = sessionStorage.getItem("id");
    const res = await axios({
      method: "GET",
      url: `/api/farmer/getVerificationCode/${id}`,
    });
  };

  const showButton = () => {
    let user = cookies.User.data;
    if (user.hasProject) {
      return <Button color="inherit">View my Project</Button>;
    } else if (!user.hasProject && user.isVerified) {
      return (
        <Button onClick={createProject} color="inherit">
          Create a Project
        </Button>
      );
    } else {
      return (
        <Button color="inherit" onClick={sendVerificationCode}>
          Verify
        </Button>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Agro Fund
          </Typography>
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
