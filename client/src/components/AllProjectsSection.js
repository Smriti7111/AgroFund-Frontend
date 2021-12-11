import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import SingleProject from "./SingleProject";
import Navbar from "./Navbar";

const AllProjectsSection = () => {
  const [allProjects, setAllProjects] = useState(null);
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
      <Navbar />
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: 30 }}
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
    </>
  );
};

export default AllProjectsSection;
