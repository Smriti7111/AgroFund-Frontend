import React, { useEffect, useState } from "react";
import DashboardAdmin from "./dashboard";
import Table from "../../../components/Dashboard/Table";
import axios from "axios";
import Request from "./FarmerRequest";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Wallet",
    field: "walletAddress",
  },
  {
    title: "Email",
    field: "email",
  },
  {
    title: "Contact",
    field: "contact",
  },
  {
    title: "Verified ?",
    field: "isVerified",
  },
  {
    title: "Completed Projects",
    field: "projectsCompleted",
  },
  {
    title: "Rating",
    field: "rating",
  },
];

const actions = [
  {
    icon: "delete",
    tooltip: "Remove Farmer",
    onClick: (event, rowData) => {
      // Do save operation
    },
  },
];

const Farmer = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "/api/farmer",
    }).then((res) => {
      setFarmers(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardAdmin>
      <Table
        loading={loading}
        title="All Farmers"
        column={columns}
        data={farmers}
        actions={actions}
        // detailPanel={() => Request}
      />
    </DashboardAdmin>
  );
};

export default Farmer;
