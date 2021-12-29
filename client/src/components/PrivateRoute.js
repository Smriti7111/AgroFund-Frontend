import React from "react";
import DashboardFarmer from "../pages/dashboard/farmer/dashboard";
import DashboardInvestor from "../pages/dashboard/investor/dashboard";
import DashboardAdmin from "../pages/dashboard/admin/dashboard";
import CreateProject from "./CreateProject";
import Login from "../pages/login";

import { useHistory } from "react-router-dom";
import IndividualFarmerDetail from "../pages/dashboard/farmer/individualFarmerDetail";
import IndividualInvestorDetail from "../pages/dashboard/investor/individualInvestorDetail";
import AllProjectsSection from "../components/AllProjectsSection";
import Farmer from "../pages/dashboard/admin/farmer";
import DashboardDrawer from "./Dashboard/AdminDrawer";

const PrivateRoute = ({ location, ...rest }) => {
  let session = sessionStorage.getItem("token");
  let pathname = location.pathname;
  let state = location.state;
  const history = useHistory();
  const showAlert = state ? state.showAlert : "false";
  const message = state ? state.message : null;
  const usertype = sessionStorage.getItem("usertype");
  if (session == null && pathname == "/login") {
    return <Login location={location} />;
  } else if (session == null) {
    history.push("/login");
  }
  if (session && pathname == "/createProject" && usertype == "1") {
    return <CreateProject />;
  }
  if (session && usertype == "0") {
    if (pathname == "/individualFarmerDetail") {
      return <IndividualFarmerDetail />;
    } else if (pathname == "/individualInvestorDetail") {
      return <IndividualInvestorDetail />;
    }
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
  if (session && pathname === "/allFarmerProjects") {
    return <AllProjectsSection />;
  }

  if (session && pathname == "/dashboard/admin" && usertype == "0") {
    return <DashboardDrawer />;
  }

  return <Login location={location} />;
};

export default PrivateRoute;
