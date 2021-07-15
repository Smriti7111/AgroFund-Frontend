import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import MyAlert from "../../../components/MyAlert";

const DashboardInvestor = (props) => {
  const { showAlert } = props;
  const [alert, setAlert] = useState(showAlert);
  return (
    <>
      {alert ? (
        <MyAlert
          setAlert={setAlert}
          severity="success"
          message="Successfully logged in as an investor!"
        />
      ) : null}
      <Navbar />
      <h1>Logged in as an investor</h1>
    </>
  );
};

export default DashboardInvestor;
