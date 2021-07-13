import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import MyAlert from "../../../components/MyAlert";

const DashboardFarmer = (props) => {
  const { showAlert } = props;
  const [alert, setAlert] = useState(showAlert);
  return (
    <>
      {alert ? (
        <MyAlert
          setAlert={setAlert}
          severity="success"
          message="Successfully logged in as a farmer!"
        />
      ) : null}
      <Navbar />
      <h1>Logged in as a farmer</h1>
    </>
  );
};

export default DashboardFarmer;
