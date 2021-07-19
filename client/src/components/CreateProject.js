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

  const [formData, setFormData] = useState({
    project_title: "",
    total_amount: "",
    minimum_amount: "",
    return: "",
    last_date: "",
    completion_date: "",
    maximum_investment: "",
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
                  name="name"
                  value={formData.project_title}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="project_title"
                  label="Project Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="total_amount"
                  label="Amount to be raised"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="minimum_amount"
                  label="Minimum Investment Amount"
                  name="minimum_amount"
                  value={formData.minimum_amount}
                  onChange={handleChange}
                  autoComplete="number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="return"
                  label="Return per Minimum Investment"
                  name="return"
                  value={formData.return}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="last_date"
                  value={formData.last_date}
                  onChange={handleChange}
                  label="Last date of Investment"
                  id="last_date"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="completion_date"
                  name="completion_date"
                  value={formData.completion_date}
                  onChange={handleChange}
                  label="Expected date of Project Completion"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="maximum_investment"
                  name="maximum_investment"
                  value={formData.maximum_investment}
                  onChange={handleChange}
                  label="Maximum Investment Amount"
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
