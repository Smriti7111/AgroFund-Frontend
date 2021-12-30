import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import MyAlert from "../../../components/MyAlert";
import DashboardDrawer from "../../../components/Dashboard/AdminDrawer";

const DashboardFarmer = (props) => {
  const { showAlert, message } = props;
  const [alert, setAlert] = useState(showAlert);

  const menu = [
    {
      title: "Home",
      icon: "fas fa-home",
      link: "/dashboard/farmer/allFarmerProjects",
    },
    {
      title: "Verify",
      icon: "fas fa-spa",
      // link: "/dashboard/admin/farmers",
    },
    {
      title: "Investment Requests",
      icon: "fas fa-check",
      // link: "/dashboard/admin/requests/farmer",
    },

    // {
    //   title: "Investor Requests",
    //   icon: "fas fa-check-circle",
    //   // link: "/dashboard/admin/requests/investor",
    // },
  ];

  return (
    <>
      {message ? (
        alert ? (
          <MyAlert setAlert={setAlert} severity="success" message={message} />
        ) : null
      ) : null}
      {/* <Navbar /> */}
      <DashboardDrawer menu={menu} title="Farmer Dashboard">
        {props.children}
      </DashboardDrawer>
    </>
  );
};

export default DashboardFarmer;
