import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DocumentVerificationForm from "./DocumentVerificationForm";
import { makeStyles, Grid, CardMedia, Card } from "@material-ui/core";
import Navbar from "../components/Navbar";
import DashboardFarmer from "../pages/dashboard/farmer/dashboard";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  button: {
    width: "30%",
  },
  card: {
    margin: "12%",
  },
  root1: {
    margin: "21px",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#06a120",
    },
  },
});

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState({
    code: "",
  });
  const classes = useStyles();
  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let usertype = sessionStorage.getItem("usertype");
  let isPhoneVerified = userData.isPhoneVerified;
  const [phoneverify, setIsPhoneVerify] = useState(isPhoneVerified);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationCode((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = userData._id;
    let res = null;
    if (usertype == 1) {
      res = await axios({
        method: "POST",
        url: `/api/farmer/verifyCode/${id}`,
        data: verificationCode,
      });
    } else if (usertype == 2) {
      res = await axios({
        method: "POST",
        url: `/api/investor/verifyCode/${id}`,
        data: verificationCode,
      });
    }
    let resData = res.data;
    let status = resData.data.status;
    if (status === "approved") {
      setIsPhoneVerify(true);
      userData.isPhoneVerified = true;
      sessionStorage.setItem("userdata", JSON.stringify(userData));
    }
  };
  return phoneverify ? (
    <>
      <MuiThemeProvider theme={theme}>
        <DashboardFarmer>
          <DocumentVerificationForm />
        </DashboardFarmer>
      </MuiThemeProvider>
    </>
  ) : (
    <>
      <MuiThemeProvider>
        <DashboardFarmer>
          <Grid container spacing={3} className={classes.root}>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              className={classes.card}
            >
              <Card variant="outlined">
                <Grid container item className={classes.root1}>
                  <form method="POST" onSubmit={handleSubmit}>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="code"
                        label="Enter 6 digit code sent to mobile you registered"
                        name="code"
                        value={verificationCode.code}
                        onChange={handleChange}
                        autoFocus
                      />
                    </Grid>

                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        Verify Code
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </DashboardFarmer>
      </MuiThemeProvider>
    </>
  );
};

export default VerificationForm;
