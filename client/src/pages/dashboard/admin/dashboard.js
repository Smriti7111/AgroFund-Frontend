import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Navbar from "../../../components/Navbar";

const DashboardAdmin = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      {loggedIn ? (
        <Alert onClose={() => setLoggedIn(false)} severity="success">
          Successfully logged in as an investor!
        </Alert>
      ) : null}
      <Navbar />
      <h1>Logged in as an admin</h1>
    </>
  );
};

export default DashboardAdmin;
