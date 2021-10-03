import React from "react";
import DashboardFarmer from "../pages/dashboard/farmer/dashboard";
import DashboardInvestor from "../pages/dashboard/investor/dashboard";
import DashboardAdmin from "../pages/dashboard/admin/dashboard";
import CreateProject from "./CreateProject";
import Login from "../pages/login";

import { useHistory } from "react-router-dom";

const PrivateRoute = ({ location, ...rest }) => {
  let session = sessionStorage.getItem("token");
  let pathname = location.pathname;
  let state = location.state;
  const history = useHistory();
  const showAlert = state ? state.showAlert : "false";
  const message = state ? state.message : null;
  const usertype = sessionStorage.getItem("usertype");
  if (session == null) {
    return <Login location={location} />;
  }
  if (session && pathname == "/createProject" && usertype == 1) {
    return <CreateProject />;
  }
  if (session && pathname == "/login") {
    history.push("/dashboard");
  }
  if (session && pathname == "/dashboard") {
    switch (usertype) {
      case "0":
        return <DashboardAdmin showAlert={showAlert} message={message} />;
      case "1":
        return <DashboardFarmer showAlert={showAlert} message={message} />;
      case "2":
        return <DashboardInvestor showAlert={showAlert} message={message} />;
    }
  }
  return <Login location={location} />;
};

export default PrivateRoute;
