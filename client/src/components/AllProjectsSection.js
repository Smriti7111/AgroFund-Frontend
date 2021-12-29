import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import SingleProject from "./SingleProject";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/core";
import DashboardFarmer from "../pages/dashboard/farmer/dashboard";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});
const AllProjectsSection = () => {
  const [allProjects, setAllProjects] = useState(null);
  const classes = useStyles();
  const getAllProjects = async () => {
    let id = JSON.parse(sessionStorage.getItem("userdata"))._id;
    const res = await axios({
      method: "GET",
      url: `/api/project`,
    });
    let resData = res.data.data;
    console.log(resData);
    setAllProjects(resData);
  };
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <DashboardFarmer>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: 30 }}
          className={classes.root}
        >
          {allProjects &&
            allProjects.map((value, index) => {
              return (
                <Grid
                  item
                  container
                  xs={12}
                  md={4}
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                >
                  <SingleProject val={value} />
                </Grid>
              );
            })}
        </Grid>
      </DashboardFarmer>
    </>
  );
};

export default AllProjectsSection;
