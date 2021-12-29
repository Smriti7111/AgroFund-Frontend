import React, { useState, useEffect } from "react";

import DashboardDrawer from "../../../components/Dashboard/AdminDrawer";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  root: {
    width: "100%",
  },
});

const DashboardAdmin = (props) => {
  const { showAlert, message } = props;

  const classes = useStyles();

  // Menu to be shown in sidebar of admin dashboard
  const menu = [
    {
      title: "Home",
      icon: "fas fa-home",
      link: "/dashboard",
    },
    {
      title: "Farmer",
      icon: "fas fa-spa",
      link: "/dashboard/admin/farmers",
    },

    {
      title: "Investor",
      icon: "fab fa-btc",
      link: "/dashboard/admin/investors",
    },
    {
      title: "Project",
      icon: "fas fa-seedling",
      link: "/dashboard/admin/projects",
    },
    {
      title: "Farmer Requests",
      icon: "fas fa-check",
      link: "/dashboard/admin/requests/farmer",
    },

    {
      title: "Investor Requests",
      icon: "fas fa-check-circle",
      link: "/dashboard/admin/requests/investor",
    },
  ];

  return (
    <>
      <DashboardDrawer menu={menu} title="Admin">{props.children}</DashboardDrawer>
    </>
  );
};

export default DashboardAdmin;
