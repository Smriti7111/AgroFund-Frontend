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

export default function SignUpInvestor() {
  const classes = useStyles();
  const history = useHistory();

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
  const [alert, showAlert] = useState(false);
  const [message, setMessage] = useState("");

  // Get Wallet Address
  useEffect(() => {
    const getWallet = async () => {
      let address = await getWalletAddress();
      setWalletAddress(address.toLowerCase());
    };
    getWallet();
  }, []);

  // Set Wallet address to input field
  useEffect(() => {
    setFormData({ ...formData, walletAddress: walletAddress });
  }, [walletAddress]);

  const createInvestor = () => {
    axios({
      method: "POST",
      url: "/api/investor",
      data: formData,
    }).then(
      (response) => {
        console.log("Sign Up response is: ", response.data);
        if (response.data.message.error) {
          setMessage(response.data.message.error);
          showAlert(true);
        }
        if (response.data.message.success) {
          history.push("/login", {
            message:
              "You have successfully signed up as an investor. Please login to continue",
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const validateForm = () => {
    const { password, confirmPassword, check } = formData;
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
      createInvestor();
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
          Sign up as an Investor
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
                disabled={true}
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
