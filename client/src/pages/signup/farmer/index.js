import React, { useEffect, useContext, useState } from "react";
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

// Context Import
import { walletContext } from "../../../Context/WalletContext";

// Functions import
import { getWalletAddress } from "../../../helpers/GetWalletAddress";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MyAlert from "../../../components/MyAlert";
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpFarmer() {
  const classes = useStyles();
  const history = useHistory();
  const [alert, showAlert] = useState(false);
  const [message, setMessage] = useState("");

  const [walletAddress, setWalletAddress] = useContext(walletContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    walletAddress: "",
    contact: "",
    password: "",
    confirmPassword: "",
    check: false,
  });

  useEffect(() => {
    console.log(getWalletAddress);
    setWalletAddress(getWalletAddress);
  }, []);

  const createFarmer = () => {
    axios({
      method: "POST",
      url: "/api/farmer",
      data: formData,
    }).then(
      (response) => {
        console.log(response);
        history.push("/login", {
          message:
            "You have successfully signed up as farmer. Please login to continue",
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const validateForm = () => {
    const { password, confirmPassword, check, contact } = formData;
    const pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(contact)) {
      showAlert(true);
      setMessage("Please enter only number for phone number field");
      return false;
    }
    if (contact.length != 10) {
      showAlert(true);
      setMessage("Please enter valid phone number");
      return false;
    }
    if (password !== confirmPassword) {
      showAlert(true);
      setMessage("Password and Confirm Password does not match");
      return false;
    }
    if (!check) {
      showAlert(true);
      setMessage(
        "Please indicate that you agree to the Terms and Conditions and Privacy Policy"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = validateForm();
    if (validate) {
      createFarmer();
    } else {
      console.log("Not validated");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "check") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: !prevState.check,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      {alert ? (
        <MyAlert setAlert={showAlert} severity="error" message={message} />
      ) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up as a Farmer
        </Typography>
        <form method="POST" onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                autoComplete="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                autoComplete="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="walletAddress"
                label="Wallet Address"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                autoComplete="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                className={classes.root}
                name="check"
                value={formData.check}
                onChange={handleChange}
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to the terms and conditions and privacy policy"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
