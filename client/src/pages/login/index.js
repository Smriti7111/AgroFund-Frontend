import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

// Context Import
import { walletContext } from "../../Context/WalletContext";

// Functions import
import { getWalletAddress } from "../../helpers/GetWalletAddress";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        AgroFund
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [walletAddress, setWalletAddress] = useContext(walletContext);
  const [errorMessage, showErrorMessage] = useState(false);
  const [usertype, setUsertype] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getWallet = async () => {
      let address = await getWalletAddress();
      setWalletAddress(address);
    };
    getWallet();
  }, []);

  const [loginData, setLoginData] = useState({
    walletAddress: "",
    password: "",
  });

  useEffect(() => {
    setLoginData({ ...loginData, walletAddress: walletAddress });
  }, [walletAddress]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/login",
      data: loginData,
    }).then(
      (response) => {
        let resData = response.data;
        sessionStorage.setItem("token", resData.other.token);
        setUsertype(resData.other.userType);
        console.log(
          `sessionStorage set with token value ${resData.other.token}`
        );
        if (usertype) {
          history.push("/dashboard", { usertype });
        } else {
          return <Redirect to="/login" />;
        }
      },
      (error) => {
        console.log(error);
        showErrorMessage(true);
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      {errorMessage ? (
        <Alert onClose={() => showErrorMessage(false)} severity="error">
          Log in unsuccessful
        </Alert>
      ) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form method="POST" className={classes.form} noValidate>
          {/* Wallet Address */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Wallet Address"
            name="walletAddress"
            value={loginData.walletAddress}
            onChange={handleChange}
            autoComplete="username"
            autoFocus
            disabled={true}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={loginData.password}
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            className={classes.root}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup-investor" variant="body2">
                {"Don't have an account? Join Now"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
