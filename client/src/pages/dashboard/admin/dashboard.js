import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import MyAlert from "../../../components/MyAlert";

const DashboardAdmin = (props) => {
  const { showAlert, message } = props;
  const [alert, setAlert] = useState(showAlert);
  return (
    <>
      {alert ? (
        <MyAlert setAlert={setAlert} severity="success" message={message} />
      ) : null}
      <Navbar />
      <h2>Show Farmer Verification Requests</h2>
      <h2>Show Investor Verification Requests</h2>
    </>
  );
};

export default DashboardAdmin;
