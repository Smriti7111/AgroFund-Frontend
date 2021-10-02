import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import MyAlert from "../../../components/MyAlert";

const DashboardFarmer = (props) => {
  const { showAlert, message } = props;
  const [alert, setAlert] = useState(showAlert);
  return (
    <>
      {alert ? (
        <MyAlert setAlert={setAlert} severity="success" message={message} />
      ) : null}
      <Navbar />
      <h1>Logged in as a farmer</h1>
    </>
  );
};

export default DashboardFarmer;
