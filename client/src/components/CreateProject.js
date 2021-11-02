import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useHistory } from "react-router";

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

const CreateProject = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    projectDescription: "",
    investmentToBeRaised: "",
    minimumInvestment: "",
    returnPerMinimumInvestment: "",
    lastDateOfInvestment: "",
    expectedDateOfProjectCompletion: "",
    maximumInvestment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/api/project",
      headers: {
        "auth-token": sessionStorage.getItem("token"),
      },
      data: formData,
    }).then(
      (response) => {
        console.log(response);
        history.push("/dashboard", {
          message:
            "You have successfully submitted your project. We'll review and update you.",
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Project
          </Typography>
          <form method="POST" className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  autoComplete="name"
                  name="title"
                  value={formData.project_title}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Project Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  id="investmentToBeRaised"
                  label="Amount to be raised"
                  name="investmentToBeRaised"
                  value={formData.investmentToBeRaised}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  id="minimumInvestment"
                  label="Minimum Investment Amount"
                  name="minimumInvestment"
                  value={formData.minimumInvestment}
                  onChange={handleChange}
                  autoComplete="number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="returnPerMinimumInvestment"
                  label="Return per Minimum Investment"
                  name="returnPerMinimumInvestment"
                  value={formData.returnPerMinimumInvestment}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="lastDateOfInvestment"
                  value={formData.lastDateOfInvestment}
                  onChange={handleChange}
                  label="Last date of Investment"
                  id="lastDateOfInvestment"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="expectedDateOfProjectCompletion"
                  name="expectedDateOfProjectCompletion"
                  value={formData.expectedDateOfProjectCompletion}
                  onChange={handleChange}
                  label="Expected date of Project Completion"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  id="maximumInvestment"
                  name="maximumInvestment"
                  value={formData.maximumInvestment}
                  onChange={handleChange}
                  label="Maximum Investment Amount"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  label="Project Description"
                  placeholder="Project Description"
                  variant="outlined"
                  rows={5}
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Project
            </Button>
          </form>
        </div>
        <Box mt={5}>{/* <Copyright /> */}</Box>
      </Container>
    </>
  );
};

export default CreateProject;
