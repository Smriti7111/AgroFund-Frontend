import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import MyAlert from "../../../components/MyAlert";

const DashboardAdmin = (props) => {
  const { showAlert } = props;
  const [alert, setAlert] = useState(showAlert);
  return (
    <>
      {alert ? (
        <MyAlert
          setAlert={setAlert}
          severity="success"
          message="Successfully logged in as an admin!"
        />
      ) : null}
      <Navbar />
      <h1>Logged in as an admin</h1>
    </>
  );
};

export default DashboardAdmin;
