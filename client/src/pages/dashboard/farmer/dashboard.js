import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Navbar from "../../../components/Navbar";

const DashboardFarmer = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      {loggedIn ? (
        <Alert onClose={() => setLoggedIn(false)} severity="success">
          Successfully logged in as a farmer!
        </Alert>
      ) : null}
      <Navbar />
      <h1>Logged in as a farmer</h1>
    </>
  );
};

export default DashboardFarmer;
