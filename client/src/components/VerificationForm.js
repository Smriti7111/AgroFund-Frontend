import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DocumentVerificationForm from "./DocumentVerificationForm";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  button: {
    width: "30%",
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
    <DocumentVerificationForm />
  ) : (
    <Grid container spacing={3}>
      <Grid container item>
        <form method="POST" onSubmit={handleSubmit} className={classes.root}>
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
    </Grid>
  );
};

export default VerificationForm;
