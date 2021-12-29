import React from "react";
import { BrowseRouter as Router, Switch, Route } from "react-router-dom";
import Farmer from "../pages/dashboard/admin/farmer";
import Investor from "../pages/dashboard/admin/investor";
import Project from "../pages/dashboard/admin/Project";
import FarmerRequest from "../pages/dashboard/admin/FarmerRequest";
import InvestorRequest from "../pages/dashboard/admin/InvestorRequest ";
import AllProjectsSection from "../components/AllProjectsSection";
import PrivateRoute from "../components/PrivateRoute";

const FarmerRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard/farmer/allFarmerProjects" />
      <PrivateRoute exact path="/dashboard/farmer/createProject"/>
{/* 
      <Route path="/dashboard/admin/investors" exact>
        <Investor />
      </Route>

      <Route path="/dashboard/admin/projects" exact>
        <Project />
      </Route>

      <Route path="/dashboard/admin/requests/farmer" exact>
        <FarmerRequest />
      </Route>

      <Route path="/dashboard/admin/requests/investor" exact>
        <InvestorRequest />
      </Route> */}
    </Switch>
  );
};

export default FarmerRoutes;
