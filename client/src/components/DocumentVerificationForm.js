import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const DocumentVerificationForm = () => {
  const classes = useStyles();
  const [documentData, setDocumentData] = useState({
    citizenshipNo: "",
    panNo: "",
    citizenship: "",
    pan: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "POST",
      url: `/api/farmer/submitVerificationInfo`,
      data: documentData,
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "citizenship" || name == "pan") {
      setDocumentData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else {
      setDocumentData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        Document Verification Form
      </Typography>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className={classes.form}
        encType="multipart/form-data"
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid container item md={6} spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                autoComplete="name"
                name="citizenshipNo"
                value={documentData.citizenshipNo}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="citizenshipNo"
                label="Citizenship No."
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant="contained" fullWidth component="label">
                Upload Citizenship
                <input
                  name="citizenship"
                  // value={documentData.citizenship}
                  onChange={handleChange}
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="name"
                name="panNo"
                value={documentData.panNo}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="panNo"
                label="Pan No."
                autoFocus
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button fullWidth variant="contained" component="label">
                Upload PAN Card
                <input
                  name="pan"
                  // value={documentData.pan}
                  onChange={handleChange}
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit Documents
        </Button>
      </form>
    </>
  );
};

export default DocumentVerificationForm;
