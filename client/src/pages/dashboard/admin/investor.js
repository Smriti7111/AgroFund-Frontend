import React, { useEffect, useState } from "react";
import DashboardAdmin from "./dashboard";
import Table from "../../../components/Dashboard/Table";
import axios from "axios";

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
    title: "Address",
    field: "address",
  },
];

const actions = [
  {
    icon: "delete",
    tooltip: "Remove User",
    onClick: (event, rowData) => {
      // Do save operation
    },
  },
];

const Investor = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "/api/investor",
    }).then((res) => {
      setInvestors(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardAdmin>
      <Table
        title="All Investors"
        column={columns}
        data={investors}
        actions={actions}
        loading={loading}
      />
    </DashboardAdmin>
  );
};

export default Investor;
